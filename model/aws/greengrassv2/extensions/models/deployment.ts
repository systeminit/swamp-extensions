// Auto-generated extension model for @swamp/aws/greengrassv2/deployment
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

export const ComponentConfigurationUpdateSchema = z.object({
  Merge: z.string().min(1).max(10485760).optional(),
  Reset: z.array(z.string().min(0).max(256)).optional(),
});

export const SystemResourceLimitsSchema = z.object({
  Memory: z.number().int().min(0).max(9223372036854772000).optional(),
  Cpus: z.number().min(0).optional(),
});

export const ComponentRunWithSchema = z.object({
  PosixUser: z.string().min(1).optional(),
  SystemResourceLimits: SystemResourceLimitsSchema.optional(),
  WindowsUser: z.string().min(1).optional(),
});

export const ComponentDeploymentSpecificationSchema = z.object({
  ComponentVersion: z.string().min(1).max(64).optional(),
  ConfigurationUpdate: ComponentConfigurationUpdateSchema.optional(),
  RunWith: ComponentRunWithSchema.optional(),
});

export const IoTJobExponentialRolloutRateSchema = z.object({
  BaseRatePerMinute: z.number().int().min(1).max(1000),
  IncrementFactor: z.number().min(1).max(5),
  RateIncreaseCriteria: z.string(),
});

export const IoTJobExecutionsRolloutConfigSchema = z.object({
  ExponentialRate: IoTJobExponentialRolloutRateSchema.optional(),
  MaximumPerMinute: z.number().int().min(1).max(1000).optional(),
});

export const IoTJobAbortCriteriaSchema = z.object({
  FailureType: z.enum(["FAILED", "REJECTED", "TIMED_OUT", "ALL"]),
  Action: z.enum(["CANCEL"]),
  ThresholdPercentage: z.number().min(0).max(100),
  MinNumberOfExecutedThings: z.number().int().min(1).max(2147483647),
});

export const IoTJobAbortConfigSchema = z.object({
  CriteriaList: z.array(IoTJobAbortCriteriaSchema),
});

export const IoTJobTimeoutConfigSchema = z.object({
  InProgressTimeoutInMinutes: z.number().int().min(0).max(2147483647)
    .optional(),
});

export const DeploymentComponentUpdatePolicySchema = z.object({
  TimeoutInSeconds: z.number().int().min(1).max(2147483647).optional(),
  Action: z.enum(["NOTIFY_COMPONENTS", "SKIP_NOTIFY_COMPONENTS"]).optional(),
});

export const DeploymentConfigurationValidationPolicySchema = z.object({
  TimeoutInSeconds: z.number().int().min(1).max(2147483647).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TargetArn: z.string().regex(
    new RegExp("arn:[^:]*:iot:[^:]*:[0-9]+:(thing|thinggroup)/.+"),
  ),
  ParentTargetArn: z.string().regex(
    new RegExp("arn:[^:]*:iot:[^:]*:[0-9]+:thinggroup/.+"),
  ).optional(),
  DeploymentName: z.string().min(1).max(256).optional(),
  Components: z.record(z.string(), ComponentDeploymentSpecificationSchema)
    .optional(),
  IotJobConfiguration: z.object({
    JobExecutionsRolloutConfig: IoTJobExecutionsRolloutConfigSchema.optional(),
    AbortConfig: IoTJobAbortConfigSchema.optional(),
    TimeoutConfig: IoTJobTimeoutConfigSchema.optional(),
  }).optional(),
  DeploymentPolicies: z.object({
    FailureHandlingPolicy: z.enum(["ROLLBACK", "DO_NOTHING"]).optional(),
    ComponentUpdatePolicy: DeploymentComponentUpdatePolicySchema.optional(),
    ConfigurationValidationPolicy: DeploymentConfigurationValidationPolicySchema
      .optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

const StateSchema = z.object({
  TargetArn: z.string().optional(),
  ParentTargetArn: z.string().optional(),
  DeploymentId: z.string(),
  DeploymentName: z.string().optional(),
  Components: z.record(z.string(), z.unknown()).optional(),
  IotJobConfiguration: z.object({
    JobExecutionsRolloutConfig: IoTJobExecutionsRolloutConfigSchema,
    AbortConfig: IoTJobAbortConfigSchema,
    TimeoutConfig: IoTJobTimeoutConfigSchema,
  }).optional(),
  DeploymentPolicies: z.object({
    FailureHandlingPolicy: z.string(),
    ComponentUpdatePolicy: DeploymentComponentUpdatePolicySchema,
    ConfigurationValidationPolicy:
      DeploymentConfigurationValidationPolicySchema,
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TargetArn: z.string().regex(
    new RegExp("arn:[^:]*:iot:[^:]*:[0-9]+:(thing|thinggroup)/.+"),
  ).optional(),
  ParentTargetArn: z.string().regex(
    new RegExp("arn:[^:]*:iot:[^:]*:[0-9]+:thinggroup/.+"),
  ).optional(),
  DeploymentName: z.string().min(1).max(256).optional(),
  Components: z.record(z.string(), ComponentDeploymentSpecificationSchema)
    .optional(),
  IotJobConfiguration: z.object({
    JobExecutionsRolloutConfig: IoTJobExecutionsRolloutConfigSchema.optional(),
    AbortConfig: IoTJobAbortConfigSchema.optional(),
    TimeoutConfig: IoTJobTimeoutConfigSchema.optional(),
  }).optional(),
  DeploymentPolicies: z.object({
    FailureHandlingPolicy: z.enum(["ROLLBACK", "DO_NOTHING"]).optional(),
    ComponentUpdatePolicy: DeploymentComponentUpdatePolicySchema.optional(),
    ConfigurationValidationPolicy: DeploymentConfigurationValidationPolicySchema
      .optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/greengrassv2/deployment",
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
      description: "GreengrassV2 Deployment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GreengrassV2 Deployment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GreengrassV2::Deployment",
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
      description: "Get a GreengrassV2 Deployment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 Deployment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GreengrassV2::Deployment",
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
      description: "Update a GreengrassV2 Deployment",
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
        const identifier = existing.DeploymentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GreengrassV2::Deployment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GreengrassV2::Deployment",
          identifier,
          currentState,
          desiredState,
          [
            "TargetArn",
            "ParentTargetArn",
            "DeploymentName",
            "Components",
            "IotJobConfiguration",
            "DeploymentPolicies",
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
      description: "Delete a GreengrassV2 Deployment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 Deployment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GreengrassV2::Deployment",
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
      description: "Sync GreengrassV2 Deployment state from AWS",
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
        const identifier = existing.DeploymentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GreengrassV2::Deployment",
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
