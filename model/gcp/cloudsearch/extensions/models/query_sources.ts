// Auto-generated extension model for @swamp/gcp/cloudsearch/query-sources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudsearch.googleapis.com/";

const LIST_CONFIG = {
  "id": "cloudsearch.query.sources.list",
  "path": "v1/query/sources",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageToken": {
      "location": "query",
    },
    "requestOptions.debugOptions.enableDebugging": {
      "location": "query",
    },
    "requestOptions.languageCode": {
      "location": "query",
    },
    "requestOptions.searchApplicationId": {
      "location": "query",
    },
    "requestOptions.timeZone": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  operators: z.array(z.object({
    displayName: z.string(),
    enumValues: z.array(z.string()),
    greaterThanOperatorName: z.string(),
    isFacetable: z.boolean(),
    isRepeatable: z.boolean(),
    isReturnable: z.boolean(),
    isSortable: z.boolean(),
    isSuggestable: z.boolean(),
    lessThanOperatorName: z.string(),
    objectType: z.string(),
    operatorName: z.string(),
    type: z.string(),
  })).optional(),
  shortName: z.string().optional(),
  source: z.object({
    name: z.string(),
    predefinedSource: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/cloudsearch/query-sources",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "List of sources that the user can search using the query API.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a sources",
      arguments: z.object({
        identifier: z.string().describe("The name of the sources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
        ) as StateData;
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync sources state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
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
