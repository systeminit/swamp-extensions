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

import { assertEquals, assertExists } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import { GcsCacheSyncService } from "./gcs_cache_sync.ts";
import type { GcsClient } from "./gcs_client.ts";

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/** In-memory mock of GcsClient recording getObject/putObject calls. */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
  puts: PutCall[];
  gets: string[];
} {
  const storage = new Map<string, Uint8Array>();
  const puts: PutCall[] = [];
  const gets: string[] = [];

  return {
    storage,
    puts,
    gets,

    putObject(key: string, body: Uint8Array): Promise<{ generation: string }> {
      storage.set(key, body);
      puts.push({ key, body });
      return Promise.resolve({ generation: "1" });
    },

    getObject(key: string): Promise<Uint8Array> {
      gets.push(key);
      const data = storage.get(key);
      if (!data) return Promise.reject(new Error(`NoSuchKey: ${key}`));
      return Promise.resolve(data);
    },
  } as unknown as GcsClient & {
    storage: Map<string, Uint8Array>;
    puts: PutCall[];
    gets: string[];
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

// -- (e2) pullIndex cache-hit path scrubs in-memory, pushChanged propagates -

Deno.test("pullIndex cache-hit path: scrubs in-memory, next pushChanged propagates to remote", async () => {
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

    await service.pushChanged();

    const indexPuts = mock.puts.filter((p) =>
      p.key === ".datastore-index.json"
    );
    assertEquals(
      indexPuts.length,
      1,
      "scrubbed index must be pushed exactly once via indexMutated",
    );
    const pushedIndex = decodeIndex(indexPuts[0].body);
    assertEquals(
      Object.keys(pushedIndex.entries).sort(),
      ["data/@m/ok.yaml"],
      "pushed index must contain only the legitimate entry",
    );
    assertEquals(
      state.indexMutated,
      false,
      "indexMutated must reset after write-back",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (f) indexMutated propagates on no-op push and resets ------------------

Deno.test("pushChanged: no-op push still propagates scrubbed index, second call is quiet", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-f-" });
  try {
    const mock = createMockGcsClient();

    await seedFile(
      cachePath,
      ".datastore-index.json",
      JSON.stringify({
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {
          "data/_catalog.db-wal": {
            key: "data/_catalog.db-wal",
            size: 42,
            lastModified: new Date().toISOString(),
          },
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
      "second pushChanged must NOT rewrite the index — flag must reset",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});
