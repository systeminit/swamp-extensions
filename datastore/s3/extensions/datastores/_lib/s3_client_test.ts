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

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { S3Client, S3OperationError } from "./s3_client.ts";

/**
 * Start a local HTTP server that produces a fixed response, and run `fn`
 * with an `S3Client` wired to it. Ensures credentials are set for the
 * AWS SDK and restores prior env in a `finally`.
 */
async function withMockServer(
  handler: (req: Request) => Response | Promise<Response>,
  fn: (client: S3Client) => Promise<void>,
): Promise<void> {
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const addr = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  try {
    const client = new S3Client({
      bucket: "test-bucket",
      region: "us-east-1",
      endpoint: `http://127.0.0.1:${addr.port}`,
      forcePathStyle: true,
    });
    await fn(client);
  } finally {
    if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  }
}

// --- Regression: existing typed-error behavior still works -----------------

Deno.test({
  // The SDK's NodeHttpHandler keeps an HTTP agent pool alive across requests;
  // resource sanitization would flag those as leaks even though destroy()
  // schedules their close.
  sanitizeResources: false,
  name: "headObject returns {exists: false} on 404 (name preserved)",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "HEAD") return new Response(null, { status: 404 });
        return new Response(null, { status: 500 });
      },
      async (client) => {
        const result = await client.headObject("missing-key");
        assertEquals(result.exists, false);
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "putObjectConditional returns false on 412 (name preserved)",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "PUT") {
          return new Response(
            '<?xml version="1.0"?><Error><Code>PreconditionFailed</Code><Message>precondition</Message><RequestId>r</RequestId></Error>',
            {
              status: 412,
              headers: { "Content-Type": "application/xml" },
            },
          );
        }
        return new Response(null, { status: 500 });
      },
      async (client) => {
        const wrote = await client.putObjectConditional(
          "k",
          new Uint8Array([1, 2, 3]),
        );
        assertEquals(wrote, false);
      },
    ),
});

// --- Issue #134: errors are enriched, not masked as "UnknownError" ---------

Deno.test({
  sanitizeResources: false,
  name: "403 with empty body surfaces status + auth hint (not UnknownError)",
  fn: () =>
    withMockServer(
      () =>
        new Response("", {
          status: 403,
          headers: { "x-amz-request-id": "req-empty" },
        }),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(
          caught instanceof S3OperationError,
          "expected S3OperationError",
        );
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assertEquals(err.requestId, "req-empty");
        assert(err.message.includes("HTTP 403"), "message has status");
        assert(
          err.message.toLowerCase().includes("credentials"),
          `auth hint expected on 401/403, got: ${err.message}`,
        );
        assert(
          !err.message.includes("UnknownError"),
          `message should not include "UnknownError", got: ${err.message}`,
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "403 with HTML body (DO-Spaces-style) includes body preview in message",
  fn: () =>
    withMockServer(
      () =>
        new Response(
          "<html><body><h1>403 Forbidden</h1><p>nginx proxy says no</p></body></html>",
          {
            status: 403,
            headers: {
              "Content-Type": "text/html",
              "x-amz-request-id": "req-html",
            },
          },
        ),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assert(
          err.bodyPreview?.includes("403 Forbidden"),
          `body preview expected, got: ${err.bodyPreview}`,
        );
        assert(err.message.includes("bodyPreview="));
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "403 with valid S3 XML exposes Code (InvalidAccessKeyId)",
  fn: () =>
    withMockServer(
      () =>
        new Response(
          '<?xml version="1.0"?><Error><Code>InvalidAccessKeyId</Code><Message>The AWS Access Key Id you provided does not exist in our records.</Message><RequestId>req-xml</RequestId></Error>',
          {
            status: 403,
            headers: {
              "Content-Type": "application/xml",
              "x-amz-request-id": "req-xml",
            },
          },
        ),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assertEquals(err.code, "InvalidAccessKeyId");
        assertEquals(err.name, "InvalidAccessKeyId");
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "500 response on listObjects surfaces status and body preview",
  fn: () =>
    withMockServer(
      () =>
        new Response("internal error", {
          status: 500,
          headers: {
            "Content-Type": "text/plain",
            "x-amz-request-id": "req-500",
          },
        }),
      async (client) => {
        let caught: unknown;
        try {
          await client.listObjects();
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 500);
        assert(err.message.includes("listObjects"));
        // 5xx should NOT include the credentials hint
        assert(
          !err.message.toLowerCase().includes("credentials"),
          `auth hint should only fire on 401/403, got: ${err.message}`,
        );
      },
    ),
});
