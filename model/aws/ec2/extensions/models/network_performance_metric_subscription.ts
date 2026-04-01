// Auto-generated extension model for @swamp/aws/ec2/network-performance-metric-subscription
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Source: z.string().describe(
    "The starting Region or Availability Zone for metric to subscribe to.",
  ),
  Destination: z.string().describe(
    "The target Region or Availability Zone for the metric to subscribe to.",
  ),
  Metric: z.string().describe("The metric type to subscribe to."),
  Statistic: z.string().describe("The statistic to subscribe to."),
});

const StateSchema = z.object({
  Source: z.string(),
  Destination: z.string(),
  Metric: z.string(),
  Statistic: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Source: z.string().describe(
    "The starting Region or Availability Zone for metric to subscribe to.",
  ).optional(),
  Destination: z.string().describe(
    "The target Region or Availability Zone for the metric to subscribe to.",
  ).optional(),
  Metric: z.string().describe("The metric type to subscribe to.").optional(),
  Statistic: z.string().describe("The statistic to subscribe to.").optional(),
});

export const model = {
  type: "@swamp/aws/ec2/network-performance-metric-subscription",
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
      description: "EC2 NetworkPerformanceMetricSubscription resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 NetworkPerformanceMetricSubscription",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::NetworkPerformanceMetricSubscription",
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
      description: "Get a EC2 NetworkPerformanceMetricSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkPerformanceMetricSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::NetworkPerformanceMetricSubscription",
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
    delete: {
      description: "Delete a EC2 NetworkPerformanceMetricSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkPerformanceMetricSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::NetworkPerformanceMetricSubscription",
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
      description:
        "Sync EC2 NetworkPerformanceMetricSubscription state from AWS",
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
        const idParts = [
          existing.Source?.toString(),
          existing.Destination?.toString(),
          existing.Metric?.toString(),
          existing.Statistic?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EC2::NetworkPerformanceMetricSubscription",
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
