// Auto-generated extension model for @swamp/aws/dynamodb/global-table
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

export const ReplicaSSESpecificationSchema = z.object({
  KMSMasterKeyId: z.string(),
});

export const KinesisStreamSpecificationSchema = z.object({
  ApproximateCreationDateTimePrecision: z.enum(["MICROSECOND", "MILLISECOND"])
    .optional(),
  StreamArn: z.string(),
});

export const ContributorInsightsSpecificationSchema = z.object({
  Mode: z.enum(["ACCESSED_AND_THROTTLED_KEYS", "THROTTLED_KEYS"]).optional(),
  Enabled: z.boolean(),
});

export const PointInTimeRecoverySpecificationSchema = z.object({
  PointInTimeRecoveryEnabled: z.boolean().optional(),
  RecoveryPeriodInDays: z.number().int().min(1).max(35).optional(),
});

export const ResourcePolicySchema = z.object({
  PolicyDocument: z.string(),
});

export const ReplicaStreamSpecificationSchema = z.object({
  ResourcePolicy: ResourcePolicySchema,
});

export const TargetTrackingScalingPolicyConfigurationSchema = z.object({
  ScaleOutCooldown: z.number().int().min(0).optional(),
  TargetValue: z.number(),
  DisableScaleIn: z.boolean().optional(),
  ScaleInCooldown: z.number().int().min(0).optional(),
});

export const CapacityAutoScalingSettingsSchema = z.object({
  MinCapacity: z.number().int().min(1),
  SeedCapacity: z.number().int().min(1).optional(),
  TargetTrackingScalingPolicyConfiguration:
    TargetTrackingScalingPolicyConfigurationSchema,
  MaxCapacity: z.number().int().min(1),
});

export const ReadProvisionedThroughputSettingsSchema = z.object({
  ReadCapacityUnits: z.number().int().min(1).optional(),
  ReadCapacityAutoScalingSettings: CapacityAutoScalingSettingsSchema.optional(),
});

export const ReadOnDemandThroughputSettingsSchema = z.object({
  MaxReadRequestUnits: z.number().int().min(1).optional(),
});

export const ReplicaGlobalSecondaryIndexSpecificationSchema = z.object({
  IndexName: z.string().min(3).max(255),
  ContributorInsightsSpecification: ContributorInsightsSpecificationSchema
    .optional(),
  ReadProvisionedThroughputSettings: ReadProvisionedThroughputSettingsSchema
    .optional(),
  ReadOnDemandThroughputSettings: ReadOnDemandThroughputSettingsSchema
    .optional(),
});

export const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

export const ReplicaSpecificationSchema = z.object({
  SSESpecification: ReplicaSSESpecificationSchema.optional(),
  KinesisStreamSpecification: KinesisStreamSpecificationSchema.optional(),
  ContributorInsightsSpecification: ContributorInsightsSpecificationSchema
    .optional(),
  GlobalTableSettingsReplicationMode: z.enum(["ENABLED", "DISABLED"])
    .optional(),
  PointInTimeRecoverySpecification: PointInTimeRecoverySpecificationSchema
    .optional(),
  ReplicaStreamSpecification: ReplicaStreamSpecificationSchema.optional(),
  GlobalSecondaryIndexes: z.array(
    ReplicaGlobalSecondaryIndexSpecificationSchema,
  ).optional(),
  Region: z.string(),
  ResourcePolicy: ResourcePolicySchema.optional(),
  ReadProvisionedThroughputSettings: ReadProvisionedThroughputSettingsSchema
    .optional(),
  TableClass: z.string().optional(),
  DeletionProtectionEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  ReadOnDemandThroughputSettings: ReadOnDemandThroughputSettingsSchema
    .optional(),
});

export const GlobalTableWitnessSchema = z.object({
  Region: z.string().optional(),
});

export const AttributeDefinitionSchema = z.object({
  AttributeType: z.string(),
  AttributeName: z.string().min(1).max(255),
});

export const ProjectionSchema = z.object({
  NonKeyAttributes: z.array(z.string()).optional(),
  ProjectionType: z.string().optional(),
});

export const KeySchemaSchema = z.object({
  KeyType: z.string(),
  AttributeName: z.string().min(1).max(255),
});

export const WarmThroughputSchema = z.object({
  ReadUnitsPerSecond: z.number().int().min(1).optional(),
  WriteUnitsPerSecond: z.number().int().min(1).optional(),
});

export const GlobalReadProvisionedThroughputSettingsSchema = z.object({
  ReadCapacityUnits: z.number().int().min(1).optional(),
});

export const WriteProvisionedThroughputSettingsSchema = z.object({
  WriteCapacityAutoScalingSettings: CapacityAutoScalingSettingsSchema
    .optional(),
});

export const WriteOnDemandThroughputSettingsSchema = z.object({
  MaxWriteRequestUnits: z.number().int().min(1).optional(),
});

export const GlobalSecondaryIndexSchema = z.object({
  IndexName: z.string().min(3).max(255),
  Projection: ProjectionSchema,
  KeySchema: z.array(KeySchemaSchema),
  WarmThroughput: WarmThroughputSchema.optional(),
  ReadProvisionedThroughputSettings:
    GlobalReadProvisionedThroughputSettingsSchema.optional(),
  WriteProvisionedThroughputSettings: WriteProvisionedThroughputSettingsSchema
    .optional(),
  ReadOnDemandThroughputSettings: ReadOnDemandThroughputSettingsSchema
    .optional(),
  WriteOnDemandThroughputSettings: WriteOnDemandThroughputSettingsSchema
    .optional(),
});

export const LocalSecondaryIndexSchema = z.object({
  IndexName: z.string().min(3).max(255),
  Projection: ProjectionSchema,
  KeySchema: z.array(KeySchemaSchema),
});

const GlobalArgsSchema = z.object({
  MultiRegionConsistency: z.enum(["EVENTUAL", "STRONG"]).optional(),
  SSESpecification: z.object({
    SSEEnabled: z.boolean(),
    SSEType: z.string().optional(),
  }).optional(),
  StreamSpecification: z.object({
    StreamViewType: z.string(),
  }).optional(),
  WarmThroughput: z.object({
    ReadUnitsPerSecond: z.number().int().min(1).optional(),
    WriteUnitsPerSecond: z.number().int().min(1).optional(),
  }).optional(),
  Replicas: z.array(ReplicaSpecificationSchema),
  WriteProvisionedThroughputSettings: z.object({
    WriteCapacityAutoScalingSettings: CapacityAutoScalingSettingsSchema
      .optional(),
  }).optional(),
  GlobalTableSourceArn: z.string().optional(),
  WriteOnDemandThroughputSettings: z.object({
    MaxWriteRequestUnits: z.number().int().min(1).optional(),
  }).optional(),
  GlobalTableWitnesses: z.array(GlobalTableWitnessSchema).optional(),
  TableName: z.string().optional(),
  AttributeDefinitions: z.array(AttributeDefinitionSchema).optional(),
  BillingMode: z.string().optional(),
  GlobalSecondaryIndexes: z.array(GlobalSecondaryIndexSchema).optional(),
  KeySchema: z.array(KeySchemaSchema).optional(),
  LocalSecondaryIndexes: z.array(LocalSecondaryIndexSchema).optional(),
  ReadProvisionedThroughputSettings: z.object({
    ReadCapacityUnits: z.number().int().min(1).optional(),
  }).optional(),
  ReadOnDemandThroughputSettings: z.object({
    MaxReadRequestUnits: z.number().int().min(1).optional(),
  }).optional(),
  TimeToLiveSpecification: z.object({
    Enabled: z.boolean(),
    AttributeName: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  MultiRegionConsistency: z.string().optional(),
  TableId: z.string().optional(),
  SSESpecification: z.object({
    SSEEnabled: z.boolean(),
    SSEType: z.string(),
  }).optional(),
  StreamSpecification: z.object({
    StreamViewType: z.string(),
  }).optional(),
  WarmThroughput: WarmThroughputSchema.optional(),
  Replicas: z.array(ReplicaSpecificationSchema).optional(),
  WriteProvisionedThroughputSettings: WriteProvisionedThroughputSettingsSchema
    .optional(),
  GlobalTableSourceArn: z.string().optional(),
  WriteOnDemandThroughputSettings: WriteOnDemandThroughputSettingsSchema
    .optional(),
  GlobalTableWitnesses: z.array(GlobalTableWitnessSchema).optional(),
  TableName: z.string(),
  AttributeDefinitions: z.array(AttributeDefinitionSchema).optional(),
  BillingMode: z.string().optional(),
  GlobalSecondaryIndexes: z.array(GlobalSecondaryIndexSchema).optional(),
  KeySchema: z.array(KeySchemaSchema).optional(),
  LocalSecondaryIndexes: z.array(LocalSecondaryIndexSchema).optional(),
  Arn: z.string().optional(),
  StreamArn: z.string().optional(),
  ReadProvisionedThroughputSettings:
    GlobalReadProvisionedThroughputSettingsSchema.optional(),
  ReadOnDemandThroughputSettings: ReadOnDemandThroughputSettingsSchema
    .optional(),
  TimeToLiveSpecification: z.object({
    Enabled: z.boolean(),
    AttributeName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  MultiRegionConsistency: z.enum(["EVENTUAL", "STRONG"]).optional(),
  SSESpecification: z.object({
    SSEEnabled: z.boolean().optional(),
    SSEType: z.string().optional(),
  }).optional(),
  StreamSpecification: z.object({
    StreamViewType: z.string().optional(),
  }).optional(),
  WarmThroughput: z.object({
    ReadUnitsPerSecond: z.number().int().min(1).optional(),
    WriteUnitsPerSecond: z.number().int().min(1).optional(),
  }).optional(),
  Replicas: z.array(ReplicaSpecificationSchema).optional(),
  WriteProvisionedThroughputSettings: z.object({
    WriteCapacityAutoScalingSettings: CapacityAutoScalingSettingsSchema
      .optional(),
  }).optional(),
  GlobalTableSourceArn: z.string().optional(),
  WriteOnDemandThroughputSettings: z.object({
    MaxWriteRequestUnits: z.number().int().min(1).optional(),
  }).optional(),
  GlobalTableWitnesses: z.array(GlobalTableWitnessSchema).optional(),
  TableName: z.string().optional(),
  AttributeDefinitions: z.array(AttributeDefinitionSchema).optional(),
  BillingMode: z.string().optional(),
  GlobalSecondaryIndexes: z.array(GlobalSecondaryIndexSchema).optional(),
  KeySchema: z.array(KeySchemaSchema).optional(),
  LocalSecondaryIndexes: z.array(LocalSecondaryIndexSchema).optional(),
  ReadProvisionedThroughputSettings: z.object({
    ReadCapacityUnits: z.number().int().min(1).optional(),
  }).optional(),
  ReadOnDemandThroughputSettings: z.object({
    MaxReadRequestUnits: z.number().int().min(1).optional(),
  }).optional(),
  TimeToLiveSpecification: z.object({
    Enabled: z.boolean().optional(),
    AttributeName: z.string().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/dynamodb/global-table",
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
      description: "DynamoDB GlobalTable resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DynamoDB GlobalTable",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DynamoDB::GlobalTable",
          desiredState,
        ) as StateData;
        const instanceName = (result.TableName ?? g.TableName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a DynamoDB GlobalTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DynamoDB GlobalTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DynamoDB::GlobalTable",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.TableName ?? context.globalArgs.TableName)?.toString() ??
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
      description: "Update a DynamoDB GlobalTable",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TableName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TableName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DynamoDB::GlobalTable",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DynamoDB::GlobalTable",
          identifier,
          currentState,
          desiredState,
          ["TableName"],
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
      description: "Delete a DynamoDB GlobalTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DynamoDB GlobalTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DynamoDB::GlobalTable",
          args.identifier,
        );
        const instanceName = context.globalArgs.TableName?.toString() ??
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
      description: "Sync DynamoDB GlobalTable state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TableName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TableName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DynamoDB::GlobalTable",
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
