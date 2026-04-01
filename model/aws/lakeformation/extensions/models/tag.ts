// Auto-generated extension model for @swamp/aws/lakeformation/tag
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
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your Lake Formation environment.",
  ).optional(),
  TagKey: z.string().min(1).max(128).regex(
    new RegExp("^([{a-zA-Z}{\\s}{0-9}_.:\\/=+\\-@%]*)$"),
  ).describe("The key-name for the LF-tag."),
  TagValues: z.array(
    z.string().min(0).max(256).regex(
      new RegExp("^([{a-zA-Z}{\\s}{0-9}_.:\\*\\/=+\\-@%]*)$"),
    ),
  ).describe("A list of possible values an attribute can take."),
});

const StateSchema = z.object({
  CatalogId: z.string().optional(),
  TagKey: z.string(),
  TagValues: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your Lake Formation environment.",
  ).optional(),
  TagKey: z.string().min(1).max(128).regex(
    new RegExp("^([{a-zA-Z}{\\s}{0-9}_.:\\/=+\\-@%]*)$"),
  ).describe("The key-name for the LF-tag.").optional(),
  TagValues: z.array(
    z.string().min(0).max(256).regex(
      new RegExp("^([{a-zA-Z}{\\s}{0-9}_.:\\*\\/=+\\-@%]*)$"),
    ),
  ).describe("A list of possible values an attribute can take.").optional(),
});

export const model = {
  type: "@swamp/aws/lakeformation/tag",
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
      description: "LakeFormation Tag resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LakeFormation Tag",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::LakeFormation::Tag",
          desiredState,
        ) as StateData;
        const instanceName = (result.TagKey ?? g.TagKey)?.toString() ??
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
      description: "Get a LakeFormation Tag",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation Tag",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::LakeFormation::Tag",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.TagKey ?? context.globalArgs.TagKey)?.toString() ??
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
      description: "Update a LakeFormation Tag",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TagKey?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TagKey?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::LakeFormation::Tag",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::LakeFormation::Tag",
          identifier,
          currentState,
          desiredState,
          ["CatalogId", "TagKey"],
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
      description: "Delete a LakeFormation Tag",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation Tag",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::LakeFormation::Tag",
          args.identifier,
        );
        const instanceName = context.globalArgs.TagKey?.toString() ??
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
      description: "Sync LakeFormation Tag state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TagKey?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TagKey?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::LakeFormation::Tag",
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
