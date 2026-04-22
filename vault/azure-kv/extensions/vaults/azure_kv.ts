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

/**
 * Swamp vault provider backed by Azure Key Vault.
 *
 * Reads and writes secrets through the official `@azure/keyvault-secrets`
 * client, authenticating with `DefaultAzureCredential`. Use this entrypoint
 * when a swamp deployment should store its secrets in Azure Key Vault.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { DefaultAzureCredential } from "npm:@azure/identity@4.13.0";
import { SecretClient } from "npm:@azure/keyvault-secrets@4.10.0";

/**
 * Minimal contract implemented by swamp vault providers. Exported so that
 * downstream consumers and tests can type-check against a public interface
 * rather than an inferred shape.
 */
export interface VaultProvider {
  /** Fetches the current value of the given secret. */
  get(secretKey: string): Promise<string>;
  /** Writes a new value for the given secret. */
  put(secretKey: string, secretValue: string): Promise<void>;
  /** Lists all secret keys visible to the vault. */
  list(): Promise<string[]>;
  /** Returns the swamp-assigned name of this vault instance. */
  getName(): string;
}

/**
 * Converts a swamp secret name to an Azure Key Vault compatible name.
 * Azure Key Vault secret names only allow alphanumeric characters and hyphens.
 */
function toAzureSecretName(name: string): string {
  return name.replace(/[/_]/g, "-");
}

class AzureKvVaultProvider implements VaultProvider {
  private readonly client: SecretClient;
  private readonly name: string;
  private readonly secretPrefix: string;

  constructor(
    name: string,
    config: { vault_url: string; secret_prefix?: string },
  ) {
    this.name = name;
    this.secretPrefix = config.secret_prefix ?? "";
    const credential = new DefaultAzureCredential();
    this.client = new SecretClient(config.vault_url, credential);
  }

  async get(secretKey: string): Promise<string> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    const secret = await this.client.getSecret(azureSecretName);

    if (!secret.value) {
      throw new Error(
        `Secret '${secretKey}' in vault '${this.name}' has no value`,
      );
    }

    return secret.value;
  }

  async put(secretKey: string, secretValue: string): Promise<void> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    await this.client.setSecret(azureSecretName, secretValue);
  }

  async list(): Promise<string[]> {
    const secretNames: string[] = [];

    for await (
      const secretProperties of this.client.listPropertiesOfSecrets()
    ) {
      if (secretProperties.name) {
        const name = secretProperties.name;
        if (this.secretPrefix && name.startsWith(this.secretPrefix)) {
          secretNames.push(name.slice(this.secretPrefix.length));
        } else if (!this.secretPrefix) {
          secretNames.push(name);
        }
      }
    }

    return secretNames.sort();
  }

  getName(): string {
    return this.name;
  }
}

/**
 * Extension entrypoint registered with swamp. Declares the vault type, its
 * configuration schema, and the factory used to instantiate a provider.
 */
export const vault = {
  type: "@swamp/azure-kv",
  name: "Azure Key Vault",
  description:
    "Azure Key Vault vault provider. Uses DefaultAzureCredential for authentication.",
  configSchema: z.object({
    // deno-fmt-ignore
    vault_url: z.string().url("Azure Key Vault URL is required").describe("Full URL of the Azure Key Vault e.g. https://my-vault.vault.azure.net"),
    // deno-fmt-ignore
    secret_prefix: z.string().optional().describe("Optional prefix to namespace secrets within the vault e.g. swamp- to scope all reads and writes"),
  }),
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider {
    const parsed = vault.configSchema.parse(config);
    return new AzureKvVaultProvider(name, parsed);
  },
};
