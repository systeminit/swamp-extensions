// Auto-generated extension model for @swamp/aws/lightsail/alarm
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
  AlarmName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name for the alarm. Specify the name of an existing alarm to update, and overwrite the previous configuration of the alarm.",
  ),
  MonitoredResourceName: z.string().describe(
    "The name of the Lightsail resource that the alarm monitors.",
  ),
  MetricName: z.string().describe(
    "The name of the metric to associate with the alarm.",
  ),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified statistic to the threshold. The specified statistic value is used as the first operand.",
  ),
  ContactProtocols: z.array(z.string()).describe(
    "The contact protocols to use for the alarm, such as Email, SMS (text messaging), or both.",
  ).optional(),
  DatapointsToAlarm: z.number().int().describe(
    'The number of data points that must be not within the specified threshold to trigger the alarm. If you are setting an "M out of N" alarm, this value (datapointsToAlarm) is the M.',
  ).optional(),
  EvaluationPeriods: z.number().int().describe(
    'The number of most recent periods over which data is compared to the specified threshold. If you are setting an "M out of N" alarm, this value (evaluationPeriods) is the N.',
  ),
  NotificationEnabled: z.boolean().describe(
    "Indicates whether the alarm is enabled. Notifications are enabled by default if you don't specify this parameter.",
  ).optional(),
  NotificationTriggers: z.array(z.string()).describe(
    "The alarm states that trigger a notification.",
  ).optional(),
  Threshold: z.number().describe(
    "The value against which the specified statistic is compared.",
  ),
  TreatMissingData: z.string().describe(
    "Sets how this alarm will handle missing data points.",
  ).optional(),
});

const StateSchema = z.object({
  AlarmName: z.string(),
  MonitoredResourceName: z.string().optional(),
  MetricName: z.string().optional(),
  ComparisonOperator: z.string().optional(),
  ContactProtocols: z.array(z.string()).optional(),
  AlarmArn: z.string().optional(),
  DatapointsToAlarm: z.number().optional(),
  EvaluationPeriods: z.number().optional(),
  NotificationEnabled: z.boolean().optional(),
  NotificationTriggers: z.array(z.string()).optional(),
  Threshold: z.number().optional(),
  TreatMissingData: z.string().optional(),
  State: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AlarmName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name for the alarm. Specify the name of an existing alarm to update, and overwrite the previous configuration of the alarm.",
  ).optional(),
  MonitoredResourceName: z.string().describe(
    "The name of the Lightsail resource that the alarm monitors.",
  ).optional(),
  MetricName: z.string().describe(
    "The name of the metric to associate with the alarm.",
  ).optional(),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified statistic to the threshold. The specified statistic value is used as the first operand.",
  ).optional(),
  ContactProtocols: z.array(z.string()).describe(
    "The contact protocols to use for the alarm, such as Email, SMS (text messaging), or both.",
  ).optional(),
  DatapointsToAlarm: z.number().int().describe(
    'The number of data points that must be not within the specified threshold to trigger the alarm. If you are setting an "M out of N" alarm, this value (datapointsToAlarm) is the M.',
  ).optional(),
  EvaluationPeriods: z.number().int().describe(
    'The number of most recent periods over which data is compared to the specified threshold. If you are setting an "M out of N" alarm, this value (evaluationPeriods) is the N.',
  ).optional(),
  NotificationEnabled: z.boolean().describe(
    "Indicates whether the alarm is enabled. Notifications are enabled by default if you don't specify this parameter.",
  ).optional(),
  NotificationTriggers: z.array(z.string()).describe(
    "The alarm states that trigger a notification.",
  ).optional(),
  Threshold: z.number().describe(
    "The value against which the specified statistic is compared.",
  ).optional(),
  TreatMissingData: z.string().describe(
    "Sets how this alarm will handle missing data points.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/lightsail/alarm",
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
      description: "Lightsail Alarm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail Alarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lightsail::Alarm",
          desiredState,
        ) as StateData;
        const instanceName = (result.AlarmName ?? g.AlarmName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Lightsail Alarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Alarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lightsail::Alarm",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.AlarmName ?? context.globalArgs.AlarmName)?.toString() ??
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
      description: "Update a Lightsail Alarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AlarmName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::Alarm",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::Alarm",
          identifier,
          currentState,
          desiredState,
          ["AlarmName", "MonitoredResourceName", "MetricName"],
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
      description: "Delete a Lightsail Alarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Alarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lightsail::Alarm",
          args.identifier,
        );
        const instanceName = context.globalArgs.AlarmName?.toString() ??
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
      description: "Sync Lightsail Alarm state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AlarmName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::Alarm",
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
