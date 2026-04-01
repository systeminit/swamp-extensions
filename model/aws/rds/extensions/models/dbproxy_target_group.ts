// Auto-generated extension model for @swamp/aws/rds/dbproxy-target-group
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DBProxyName: z.string().max(64).regex(new RegExp("[A-z][0-z]*")).describe(
    "The identifier for the proxy.",
  ),
  TargetGroupName: z.enum(["default"]).describe(
    "The identifier for the DBProxyTargetGroup",
  ),
  ConnectionPoolConfigurationInfo: z.object({
    MaxConnectionsPercent: z.number().int().min(0).max(100).describe(
      "The maximum size of the connection pool for each target in a target group.",
    ).optional(),
    MaxIdleConnectionsPercent: z.number().int().min(0).max(100).describe(
      "Controls how actively the proxy closes idle database connections in the connection pool.",
    ).optional(),
    ConnectionBorrowTimeout: z.number().int().describe(
      "The number of seconds for a proxy to wait for a connection to become available in the connection pool.",
    ).optional(),
    SessionPinningFilters: z.array(z.string()).describe(
      "Each item in the list represents a class of SQL operations that normally cause all later statements in a session using a proxy to be pinned to the same underlying database connection.",
    ).optional(),
    InitQuery: z.string().describe(
      "One or more SQL statements for the proxy to run when opening each new database connection.",
    ).optional(),
  }).optional(),
  DBInstanceIdentifiers: z.array(z.string()).optional(),
  DBClusterIdentifiers: z.array(z.string()).optional(),
});

const StateSchema = z.object({
  DBProxyName: z.string().optional(),
  TargetGroupArn: z.string(),
  TargetGroupName: z.string().optional(),
  ConnectionPoolConfigurationInfo: z.object({
    MaxConnectionsPercent: z.number(),
    MaxIdleConnectionsPercent: z.number(),
    ConnectionBorrowTimeout: z.number(),
    SessionPinningFilters: z.array(z.string()),
    InitQuery: z.string(),
  }).optional(),
  DBInstanceIdentifiers: z.array(z.string()).optional(),
  DBClusterIdentifiers: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DBProxyName: z.string().max(64).regex(new RegExp("[A-z][0-z]*")).describe(
    "The identifier for the proxy.",
  ).optional(),
  TargetGroupName: z.enum(["default"]).describe(
    "The identifier for the DBProxyTargetGroup",
  ).optional(),
  ConnectionPoolConfigurationInfo: z.object({
    MaxConnectionsPercent: z.number().int().min(0).max(100).describe(
      "The maximum size of the connection pool for each target in a target group.",
    ).optional(),
    MaxIdleConnectionsPercent: z.number().int().min(0).max(100).describe(
      "Controls how actively the proxy closes idle database connections in the connection pool.",
    ).optional(),
    ConnectionBorrowTimeout: z.number().int().describe(
      "The number of seconds for a proxy to wait for a connection to become available in the connection pool.",
    ).optional(),
    SessionPinningFilters: z.array(z.string()).describe(
      "Each item in the list represents a class of SQL operations that normally cause all later statements in a session using a proxy to be pinned to the same underlying database connection.",
    ).optional(),
    InitQuery: z.string().describe(
      "One or more SQL statements for the proxy to run when opening each new database connection.",
    ).optional(),
  }).optional(),
  DBInstanceIdentifiers: z.array(z.string()).optional(),
  DBClusterIdentifiers: z.array(z.string()).optional(),
});

export const model = {
  type: "@swamp/aws/rds/dbproxy-target-group",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS DBProxyTargetGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBProxyTargetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RDS::DBProxyTargetGroup",
          desiredState,
        ) as StateData;
        const instanceName = g.name?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a RDS DBProxyTargetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxyTargetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RDS::DBProxyTargetGroup",
          args.identifier,
        ) as StateData;
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Update a RDS DBProxyTargetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TargetGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBProxyTargetGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBProxyTargetGroup",
          identifier,
          currentState,
          desiredState,
          ["DBProxyName", "TargetGroupName"],
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
      description: "Delete a RDS DBProxyTargetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxyTargetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RDS::DBProxyTargetGroup",
          args.identifier,
        );
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Sync RDS DBProxyTargetGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TargetGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBProxyTargetGroup",
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
