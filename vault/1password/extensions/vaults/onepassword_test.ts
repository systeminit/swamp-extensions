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
import { vault } from "./onepassword.ts";

Deno.test("vault export has correct metadata", () => {
  assertEquals(vault.type, "@swamp/1password");
  assertEquals(vault.name, "1Password");
  assertExists(vault.description);
  assertExists(vault.configSchema);
  assertEquals(typeof vault.createProvider, "function");
});

Deno.test("configSchema validates valid config", () => {
  const result = vault.configSchema.safeParse({ op_vault: "Engineering" });
  assertEquals(result.success, true);
});

Deno.test("configSchema validates config with op_account", () => {
  const result = vault.configSchema.safeParse({
    op_vault: "Engineering",
    op_account: "my-team.1password.com",
  });
  assertEquals(result.success, true);
});

Deno.test("configSchema rejects empty op_vault", () => {
  const result = vault.configSchema.safeParse({ op_vault: "" });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects missing op_vault", () => {
  const result = vault.configSchema.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("createProvider returns a provider with getName", () => {
  const provider = vault.createProvider("my-vault", {
    op_vault: "Engineering",
  });
  assertEquals(provider.getName(), "my-vault");
});

Deno.test("createProvider accepts op_account", () => {
  const provider = vault.createProvider("my-vault", {
    op_vault: "Engineering",
    op_account: "my-team.1password.com",
  });
  assertEquals(provider.getName(), "my-vault");
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});
