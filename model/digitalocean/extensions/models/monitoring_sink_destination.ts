// Auto-generated extension model for @swamp/digitalocean/monitoring-sink-destination
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("destination name").optional(),
  type: z.enum(["opensearch_dbaas", "opensearch_ext"]).describe(
    "The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n",
  ),
  config: z.object({
    credentials: z.object({
      username: z.string().optional(),
      password: z.string().optional(),
    }).optional(),
    endpoint: z.string(),
    cluster_uuid: z.string().optional(),
    cluster_name: z.string().optional(),
    index_name: z.string().optional(),
    retention_days: z.number().int().optional(),
  }),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  config: z.object({
    id: z.string().optional(),
    endpoint: z.string().optional(),
    cluster_uuid: z.string().optional(),
    cluster_name: z.string().optional(),
    index_name: z.string().optional(),
    retention_days: z.number().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["opensearch_dbaas", "opensearch_ext"]).optional(),
  config: z.object({
    credentials: z.object({
      username: z.string().optional(),
      password: z.string().optional(),
    }).optional(),
    endpoint: z.string(),
    cluster_uuid: z.string().optional(),
    cluster_name: z.string().optional(),
    index_name: z.string().optional(),
    retention_days: z.number().int().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/digitalocean/monitoring-sink-destination",
  version: "2026.03.27.2",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Monitoring Sink Destination resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a monitoring sink destination",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.name?.toString() ?? "current";
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/monitoring/sinks/destinations",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.config !== undefined) body.config = g.config;
        const result = await create(
          "/v2/monitoring/sinks/destinations",
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
    get: {
      description: "Get a monitoring sink destination",
      arguments: z.object({
        id: z.string().describe("The UUID of the monitoring sink destination"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const result = await read(
          "/v2/monitoring/sinks/destinations",
          args.id,
        ) as ResourceData;
        const instanceName = result.name?.toString() ?? args.id.toString();
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the monitoring sink destination",
      arguments: z.object({
        id: z.string().describe("The UUID of the monitoring sink destination"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const { existed } = await remove(
          "/v2/monitoring/sinks/destinations",
          args.id,
        );
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
      description: "Sync monitoring sink destination state from DigitalOcean",
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
        const result = await tryRead(
          "/v2/monitoring/sinks/destinations",
          existing.destinationuuid ?? existing.id,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          destinationuuid: existing.destinationuuid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
