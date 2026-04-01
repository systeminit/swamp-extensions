// Auto-generated extension model for @swamp/aws/aiops/investigation-group
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

export const ChatbotNotificationChannelSchema = z.object({
  SNSTopicArn: z.string().min(20).max(2048).optional(),
  ChatConfigurationArns: z.array(z.string()).optional(),
});

export const CrossAccountConfigurationSchema = z.object({
  SourceRoleArn: z.string().min(20).max(2048).describe(
    "The Investigation Role's ARN.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  RoleArn: z.string().min(20).max(2048).describe(
    "The Investigation Role's ARN.",
  ).optional(),
  Name: z.string().min(1).max(512).describe(
    "User friendly name for resources.",
  ),
  RetentionInDays: z.number().int().describe(
    "The number of days to retain the investigation group",
  ).optional(),
  EncryptionConfig: z.object({
    EncryptionConfigurationType: z.string().min(1).max(128).optional(),
    KmsKeyId: z.string().min(1).max(256).optional(),
  }).optional(),
  InvestigationGroupPolicy: z.string().describe("Investigation Group policy")
    .optional(),
  IsCloudTrailEventHistoryEnabled: z.boolean().describe(
    "Flag to enable cloud trail history",
  ).optional(),
  TagKeyBoundaries: z.array(z.string().min(1).max(200)).optional(),
  ChatbotNotificationChannels: z.array(ChatbotNotificationChannelSchema)
    .describe(
      "An array of key-value pairs of notification channels to apply to this resource.",
    ).optional(),
  CrossAccountConfigurations: z.array(CrossAccountConfigurationSchema).describe(
    "An array of cross account configurations.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  RoleArn: z.string().optional(),
  Name: z.string().optional(),
  CreatedBy: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastModifiedBy: z.string().optional(),
  LastModifiedAt: z.string().optional(),
  Arn: z.string(),
  RetentionInDays: z.number().optional(),
  EncryptionConfig: z.object({
    EncryptionConfigurationType: z.string(),
    KmsKeyId: z.string(),
  }).optional(),
  InvestigationGroupPolicy: z.string().optional(),
  IsCloudTrailEventHistoryEnabled: z.boolean().optional(),
  TagKeyBoundaries: z.array(z.string()).optional(),
  ChatbotNotificationChannels: z.array(ChatbotNotificationChannelSchema)
    .optional(),
  CrossAccountConfigurations: z.array(CrossAccountConfigurationSchema)
    .optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The Investigation Role's ARN.",
  ).optional(),
  Name: z.string().min(1).max(512).describe("User friendly name for resources.")
    .optional(),
  RetentionInDays: z.number().int().describe(
    "The number of days to retain the investigation group",
  ).optional(),
  EncryptionConfig: z.object({
    EncryptionConfigurationType: z.string().min(1).max(128).optional(),
    KmsKeyId: z.string().min(1).max(256).optional(),
  }).optional(),
  InvestigationGroupPolicy: z.string().describe("Investigation Group policy")
    .optional(),
  IsCloudTrailEventHistoryEnabled: z.boolean().describe(
    "Flag to enable cloud trail history",
  ).optional(),
  TagKeyBoundaries: z.array(z.string().min(1).max(200)).optional(),
  ChatbotNotificationChannels: z.array(ChatbotNotificationChannelSchema)
    .describe(
      "An array of key-value pairs of notification channels to apply to this resource.",
    ).optional(),
  CrossAccountConfigurations: z.array(CrossAccountConfigurationSchema).describe(
    "An array of cross account configurations.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/aiops/investigation-group",
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
      description: "AIOps InvestigationGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AIOps InvestigationGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AIOps::InvestigationGroup",
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
      description: "Get a AIOps InvestigationGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AIOps InvestigationGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AIOps::InvestigationGroup",
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
      description: "Update a AIOps InvestigationGroup",
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
          "AWS::AIOps::InvestigationGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AIOps::InvestigationGroup",
          identifier,
          currentState,
          desiredState,
          ["Name", "RetentionInDays"],
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
      description: "Delete a AIOps InvestigationGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AIOps InvestigationGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AIOps::InvestigationGroup",
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
      description: "Sync AIOps InvestigationGroup state from AWS",
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
            "AWS::AIOps::InvestigationGroup",
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
