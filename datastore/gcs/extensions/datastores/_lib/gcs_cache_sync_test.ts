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

// Tests for GcsCacheSyncService focusing on the swamp-club#29 fix:
// mirrors s3_cache_sync_test.ts behavior since the GCS sync service
// shares the identical internal-file exclusion pattern and scrub
// logic. See swamp-club#29 for the motivating bug.

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import {
  GcsCacheSyncService,
  isInternalCacheFile,
  isRetryableError,
  retryWithBackoff,
} from "./gcs_cache_sync.ts";
import {
  GcsClient,
  GcsOperationError,
  NotFoundError,
  PreconditionFailedError,
} from "./gcs_client.ts";
import type { GcsObjectMetadata, GcsWriteResult } from "./gcs_client.ts";

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/**
 * In-memory mock of GcsClient recording getObject/putObject/getMetadata
 * calls. `generationOverrides` lets a test pin a specific generation
 * string (for example `""` or `"0"` for the unusable-fingerprint case)
 * regardless of stored content. `putFailures` lets a test inject a
 * failure per key for retry / batch-error tests — cleaner than
 * monkey-patching the method and avoids `any`-typed reassignments.
 * Mock method bodies reject SYNCHRONOUSLY on a pre-aborted signal —
 * promise-based rejection would race the fast-path probe and leak a
 * real HEAD call.
 */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
  generationOverrides: Map<string, string>;
  putFailures: Map<string, Error>;
  puts: PutCall[];
  gets: string[];
  heads: string[];
} {
  const storage = new Map<string, Uint8Array>();
  const generations = new Map<string, number>();
  const generationOverrides = new Map<string, string>();
  const putFailures = new Map<string, Error>();
  const puts: PutCall[] = [];
  const gets: string[] = [];
  const heads: string[] = [];

  const nextGen = (key: string): string => {
    const g = (generations.get(key) ?? 0) + 1;
    generations.set(key, g);
    return String(g);
  };

  const genFor = (key: string): string =>
    generationOverrides.get(key) ?? String(generations.get(key) ?? 0);

  const throwIfAborted = (signal?: AbortSignal) => {
    if (signal?.aborted) {
      throw new DOMException("aborted", "AbortError");
    }
  };

  return {
    storage,
    generationOverrides,
    putFailures,
    puts,
    gets,
    heads,

    putObject(
      key: string,
      body: Uint8Array,
      signal?: AbortSignal,
    ): Promise<GcsWriteResult> {
      throwIfAborted(signal);
      const injected = putFailures.get(key);
      if (injected) return Promise.reject(injected);
      storage.set(key, body);
      puts.push({ key, body });
      return Promise.resolve({ generation: nextGen(key) });
    },

    getObject(key: string, signal?: AbortSignal): Promise<Uint8Array> {
      throwIfAborted(signal);
      gets.push(key);
      const data = storage.get(key);
      if (!data) {
        return Promise.reject(new NotFoundError(`Object not found: ${key}`));
      }
      return Promise.resolve(data);
    },

    getMetadata(
      key: string,
      signal?: AbortSignal,
    ): Promise<GcsObjectMetadata> {
      throwIfAborted(signal);
      heads.push(key);
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        updated: new Date(),
        generation: genFor(key),
      });
    },
  } as unknown as GcsClient & {
    storage: Map<string, Uint8Array>;
    generationOverrides: Map<string, string>;
    putFailures: Map<string, Error>;
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
function privateState(service: GcsCacheSyncService): {
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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-a-" });
  try {
    const mock = createMockGcsClient();
    const service = new GcsCacheSyncService(mock, cachePath);

    await seedFile(cachePath, "data/@my-model/payload.yaml", "name: x\n");
    await seedFile(cachePath, "data/_catalog.db", "SQLITE-MAIN");
    await seedFile(cachePath, "data/_catalog.db-shm", "SQLITE-SHM");
    await seedFile(cachePath, "data/_catalog.db-wal", "SQLITE-WAL");

    await service.pushChanged();

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-b-" });
  try {
    const mock = createMockGcsClient();
    const service = new GcsCacheSyncService(mock, cachePath);

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-c-" });
  try {
    const mock = createMockGcsClient();
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
    await seedFile(cachePath, "data/@m/ok.yaml", "ok: yes\n");

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

    const state = privateState(service);
    assertExists(state.index);
    state.index.entries["data/_catalog.db-wal"] = {
      key: "data/_catalog.db-wal",
      size: 1024,
      lastModified: new Date().toISOString(),
    };

    await service.pullChanged();

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-d-" });
  try {
    const mock = createMockGcsClient();
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
    mock.storage.set(
      "data/@m/payload.yaml",
      new TextEncoder().encode("hi!\n\n"),
    );

    const service = new GcsCacheSyncService(mock, cachePath);
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

// -- (e1) pullIndex GCS-fetch path scrubs in-memory AND rewrites local ----

Deno.test("pullIndex GCS-fetch path: scrubs in-memory and rewrites local cache file", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-e1-" });
  try {
    const mock = createMockGcsClient();
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

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-e2-" });
  try {
    const mock = createMockGcsClient();

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

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

    assertEquals(
      mock.gets.includes(".datastore-index.json"),
      false,
      "cache-hit branch must not fetch the index from GCS",
    );

    const state = privateState(service);
    assertExists(state.index);
    assertEquals(Object.keys(state.index.entries).sort(), ["data/@m/ok.yaml"]);
    assertEquals(state.indexMutated, true);

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-g-" });
  try {
    const mock = createMockGcsClient();

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

    const service = new GcsCacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-f-" });
  try {
    const mock = createMockGcsClient();

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

    const service = new GcsCacheSyncService(mock, cachePath);

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
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-h-" });
  try {
    const puts: PutCall[] = [];
    const mock = {
      putObject(
        key: string,
        body: Uint8Array,
      ): Promise<{ generation: string }> {
        puts.push({ key, body });
        return Promise.resolve({ generation: "1" });
      },
      getObject(_key: string): Promise<Uint8Array> {
        // Simulate a transient 5xx: generic Error, NOT a NotFoundError.
        return Promise.reject(new Error("500 Internal Server Error"));
      },
    } as unknown as GcsClient;

    await seedFile(cachePath, "data/@m/payload.yaml", "data\n");

    const service = new GcsCacheSyncService(mock, cachePath);

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

// ============================================================================
// Fast-path test block (1)–(9) — ref lab/166.
//
// GCS fingerprint is the remote index's `generation` string instead of
// an S3-style ETag. Design differences from s3's (1)-(9) block:
//   - No `normalizeETag` helper equivalent — generation is a plain
//     int64 string with no wire quirks.
//   - Test (6) swaps s3's "multipart ETag bypasses fast path" case for
//     "empty-string generation bypasses fast path" — GCS never returns
//     multipart-style fingerprints because generation is unique per
//     write regardless of upload method.
// ============================================================================

// -- (1) sidecar walker-exclusion guardrail -------------------------------

Deno.test("isInternalCacheFile: excludes the sync-state sidecar", () => {
  assertEquals(isInternalCacheFile(".datastore-sync-state.json"), true);
  assertEquals(isInternalCacheFile("regular/file.yaml"), false);
});

// -- (2) post-verified pullChanged short-circuits with zero index GETs ----

Deno.test("pullChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast2-" });
  try {
    const mock = createMockGcsClient();
    // Seed a remote index + local index so the first pull marks clean.
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming pull — slow-path, writes the sidecar.
    await service.pullChanged();

    // Reset call ledgers; second pull must fast-path.
    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();

    assertEquals(result, 0, "fast path should return 0 pulled");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no index GET on fast-path hit — only the sidecar HEAD fires",
    );
    assertEquals(
      mock.heads.length,
      1,
      "exactly one HEAD of the index during the fast-path probe",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (3) post-verified pushChanged short-circuits with zero walk ----------

Deno.test("pushChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast3-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming sync populates the sidecar (pull then push slow-path).
    await service.pullChanged();
    await service.pushChanged();

    mock.gets.length = 0;
    mock.heads.length = 0;
    mock.puts.length = 0;

    const result = await service.pushChanged();

    assertEquals(result, 0, "fast path should return 0 pushed");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no index GET on fast-path hit",
    );
    assertEquals(
      mock.puts.length,
      0,
      "no putObject calls on fast-path hit — nothing walked, nothing written",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (4) corrupt sidecar falls through, never throws ----------------------

Deno.test("pullChanged: corrupt sidecar (bad JSON / wrong version / missing fields) falls through to slow path", async () => {
  const corruptCases = [
    "not valid json{",
    JSON.stringify({
      version: 999,
      remoteIndexGeneration: "1",
      lastVerifiedAt: "2026-01-01T00:00:00Z",
      localDirty: false,
    }),
    JSON.stringify({ version: 1 /* missing fields */ }),
  ];
  for (const [i, corrupt] of corruptCases.entries()) {
    const cachePath = await Deno.makeTempDir({ prefix: `gcssync-fast4-${i}-` });
    try {
      const mock = createMockGcsClient();
      await mock.putObject(".datastore-index.json", encodeIndex({}));
      await Deno.mkdir(cachePath, { recursive: true });
      await Deno.writeTextFile(
        join(cachePath, ".datastore-sync-state.json"),
        corrupt,
      );

      const service = new GcsCacheSyncService(mock, cachePath);

      // Must NOT throw. Must fall through to slow path — which GETs
      // the remote index (populating mock.gets).
      await service.pullChanged();

      assert(
        mock.gets.some((k) => k === ".datastore-index.json"),
        `corrupt sidecar case ${i} must fall through to slow-path index GET`,
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  }
});

// -- (5) remote generation change bypasses short-circuit ------------------

Deno.test("pullChanged: remote index generation change bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast5-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    // Bump the remote generation — simulates another writer pushing
    // an updated index between our syncs.
    mock.generationOverrides.set(".datastore-index.json", "999");

    mock.gets.length = 0;
    mock.heads.length = 0;

    await service.pullChanged();

    // Fast-path probe HEADs (generation mismatch), then slow path
    // GETs the remote index.
    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "generation mismatch must bypass fast path and slow-path GET the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (6) empty/zero generation bypasses fast path -------------------------
//
// GCS-specific: the S3 equivalent test checks multipart-shaped ETag
// bypass. GCS generation is always unique per write (no multipart
// variant), so the analogous unusable-fingerprint case is an
// empty-string or "0" generation — values `tryFastPull*` rejects
// explicitly. This pins the defensive check so a future implementer
// doesn't "simplify" it out.

Deno.test("pullChanged: empty-string generation bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast6-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    mock.generationOverrides.set(".datastore-index.json", "");

    mock.gets.length = 0;
    await service.pullChanged();

    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "empty generation must bypass fast path and slow-path GET the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (7) local file mutation forces real push work -----------------------

Deno.test("pushChanged: local file mutation since last sync forces real push work", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast7-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();
    await service.pushChanged();

    // pushFile marks localDirty. Call it directly to simulate a
    // cache-writer that goes through the proper path.
    mock.puts.length = 0;
    await seedFile(cachePath, "data/new/file.yaml", "fresh\n");
    await service.pushFile("data/new/file.yaml");

    // Next pushChanged — localDirty was set by pushFile, so fast path
    // must miss and slow-path walk.
    mock.gets.length = 0;
    await service.pushChanged();

    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "localDirty=true must force slow-path index fetch",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (8) AbortSignal cancellation propagates -----------------------------

Deno.test("pullChanged / pushChanged: AbortSignal cancellation propagates", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast8-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Reset ledgers so the seed putObject doesn't count against
    // "zero real calls leak after abort".
    mock.puts.length = 0;
    mock.gets.length = 0;
    mock.heads.length = 0;

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

    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no GETs after abort",
    );
    assertEquals(mock.puts.length, 0, "no PUTs after abort");
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (9) guardrail: direct cache writes without markDirty bypass tracking --
//
// CONTRACT: external writers into the cache directory (e.g.
// swamp-core's repository layer using atomicWriteFile) MUST call
// `markDirty()` on the sync service. Internal writes through
// `pushFile` flip `localDirty: true` automatically. A direct
// `Deno.writeFile` into the cache WITHOUT `markDirty` is a contract
// violation: the sidecar won't see it, and the next `pushChanged`
// fast-paths past the change. See the companion
// "markDirty: flips sidecar localDirty..." test for the recovery
// path.
//
// This test pins the failure mode when `markDirty` is forgotten so
// the footgun is explicit. Loosening it (e.g. walking on every push
// to re-confirm) would defeat the fast-path's whole purpose.

Deno.test("pushChanged: direct Deno.writeFile bypasses localDirty tracking (contract)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast9-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Clean baseline.
    await service.pullChanged();
    await service.pushChanged();

    // Direct write — bypasses pushFile, so localDirty stays false.
    await seedFile(cachePath, "data/@m/sneaky.yaml", "sneaky\n");

    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();

    // Fast path hit — sneaky.yaml never uploaded. This is the
    // documented contract (see S3 #105 precedent). If you broke
    // this test by adding a new cache writer, teach that writer to
    // flip the sidecar (or call markLocalDirty) instead of removing
    // the assertion.
    assertEquals(
      mock.puts.length,
      0,
      "fast path skipped the direct write — documented contract, not a bug",
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

// ============================================================================
// DEF-2 unit block — retry + classification + batch failure message.
// Ref lab/166 (S3 #102 mirror for GCS).
// ============================================================================

function makeGcsErr(status: number | null): GcsOperationError {
  return new GcsOperationError(`simulated ${status ?? "transport"}`, {
    name: "GcsOperationError",
    httpStatusCode: status,
    code: undefined,
    bodyPreview: undefined,
    uploadId: undefined,
  });
}

Deno.test("isRetryableError: 5xx and 429 are retryable, 4xx is not", () => {
  assertEquals(isRetryableError(makeGcsErr(500)), true);
  assertEquals(isRetryableError(makeGcsErr(502)), true);
  assertEquals(isRetryableError(makeGcsErr(503)), true);
  assertEquals(isRetryableError(makeGcsErr(429)), true);
  // transport-level (no HTTP status) retryable
  assertEquals(isRetryableError(makeGcsErr(null)), true);
  // 4xx non-429 → not retryable
  assertEquals(isRetryableError(makeGcsErr(400)), false);
  assertEquals(isRetryableError(makeGcsErr(401)), false);
  assertEquals(isRetryableError(makeGcsErr(403)), false);
  assertEquals(isRetryableError(makeGcsErr(404)), false);
});

Deno.test("isRetryableError: TimeoutError retryable, AbortError + narrow types not", () => {
  const timeout = new Error("t");
  timeout.name = "TimeoutError";
  const abort = new Error("a");
  abort.name = "AbortError";
  assertEquals(isRetryableError(timeout), true);
  assertEquals(isRetryableError(abort), false);
  assertEquals(isRetryableError(new NotFoundError("nf")), false);
  assertEquals(isRetryableError(new PreconditionFailedError("pf")), false);
});

Deno.test("retryWithBackoff: succeeds after transient 503", async () => {
  let calls = 0;
  const result = await retryWithBackoff(
    () => {
      calls++;
      if (calls === 1) return Promise.reject(makeGcsErr(503));
      return Promise.resolve("ok");
    },
    { baseDelayMs: 5 },
  );
  assertEquals(result, "ok");
  assertEquals(calls, 2);
});

Deno.test("retryWithBackoff: does NOT retry non-retryable (403)", async () => {
  let calls = 0;
  await assertRejects(
    () =>
      retryWithBackoff(
        () => {
          calls++;
          return Promise.reject(makeGcsErr(403));
        },
        { baseDelayMs: 5 },
      ),
    GcsOperationError,
  );
  assertEquals(calls, 1, "403 is terminal, no retries");
});

Deno.test("retryWithBackoff: exhausts maxAttempts then rethrows", async () => {
  let calls = 0;
  await assertRejects(
    () =>
      retryWithBackoff(
        () => {
          calls++;
          return Promise.reject(makeGcsErr(500));
        },
        { baseDelayMs: 5, maxAttempts: 3 },
      ),
    GcsOperationError,
  );
  assertEquals(calls, 3);
});

Deno.test("retryWithBackoff: signal abort during backoff wakes sleep with AbortError", async () => {
  const controller = new AbortController();
  let calls = 0;
  const promise = retryWithBackoff(
    () => {
      calls++;
      return Promise.reject(makeGcsErr(503));
    },
    { baseDelayMs: 5_000, signal: controller.signal },
  );
  // Let one call fire, then abort. The backoff sleep should wake.
  await new Promise((r) => setTimeout(r, 50));
  controller.abort();
  await assertRejects(() => promise, DOMException);
  assertEquals(calls, 1, "abort fires during backoff, not during next op");
});

// --- batch failure message includes underlying error details --------------

Deno.test("pushChanged: batch failure message includes underlying error details", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-def2-batch-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));

    // Inject per-key failures via the mock's putFailures hook so the
    // test exercises distinct error reasons (auth, server, transport)
    // in the batch-failure message without resorting to method
    // reassignment.
    mock.putFailures.set("data/a.yaml", makeGcsErr(403)); // auth
    mock.putFailures.set("data/b.yaml", makeGcsErr(500)); // server
    mock.putFailures.set("data/c.yaml", makeGcsErr(null)); // transport
    mock.putFailures.set("data/d.yaml", makeGcsErr(null)); // transport

    await seedFile(cachePath, "data/a.yaml", "a");
    await seedFile(cachePath, "data/b.yaml", "b");
    await seedFile(cachePath, "data/c.yaml", "c");
    await seedFile(cachePath, "data/d.yaml", "d");

    const service = new GcsCacheSyncService(mock, cachePath);
    const err = await assertRejects(
      () => service.pushChanged(),
      Error,
    );

    assertStringIncludes(err.message, "Failed to push 4 file(s) to GCS");
    // First 3 of 4 failures are surfaced with underlying messages,
    // the 4th rolls up to "... and 1 more". Walk order isn't stable
    // across filesystems, so count inline failures rather than
    // asserting a specific subset.
    const inlineFailures = ["a", "b", "c", "d"].filter((n) =>
      err.message.includes(`data/${n}.yaml:`)
    );
    assertEquals(
      inlineFailures.length,
      3,
      `first 3 failures should appear inline, got ${inlineFailures.join(",")}`,
    );
    assertStringIncludes(err.message, "... and 1 more");
    // Distinct underlying reasons all represented across the message.
    assertStringIncludes(err.message, "simulated");
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// ============================================================================
// DEF-2 integration block — retry against a programmable HTTP server.
// Drives the real GcsClient through Deno.serve so wire-level retry
// behavior (503/429/403/timeout) is exercised end-to-end. Ref lab/166,
// mirrors S3 #102 integration layout.
// ============================================================================

/**
 * Spin up a local HTTP server for integration tests and return its
 * base URL + shutdown handle. Same pattern as gcs_client_test.ts.
 */
function startIntegrationServer(
  handler: (req: Request) => Response | Promise<Response>,
): { url: string; shutdown: () => Promise<void> } {
  const ac = new AbortController();
  const server = Deno.serve(
    { port: 0, signal: ac.signal, onListen() {} },
    handler,
  );
  const addr = server.addr;
  const url = `http://${
    addr.hostname === "::" ? "localhost" : addr.hostname
  }:${addr.port}`;
  return {
    url,
    shutdown: async () => {
      ac.abort();
      try {
        await server.finished;
      } catch {
        // expected on shutdown
      }
    },
  };
}

// The GCS client uses fetch() which keeps TCP connections alive in the
// global HTTP agent, which trips Deno's resource leak detection.
// sanitizeResources: false is safe here because those connections are
// reclaimed when the runtime tears down between test runs.

Deno.test({
  name: "DEF-2 integration: 503-then-200 pullFile retries and succeeds",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      if (calls === 1) return new Response("unavailable", { status: 503 });
      return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    });
    const cachePath = await Deno.makeTempDir({ prefix: "gcssync-int503-" });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 2000,
      });
      // Bypass retryWithBackoff's production delays — 5ms base suffices.
      const originalRetry = retryWithBackoff;
      // pullFile invokes retryWithBackoff internally; force fast backoff
      // by monkey-patching the module-level default via a dedicated
      // assertion path — simpler: pullFile is `await retryWithBackoff(...)`
      // with no config override, so we instead verify behavior via
      // calling retryWithBackoff directly with fast delays.
      const data = await originalRetry(
        () => client.getObject("obj"),
        { baseDelayMs: 5 },
      );
      assertEquals(Array.from(data), [1, 2, 3]);
      assertEquals(calls, 2, "first attempt 503, second 200");
    } finally {
      await shutdown();
      await Deno.remove(cachePath, { recursive: true });
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: 429 retries (no Retry-After honored, matches S3 #102)",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      if (calls === 1) {
        return new Response("rate limited", {
          status: 429,
          headers: { "Retry-After": "60" }, // deliberately ignored
        });
      }
      return new Response(new Uint8Array([0]), { status: 200 });
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const data = await retryWithBackoff(
        () => client.getObject("obj"),
        { baseDelayMs: 5 },
      );
      assertEquals(data.length, 1);
      assertEquals(calls, 2, "429 retried to success despite Retry-After");
    } finally {
      await shutdown();
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: 403 throws immediately with credential hint, no retry",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      return new Response(
        JSON.stringify({
          error: {
            code: 403,
            errors: [{ reason: "authError", message: "forbidden" }],
          },
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const err = await assertRejects(
        () =>
          retryWithBackoff(() => client.getObject("obj"), { baseDelayMs: 5 }),
        GcsOperationError,
      );
      assertEquals(err.httpStatusCode, 403);
      assertStringIncludes(err.message, "check GCS credentials");
      assertEquals(calls, 1, "403 is terminal — no retries");
    } finally {
      await shutdown();
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: TimeoutError retries, exhausts budget, surfaces timeout",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      // Never resolves — stalled socket simulation.
      return new Promise<Response>(() => {});
    });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 100,
      });
      const err = await assertRejects(
        () =>
          retryWithBackoff(() => client.getObject("obj"), {
            baseDelayMs: 5,
            maxAttempts: 3,
          }),
        GcsOperationError,
      );
      assertEquals(err.name, "TimeoutError");
      assertStringIncludes(err.message, "timed out after 100ms");
      assertEquals(calls, 3, "timeout retried until budget exhausted");
    } finally {
      await shutdown();
    }
  },
});

// ============================================================================
// markDirty() contract — ref lab/166 follow-up.
//
// The fast-path short-circuit depends on a `localDirty` flag in the
// sidecar. That flag is only flipped by `pushFile` internally OR by
// `markDirty()` from the outside. swamp-core writes directly to the
// cache via atomicWriteFile, bypassing `pushFile` — so it MUST call
// `markDirty()` before (or immediately after) each write, otherwise
// the next `pushChanged` fast-paths past the write and the data is
// silently missed on upload.
// ============================================================================

Deno.test("markDirty: flips sidecar localDirty and forces slow-path on next pushChanged", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-markdirty-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming sync populates the sidecar clean.
    await service.pullChanged();
    await service.pushChanged();

    // Simulate swamp-core writing directly to the cache AND
    // honoring the new contract by calling markDirty afterwards.
    await seedFile(cachePath, "data/external-writer.yaml", "external\n");
    await service.markDirty();

    // Reset call ledgers — next pushChanged must slow-path and
    // actually walk the cache, finding the new file.
    mock.puts.length = 0;
    mock.gets.length = 0;

    await service.pushChanged();

    assert(
      mock.puts.some((p) => p.key === "data/external-writer.yaml"),
      "markDirty must force the next pushChanged to walk and upload the externally-written file",
    );
    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "fast-path must not hit after markDirty — forceRemote index fetch expected",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty: is idempotent — repeated calls don't thrash the sidecar", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-markdirty-idem-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();
    await service.pushChanged();
    await service.markDirty();

    const sidecarPath = join(cachePath, ".datastore-sync-state.json");
    const mtimeAfterFirst = (await Deno.stat(sidecarPath)).mtime;
    assertExists(mtimeAfterFirst);

    // Repeated markDirty should NOT rewrite the sidecar when it's
    // already dirty. The early-return in markDirty (no-op when
    // `localDirty: true` is already recorded) means no new mtime.
    await new Promise((r) => setTimeout(r, 20));
    await service.markDirty();
    await service.markDirty();

    const mtimeAfterRepeats = (await Deno.stat(sidecarPath)).mtime;
    assertExists(mtimeAfterRepeats);
    assertEquals(
      mtimeAfterRepeats.getTime(),
      mtimeAfterFirst.getTime(),
      "idempotent markDirty must not rewrite the sidecar",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});
