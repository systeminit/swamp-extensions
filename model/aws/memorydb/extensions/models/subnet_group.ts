// Auto-generated extension model for @swamp/aws/memorydb/subnet-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)(?!memorydb:)[a-zA-Z0-9 _\\.\\/=+:\\-@]{1,128}$"),
  ).describe("The key for the tag. May not be null."),
  Value: z.string().min(1).max(256).regex(
    new RegExp("^(?!aws:)(?!memorydb:)[a-zA-Z0-9 _\\.\\/=+:\\-@]{1,256}$"),
  ).describe("The tag's value. May be null."),
});

const GlobalArgsSchema = z.object({
  SubnetGroupName: z.string().regex(new RegExp("[a-z][a-z0-9\\-]*")).describe(
    "The name of the subnet group. This value must be unique as it also serves as the subnet group identifier.",
  ),
  Description: z.string().describe(
    "An optional description of the subnet group.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "A list of VPC subnet IDs for the subnet group.",
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this subnet group.",
  ).optional(),
});

const StateSchema = z.object({
  SubnetGroupName: z.string(),
  Description: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  ARN: z.string().optional(),
  SupportedNetworkTypes: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  SubnetGroupName: z.string().regex(new RegExp("[a-z][a-z0-9\\-]*")).describe(
    "The name of the subnet group. This value must be unique as it also serves as the subnet group identifier.",
  ).optional(),
  Description: z.string().describe(
    "An optional description of the subnet group.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "A list of VPC subnet IDs for the subnet group.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this subnet group.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/memorydb/subnet-group",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MemoryDB SubnetGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MemoryDB SubnetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MemoryDB::SubnetGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.SubnetGroupName ?? g.SubnetGroupName)?.toString() ??
            "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a MemoryDB SubnetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MemoryDB SubnetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MemoryDB::SubnetGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.SubnetGroupName ?? context.globalArgs.SubnetGroupName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a MemoryDB SubnetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.SubnetGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SubnetGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MemoryDB::SubnetGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MemoryDB::SubnetGroup",
          identifier,
          currentState,
          desiredState,
          ["SubnetGroupName"],
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
      description: "Delete a MemoryDB SubnetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MemoryDB SubnetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MemoryDB::SubnetGroup",
          args.identifier,
        );
        const instanceName = context.globalArgs.SubnetGroupName?.toString() ??
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
      description: "Sync MemoryDB SubnetGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.SubnetGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SubnetGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MemoryDB::SubnetGroup",
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
