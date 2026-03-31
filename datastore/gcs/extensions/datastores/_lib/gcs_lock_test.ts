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

import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { assertLockConformance } from "@systeminit/swamp-testing";
import { GcsLock, LockTimeoutError } from "./gcs_lock.ts";
import type {
  GcsClient,
  GcsObjectMetadata,
  GcsWriteResult,
} from "./gcs_client.ts";
import type { LockInfo } from "./interfaces.ts";

/** In-memory mock of GcsClient for testing lock mechanics. */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
} {
  const storage = new Map<string, Uint8Array>();
  /** Auto-incrementing generation counter, per key. */
  const generations = new Map<string, number>();
  const putTimes = new Map<string, Date>();

  function nextGen(key: string): string {
    const g = (generations.get(key) ?? 0) + 1;
    generations.set(key, g);
    return String(g);
  }

  return {
    storage,

    putObject(key: string, body: Uint8Array): Promise<GcsWriteResult> {
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    putObjectConditional(
      key: string,
      body: Uint8Array,
    ): Promise<GcsWriteResult | null> {
      if (storage.has(key)) {
        return Promise.resolve(null);
      }
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    putObjectCas(
      key: string,
      body: Uint8Array,
      expectedGeneration: string,
    ): Promise<GcsWriteResult | null> {
      const currentGen = String(generations.get(key) ?? 0);
      if (currentGen !== expectedGeneration) {
        return Promise.resolve(null);
      }
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    getObject(key: string): Promise<Uint8Array> {
      const data = storage.get(key);
      if (!data) return Promise.reject(new Error(`NotFound: ${key}`));
      return Promise.resolve(data);
    },

    deleteObject(key: string): Promise<void> {
      storage.delete(key);
      generations.delete(key);
      putTimes.delete(key);
      return Promise.resolve();
    },

    getMetadata(key: string): Promise<GcsObjectMetadata> {
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        updated: putTimes.get(key) ?? new Date(),
        generation: String(generations.get(key) ?? 0),
      });
    },
  } as unknown as GcsClient & { storage: Map<string, Uint8Array> };
}

Deno.test("GcsLock: acquire and release", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  await lock.acquire();

  assertEquals(mock.storage.has(".datastore.lock"), true);
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: release is idempotent", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  await lock.acquire();
  await lock.release();
  await lock.release(); // Should not throw
});

Deno.test("GcsLock: withLock executes callback and releases", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  const result = await lock.withLock(() => {
    assertEquals(mock.storage.has(".datastore.lock"), true);
    return Promise.resolve(42);
  });

  assertEquals(result, 42);
  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: withLock releases on error", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  try {
    await lock.withLock(() => {
      return Promise.reject(new Error("test error"));
    });
  } catch {
    // Expected
  }

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: second acquire times out when lock is held", async () => {
  const mock = createMockGcsClient();
  const lock1 = new GcsLock(mock, { ttlMs: 60_000 });
  const lock2 = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 50,
    maxWaitMs: 300,
  });

  await lock1.acquire();

  await assertRejects(
    () => lock2.acquire(),
    LockTimeoutError,
  );

  await lock1.release();
});

Deno.test("GcsLock: stale lock is force-acquired", async () => {
  const mock = createMockGcsClient();

  // Place a stale lock
  const staleLock: LockInfo = {
    holder: "stale@host",
    hostname: "host",
    pid: 99999,
    acquiredAt: new Date(Date.now() - 120_000).toISOString(),
    ttlMs: 5000,
  };
  const body = new TextEncoder().encode(JSON.stringify(staleLock, null, 2));
  mock.storage.set(".datastore.lock", body);

  // Override getMetadata to return stale updated time
  const originalMeta = mock.getMetadata.bind(mock);
  (mock as unknown as Record<string, unknown>).getMetadata = (key: string) => {
    if (key === ".datastore.lock") {
      return Promise.resolve({
        exists: true,
        size: body.length,
        updated: new Date(Date.now() - 120_000),
        generation: "1",
      });
    }
    return originalMeta(key);
  };

  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();
});

Deno.test("GcsLock: inspect returns null when no lock exists", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  const info = await lock.inspect();
  assertEquals(info, null);
});

Deno.test("GcsLock: forceRelease deletes lock when nonce matches", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);

  const released = await lock.forceRelease(info!.nonce!);
  assertEquals(released, true);

  assertEquals(mock.storage.has(".datastore.lock"), false);

  // Clean up internal state (heartbeat)
  await lock.release();
});

Deno.test("GcsLock: forceRelease returns false when nonce does not match", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const released = await lock.forceRelease("wrong-nonce");
  assertEquals(released, false);

  assertEquals(mock.storage.has(".datastore.lock"), true);

  await lock.release();
});

Deno.test("GcsLock: forceRelease returns false when no lock exists", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  const released = await lock.forceRelease("some-nonce");
  assertEquals(released, false);
});

Deno.test("GcsLock: custom lock key", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, {
    lockKey: "custom.lock",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("custom.lock"), true);
  assertEquals(mock.storage.has(".datastore.lock"), false);

  await lock.release();
});

// --- Conformance suite ---

Deno.test("GcsLock: passes DistributedLock conformance suite", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await assertLockConformance(lock);
});
