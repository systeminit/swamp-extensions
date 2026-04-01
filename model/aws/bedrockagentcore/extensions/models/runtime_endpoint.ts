// Auto-generated extension model for @swamp/aws/bedrockagentcore/runtime-endpoint
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
  AgentRuntimeId: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("The ID of the parent Agent Runtime (required for creation)"),
  Name: z.string().min(1).max(48).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe("The name of the Agent Runtime Endpoint"),
  AgentRuntimeVersion: z.string().regex(new RegExp("^([1-9][0-9]{0,4})$"))
    .describe("The version of the AgentCore Runtime to use for the endpoint.")
    .optional(),
  Description: z.string().min(1).max(256).describe(
    "The description of the AgentCore Runtime endpoint.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  AgentRuntimeId: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  AgentRuntimeVersion: z.string().optional(),
  LiveVersion: z.string().optional(),
  TargetVersion: z.string().optional(),
  Description: z.string().optional(),
  AgentRuntimeEndpointArn: z.string(),
  AgentRuntimeArn: z.string().optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  FailureReason: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AgentRuntimeId: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("The ID of the parent Agent Runtime (required for creation)")
    .optional(),
  Name: z.string().min(1).max(48).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe("The name of the Agent Runtime Endpoint").optional(),
  AgentRuntimeVersion: z.string().regex(new RegExp("^([1-9][0-9]{0,4})$"))
    .describe("The version of the AgentCore Runtime to use for the endpoint.")
    .optional(),
  Description: z.string().min(1).max(256).describe(
    "The description of the AgentCore Runtime endpoint.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

export const model = {
  type: "@swamp/aws/bedrockagentcore/runtime-endpoint",
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
      description: "BedrockAgentCore RuntimeEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore RuntimeEndpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::RuntimeEndpoint",
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
      description: "Get a BedrockAgentCore RuntimeEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore RuntimeEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::RuntimeEndpoint",
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
      description: "Update a BedrockAgentCore RuntimeEndpoint",
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
        const identifier = existing.AgentRuntimeEndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::RuntimeEndpoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::RuntimeEndpoint",
          identifier,
          currentState,
          desiredState,
          ["AgentRuntimeId", "Name"],
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
      description: "Delete a BedrockAgentCore RuntimeEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore RuntimeEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::RuntimeEndpoint",
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
      description: "Sync BedrockAgentCore RuntimeEndpoint state from AWS",
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
        const identifier = existing.AgentRuntimeEndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::RuntimeEndpoint",
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
