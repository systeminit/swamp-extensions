// Auto-generated extension model for @swamp/aws/elasticache/serverless-cache
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

export const DataStorageSchema = z.object({
  Minimum: z.number().int().describe(
    "The minimum cached data capacity of the Serverless Cache.",
  ).optional(),
  Maximum: z.number().int().describe(
    "The maximum cached data capacity of the Serverless Cache.",
  ).optional(),
  Unit: z.enum(["GB"]).describe(
    "The unit of cached data capacity of the Serverless Cache.",
  ),
});

export const ECPUPerSecondSchema = z.object({
  Minimum: z.number().int().describe(
    "The minimum ECPU per second of the Serverless Cache.",
  ).optional(),
  Maximum: z.number().int().describe(
    "The maximum ECPU per second of the Serverless Cache.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z0-9 _\\.\\/=+:\\-@]*$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with 'aws:'. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9 _\\.\\/=+:\\-@]*$"),
  ).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  ServerlessCacheName: z.string().describe(
    "The name of the Serverless Cache. This value must be unique.",
  ),
  Description: z.string().describe("The description of the Serverless Cache.")
    .optional(),
  Engine: z.string().describe("The engine name of the Serverless Cache."),
  MajorEngineVersion: z.string().describe(
    "The major engine version of the Serverless Cache.",
  ).optional(),
  CacheUsageLimits: z.object({
    DataStorage: DataStorageSchema.describe(
      "The cached data capacity of the Serverless Cache.",
    ).optional(),
    ECPUPerSecond: ECPUPerSecondSchema.describe(
      "The ECPU per second of the Serverless Cache.",
    ).optional(),
  }).describe("The cache capacity limit of the Serverless Cache.").optional(),
  KmsKeyId: z.string().describe(
    "The ID of the KMS key used to encrypt the cluster.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "One or more Amazon VPC security groups associated with this Serverless Cache.",
  ).optional(),
  SnapshotArnsToRestore: z.array(z.string()).describe(
    "The ARN's of snapshot to restore Serverless Cache.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this Serverless Cache.",
  ).optional(),
  UserGroupId: z.string().describe("The ID of the user group.").optional(),
  SubnetIds: z.array(z.string()).describe(
    "The subnet id's of the Serverless Cache.",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The snapshot retention limit of the Serverless Cache.",
  ).optional(),
  DailySnapshotTime: z.string().describe(
    "The daily time range (in UTC) during which the service takes automatic snapshot of the Serverless Cache.",
  ).optional(),
  FinalSnapshotName: z.string().describe(
    "The final snapshot name which is taken before Serverless Cache is deleted.",
  ).optional(),
});

const StateSchema = z.object({
  ServerlessCacheName: z.string(),
  Description: z.string().optional(),
  Engine: z.string().optional(),
  MajorEngineVersion: z.string().optional(),
  FullEngineVersion: z.string().optional(),
  CacheUsageLimits: z.object({
    DataStorage: DataStorageSchema,
    ECPUPerSecond: ECPUPerSecondSchema,
  }).optional(),
  KmsKeyId: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  SnapshotArnsToRestore: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  UserGroupId: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  SnapshotRetentionLimit: z.number().optional(),
  DailySnapshotTime: z.string().optional(),
  CreateTime: z.string().optional(),
  Status: z.string().optional(),
  Endpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  ReaderEndpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  ARN: z.string().optional(),
  FinalSnapshotName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ServerlessCacheName: z.string().describe(
    "The name of the Serverless Cache. This value must be unique.",
  ).optional(),
  Description: z.string().describe("The description of the Serverless Cache.")
    .optional(),
  Engine: z.string().describe("The engine name of the Serverless Cache.")
    .optional(),
  MajorEngineVersion: z.string().describe(
    "The major engine version of the Serverless Cache.",
  ).optional(),
  CacheUsageLimits: z.object({
    DataStorage: DataStorageSchema.describe(
      "The cached data capacity of the Serverless Cache.",
    ).optional(),
    ECPUPerSecond: ECPUPerSecondSchema.describe(
      "The ECPU per second of the Serverless Cache.",
    ).optional(),
  }).describe("The cache capacity limit of the Serverless Cache.").optional(),
  KmsKeyId: z.string().describe(
    "The ID of the KMS key used to encrypt the cluster.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "One or more Amazon VPC security groups associated with this Serverless Cache.",
  ).optional(),
  SnapshotArnsToRestore: z.array(z.string()).describe(
    "The ARN's of snapshot to restore Serverless Cache.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this Serverless Cache.",
  ).optional(),
  UserGroupId: z.string().describe("The ID of the user group.").optional(),
  SubnetIds: z.array(z.string()).describe(
    "The subnet id's of the Serverless Cache.",
  ).optional(),
  SnapshotRetentionLimit: z.number().int().describe(
    "The snapshot retention limit of the Serverless Cache.",
  ).optional(),
  DailySnapshotTime: z.string().describe(
    "The daily time range (in UTC) during which the service takes automatic snapshot of the Serverless Cache.",
  ).optional(),
  FinalSnapshotName: z.string().describe(
    "The final snapshot name which is taken before Serverless Cache is deleted.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/elasticache/serverless-cache",
  version: "2026.04.03.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElastiCache ServerlessCache resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElastiCache ServerlessCache",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElastiCache::ServerlessCache",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ServerlessCacheName ?? g.ServerlessCacheName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
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
      description: "Get a ElastiCache ServerlessCache",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache ServerlessCache",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ElastiCache::ServerlessCache",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.ServerlessCacheName ??
          context.globalArgs.ServerlessCacheName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElastiCache ServerlessCache",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ServerlessCacheName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ServerlessCacheName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElastiCache::ServerlessCache",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElastiCache::ServerlessCache",
          identifier,
          currentState,
          desiredState,
          [
            "ServerlessCacheName",
            "KmsKeyId",
            "SnapshotArnsToRestore",
            "SubnetIds",
          ],
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
      description: "Delete a ElastiCache ServerlessCache",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache ServerlessCache",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ElastiCache::ServerlessCache",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ServerlessCacheName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync ElastiCache ServerlessCache state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ServerlessCacheName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ServerlessCacheName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElastiCache::ServerlessCache",
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
