// Auto-generated extension model for @swamp/aws/securitylake/subscriber
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
    "The name of the tag. This is a general label that acts as a category for a more specific tag value (value).",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value that is associated with the specified tag key (key). This value acts as a descriptor for the tag key. A tag value cannot be null, but it can be an empty string.",
  ),
});

export const AwsLogSourceSchema = z.object({
  SourceName: z.string().describe(
    "The name for a AWS source. This must be a Regionally unique value.",
  ).optional(),
  SourceVersion: z.string().regex(new RegExp("^(latest|[0-9]\\.[0-9])$"))
    .describe(
      "The version for a AWS source. This must be a Regionally unique value.",
    ).optional(),
});

export const CustomLogSourceSchema = z.object({
  SourceName: z.string().min(1).max(64).regex(new RegExp("^[\\\\\\w\\-_:/.]*$"))
    .describe(
      "The name for a third-party custom source. This must be a Regionally unique value.",
    ).optional(),
  SourceVersion: z.string().min(1).max(32).regex(
    new RegExp("^[A-Za-z0-9\\-\\.\\_]*$"),
  ).describe(
    "The version for a third-party custom source. This must be a Regionally unique value.",
  ).optional(),
});

export const SourceSchema = z.object({
  AwsLogSource: AwsLogSourceSchema.describe(
    "Amazon Security Lake supports log and event collection for natively supported AWS services.",
  ).optional(),
  CustomLogSource: CustomLogSourceSchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AccessTypes: z.array(z.enum(["LAKEFORMATION", "S3"])).describe(
    "The Amazon S3 or AWS Lake Formation access type.",
  ),
  DataLakeArn: z.string().min(1).max(256).describe(
    "The ARN for the data lake.",
  ),
  SubscriberIdentity: z.object({
    ExternalId: z.string().min(2).max(1224).regex(
      new RegExp("^[\\w+=,.@:/-]*$"),
    ).describe(
      "The external ID used to establish trust relationship with the AWS identity.",
    ),
    Principal: z.string().regex(
      new RegExp("^([0-9]{12}|[a-z0-9\\.\\-]*\\.(amazonaws|amazon)\\.com)$"),
    ).describe("The AWS identity principal."),
  }).describe("The AWS identity used to access your data."),
  SubscriberName: z.string().min(1).max(64).regex(
    new RegExp("^[\\\\\\w\\s\\-_:/,.@=+]*$"),
  ).describe("The name of your Security Lake subscriber account."),
  SubscriberDescription: z.string().describe(
    "The description for your subscriber account in Security Lake.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of objects, one for each tag to associate with the subscriber. For each tag, you must specify both a tag key and a tag value. A tag value cannot be null, but it can be an empty string.",
  ).optional(),
  Sources: z.array(SourceSchema).describe(
    "The supported AWS services from which logs and events are collected.",
  ),
});

const StateSchema = z.object({
  AccessTypes: z.array(z.string()).optional(),
  DataLakeArn: z.string().optional(),
  SubscriberIdentity: z.object({
    ExternalId: z.string(),
    Principal: z.string(),
  }).optional(),
  SubscriberName: z.string().optional(),
  SubscriberDescription: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Sources: z.array(SourceSchema).optional(),
  ResourceShareArn: z.string().optional(),
  ResourceShareName: z.string().optional(),
  SubscriberRoleArn: z.string().optional(),
  S3BucketArn: z.string().optional(),
  SubscriberArn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AccessTypes: z.array(z.enum(["LAKEFORMATION", "S3"])).describe(
    "The Amazon S3 or AWS Lake Formation access type.",
  ).optional(),
  DataLakeArn: z.string().min(1).max(256).describe("The ARN for the data lake.")
    .optional(),
  SubscriberIdentity: z.object({
    ExternalId: z.string().min(2).max(1224).regex(
      new RegExp("^[\\w+=,.@:/-]*$"),
    ).describe(
      "The external ID used to establish trust relationship with the AWS identity.",
    ).optional(),
    Principal: z.string().regex(
      new RegExp("^([0-9]{12}|[a-z0-9\\.\\-]*\\.(amazonaws|amazon)\\.com)$"),
    ).describe("The AWS identity principal.").optional(),
  }).describe("The AWS identity used to access your data.").optional(),
  SubscriberName: z.string().min(1).max(64).regex(
    new RegExp("^[\\\\\\w\\s\\-_:/,.@=+]*$"),
  ).describe("The name of your Security Lake subscriber account.").optional(),
  SubscriberDescription: z.string().describe(
    "The description for your subscriber account in Security Lake.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of objects, one for each tag to associate with the subscriber. For each tag, you must specify both a tag key and a tag value. A tag value cannot be null, but it can be an empty string.",
  ).optional(),
  Sources: z.array(SourceSchema).describe(
    "The supported AWS services from which logs and events are collected.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/securitylake/subscriber",
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
      description: "SecurityLake Subscriber resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityLake Subscriber",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SecurityLake::Subscriber",
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
      description: "Get a SecurityLake Subscriber",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake Subscriber",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SecurityLake::Subscriber",
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
      description: "Update a SecurityLake Subscriber",
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
        const identifier = existing.SubscriberArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SecurityLake::Subscriber",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SecurityLake::Subscriber",
          identifier,
          currentState,
          desiredState,
          ["DataLakeArn"],
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
      description: "Delete a SecurityLake Subscriber",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake Subscriber",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SecurityLake::Subscriber",
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
      description: "Sync SecurityLake Subscriber state from AWS",
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
        const identifier = existing.SubscriberArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SecurityLake::Subscriber",
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
