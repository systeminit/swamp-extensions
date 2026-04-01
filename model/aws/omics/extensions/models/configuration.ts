// Auto-generated extension model for @swamp/aws/omics/configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const VpcConfigSchema = z.object({
  SecurityGroupIds: z.array(z.string().regex(new RegExp("^sg-[0-9a-f]+$")))
    .optional(),
  SubnetIds: z.array(z.string().regex(new RegExp("^subnet-[0-9a-f]+$")))
    .optional(),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(1).max(128).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9\\-\\._]*$"),
  ).describe("User-friendly name for the configuration."),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("Optional description for the configuration.").optional(),
  RunConfigurations: z.object({
    VpcConfig: VpcConfigSchema.optional(),
  }).describe("Required run-specific configurations."),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "Tags for the configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  RunConfigurations: z.object({
    VpcConfig: VpcConfigSchema,
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Arn: z.string().optional(),
  Uuid: z.string().optional(),
  Status: z.string().optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(128).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9\\-\\._]*$"),
  ).describe("User-friendly name for the configuration.").optional(),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("Optional description for the configuration.").optional(),
  RunConfigurations: z.object({
    VpcConfig: VpcConfigSchema.optional(),
  }).describe("Required run-specific configurations.").optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "Tags for the configuration.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/omics/configuration",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Omics Configuration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Omics Configuration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Omics::Configuration",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Omics Configuration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics Configuration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Omics::Configuration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Omics Configuration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics Configuration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Omics::Configuration",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
          args.identifier;
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
      description: "Sync Omics Configuration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Omics::Configuration",
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
