// Auto-generated extension model for @swamp/aws/s3outposts/bucket
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
  Key: z.string().min(1).max(1024).regex(
    new RegExp("^(?!aws:.*)([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
  Value: z.string().min(1).max(1024).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
});

export const AbortIncompleteMultipartUploadSchema = z.object({
  DaysAfterInitiation: z.number().int().min(0).describe(
    "Specifies the number of days after which Amazon S3Outposts aborts an incomplete multipart upload.",
  ),
});

export const FilterTagSchema = z.object({
  Key: z.string().min(1).max(1024).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
  Value: z.string().min(1).max(1024).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
});

export const RuleSchema = z.object({
  Status: z.enum(["Enabled", "Disabled"]).optional(),
  Id: z.string().max(255).describe(
    "Unique identifier for the lifecycle rule. The value can't be longer than 255 characters.",
  ).optional(),
  AbortIncompleteMultipartUpload: AbortIncompleteMultipartUploadSchema.describe(
    "Specifies a lifecycle rule that stops incomplete multipart uploads to an Amazon S3Outposts bucket.",
  ).optional(),
  ExpirationDate: z.string().regex(
    new RegExp(
      "^([0-2]\\d{3})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    ),
  ).describe(
    "Indicates when objects are deleted from Amazon S3Outposts. The date value must be in ISO 8601 format. The time is always midnight UTC.",
  ).optional(),
  ExpirationInDays: z.number().int().min(1).describe(
    "Indicates the number of days after creation when objects are deleted from Amazon S3Outposts.",
  ).optional(),
  Filter: z.object({
    Prefix: z.string().describe(
      "Object key prefix that identifies one or more objects to which this rule applies.",
    ).optional(),
    Tag: FilterTagSchema.describe(
      "Specifies a tag used to identify a subset of objects for an Amazon S3Outposts bucket.",
    ).optional(),
    AndOperator: z.object({
      Prefix: z.string().describe(
        "Prefix identifies one or more objects to which the rule applies.",
      ).optional(),
      Tags: z.array(FilterTagSchema).describe(
        "All of these tags must exist in the object's tag set in order for the rule to apply.",
      ).optional(),
    }).describe(
      "The container for the AND condition for the lifecycle rule. A combination of Prefix and 1 or more Tags OR a minimum of 2 or more tags.",
    ).optional(),
  }).describe("The container for the filter of the lifecycle rule.").optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BucketName: z.string().min(3).max(63).regex(
    new RegExp(
      "(?=^.{3,63}$)(?!^(\\d+\\.)+\\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])$)",
    ),
  ).describe("A name for the bucket."),
  OutpostId: z.string().regex(new RegExp("^(op-[a-f0-9]{17}|\\d{12}|ec2)$"))
    .describe("The id of the customer outpost on which the bucket resides."),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this S3Outposts bucket.",
  ).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A list of lifecycle rules for individual objects in an Amazon S3Outposts bucket.",
    ),
  }).describe(
    "Rules that define how Amazon S3Outposts manages objects during their lifetime.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  BucketName: z.string().optional(),
  OutpostId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BucketName: z.string().min(3).max(63).regex(
    new RegExp(
      "(?=^.{3,63}$)(?!^(\\d+\\.)+\\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])$)",
    ),
  ).describe("A name for the bucket.").optional(),
  OutpostId: z.string().regex(new RegExp("^(op-[a-f0-9]{17}|\\d{12}|ec2)$"))
    .describe("The id of the customer outpost on which the bucket resides.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this S3Outposts bucket.",
  ).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A list of lifecycle rules for individual objects in an Amazon S3Outposts bucket.",
    ).optional(),
  }).describe(
    "Rules that define how Amazon S3Outposts manages objects during their lifetime.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/s3outposts/bucket",
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
      description: "S3Outposts Bucket resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Outposts Bucket",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::S3Outposts::Bucket",
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
      description: "Get a S3Outposts Bucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Outposts Bucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::S3Outposts::Bucket",
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
      description: "Update a S3Outposts Bucket",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Outposts::Bucket",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3Outposts::Bucket",
          identifier,
          currentState,
          desiredState,
          ["BucketName", "OutpostId"],
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
      description: "Delete a S3Outposts Bucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Outposts Bucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::S3Outposts::Bucket",
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
      description: "Sync S3Outposts Bucket state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Outposts::Bucket",
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
