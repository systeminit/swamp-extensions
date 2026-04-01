// Auto-generated extension model for @swamp/aws/iotwireless/destination
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
  Key: z.string().min(1).max(127).optional(),
  Value: z.string().min(1).max(255).optional(),
});

const GlobalArgsSchema = z.object({
  Name: z.string().max(128).regex(new RegExp("[a-zA-Z0-9:_-]+")).describe(
    "Unique name of destination",
  ),
  Expression: z.string().describe("Destination expression"),
  ExpressionType: z.enum(["RuleName", "MqttTopic", "SnsTopic"]).describe(
    "Must be RuleName",
  ),
  Description: z.string().max(2048).describe("Destination description")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the destination.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "AWS role ARN that grants access",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Expression: z.string().optional(),
  ExpressionType: z.string().optional(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  RoleArn: z.string().optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().max(128).regex(new RegExp("[a-zA-Z0-9:_-]+")).describe(
    "Unique name of destination",
  ).optional(),
  Expression: z.string().describe("Destination expression").optional(),
  ExpressionType: z.enum(["RuleName", "MqttTopic", "SnsTopic"]).describe(
    "Must be RuleName",
  ).optional(),
  Description: z.string().max(2048).describe("Destination description")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the destination.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "AWS role ARN that grants access",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotwireless/destination",
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
      description: "IoTWireless Destination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless Destination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTWireless::Destination",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTWireless Destination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless Destination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTWireless::Destination",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a IoTWireless Destination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTWireless::Destination",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::Destination",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a IoTWireless Destination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless Destination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTWireless::Destination",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description: "Sync IoTWireless Destination state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTWireless::Destination",
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
