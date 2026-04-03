// Auto-generated extension model for @swamp/aws/notifications/notification-hub
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
  Region: z.string().min(2).max(25).describe(
    "Region that NotificationHub is present in.",
  ),
  NotificationHubStatusSummary: z.object({
    NotificationHubStatus: z.enum([
      "ACTIVE",
      "REGISTERING",
      "DEREGISTERING",
      "INACTIVE",
    ]),
    NotificationHubStatusReason: z.string(),
  }).optional(),
});

const StateSchema = z.object({
  Region: z.string(),
  NotificationHubStatusSummary: z.object({
    NotificationHubStatus: z.string(),
    NotificationHubStatusReason: z.string(),
  }).optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Region: z.string().min(2).max(25).describe(
    "Region that NotificationHub is present in.",
  ).optional(),
  NotificationHubStatusSummary: z.object({
    NotificationHubStatus: z.enum([
      "ACTIVE",
      "REGISTERING",
      "DEREGISTERING",
      "INACTIVE",
    ]).optional(),
    NotificationHubStatusReason: z.string().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/notifications/notification-hub",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Notifications NotificationHub resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Notifications NotificationHub",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Notifications::NotificationHub",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.Region ?? g.Region)?.toString() ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Notifications NotificationHub",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Notifications NotificationHub",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Notifications::NotificationHub",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Region ?? context.globalArgs.Region)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Notifications NotificationHub",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Notifications NotificationHub",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Notifications::NotificationHub",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Region?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync Notifications NotificationHub state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Region?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Region?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Notifications::NotificationHub",
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
