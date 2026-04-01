// Auto-generated extension model for @swamp/gcp/apigee/environments-resourcefiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.environments.resourcefiles.get",
  "path": "v1/{+parent}/resourcefiles/{type}/{name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
    "type",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "apigee.organizations.environments.resourcefiles.create",
  "path": "v1/{+parent}/resourcefiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "name": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "apigee.organizations.environments.resourcefiles.update",
  "path": "v1/{+parent}/resourcefiles/{type}/{name}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "parent",
    "type",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "apigee.organizations.environments.resourcefiles.delete",
  "path": "v1/{+parent}/resourcefiles/{type}/{name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "parent",
    "type",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  contentType: z.string().describe(
    "The HTTP Content-Type header value specifying the content type of the body.",
  ).optional(),
  data: z.string().describe("The HTTP request/response body as raw binary.")
    .optional(),
  extensions: z.array(z.record(z.string(), z.string())).describe(
    "Application specific response metadata. Must be set in the first response for streaming APIs.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the resource file. Must match the regular expression: [a-zA-Z0-9:/\\\\!@#$%^&{}\\[\\]()+\\-=,.~'` ]{1,255}",
  ).optional(),
  type: z.string().describe(
    "Required. Resource file type. {{ resource_file_type }}",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  contentType: z.string().optional(),
  data: z.string().optional(),
  extensions: z.array(z.record(z.string(), z.unknown())).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  contentType: z.string().describe(
    "The HTTP Content-Type header value specifying the content type of the body.",
  ).optional(),
  data: z.string().describe("The HTTP request/response body as raw binary.")
    .optional(),
  extensions: z.array(z.record(z.string(), z.string())).describe(
    "Application specific response metadata. Must be set in the first response for streaming APIs.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the resource file. Must match the regular expression: [a-zA-Z0-9:/\\\\!@#$%^&{}\\[\\]()+\\-=,.~'` ]{1,255}",
  ).optional(),
  type: z.string().describe(
    "Required. Resource file type. {{ resource_file_type }}",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/apigee/environments-resourcefiles",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Message that represents an arbitrary HTTP body. It should only be used for pa...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a resourcefiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["contentType"] !== undefined) {
          body["contentType"] = g["contentType"];
        }
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["extensions"] !== undefined) body["extensions"] = g["extensions"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["type"] !== undefined) params["type"] = String(g["type"]);
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a resourcefiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourcefiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (g["type"] !== undefined) params["type"] = String(g["type"]);
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ??
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
      description: "Update resourcefiles attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        else if (existing["parent"]) {
          params["parent"] = String(existing["parent"]);
        }
        if (g["type"] !== undefined) params["type"] = String(g["type"]);
        else if (existing["type"]) params["type"] = String(existing["type"]);
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["contentType"] !== undefined) {
          body["contentType"] = g["contentType"];
        }
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["extensions"] !== undefined) body["extensions"] = g["extensions"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the resourcefiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourcefiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (g["type"] !== undefined) params["type"] = String(g["type"]);
        params["name"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = g.name?.toString() ?? args.identifier;
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
      description: "Sync resourcefiles state from GCP",
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
          if (g["type"] !== undefined) params["type"] = String(g["type"]);
          else if (existing["type"]) params["type"] = String(existing["type"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
    list_environment_resources: {
      description: "list environment resources",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (g["type"] !== undefined) params["type"] = String(g["type"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "apigee.organizations.environments.resourcefiles.listEnvironmentResources",
            "path": "v1/{+parent}/resourcefiles/{type}",
            "httpMethod": "GET",
            "parameterOrder": ["parent", "type"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "type": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
