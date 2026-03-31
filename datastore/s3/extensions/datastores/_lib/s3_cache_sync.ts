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

/**
 * S3 cache sync service for the S3 datastore.
 *
 * Maintains a local cache directory and syncs with S3:
 * - On startup: pulls metadata index (lightweight manifest)
 * - On read (cache miss): fetches specific file from S3
 * - On write: writes locally first, then pushes to S3 async
 * - `sync()`: full bidirectional sync
 */

import { dirname, join, normalize, relative } from "jsr:@std/path@1";
import { ensureDir, walk } from "jsr:@std/fs@1";
import type { DatastoreSyncService } from "./interfaces.ts";
import type { S3Client } from "./s3_client.ts";
import { atomicWriteTextFile } from "./atomic_write.ts";

/**
 * Validates that a relative path resolves within the cache directory.
 * Prevents path traversal attacks from malicious S3 keys.
 */
function assertSafePath(cachePath: string, relativePath: string): string {
  const resolved = normalize(join(cachePath, relativePath));
  const normalizedCache = normalize(cachePath);
  if (
    !resolved.startsWith(normalizedCache + "/") && resolved !== normalizedCache
  ) {
    throw new Error(`Path traversal detected: ${relativePath}`);
  }
  return resolved;
}

/** Metadata index entry for a file in S3. */
interface IndexEntry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
}

/** Metadata index tracking all files in the S3 datastore. */
interface DatastoreIndex {
  version: 1;
  lastPulled: string;
  entries: Record<string, IndexEntry>;
}

/** Push queue entry for files pending upload to S3. */
interface PushQueueEntry {
  relativePath: string;
  addedAt: string;
}

/** Push queue tracking files pending upload. */
interface PushQueue {
  entries: PushQueueEntry[];
}

/** TTL in ms for using the local index cache instead of fetching from S3. */
const INDEX_CACHE_TTL_MS = 60_000;

/** Maximum number of concurrent S3 downloads/uploads. */
const MAX_CONCURRENCY = 10;

/** S3 cache sync service. */
export class S3CacheSyncService implements DatastoreSyncService {
  private readonly s3: S3Client;
  private readonly cachePath: string;
  private readonly indexPath: string;
  private readonly pushQueuePath: string;
  private index: DatastoreIndex | null = null;

  constructor(s3: S3Client, cachePath: string) {
    this.s3 = s3;
    this.cachePath = cachePath;
    this.indexPath = join(cachePath, ".datastore-index.json");
    this.pushQueuePath = join(cachePath, ".push-queue.json");
  }

  /**
   * Pulls the metadata index from S3 (lightweight, single GET).
   * Uses a local cache with a 60-second TTL to avoid redundant fetches
   * during rapid command sequences.
   */
  async pullIndex(): Promise<void> {
    // Check local cache freshness
    try {
      const stat = await Deno.stat(this.indexPath);
      const ageMs = Date.now() - (stat.mtime?.getTime() ?? 0);
      if (ageMs < INDEX_CACHE_TTL_MS && this.index === null) {
        const content = await Deno.readTextFile(this.indexPath);
        this.index = JSON.parse(content) as DatastoreIndex;
        return; // Fresh enough — skip S3
      }
    } catch {
      // No local index — fetch from S3
    }

    try {
      const data = await this.s3.getObject(".datastore-index.json");
      const text = new TextDecoder().decode(data);
      this.index = JSON.parse(text) as DatastoreIndex;
      await ensureDir(this.cachePath);
      await atomicWriteTextFile(this.indexPath, text);
    } catch {
      // No index exists yet - start fresh
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
    }
  }

  /** Fetches a single file from S3 to the local cache. */
  async pullFile(relativePath: string): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await this.s3.getObject(relativePath);
    await ensureDir(dirname(localPath));
    await Deno.writeFile(localPath, data);
  }

  /**
   * Pulls only new or modified files from S3 to the local cache.
   * Fetches the remote index, compares against local files, and only
   * downloads files that are missing locally or have a different size.
   */
  async pullChanged(): Promise<number | void> {
    await this.pullIndex();

    // Build list of files that need pulling
    const toPull: string[] = [];
    for (const [rel, entry] of Object.entries(this.index?.entries ?? {})) {
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size === entry.size) {
          continue; // Unchanged
        }
      } catch {
        // File doesn't exist locally — needs pull
      }
      toPull.push(rel);
    }

    // Download concurrently in batches
    let pulled = 0;
    const failedFiles: string[] = [];
    for (let i = 0; i < toPull.length; i += MAX_CONCURRENCY) {
      const batch = toPull.slice(i, i + MAX_CONCURRENCY);
      const results = await Promise.allSettled(
        batch.map(async (rel) => {
          await this.pullFile(rel);
          // Store the pulled file's local mtime so subsequent pushes have a baseline
          try {
            const localPath = join(this.cachePath, rel);
            const stat = await Deno.stat(localPath);
            if (stat.mtime && this.index) {
              this.index.entries[rel].localMtime = stat.mtime.toISOString();
            }
          } catch {
            // Non-fatal: mtime recording is best-effort
          }
        }),
      );
      for (let j = 0; j < results.length; j++) {
        if (results[j].status === "fulfilled") {
          pulled++;
        } else {
          failedFiles.push(batch[j]);
        }
      }
    }

    if (failedFiles.length > 0) {
      throw new Error(
        `Failed to pull ${failedFiles.length} file(s) from S3: ${
          failedFiles.join(", ")
        }`,
      );
    }

    return pulled;
  }

  /** Pushes a single file from the local cache to S3. */
  async pushFile(relativePath: string): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await Deno.readFile(localPath);
    await this.s3.putObject(relativePath, data);

    // Update index with size and local mtime
    if (this.index) {
      const stat = await Deno.stat(localPath);
      this.index.entries[relativePath] = {
        key: relativePath,
        size: data.length,
        lastModified: new Date().toISOString(),
        localMtime: stat.mtime?.toISOString(),
      };
    }
  }

  /**
   * Pushes only new or modified files from the local cache to S3.
   * Compares each file's size against the index to detect changes.
   */
  async pushChanged(): Promise<number | void> {
    await this.loadIndex();

    // Build list of files that need pushing
    const toPush: string[] = [];
    try {
      for await (
        const entry of walk(this.cachePath, {
          includeDirs: false,
        })
      ) {
        const rel = relative(this.cachePath, entry.path);
        // Skip internal metadata files
        if (
          rel === ".datastore-index.json" || rel === ".push-queue.json" ||
          rel === ".datastore.lock"
        ) {
          continue;
        }

        // Check if file is new or has changed (size + mtime comparison)
        const stat = await Deno.stat(entry.path);
        const existing = this.index?.entries[rel];
        if (existing && existing.size === stat.size) {
          // Size matches — also check mtime if available
          if (
            existing.localMtime && stat.mtime &&
            existing.localMtime === stat.mtime.toISOString()
          ) {
            continue; // Both size and mtime match — unchanged
          }
          // If no localMtime recorded (old index format), fall back to size-only
          if (!stat.mtime || existing.localMtime === undefined) {
            continue;
          }
        }

        toPush.push(rel);
      }
    } catch {
      // Cache directory may not exist yet
    }

    // Upload concurrently in batches
    let pushed = 0;
    const failedFiles: string[] = [];
    for (let i = 0; i < toPush.length; i += MAX_CONCURRENCY) {
      const batch = toPush.slice(i, i + MAX_CONCURRENCY);
      const results = await Promise.allSettled(
        batch.map((rel) => this.pushFile(rel)),
      );
      for (let j = 0; j < results.length; j++) {
        if (results[j].status === "fulfilled") {
          pushed++;
        } else {
          failedFiles.push(batch[j]);
        }
      }
    }

    if (failedFiles.length > 0) {
      throw new Error(
        `Failed to push ${failedFiles.length} file(s) to S3: ${
          failedFiles.join(", ")
        }`,
      );
    }

    // Push updated index if anything changed.
    if (pushed > 0 && this.index) {
      this.index.lastPulled = new Date().toISOString();
      const indexJson = JSON.stringify(this.index, null, 2);
      const indexData = new TextEncoder().encode(indexJson);
      await this.s3.putObject(".datastore-index.json", indexData);
      // Also update the local cache
      await atomicWriteTextFile(this.indexPath, indexJson);
    }

    return pushed;
  }

  private async loadIndex(): Promise<void> {
    if (this.index) return;
    try {
      const content = await Deno.readTextFile(this.indexPath);
      this.index = JSON.parse(content) as DatastoreIndex;
    } catch {
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
    }
  }
}
