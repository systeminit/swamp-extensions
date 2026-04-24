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
} from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import { GcsCacheSyncService, isInternalCacheFile } from "./gcs_cache_sync.ts";
import { NotFoundError } from "./gcs_client.ts";
import type {
  GcsClient,
  GcsObjectMetadata,
  GcsWriteResult,
} from "./gcs_client.ts";

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/**
 * In-memory mock of GcsClient recording getObject/putObject/getMetadata
 * calls. `generationOverrides` lets a test pin a specific generation
 * string (for example `""` or `"0"` for the unusable-fingerprint case)
 * regardless of stored content. Mock method bodies reject
 * SYNCHRONOUSLY on a pre-aborted signal — promise-based rejection
 * would race the fast-path probe and leak a real HEAD call.
 */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
  generationOverrides: Map<string, string>;
  puts: PutCall[];
  gets: string[];
  heads: string[];
} {
  const storage = new Map<string, Uint8Array>();
  const generations = new Map<string, number>();
  const generationOverrides = new Map<string, string>();
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
    puts,
    gets,
    heads,

    putObject(
      key: string,
      body: Uint8Array,
      signal?: AbortSignal,
    ): Promise<GcsWriteResult> {
      throwIfAborted(signal);
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

// -- (9) guardrail: direct cache writes bypass localDirty tracking -------
//
// CONTRACT: only `pushFile` is permitted to write into the cache from
// the extension's side — that's the path that flips
// `localDirty: true` before the upload work. A future PR adding
// another cache-writer must update this test alongside the new code.
// As long as no other writer exists, a direct `Deno.writeFile` into
// the cache is a contract violation: the sidecar tracking won't see
// it, and the next `pushChanged` will fast-path past the change.
//
// This test pins that contract so the limitation is explicit.
// Loosening it (e.g. walking on every push to re-confirm) would
// defeat the fast-path's whole purpose.

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
