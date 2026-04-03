// Auto-generated extension model for @swamp/aws/resiliencehub/resiliency-policy
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

export const FailurePolicySchema = z.object({
  RtoInSecs: z.number().int().describe("RTO in seconds."),
  RpoInSecs: z.number().int().describe("RPO in seconds."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  PolicyName: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("Name of Resiliency Policy."),
  PolicyDescription: z.string().max(500).describe(
    "Description of Resiliency Policy.",
  ).optional(),
  DataLocationConstraint: z.enum([
    "AnyLocation",
    "SameContinent",
    "SameCountry",
  ]).describe("Data Location Constraint of the Policy.").optional(),
  Tier: z.enum([
    "MissionCritical",
    "Critical",
    "Important",
    "CoreServices",
    "NonCritical",
  ]).describe("Resiliency Policy Tier."),
  Policy: z.object({
    AZ: FailurePolicySchema.describe("Failure Policy."),
    Hardware: FailurePolicySchema.describe("Failure Policy."),
    Software: FailurePolicySchema.describe("Failure Policy."),
    Region: FailurePolicySchema.describe("Failure Policy.").optional(),
  }),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

const StateSchema = z.object({
  PolicyName: z.string().optional(),
  PolicyDescription: z.string().optional(),
  DataLocationConstraint: z.string().optional(),
  Tier: z.string().optional(),
  Policy: z.object({
    AZ: FailurePolicySchema,
    Hardware: FailurePolicySchema,
    Software: FailurePolicySchema,
    Region: FailurePolicySchema,
  }).optional(),
  PolicyArn: z.string(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  PolicyName: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("Name of Resiliency Policy.").optional(),
  PolicyDescription: z.string().max(500).describe(
    "Description of Resiliency Policy.",
  ).optional(),
  DataLocationConstraint: z.enum([
    "AnyLocation",
    "SameContinent",
    "SameCountry",
  ]).describe("Data Location Constraint of the Policy.").optional(),
  Tier: z.enum([
    "MissionCritical",
    "Critical",
    "Important",
    "CoreServices",
    "NonCritical",
  ]).describe("Resiliency Policy Tier.").optional(),
  Policy: z.object({
    AZ: FailurePolicySchema.describe("Failure Policy.").optional(),
    Hardware: FailurePolicySchema.describe("Failure Policy.").optional(),
    Software: FailurePolicySchema.describe("Failure Policy.").optional(),
    Region: FailurePolicySchema.describe("Failure Policy.").optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/resiliencehub/resiliency-policy",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description: "ResilienceHub ResiliencyPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ResilienceHub ResiliencyPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ResilienceHub::ResiliencyPolicy",
          desiredState,
        ) as StateData;
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
      description: "Get a ResilienceHub ResiliencyPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResilienceHub ResiliencyPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ResilienceHub::ResiliencyPolicy",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
    update: {
      description: "Update a ResilienceHub ResiliencyPolicy",
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ResilienceHub::ResiliencyPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ResilienceHub::ResiliencyPolicy",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a ResilienceHub ResiliencyPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ResilienceHub ResiliencyPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ResilienceHub::ResiliencyPolicy",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync ResilienceHub ResiliencyPolicy state from AWS",
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ResilienceHub::ResiliencyPolicy",
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
