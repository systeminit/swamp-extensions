// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines-sessions-events
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://aiplatform.googleapis.com/";

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.reasoningEngines.sessions.events.list",
  "path": "v1/{+parent}/events",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actions: z.object({
    artifactDelta: z.record(z.string(), z.unknown()),
    escalate: z.boolean(),
    requestedAuthConfigs: z.record(z.string(), z.unknown()),
    skipSummarization: z.boolean(),
    stateDelta: z.record(z.string(), z.unknown()),
    transferAgent: z.string(),
  }).optional(),
  author: z.string().optional(),
  content: z.object({
    parts: z.array(z.object({
      codeExecutionResult: z.object({
        outcome: z.string(),
        output: z.string(),
      }),
      executableCode: z.object({
        code: z.string(),
        language: z.string(),
      }),
      fileData: z.object({
        displayName: z.string(),
        fileUri: z.string(),
        mimeType: z.string(),
      }),
      functionCall: z.object({
        args: z.record(z.string(), z.unknown()),
        name: z.string(),
        partialArgs: z.array(z.object({
          boolValue: z.boolean(),
          jsonPath: z.string(),
          nullValue: z.string(),
          numberValue: z.number(),
          stringValue: z.string(),
          willContinue: z.boolean(),
        })),
        willContinue: z.boolean(),
      }),
      functionResponse: z.object({
        name: z.string(),
        parts: z.array(z.object({
          fileData: z.object({
            displayName: z.string(),
            fileUri: z.string(),
            mimeType: z.string(),
          }),
          inlineData: z.object({
            data: z.string(),
            displayName: z.string(),
            mimeType: z.string(),
          }),
        })),
        response: z.record(z.string(), z.unknown()),
        scheduling: z.string(),
      }),
      inlineData: z.object({
        data: z.string(),
        displayName: z.string(),
        mimeType: z.string(),
      }),
      mediaResolution: z.object({
        level: z.string(),
      }),
      text: z.string(),
      thought: z.boolean(),
      thoughtSignature: z.string(),
      videoMetadata: z.object({
        endOffset: z.string(),
        fps: z.number(),
        startOffset: z.string(),
      }),
    })),
    role: z.string(),
  }).optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  eventMetadata: z.object({
    branch: z.string(),
    customMetadata: z.record(z.string(), z.unknown()),
    groundingMetadata: z.object({
      googleMapsWidgetContextToken: z.string(),
      groundingChunks: z.array(z.object({
        image: z.object({
          domain: z.string(),
          imageUri: z.string(),
          sourceUri: z.string(),
          title: z.string(),
        }),
        maps: z.object({
          placeAnswerSources: z.object({
            reviewSnippets: z.array(z.object({
              googleMapsUri: z.string(),
              reviewId: z.string(),
              title: z.string(),
            })),
          }),
          placeId: z.string(),
          route: z.object({
            distanceMeters: z.number(),
            duration: z.string(),
            encodedPolyline: z.string(),
          }),
          text: z.string(),
          title: z.string(),
          uri: z.string(),
        }),
        retrievedContext: z.object({
          documentName: z.string(),
          ragChunk: z.object({
            pageSpan: z.object({
              firstPage: z.number(),
              lastPage: z.number(),
            }),
            text: z.string(),
          }),
          text: z.string(),
          title: z.string(),
          uri: z.string(),
        }),
        web: z.object({
          domain: z.string(),
          title: z.string(),
          uri: z.string(),
        }),
      })),
      groundingSupports: z.array(z.object({
        confidenceScores: z.array(z.number()),
        groundingChunkIndices: z.array(z.number()),
        renderedParts: z.array(z.number()),
        segment: z.object({
          endIndex: z.number(),
          partIndex: z.number(),
          startIndex: z.number(),
          text: z.string(),
        }),
      })),
      imageSearchQueries: z.array(z.string()),
      retrievalMetadata: z.object({
        googleSearchDynamicRetrievalScore: z.number(),
      }),
      searchEntryPoint: z.object({
        renderedContent: z.string(),
        sdkBlob: z.string(),
      }),
      sourceFlaggingUris: z.array(z.object({
        flagContentUri: z.string(),
        sourceId: z.string(),
      })),
      webSearchQueries: z.array(z.string()),
    }),
    inputTranscription: z.object({
      finished: z.boolean(),
      text: z.string(),
    }),
    interrupted: z.boolean(),
    longRunningToolIds: z.array(z.string()),
    outputTranscription: z.object({
      finished: z.boolean(),
      text: z.string(),
    }),
    partial: z.boolean(),
    turnComplete: z.boolean(),
  }).optional(),
  invocationId: z.string().optional(),
  name: z.string(),
  rawEvent: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines-sessions-events",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An event represents a message from either the user or agent.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
      description: "Sync events state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
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
