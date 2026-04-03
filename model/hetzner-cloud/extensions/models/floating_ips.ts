// Auto-generated extension model for @swamp/hetzner-cloud/floating-ips
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import { create, read, remove, tryRead, update } from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  description: z.string().describe("Description of the Resource.").optional(),
  name: z.string().describe("Name of the Resource. Must be unique per Project.")
    .optional(),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  type: z.enum(["ipv4", "ipv6"]).describe("The Floating IP type."),
  server: z.number().int().describe(
    "[Server](#tag/servers) the [Floating IP](#tag/floating-ips) is assigned to.\n\n`null` if not assigned.\n",
  ).optional(),
  home_location: z.string().describe(
    "Home [Location](#tag/locations) for the [Floating IP](#tag/floating-ips).\n\nEither the ID or the name of the [Location](#tag/locations).\n\nOnly optional if no [Server](#tag/servers) is provided. Routing is optimized for this [Locations](#tag/locations).\n",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  ip: z.string().optional(),
  type: z.string().optional(),
  server: z.number().optional(),
  dns_ptr: z.array(z.object({
    ip: z.string().optional(),
    dns_ptr: z.string().optional(),
  })).optional(),
  home_location: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    network_zone: z.string().optional(),
  }).optional(),
  blocked: z.boolean().optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  type: z.enum(["ipv4", "ipv6"]).optional(),
  server: z.number().int().optional(),
  home_location: z.string().optional(),
});

export const model = {
  type: "@swamp/hetzner-cloud/floating-ips",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Floating ip resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a floating ip",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.type !== undefined) body.type = g.type;
        if (g.server !== undefined) body.server = g.server;
        if (g.home_location !== undefined) body.home_location = g.home_location;
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await create("/floating_ips", body) as ResourceData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a floating ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the floating ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read("/floating_ips", args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update floating ip attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/floating_ips",
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
      description: "Delete the floating ip",
      arguments: z.object({
        id: z.number().int().describe("The ID of the floating ip"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove("/floating_ips", args.id);
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync floating ip state from Hetzner",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead("/floating_ips", existing.id) as
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
