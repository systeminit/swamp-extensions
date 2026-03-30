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
  assertVaultExportConformance,
  withMockedCommand,
} from "@systeminit/swamp-testing";
import { vault } from "./onepassword.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { op_vault: "Engineering" },
      { op_vault: "Engineering", op_account: "my-team.1password.com" },
    ],
    invalidConfigs: [
      {},
      { op_vault: "" },
    ],
  });
});

Deno.test("createProvider returns provider with correct name", () => {
  const provider = vault.createProvider("my-vault", {
    op_vault: "Engineering",
  });
  assertEquals(provider.getName(), "my-vault");
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

// --- Behavioral tests using withMockedCommand ---

/**
 * Simulate 1Password CLI (`op`) responses.
 * Maintains an in-memory store of items keyed by name.
 */
function createOpMock() {
  const items = new Map<string, Map<string, string>>();

  return (cmd: string, args: string[]) => {
    if (cmd !== "op") {
      return { stdout: "", stderr: `unknown command: ${cmd}`, code: 1 };
    }

    // op --version (installation check)
    if (args.includes("--version")) {
      return { stdout: "2.30.0", code: 0 };
    }

    // op read <uri>
    if (args[0] === "read") {
      const uri = args[1];
      // Parse op://vault/item/field
      const parts = uri.replace("op://", "").split("/");
      const item = parts[1];
      const field = parts.slice(2).join("/") || "password";
      const itemData = items.get(item);
      if (!itemData || !itemData.has(field)) {
        return {
          stdout: "",
          stderr: `item "${item}" not found`,
          code: 1,
        };
      }
      return { stdout: itemData.get(field)!, code: 0 };
    }

    // op item get <item> --vault <vault> --format json (existence check)
    if (args[0] === "item" && args[1] === "get") {
      const item = args[2];
      if (items.has(item)) {
        return {
          stdout: JSON.stringify({ title: item }),
          code: 0,
        };
      }
      return { stdout: "", stderr: `item "${item}" not found`, code: 1 };
    }

    // op item create ... (new item)
    if (args[0] === "item" && args[1] === "create") {
      const titleIdx = args.indexOf("--title");
      const title = titleIdx >= 0 ? args[titleIdx + 1] : "";
      // Find field=value arg (not a flag)
      const fieldArg = args.find((a) => a.includes("=") && !a.startsWith("--"));
      if (fieldArg && title) {
        const [field, ...valueParts] = fieldArg.split("=");
        const value = valueParts.join("=");
        if (!items.has(title)) {
          items.set(title, new Map());
        }
        items.get(title)!.set(field, value);
      }
      return { stdout: JSON.stringify({ title }), code: 0 };
    }

    // op item edit <item> field=value ...
    if (args[0] === "item" && args[1] === "edit") {
      const item = args[2];
      const fieldArg = args.find((a) => a.includes("=") && !a.startsWith("--"));
      if (fieldArg && items.has(item)) {
        const [field, ...valueParts] = fieldArg.split("=");
        const value = valueParts.join("=");
        items.get(item)!.set(field, value);
      }
      return { stdout: "", code: 0 };
    }

    // op item list --vault <vault> --format json
    if (args[0] === "item" && args[1] === "list") {
      const list = [...items.keys()].map((title) => ({ title }));
      return { stdout: JSON.stringify(list), code: 0 };
    }

    return {
      stdout: "",
      stderr: `unhandled op args: ${args.join(" ")}`,
      code: 1,
    };
  };
}

Deno.test("1password vault: get returns stored secret", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("api-key", "sk-test-123");
    return await provider.get("api-key");
  });

  assertEquals(result, "sk-test-123");
});

Deno.test("1password vault: get rejects for missing secret", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await assertRejects(() => provider.get("nonexistent"));
  });
});

Deno.test("1password vault: put creates new item then updates", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    // First put: itemExists check fails → create
    await provider.put("new-key", "value-1");
    // Second put: itemExists check succeeds → edit
    await provider.put("new-key", "value-2");
  });

  // Calls: --version, item get (exists?), item create, --version (cached?), item get (exists?), item edit
  // The op --version is cached after first call, so we should see:
  // 1. op --version
  // 2. op item get (existence check) → fails
  // 3. op item create
  // 4. op item get (existence check) → succeeds
  // 5. op item edit
  const opCalls = calls.filter((c) => c.command === "op");
  assertEquals(
    opCalls.length >= 4,
    true,
    `Expected at least 4 op calls, got ${opCalls.length}`,
  );
});

Deno.test("1password vault: list returns stored items", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("key-a", "val-a");
    await provider.put("key-b", "val-b");
    return await provider.list();
  });

  assertEquals(result.includes("key-a"), true);
  assertEquals(result.includes("key-b"), true);
});

Deno.test("1password vault: getName returns provider name", async () => {
  await withMockedCommand(createOpMock(), () => {
    const provider = vault.createProvider("my-vault", {
      op_vault: "Engineering",
    });
    assertEquals(provider.getName(), "my-vault");
  });
});
