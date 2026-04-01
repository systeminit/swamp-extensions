// Auto-generated extension model for @swamp/aws/codestarnotifications/notification-rule
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

export const TargetSchema = z.object({
  TargetType: z.string(),
  TargetAddress: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  EventTypeId: z.string().min(1).max(2048).optional(),
  CreatedBy: z.string().min(1).max(2048).optional(),
  TargetAddress: z.string().min(1).max(2048).optional(),
  EventTypeIds: z.array(z.string().min(1).max(200)),
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  DetailType: z.enum(["BASIC", "FULL"]),
  Resource: z.string().regex(
    new RegExp("^arn:aws[^:\\s]*:[^:\\s]*:[^:\\s]*:[0-9]{12}:[^\\s]+$"),
  ),
  Targets: z.array(TargetSchema),
  Tags: z.record(z.string(), z.string()).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("[A-Za-z0-9\\-_ ]+$")),
});

const StateSchema = z.object({
  EventTypeId: z.string().optional(),
  CreatedBy: z.string().optional(),
  TargetAddress: z.string().optional(),
  EventTypeIds: z.array(z.string()).optional(),
  Status: z.string().optional(),
  DetailType: z.string().optional(),
  Resource: z.string().optional(),
  Targets: z.array(TargetSchema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Name: z.string().optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  EventTypeId: z.string().min(1).max(2048).optional(),
  CreatedBy: z.string().min(1).max(2048).optional(),
  TargetAddress: z.string().min(1).max(2048).optional(),
  EventTypeIds: z.array(z.string().min(1).max(200)).optional(),
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  DetailType: z.enum(["BASIC", "FULL"]).optional(),
  Resource: z.string().regex(
    new RegExp("^arn:aws[^:\\s]*:[^:\\s]*:[^:\\s]*:[0-9]{12}:[^\\s]+$"),
  ).optional(),
  Targets: z.array(TargetSchema).optional(),
  Tags: z.record(z.string(), z.string()).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("[A-Za-z0-9\\-_ ]+$"))
    .optional(),
});

export const model = {
  type: "@swamp/aws/codestarnotifications/notification-rule",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodeStarNotifications NotificationRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeStarNotifications NotificationRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodeStarNotifications::NotificationRule",
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
      description: "Get a CodeStarNotifications NotificationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeStarNotifications NotificationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CodeStarNotifications::NotificationRule",
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
      description: "Update a CodeStarNotifications NotificationRule",
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
          "AWS::CodeStarNotifications::NotificationRule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodeStarNotifications::NotificationRule",
          identifier,
          currentState,
          desiredState,
          ["Resource"],
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
      description: "Delete a CodeStarNotifications NotificationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeStarNotifications NotificationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CodeStarNotifications::NotificationRule",
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
      description: "Sync CodeStarNotifications NotificationRule state from AWS",
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
            "AWS::CodeStarNotifications::NotificationRule",
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
