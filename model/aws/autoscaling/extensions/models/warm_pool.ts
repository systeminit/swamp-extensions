// Auto-generated extension model for @swamp/aws/autoscaling/warm-pool
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

const GlobalArgsSchema = z.object({
  AutoScalingGroupName: z.string(),
  MaxGroupPreparedCapacity: z.number().int().optional(),
  MinSize: z.number().int().optional(),
  PoolState: z.string().optional(),
  InstanceReusePolicy: z.object({
    ReuseOnScaleIn: z.boolean().optional(),
  }).optional(),
});

const StateSchema = z.object({
  AutoScalingGroupName: z.string(),
  MaxGroupPreparedCapacity: z.number().optional(),
  MinSize: z.number().optional(),
  PoolState: z.string().optional(),
  InstanceReusePolicy: z.object({
    ReuseOnScaleIn: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AutoScalingGroupName: z.string().optional(),
  MaxGroupPreparedCapacity: z.number().int().optional(),
  MinSize: z.number().int().optional(),
  PoolState: z.string().optional(),
  InstanceReusePolicy: z.object({
    ReuseOnScaleIn: z.boolean().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/autoscaling/warm-pool",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AutoScaling WarmPool resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AutoScaling WarmPool",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AutoScaling::WarmPool",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.AutoScalingGroupName ?? g.AutoScalingGroupName)?.toString() ??
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
      description: "Get a AutoScaling WarmPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling WarmPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AutoScaling::WarmPool",
          args.identifier,
        ) as StateData;
        const instanceName = (result.AutoScalingGroupName ??
          context.globalArgs.AutoScalingGroupName)?.toString() ??
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
      description: "Update a AutoScaling WarmPool",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AutoScalingGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AutoScalingGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AutoScaling::WarmPool",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AutoScaling::WarmPool",
          identifier,
          currentState,
          desiredState,
          ["AutoScalingGroupName"],
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
      description: "Delete a AutoScaling WarmPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling WarmPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AutoScaling::WarmPool",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.AutoScalingGroupName?.toString() ??
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
      description: "Sync AutoScaling WarmPool state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AutoScalingGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AutoScalingGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AutoScaling::WarmPool",
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
