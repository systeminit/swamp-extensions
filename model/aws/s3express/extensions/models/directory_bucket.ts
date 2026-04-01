// Auto-generated extension model for @swamp/aws/s3express/directory-bucket
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

export const ServerSideEncryptionByDefaultSchema = z.object({
  SSEAlgorithm: z.enum(["aws:kms", "AES256"]),
  KMSMasterKeyID: z.string().describe(
    "AWS Key Management Service (KMS) customer managed key ID to use for the default encryption. This parameter is allowed only if SSEAlgorithm is set to aws:kms. You can specify this parameter with the key ID or the Amazon Resource Name (ARN) of the KMS key",
  ).optional(),
});

export const ServerSideEncryptionRuleSchema = z.object({
  BucketKeyEnabled: z.boolean().describe(
    "Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Amazon S3 Express One Zone uses an S3 Bucket Key with SSE-KMS and S3 Bucket Key cannot be disabled. It's only allowed to set the BucketKeyEnabled element to true.",
  ).optional(),
  ServerSideEncryptionByDefault: ServerSideEncryptionByDefaultSchema.describe(
    "Specifies the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied.",
  ).optional(),
});

export const AbortIncompleteMultipartUploadSchema = z.object({
  DaysAfterInitiation: z.number().int().min(0).describe(
    "Specifies the number of days after which Amazon S3 aborts an incomplete multipart upload.",
  ),
});

export const RuleSchema = z.object({
  Status: z.enum(["Enabled", "Disabled"]),
  ExpirationInDays: z.number().int().optional(),
  ObjectSizeGreaterThan: z.string().max(20).regex(new RegExp("[0-9]+"))
    .optional(),
  Id: z.string().max(255).optional(),
  Prefix: z.string().optional(),
  AbortIncompleteMultipartUpload: AbortIncompleteMultipartUploadSchema.describe(
    "Specifies the days since the initiation of an incomplete multipart upload that Amazon S3 will wait before permanently removing all parts of the upload.",
  ).optional(),
  ObjectSizeLessThan: z.string().max(20).regex(new RegExp("[0-9]+")).optional(),
});

export const TagSchema = z.object({
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:.*)([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
});

const GlobalArgsSchema = z.object({
  BucketName: z.string().max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9//.//-]*[a-z0-9]$"),
  ).describe(
    "Specifies a name for the bucket. The bucket name must contain only lowercase letters, numbers, and hyphens (-). A directory bucket name must be unique in the chosen Availability Zone or Local Zone. The bucket name must also follow the format 'bucket_base_name--zone_id--x-s3'. The zone_id can be the ID of an Availability Zone or a Local Zone. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the bucket name.",
  ).optional(),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema)
      .describe("Specifies the default server-side-encryption configuration."),
  }).describe(
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3 managed keys (SSE-S3) or AWS KMS keys (SSE-KMS).",
  ).optional(),
  DataRedundancy: z.enum(["SingleAvailabilityZone", "SingleLocalZone"])
    .describe(
      "Specifies the number of Availability Zone or Local Zone that's used for redundancy for the bucket.",
    ),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A lifecycle rule for individual objects in an Amazon S3 Express bucket.",
    ),
  }).describe(
    "Lifecycle rules that define how Amazon S3 Express manages objects during their lifetime.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  LocationName: z.string().describe(
    "Specifies the Zone ID of the Availability Zone or Local Zone where the directory bucket will be created. An example Availability Zone ID value is 'use1-az5'.",
  ),
});

const StateSchema = z.object({
  BucketName: z.string(),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema),
  }).optional(),
  AvailabilityZoneName: z.string().optional(),
  DataRedundancy: z.string().optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema),
  }).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LocationName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  BucketName: z.string().max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9//.//-]*[a-z0-9]$"),
  ).describe(
    "Specifies a name for the bucket. The bucket name must contain only lowercase letters, numbers, and hyphens (-). A directory bucket name must be unique in the chosen Availability Zone or Local Zone. The bucket name must also follow the format 'bucket_base_name--zone_id--x-s3'. The zone_id can be the ID of an Availability Zone or a Local Zone. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the bucket name.",
  ).optional(),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema)
      .describe("Specifies the default server-side-encryption configuration.")
      .optional(),
  }).describe(
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3 managed keys (SSE-S3) or AWS KMS keys (SSE-KMS).",
  ).optional(),
  DataRedundancy: z.enum(["SingleAvailabilityZone", "SingleLocalZone"])
    .describe(
      "Specifies the number of Availability Zone or Local Zone that's used for redundancy for the bucket.",
    ).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A lifecycle rule for individual objects in an Amazon S3 Express bucket.",
    ).optional(),
  }).describe(
    "Lifecycle rules that define how Amazon S3 Express manages objects during their lifetime.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  LocationName: z.string().describe(
    "Specifies the Zone ID of the Availability Zone or Local Zone where the directory bucket will be created. An example Availability Zone ID value is 'use1-az5'.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/s3express/directory-bucket",
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
      description: "S3Express DirectoryBucket resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Express DirectoryBucket",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::S3Express::DirectoryBucket",
          desiredState,
        ) as StateData;
        const instanceName = (result.BucketName ?? g.BucketName)?.toString() ??
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
      description: "Get a S3Express DirectoryBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express DirectoryBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::S3Express::DirectoryBucket",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.BucketName ?? context.globalArgs.BucketName)?.toString() ??
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
      description: "Update a S3Express DirectoryBucket",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.BucketName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.BucketName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Express::DirectoryBucket",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3Express::DirectoryBucket",
          identifier,
          currentState,
          desiredState,
          ["BucketName", "LocationName", "DataRedundancy"],
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
      description: "Delete a S3Express DirectoryBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express DirectoryBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::S3Express::DirectoryBucket",
          args.identifier,
        );
        const instanceName = context.globalArgs.BucketName?.toString() ??
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
      description: "Sync S3Express DirectoryBucket state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.BucketName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.BucketName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Express::DirectoryBucket",
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
