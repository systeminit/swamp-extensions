// Auto-generated extension model for @swamp/gcp/backupdr/resourcebackupconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://backupdr.googleapis.com/";

const LIST_CONFIG = {
  "id": "backupdr.projects.locations.resourceBackupConfigs.list",
  "path": "v1/{+parent}/resourceBackupConfigs",
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
  backupConfigsDetails: z.array(z.object({
    applicableResource: z.string(),
    backupConfigSource: z.string(),
    backupConfigSourceDisplayName: z.string(),
    backupDrPlanConfig: z.object({
      backupDrPlanRules: z.array(z.object({
        lastSuccessfulBackupTime: z.string(),
        ruleId: z.string(),
      })),
    }),
    backupDrTemplateConfig: z.object({
      firstPartyManagementUri: z.string(),
      thirdPartyManagementUri: z.string(),
    }),
    backupLocations: z.array(z.object({
      locationId: z.string(),
      type: z.string(),
    })),
    backupVault: z.string(),
    latestSuccessfulBackupTime: z.string(),
    pitrSettings: z.object({
      retentionDays: z.number(),
    }),
    state: z.string(),
    type: z.string(),
  })).optional(),
  backupConfigured: z.boolean().optional(),
  name: z.string(),
  targetResource: z.string().optional(),
  targetResourceDisplayName: z.string().optional(),
  targetResourceLabels: z.record(z.string(), z.unknown()).optional(),
  targetResourceType: z.string().optional(),
  uid: z.string().optional(),
  vaulted: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/backupdr/resourcebackupconfigs",
  version: "2026.04.01.2",
  upgrades: [
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
      description:
        "ResourceBackupConfig represents a resource along with its backup configurations.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a resourceBackupConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the resourceBackupConfigs",
        ),
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
      description: "Sync resourceBackupConfigs state from GCP",
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
