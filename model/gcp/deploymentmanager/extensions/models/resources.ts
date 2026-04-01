// Auto-generated extension model for @swamp/gcp/deploymentmanager/resources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://deploymentmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "deploymentmanager.resources.get",
  "path":
    "deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/resources/{resource}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "deployment",
    "resource",
  ],
  "parameters": {
    "deployment": {
      "location": "path",
      "required": true,
    },
    "header.bypassBillingFilter": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "resource": {
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
  accessControl: z.object({
    gcpIamPolicy: z.string(),
  }).optional(),
  finalProperties: z.string().optional(),
  id: z.string().optional(),
  insertTime: z.string().optional(),
  manifest: z.string().optional(),
  name: z.string(),
  properties: z.string().optional(),
  type: z.string().optional(),
  update: z.object({
    accessControl: z.object({
      gcpIamPolicy: z.string(),
    }),
    error: z.object({
      errors: z.array(z.object({
        arguments: z.array(z.string()),
        code: z.string(),
        debugInfo: z.object({
          detail: z.string(),
          stackEntries: z.array(z.string()),
        }),
        errorDetails: z.array(z.object({
          errorInfo: z.object({
            domain: z.string(),
            metadatas: z.record(z.string(), z.unknown()),
            reason: z.string(),
          }),
          help: z.object({
            links: z.array(z.object({
              description: z.string(),
              url: z.string(),
            })),
          }),
          localizedMessage: z.object({
            locale: z.string(),
            message: z.string(),
          }),
          quotaInfo: z.object({
            dimensions: z.record(z.string(), z.unknown()),
            futureLimit: z.number(),
            limit: z.number(),
            limitName: z.string(),
            metricName: z.string(),
            rolloutStatus: z.string(),
          }),
        })),
        location: z.string(),
        message: z.string(),
      })),
    }),
    finalProperties: z.string(),
    intent: z.string(),
    manifest: z.string(),
    properties: z.string(),
    state: z.string(),
    warnings: z.array(z.object({
      code: z.string(),
      data: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      message: z.string(),
    })),
  }).optional(),
  updateTime: z.string().optional(),
  url: z.string().optional(),
  warnings: z.array(z.object({
    code: z.string(),
    data: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    message: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/deploymentmanager/resources",
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
      description: "Gets information about a single resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a resources",
      arguments: z.object({
        identifier: z.string().describe("The name of the resources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["deployment"] !== undefined) {
          params["deployment"] = String(g["deployment"]);
        }
        params["resource"] = args.identifier;
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
      description: "Sync resources state from GCP",
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
          if (g["deployment"] !== undefined) {
            params["deployment"] = String(g["deployment"]);
          } else if (existing["deployment"]) {
            params["deployment"] = String(existing["deployment"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resource"] = identifier;
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
  },
};
