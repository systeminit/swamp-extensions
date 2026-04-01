// Auto-generated extension model for @swamp/aws/amplifyuibuilder/component
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

export const ComponentVariantSchema = z.object({
  VariantValues: z.record(z.string(), z.string()).optional(),
  Overrides: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AppId: z.string().optional(),
  Children: z.array(z.string()).optional(),
  ComponentType: z.string().min(1).max(255).optional(),
  EnvironmentName: z.string().optional(),
  Name: z.string().min(1).max(255).optional(),
  Overrides: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  SchemaVersion: z.string().optional(),
  SourceId: z.string().optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Variants: z.array(ComponentVariantSchema).optional(),
});

const StateSchema = z.object({
  AppId: z.string(),
  Children: z.array(z.string()).optional(),
  ComponentType: z.string().optional(),
  CreatedAt: z.string().optional(),
  EnvironmentName: z.string(),
  Id: z.string(),
  ModifiedAt: z.string().optional(),
  Name: z.string().optional(),
  Overrides: z.record(z.string(), z.unknown()).optional(),
  SchemaVersion: z.string().optional(),
  SourceId: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Variants: z.array(ComponentVariantSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AppId: z.string().optional(),
  Children: z.array(z.string()).optional(),
  ComponentType: z.string().min(1).max(255).optional(),
  EnvironmentName: z.string().optional(),
  Name: z.string().min(1).max(255).optional(),
  Overrides: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  SchemaVersion: z.string().optional(),
  SourceId: z.string().optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Variants: z.array(ComponentVariantSchema).optional(),
});

export const model = {
  type: "@swamp/aws/amplifyuibuilder/component",
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
      description: "AmplifyUIBuilder Component resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AmplifyUIBuilder Component",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AmplifyUIBuilder::Component",
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
      description: "Get a AmplifyUIBuilder Component",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Component",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AmplifyUIBuilder::Component",
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
      description: "Update a AmplifyUIBuilder Component",
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
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::AmplifyUIBuilder::Component",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AmplifyUIBuilder::Component",
          identifier,
          currentState,
          desiredState,
          ["AppId", "EnvironmentName"],
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
      description: "Delete a AmplifyUIBuilder Component",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Component",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AmplifyUIBuilder::Component",
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
      description: "Sync AmplifyUIBuilder Component state from AWS",
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
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AmplifyUIBuilder::Component",
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
