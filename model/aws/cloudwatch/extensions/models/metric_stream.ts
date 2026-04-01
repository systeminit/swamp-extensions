// Auto-generated extension model for @swamp/aws/cloudwatch/metric-stream
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

export const MetricStreamFilterSchema = z.object({
  Namespace: z.string().min(1).max(255).describe(
    "Only metrics with Namespace matching this value will be streamed.",
  ),
  MetricNames: z.array(z.string().min(1).max(255)).describe(
    "Only metrics with MetricNames matching these values will be streamed. Must be set together with Namespace.",
  ).optional(),
});

export const MetricStreamStatisticsMetricSchema = z.object({
  MetricName: z.string().min(1).max(255).describe("The name of the metric."),
  Namespace: z.string().min(1).max(255).describe(
    "The namespace of the metric.",
  ),
});

export const MetricStreamStatisticsConfigurationSchema = z.object({
  AdditionalStatistics: z.array(z.string()).describe(
    "The additional statistics to stream for the metrics listed in IncludeMetrics.",
  ),
  IncludeMetrics: z.array(MetricStreamStatisticsMetricSchema).describe(
    "An array that defines the metrics that are to have additional statistics streamed.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("A unique identifier for the tag."),
  Value: z.string().min(0).max(256).describe(
    "String which you can use to describe or define the tag.",
  ),
});

const GlobalArgsSchema = z.object({
  ExcludeFilters: z.array(MetricStreamFilterSchema).describe(
    "Define which metrics will be not streamed. Metrics matched by multiple instances of MetricStreamFilter are joined with an OR operation by default. If both IncludeFilters and ExcludeFilters are omitted, all metrics in the account will be streamed. IncludeFilters and ExcludeFilters are mutually exclusive. Default to null.",
  ).optional(),
  FirehoseArn: z.string().min(20).max(2048).describe(
    "The ARN of the Kinesis Firehose where to stream the data.",
  ).optional(),
  IncludeFilters: z.array(MetricStreamFilterSchema).describe(
    "Define which metrics will be streamed. Metrics matched by multiple instances of MetricStreamFilter are joined with an OR operation by default. If both IncludeFilters and ExcludeFilters are omitted, all metrics in the account will be streamed. IncludeFilters and ExcludeFilters are mutually exclusive. Default to null.",
  ).optional(),
  Name: z.string().min(1).max(255).describe("Name of the metric stream.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that provides access to the Kinesis Firehose.",
  ).optional(),
  OutputFormat: z.string().min(1).max(255).describe(
    "The output format of the data streamed to the Kinesis Firehose.",
  ).optional(),
  StatisticsConfigurations: z.array(MetricStreamStatisticsConfigurationSchema)
    .describe(
      "By default, a metric stream always sends the MAX, MIN, SUM, and SAMPLECOUNT statistics for each metric that is streamed. You can use this parameter to have the metric stream also send additional statistics in the stream. This array can have up to 100 members.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to assign to the delivery stream.",
  ).optional(),
  IncludeLinkedAccountsMetrics: z.boolean().describe(
    "If you are creating a metric stream in a monitoring account, specify true to include metrics from source accounts that are linked to this monitoring account, in the metric stream. The default is false.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CreationDate: z.string().optional(),
  ExcludeFilters: z.array(MetricStreamFilterSchema).optional(),
  FirehoseArn: z.string().optional(),
  IncludeFilters: z.array(MetricStreamFilterSchema).optional(),
  LastUpdateDate: z.string().optional(),
  Name: z.string(),
  RoleArn: z.string().optional(),
  State: z.string().optional(),
  OutputFormat: z.string().optional(),
  StatisticsConfigurations: z.array(MetricStreamStatisticsConfigurationSchema)
    .optional(),
  Tags: z.array(TagSchema).optional(),
  IncludeLinkedAccountsMetrics: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ExcludeFilters: z.array(MetricStreamFilterSchema).describe(
    "Define which metrics will be not streamed. Metrics matched by multiple instances of MetricStreamFilter are joined with an OR operation by default. If both IncludeFilters and ExcludeFilters are omitted, all metrics in the account will be streamed. IncludeFilters and ExcludeFilters are mutually exclusive. Default to null.",
  ).optional(),
  FirehoseArn: z.string().min(20).max(2048).describe(
    "The ARN of the Kinesis Firehose where to stream the data.",
  ).optional(),
  IncludeFilters: z.array(MetricStreamFilterSchema).describe(
    "Define which metrics will be streamed. Metrics matched by multiple instances of MetricStreamFilter are joined with an OR operation by default. If both IncludeFilters and ExcludeFilters are omitted, all metrics in the account will be streamed. IncludeFilters and ExcludeFilters are mutually exclusive. Default to null.",
  ).optional(),
  Name: z.string().min(1).max(255).describe("Name of the metric stream.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that provides access to the Kinesis Firehose.",
  ).optional(),
  OutputFormat: z.string().min(1).max(255).describe(
    "The output format of the data streamed to the Kinesis Firehose.",
  ).optional(),
  StatisticsConfigurations: z.array(MetricStreamStatisticsConfigurationSchema)
    .describe(
      "By default, a metric stream always sends the MAX, MIN, SUM, and SAMPLECOUNT statistics for each metric that is streamed. You can use this parameter to have the metric stream also send additional statistics in the stream. This array can have up to 100 members.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to assign to the delivery stream.",
  ).optional(),
  IncludeLinkedAccountsMetrics: z.boolean().describe(
    "If you are creating a metric stream in a monitoring account, specify true to include metrics from source accounts that are linked to this monitoring account, in the metric stream. The default is false.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/cloudwatch/metric-stream",
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
      description: "CloudWatch MetricStream resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch MetricStream",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudWatch::MetricStream",
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
      description: "Get a CloudWatch MetricStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch MetricStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudWatch::MetricStream",
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
      description: "Update a CloudWatch MetricStream",
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
          "AWS::CloudWatch::MetricStream",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudWatch::MetricStream",
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
      description: "Delete a CloudWatch MetricStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch MetricStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudWatch::MetricStream",
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
      description: "Sync CloudWatch MetricStream state from AWS",
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
            "AWS::CloudWatch::MetricStream",
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
