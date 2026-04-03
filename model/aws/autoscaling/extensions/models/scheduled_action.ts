// Auto-generated extension model for @swamp/aws/autoscaling/scheduled-action
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  MinSize: z.number().int().describe(
    "The minimum size of the Auto Scaling group.",
  ).optional(),
  Recurrence: z.string().describe(
    "The recurring schedule for the action, in Unix cron syntax format. When StartTime and EndTime are specified with Recurrence, they form the boundaries of when the recurring action starts and stops.",
  ).optional(),
  TimeZone: z.string().describe("The time zone for the cron expression.")
    .optional(),
  EndTime: z.string().describe(
    "The latest scheduled start time to return. If scheduled action names are provided, this parameter is ignored.",
  ).optional(),
  AutoScalingGroupName: z.string().describe(
    "The name of the Auto Scaling group.",
  ),
  StartTime: z.string().describe(
    "The earliest scheduled start time to return. If scheduled action names are provided, this parameter is ignored.",
  ).optional(),
  DesiredCapacity: z.number().int().describe(
    "The desired capacity is the initial capacity of the Auto Scaling group after the scheduled action runs and the capacity it attempts to maintain.",
  ).optional(),
  MaxSize: z.number().int().describe(
    "The minimum size of the Auto Scaling group.",
  ).optional(),
});

const StateSchema = z.object({
  ScheduledActionName: z.string(),
  MinSize: z.number().optional(),
  Recurrence: z.string().optional(),
  TimeZone: z.string().optional(),
  EndTime: z.string().optional(),
  AutoScalingGroupName: z.string(),
  StartTime: z.string().optional(),
  DesiredCapacity: z.number().optional(),
  MaxSize: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  MinSize: z.number().int().describe(
    "The minimum size of the Auto Scaling group.",
  ).optional(),
  Recurrence: z.string().describe(
    "The recurring schedule for the action, in Unix cron syntax format. When StartTime and EndTime are specified with Recurrence, they form the boundaries of when the recurring action starts and stops.",
  ).optional(),
  TimeZone: z.string().describe("The time zone for the cron expression.")
    .optional(),
  EndTime: z.string().describe(
    "The latest scheduled start time to return. If scheduled action names are provided, this parameter is ignored.",
  ).optional(),
  AutoScalingGroupName: z.string().describe(
    "The name of the Auto Scaling group.",
  ).optional(),
  StartTime: z.string().describe(
    "The earliest scheduled start time to return. If scheduled action names are provided, this parameter is ignored.",
  ).optional(),
  DesiredCapacity: z.number().int().describe(
    "The desired capacity is the initial capacity of the Auto Scaling group after the scheduled action runs and the capacity it attempts to maintain.",
  ).optional(),
  MaxSize: z.number().int().describe(
    "The minimum size of the Auto Scaling group.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/autoscaling/scheduled-action",
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
      description: "AutoScaling ScheduledAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AutoScaling ScheduledAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AutoScaling::ScheduledAction",
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
      description: "Get a AutoScaling ScheduledAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling ScheduledAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AutoScaling::ScheduledAction",
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
      description: "Update a AutoScaling ScheduledAction",
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
        const idParts = [
          existing.ScheduledActionName?.toString(),
          existing.AutoScalingGroupName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::AutoScaling::ScheduledAction",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AutoScaling::ScheduledAction",
          identifier,
          currentState,
          desiredState,
          ["AutoScalingGroupName"],
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
      description: "Delete a AutoScaling ScheduledAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling ScheduledAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AutoScaling::ScheduledAction",
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
      description: "Sync AutoScaling ScheduledAction state from AWS",
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
        const idParts = [
          existing.ScheduledActionName?.toString(),
          existing.AutoScalingGroupName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AutoScaling::ScheduledAction",
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
