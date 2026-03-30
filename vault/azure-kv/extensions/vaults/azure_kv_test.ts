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

import { assertThrows } from "jsr:@std/assert@1.0.19";
import { assertVaultExportConformance } from "@systeminit/swamp-testing";
import { vault } from "./azure_kv.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { vault_url: "https://myvault.vault.azure.net/" },
      {
        vault_url: "https://myvault.vault.azure.net/",
        secret_prefix: "swamp/",
      },
    ],
    invalidConfigs: [
      {},
      { vault_url: "not-a-url" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

// NOTE: Behavioral tests (get/put/list against a mock server) are not possible
// for azure-kv without modifying the extension. The Azure SecretClient requires
// HTTPS and rejects self-signed certificates. Unlike the AWS SDK which respects
// AWS_ENDPOINT_URL, the Azure SecretClient's `allowInsecureConnection` option
// isn't exposed through the extension's config.
//
// To enable behavioral testing, the extension would need to accept a
// `_allowInsecureConnection: true` test option or an explicit endpoint override.
// Until then, behavioral conformance must be tested against a real Azure KV
// instance.
