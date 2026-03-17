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
import { vault } from "./aws_sm.ts";

Deno.test("vault export has correct metadata", () => {
  assertEquals(vault.type, "@swamp/aws-sm");
  assertEquals(vault.name, "AWS Secrets Manager");
  assertExists(vault.description);
  assertExists(vault.configSchema);
  assertEquals(typeof vault.createProvider, "function");
});

Deno.test("configSchema validates valid config", () => {
  const result = vault.configSchema.safeParse({ region: "us-east-1" });
  assertEquals(result.success, true);
});

Deno.test("configSchema rejects empty region", () => {
  const result = vault.configSchema.safeParse({ region: "" });
  assertEquals(result.success, false);
});

Deno.test("configSchema rejects missing region", () => {
  const result = vault.configSchema.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});
