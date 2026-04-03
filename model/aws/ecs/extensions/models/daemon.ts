// Auto-generated extension model for @swamp/aws/ecs/daemon
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

export const DaemonAlarmConfigurationSchema = z.object({
  AlarmNames: z.array(z.string()).optional(),
  Enable: z.boolean().optional(),
});

export const TagSchema = z.object({
  Value: z.string().optional(),
  Key: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ClusterArn: z.string().optional(),
  DaemonTaskDefinitionArn: z.string().optional(),
  DaemonName: z.string().optional(),
  EnableECSManagedTags: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  PropagateTags: z.enum(["DAEMON", "NONE"]).optional(),
  CapacityProviderArns: z.array(z.string()).optional(),
  DeploymentConfiguration: z.object({
    DrainPercent: z.number().min(0).max(100).optional(),
    BakeTimeInMinutes: z.number().int().min(0).max(1440).optional(),
    Alarms: DaemonAlarmConfigurationSchema.optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ClusterArn: z.string().optional(),
  DaemonStatus: z.string().optional(),
  DaemonTaskDefinitionArn: z.string().optional(),
  DaemonName: z.string().optional(),
  EnableECSManagedTags: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  PropagateTags: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  DeploymentArn: z.string().optional(),
  CapacityProviderArns: z.array(z.string()).optional(),
  DaemonArn: z.string(),
  DeploymentConfiguration: z.object({
    DrainPercent: z.number(),
    BakeTimeInMinutes: z.number(),
    Alarms: DaemonAlarmConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ClusterArn: z.string().optional(),
  DaemonTaskDefinitionArn: z.string().optional(),
  DaemonName: z.string().optional(),
  EnableECSManagedTags: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  PropagateTags: z.enum(["DAEMON", "NONE"]).optional(),
  CapacityProviderArns: z.array(z.string()).optional(),
  DeploymentConfiguration: z.object({
    DrainPercent: z.number().min(0).max(100).optional(),
    BakeTimeInMinutes: z.number().int().min(0).max(1440).optional(),
    Alarms: DaemonAlarmConfigurationSchema.optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ecs/daemon",
  version: "2026.04.03.3",
  upgrades: [
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECS Daemon resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECS Daemon",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ECS::Daemon",
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
      description: "Get a ECS Daemon",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS Daemon",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ECS::Daemon",
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
      description: "Update a ECS Daemon",
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
        const identifier = existing.DaemonArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECS::Daemon",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECS::Daemon",
          identifier,
          currentState,
          desiredState,
          ["DaemonName", "ClusterArn"],
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
      description: "Delete a ECS Daemon",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS Daemon",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ECS::Daemon",
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
      description: "Sync ECS Daemon state from AWS",
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
        const identifier = existing.DaemonArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECS::Daemon",
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
