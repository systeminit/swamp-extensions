// Auto-generated extension model for @swamp/gcp/workloadmanager/discoveredprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/discoveredprofiles/${shortName}`;
}

const BASE_URL = "https://workloadmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "workloadmanager.projects.locations.discoveredprofiles.get",
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  refreshedTime: z.string().optional(),
  sapWorkload: z.object({
    application: z.object({
      databaseProperties: z.object({
        backupProperties: z.object({
          latestBackupStatus: z.string(),
          latestBackupTime: z.string(),
        }),
        databaseType: z.string(),
      }),
      haHosts: z.array(z.string()),
      resources: z.array(z.object({
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
      })),
      sid: z.string(),
      topologyType: z.string(),
    }),
    architecture: z.string(),
    database: z.object({
      databaseProperties: z.object({
        backupProperties: z.object({
          latestBackupStatus: z.string(),
          latestBackupTime: z.string(),
        }),
        databaseType: z.string(),
      }),
      haHosts: z.array(z.string()),
      resources: z.array(z.object({
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
      })),
      sid: z.string(),
      topologyType: z.string(),
    }),
    metadata: z.record(z.string(), z.unknown()),
    products: z.array(z.object({
      name: z.string(),
      version: z.string(),
    })),
  }).optional(),
  workloadType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/workloadmanager/discoveredprofiles",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Workload resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a discoveredprofiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the discoveredprofiles"),
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
      description: "Sync discoveredprofiles state from GCP",
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
  },
};
