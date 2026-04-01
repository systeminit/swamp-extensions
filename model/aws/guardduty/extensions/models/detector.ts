// Auto-generated extension model for @swamp/aws/guardduty/detector
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

export const CFNS3LogsConfigurationSchema = z.object({
  Enable: z.boolean(),
});

export const CFNKubernetesAuditLogsConfigurationSchema = z.object({
  Enable: z.boolean(),
});

export const CFNKubernetesConfigurationSchema = z.object({
  AuditLogs: CFNKubernetesAuditLogsConfigurationSchema,
});

export const CFNScanEc2InstanceWithFindingsConfigurationSchema = z.object({
  EbsVolumes: z.boolean().optional(),
});

export const CFNMalwareProtectionConfigurationSchema = z.object({
  ScanEc2InstanceWithFindings: CFNScanEc2InstanceWithFindingsConfigurationSchema
    .optional(),
});

export const CFNFeatureAdditionalConfigurationSchema = z.object({
  Name: z.string().min(1).max(256).optional(),
  Status: z.string().min(1).max(128).optional(),
});

export const CFNFeatureConfigurationSchema = z.object({
  Name: z.string().max(128),
  Status: z.enum(["ENABLED", "DISABLED"]),
  AdditionalConfiguration: z.array(CFNFeatureAdditionalConfigurationSchema)
    .optional(),
});

export const TagItemSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FindingPublishingFrequency: z.string().optional(),
  Enable: z.boolean(),
  DataSources: z.object({
    S3Logs: CFNS3LogsConfigurationSchema.optional(),
    Kubernetes: CFNKubernetesConfigurationSchema.optional(),
    MalwareProtection: CFNMalwareProtectionConfigurationSchema.optional(),
  }).optional(),
  Features: z.array(CFNFeatureConfigurationSchema).optional(),
  Tags: z.array(TagItemSchema).optional(),
});

const StateSchema = z.object({
  FindingPublishingFrequency: z.string().optional(),
  Enable: z.boolean().optional(),
  DataSources: z.object({
    S3Logs: CFNS3LogsConfigurationSchema,
    Kubernetes: CFNKubernetesConfigurationSchema,
    MalwareProtection: CFNMalwareProtectionConfigurationSchema,
  }).optional(),
  Features: z.array(CFNFeatureConfigurationSchema).optional(),
  Id: z.string(),
  Tags: z.array(TagItemSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FindingPublishingFrequency: z.string().optional(),
  Enable: z.boolean().optional(),
  DataSources: z.object({
    S3Logs: CFNS3LogsConfigurationSchema.optional(),
    Kubernetes: CFNKubernetesConfigurationSchema.optional(),
    MalwareProtection: CFNMalwareProtectionConfigurationSchema.optional(),
  }).optional(),
  Features: z.array(CFNFeatureConfigurationSchema).optional(),
  Tags: z.array(TagItemSchema).optional(),
});

export const model = {
  type: "@swamp/aws/guardduty/detector",
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
      description: "GuardDuty Detector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GuardDuty Detector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GuardDuty::Detector",
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
      description: "Get a GuardDuty Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GuardDuty Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GuardDuty::Detector",
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
      description: "Update a GuardDuty Detector",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GuardDuty::Detector",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GuardDuty::Detector",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a GuardDuty Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GuardDuty Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GuardDuty::Detector",
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
      description: "Sync GuardDuty Detector state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GuardDuty::Detector",
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
