// Auto-generated extension model for @swamp/aws/greengrassv2/component-version
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

export const ComponentPlatformSchema = z.object({
  Name: z.string().optional(),
  Attributes: z.record(z.string(), z.string()).optional(),
});

export const ComponentDependencyRequirementSchema = z.object({
  VersionRequirement: z.string().optional(),
  DependencyType: z.enum(["SOFT", "HARD"]).optional(),
});

export const LambdaEventSourceSchema = z.object({
  Topic: z.string().optional(),
  Type: z.enum(["PUB_SUB", "IOT_CORE"]).optional(),
});

export const LambdaVolumeMountSchema = z.object({
  SourcePath: z.string().optional(),
  DestinationPath: z.string().optional(),
  Permission: z.enum(["ro", "rw"]).optional(),
  AddGroupOwner: z.boolean().optional(),
});

export const LambdaDeviceMountSchema = z.object({
  Path: z.string().optional(),
  Permission: z.enum(["ro", "rw"]).optional(),
  AddGroupOwner: z.boolean().optional(),
});

export const LambdaContainerParamsSchema = z.object({
  MemorySizeInKB: z.number().int().optional(),
  MountROSysfs: z.boolean().optional(),
  Volumes: z.array(LambdaVolumeMountSchema).optional(),
  Devices: z.array(LambdaDeviceMountSchema).optional(),
});

export const LambdaLinuxProcessParamsSchema = z.object({
  IsolationMode: z.enum(["GreengrassContainer", "NoContainer"]).optional(),
  ContainerParams: LambdaContainerParamsSchema.optional(),
});

export const LambdaExecutionParametersSchema = z.object({
  EventSources: z.array(LambdaEventSourceSchema).optional(),
  MaxQueueSize: z.number().int().optional(),
  MaxInstancesCount: z.number().int().optional(),
  MaxIdleTimeInSeconds: z.number().int().optional(),
  TimeoutInSeconds: z.number().int().optional(),
  StatusTimeoutInSeconds: z.number().int().optional(),
  Pinned: z.boolean().optional(),
  InputPayloadEncodingType: z.enum(["json", "binary"]).optional(),
  ExecArgs: z.array(z.string()).optional(),
  EnvironmentVariables: z.record(z.string(), z.string()).optional(),
  LinuxProcessParams: LambdaLinuxProcessParamsSchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string().regex(
      new RegExp("^arn:[^:]*:lambda:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
    ).optional(),
    ComponentPlatforms: z.array(ComponentPlatformSchema).optional(),
    ComponentDependencies: z.record(
      z.string(),
      ComponentDependencyRequirementSchema,
    ).optional(),
    ComponentLambdaParameters: LambdaExecutionParametersSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ComponentName: z.string().optional(),
  ComponentVersion: z.string().optional(),
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string(),
    ComponentName: z.string(),
    ComponentVersion: z.string(),
    ComponentPlatforms: z.array(ComponentPlatformSchema),
    ComponentDependencies: z.record(z.string(), z.unknown()),
    ComponentLambdaParameters: LambdaExecutionParametersSchema,
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string().regex(
      new RegExp("^arn:[^:]*:lambda:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
    ).optional(),
    ComponentPlatforms: z.array(ComponentPlatformSchema).optional(),
    ComponentDependencies: z.record(
      z.string(),
      ComponentDependencyRequirementSchema,
    ).optional(),
    ComponentLambdaParameters: LambdaExecutionParametersSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/greengrassv2/component-version",
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
      description: "GreengrassV2 ComponentVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GreengrassV2 ComponentVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Get a GreengrassV2 ComponentVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 ComponentVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Update a GreengrassV2 ComponentVersion",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GreengrassV2::ComponentVersion",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GreengrassV2::ComponentVersion",
          identifier,
          currentState,
          desiredState,
          ["LambdaFunction", "InlineRecipe"],
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
      description: "Delete a GreengrassV2 ComponentVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 ComponentVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Sync GreengrassV2 ComponentVersion state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GreengrassV2::ComponentVersion",
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
