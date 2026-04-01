// Auto-generated extension model for @swamp/aws/cloudfront/monitoring-subscription
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const RealtimeMetricsSubscriptionConfigSchema = z.object({
  RealtimeMetricsSubscriptionStatus: z.enum(["Enabled", "Disabled"]).describe(
    "A flag that indicates whether additional CloudWatch metrics are enabled for a given CloudFront distribution.",
  ),
});

const GlobalArgsSchema = z.object({
  DistributionId: z.string().describe(
    "The ID of the distribution that you are enabling metrics for.",
  ),
  MonitoringSubscription: z.object({
    RealtimeMetricsSubscriptionConfig: RealtimeMetricsSubscriptionConfigSchema
      .describe(
        "A subscription configuration for additional CloudWatch metrics.",
      ).optional(),
  }).describe(
    "A subscription configuration for additional CloudWatch metrics.",
  ),
});

const StateSchema = z.object({
  DistributionId: z.string(),
  MonitoringSubscription: z.object({
    RealtimeMetricsSubscriptionConfig: RealtimeMetricsSubscriptionConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  DistributionId: z.string().describe(
    "The ID of the distribution that you are enabling metrics for.",
  ).optional(),
  MonitoringSubscription: z.object({
    RealtimeMetricsSubscriptionConfig: RealtimeMetricsSubscriptionConfigSchema
      .describe(
        "A subscription configuration for additional CloudWatch metrics.",
      ).optional(),
  }).describe("A subscription configuration for additional CloudWatch metrics.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/cloudfront/monitoring-subscription",
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
      description: "CloudFront MonitoringSubscription resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront MonitoringSubscription",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFront::MonitoringSubscription",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DistributionId ?? g.DistributionId)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a CloudFront MonitoringSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront MonitoringSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFront::MonitoringSubscription",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DistributionId ?? context.globalArgs.DistributionId)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a CloudFront MonitoringSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront MonitoringSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFront::MonitoringSubscription",
          args.identifier,
        );
        const instanceName = context.globalArgs.DistributionId?.toString() ??
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
      description: "Sync CloudFront MonitoringSubscription state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DistributionId?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DistributionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFront::MonitoringSubscription",
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
