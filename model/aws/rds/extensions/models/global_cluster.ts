// Auto-generated extension model for @swamp/aws/rds/global-cluster
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  Engine: z.enum(["aurora", "aurora-mysql", "aurora-postgresql"]).describe(
    "The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora). If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  EngineLifecycleSupport: z.string().describe(
    "The life cycle type of the global cluster. You can use this setting to enroll your global cluster into Amazon RDS Extended Support.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the database engine to use. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled.",
  ).optional(),
  GlobalClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The cluster identifier of the new global database cluster. This parameter is stored as a lowercase string.",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) to use as the primary cluster of the global database. This parameter is optional. This parameter is stored as a lowercase string.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "The storage encryption setting for the new global database cluster. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  GlobalEndpoint: z.object({
    Address: z.string().describe(
      "The writer endpoint for the global database cluster. This endpoint always points to the writer DB instance in the current primary cluster.",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  Engine: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  EngineLifecycleSupport: z.string().optional(),
  EngineVersion: z.string().optional(),
  DeletionProtection: z.boolean().optional(),
  GlobalClusterIdentifier: z.string(),
  SourceDBClusterIdentifier: z.string().optional(),
  StorageEncrypted: z.boolean().optional(),
  GlobalEndpoint: z.object({
    Address: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Engine: z.enum(["aurora", "aurora-mysql", "aurora-postgresql"]).describe(
    "The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora). If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  EngineLifecycleSupport: z.string().describe(
    "The life cycle type of the global cluster. You can use this setting to enroll your global cluster into Amazon RDS Extended Support.",
  ).optional(),
  EngineVersion: z.string().describe(
    "The version number of the database engine to use. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled.",
  ).optional(),
  GlobalClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The cluster identifier of the new global database cluster. This parameter is stored as a lowercase string.",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) to use as the primary cluster of the global database. This parameter is optional. This parameter is stored as a lowercase string.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "The storage encryption setting for the new global database cluster. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.",
  ).optional(),
  GlobalEndpoint: z.object({
    Address: z.string().describe(
      "The writer endpoint for the global database cluster. This endpoint always points to the writer DB instance in the current primary cluster.",
    ).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/rds/global-cluster",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS GlobalCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS GlobalCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RDS::GlobalCluster",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.GlobalClusterIdentifier ?? g.GlobalClusterIdentifier)
            ?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a RDS GlobalCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS GlobalCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RDS::GlobalCluster",
          args.identifier,
        ) as StateData;
        const instanceName = (result.GlobalClusterIdentifier ??
          context.globalArgs.GlobalClusterIdentifier)?.toString() ??
          args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a RDS GlobalCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.GlobalClusterIdentifier?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.GlobalClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::GlobalCluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::GlobalCluster",
          identifier,
          currentState,
          desiredState,
          [
            "GlobalClusterIdentifier",
            "SourceDBClusterIdentifier",
            "StorageEncrypted",
            "Engine",
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
      description: "Delete a RDS GlobalCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS GlobalCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RDS::GlobalCluster",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.GlobalClusterIdentifier?.toString() ??
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
      description: "Sync RDS GlobalCluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.GlobalClusterIdentifier?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.GlobalClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::GlobalCluster",
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
