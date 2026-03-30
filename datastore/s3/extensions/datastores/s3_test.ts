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

import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import {
  assertDatastoreExportConformance,
  assertVerifierConformance,
} from "@systeminit/swamp-testing";
import { datastore } from "./s3.ts";

Deno.test("datastore export conforms to DatastoreProvider contract", () => {
  assertDatastoreExportConformance(datastore, {
    validConfigs: [
      { bucket: "my-test-bucket", region: "us-east-1" },
      { bucket: "my-test-bucket" },
      {
        bucket: "my-test-bucket",
        prefix: "swamp-data",
        region: "eu-west-1",
        endpoint: "https://nyc3.digitaloceanspaces.com",
        forcePathStyle: true,
      },
    ],
    invalidConfigs: [
      {},
      { region: "us-east-1" },
      { bucket: "ab" },
      { bucket: "MyBucket" },
      { bucket: "my-test-bucket", endpoint: "not-a-url" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => datastore.createProvider({}),
    Error,
  );
});

Deno.test("provider.resolveDatastorePath returns .swamp under repoDir", () => {
  const provider = datastore.createProvider({ bucket: "my-test-bucket" });
  assertEquals(
    provider.resolveDatastorePath("/tmp/my-repo"),
    "/tmp/my-repo/.swamp",
  );
});

// --- Verifier behavioral test using a local mock S3 server ---

Deno.test({
  name: "s3 verifier: reports healthy when bucket is accessible",
  sanitizeResources: false,
  fn: async () => {
    // Start a mock S3 server that responds to HeadBucket
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      // HeadBucket is a HEAD request to /{bucket}
      if (req.method === "HEAD") {
        return new Response(null, { status: 200 });
      }
      return new Response(null, { status: 404 });
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, true);
      assertEquals(result.datastoreType, "@swamp/s3-datastore");
      assertEquals(result.details?.bucket, "my-test-bucket");
      assertEquals(typeof result.latencyMs, "number");

      // Also passes the generic verifier conformance
      await assertVerifierConformance(verifier);
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "s3 verifier: reports unhealthy when bucket is not accessible",
  sanitizeResources: false,
  fn: async () => {
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      if (req.method === "HEAD") {
        return new Response(null, { status: 404 });
      }
      return new Response(null, { status: 404 });
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "nonexistent-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, false);
      assertEquals(result.datastoreType, "@swamp/s3-datastore");
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});
