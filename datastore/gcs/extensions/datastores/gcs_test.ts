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
import { datastore } from "./gcs.ts";

Deno.test("datastore export conforms to DatastoreProvider contract", () => {
  assertDatastoreExportConformance(datastore, {
    validConfigs: [
      { bucket: "my-test-bucket", projectId: "my-project" },
      { bucket: "my-test-bucket" },
      {
        bucket: "my-test-bucket",
        prefix: "swamp-data",
        projectId: "my-project",
        apiEndpoint: "http://localhost:4443",
      },
      { bucket: "my_underscore_bucket" },
      { bucket: "my.dotted.bucket" },
    ],
    invalidConfigs: [
      {},
      { projectId: "my-project" },
      { bucket: "ab" },
      { bucket: "MyBucket" },
      { bucket: "my-test-bucket", apiEndpoint: "not-a-url" },
      { bucket: "goog-reserved-prefix" },
      { bucket: "contains-google-name" },
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

// swamp core duck-types `resolveCachePath`: a missing method and a method
// returning `undefined` take different code paths. The method must be defined
// AND return `undefined` for the repoId-keyed fallback in core to fire.
Deno.test("provider defines resolveCachePath and returns undefined", () => {
  const provider = datastore.createProvider({ bucket: "my-test-bucket" });
  assertEquals(typeof provider.resolveCachePath, "function");
  assertEquals(provider.resolveCachePath!("/tmp/my-repo"), undefined);
});

// --- Verifier behavioral test using a local mock GCS server ---

// The GCS client uses fetch() which keeps TCP connections alive in the
// global HTTP agent, which trips Deno's resource leak detection.
// sanitizeResources: false is safe here because those connections are
// reclaimed when the runtime tears down between test runs.
Deno.test({
  name: "gcs verifier: reports healthy when bucket is accessible",
  sanitizeResources: false,
  fn: async () => {
    // Start a mock GCS server that responds to bucket GET
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      const url = new URL(req.url);
      // GCS JSON API: GET /storage/v1/b/{bucket}
      if (req.method === "GET" && url.pathname.includes("/storage/v1/b/")) {
        return new Response(
          JSON.stringify({ kind: "storage#bucket", name: "my-test-bucket" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response(null, { status: 404 });
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        apiEndpoint: endpoint,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, true);
      assertEquals(result.datastoreType, "@swamp/gcs-datastore");
      assertEquals(result.details?.bucket, "my-test-bucket");
      assertEquals(typeof result.latencyMs, "number");

      await assertVerifierConformance(verifier);
    } finally {
      await server.shutdown();
    }
  },
});

// sanitizeResources: false is required here for the same reason as the
// healthy-probe test above — fetch()'s pooled connections outlive the
// test body.
Deno.test({
  name: "gcs verifier: reports unhealthy when bucket is not accessible",
  sanitizeResources: false,
  fn: async () => {
    const server = Deno.serve({ port: 0, onListen() {} }, (_req) => {
      return new Response(
        JSON.stringify({
          error: { code: 404, message: "Not Found" },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    try {
      const provider = datastore.createProvider({
        bucket: "nonexistent-bucket",
        apiEndpoint: endpoint,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, false);
      assertEquals(result.datastoreType, "@swamp/gcs-datastore");
    } finally {
      await server.shutdown();
    }
  },
});
