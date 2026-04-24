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

// Tests for GcsClient DEF-1 behavior: per-request timeouts,
// AbortSignal composition, structured GcsOperationError, and narrow-
// type preservation for NotFoundError / PreconditionFailedError.
//
// Integration style — drives the real GcsClient against
// `Deno.serve({ port: 0 })` endpoints so wire-level failure modes
// (timeout, pre-abort, composed signal, 4xx/5xx, transport errors,
// upload-ID header capture) are exercised end-to-end.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  GcsClient,
  GcsOperationError,
  NotFoundError,
  PreconditionFailedError,
} from "./gcs_client.ts";

/**
 * Spin up a local HTTP server on an ephemeral port and return its base
 * URL + shutdown handle. The handler is plugged in per-test so each
 * scenario can inject its own failure shape.
 */
function startServer(
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
        // server.finished rejects with the abort reason — expected on shutdown
      }
    },
  };
}

// The GCS client uses fetch() which keeps TCP connections alive in the
// global HTTP agent, which trips Deno's resource leak detection.
// sanitizeResources: false is safe here because those connections are
// reclaimed when the runtime tears down between test runs.

// --- happy path ---------------------------------------------------------

Deno.test({
  name: "GcsClient.getObject: happy path returns body bytes",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer((_req) => {
      return new Response(new Uint8Array([1, 2, 3, 4]), { status: 200 });
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const data = await client.getObject("foo");
      assertEquals(Array.from(data), [1, 2, 3, 4]);
    } finally {
      await shutdown();
    }
  },
});

// --- 404 preserves NotFoundError narrow type ---------------------------

Deno.test({
  name: "GcsClient.getObject: 404 throws NotFoundError (narrow type preserved)",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer(() =>
      new Response("not found", { status: 404 })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      await assertRejects(
        () => client.getObject("missing"),
        NotFoundError,
      );
    } finally {
      await shutdown();
    }
  },
});

// --- 412 preserves PreconditionFailedError narrow type -----------------

Deno.test({
  name: "GcsClient.deleteObject: 412 throws PreconditionFailedError",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer(() =>
      new Response("precondition failed", { status: 412 })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      await assertRejects(
        () => client.deleteObject("x", { ifGenerationMatch: "42" }),
        PreconditionFailedError,
      );
    } finally {
      await shutdown();
    }
  },
});

// --- 403 with JSON body: GcsOperationError with code + credential hint -

Deno.test({
  name:
    "GcsClient: 403 throws GcsOperationError with credential hint and JSON code",
  sanitizeResources: false,
  fn: async () => {
    const jsonBody = JSON.stringify({
      error: {
        code: 403,
        message: "Access denied",
        errors: [{ reason: "authError", message: "Access denied" }],
      },
    });
    const { url, shutdown } = startServer(() =>
      new Response(jsonBody, {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const err = await assertRejects(
        () => client.getObject("any"),
        GcsOperationError,
      );
      assertEquals(err.httpStatusCode, 403);
      assertEquals(err.code, "authError");
      assertStringIncludes(err.message, "HTTP 403");
      assertStringIncludes(err.message, "check GCS credentials");
      assert(
        err.bodyPreview && err.bodyPreview.length > 0,
        "bodyPreview must be non-empty",
      );
    } finally {
      await shutdown();
    }
  },
});

// --- 500 is captured and surfaced as GcsOperationError -----------------

Deno.test({
  name: "GcsClient: 500 throws GcsOperationError with status and preview",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer(() =>
      new Response("internal server error", { status: 500 })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const err = await assertRejects(
        () => client.getObject("x"),
        GcsOperationError,
      );
      assertEquals(err.httpStatusCode, 500);
      assertStringIncludes(err.message, "HTTP 500");
    } finally {
      await shutdown();
    }
  },
});

// --- upload response carries X-GUploader-UploadID on failure -----------

Deno.test({
  name: "GcsClient.putObject: 500 on upload exposes X-GUploader-UploadID",
  sanitizeResources: false,
  fn: async () => {
    const uploadId = "AEnB2UoQ-example-upload-id";
    const { url, shutdown } = startServer((_req) =>
      new Response("boom", {
        status: 500,
        headers: { "X-GUploader-UploadID": uploadId },
      })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const err = await assertRejects(
        () => client.putObject("key", new Uint8Array([1, 2, 3])),
        GcsOperationError,
      );
      assertEquals(err.uploadId, uploadId);
    } finally {
      await shutdown();
    }
  },
});

// --- timeout: server never responds, per-request deadline fires --------

Deno.test({
  name:
    "GcsClient: defaultRequestTimeoutMs fires TimeoutError on stalled server",
  sanitizeResources: false,
  fn: async () => {
    // Handler never resolves — simulates a stalled socket.
    const { url, shutdown } = startServer(() => {
      return new Promise<Response>(() => {});
    });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 100,
      });
      const err = await assertRejects(
        () => client.getObject("x"),
        GcsOperationError,
      );
      assertEquals(err.name, "TimeoutError");
      assertEquals(err.httpStatusCode, null);
      assertStringIncludes(err.message, "timed out after 100ms");
    } finally {
      await shutdown();
    }
  },
});

// --- pre-aborted external signal: rejects before any fetch ------------

Deno.test({
  name:
    "GcsClient: pre-aborted signal rejects with AbortError and issues zero fetches",
  sanitizeResources: false,
  fn: async () => {
    let fetches = 0;
    const { url, shutdown } = startServer(() => {
      fetches++;
      return new Response("ok", { status: 200 });
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const controller = new AbortController();
      controller.abort();
      const err = await assertRejects(
        () => client.getObject("x", controller.signal),
        GcsOperationError,
      );
      assertEquals(err.name, "AbortError");
      assertEquals(err.httpStatusCode, null);
      assertEquals(fetches, 0, "no real fetch should reach the server");
    } finally {
      await shutdown();
    }
  },
});

// --- composed signal: external abort wins against longer timeout ------

Deno.test({
  name: "GcsClient: composed signal — external abort wins over longer timeout",
  sanitizeResources: false,
  fn: async () => {
    // Server stalls so the abort controller is what resolves the wait.
    const { url, shutdown } = startServer(() => {
      return new Promise<Response>(() => {});
    });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 5_000,
      });
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 50);
      const err = await assertRejects(
        () => client.getObject("x", controller.signal),
        GcsOperationError,
      );
      // External abort must win — name is AbortError, not TimeoutError.
      assertEquals(err.name, "AbortError");
    } finally {
      await shutdown();
    }
  },
});

// --- narrow types are still distinguishable from the wrapper ----------

Deno.test({
  name: "GcsClient.getMetadata: 404 returns {exists: false} (no throw)",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer(() =>
      new Response("not found", { status: 404 })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const meta = await client.getMetadata("x");
      assertEquals(meta.exists, false);
    } finally {
      await shutdown();
    }
  },
});

// --- putObjectConditional: 412 → null (not a throw) -------------------

Deno.test({
  name: "GcsClient.putObjectConditional: 412 returns null",
  sanitizeResources: false,
  fn: async () => {
    const { url, shutdown } = startServer(() =>
      new Response("already exists", { status: 412 })
    );
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const result = await client.putObjectConditional(
        "x",
        new Uint8Array([0]),
      );
      assertEquals(result, null);
    } finally {
      await shutdown();
    }
  },
});
