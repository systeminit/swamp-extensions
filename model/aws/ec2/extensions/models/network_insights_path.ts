// Auto-generated extension model for @swamp/aws/ec2/network-insights-path
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

export const FilterPortRangeSchema = z.object({
  FromPort: z.number().int().optional(),
  ToPort: z.number().int().optional(),
});

export const TagSchema = z.object({
  Key: z.string(),
  Value: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  SourceIp: z.string().optional(),
  FilterAtSource: z.object({
    SourceAddress: z.string().optional(),
    SourcePortRange: FilterPortRangeSchema.optional(),
    DestinationAddress: z.string().optional(),
    DestinationPortRange: FilterPortRangeSchema.optional(),
  }).optional(),
  FilterAtDestination: z.object({
    SourceAddress: z.string().optional(),
    SourcePortRange: FilterPortRangeSchema.optional(),
    DestinationAddress: z.string().optional(),
    DestinationPortRange: FilterPortRangeSchema.optional(),
  }).optional(),
  DestinationIp: z.string().optional(),
  Source: z.string(),
  Destination: z.string().optional(),
  Protocol: z.enum(["tcp", "udp"]),
  DestinationPort: z.number().int().optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  NetworkInsightsPathId: z.string(),
  NetworkInsightsPathArn: z.string().optional(),
  CreatedDate: z.string().optional(),
  SourceIp: z.string().optional(),
  FilterAtSource: z.object({
    SourceAddress: z.string(),
    SourcePortRange: FilterPortRangeSchema,
    DestinationAddress: z.string(),
    DestinationPortRange: FilterPortRangeSchema,
  }).optional(),
  FilterAtDestination: z.object({
    SourceAddress: z.string(),
    SourcePortRange: FilterPortRangeSchema,
    DestinationAddress: z.string(),
    DestinationPortRange: FilterPortRangeSchema,
  }).optional(),
  DestinationIp: z.string().optional(),
  Source: z.string().optional(),
  Destination: z.string().optional(),
  SourceArn: z.string().optional(),
  DestinationArn: z.string().optional(),
  Protocol: z.string().optional(),
  DestinationPort: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  SourceIp: z.string().optional(),
  FilterAtSource: z.object({
    SourceAddress: z.string().optional(),
    SourcePortRange: FilterPortRangeSchema.optional(),
    DestinationAddress: z.string().optional(),
    DestinationPortRange: FilterPortRangeSchema.optional(),
  }).optional(),
  FilterAtDestination: z.object({
    SourceAddress: z.string().optional(),
    SourcePortRange: FilterPortRangeSchema.optional(),
    DestinationAddress: z.string().optional(),
    DestinationPortRange: FilterPortRangeSchema.optional(),
  }).optional(),
  DestinationIp: z.string().optional(),
  Source: z.string().optional(),
  Destination: z.string().optional(),
  Protocol: z.enum(["tcp", "udp"]).optional(),
  DestinationPort: z.number().int().optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/network-insights-path",
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
      description: "EC2 NetworkInsightsPath resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 NetworkInsightsPath",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::NetworkInsightsPath",
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
      description: "Get a EC2 NetworkInsightsPath",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsPath",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::NetworkInsightsPath",
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
      description: "Update a EC2 NetworkInsightsPath",
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
        const identifier = existing.NetworkInsightsPathId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::NetworkInsightsPath",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::NetworkInsightsPath",
          identifier,
          currentState,
          desiredState,
          [
            "SourceIp",
            "DestinationIp",
            "Source",
            "Destination",
            "Protocol",
            "DestinationPort",
            "FilterAtSource",
            "FilterAtDestination",
          ],
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
      description: "Delete a EC2 NetworkInsightsPath",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsPath",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::NetworkInsightsPath",
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
      description: "Sync EC2 NetworkInsightsPath state from AWS",
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
        const identifier = existing.NetworkInsightsPathId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::NetworkInsightsPath",
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
