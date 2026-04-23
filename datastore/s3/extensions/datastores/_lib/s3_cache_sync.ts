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

/**
 * Returns true for files that live inside the cache directory but must
 * NOT cross the sync boundary in either direction (push or pull).
 *
 * Excluded patterns:
 * - `.datastore-index.json` — the remote index manifest itself; pulled
 *   and pushed via dedicated code paths, never as a walked payload.
 * - `.push-queue.json` — local push-queue scratch file.
 * - `.datastore.lock` — distributed lock file; managed by the lock
 *   subsystem, must never be uploaded as data.
 * - basename `_catalog.db` and anything starting with `_catalog.db-`
 *   (the SQLite WAL/SHM/journal sidecars) — the local-only data catalog
 *   store. It is deliberately colocated with the data tier so it can
 *   be rebuilt from whatever the local cache holds, but the database
 *   itself is per-machine state and must never leak to the shared
 *   bucket. See swamp-club issue #29 for the bug this exclusion fixes:
 *   without it, `swamp datastore sync --push` would walk `_catalog.db*`
 *   into `toPush`, SQLite would rewrite the WAL mid-upload, and the
 *   push would fail on `_catalog.db-wal`.
 *
 * Uses basename matching for the catalog pattern so the filter is
 * robust to any future change in the data tier subdirectory name.
 */
function isInternalCacheFile(rel: string): boolean {
  if (
    rel === ".datastore-index.json" || rel === ".push-queue.json" ||
    rel === ".datastore.lock"
  ) {
    return true;
  }
  const base = rel.split("/").pop() ?? "";
  return base === "_catalog.db" || base.startsWith("_catalog.db-");
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
  /**
   * Set to true when `scrubIndex()` removes zombie entries from the
   * in-memory index. Drives the write-back gate in `pushChanged()` so
   * that the cleaned index propagates to the remote even on a no-op
   * push (no new files to upload). Reset after a successful write-back.
   */
  private indexMutated = false;

  constructor(s3: S3Client, cachePath: string) {
    this.s3 = s3;
    this.cachePath = cachePath;
    this.indexPath = join(cachePath, ".datastore-index.json");
    this.pushQueuePath = join(cachePath, ".push-queue.json");
  }

  /**
   * Removes zombie internal-file entries from the in-memory index.
   * Runs whenever the index is populated from disk or remote so the
   * invariant "internal files never cross the sync boundary" is
   * enforced at the persistence boundary.
   *
   * Returns true if any entries were removed. See
   * `isInternalCacheFile` for the exclusion criteria and swamp-club
   * issue #29 for the motivating bug.
   */
  private scrubIndex(): boolean {
    if (!this.index || !this.index.entries) return false;
    let mutated = false;
    for (const rel of Object.keys(this.index.entries)) {
      if (isInternalCacheFile(rel)) {
        delete this.index.entries[rel];
        mutated = true;
      }
    }
    return mutated;
  }

  /**
   * Pulls the metadata index from S3 (lightweight, single GET).
   * Uses a local cache with a 60-second TTL to avoid redundant fetches
   * during rapid command sequences.
   *
   * Pass `forceRemote: true` to bypass the local TTL cache and always
   * fetch from S3. `pushChanged()` uses this to guarantee the
   * writeback merges onto the current remote state — without it, a
   * stale local cache (< 60 s old) could silently clobber updates
   * pushed by another writer in the intervening window.
   *
   * Both entry paths (cache-hit and S3-fetch) scrub the in-memory
   * index after parsing so zombie internal-file entries never reach
   * the rest of the sync pipeline (see swamp-club#29). On the
   * S3-fetch path the local cache file is rewritten with the scrubbed
   * JSON when scrub mutated — keeping the on-disk and in-memory views
   * consistent. The cache-hit path does NOT rewrite the local file;
   * its on-disk view self-heals on the next S3 fetch.
   */
  async pullIndex(options?: { forceRemote?: boolean }): Promise<void> {
    // Check local cache freshness (skipped when forceRemote is set)
    if (!options?.forceRemote) {
      try {
        const stat = await Deno.stat(this.indexPath);
        const ageMs = Date.now() - (stat.mtime?.getTime() ?? 0);
        if (ageMs < INDEX_CACHE_TTL_MS && this.index === null) {
          const content = await Deno.readTextFile(this.indexPath);
          this.index = JSON.parse(content) as DatastoreIndex;
          // Scrub zombies from the in-memory view before returning.
          this.indexMutated ||= this.scrubIndex();
          return; // Fresh enough — skip S3
        }
      } catch {
        // No local index — fetch from S3
      }
    }

    try {
      const data = await this.s3.getObject(".datastore-index.json");
      const text = new TextDecoder().decode(data);
      this.index = JSON.parse(text) as DatastoreIndex;
      await ensureDir(this.cachePath);
      // Scrub zombies, then write the local cache file. If scrub
      // mutated, write the cleaned JSON so on-disk matches in-memory.
      // Otherwise write the raw remote text to preserve the fast path
      // (no re-serialization cost).
      if (this.scrubIndex()) {
        this.indexMutated = true;
        await atomicWriteTextFile(
          this.indexPath,
          JSON.stringify(this.index, null, 2),
        );
      } else {
        await atomicWriteTextFile(this.indexPath, text);
      }
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
      // Belt-and-suspenders: `scrubIndex` already removed internal
      // entries in `pullIndex`, but if anything re-adds a zombie
      // between the scrub and the walk, this guard still catches it.
      if (isInternalCacheFile(rel)) {
        continue;
      }
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size === entry.size) {
          // File exists locally with matching size — no download needed.
          // Reconcile localMtime so pushChanged() doesn't treat it as
          // changed due to mtime drift (e.g. file was placed by migration
          // or a different machine pushed the index).
          if (
            this.index && stat.mtime &&
            entry.localMtime !== stat.mtime.toISOString()
          ) {
            this.index.entries[rel].localMtime = stat.mtime.toISOString();
          }
          continue;
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
   *
   * Always fetches the current remote index (bypassing the local
   * TTL cache) so that the writeback at the end of this method
   * merges new/modified entries onto remote state instead of
   * clobbering it. Without this, any client with a smaller or
   * stale local cache (e.g. a fresh reader running `datastore setup`,
   * or a writer whose cached index is < 60 s old but another writer
   * has since pushed) would overwrite the remote
   * `.datastore-index.json` with a subset of entries, leaving the
   * other writer's data orphaned. See swamp-club#30.
   */
  async pushChanged(): Promise<number | void> {
    await this.pullIndex({ forceRemote: true });

    // Build list of files that need pushing
    const toPush: string[] = [];
    try {
      for await (
        const entry of walk(this.cachePath, {
          includeDirs: false,
        })
      ) {
        const rel = relative(this.cachePath, entry.path);
        // Skip internal metadata files (see isInternalCacheFile)
        if (isInternalCacheFile(rel)) {
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

    // Push updated index if anything changed — either new files were
    // pushed OR scrubIndex removed zombie entries that need to
    // propagate to the remote (swamp-club#29 migration path).
    if ((pushed > 0 || this.indexMutated) && this.index) {
      if (pushed > 0) {
        this.index.lastPulled = new Date().toISOString();
      }
      const indexJson = JSON.stringify(this.index, null, 2);
      const indexData = new TextEncoder().encode(indexJson);
      await this.s3.putObject(".datastore-index.json", indexData);
      // Also update the local cache
      await atomicWriteTextFile(this.indexPath, indexJson);
      this.indexMutated = false;
    }

    return pushed;
  }
}
