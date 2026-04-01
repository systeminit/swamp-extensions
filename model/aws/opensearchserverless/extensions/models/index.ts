// Auto-generated extension model for @swamp/aws/opensearchserverless/index
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
  CollectionEndpoint: z.string().describe("The endpoint for the collection."),
  IndexName: z.string().regex(new RegExp("^(?![_-])[a-z][a-z0-9_-]*$"))
    .describe("The name of the OpenSearch Serverless index."),
  Settings: z.object({
    Index: z.object({
      RefreshInterval: z.string().describe(
        "How often to perform refresh operation (e.g. '1s', '5s')",
      ).optional(),
      Knn: z.boolean().describe(
        "Enable/disable k-nearest neighbor search capability",
      ).optional(),
      KnnAlgoParamEfSearch: z.number().int().describe(
        "Size of the dynamic list for the nearest neighbors",
      ).optional(),
    }).optional(),
  }).describe("Index settings").optional(),
  Mappings: z.object({
    Properties: z.record(z.string(), z.string()).describe(
      "Defines the fields within the mapping, including their types and configurations",
    ).optional(),
  }).describe("Index Mappings").optional(),
});

const StateSchema = z.object({
  CollectionEndpoint: z.string(),
  IndexName: z.string(),
  Settings: z.object({
    Index: z.object({
      RefreshInterval: z.string(),
      Knn: z.boolean(),
      KnnAlgoParamEfSearch: z.number(),
    }),
  }).optional(),
  Mappings: z.object({
    Properties: z.record(z.string(), z.unknown()),
  }).optional(),
  Uuid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CollectionEndpoint: z.string().describe("The endpoint for the collection.")
    .optional(),
  IndexName: z.string().regex(new RegExp("^(?![_-])[a-z][a-z0-9_-]*$"))
    .describe("The name of the OpenSearch Serverless index.").optional(),
  Settings: z.object({
    Index: z.object({
      RefreshInterval: z.string().describe(
        "How often to perform refresh operation (e.g. '1s', '5s')",
      ).optional(),
      Knn: z.boolean().describe(
        "Enable/disable k-nearest neighbor search capability",
      ).optional(),
      KnnAlgoParamEfSearch: z.number().int().describe(
        "Size of the dynamic list for the nearest neighbors",
      ).optional(),
    }).optional(),
  }).describe("Index settings").optional(),
  Mappings: z.object({
    Properties: z.record(z.string(), z.string()).describe(
      "Defines the fields within the mapping, including their types and configurations",
    ).optional(),
  }).describe("Index Mappings").optional(),
});

export const model = {
  type: "@swamp/aws/opensearchserverless/index",
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
      description: "OpenSearchServerless Index resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchServerless Index",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::OpenSearchServerless::Index",
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
      description: "Get a OpenSearchServerless Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::OpenSearchServerless::Index",
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
      description: "Update a OpenSearchServerless Index",
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
          existing.IndexName?.toString(),
          existing.CollectionEndpoint?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::OpenSearchServerless::Index",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchServerless::Index",
          identifier,
          currentState,
          desiredState,
          ["IndexName", "CollectionEndpoint"],
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
      description: "Delete a OpenSearchServerless Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::OpenSearchServerless::Index",
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
      description: "Sync OpenSearchServerless Index state from AWS",
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
          existing.IndexName?.toString(),
          existing.CollectionEndpoint?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::OpenSearchServerless::Index",
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
