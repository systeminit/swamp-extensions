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
import {
  CreateSecretCommand,
  GetSecretValueCommand,
  ListSecretsCommand,
  PutSecretValueCommand,
  ResourceNotFoundException,
  SecretsManagerClient,
} from "npm:@aws-sdk/client-secrets-manager@3.1010.0";

const configSchema = z.object({
  region: z.string().min(1, "AWS region is required"),
});

interface VaultProvider {
  get(secretKey: string): Promise<string>;
  put(secretKey: string, secretValue: string): Promise<void>;
  list(): Promise<string[]>;
  getName(): string;
}

class AwsSmVaultProvider implements VaultProvider {
  private readonly client: SecretsManagerClient;
  private readonly name: string;

  constructor(name: string, config: { region: string }) {
    this.name = name;
    this.client = new SecretsManagerClient({ region: config.region });
  }

  async get(secretKey: string): Promise<string> {
    const command = new GetSecretValueCommand({ SecretId: secretKey });
    const response = await this.client.send(command);

    const secretValue = response.SecretString ||
      (response.SecretBinary
        ? new TextDecoder().decode(response.SecretBinary)
        : "");

    if (!secretValue) {
      throw new Error(`Secret '${secretKey}' not found or has no value`);
    }

    return secretValue;
  }

  async put(secretKey: string, secretValue: string): Promise<void> {
    try {
      const putCommand = new PutSecretValueCommand({
        SecretId: secretKey,
        SecretString: secretValue,
      });
      await this.client.send(putCommand);
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        const createCommand = new CreateSecretCommand({
          Name: secretKey,
          SecretString: secretValue,
        });
        await this.client.send(createCommand);
      } else {
        throw error;
      }
    }
  }

  async list(): Promise<string[]> {
    const secretNames: string[] = [];
    let nextToken: string | undefined;

    do {
      const command = new ListSecretsCommand({ NextToken: nextToken });
      const response = await this.client.send(command);

      if (response.SecretList) {
        for (const secret of response.SecretList) {
          if (secret.Name) {
            secretNames.push(secret.Name);
          }
        }
      }

      nextToken = response.NextToken;
    } while (nextToken);

    return secretNames.sort();
  }

  getName(): string {
    return this.name;
  }
}

export const vault = {
  type: "@swamp/aws-sm",
  name: "AWS Secrets Manager",
  description:
    "AWS Secrets Manager vault provider. Uses the default AWS credential chain for authentication.",
  configSchema,
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider {
    const parsed = configSchema.parse(config);
    return new AwsSmVaultProvider(name, parsed);
  },
};
