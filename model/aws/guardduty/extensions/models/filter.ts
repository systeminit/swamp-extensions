// Auto-generated extension model for @swamp/aws/guardduty/filter
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

export const ConditionSchema = z.object({
  Lt: z.number().int().optional(),
  Gt: z.number().int().optional(),
  Gte: z.number().int().optional(),
  Neq: z.array(z.string()).optional(),
  Eq: z.array(z.string()).optional(),
  Lte: z.number().int().optional(),
  Equals: z.array(z.string()).optional(),
  GreaterThan: z.number().int().optional(),
  GreaterThanOrEqual: z.number().int().optional(),
  LessThan: z.number().int().optional(),
  LessThanOrEqual: z.number().int().optional(),
  NotEquals: z.array(z.string()).optional(),
});

export const TagItemSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Action: z.string().optional(),
  Description: z.string().optional(),
  DetectorId: z.string().min(1).max(300),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), ConditionSchema).optional(),
  }),
  Rank: z.number().int().min(1).max(100).optional(),
  Name: z.string().min(1).max(64),
  Tags: z.array(TagItemSchema).optional(),
});

const StateSchema = z.object({
  Action: z.string().optional(),
  Description: z.string().optional(),
  DetectorId: z.string(),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), z.unknown()),
  }).optional(),
  Rank: z.number().optional(),
  Name: z.string(),
  Tags: z.array(TagItemSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Action: z.string().optional(),
  Description: z.string().optional(),
  DetectorId: z.string().min(1).max(300).optional(),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), ConditionSchema).optional(),
  }).optional(),
  Rank: z.number().int().min(1).max(100).optional(),
  Name: z.string().min(1).max(64).optional(),
  Tags: z.array(TagItemSchema).optional(),
});

export const model = {
  type: "@swamp/aws/guardduty/filter",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GuardDuty Filter resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GuardDuty Filter",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GuardDuty::Filter",
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
      description: "Get a GuardDuty Filter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GuardDuty Filter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GuardDuty::Filter",
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
      description: "Update a GuardDuty Filter",
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
        const idParts = [
          existing.DetectorId?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::GuardDuty::Filter",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GuardDuty::Filter",
          identifier,
          currentState,
          desiredState,
          ["DetectorId", "Name"],
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
      description: "Delete a GuardDuty Filter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GuardDuty Filter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GuardDuty::Filter",
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
      description: "Sync GuardDuty Filter state from AWS",
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
        const idParts = [
          existing.DetectorId?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::GuardDuty::Filter",
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
