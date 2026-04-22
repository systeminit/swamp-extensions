// Auto-generated extension model for @swamp/aws/braket/spending-limit
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Braket SpendingLimit (AWS::Braket::SpendingLimit).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DeviceArn: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the quantum device to apply the spending limit to.",
  ),
  SpendingLimit: z.string().min(1).regex(new RegExp("^\\d+(\\.\\d{1,2})?$"))
    .describe(
      "The maximum amount that can be spent on the specified device, in USD.",
    ),
  TimePeriod: z.object({
    StartAt: z.string().describe(
      "The start date and time for the spending limit period, in ISO 8601 format.",
    ),
    EndAt: z.string().describe(
      "The end date and time for the spending limit period, in ISO 8601 format.",
    ),
  }).describe(
    "Defines a time range for spending limits, specifying when the limit is active.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the spending limit.")
    .optional(),
});

const StateSchema = z.object({
  SpendingLimitArn: z.string(),
  DeviceArn: z.string().optional(),
  SpendingLimit: z.string().optional(),
  TimePeriod: z.object({
    StartAt: z.string(),
    EndAt: z.string(),
  }).optional(),
  QueuedSpend: z.string().optional(),
  TotalSpend: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DeviceArn: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the quantum device to apply the spending limit to.",
  ).optional(),
  SpendingLimit: z.string().min(1).regex(new RegExp("^\\d+(\\.\\d{1,2})?$"))
    .describe(
      "The maximum amount that can be spent on the specified device, in USD.",
    ).optional(),
  TimePeriod: z.object({
    StartAt: z.string().describe(
      "The start date and time for the spending limit period, in ISO 8601 format.",
    ).optional(),
    EndAt: z.string().describe(
      "The end date and time for the spending limit period, in ISO 8601 format.",
    ).optional(),
  }).describe(
    "Defines a time range for spending limits, specifying when the limit is active.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the spending limit.")
    .optional(),
});

/** Swamp extension model for Braket SpendingLimit. Registered at `@swamp/aws/braket/spending-limit`. */
export const model = {
  type: "@swamp/aws/braket/spending-limit",
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Braket SpendingLimit resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Braket SpendingLimit",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Braket::SpendingLimit",
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
      description: "Get a Braket SpendingLimit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Braket SpendingLimit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Braket::SpendingLimit",
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
      description: "Update a Braket SpendingLimit",
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
        const identifier = existing.SpendingLimitArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Braket::SpendingLimit",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Braket::SpendingLimit",
          identifier,
          currentState,
          desiredState,
          ["DeviceArn"],
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
      description: "Delete a Braket SpendingLimit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Braket SpendingLimit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Braket::SpendingLimit",
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
      description: "Sync Braket SpendingLimit state from AWS",
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
        const identifier = existing.SpendingLimitArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Braket::SpendingLimit",
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
