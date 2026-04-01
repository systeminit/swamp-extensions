// Auto-generated extension model for @swamp/aws/ivschat/logging-configuration
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

export const CloudWatchLogsDestinationConfigurationSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
  ).describe(
    "Name of the Amazon CloudWatch Logs log group where chat activity will be logged.",
  ),
});

export const FirehoseDestinationConfigurationSchema = z.object({
  DeliveryStreamName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_.-]+$"),
  ).describe(
    "Name of the Amazon Kinesis Firehose delivery stream where chat activity will be logged.",
  ),
});

export const S3DestinationConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(new RegExp("^[a-z0-9-.]+$"))
    .describe(
      "Name of the Amazon S3 bucket where chat activity will be logged.",
    ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DestinationConfiguration: z.object({
    CloudWatchLogs: CloudWatchLogsDestinationConfigurationSchema.describe(
      "CloudWatch destination configuration for IVS Chat logging.",
    ).optional(),
    Firehose: FirehoseDestinationConfigurationSchema.describe(
      "Kinesis Firehose destination configuration for IVS Chat logging.",
    ).optional(),
    S3: S3DestinationConfigurationSchema.describe(
      "S3 destination configuration for IVS Chat logging.",
    ).optional(),
  }).describe("Destination configuration for IVS Chat logging."),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe(
      "The name of the logging configuration. The value does not need to be unique.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  DestinationConfiguration: z.object({
    CloudWatchLogs: CloudWatchLogsDestinationConfigurationSchema,
    Firehose: FirehoseDestinationConfigurationSchema,
    S3: S3DestinationConfigurationSchema,
  }).optional(),
  Name: z.string().optional(),
  State: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DestinationConfiguration: z.object({
    CloudWatchLogs: CloudWatchLogsDestinationConfigurationSchema.describe(
      "CloudWatch destination configuration for IVS Chat logging.",
    ).optional(),
    Firehose: FirehoseDestinationConfigurationSchema.describe(
      "Kinesis Firehose destination configuration for IVS Chat logging.",
    ).optional(),
    S3: S3DestinationConfigurationSchema.describe(
      "S3 destination configuration for IVS Chat logging.",
    ).optional(),
  }).describe("Destination configuration for IVS Chat logging.").optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe(
      "The name of the logging configuration. The value does not need to be unique.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ivschat/logging-configuration",
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
      description: "IVSChat LoggingConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IVSChat LoggingConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IVSChat::LoggingConfiguration",
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
      description: "Get a IVSChat LoggingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVSChat LoggingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IVSChat::LoggingConfiguration",
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
      description: "Update a IVSChat LoggingConfiguration",
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
          "AWS::IVSChat::LoggingConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IVSChat::LoggingConfiguration",
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
      description: "Delete a IVSChat LoggingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVSChat LoggingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IVSChat::LoggingConfiguration",
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
      description: "Sync IVSChat LoggingConfiguration state from AWS",
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
            "AWS::IVSChat::LoggingConfiguration",
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
