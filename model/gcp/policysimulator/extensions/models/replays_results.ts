// Auto-generated extension model for @swamp/gcp/policysimulator/replays-results
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://policysimulator.googleapis.com/";

const LIST_CONFIG = {
  "id": "policysimulator.folders.locations.replays.results.list",
  "path": "v1/{+parent}/results",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessTuple: z.object({
    fullResourceName: z.string(),
    permission: z.string(),
    principal: z.string(),
  }).optional(),
  diff: z.object({
    accessDiff: z.object({
      accessChange: z.string(),
      baseline: z.object({
        accessState: z.string(),
        errors: z.array(z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        })),
        policies: z.array(z.object({
          access: z.string(),
          bindingExplanations: z.array(z.object({
            access: z.string(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            memberships: z.record(z.string(), z.unknown()),
            relevance: z.string(),
            role: z.string(),
            rolePermission: z.string(),
            rolePermissionRelevance: z.string(),
          })),
          fullResourceName: z.string(),
          policy: z.object({
            auditConfigs: z.array(z.object({
              auditLogConfigs: z.array(z.object({
                exemptedMembers: z.array(z.string()),
                logType: z.string(),
              })),
              service: z.string(),
            })),
            bindings: z.array(z.object({
              condition: z.object({
                description: z.string(),
                expression: z.string(),
                location: z.string(),
                title: z.string(),
              }),
              members: z.array(z.string()),
              role: z.string(),
            })),
            etag: z.string(),
            version: z.number(),
          }),
          relevance: z.string(),
        })),
      }),
      simulated: z.object({
        accessState: z.string(),
        errors: z.array(z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        })),
        policies: z.array(z.object({
          access: z.string(),
          bindingExplanations: z.array(z.object({
            access: z.string(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            memberships: z.record(z.string(), z.unknown()),
            relevance: z.string(),
            role: z.string(),
            rolePermission: z.string(),
            rolePermissionRelevance: z.string(),
          })),
          fullResourceName: z.string(),
          policy: z.object({
            auditConfigs: z.array(z.object({
              auditLogConfigs: z.array(z.object({
                exemptedMembers: z.array(z.string()),
                logType: z.string(),
              })),
              service: z.string(),
            })),
            bindings: z.array(z.object({
              condition: z.object({
                description: z.string(),
                expression: z.string(),
                location: z.string(),
                title: z.string(),
              }),
              members: z.array(z.string()),
              role: z.string(),
            })),
            etag: z.string(),
            version: z.number(),
          }),
          relevance: z.string(),
        })),
      }),
    }),
  }).optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  lastSeenDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  name: z.string(),
  parent: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/policysimulator/replays-results",
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
      description:
        "The result of replaying a single access tuple against a simulated state.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a results",
      arguments: z.object({
        identifier: z.string().describe("The name of the results"),
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
      description: "Sync results state from GCP",
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
