// Auto-generated extension model for @swamp/aws/batch/scheduling-policy
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

export const ShareAttributesSchema = z.object({
  ShareIdentifier: z.string().optional(),
  WeightFactor: z.number().min(0).max(1000).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().describe("Name of Scheduling Policy.").optional(),
  FairsharePolicy: z.object({
    ShareDecaySeconds: z.number().min(0).max(604800).optional(),
    ComputeReservation: z.number().min(0).max(99).optional(),
    ShareDistribution: z.array(ShareAttributesSchema).describe(
      "List of Share Attributes",
    ).optional(),
  }).describe("Fair Share Policy for the Job Queue.").optional(),
  QuotaSharePolicy: z.object({
    IdleResourceAssignmentStrategy: z.enum(["FIFO"]).optional(),
  }).describe("Quota Share Policy for the Job Queue.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Arn: z.string(),
  FairsharePolicy: z.object({
    ShareDecaySeconds: z.number(),
    ComputeReservation: z.number(),
    ShareDistribution: z.array(ShareAttributesSchema),
  }).optional(),
  QuotaSharePolicy: z.object({
    IdleResourceAssignmentStrategy: z.string(),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().describe("Name of Scheduling Policy.").optional(),
  FairsharePolicy: z.object({
    ShareDecaySeconds: z.number().min(0).max(604800).optional(),
    ComputeReservation: z.number().min(0).max(99).optional(),
    ShareDistribution: z.array(ShareAttributesSchema).describe(
      "List of Share Attributes",
    ).optional(),
  }).describe("Fair Share Policy for the Job Queue.").optional(),
  QuotaSharePolicy: z.object({
    IdleResourceAssignmentStrategy: z.enum(["FIFO"]).optional(),
  }).describe("Quota Share Policy for the Job Queue.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/batch/scheduling-policy",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Batch SchedulingPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch SchedulingPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Batch::SchedulingPolicy",
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
      description: "Get a Batch SchedulingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch SchedulingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Batch::SchedulingPolicy",
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
      description: "Update a Batch SchedulingPolicy",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::SchedulingPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Batch::SchedulingPolicy",
          identifier,
          currentState,
          desiredState,
          ["Name", "Tags"],
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
      description: "Delete a Batch SchedulingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch SchedulingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Batch::SchedulingPolicy",
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
      description: "Sync Batch SchedulingPolicy state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::SchedulingPolicy",
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
