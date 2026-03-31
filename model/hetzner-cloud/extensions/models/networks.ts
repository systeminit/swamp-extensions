// Auto-generated extension model for @swamp/hetzner-cloud/networks
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import { create, read, remove, tryRead, update } from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("Name of the [Network](#tag/networks)."),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  expose_routes_to_vswitch: z.boolean().describe(
    "Toggle to expose routes to the [Networks](#tag/networks) vSwitch.\n\nIndicates if the routes from this [Network](#tag/networks) should be exposed to the vSwitch in this [Network](#tag/networks). Only takes effect if a [vSwitch is setup](https://docs.hetzner.com/cloud/networks/connect-dedi-vswitch) in this [Network](#tag/networks).\n",
  ).optional(),
  ip_range: z.string().describe(
    "IP range of the [Network](#tag/networks).\n\nUses CIDR notation.\n\nMust span all included subnets. Must be one of the private IPv4 ranges of RFC1918.\n\nMinimum network size is /24. We highly recommend that you pick a larger [Network](#tag/networks) with a /16 netmask.\n",
  ),
  subnets: z.array(z.object({
    type: z.enum(["cloud", "server", "vswitch"]),
    ip_range: z.string().optional(),
    network_zone: z.string(),
    vswitch_id: z.number().int().optional(),
  })).describe("Array of subnets to allocate.").optional(),
  routes: z.array(z.object({
    destination: z.string(),
    gateway: z.string(),
  })).describe("Array of routes set in this [Network](#tag/networks).")
    .optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  ip_range: z.string().optional(),
  subnets: z.array(z.object({
    type: z.string().optional(),
    ip_range: z.string().optional(),
    network_zone: z.string().optional(),
    gateway: z.string().optional(),
    vswitch_id: z.number().optional(),
  })).optional(),
  routes: z.array(z.object({
    destination: z.string().optional(),
    gateway: z.string().optional(),
  })).optional(),
  servers: z.array(z.number()).optional(),
  load_balancers: z.array(z.number()).optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
  expose_routes_to_vswitch: z.boolean().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  expose_routes_to_vswitch: z.boolean().optional(),
  ip_range: z.string().optional(),
  subnets: z.array(z.object({
    type: z.enum(["cloud", "server", "vswitch"]),
    ip_range: z.string().optional(),
    network_zone: z.string(),
    vswitch_id: z.number().int().optional(),
  })).optional(),
  routes: z.array(z.object({
    destination: z.string(),
    gateway: z.string(),
  })).optional(),
});

export const model = {
  type: "@swamp/hetzner-cloud/networks",
  version: "2026.03.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Network resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a network",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.ip_range !== undefined) body.ip_range = g.ip_range;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.subnets !== undefined) body.subnets = g.subnets;
        if (g.routes !== undefined) body.routes = g.routes;
        if (g.expose_routes_to_vswitch !== undefined) {
          body.expose_routes_to_vswitch = g.expose_routes_to_vswitch;
        }
        const result = await create("/networks", body) as ResourceData;
        const instanceName = g.name?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a network",
      arguments: z.object({
        id: z.number().int().describe("The ID of the network"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read("/networks", args.id) as ResourceData;
        const instanceName = result.name?.toString() ?? args.id.toString();
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update network attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.expose_routes_to_vswitch !== undefined) {
          body.expose_routes_to_vswitch = g.expose_routes_to_vswitch;
        }
        const result = await update(
          "/networks",
          existing.id,
          body,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the network",
      arguments: z.object({
        id: z.number().int().describe("The ID of the network"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove("/networks", args.id);
        const instanceName = context.globalArgs.name?.toString() ??
          args.id.toString();
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync network state from Hetzner",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead("/networks", existing.id) as
          | ResourceData
          | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
