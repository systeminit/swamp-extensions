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
 * GCS cache sync service.
 *
 * Maintains a local cache directory and syncs with GCS:
 * - pullChanged(): pulls only new/modified files from GCS
 * - pushChanged(): pushes only new/modified files to GCS
 *
 * Tracks metadata in `.datastore-index.json` to avoid unnecessary transfers.
 */

import { dirname, join, normalize, relative } from "jsr:@std/path@1";
import { ensureDir, walk } from "jsr:@std/fs@1";
import type { DatastoreSyncService } from "./interfaces.ts";
import type { GcsClient } from "./gcs_client.ts";
import { atomicWriteTextFile } from "./atomic_write.ts";

/**
 * Validates that a relative path resolves within the cache directory.
 * Prevents path traversal attacks from malicious GCS object names.
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

/** Metadata index entry for a file in GCS. */
interface IndexEntry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
}

/** Metadata index tracking all files in the GCS datastore. */
interface DatastoreIndex {
  version: 1;
  lastPulled: string;
  entries: Record<string, IndexEntry>;
}

/** TTL in ms for using the local index cache instead of fetching from GCS. */
const INDEX_CACHE_TTL_MS = 60_000;

/** Maximum number of concurrent GCS downloads/uploads. */
const MAX_CONCURRENCY = 10;

/** GCS cache sync service. */
export class GcsCacheSyncService implements DatastoreSyncService {
  private readonly gcs: GcsClient;
  private readonly cachePath: string;
  private readonly indexPath: string;
  private index: DatastoreIndex | null = null;

  constructor(gcs: GcsClient, cachePath: string) {
    this.gcs = gcs;
    this.cachePath = cachePath;
    this.indexPath = join(cachePath, ".datastore-index.json");
  }

  /**
   * Pulls the metadata index from GCS (lightweight, single GET).
   * Uses a local cache with a 60-second TTL to avoid redundant fetches.
   */
  async pullIndex(): Promise<void> {
    // Check local cache freshness
    try {
      const stat = await Deno.stat(this.indexPath);
      const ageMs = Date.now() - (stat.mtime?.getTime() ?? 0);
      if (ageMs < INDEX_CACHE_TTL_MS && this.index === null) {
        const content = await Deno.readTextFile(this.indexPath);
        this.index = JSON.parse(content) as DatastoreIndex;
        return;
      }
    } catch {
      // No local index — fetch from GCS
    }

    try {
      const data = await this.gcs.getObject(".datastore-index.json");
      const text = new TextDecoder().decode(data);
      this.index = JSON.parse(text) as DatastoreIndex;
      await ensureDir(this.cachePath);
      await atomicWriteTextFile(this.indexPath, text);
    } catch {
      // No index exists yet — start fresh
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
    }
  }

  /** Fetches a single file from GCS to the local cache. */
  async pullFile(relativePath: string): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await this.gcs.getObject(relativePath);
    await ensureDir(dirname(localPath));
    await Deno.writeFile(localPath, data);
  }

  /**
   * Pulls only new or modified files from GCS to the local cache.
   * Fetches the remote index, compares against local files, and only
   * downloads files that are missing locally or have a different size.
   */
  async pullChanged(): Promise<number | void> {
    await this.pullIndex();

    const toPull: string[] = [];
    for (const [rel, entry] of Object.entries(this.index?.entries ?? {})) {
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size === entry.size) {
          continue;
        }
      } catch {
        // File doesn't exist locally — needs pull
      }
      toPull.push(rel);
    }

    let pulled = 0;
    const failedFiles: string[] = [];
    for (let i = 0; i < toPull.length; i += MAX_CONCURRENCY) {
      const batch = toPull.slice(i, i + MAX_CONCURRENCY);
      const results = await Promise.allSettled(
        batch.map(async (rel) => {
          await this.pullFile(rel);
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
        `Failed to pull ${failedFiles.length} file(s) from GCS: ${
          failedFiles.join(", ")
        }`,
      );
    }

    return pulled;
  }

  /** Pushes a single file from the local cache to GCS. */
  async pushFile(relativePath: string): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await Deno.readFile(localPath);
    await this.gcs.putObject(relativePath, data);

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
   * Pushes only new or modified files from the local cache to GCS.
   * Compares each file's size and mtime against the index to detect changes.
   */
  async pushChanged(): Promise<number | void> {
    await this.loadIndex();

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

        const stat = await Deno.stat(entry.path);
        const existing = this.index?.entries[rel];
        if (existing && existing.size === stat.size) {
          if (
            existing.localMtime && stat.mtime &&
            existing.localMtime === stat.mtime.toISOString()
          ) {
            continue;
          }
          if (!stat.mtime || existing.localMtime === undefined) {
            continue;
          }
        }

        toPush.push(rel);
      }
    } catch {
      // Cache directory may not exist yet
    }

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
        `Failed to push ${failedFiles.length} file(s) to GCS: ${
          failedFiles.join(", ")
        }`,
      );
    }

    // Push updated index if anything changed
    if (pushed > 0 && this.index) {
      this.index.lastPulled = new Date().toISOString();
      const indexJson = JSON.stringify(this.index, null, 2);
      const indexData = new TextEncoder().encode(indexJson);
      await this.gcs.putObject(".datastore-index.json", indexData);
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
