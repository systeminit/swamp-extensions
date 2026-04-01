// Auto-generated extension model for @swamp/aws/batch/quota-share
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

export const QuotaShareCapacityLimitSchema = z.object({
  MaxCapacity: z.number().int().min(1).describe(
    "The maximum capacity available for the quota share. This value represents the maximum amount of resources that can be allocated to jobs in the quota share without borrowing",
  ),
  CapacityUnit: z.string().describe(
    "The unit of compute capacity for the capacityLimit.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  QuotaShareName: z.string().min(1).max(128).describe(
    "The name of the quota share.",
  ),
  JobQueue: z.string().describe(
    "The Amazon Resource Name (ARN) or name of the job queue.",
  ),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).describe(
    "The capacity limits for the quota share.",
  ),
  ResourceSharingConfiguration: z.object({
    Strategy: z.enum(["RESERVE", "LEND", "LEND_AND_BORROW"]).describe(
      "The resource sharing strategy.",
    ),
    BorrowLimit: z.number().int().min(-1).describe(
      "The maximum amount of compute capacity that can be borrowed. Use -1 for unlimited borrowing.",
    ).optional(),
  }).describe("The resource sharing configuration for the quota share."),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.enum(["ENABLED", "DISABLED"]).describe(
      "Whether preemption is enabled within the quota share.",
    ),
  }).describe("The preemption configuration for the quota share."),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the quota share.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  QuotaShareName: z.string().optional(),
  QuotaShareArn: z.string(),
  JobQueue: z.string().optional(),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).optional(),
  ResourceSharingConfiguration: z.object({
    Strategy: z.string(),
    BorrowLimit: z.number(),
  }).optional(),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.string(),
  }).optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  QuotaShareName: z.string().min(1).max(128).describe(
    "The name of the quota share.",
  ).optional(),
  JobQueue: z.string().describe(
    "The Amazon Resource Name (ARN) or name of the job queue.",
  ).optional(),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).describe(
    "The capacity limits for the quota share.",
  ).optional(),
  ResourceSharingConfiguration: z.object({
    Strategy: z.enum(["RESERVE", "LEND", "LEND_AND_BORROW"]).describe(
      "The resource sharing strategy.",
    ).optional(),
    BorrowLimit: z.number().int().min(-1).describe(
      "The maximum amount of compute capacity that can be borrowed. Use -1 for unlimited borrowing.",
    ).optional(),
  }).describe("The resource sharing configuration for the quota share.")
    .optional(),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.enum(["ENABLED", "DISABLED"]).describe(
      "Whether preemption is enabled within the quota share.",
    ).optional(),
  }).describe("The preemption configuration for the quota share.").optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the quota share.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/batch/quota-share",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Batch QuotaShare resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch QuotaShare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Batch::QuotaShare",
          desiredState,
        ) as StateData;
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
      description: "Get a Batch QuotaShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch QuotaShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Batch::QuotaShare",
          args.identifier,
        ) as StateData;
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Update a Batch QuotaShare",
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.QuotaShareArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::QuotaShare",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Batch::QuotaShare",
          identifier,
          currentState,
          desiredState,
          ["QuotaShareName", "JobQueue"],
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
      description: "Delete a Batch QuotaShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch QuotaShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Batch::QuotaShare",
          args.identifier,
        );
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Sync Batch QuotaShare state from AWS",
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.QuotaShareArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::QuotaShare",
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
