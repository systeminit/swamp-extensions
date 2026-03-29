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

import {
  assertEquals,
  assertExists,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { datastore } from "./s3.ts";

Deno.test("datastore export has correct metadata", () => {
  assertEquals(datastore.type, "@swamp/s3-datastore");
  assertEquals(datastore.name, "Amazon S3");
  assertExists(datastore.description);
  assertExists(datastore.configSchema);
  assertEquals(typeof datastore.createProvider, "function");
});

Deno.test("configSchema validates valid config", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "my-test-bucket",
    region: "us-east-1",
  });
  assertEquals(result.success, true);
});

Deno.test("configSchema validates config with all options", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "my-test-bucket",
    prefix: "swamp-data",
    region: "eu-west-1",
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: true,
  });
  assertEquals(result.success, true);
});

Deno.test("configSchema validates config with only bucket", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "my-test-bucket",
  });
  assertEquals(result.success, true);
});

Deno.test("configSchema rejects missing bucket", () => {
  const result = datastore.configSchema.safeParse({
    region: "us-east-1",
  });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects invalid bucket name - too short", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "ab",
  });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects invalid bucket name - uppercase", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "MyBucket",
  });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects invalid endpoint URL", () => {
  const result = datastore.configSchema.safeParse({
    bucket: "my-test-bucket",
    endpoint: "not-a-url",
  });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects empty config", () => {
  const result = datastore.configSchema.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => datastore.createProvider({}),
    Error,
  );
});

Deno.test("createProvider returns a DatastoreProvider", () => {
  const provider = datastore.createProvider({
    bucket: "my-test-bucket",
    region: "us-east-1",
  });
  assertExists(provider);
  assertEquals(typeof provider.createLock, "function");
  assertEquals(typeof provider.createVerifier, "function");
  assertEquals(typeof provider.createSyncService, "function");
  assertEquals(typeof provider.resolveDatastorePath, "function");
  assertEquals(typeof provider.resolveCachePath, "function");
});

Deno.test("provider.resolveDatastorePath returns .swamp under repoDir", () => {
  const provider = datastore.createProvider({
    bucket: "my-test-bucket",
  });
  const path = provider.resolveDatastorePath("/tmp/my-repo");
  assertEquals(path, "/tmp/my-repo/.swamp");
});

Deno.test("provider.createLock returns a DistributedLock", () => {
  const provider = datastore.createProvider({
    bucket: "my-test-bucket",
    region: "us-east-1",
  });
  const lock = provider.createLock("/tmp/ds");
  assertExists(lock);
  assertEquals(typeof lock.acquire, "function");
  assertEquals(typeof lock.release, "function");
  assertEquals(typeof lock.withLock, "function");
  assertEquals(typeof lock.inspect, "function");
  assertEquals(typeof lock.forceRelease, "function");
});

Deno.test("provider.createVerifier returns a DatastoreVerifier", () => {
  const provider = datastore.createProvider({
    bucket: "my-test-bucket",
    region: "us-east-1",
  });
  const verifier = provider.createVerifier();
  assertExists(verifier);
  assertEquals(typeof verifier.verify, "function");
});

Deno.test("provider.createSyncService returns a DatastoreSyncService", () => {
  const provider = datastore.createProvider({
    bucket: "my-test-bucket",
    region: "us-east-1",
  });
  const sync = provider.createSyncService!("/tmp/repo", "/tmp/cache");
  assertExists(sync);
  assertEquals(typeof sync.pullChanged, "function");
  assertEquals(typeof sync.pushChanged, "function");
});
