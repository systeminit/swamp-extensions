// Auto-generated extension model for @swamp/aws/cassandra/table
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

export const ColumnSchema = z.object({
  ColumnName: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_]{1,47}$")),
  ColumnType: z.string(),
});

export const ClusteringKeyColumnSchema = z.object({
  Column: ColumnSchema,
  OrderBy: z.enum(["ASC", "DESC"]).optional(),
});

export const ProvisionedThroughputSchema = z.object({
  ReadCapacityUnits: z.number().int().min(1),
  WriteCapacityUnits: z.number().int().min(1),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

export const TargetTrackingScalingPolicyConfigurationSchema = z.object({
  DisableScaleIn: z.boolean().optional(),
  ScaleInCooldown: z.number().int().optional(),
  ScaleOutCooldown: z.number().int().optional(),
  TargetValue: z.number().int(),
});

export const ScalingPolicySchema = z.object({
  TargetTrackingScalingPolicyConfiguration:
    TargetTrackingScalingPolicyConfigurationSchema.describe(
      "Represents configuration for target tracking scaling policy.",
    ).optional(),
});

export const AutoScalingSettingSchema = z.object({
  AutoScalingDisabled: z.boolean().optional(),
  MinimumUnits: z.number().int().min(1).optional(),
  MaximumUnits: z.number().int().min(1).optional(),
  ScalingPolicy: ScalingPolicySchema.describe("Represents scaling policy.")
    .optional(),
});

export const ReplicaSpecificationSchema = z.object({
  Region: z.string().min(2).max(25),
  ReadCapacityUnits: z.number().int().optional(),
  ReadCapacityAutoScaling: AutoScalingSettingSchema.describe(
    "Represents configuration for auto scaling.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  KeyspaceName: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_]{1,47}$"))
    .describe("Name for Cassandra keyspace"),
  TableName: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_]{1,47}$"))
    .describe("Name for Cassandra table").optional(),
  RegularColumns: z.array(ColumnSchema).describe("Non-key columns of the table")
    .optional(),
  PartitionKeyColumns: z.array(ColumnSchema).describe(
    "Partition key columns of the table",
  ),
  ClusteringKeyColumns: z.array(ClusteringKeyColumnSchema).describe(
    "Clustering key columns of the table",
  ).optional(),
  BillingMode: z.object({
    Mode: z.enum(["PROVISIONED", "ON_DEMAND"]).describe(
      "Capacity mode for the specified table",
    ),
    ProvisionedThroughput: ProvisionedThroughputSchema.describe(
      "Throughput for the specified table, which consists of values for ReadCapacityUnits and WriteCapacityUnits",
    ).optional(),
  }).optional(),
  PointInTimeRecoveryEnabled: z.boolean().describe(
    "Indicates whether point in time recovery is enabled (true) or disabled (false) on the table",
  ).optional(),
  ClientSideTimestampsEnabled: z.boolean().describe(
    "Indicates whether client side timestamps are enabled (true) or disabled (false) on the table. False by default, once it is enabled it cannot be disabled again.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
  DefaultTimeToLive: z.number().int().min(0).describe(
    "Default TTL (Time To Live) in seconds, where zero is disabled. If the value is greater than zero, TTL is enabled for the entire table and an expiration timestamp is added to each column.",
  ).optional(),
  EncryptionSpecification: z.object({
    EncryptionType: z.enum(["AWS_OWNED_KMS_KEY", "CUSTOMER_MANAGED_KMS_KEY"])
      .describe("Server-side encryption type"),
    KmsKeyIdentifier: z.string().describe(
      "The AWS KMS customer master key (CMK) that should be used for the AWS KMS encryption. To specify a CMK, use its key ID, Amazon Resource Name (ARN), alias name, or alias ARN.",
    ).optional(),
  }).describe("Represents the settings used to enable server-side encryption")
    .optional(),
  AutoScalingSpecifications: z.object({
    WriteCapacityAutoScaling: AutoScalingSettingSchema.describe(
      "Represents configuration for auto scaling.",
    ).optional(),
    ReadCapacityAutoScaling: AutoScalingSettingSchema.describe(
      "Represents configuration for auto scaling.",
    ).optional(),
  }).describe("Represents the read and write settings used for AutoScaling.")
    .optional(),
  CdcSpecification: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether CDC is enabled or disabled for the table",
    ),
    ViewType: z.enum([
      "NEW_IMAGE",
      "OLD_IMAGE",
      "KEYS_ONLY",
      "NEW_AND_OLD_IMAGES",
    ]).describe(
      "Specifies what data should be captured in the change data stream",
    ).optional(),
    Tags: z.array(TagSchema).describe(
      "An array of key-value pairs to apply to the CDC stream resource",
    ).optional(),
  }).describe("Represents the CDC configuration for the table").optional(),
  ReplicaSpecifications: z.array(ReplicaSpecificationSchema).optional(),
  WarmThroughput: z.object({
    ReadUnitsPerSecond: z.number().int().min(1).optional(),
    WriteUnitsPerSecond: z.number().int().min(1).optional(),
  }).describe("Warm throughput configuration for the table").optional(),
});

const StateSchema = z.object({
  KeyspaceName: z.string(),
  TableName: z.string(),
  RegularColumns: z.array(ColumnSchema).optional(),
  PartitionKeyColumns: z.array(ColumnSchema).optional(),
  ClusteringKeyColumns: z.array(ClusteringKeyColumnSchema).optional(),
  BillingMode: z.object({
    Mode: z.string(),
    ProvisionedThroughput: ProvisionedThroughputSchema,
  }).optional(),
  PointInTimeRecoveryEnabled: z.boolean().optional(),
  ClientSideTimestampsEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  DefaultTimeToLive: z.number().optional(),
  EncryptionSpecification: z.object({
    EncryptionType: z.string(),
    KmsKeyIdentifier: z.string(),
  }).optional(),
  AutoScalingSpecifications: z.object({
    WriteCapacityAutoScaling: AutoScalingSettingSchema,
    ReadCapacityAutoScaling: AutoScalingSettingSchema,
  }).optional(),
  CdcSpecification: z.object({
    Status: z.string(),
    ViewType: z.string(),
    Tags: z.array(TagSchema),
  }).optional(),
  ReplicaSpecifications: z.array(ReplicaSpecificationSchema).optional(),
  WarmThroughput: z.object({
    ReadUnitsPerSecond: z.number(),
    WriteUnitsPerSecond: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  KeyspaceName: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_]{1,47}$"))
    .describe("Name for Cassandra keyspace").optional(),
  TableName: z.string().regex(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_]{1,47}$"))
    .describe("Name for Cassandra table").optional(),
  RegularColumns: z.array(ColumnSchema).describe("Non-key columns of the table")
    .optional(),
  PartitionKeyColumns: z.array(ColumnSchema).describe(
    "Partition key columns of the table",
  ).optional(),
  ClusteringKeyColumns: z.array(ClusteringKeyColumnSchema).describe(
    "Clustering key columns of the table",
  ).optional(),
  BillingMode: z.object({
    Mode: z.enum(["PROVISIONED", "ON_DEMAND"]).describe(
      "Capacity mode for the specified table",
    ).optional(),
    ProvisionedThroughput: ProvisionedThroughputSchema.describe(
      "Throughput for the specified table, which consists of values for ReadCapacityUnits and WriteCapacityUnits",
    ).optional(),
  }).optional(),
  PointInTimeRecoveryEnabled: z.boolean().describe(
    "Indicates whether point in time recovery is enabled (true) or disabled (false) on the table",
  ).optional(),
  ClientSideTimestampsEnabled: z.boolean().describe(
    "Indicates whether client side timestamps are enabled (true) or disabled (false) on the table. False by default, once it is enabled it cannot be disabled again.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
  DefaultTimeToLive: z.number().int().min(0).describe(
    "Default TTL (Time To Live) in seconds, where zero is disabled. If the value is greater than zero, TTL is enabled for the entire table and an expiration timestamp is added to each column.",
  ).optional(),
  EncryptionSpecification: z.object({
    EncryptionType: z.enum(["AWS_OWNED_KMS_KEY", "CUSTOMER_MANAGED_KMS_KEY"])
      .describe("Server-side encryption type").optional(),
    KmsKeyIdentifier: z.string().describe(
      "The AWS KMS customer master key (CMK) that should be used for the AWS KMS encryption. To specify a CMK, use its key ID, Amazon Resource Name (ARN), alias name, or alias ARN.",
    ).optional(),
  }).describe("Represents the settings used to enable server-side encryption")
    .optional(),
  AutoScalingSpecifications: z.object({
    WriteCapacityAutoScaling: AutoScalingSettingSchema.describe(
      "Represents configuration for auto scaling.",
    ).optional(),
    ReadCapacityAutoScaling: AutoScalingSettingSchema.describe(
      "Represents configuration for auto scaling.",
    ).optional(),
  }).describe("Represents the read and write settings used for AutoScaling.")
    .optional(),
  CdcSpecification: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether CDC is enabled or disabled for the table",
    ).optional(),
    ViewType: z.enum([
      "NEW_IMAGE",
      "OLD_IMAGE",
      "KEYS_ONLY",
      "NEW_AND_OLD_IMAGES",
    ]).describe(
      "Specifies what data should be captured in the change data stream",
    ).optional(),
    Tags: z.array(TagSchema).describe(
      "An array of key-value pairs to apply to the CDC stream resource",
    ).optional(),
  }).describe("Represents the CDC configuration for the table").optional(),
  ReplicaSpecifications: z.array(ReplicaSpecificationSchema).optional(),
  WarmThroughput: z.object({
    ReadUnitsPerSecond: z.number().int().min(1).optional(),
    WriteUnitsPerSecond: z.number().int().min(1).optional(),
  }).describe("Warm throughput configuration for the table").optional(),
});

export const model = {
  type: "@swamp/aws/cassandra/table",
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
      description: "Cassandra Table resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cassandra Table",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Cassandra::Table",
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
      description: "Get a Cassandra Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cassandra Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Cassandra::Table",
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
      description: "Update a Cassandra Table",
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
        const idParts = [
          existing.KeyspaceName?.toString(),
          existing.TableName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Cassandra::Table",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Cassandra::Table",
          identifier,
          currentState,
          desiredState,
          [
            "KeyspaceName",
            "TableName",
            "PartitionKeyColumns",
            "ClusteringKeyColumns",
            "ClientSideTimestampsEnabled",
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
      description: "Delete a Cassandra Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cassandra Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Cassandra::Table",
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
      description: "Sync Cassandra Table state from AWS",
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
        const idParts = [
          existing.KeyspaceName?.toString(),
          existing.TableName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Cassandra::Table",
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
