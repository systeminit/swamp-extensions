// Auto-generated extension model for @swamp/aws/s3tables/table-bucket
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
  Key: z.string().min(1).max(128).describe(
    "Tag key must be between 1 to 128 characters in length. Tag key cannot start with 'aws:' and can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
  Value: z.string().max(256).describe(
    "Tag value must be between 0 to 256 characters in length. Tag value can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TableBucketName: z.string().min(3).max(63).describe(
    "A name for the table bucket.",
  ),
  UnreferencedFileRemoval: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether the Unreferenced File Removal maintenance action is enabled.",
    ).optional(),
    UnreferencedDays: z.number().int().min(1).describe(
      "For any object not referenced by your table and older than the UnreferencedDays property, S3 creates a delete marker and marks the object version as noncurrent.",
    ).optional(),
    NoncurrentDays: z.number().int().min(1).describe(
      "S3 permanently deletes noncurrent objects after the number of days specified by the NoncurrentDays property.",
    ).optional(),
  }).describe(
    "Settings governing the Unreferenced File Removal maintenance action. Unreferenced file removal identifies and deletes all objects that are not referenced by any table snapshots.",
  ).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.enum(["AES256", "aws:kms"]).describe(
      "Server-side encryption algorithm",
    ).optional(),
    KMSKeyArn: z.string().describe("ARN of the KMS key to use for encryption")
      .optional(),
  }).describe("Specifies encryption settings for the table bucket").optional(),
  MetricsConfiguration: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether Metrics are enabled.",
    ).optional(),
  }).describe(
    "Settings governing the Metric configuration for the table bucket.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table bucket",
    ).optional(),
  }).describe("Specifies storage class settings for the table bucket")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table bucket.",
  ).optional(),
});

const StateSchema = z.object({
  TableBucketARN: z.string(),
  TableBucketName: z.string().optional(),
  UnreferencedFileRemoval: z.object({
    Status: z.string(),
    UnreferencedDays: z.number(),
    NoncurrentDays: z.number(),
  }).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.string(),
    KMSKeyArn: z.string(),
  }).optional(),
  MetricsConfiguration: z.object({
    Status: z.string(),
  }).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TableBucketName: z.string().min(3).max(63).describe(
    "A name for the table bucket.",
  ).optional(),
  UnreferencedFileRemoval: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether the Unreferenced File Removal maintenance action is enabled.",
    ).optional(),
    UnreferencedDays: z.number().int().min(1).describe(
      "For any object not referenced by your table and older than the UnreferencedDays property, S3 creates a delete marker and marks the object version as noncurrent.",
    ).optional(),
    NoncurrentDays: z.number().int().min(1).describe(
      "S3 permanently deletes noncurrent objects after the number of days specified by the NoncurrentDays property.",
    ).optional(),
  }).describe(
    "Settings governing the Unreferenced File Removal maintenance action. Unreferenced file removal identifies and deletes all objects that are not referenced by any table snapshots.",
  ).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.enum(["AES256", "aws:kms"]).describe(
      "Server-side encryption algorithm",
    ).optional(),
    KMSKeyArn: z.string().describe("ARN of the KMS key to use for encryption")
      .optional(),
  }).describe("Specifies encryption settings for the table bucket").optional(),
  MetricsConfiguration: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether Metrics are enabled.",
    ).optional(),
  }).describe(
    "Settings governing the Metric configuration for the table bucket.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table bucket",
    ).optional(),
  }).describe("Specifies storage class settings for the table bucket")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table bucket.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/s3tables/table-bucket",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "S3Tables TableBucket resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Tables TableBucket",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::S3Tables::TableBucket",
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
      description: "Get a S3Tables TableBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables TableBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::S3Tables::TableBucket",
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
      description: "Update a S3Tables TableBucket",
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
        const identifier = existing.TableBucketARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Tables::TableBucket",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3Tables::TableBucket",
          identifier,
          currentState,
          desiredState,
          ["TableBucketName"],
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
      description: "Delete a S3Tables TableBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables TableBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::S3Tables::TableBucket",
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
      description: "Sync S3Tables TableBucket state from AWS",
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
        const identifier = existing.TableBucketARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Tables::TableBucket",
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
