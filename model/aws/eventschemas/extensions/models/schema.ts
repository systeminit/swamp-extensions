// Auto-generated extension model for @swamp/aws/eventschemas/schema
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

export const TagsEntrySchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Type: z.string().describe(
    "The type of schema. Valid types include OpenApi3 and JSONSchemaDraft4.",
  ),
  Description: z.string().describe("A description of the schema.").optional(),
  Content: z.string().describe("The source of the schema definition."),
  RegistryName: z.string().describe("The name of the schema registry."),
  SchemaName: z.string().describe("The name of the schema.").optional(),
  Tags: z.array(TagsEntrySchema).describe("Tags associated with the resource.")
    .optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  Description: z.string().optional(),
  SchemaVersion: z.string().optional(),
  Content: z.string().optional(),
  RegistryName: z.string().optional(),
  SchemaArn: z.string(),
  SchemaName: z.string().optional(),
  LastModified: z.string().optional(),
  VersionCreatedDate: z.string().optional(),
  Tags: z.array(TagsEntrySchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Type: z.string().describe(
    "The type of schema. Valid types include OpenApi3 and JSONSchemaDraft4.",
  ).optional(),
  Description: z.string().describe("A description of the schema.").optional(),
  Content: z.string().describe("The source of the schema definition.")
    .optional(),
  RegistryName: z.string().describe("The name of the schema registry.")
    .optional(),
  SchemaName: z.string().describe("The name of the schema.").optional(),
  Tags: z.array(TagsEntrySchema).describe("Tags associated with the resource.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/eventschemas/schema",
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
      description: "EventSchemas Schema resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EventSchemas Schema",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EventSchemas::Schema",
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
      description: "Get a EventSchemas Schema",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventSchemas Schema",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EventSchemas::Schema",
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
      description: "Update a EventSchemas Schema",
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
        const identifier = existing.SchemaArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EventSchemas::Schema",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EventSchemas::Schema",
          identifier,
          currentState,
          desiredState,
          ["SchemaName", "RegistryName"],
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
      description: "Delete a EventSchemas Schema",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventSchemas Schema",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EventSchemas::Schema",
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
      description: "Sync EventSchemas Schema state from AWS",
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
        const identifier = existing.SchemaArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EventSchemas::Schema",
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
