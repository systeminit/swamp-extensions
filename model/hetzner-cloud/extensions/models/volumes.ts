// Auto-generated extension model for @swamp/hetzner-cloud/volumes
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import { create, read, remove, tryRead, update } from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("Name of the volume."),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  size: z.number().int().describe("Size of the Volume in GB."),
  automount: z.boolean().describe(
    "Auto-mount Volume after attach. `server` must be provided.",
  ).optional(),
  format: z.string().describe(
    "Format Volume after creation. One of: `xfs`, `ext4`.",
  ).optional(),
  location: z.string().describe(
    "Location to create the Volume in (can be omitted if Server is specified).",
  ).optional(),
  server: z.number().int().describe(
    "Server to which to attach the Volume once it's created (Volume will be created in the same Location as the server).",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  created: z.string().optional(),
  name: z.string().optional(),
  server: z.number().optional(),
  location: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    network_zone: z.string().optional(),
  }).optional(),
  size: z.number().optional(),
  linux_device: z.string().optional(),
  protection: z.object({
    delete: z.boolean().optional(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  status: z.string().optional(),
  format: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  size: z.number().int().optional(),
  automount: z.boolean().optional(),
  format: z.string().optional(),
  location: z.string().optional(),
  server: z.number().int().optional(),
});

export const model = {
  type: "@swamp/hetzner-cloud/volumes",
  version: "2026.03.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Volume resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a volume",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const body: Record<string, unknown> = {};
        if (g.size !== undefined) body.size = g.size;
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.automount !== undefined) body.automount = g.automount;
        if (g.format !== undefined) body.format = g.format;
        if (g.location !== undefined) body.location = g.location;
        if (g.server !== undefined) body.server = g.server;
        const result = await create("/volumes", body) as ResourceData;
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
      description: "Get a volume",
      arguments: z.object({
        id: z.number().int().describe("The ID of the volume"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read("/volumes", args.id) as ResourceData;
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
      description: "Update volume attributes",
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
        const result = await update(
          "/volumes",
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
      description: "Delete the volume",
      arguments: z.object({
        id: z.number().int().describe("The ID of the volume"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove("/volumes", args.id);
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
      description: "Sync volume state from Hetzner",
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
        const result = await tryRead("/volumes", existing.id) as
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
