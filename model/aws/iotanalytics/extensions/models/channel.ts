// Auto-generated extension model for @swamp/aws/iotanalytics/channel
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

export const CustomerManagedS3Schema = z.object({
  Bucket: z.string().min(3).max(255).regex(new RegExp("^[a-zA-Z0-9.\\-_]*$")),
  RoleArn: z.string().min(20).max(2048),
  KeyPrefix: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9!_.*'()/{}:-]*/$"),
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  ChannelStorage: z.object({
    ServiceManagedS3: z.string().optional(),
    CustomerManagedS3: CustomerManagedS3Schema.optional(),
  }).optional(),
  ChannelName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ChannelStorage: z.object({
    ServiceManagedS3: z.string(),
    CustomerManagedS3: CustomerManagedS3Schema,
  }).optional(),
  ChannelName: z.string(),
  Id: z.string().optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number(),
    Unlimited: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ChannelStorage: z.object({
    ServiceManagedS3: z.string().optional(),
    CustomerManagedS3: CustomerManagedS3Schema.optional(),
  }).optional(),
  ChannelName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iotanalytics/channel",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTAnalytics Channel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTAnalytics Channel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTAnalytics::Channel",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ChannelName ?? g.ChannelName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTAnalytics Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTAnalytics::Channel",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ChannelName ?? context.globalArgs.ChannelName)?.toString() ??
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
      description: "Update a IoTAnalytics Channel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ChannelName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ChannelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTAnalytics::Channel",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTAnalytics::Channel",
          identifier,
          currentState,
          desiredState,
          ["ChannelName"],
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
      description: "Delete a IoTAnalytics Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTAnalytics::Channel",
          args.identifier,
        );
        const instanceName = context.globalArgs.ChannelName?.toString() ??
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
      description: "Sync IoTAnalytics Channel state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ChannelName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ChannelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTAnalytics::Channel",
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
