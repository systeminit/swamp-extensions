// Auto-generated extension model for @swamp/gcp/drive/accessproposals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const GET_CONFIG = {
  "id": "drive.accessproposals.get",
  "path": "files/{fileId}/accessproposals/{proposalId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "proposalId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "proposalId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  fileId: z.string().optional(),
  proposalId: z.string().optional(),
  recipientEmailAddress: z.string().optional(),
  requestMessage: z.string().optional(),
  requesterEmailAddress: z.string().optional(),
  rolesAndViews: z.array(z.object({
    role: z.string(),
    view: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/drive/accessproposals",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Manage outstanding access proposals on a file.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a accessproposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the accessproposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["proposalId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync accessproposals state from GCP",
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
          if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
          else if (existing["fileId"]) {
            params["fileId"] = String(existing["fileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["proposalId"] = identifier;
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
    resolve: {
      description: "resolve",
      arguments: z.object({
        action: z.any().optional(),
        role: z.any().optional(),
        sendNotification: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["fileId"] = existing["fileId"]?.toString() ??
          g["fileId"]?.toString() ?? "";
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["role"] !== undefined) body["role"] = args["role"];
        if (args["sendNotification"] !== undefined) {
          body["sendNotification"] = args["sendNotification"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.accessproposals.resolve",
            "path": "files/{fileId}/accessproposals/{proposalId}:resolve",
            "httpMethod": "POST",
            "parameterOrder": ["fileId", "proposalId"],
            "parameters": {
              "fileId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
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
