// Auto-generated extension model for @swamp/aws/forecast/dataset
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DatasetName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*"),
  ).describe("A name for the dataset"),
  DatasetType: z.enum([
    "TARGET_TIME_SERIES",
    "RELATED_TIME_SERIES",
    "ITEM_METADATA",
  ]).describe("The dataset type"),
  DataFrequency: z.string().regex(
    new RegExp("^Y|M|W|D|H|30min|15min|10min|5min|1min$"),
  ).describe(
    "Frequency of data collection. This parameter is required for RELATED_TIME_SERIES",
  ).optional(),
  Domain: z.enum([
    "RETAIL",
    "CUSTOM",
    "INVENTORY_PLANNING",
    "EC2_CAPACITY",
    "WORK_FORCE",
    "WEB_TRAFFIC",
    "METRICS",
  ]).describe("The domain associated with the dataset"),
  EncryptionConfig: z.object({
    KmsKeyArn: z.string().max(256).regex(
      new RegExp("arn:aws[-a-z]*:kms:.*:key/.*"),
    ).describe("KMS key used to encrypt the Dataset data").optional(),
    RoleArn: z.string().max(256).regex(
      new RegExp("^[a-zA-Z0-9\\-\\_\\.\\/\\:]+$"),
    ).describe(
      "The ARN of the IAM role that Amazon Forecast can assume to access the AWS KMS key.",
    ).optional(),
  }).optional(),
  Schema: z.object({
    Attributes: z.array(z.object({
      AttributeName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]*"))
        .describe("Name of the dataset field").optional(),
      AttributeType: z.enum([
        "string",
        "integer",
        "float",
        "timestamp",
        "geolocation",
      ]).describe("Data type of the field").optional(),
    })).optional(),
  }),
  Tags: z.array(z.object({
    Key: z.string().min(1).max(128).describe(
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
    Value: z.string().min(0).max(256).describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
  })).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  DatasetName: z.string().optional(),
  DatasetType: z.string().optional(),
  DataFrequency: z.string().optional(),
  Domain: z.string().optional(),
  EncryptionConfig: z.object({
    KmsKeyArn: z.string(),
    RoleArn: z.string(),
  }).optional(),
  Schema: z.object({
    Attributes: z.array(z.object({
      AttributeName: z.string(),
      AttributeType: z.string(),
    })),
  }).optional(),
  Tags: z.array(z.object({
    Key: z.string(),
    Value: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DatasetName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*"),
  ).describe("A name for the dataset").optional(),
  DatasetType: z.enum([
    "TARGET_TIME_SERIES",
    "RELATED_TIME_SERIES",
    "ITEM_METADATA",
  ]).describe("The dataset type").optional(),
  DataFrequency: z.string().regex(
    new RegExp("^Y|M|W|D|H|30min|15min|10min|5min|1min$"),
  ).describe(
    "Frequency of data collection. This parameter is required for RELATED_TIME_SERIES",
  ).optional(),
  Domain: z.enum([
    "RETAIL",
    "CUSTOM",
    "INVENTORY_PLANNING",
    "EC2_CAPACITY",
    "WORK_FORCE",
    "WEB_TRAFFIC",
    "METRICS",
  ]).describe("The domain associated with the dataset").optional(),
  EncryptionConfig: z.object({
    KmsKeyArn: z.string().max(256).regex(
      new RegExp("arn:aws[-a-z]*:kms:.*:key/.*"),
    ).describe("KMS key used to encrypt the Dataset data").optional(),
    RoleArn: z.string().max(256).regex(
      new RegExp("^[a-zA-Z0-9\\-\\_\\.\\/\\:]+$"),
    ).describe(
      "The ARN of the IAM role that Amazon Forecast can assume to access the AWS KMS key.",
    ).optional(),
  }).optional(),
  Schema: z.object({
    Attributes: z.array(z.object({
      AttributeName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]*"))
        .describe("Name of the dataset field").optional(),
      AttributeType: z.enum([
        "string",
        "integer",
        "float",
        "timestamp",
        "geolocation",
      ]).describe("Data type of the field").optional(),
    })).optional(),
  }).optional(),
  Tags: z.array(z.object({
    Key: z.string().min(1).max(128).describe(
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ).optional(),
    Value: z.string().min(0).max(256).describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ).optional(),
  })).optional(),
});

export const model = {
  type: "@swamp/aws/forecast/dataset",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Forecast Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Forecast Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Forecast::Dataset",
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
      description: "Get a Forecast Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Forecast Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Forecast::Dataset",
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
    delete: {
      description: "Delete a Forecast Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Forecast Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Forecast::Dataset",
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
      description: "Sync Forecast Dataset state from AWS",
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
            "AWS::Forecast::Dataset",
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
