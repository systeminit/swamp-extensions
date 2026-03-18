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

import { z } from "npm:zod@4.3.6";

interface VaultProvider {
  get(secretKey: string): Promise<string>;
  put(secretKey: string, secretValue: string): Promise<void>;
  list(): Promise<string[]>;
  getName(): string;
}

interface ParsedSecretKey {
  item: string;
  field: string;
  isFullUri: boolean;
  uri: string;
}

function parseSecretKey(secretKey: string, opVault: string): ParsedSecretKey {
  if (secretKey.startsWith("op://")) {
    const uriPath = secretKey.slice("op://".length);
    const parts = uriPath.split("/");
    const item = parts[1] ?? "";
    const field = parts.slice(2).join("/") || "password";
    return { item, field, isFullUri: true, uri: secretKey };
  }

  const slashIndex = secretKey.indexOf("/");
  if (slashIndex === -1) {
    return {
      item: secretKey,
      field: "password",
      isFullUri: false,
      uri: `op://${opVault}/${secretKey}/password`,
    };
  }

  const item = secretKey.slice(0, slashIndex);
  const field = secretKey.slice(slashIndex + 1);
  return {
    item,
    field,
    isFullUri: false,
    uri: `op://${opVault}/${secretKey}`,
  };
}

class OnePasswordVaultProvider implements VaultProvider {
  private readonly name: string;
  private readonly opVault: string;
  private readonly opAccount: string | undefined;
  private opInstalled: boolean | undefined;

  constructor(name: string, config: { op_vault: string; op_account?: string }) {
    this.name = name;
    this.opVault = config.op_vault;
    this.opAccount = config.op_account;
  }

  async get(secretKey: string): Promise<string> {
    await this.checkOpInstalled();
    const parsed = parseSecretKey(secretKey, this.opVault);
    const args = ["read", parsed.uri];
    if (this.opAccount) {
      args.push("--account", this.opAccount);
    }
    const result = await this.runOp(args);
    return result.trim();
  }

  async put(secretKey: string, secretValue: string): Promise<void> {
    await this.checkOpInstalled();
    const parsed = parseSecretKey(secretKey, this.opVault);

    if (parsed.isFullUri) {
      throw new Error(
        "Cannot use full op:// URI for put operations. Use a relative key (e.g., 'item-name' or 'item-name/field').",
      );
    }

    const itemExists = await this.itemExists(parsed.item);

    if (itemExists) {
      const args = [
        "item",
        "edit",
        parsed.item,
        `${parsed.field}=${secretValue}`,
        "--vault",
        this.opVault,
      ];
      if (this.opAccount) {
        args.push("--account", this.opAccount);
      }
      await this.runOp(args);
    } else {
      const args = [
        "item",
        "create",
        "--category",
        "Secure Note",
        "--title",
        parsed.item,
        `${parsed.field}=${secretValue}`,
        "--vault",
        this.opVault,
      ];
      if (this.opAccount) {
        args.push("--account", this.opAccount);
      }
      await this.runOp(args);
    }
  }

  async list(): Promise<string[]> {
    await this.checkOpInstalled();
    const args = [
      "item",
      "list",
      "--vault",
      this.opVault,
      "--format",
      "json",
    ];
    if (this.opAccount) {
      args.push("--account", this.opAccount);
    }

    const result = await this.runOp(args);
    if (!result.trim()) {
      return [];
    }
    const items: Array<{ title: string }> = JSON.parse(result);
    return items.map((item) => item.title).sort();
  }

  getName(): string {
    return this.name;
  }

  private async itemExists(itemName: string): Promise<boolean> {
    const args = [
      "item",
      "get",
      itemName,
      "--vault",
      this.opVault,
      "--format",
      "json",
    ];
    if (this.opAccount) {
      args.push("--account", this.opAccount);
    }
    try {
      await this.runOp(args);
      return true;
    } catch {
      return false;
    }
  }

  private async checkOpInstalled(): Promise<void> {
    if (this.opInstalled === true) {
      return;
    }

    try {
      const command = new Deno.Command("op", {
        args: ["--version"],
        stdin: "null",
        stdout: "piped",
        stderr: "piped",
      });
      const { success } = await command.output();
      if (success) {
        this.opInstalled = true;
        return;
      }
    } catch {
      // op not found
    }

    throw new Error(
      "1Password CLI (op) is not installed or not in PATH.\n\n" +
        "Install it from: https://developer.1password.com/docs/cli/get-started/\n\n" +
        "After installing, authenticate using one of:\n" +
        "  - Service account: export OP_SERVICE_ACCOUNT_TOKEN=<token>\n" +
        "  - Desktop app: enable CLI integration in 1Password settings\n" +
        "  - Connect Server: export OP_CONNECT_HOST and OP_CONNECT_TOKEN",
    );
  }

  private async runOp(args: string[]): Promise<string> {
    const command = new Deno.Command("op", {
      args,
      stdin: "null",
      stdout: "piped",
      stderr: "piped",
    });

    const { success, stdout, stderr } = await command.output();
    const stdoutText = new TextDecoder().decode(stdout);
    const stderrText = new TextDecoder().decode(stderr);

    if (!success) {
      const errorMessage = stderrText.trim() || "Unknown error";

      if (
        errorMessage.includes("not signed in") ||
        errorMessage.includes("authorization") ||
        errorMessage.includes("authenticate")
      ) {
        throw new Error(
          `1Password authentication failed.\n\n` +
            `Authenticate using one of:\n` +
            `  - Service account: export OP_SERVICE_ACCOUNT_TOKEN=<token>\n` +
            `  - Desktop app: enable CLI integration in 1Password settings\n` +
            `  - Sign in: op signin\n\n` +
            `Error: ${errorMessage}`,
        );
      }

      if (
        errorMessage.includes("isn't a vault") ||
        (errorMessage.includes("vault") && errorMessage.includes("not found"))
      ) {
        throw new Error(
          `1Password vault '${this.opVault}' not found. Verify the vault name in your configuration.\n\n` +
            `Error: ${errorMessage}`,
        );
      }

      throw new Error(`1Password CLI error: ${errorMessage}`);
    }

    return stdoutText;
  }
}

export const vault = {
  type: "@swamp/1password",
  name: "1Password",
  description:
    "1Password vault provider. Uses the 1Password CLI (op) for secret operations.",
  configSchema: z.object({
    op_vault: z.string().min(1).describe("The 1Password vault to use"),
    op_account: z.string().optional().describe("Account shorthand or UUID"),
  }),
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider {
    const parsed = vault.configSchema.parse(config);
    return new OnePasswordVaultProvider(name, parsed);
  },
};
