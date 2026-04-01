// Auto-generated extension model for @swamp/gcp/compute/snapshotsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.snapshotSettings.get",
  "path": "projects/{project}/global/snapshotSettings",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.snapshotSettings.patch",
  "path": "projects/{project}/global/snapshotSettings",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  storageLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        name: z.string().describe(
          "Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified.",
        ).optional(),
      }),
    ).describe(
      "When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified.",
    ).optional(),
    policy: z.enum([
      "LOCAL_REGION",
      "NEAREST_MULTI_REGION",
      "SPECIFIC_LOCATIONS",
      "STORAGE_LOCATION_POLICY_UNSPECIFIED",
    ]).describe("The chosen location policy.").optional(),
  }).optional(),
});

const StateSchema = z.object({
  storageLocation: z.object({
    locations: z.record(z.string(), z.unknown()),
    policy: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  storageLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        name: z.string().describe(
          "Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified.",
        ).optional(),
      }),
    ).describe(
      "When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified.",
    ).optional(),
    policy: z.enum([
      "LOCAL_REGION",
      "NEAREST_MULTI_REGION",
      "SPECIFIC_LOCATIONS",
      "STORAGE_LOCATION_POLICY_UNSPECIFIED",
    ]).describe("The chosen location policy.").optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/gcp/compute/snapshotsettings",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Get snapshot settings.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a snapshotSettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the snapshotSettings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    update: {
      description: "Update snapshotSettings attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["storageLocation"] !== undefined) {
          body["storageLocation"] = g["storageLocation"];
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
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
    sync: {
      description: "Sync snapshotSettings state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
        try {
          const params: Record<string, string> = { project: projectId };
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
