// Auto-generated extension model for @swamp/gcp/workloadmanager/discoveredprofiles-health
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://workloadmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "workloadmanager.projects.locations.discoveredprofiles.health.get",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  checkTime: z.string().optional(),
  componentsHealth: z.array(z.object({
    component: z.string(),
    componentHealthChecks: z.array(z.object({
      message: z.string(),
      metric: z.string(),
      resource: z.object({
        instanceProperties: z.object({
          instanceNumber: z.string(),
          machineType: z.string(),
          roles: z.array(z.string()),
          sapInstanceProperties: z.object({
            agentStates: z.object({
              availableVersion: z.string(),
              hanaMonitoring: z.object({
                iamPermissions: z.array(z.object({
                  granted: z.boolean(),
                  name: z.string(),
                })),
                state: z.string(),
              }),
              installedVersion: z.string(),
              isFullyEnabled: z.boolean(),
              processMetrics: z.object({
                iamPermissions: z.array(z.object({
                  granted: z.boolean(),
                  name: z.string(),
                })),
                state: z.string(),
              }),
              systemDiscovery: z.object({
                iamPermissions: z.array(z.object({
                  granted: z.boolean(),
                  name: z.string(),
                })),
                state: z.string(),
              }),
            }),
            numbers: z.array(z.string()),
          }),
          status: z.string(),
          upcomingMaintenanceEvent: z.object({
            endTime: z.string(),
            maintenanceStatus: z.string(),
            onHostMaintenance: z.string(),
            startTime: z.string(),
            type: z.string(),
          }),
        }),
        kind: z.string(),
        name: z.string(),
      }),
      source: z.string(),
      state: z.string(),
    })),
    componentHealthType: z.string(),
    state: z.string(),
    subComponentsHealth: z.array(z.string()),
  })).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/workloadmanager/discoveredprofiles-health",
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
        "WorkloadProfileHealth contains the detailed health check of workload.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a health",
      arguments: z.object({
        identifier: z.string().describe("The name of the health"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Sync health state from GCP",
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
  },
};
