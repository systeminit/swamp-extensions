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
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertVaultConformance,
  assertVaultExportConformance,
} from "@systeminit/swamp-testing";
import { vault } from "./aws_sm.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { region: "us-east-1" },
      { region: "eu-west-1" },
    ],
    invalidConfigs: [
      {},
      { region: "" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

// --- Behavioral tests using a local mock AWS server ---

/** Start a local HTTP server that simulates AWS Secrets Manager. */
function startMockAwsServer(): {
  url: string;
  server: Deno.HttpServer;
  secrets: Map<string, string>;
} {
  const secrets = new Map<string, string>();

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const target = req.headers.get("x-amz-target") ?? "";
    const body = await req.json();

    if (target.includes("GetSecretValue")) {
      const val = secrets.get(body.SecretId);
      if (!val) {
        return Response.json({
          __type: "ResourceNotFoundException",
          Message: `Secret ${body.SecretId} not found`,
        }, { status: 400 });
      }
      return Response.json({ SecretString: val });
    }

    if (target.includes("PutSecretValue")) {
      secrets.set(body.SecretId, body.SecretString);
      return Response.json({});
    }

    if (target.includes("CreateSecret")) {
      secrets.set(body.Name, body.SecretString);
      return Response.json({ Name: body.Name });
    }

    if (target.includes("ListSecrets")) {
      return Response.json({
        SecretList: [...secrets.keys()].map((n) => ({ Name: n })),
      });
    }

    return Response.json({ __type: "UnknownOperationException" }, {
      status: 400,
    });
  });

  const addr = server.addr as Deno.NetAddr;
  return { url: `http://localhost:${addr.port}`, server, secrets };
}

/** Run a test with a mock AWS server, setting AWS_ENDPOINT_URL. */
async function withMockAws<T>(
  fn: (secrets: Map<string, string>) => Promise<T>,
): Promise<T> {
  const { url, server, secrets } = startMockAwsServer();
  const originalEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
  const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");

  Deno.env.set("AWS_ENDPOINT_URL", url);
  // SDK needs credentials even for a mock endpoint
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  try {
    return await fn(secrets);
  } finally {
    if (originalEndpoint) {
      Deno.env.set("AWS_ENDPOINT_URL", originalEndpoint);
    } else {
      Deno.env.delete("AWS_ENDPOINT_URL");
    }
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
}

// AWS SDK keeps TCP connections alive (connection pooling), which triggers
// Deno's resource leak detection. sanitizeResources: false is safe here
// because the connections are cleaned up when the SDK client is garbage collected.

// AWS SDK keeps TCP connections alive (connection pooling), which triggers
// Deno's resource leak detection. sanitizeResources: false is needed for
// tests that create SDK clients against the mock server.

Deno.test({
  name: "aws-sm vault: get returns stored secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("my-key", "my-value");
      const result = await provider.get("my-key");
      assertEquals(result, "my-value");
    });
  },
});

Deno.test({
  name: "aws-sm vault: get rejects for missing secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await assertRejects(() => provider.get("nonexistent"));
    });
  },
});

Deno.test({
  name: "aws-sm vault: list returns stored keys",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("key-a", "val-a");
      await provider.put("key-b", "val-b");
      const keys = await provider.list();
      assertEquals(keys.includes("key-a"), true);
      assertEquals(keys.includes("key-b"), true);
    });
  },
});

Deno.test({
  name: "aws-sm vault: put overwrites existing secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("my-key", "original");
      await provider.put("my-key", "updated");
      const result = await provider.get("my-key");
      assertEquals(result, "updated");
    });
  },
});

Deno.test({
  name: "aws-sm vault: passes full VaultProvider conformance",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await assertVaultConformance(provider);
    });
  },
});
