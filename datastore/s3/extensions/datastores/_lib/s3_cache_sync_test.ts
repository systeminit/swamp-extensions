// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Tests for S3CacheSyncService focusing on the swamp-club#29 fix:
// the sync walker and index scrub must keep internal files
// (including the SQLite catalog at `_catalog.db*`) from crossing the
// sync boundary in either direction, and zombie entries from pre-fix
// remote indexes must self-heal via the `indexMutated` flag.

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
} from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import {
  isInternalCacheFile,
  isRetryableError,
  retryWithBackoff,
  S3CacheSyncService,
} from "./s3_cache_sync.ts";
import { S3Client, S3OperationError } from "./s3_client.ts";

/** Creates an error that matches the SDK's "object not found" shape. */
function makeNoSuchKeyError(key: string): Error {
  const err = new Error(`NoSuchKey: ${key}`);
  err.name = "NoSuchKey";
  return err;
}

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/**
 * Deterministic content-derived ETag, surrounded by quotes to mirror
 * the real S3 wire format. Different bodies produce different ETags;
 * identical bodies produce identical ETags.
 */
function fakeETag(body: Uint8Array): string {
  let h = 0xdeadbeef >>> 0;
  for (const b of body) {
    h = ((h ^ b) * 16777619) >>> 0;
  }
  return `"${h.toString(16).padStart(8, "0")}"`;
}

/**
 * In-memory mock of S3Client recording getObject/putObject/headObject
 * calls. `etagOverrides` lets a test pin a specific ETag (for example
 * a multipart-shaped one) regardless of stored content.
 */
function createMockS3Client(): S3Client & {
  storage: Map<string, Uint8Array>;
  etagOverrides: Map<string, string>;
  puts: PutCall[];
  gets: string[];
  heads: string[];
} {
  const storage = new Map<string, Uint8Array>();
  const etagOverrides = new Map<string, string>();
  const puts: PutCall[] = [];
  const gets: string[] = [];
  const heads: string[] = [];

  const etagFor = (key: string, body: Uint8Array): string =>
    etagOverrides.get(key) ?? fakeETag(body);

  return {
    storage,
    etagOverrides,
    puts,
    gets,
    heads,

    putObject(key: string, body: Uint8Array): Promise<{ etag: string }> {
      storage.set(key, body);
      puts.push({ key, body });
      return Promise.resolve({ etag: etagFor(key, body) });
    },

    getObject(key: string): Promise<Uint8Array> {
      gets.push(key);
      const data = storage.get(key);
      if (!data) return Promise.reject(makeNoSuchKeyError(key));
      return Promise.resolve(data);
    },

    headObject(
      key: string,
    ): Promise<
      { exists: boolean; size?: number; lastModified?: Date; etag?: string }
    > {
      heads.push(key);
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        etag: etagFor(key, data),
      });
    },
  } as unknown as S3Client & {
    storage: Map<string, Uint8Array>;
    etagOverrides: Map<string, string>;
    puts: PutCall[];
    gets: string[];
    heads: string[];
  };
}

/** Seeds a file inside the cache directory, creating parent dirs. */
async function seedFile(
  cachePath: string,
  relPath: string,
  contents: string,
): Promise<void> {
  const full = join(cachePath, relPath);
  const parent = full.substring(0, full.lastIndexOf("/"));
  if (parent && parent !== cachePath) {
    await Deno.mkdir(parent, { recursive: true });
  } else {
    await Deno.mkdir(cachePath, { recursive: true });
  }
  await Deno.writeTextFile(full, contents);
}

/** Encodes an index object as a remote .datastore-index.json body. */
function encodeIndex(
  entries: Record<string, {
    key: string;
    size: number;
    lastModified: string;
    localMtime?: string;
  }>,
): Uint8Array {
  return new TextEncoder().encode(
    JSON.stringify({
      version: 1,
      lastPulled: new Date().toISOString(),
      entries,
    }),
  );
}

/** Decodes a recorded putObject body as a parsed index object. */
function decodeIndex(body: Uint8Array): {
  entries: Record<string, unknown>;
} {
  return JSON.parse(new TextDecoder().decode(body));
}

/** Type assertion helper for reaching private instance state in tests. */
function privateState(service: S3CacheSyncService): {
  index: { entries: Record<string, unknown> } | null;
  indexMutated: boolean;
} {
  return service as unknown as {
    index: { entries: Record<string, unknown> } | null;
    indexMutated: boolean;
  };
}

// -- (a) push skips _catalog.db, _catalog.db-shm, _catalog.db-wal ----------

Deno.test("pushChanged: skips _catalog.db and its WAL/SHM sidecars", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-a-" });
  try {
    const mock = createMockS3Client();
    const service = new S3CacheSyncService(mock, cachePath);

    // Seed legitimate payload plus catalog files plus internal files.
    await seedFile(cachePath, "data/@my-model/payload.yaml", "name: x\n");
    await seedFile(cachePath, "data/_catalog.db", "SQLITE-MAIN");
    await seedFile(cachePath, "data/_catalog.db-shm", "SQLITE-SHM");
    await seedFile(cachePath, "data/_catalog.db-wal", "SQLITE-WAL");

    await service.pushChanged();

    // Expect exactly two puts: the legitimate payload plus the
    // index write-back. Nothing matching _catalog.db*.
    const uploadedKeys = mock.puts.map((p) => p.key);
    assertEquals(
      uploadedKeys.includes("data/@my-model/payload.yaml"),
      true,
      "legitimate payload should be pushed",
    );
    for (const key of uploadedKeys) {
      assertEquals(
        key.includes("_catalog.db"),
        false,
        `catalog file leaked: ${key}`,
      );
    }
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (b) push still skips the pre-existing three internal files -----------

Deno.test("pushChanged: still skips .datastore-index.json/.push-queue.json/.datastore.lock", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-b-" });
  try {
    const mock = createMockS3Client();
    const service = new S3CacheSyncService(mock, cachePath);

    // Seed a valid empty index so loadIndex succeeds, then seed the
    // other two internal files as raw walk-targets. The assertion is
    // that the walker skips them, not that loadIndex parses them.
    await seedFile(cachePath, "data/ok.yaml", "ok: true\n");
    await seedFile(
      cachePath,
      ".datastore-index.json",
      JSON.stringify({
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      }),
    );
    await seedFile(cachePath, ".push-queue.json", "{}");
    await seedFile(cachePath, ".datastore.lock", "lock");

    await service.pushChanged();

    const uploadedKeys = mock.puts.map((p) => p.key);
    // Only the payload plus the index write-back. Internal files
    // must never appear as standalone put targets.
    assertEquals(
      uploadedKeys.filter((k) => k === ".push-queue.json").length,
      0,
    );
    assertEquals(
      uploadedKeys.filter((k) => k === ".datastore.lock").length,
      0,
    );
    assertEquals(uploadedKeys.includes("data/ok.yaml"), true);
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (c) walker skip is a safety net beyond scrub -------------------------

Deno.test("pullChanged walker: skips zombies even if re-injected post-scrub", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-c-" });
  try {
    const mock = createMockS3Client();
    // Seed a CLEAN remote index (no zombies). pullIndex will fetch this,
    // scrub is a no-op, then we manually inject a zombie entry before
    // the walker runs to prove the walker's own skip is load-bearing.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 8,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    // Pre-populate the legitimate local file so pullChanged doesn't
    // have to fetch it (size match → skip).
    await seedFile(cachePath, "data/@m/ok.yaml", "ok: yes\n");

    const service = new S3CacheSyncService(mock, cachePath);
    // Force pullIndex first so we can mutate the in-memory index
    // AFTER scrub has already run.
    await service.pullIndex();

    // Inject a zombie entry directly into the in-memory index, bypassing
    // scrub. The walker must still skip this via isInternalCacheFile.
    const state = privateState(service);
    assertExists(state.index);
    state.index.entries["data/_catalog.db-wal"] = {
      key: "data/_catalog.db-wal",
      size: 1024,
      lastModified: new Date().toISOString(),
    };

    await service.pullChanged();

    // The walker must not have tried to fetch the injected zombie.
    assertEquals(
      mock.gets.includes("data/_catalog.db-wal"),
      false,
      "walker must skip zombies regardless of whether scrub caught them",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (d) pull skips zombies from the remote index -------------------------

Deno.test("pullChanged: skips zombie _catalog.db* entries from remote index", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-d-" });
  try {
    const mock = createMockS3Client();
    // Remote index contains both a legitimate entry and a zombie.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/payload.yaml": {
          key: "data/@m/payload.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
        },
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 999,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    // Fake remote payload so pullChanged's fetch succeeds.
    mock.storage.set(
      "data/@m/payload.yaml",
      new TextEncoder().encode("hi!\n\n"),
    );

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();

    assertEquals(
      mock.gets.includes("data/@m/payload.yaml"),
      true,
      "legitimate payload must be fetched",
    );
    assertEquals(
      mock.gets.includes("data/_catalog.db-wal"),
      false,
      "zombie must not be fetched",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (e1) pullIndex S3-fetch path scrubs in-memory AND rewrites local ----

Deno.test("pullIndex S3-fetch path: scrubs in-memory and rewrites local cache file", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-e1-" });
  try {
    const mock = createMockS3Client();
    // Remote index has zombies. No local cache file yet → forces the
    // S3-fetch branch.
    const polluted = {
      "data/@m/ok.yaml": {
        key: "data/@m/ok.yaml",
        size: 3,
        lastModified: new Date().toISOString(),
      },
      "data/_catalog.db": {
        key: "data/_catalog.db",
        size: 100,
        lastModified: new Date().toISOString(),
      },
      "data/_catalog.db-wal": {
        key: "data/_catalog.db-wal",
        size: 200,
        lastModified: new Date().toISOString(),
      },
    };
    mock.storage.set(".datastore-index.json", encodeIndex(polluted));

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullIndex();

    // In-memory state: zombies gone.
    const state = privateState(service);
    assertExists(state.index);
    assertEquals(
      Object.keys(state.index.entries).sort(),
      ["data/@m/ok.yaml"],
      "in-memory index should contain only the legitimate entry",
    );
    assertEquals(
      state.indexMutated,
      true,
      "indexMutated must be set after scrubbing zombies",
    );

    // Local cache file at <cachePath>/.datastore-index.json must
    // have been rewritten with the scrubbed JSON, not the raw
    // polluted text.
    const localFile = await Deno.readTextFile(
      join(cachePath, ".datastore-index.json"),
    );
    const localParsed = JSON.parse(localFile) as {
      entries: Record<string, unknown>;
    };
    assertEquals(
      Object.keys(localParsed.entries).sort(),
      ["data/@m/ok.yaml"],
      "local cache file must match scrubbed in-memory view",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (e2) pullIndex cache-hit path scrubs in-memory only -----------------

// The cache-hit branch (local `.datastore-index.json` fresh under the
// TTL) must still scrub zombie entries from the in-memory view so the
// rest of the sync pipeline sees a clean index — but it must NOT
// rewrite the local file. Propagation of the scrub to the remote does
// not ride through this path anymore: since swamp-club#30 we
// force-remote on pushChanged, so remote zombies are scrubbed when
// they are actually fetched (covered by test (f)).

Deno.test("pullIndex cache-hit path: scrubs in-memory and leaves local file untouched", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-e2-" });
  try {
    const mock = createMockS3Client();

    // Pre-seed a POLLUTED local cache file so pullIndex takes the
    // cache-hit branch. Remote index is left empty — we must never
    // call getObject for it on this path.
    const pollutedJson = JSON.stringify({
      version: 1,
      lastPulled: new Date().toISOString(),
      entries: {
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 3,
          lastModified: new Date().toISOString(),
        },
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 42,
          lastModified: new Date().toISOString(),
        },
      },
    });
    await seedFile(cachePath, ".datastore-index.json", pollutedJson);

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullIndex();

    // Must have taken the cache-hit branch (no remote fetch).
    assertEquals(
      mock.gets.includes(".datastore-index.json"),
      false,
      "cache-hit branch must not fetch the index from S3",
    );

    // In-memory state is scrubbed.
    const state = privateState(service);
    assertExists(state.index);
    assertEquals(Object.keys(state.index.entries).sort(), ["data/@m/ok.yaml"]);
    assertEquals(state.indexMutated, true);

    // The on-disk file is NOT rewritten by the cache-hit branch.
    const diskJson = await Deno.readTextFile(
      join(cachePath, ".datastore-index.json"),
    );
    assertEquals(
      diskJson,
      pollutedJson,
      "cache-hit branch must not rewrite the local index file",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (g) push merges remote index instead of clobbering it ----------------

// Regression test for swamp-club#30: without the fix, a client whose
// local cache has fewer files than the remote index will overwrite the
// remote `.datastore-index.json` with a subset of entries on push,
// orphaning the remote data objects. Exercised in production by
// `datastore setup` on a reader-side repo, which invokes pushChanged
// against a near-empty local cache before the reader has pulled.

Deno.test("pushChanged: preserves remote index entries for files absent from local cache", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-g-" });
  try {
    const mock = createMockS3Client();

    // Remote already has 5 entries from a prior writer. None of the
    // corresponding files are present on the reader's local disk.
    const remoteEntries = {
      "data/@writer/alpha.yaml": {
        key: "data/@writer/alpha.yaml",
        size: 10,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/beta.yaml": {
        key: "data/@writer/beta.yaml",
        size: 20,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/gamma.yaml": {
        key: "data/@writer/gamma.yaml",
        size: 30,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/delta.yaml": {
        key: "data/@writer/delta.yaml",
        size: 40,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/epsilon.yaml": {
        key: "data/@writer/epsilon.yaml",
        size: 50,
        lastModified: new Date().toISOString(),
      },
    };
    mock.storage.set(".datastore-index.json", encodeIndex(remoteEntries));

    // Reader's local cache has exactly one new file, the kind of
    // bootstrap artifact `datastore setup` produces.
    await seedFile(cachePath, "data/@reader/new.yaml", "reader: added\n");

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pushChanged();

    const indexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      indexPuts.length,
      1,
      "index must be written back exactly once",
    );
    const pushedIndex = decodeIndex(indexPuts[0].body);
    const keys = Object.keys(pushedIndex.entries).sort();
    assertEquals(
      keys.length,
      6,
      `expected 6 entries (5 remote + 1 new local), got ${keys.length}: ${
        keys.join(", ")
      }`,
    );
    assertEquals(
      keys.includes("data/@reader/new.yaml"),
      true,
      "new local file must be added to the index",
    );
    for (const remoteKey of Object.keys(remoteEntries)) {
      assertEquals(
        keys.includes(remoteKey),
        true,
        `remote entry must be preserved: ${remoteKey}`,
      );
    }

    // The writer's data objects themselves must NOT be re-uploaded —
    // pushChanged only walks local files.
    const uploadedDataKeys = mock.puts
      .map((p) => p.key)
      .filter((k) => k !== ".datastore-index.json");
    assertEquals(
      uploadedDataKeys,
      ["data/@reader/new.yaml"],
      "only the new local file should be uploaded",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (f) pushChanged scrubs remote zombies and is idempotent --------------

// Migration path for swamp-club#29: when the remote `.datastore-index.json`
// contains zombie `_catalog.db*` entries from a pre-fix writer, the
// first fixed client to pushChanged must fetch, scrub, and write back
// a clean index — even on a no-op push (no local files to upload). A
// subsequent push against the now-clean remote must be a no-op with
// no redundant index writeback.

Deno.test("pushChanged: scrubs remote zombies and writes back clean, second call is quiet", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-f-" });
  try {
    const mock = createMockS3Client();

    // Seed remote with a zombie-only index (the pre-fix migration state).
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 42,
          lastModified: new Date().toISOString(),
        },
      }),
    );

    const service = new S3CacheSyncService(mock, cachePath);

    // First push: no files to push, but remote scrub triggered the flag.
    await service.pushChanged();

    const firstIndexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      firstIndexPuts.length,
      1,
      "first pushChanged must write scrubbed index despite pushed=0",
    );
    const firstPushed = decodeIndex(firstIndexPuts[0].body);
    assertEquals(
      Object.keys(firstPushed.entries).length,
      0,
      "scrubbed index must contain no zombie entries",
    );

    // Second push on the same instance: remote is now clean, no-op.
    await service.pushChanged();

    const secondIndexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      secondIndexPuts.length,
      1,
      "second pushChanged must NOT rewrite — remote already clean, flag reset",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (h) pushChanged aborts on transient remote fetch errors --------------

// Since swamp-club#30, pushChanged force-fetches the remote index on
// every call. That means any non-NotFound error from the fetch (5xx,
// auth failure, network timeout) must propagate — otherwise a
// transient blip would leave us with an empty in-memory index, which
// the subsequent writeback would push to the remote and silently wipe
// the real index.

Deno.test("pushChanged: propagates non-NotFound remote errors and skips writeback", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-h-" });
  try {
    const puts: PutCall[] = [];
    const mock = {
      putObject(key: string, body: Uint8Array): Promise<void> {
        puts.push({ key, body });
        return Promise.resolve();
      },
      getObject(_key: string): Promise<Uint8Array> {
        // Simulate a transient 5xx: generic Error with no matching name.
        return Promise.reject(new Error("500 Internal Server Error"));
      },
    } as unknown as S3Client;

    await seedFile(cachePath, "data/@m/payload.yaml", "data\n");

    const service = new S3CacheSyncService(mock, cachePath);

    await assertRejects(
      () => service.pushChanged(),
      Error,
      "500",
      "pushChanged must propagate non-NotFound remote errors",
    );

    assertEquals(
      puts.length,
      0,
      "no putObject calls allowed — a failed remote fetch must not trigger a writeback that could wipe the real remote index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- DEF-2: retry + classification + batch failure message ------------------

/** Build an S3OperationError carrying a specific HTTP status. */
function opError(status: number): S3OperationError {
  return new S3OperationError(`S3 test failed HTTP ${status}`, {
    name: "TestError",
    cause: new Error("test"),
    httpStatusCode: status,
    code: "TestError",
    requestId: "r",
    bodyPreview: undefined,
  });
}

Deno.test("isRetryableError: 5xx and 429 are retryable, 4xx is not", () => {
  assertEquals(isRetryableError(opError(500)), true);
  assertEquals(isRetryableError(opError(503)), true);
  assertEquals(isRetryableError(opError(429)), true);
  assertEquals(isRetryableError(opError(403)), false);
  assertEquals(isRetryableError(opError(404)), false);
  assertEquals(isRetryableError(opError(412)), false);
});

Deno.test("isRetryableError: TimeoutError retryable, AbortError not", () => {
  const timeout = new Error("timed out");
  timeout.name = "TimeoutError";
  assertEquals(isRetryableError(timeout), true);

  const abort = new Error("aborted");
  abort.name = "AbortError";
  assertEquals(isRetryableError(abort), false);
});

Deno.test("retryWithBackoff: succeeds after transient 500", async () => {
  let attempts = 0;
  const result = await retryWithBackoff(() => {
    attempts++;
    if (attempts < 2) return Promise.reject(opError(500));
    return Promise.resolve("ok");
  }, { maxAttempts: 3, baseDelayMs: 1 });
  assertEquals(result, "ok");
  assertEquals(attempts, 2);
});

Deno.test("retryWithBackoff: does NOT retry non-retryable (403)", async () => {
  let attempts = 0;
  await assertRejects(
    () =>
      retryWithBackoff(() => {
        attempts++;
        return Promise.reject(opError(403));
      }, { maxAttempts: 3, baseDelayMs: 1 }),
    S3OperationError,
  );
  assertEquals(attempts, 1, "403 must not trigger a retry");
});

Deno.test("retryWithBackoff: exhausts maxAttempts then rethrows", async () => {
  let attempts = 0;
  await assertRejects(
    () =>
      retryWithBackoff(() => {
        attempts++;
        return Promise.reject(opError(500));
      }, { maxAttempts: 3, baseDelayMs: 1 }),
    S3OperationError,
  );
  assertEquals(attempts, 3);
});

Deno.test("pushChanged: batch failure message includes underlying error details", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-retry-" });
  try {
    // Mock whose putObject rejects with 403 (non-retryable, so fails fast)
    // for every file push. Index fetch returns empty so writeback is unused.
    const mock = {
      getObject(key: string): Promise<Uint8Array> {
        if (key === ".datastore-index.json") {
          const err = new Error("NoSuchKey");
          err.name = "NoSuchKey";
          return Promise.reject(err);
        }
        return Promise.reject(new Error("unexpected get"));
      },
      putObject(_key: string, _body: Uint8Array): Promise<void> {
        return Promise.reject(opError(403));
      },
    } as unknown as S3Client;

    await seedFile(cachePath, "data/a.yaml", "1\n");
    await seedFile(cachePath, "data/b.yaml", "2\n");

    const service = new S3CacheSyncService(mock, cachePath);
    let caught: unknown;
    try {
      await service.pushChanged();
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof Error);
    const msg = (caught as Error).message;
    assert(
      msg.includes("HTTP 403"),
      `batch failure message must include underlying error text, got: ${msg}`,
    );
    assert(
      msg.includes("data/a.yaml"),
      `batch failure message must list failed files, got: ${msg}`,
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// --- DEF-2 integration: real AWS SDK → real HTTP → retry classification ---
//
// These tests exercise retryWithBackoff + pushFile against the real
// @aws-sdk/client-s3 going over a real TCP socket. The unit tests above
// use hand-built S3OperationError objects; these prove the SDK actually
// surfaces 5xx/429 in a shape isRetryableError recognizes, so a failure
// mode the mocks can't catch — "the SDK returned an error named
// 'ServiceException' instead of an S3OperationError with httpStatusCode"
// — would be caught here.
//
// `maxAttempts: 2, baseDelayMs: 10` keeps integration test wall time
// under a second while still exercising the retry path end-to-end.

/**
 * Start a local HTTP server whose response on the Nth request is
 * controlled by `responses[N-1]`; after responses run out, further
 * requests return 500. Also counts requests so tests can assert
 * retries actually fired.
 */
function withProgrammableServer(
  responses: Array<() => Response>,
  fn: (s3: S3Client, state: { requestCount: number }) => Promise<void>,
): Promise<void> {
  const state = { requestCount: 0 };
  const server = Deno.serve({ port: 0, onListen() {} }, () => {
    const i = state.requestCount++;
    const handler = responses[i] ??
      (() => new Response("overflow", { status: 500 }));
    return handler();
  });
  const addr = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  const cleanup = async () => {
    if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  };

  const s3 = new S3Client({
    bucket: "test-bucket",
    region: "us-east-1",
    endpoint: `http://127.0.0.1:${addr.port}`,
    forcePathStyle: true,
  });

  return fn(s3, state).finally(cleanup);
}

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff treats a real SDK 503 as retryable",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>ServiceUnavailable</Code><Message>try later</Message><RequestId>r503</RequestId></Error>',
            {
              status: 503,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        await retryWithBackoff(
          () => s3.putObject("k", new Uint8Array([1, 2, 3])),
          { maxAttempts: 3, baseDelayMs: 10 },
        );
        assertEquals(
          state.requestCount,
          2,
          "503 must trigger a retry that succeeds on attempt 2",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff treats a real SDK 429 as retryable",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>SlowDown</Code><Message>throttled</Message><RequestId>r429</RequestId></Error>',
            {
              status: 429,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        await retryWithBackoff(
          () => s3.putObject("k", new Uint8Array([1, 2, 3])),
          { maxAttempts: 3, baseDelayMs: 10 },
        );
        assertEquals(
          state.requestCount,
          2,
          "429 must trigger a retry that succeeds on attempt 2",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff does NOT retry a real SDK 403",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>AccessDenied</Code><Message>nope</Message><RequestId>r403</RequestId></Error>',
            {
              status: 403,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        // A second stub that would "succeed" — if we see it used, the
        // predicate wrongly classified 403 as retryable.
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        let caught: unknown;
        try {
          await retryWithBackoff(
            () => s3.putObject("k", new Uint8Array([1, 2, 3])),
            { maxAttempts: 3, baseDelayMs: 10 },
          );
        } catch (e) {
          caught = e;
        }
        assert(
          caught instanceof S3OperationError,
          "expected S3OperationError from 403",
        );
        assertEquals(
          state.requestCount,
          1,
          "403 must NOT trigger a retry",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  sanitizeOps: false,
  name:
    "integration: retryWithBackoff treats a real SDK TimeoutError as retryable",
  fn: async () => {
    // Use a short per-request timeout (100ms) and a first-response delay
    // greater than it (600ms). Attempt 1 hits the timeout; attempt 2
    // responds immediately with 200.
    const state = { requestCount: 0 };
    const server = Deno.serve({ port: 0, onListen() {} }, () => {
      const i = state.requestCount++;
      if (i === 0) {
        return new Promise<Response>((resolve) => {
          setTimeout(() => resolve(new Response(null, { status: 200 })), 600);
        });
      }
      return new Response(null, { status: 200 });
    });
    const addr = server.addr as Deno.NetAddr;
    const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
    try {
      const s3 = new S3Client({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint: `http://127.0.0.1:${addr.port}`,
        forcePathStyle: true,
        defaultRequestTimeoutMs: 100,
      });
      await retryWithBackoff(
        () => s3.putObject("k", new Uint8Array([1, 2, 3])),
        { maxAttempts: 3, baseDelayMs: 10 },
      );
      assertEquals(
        state.requestCount,
        2,
        "TimeoutError on attempt 1 must trigger a retry that succeeds on attempt 2",
      );
    } finally {
      if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
      else Deno.env.delete("AWS_ACCESS_KEY_ID");
      if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      await server.shutdown();
    }
  },
});

Deno.test({
  sanitizeResources: false,
  sanitizeOps: false,
  name:
    "integration: retryWithBackoff treats a real SDK connection reset as retryable",
  fn: async () => {
    // Accept attempt 1 and slam the socket closed, accept attempt 2 and
    // return a proper HTTP 200. Verifies the AWS SDK's transport-level
    // error (name "Http", no httpStatusCode) is classified retryable.
    //
    // Uses raw Deno.listen instead of Deno.serve because Deno.serve
    // writes a basic HTTP response on handler throw, which would give us
    // an HTTP error instead of a connection-level one.
    const listener = Deno.listen({ port: 0 });
    const addr = listener.addr as Deno.NetAddr;
    let attempt = 0;

    const acceptLoop = (async () => {
      for await (const conn of listener) {
        attempt++;
        if (attempt === 1) {
          // Connection reset: close without reading, without responding.
          try {
            conn.close();
          } catch {
            // already closed
          }
        } else {
          // Attempt 2: read the request (best-effort), then write 200.
          const buf = new Uint8Array(4096);
          try {
            await conn.read(buf);
          } catch {
            // body may be larger; ignoring
          }
          const resp =
            "HTTP/1.1 200 OK\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
          try {
            await conn.write(new TextEncoder().encode(resp));
          } catch {
            // peer may have closed
          }
          try {
            conn.close();
          } catch {
            // already closed
          }
        }
      }
    })();

    const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
    try {
      const s3 = new S3Client({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint: `http://127.0.0.1:${addr.port}`,
        forcePathStyle: true,
      });
      await retryWithBackoff(
        () => s3.putObject("k", new Uint8Array([1, 2, 3])),
        { maxAttempts: 3, baseDelayMs: 10 },
      );
      assertEquals(
        attempt,
        2,
        "connection reset on attempt 1 must trigger a retry that succeeds on attempt 2",
      );
    } finally {
      if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
      else Deno.env.delete("AWS_ACCESS_KEY_ID");
      if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      try {
        listener.close();
      } catch {
        // already closed
      }
      await acceptLoop.catch(() => {}); // listener.close races accept()
    }
  },
});

Deno.test({
  sanitizeResources: false,
  name: "integration: pushFile retries a transient 503 via the real SDK path",
  fn: async () => {
    const cachePath = await Deno.makeTempDir({
      prefix: "s3sync-integration-",
    });
    try {
      await seedFile(cachePath, "data/a.yaml", "payload\n");

      await withProgrammableServer(
        [
          () =>
            new Response(
              '<?xml version="1.0"?><Error><Code>ServiceUnavailable</Code><Message>try later</Message><RequestId>rA</RequestId></Error>',
              {
                status: 503,
                headers: { "Content-Type": "application/xml" },
              },
            ),
          () => new Response(null, { status: 200 }),
        ],
        async (s3, state) => {
          const service = new S3CacheSyncService(s3, cachePath);
          // pushFile is what's called inside pushChanged's Promise.allSettled;
          // calling it directly isolates the retry behavior from the
          // pushChanged index writeback (which would need its own fixtures).
          await service.pushFile("data/a.yaml");
          assertEquals(
            state.requestCount,
            2,
            "pushFile must retry a transient 503 via the real SDK",
          );
        },
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  },
});

// =========================================================================
// DEF-2 fast path: zero-diff sync skips the index GET and the cache walk.
//
// The motivating bug (swamp-club lab/164): a 4k-file production repo took
// ~5 min on a no-op sync because every call fetched the 1.37 MB index and
// stat'd the entire cache. The sidecar at <cache>/.datastore-sync-state.json
// records the last verified remote ETag and a localDirty flag so the next
// pullChanged/pushChanged can short-circuit when nothing has changed.
//
// The fall-through tests below are weighted as heavily as the happy-path
// hit tests — a fast path that silently skips real work would be much
// worse than the perf bug it replaces.
// =========================================================================

const SYNC_STATE_FILE = ".datastore-sync-state.json";

/** Write a sidecar directly to disk, mimicking a prior verified-clean run. */
async function writeSidecar(
  cachePath: string,
  state: {
    version?: number;
    remoteIndexETag?: string;
    lastVerifiedAt?: string;
    localDirty?: boolean;
  },
): Promise<void> {
  await Deno.mkdir(cachePath, { recursive: true });
  await Deno.writeTextFile(
    join(cachePath, SYNC_STATE_FILE),
    JSON.stringify({
      version: 1,
      remoteIndexETag: "",
      lastVerifiedAt: new Date().toISOString(),
      localDirty: false,
      ...state,
    }),
  );
}

/** Read sidecar from disk; returns parsed JSON or null if missing/bad. */
async function readSidecar(
  cachePath: string,
): Promise<{ remoteIndexETag: string; localDirty: boolean } | null> {
  try {
    const text = await Deno.readTextFile(join(cachePath, SYNC_STATE_FILE));
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// -- (1) sidecar walker-exclusion guardrail -------------------------------

Deno.test("isInternalCacheFile: excludes the sync-state sidecar", () => {
  // The sidecar is per-machine state. If the walker ever uploads it, we
  // overwrite other writers' sidecars on push and break their fast path.
  assertEquals(isInternalCacheFile(".datastore-sync-state.json"), true);
});

// -- (2) post-verified pullChanged short-circuits with zero index GETs ----

Deno.test("pullChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-pull-" });
  try {
    const mock = createMockS3Client();
    // Seed a remote index + matching local file so the first pullChanged
    // ends in verified zero-diff state.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/ok.yaml", new TextEncoder().encode("hello"));
    await seedFile(cachePath, "data/@m/ok.yaml", "hello");

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();
    // First call should have GET'd the index once.
    const firstIndexGets = mock.gets.filter((k) =>
      k === ".datastore-index.json"
    ).length;
    assertEquals(firstIndexGets, 1, "first call must fetch the index");

    // Reset call history for the second call's assertion.
    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();
    assertEquals(result, 0, "second pullChanged must report zero pulls");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path must NOT GET the index",
    );
    // The HEAD probe is the entire fast-path check — exactly one expected.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      1,
      "fast path issues exactly one HEAD on the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (3) post-verified pushChanged short-circuits with zero walk ----------

Deno.test("pushChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-push-" });
  try {
    const mock = createMockS3Client();
    // Empty remote, empty local cache — first pushChanged ends in
    // sidecar-clean state via the no-op writeback path.
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    await Deno.mkdir(cachePath, { recursive: true });

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pushChanged();

    mock.gets.length = 0;
    mock.heads.length = 0;
    mock.puts.length = 0;

    const result = await service.pushChanged();
    assertEquals(result, 0, "second pushChanged must report zero pushes");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path must NOT force-fetch the index",
    );
    assertEquals(
      mock.puts.length,
      0,
      "fast path must NOT trigger an index writeback",
    );
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      1,
      "fast path issues exactly one HEAD on the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (4) corrupt sidecar falls through, never throws ----------------------

Deno.test("pullChanged: corrupt sidecar (bad JSON / wrong version / missing fields) falls through to full walk", async () => {
  for (
    const corrupt of [
      "this is not json",
      JSON.stringify({ version: 999 }),
      JSON.stringify({
        version: 1,
        // missing remoteIndexETag, lastVerifiedAt, localDirty
      }),
      JSON.stringify({
        version: 1,
        remoteIndexETag: 42, // wrong type
        lastVerifiedAt: "2026-01-01T00:00:00Z",
        localDirty: false,
      }),
    ]
  ) {
    const cachePath = await Deno.makeTempDir({
      prefix: "s3sync-fast-corrupt-",
    });
    try {
      await Deno.mkdir(cachePath, { recursive: true });
      await Deno.writeTextFile(join(cachePath, SYNC_STATE_FILE), corrupt);

      const mock = createMockS3Client();
      mock.storage.set(".datastore-index.json", encodeIndex({}));

      const service = new S3CacheSyncService(mock, cachePath);
      // Must not throw on any of the corrupt-sidecar shapes.
      const result = await service.pullChanged();
      assertEquals(result, 0);
      // And must have fallen through to the full walk: index was GET'd.
      assert(
        mock.gets.includes(".datastore-index.json"),
        `corrupt sidecar (${
          corrupt.slice(0, 30)
        }…) must fall through, not fast-path`,
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  }
});

// -- (5) remote ETag change bypasses short-circuit ------------------------

Deno.test("pullChanged: remote index ETag change bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-etag-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();
    const sidecarBefore = await readSidecar(cachePath);
    assertExists(sidecarBefore);

    // Remote-side mutation: write a new index payload. The mock derives
    // ETag from content, so this changes the ETag.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/new.yaml": {
          key: "data/@m/new.yaml",
          size: 3,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/new.yaml", new TextEncoder().encode("new"));

    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();
    // Fast path must have bailed; the new file gets pulled.
    assertEquals(result, 1, "must pull the newly-added remote file");
    assert(
      mock.gets.includes(".datastore-index.json"),
      "ETag mismatch must force a real index fetch",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (6) multipart-shaped ETag bypasses short-circuit --------------------

Deno.test("pullChanged: multipart-shaped ETag ('abc-2') bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "s3sync-fast-multipart-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    // Pin a multipart-shaped ETag for the remote index. The mock's HEAD
    // returns this regardless of body content.
    mock.etagOverrides.set(".datastore-index.json", `"abc-2"`);

    // Plant a sidecar with the matching multipart ETag — the fast path
    // must STILL bail because multipart ETags aren't a content
    // fingerprint and any equality check would be spuriously true.
    // No local index file is seeded so pullIndex's TTL cache also
    // misses and falls through to a real S3 GET, which is what the
    // assertion below proves.
    await writeSidecar(cachePath, {
      remoteIndexETag: "abc-2",
      lastVerifiedAt: new Date().toISOString(),
    });

    const service = new S3CacheSyncService(mock, cachePath);
    const result = await service.pullChanged();
    assertEquals(result, 0);
    // Multipart guard must have forced fall-through to the GET path.
    assert(
      mock.gets.includes(".datastore-index.json"),
      "multipart ETag must force fall-through to a real index GET",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (7) local file mutation forces real push work -----------------------

Deno.test("pushChanged: local file mutation since last sync forces real push work", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-mutate-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    // Establish a clean baseline.
    const service = new S3CacheSyncService(mock, cachePath);
    await service.pushChanged();

    // Now simulate the user side: a local cache write through pushFile
    // (the contracted write path), then sync.
    await seedFile(cachePath, "data/@m/added.yaml", "added\n");

    mock.puts.length = 0;
    mock.gets.length = 0;

    // Going through pushFile flips localDirty=true, so the next
    // pushChanged must take the slow path.
    await service.pushFile("data/@m/added.yaml");
    const sidecarAfterDirty = await readSidecar(cachePath);
    assertEquals(
      sidecarAfterDirty?.localDirty,
      true,
      "pushFile must flip localDirty before its work",
    );

    // Reset mock counters and run pushChanged: it must do the real walk
    // and writeback, not short-circuit.
    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();
    assert(
      mock.gets.includes(".datastore-index.json"),
      "localDirty=true must force a real index force-fetch",
    );
    assert(
      mock.puts.some((p) => p.key === ".datastore-index.json"),
      "localDirty=true must lead to an index writeback",
    );

    const sidecarAfterPush = await readSidecar(cachePath);
    assertEquals(
      sidecarAfterPush?.localDirty,
      false,
      "successful writeback must clear localDirty",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (8) AbortSignal cancellation propagates -----------------------------

Deno.test("pullChanged / pushChanged: AbortSignal cancellation propagates", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-abort-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
    const controller = new AbortController();
    controller.abort();

    await assertRejects(
      () => service.pullChanged({ signal: controller.signal }),
      DOMException,
      undefined,
      "pullChanged must reject with AbortError when signal is pre-aborted",
    );
    await assertRejects(
      () => service.pushChanged({ signal: controller.signal }),
      DOMException,
      undefined,
      "pushChanged must reject with AbortError when signal is pre-aborted",
    );

    // Pre-aborted call must not have issued any S3 calls beyond — at
    // most — the sidecar HEAD probe (which itself respects the signal).
    // Confirm no GETs/PUTs leaked through.
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no GETs after abort",
    );
    assertEquals(
      mock.puts.length,
      0,
      "no PUTs after abort",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (9) guardrail: direct cache writes bypass localDirty tracking -------

// CONTRACT: only `pushFile` is permitted to write into the cache from
// the extension's side — that's the path that flips
// `localDirty: true` before the upload work. A future PR adding
// another cache-writer must update this test alongside the new code.
// As long as no other writer exists, a direct `Deno.writeFile` into
// the cache is a contract violation: the sidecar tracking won't see
// it, and the next `pushChanged` will fast-path past the change.
//
// This test pins that contract so the limitation is explicit. Loosening
// it (e.g. walking-on-every-push to re-confirm) would defeat DEF-2's
// whole purpose.

Deno.test("pushChanged: direct Deno.writeFile bypasses localDirty tracking (contract)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "s3sync-fast-guardrail-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
    // Establish a clean baseline.
    await service.pushChanged();

    // Reach around the contract: write directly to the cache without
    // going through pushFile. localDirty stays false because nothing
    // told the sidecar otherwise.
    await seedFile(cachePath, "data/@m/sneaky.yaml", "sneaky\n");

    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();

    // Fast-path hit: sneaky.yaml is NEVER uploaded. This is the
    // documented limitation — the cost of walking on every push would
    // erase DEF-2's gains, so the contract is "writes go through
    // pushFile". If you broke this test by adding a new cache writer,
    // teach that writer to flip the sidecar (or call markLocalDirty
    // itself) instead of removing this assertion.
    assertEquals(
      mock.puts.length,
      0,
      "fast path skipped the direct write — this is the documented contract, not a bug",
    );
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path also skipped the index force-fetch",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});
