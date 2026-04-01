// Auto-generated extension model for @swamp/aws/bedrock/flow-alias
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

export const FlowAliasRoutingConfigurationListItemSchema = z.object({
  FlowVersion: z.string().min(1).max(5).regex(
    new RegExp("^(DRAFT|[0-9]{0,4}[1-9][0-9]{0,4})$"),
  ).describe("Version.").optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FlowArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:flow/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Flow"),
  ConcurrencyConfiguration: z.object({
    Type: z.enum(["Automatic", "Manual"]),
    MaxConcurrency: z.number().min(1).max(100).describe(
      "Number of nodes executed concurrently at a time",
    ).optional(),
  }).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the Resource.",
  ).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a resource.",
  ),
  RoutingConfiguration: z.array(FlowAliasRoutingConfigurationListItemSchema)
    .describe("Routing configuration for a Flow alias."),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  FlowArn: z.string(),
  ConcurrencyConfiguration: z.object({
    Type: z.string(),
    MaxConcurrency: z.number(),
  }).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  FlowId: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  RoutingConfiguration: z.array(FlowAliasRoutingConfigurationListItemSchema)
    .optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FlowArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:flow/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Flow").optional(),
  ConcurrencyConfiguration: z.object({
    Type: z.enum(["Automatic", "Manual"]).optional(),
    MaxConcurrency: z.number().min(1).max(100).describe(
      "Number of nodes executed concurrently at a time",
    ).optional(),
  }).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the Resource.",
  ).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a resource.",
  ).optional(),
  RoutingConfiguration: z.array(FlowAliasRoutingConfigurationListItemSchema)
    .describe("Routing configuration for a Flow alias.").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

export const model = {
  type: "@swamp/aws/bedrock/flow-alias",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock FlowAlias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock FlowAlias",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::FlowAlias",
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
      description: "Get a Bedrock FlowAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock FlowAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::FlowAlias",
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
      description: "Update a Bedrock FlowAlias",
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
          existing.Arn?.toString(),
          existing.FlowArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Bedrock::FlowAlias",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::FlowAlias",
          identifier,
          currentState,
          desiredState,
          ["FlowArn"],
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
      description: "Delete a Bedrock FlowAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock FlowAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::FlowAlias",
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
      description: "Sync Bedrock FlowAlias state from AWS",
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
          existing.Arn?.toString(),
          existing.FlowArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Bedrock::FlowAlias",
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
