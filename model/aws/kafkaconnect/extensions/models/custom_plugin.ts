// Auto-generated extension model for @swamp/aws/kafkaconnect/custom-plugin
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

export const S3LocationSchema = z.object({
  BucketArn: z.string().describe(
    "The Amazon Resource Name (ARN) of an S3 bucket.",
  ),
  FileKey: z.string().describe("The file key for an object in an S3 bucket."),
  ObjectVersion: z.string().describe(
    "The version of an object in an S3 bucket.",
  ).optional(),
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
  Name: z.string().min(1).max(128).describe("The name of the custom plugin."),
  Description: z.string().max(1024).describe(
    "A summary description of the custom plugin.",
  ).optional(),
  ContentType: z.enum(["JAR", "ZIP"]).describe("The type of the plugin file."),
  FileDescription: z.object({
    FileMd5: z.string().describe(
      "The hex-encoded MD5 checksum of the custom plugin file. You can use it to validate the file.",
    ).optional(),
    FileSize: z.number().int().describe(
      "The size in bytes of the custom plugin file. You can use it to validate the file.",
    ).optional(),
  }).describe("Details about the custom plugin file.").optional(),
  Location: z.object({
    S3Location: S3LocationSchema.describe(
      "The S3 bucket Amazon Resource Name (ARN), file key, and object version of the plugin file stored in Amazon S3.",
    ),
  }).describe("Information about the location of a custom plugin."),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  CustomPluginArn: z.string(),
  ContentType: z.string().optional(),
  FileDescription: z.object({
    FileMd5: z.string(),
    FileSize: z.number(),
  }).optional(),
  Location: z.object({
    S3Location: S3LocationSchema,
  }).optional(),
  Revision: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(128).describe("The name of the custom plugin.")
    .optional(),
  Description: z.string().max(1024).describe(
    "A summary description of the custom plugin.",
  ).optional(),
  ContentType: z.enum(["JAR", "ZIP"]).describe("The type of the plugin file.")
    .optional(),
  FileDescription: z.object({
    FileMd5: z.string().describe(
      "The hex-encoded MD5 checksum of the custom plugin file. You can use it to validate the file.",
    ).optional(),
    FileSize: z.number().int().describe(
      "The size in bytes of the custom plugin file. You can use it to validate the file.",
    ).optional(),
  }).describe("Details about the custom plugin file.").optional(),
  Location: z.object({
    S3Location: S3LocationSchema.describe(
      "The S3 bucket Amazon Resource Name (ARN), file key, and object version of the plugin file stored in Amazon S3.",
    ).optional(),
  }).describe("Information about the location of a custom plugin.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/kafkaconnect/custom-plugin",
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
      description: "KafkaConnect CustomPlugin resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a KafkaConnect CustomPlugin",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::KafkaConnect::CustomPlugin",
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
      description: "Get a KafkaConnect CustomPlugin",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KafkaConnect CustomPlugin",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::KafkaConnect::CustomPlugin",
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
      description: "Update a KafkaConnect CustomPlugin",
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
        const identifier = existing.CustomPluginArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::KafkaConnect::CustomPlugin",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::KafkaConnect::CustomPlugin",
          identifier,
          currentState,
          desiredState,
          ["Name", "Description", "ContentType", "Location"],
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
      description: "Delete a KafkaConnect CustomPlugin",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KafkaConnect CustomPlugin",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::KafkaConnect::CustomPlugin",
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
      description: "Sync KafkaConnect CustomPlugin state from AWS",
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
        const identifier = existing.CustomPluginArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::KafkaConnect::CustomPlugin",
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
