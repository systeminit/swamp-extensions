// Auto-generated extension model for @swamp/aws/cleanrooms/membership
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

export const ProtectedQueryS3OutputConfigurationSchema = z.object({
  ResultFormat: z.enum(["CSV", "PARQUET"]),
  Bucket: z.string().min(3).max(63),
  KeyPrefix: z.string().optional(),
  SingleFileOutput: z.boolean().optional(),
});

export const MembershipProtectedQueryOutputConfigurationSchema = z.object({
  S3: ProtectedQueryS3OutputConfigurationSchema,
});

export const ProtectedJobS3OutputConfigurationInputSchema = z.object({
  Bucket: z.string().min(3).max(63),
  KeyPrefix: z.string().optional(),
});

export const MembershipProtectedJobOutputConfigurationSchema = z.object({
  S3: ProtectedJobS3OutputConfigurationInputSchema,
});

export const MembershipQueryComputePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

export const MembershipModelTrainingPaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

export const MembershipModelInferencePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

export const MembershipSyntheticDataGenerationPaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

export const MembershipMLPaymentConfigSchema = z.object({
  ModelTraining: MembershipModelTrainingPaymentConfigSchema.optional(),
  ModelInference: MembershipModelInferencePaymentConfigSchema.optional(),
  SyntheticDataGeneration: MembershipSyntheticDataGenerationPaymentConfigSchema
    .optional(),
});

export const MembershipJobComputePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms membership.",
  ).optional(),
  CollaborationIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ),
  QueryLogStatus: z.enum(["ENABLED", "DISABLED"]),
  JobLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema,
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema,
    RoleArn: z.string().min(32).max(512),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema,
    MachineLearning: MembershipMLPaymentConfigSchema.optional(),
    JobCompute: MembershipJobComputePaymentConfigSchema.optional(),
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CollaborationArn: z.string().optional(),
  CollaborationCreatorAccountId: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  MembershipIdentifier: z.string(),
  QueryLogStatus: z.string().optional(),
  JobLogStatus: z.string().optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema,
    RoleArn: z.string(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema,
    RoleArn: z.string(),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema,
    MachineLearning: MembershipMLPaymentConfigSchema,
    JobCompute: MembershipJobComputePaymentConfigSchema,
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms membership.",
  ).optional(),
  CollaborationIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
  QueryLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  JobLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema
      .optional(),
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema
      .optional(),
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema.optional(),
    MachineLearning: MembershipMLPaymentConfigSchema.optional(),
    JobCompute: MembershipJobComputePaymentConfigSchema.optional(),
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
});

export const model = {
  type: "@swamp/aws/cleanrooms/membership",
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
      description: "CleanRooms Membership resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms Membership",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CleanRooms::Membership",
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
      description: "Get a CleanRooms Membership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms Membership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CleanRooms::Membership",
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
      description: "Update a CleanRooms Membership",
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
        const identifier = existing.MembershipIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CleanRooms::Membership",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CleanRooms::Membership",
          identifier,
          currentState,
          desiredState,
          ["CollaborationIdentifier"],
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
      description: "Delete a CleanRooms Membership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms Membership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CleanRooms::Membership",
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
      description: "Sync CleanRooms Membership state from AWS",
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
        const identifier = existing.MembershipIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CleanRooms::Membership",
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
