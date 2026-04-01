// Auto-generated extension model for @swamp/aws/ses/dedicated-ip-pool
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  PoolName: z.string().regex(new RegExp("^[a-z0-9_-]{0,64}$")).describe(
    "The name of the dedicated IP pool.",
  ).optional(),
  ScalingMode: z.string().regex(new RegExp("^(STANDARD|MANAGED)$")).describe(
    "Specifies whether the dedicated IP pool is managed or not. The default value is STANDARD.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the dedicated IP pool.",
  ).optional(),
});

const StateSchema = z.object({
  PoolName: z.string(),
  ScalingMode: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  PoolName: z.string().regex(new RegExp("^[a-z0-9_-]{0,64}$")).describe(
    "The name of the dedicated IP pool.",
  ).optional(),
  ScalingMode: z.string().regex(new RegExp("^(STANDARD|MANAGED)$")).describe(
    "Specifies whether the dedicated IP pool is managed or not. The default value is STANDARD.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the dedicated IP pool.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ses/dedicated-ip-pool",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SES DedicatedIpPool resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES DedicatedIpPool",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::DedicatedIpPool",
          desiredState,
        ) as StateData;
        const instanceName = (result.PoolName ?? g.PoolName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SES DedicatedIpPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES DedicatedIpPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::DedicatedIpPool",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.PoolName ?? context.globalArgs.PoolName)?.toString() ??
            args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SES DedicatedIpPool",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.PoolName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PoolName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::DedicatedIpPool",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::DedicatedIpPool",
          identifier,
          currentState,
          desiredState,
          ["PoolName"],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a SES DedicatedIpPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES DedicatedIpPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::DedicatedIpPool",
          args.identifier,
        );
        const instanceName = context.globalArgs.PoolName?.toString() ??
          args.identifier;
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync SES DedicatedIpPool state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.PoolName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PoolName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::DedicatedIpPool",
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
              identifier,
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
