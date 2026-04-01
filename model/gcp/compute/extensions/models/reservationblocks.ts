// Auto-generated extension model for @swamp/gcp/compute/reservationblocks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.reservationBlocks.get",
  "path":
    "projects/{project}/zones/{zone}/reservations/{reservation}/reservationBlocks/{reservationBlock}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "reservation",
    "reservationBlock",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "reservation": {
      "location": "path",
      "required": true,
    },
    "reservationBlock": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
    "zone": {
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
  resource: z.object({
    count: z.number(),
    creationTimestamp: z.string(),
    healthInfo: z.object({
      degradedSubBlockCount: z.number(),
      healthStatus: z.string(),
      healthySubBlockCount: z.number(),
    }),
    id: z.string(),
    inUseCount: z.number(),
    inUseHostCount: z.number(),
    kind: z.string(),
    name: z.string(),
    physicalTopology: z.object({
      block: z.string(),
      cluster: z.string(),
      instances: z.array(z.object({
        instanceId: z.string(),
        physicalHostTopology: z.object({
          host: z.string(),
          subBlock: z.string(),
        }),
        projectId: z.string(),
      })),
    }),
    reservationMaintenance: z.object({
      instanceMaintenanceOngoingCount: z.number(),
      instanceMaintenancePendingCount: z.number(),
      maintenanceOngoingCount: z.number(),
      maintenancePendingCount: z.number(),
      schedulingType: z.string(),
      subblockInfraMaintenanceOngoingCount: z.number(),
      subblockInfraMaintenancePendingCount: z.number(),
      upcomingGroupMaintenance: z.object({
        canReschedule: z.boolean(),
        latestWindowStartTime: z.string(),
        maintenanceOnShutdown: z.boolean(),
        maintenanceReasons: z.array(z.string()),
        maintenanceStatus: z.string(),
        type: z.string(),
        windowEndTime: z.string(),
        windowStartTime: z.string(),
      }),
    }),
    reservationSubBlockCount: z.number(),
    reservationSubBlockInUseCount: z.number(),
    selfLink: z.string(),
    selfLinkWithId: z.string(),
    status: z.string(),
    zone: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/compute/reservationblocks",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
        "Retrieves information about the specified reservation block.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reservationBlocks",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservationBlocks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["reservation"] !== undefined) {
          params["reservation"] = String(g["reservation"]);
        }
        params["reservationBlock"] = args.identifier;
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
      description: "Sync reservationBlocks state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          if (g["reservation"] !== undefined) {
            params["reservation"] = String(g["reservation"]);
          } else if (existing["reservation"]) {
            params["reservation"] = String(existing["reservation"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reservationBlock"] = identifier;
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
    perform_maintenance: {
      description: "perform maintenance",
      arguments: z.object({
        maintenanceScope: z.any().optional(),
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
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["reservation"] = existing["reservation"]?.toString() ??
          g["reservation"]?.toString() ?? "";
        params["reservationBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["maintenanceScope"] !== undefined) {
          body["maintenanceScope"] = args["maintenanceScope"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationBlocks.performMaintenance",
            "path":
              "projects/{project}/zones/{zone}/reservations/{reservation}/reservationBlocks/{reservationBlock}/performMaintenance",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "reservation",
              "reservationBlock",
            ],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservation": { "location": "path", "required": true },
              "reservationBlock": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
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
