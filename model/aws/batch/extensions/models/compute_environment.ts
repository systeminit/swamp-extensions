// Auto-generated extension model for @swamp/aws/batch/compute-environment
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

export const Ec2ConfigurationObjectSchema = z.object({
  ImageIdOverride: z.string().optional(),
  ImageType: z.string(),
  ImageKubernetesVersion: z.string().optional(),
});

export const LaunchTemplateSpecificationOverrideSchema = z.object({
  LaunchTemplateId: z.string().optional(),
  LaunchTemplateName: z.string().optional(),
  Version: z.string().optional(),
  UserdataType: z.enum(["EKS_BOOTSTRAP_SH", "EKS_NODEADM"]).optional(),
  TargetInstanceTypes: z.array(z.string()).optional(),
});

export const LaunchTemplateSpecificationSchema = z.object({
  LaunchTemplateId: z.string().optional(),
  LaunchTemplateName: z.string().optional(),
  Version: z.string().optional(),
  UserdataType: z.enum(["EKS_BOOTSTRAP_SH", "EKS_NODEADM"]).optional(),
  Overrides: z.array(LaunchTemplateSpecificationOverrideSchema).optional(),
});

export const ComputeScalingPolicySchema = z.object({
  MinScaleDownDelayMinutes: z.number().int().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    AllocationStrategy: z.string().optional(),
    BidPercentage: z.number().int().optional(),
    DesiredvCpus: z.number().int().optional(),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema).optional(),
    Ec2KeyPair: z.string().optional(),
    ImageId: z.string().optional(),
    InstanceRole: z.string().optional(),
    InstanceTypes: z.array(z.string()).optional(),
    LaunchTemplate: LaunchTemplateSpecificationSchema.optional(),
    MaxvCpus: z.number().int(),
    MinvCpus: z.number().int().optional(),
    PlacementGroup: z.string().optional(),
    ScalingPolicy: ComputeScalingPolicySchema.optional(),
    SecurityGroupIds: z.array(z.string()).optional(),
    SpotIamFleetRole: z.string().optional(),
    Subnets: z.array(z.string()),
    Tags: z.record(z.string(), z.string()).describe(
      "A key-value pair to associate with a resource.",
    ).optional(),
    Type: z.string(),
    UpdateToLatestImageVersion: z.boolean().optional(),
  }).optional(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  Type: z.string(),
  UpdatePolicy: z.object({
    TerminateJobsOnUpdate: z.boolean().optional(),
    JobExecutionTimeoutMinutes: z.number().int().optional(),
  }).optional(),
  UnmanagedvCpus: z.number().int().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string(),
    KubernetesNamespace: z.string(),
  }).optional(),
  Context: z.string().optional(),
});

const StateSchema = z.object({
  ComputeEnvironmentArn: z.string(),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    AllocationStrategy: z.string(),
    BidPercentage: z.number(),
    DesiredvCpus: z.number(),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema),
    Ec2KeyPair: z.string(),
    ImageId: z.string(),
    InstanceRole: z.string(),
    InstanceTypes: z.array(z.string()),
    LaunchTemplate: LaunchTemplateSpecificationSchema,
    MaxvCpus: z.number(),
    MinvCpus: z.number(),
    PlacementGroup: z.string(),
    ScalingPolicy: ComputeScalingPolicySchema,
    SecurityGroupIds: z.array(z.string()),
    SpotIamFleetRole: z.string(),
    Subnets: z.array(z.string()),
    Tags: z.record(z.string(), z.unknown()),
    Type: z.string(),
    UpdateToLatestImageVersion: z.boolean(),
  }).optional(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Type: z.string().optional(),
  UpdatePolicy: z.object({
    TerminateJobsOnUpdate: z.boolean(),
    JobExecutionTimeoutMinutes: z.number(),
  }).optional(),
  UnmanagedvCpus: z.number().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string(),
    KubernetesNamespace: z.string(),
  }).optional(),
  Context: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ComputeEnvironmentName: z.string().optional(),
  ComputeResources: z.object({
    AllocationStrategy: z.string().optional(),
    BidPercentage: z.number().int().optional(),
    DesiredvCpus: z.number().int().optional(),
    Ec2Configuration: z.array(Ec2ConfigurationObjectSchema).optional(),
    Ec2KeyPair: z.string().optional(),
    ImageId: z.string().optional(),
    InstanceRole: z.string().optional(),
    InstanceTypes: z.array(z.string()).optional(),
    LaunchTemplate: LaunchTemplateSpecificationSchema.optional(),
    MaxvCpus: z.number().int().optional(),
    MinvCpus: z.number().int().optional(),
    PlacementGroup: z.string().optional(),
    ScalingPolicy: ComputeScalingPolicySchema.optional(),
    SecurityGroupIds: z.array(z.string()).optional(),
    SpotIamFleetRole: z.string().optional(),
    Subnets: z.array(z.string()).optional(),
    Tags: z.record(z.string(), z.string()).describe(
      "A key-value pair to associate with a resource.",
    ).optional(),
    Type: z.string().optional(),
    UpdateToLatestImageVersion: z.boolean().optional(),
  }).optional(),
  ReplaceComputeEnvironment: z.boolean().optional(),
  ServiceRole: z.string().optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  Type: z.string().optional(),
  UpdatePolicy: z.object({
    TerminateJobsOnUpdate: z.boolean().optional(),
    JobExecutionTimeoutMinutes: z.number().int().optional(),
  }).optional(),
  UnmanagedvCpus: z.number().int().optional(),
  EksConfiguration: z.object({
    EksClusterArn: z.string().optional(),
    KubernetesNamespace: z.string().optional(),
  }).optional(),
  Context: z.string().optional(),
});

export const model = {
  type: "@swamp/aws/batch/compute-environment",
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
      description: "Batch ComputeEnvironment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch ComputeEnvironment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Batch::ComputeEnvironment",
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
      description: "Get a Batch ComputeEnvironment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch ComputeEnvironment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Batch::ComputeEnvironment",
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
      description: "Update a Batch ComputeEnvironment",
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
        const identifier = existing.ComputeEnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::ComputeEnvironment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Batch::ComputeEnvironment",
          identifier,
          currentState,
          desiredState,
          [
            "SpotIamFleetRole",
            "ComputeEnvironmentName",
            "Tags",
            "Type",
            "EksConfiguration",
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
      description: "Delete a Batch ComputeEnvironment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch ComputeEnvironment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Batch::ComputeEnvironment",
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
      description: "Sync Batch ComputeEnvironment state from AWS",
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
        const identifier = existing.ComputeEnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::ComputeEnvironment",
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
