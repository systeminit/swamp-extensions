// Auto-generated extension model for @swamp/aws/elasticache/subnet-group
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
  Value: z.string(),
  Key: z.string(),
});

const GlobalArgsSchema = z.object({
  Description: z.string().describe(
    "The description for the cache subnet group.",
  ),
  SubnetIds: z.array(z.string()).describe(
    "The EC2 subnet IDs for the cache subnet group.",
  ),
  CacheSubnetGroupName: z.string().describe(
    "The name for the cache subnet group. This value is stored as a lowercase string.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  CacheSubnetGroupName: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().describe(
    "The description for the cache subnet group.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The EC2 subnet IDs for the cache subnet group.",
  ).optional(),
  CacheSubnetGroupName: z.string().describe(
    "The name for the cache subnet group. This value is stored as a lowercase string.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/elasticache/subnet-group",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElastiCache SubnetGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElastiCache SubnetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElastiCache::SubnetGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.CacheSubnetGroupName ?? g.CacheSubnetGroupName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
              /\.\./,
              "_",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ElastiCache SubnetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache SubnetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ElastiCache::SubnetGroup",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.CacheSubnetGroupName ??
          context.globalArgs.CacheSubnetGroupName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElastiCache SubnetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.CacheSubnetGroupName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.CacheSubnetGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElastiCache::SubnetGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElastiCache::SubnetGroup",
          identifier,
          currentState,
          desiredState,
          ["CacheSubnetGroupName"],
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
      description: "Delete a ElastiCache SubnetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache SubnetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ElastiCache::SubnetGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.CacheSubnetGroupName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync ElastiCache SubnetGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.CacheSubnetGroupName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.CacheSubnetGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElastiCache::SubnetGroup",
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
