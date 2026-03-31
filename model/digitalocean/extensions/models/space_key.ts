// Auto-generated extension model for @swamp/digitalocean/space-key
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("The access key's name.").optional(),
  grants: z.array(z.object({
    bucket: z.string(),
    permission: z.string(),
  })).describe("The list of permissions for the access key.").optional(),
});

const ResourceSchema = z.object({
  name: z.string().optional(),
  grants: z.array(z.object({
    bucket: z.string().optional(),
    permission: z.string().optional(),
  })).optional(),
  access_key: z.string().optional(),
  created_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  grants: z.array(z.object({
    bucket: z.string(),
    permission: z.string(),
  })).optional(),
});

export const model = {
  type: "@swamp/digitalocean/space-key",
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
      description: "Space Key resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a space key",
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
            "/v2/spaces/keys",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.grants !== undefined) body.grants = g.grants;
        const result = await create("/v2/spaces/keys", body) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a space key",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the space key",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read("/v2/spaces/keys", args.id) as ResourceData;
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
      description: "Update space key attributes",
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
        if (g.grants !== undefined) body.grants = g.grants;
        const result = await update(
          "/v2/spaces/keys",
          existing.accesskey ?? existing.id,
          body,
          "PATCH",
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
      description: "Delete the space key",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the space key",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/spaces/keys", args.id);
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
      description: "Sync space key state from DigitalOcean",
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
          "/v2/spaces/keys",
          existing.accesskey ?? existing.id,
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
          accesskey: existing.accesskey ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
