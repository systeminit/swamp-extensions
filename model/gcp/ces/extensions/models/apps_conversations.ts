// Auto-generated extension model for @swamp/gcp/ces/apps-conversations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversations/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.conversations.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "ces.projects.locations.apps.conversations.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
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
  appVersion: z.string().optional(),
  channelType: z.string().optional(),
  deployment: z.string().optional(),
  endTime: z.string().optional(),
  entryAgent: z.string().optional(),
  inputTypes: z.array(z.string()).optional(),
  languageCode: z.string().optional(),
  messages: z.array(z.object({
    chunks: z.array(z.object({
      agentTransfer: z.object({
        displayName: z.string(),
        targetAgent: z.string(),
      }),
      blob: z.object({
        data: z.string(),
        mimeType: z.string(),
      }),
      defaultVariables: z.record(z.string(), z.unknown()),
      image: z.object({
        data: z.string(),
        mimeType: z.string(),
      }),
      payload: z.record(z.string(), z.unknown()),
      text: z.string(),
      toolCall: z.object({
        args: z.record(z.string(), z.unknown()),
        displayName: z.string(),
        id: z.string(),
        tool: z.string(),
        toolsetTool: z.object({
          toolId: z.string(),
          toolset: z.string(),
        }),
      }),
      toolResponse: z.object({
        displayName: z.string(),
        id: z.string(),
        response: z.record(z.string(), z.unknown()),
        tool: z.string(),
        toolsetTool: z.object({
          toolId: z.string(),
          toolset: z.string(),
        }),
      }),
      transcript: z.string(),
      updatedVariables: z.record(z.string(), z.unknown()),
    })),
    eventTime: z.string(),
    role: z.string(),
  })).optional(),
  name: z.string(),
  source: z.string().optional(),
  startTime: z.string().optional(),
  turnCount: z.number().optional(),
  turns: z.array(z.object({
    messages: z.array(z.object({
      chunks: z.array(z.object({
        agentTransfer: z.object({
          displayName: z.string(),
          targetAgent: z.string(),
        }),
        blob: z.object({
          data: z.string(),
          mimeType: z.string(),
        }),
        defaultVariables: z.record(z.string(), z.unknown()),
        image: z.object({
          data: z.string(),
          mimeType: z.string(),
        }),
        payload: z.record(z.string(), z.unknown()),
        text: z.string(),
        toolCall: z.object({
          args: z.record(z.string(), z.unknown()),
          displayName: z.string(),
          id: z.string(),
          tool: z.string(),
          toolsetTool: z.object({
            toolId: z.string(),
            toolset: z.string(),
          }),
        }),
        toolResponse: z.object({
          displayName: z.string(),
          id: z.string(),
          response: z.record(z.string(), z.unknown()),
          tool: z.string(),
          toolsetTool: z.object({
            toolId: z.string(),
            toolset: z.string(),
          }),
        }),
        transcript: z.string(),
        updatedVariables: z.record(z.string(), z.unknown()),
      })),
      eventTime: z.string(),
      role: z.string(),
    })),
    rootSpan: z.object({
      attributes: z.record(z.string(), z.unknown()),
      childSpans: z.array(z.string()),
      duration: z.string(),
      endTime: z.string(),
      name: z.string(),
      startTime: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/ces/apps-conversations",
  version: "2026.04.03.3",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A conversation represents an interaction between an end user and the CES app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the conversations",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync conversations state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        conversations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["conversations"] !== undefined) {
          body["conversations"] = args["conversations"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "ces.projects.locations.apps.conversations.batchDelete",
            "path": "v1/{+parent}/conversations:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
