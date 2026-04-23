// Auto-generated extension model for @swamp/aws/bedrock/data-automation-library
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock DataAutomationLibrary (AWS::Bedrock::DataAutomationLibrary).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Tag key"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Tag value"),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).regex(
      new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]+$"),
    ).describe("KMS Key Identifier"),
    KmsEncryptionContext: z.record(
      z.string(),
      z.string().min(1).max(2000).regex(new RegExp("^.*\\S.*$")),
    ).describe("KMS Encryption Context").optional(),
  }).describe("KMS Encryption Configuration").optional(),
  LibraryDescription: z.string().min(0).max(300).describe(
    "Description of the DataAutomationLibrary",
  ).optional(),
  LibraryName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Name of the DataAutomationLibrary"),
  Tags: z.array(TagSchema).describe("List of tags").optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string(),
    KmsEncryptionContext: z.record(z.string(), z.unknown()),
  }).optional(),
  EntityTypes: z.array(z.object({
    EntityType: z.string(),
    EntityMetadata: z.string(),
  })).optional(),
  LibraryArn: z.string(),
  LibraryDescription: z.string().optional(),
  LibraryName: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).regex(
      new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]+$"),
    ).describe("KMS Key Identifier").optional(),
    KmsEncryptionContext: z.record(
      z.string(),
      z.string().min(1).max(2000).regex(new RegExp("^.*\\S.*$")),
    ).describe("KMS Encryption Context").optional(),
  }).describe("KMS Encryption Configuration").optional(),
  LibraryDescription: z.string().min(0).max(300).describe(
    "Description of the DataAutomationLibrary",
  ).optional(),
  LibraryName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Name of the DataAutomationLibrary").optional(),
  Tags: z.array(TagSchema).describe("List of tags").optional(),
});

/** Swamp extension model for Bedrock DataAutomationLibrary. Registered at `@swamp/aws/bedrock/data-automation-library`. */
export const model = {
  type: "@swamp/aws/bedrock/data-automation-library",
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock DataAutomationLibrary resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock DataAutomationLibrary",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::DataAutomationLibrary",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Bedrock DataAutomationLibrary",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock DataAutomationLibrary",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::DataAutomationLibrary",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Bedrock DataAutomationLibrary",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LibraryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::DataAutomationLibrary",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::DataAutomationLibrary",
          identifier,
          currentState,
          desiredState,
          ["EncryptionConfiguration", "LibraryName"],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Bedrock DataAutomationLibrary",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock DataAutomationLibrary",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::DataAutomationLibrary",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Bedrock DataAutomationLibrary state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LibraryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::DataAutomationLibrary",
            identifier,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              identifier,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
