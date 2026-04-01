// Auto-generated extension model for @swamp/aws/iot/topic-rule-destination
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
  Status: z.enum(["ENABLED", "IN_PROGRESS", "DISABLED"]).describe(
    "The status of the TopicRuleDestination.",
  ).optional(),
  HttpUrlProperties: z.object({
    ConfirmationUrl: z.string().optional(),
  }).describe("HTTP URL destination properties.").optional(),
  VpcProperties: z.object({
    SubnetIds: z.array(z.string()).optional(),
    SecurityGroups: z.array(z.string()).optional(),
    VpcId: z.string().optional(),
    RoleArn: z.string().optional(),
  }).describe("VPC destination properties.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Status: z.string().optional(),
  HttpUrlProperties: z.object({
    ConfirmationUrl: z.string(),
  }).optional(),
  StatusReason: z.string().optional(),
  VpcProperties: z.object({
    SubnetIds: z.array(z.string()),
    SecurityGroups: z.array(z.string()),
    VpcId: z.string(),
    RoleArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Status: z.enum(["ENABLED", "IN_PROGRESS", "DISABLED"]).describe(
    "The status of the TopicRuleDestination.",
  ).optional(),
  HttpUrlProperties: z.object({
    ConfirmationUrl: z.string().optional(),
  }).describe("HTTP URL destination properties.").optional(),
  VpcProperties: z.object({
    SubnetIds: z.array(z.string()).optional(),
    SecurityGroups: z.array(z.string()).optional(),
    VpcId: z.string().optional(),
    RoleArn: z.string().optional(),
  }).describe("VPC destination properties.").optional(),
});

export const model = {
  type: "@swamp/aws/iot/topic-rule-destination",
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
      description: "IoT TopicRuleDestination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT TopicRuleDestination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::TopicRuleDestination",
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
      description: "Get a IoT TopicRuleDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT TopicRuleDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::TopicRuleDestination",
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
      description: "Update a IoT TopicRuleDestination",
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
          "AWS::IoT::TopicRuleDestination",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::TopicRuleDestination",
          identifier,
          currentState,
          desiredState,
          ["HttpUrlProperties", "VpcProperties"],
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
      description: "Delete a IoT TopicRuleDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT TopicRuleDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::TopicRuleDestination",
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
      description: "Sync IoT TopicRuleDestination state from AWS",
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
            "AWS::IoT::TopicRuleDestination",
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
