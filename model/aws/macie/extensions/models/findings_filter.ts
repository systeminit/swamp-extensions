// Auto-generated extension model for @swamp/aws/macie/findings-filter
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

export const CriterionAdditionalPropertiesSchema = z.object({
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  eq: z.array(z.string()).optional(),
  neq: z.array(z.string()).optional(),
});

export const TagSchema = z.object({
  Key: z.string().describe("The tag's key."),
  Value: z.string().describe("The tag's value."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().describe("Findings filter name"),
  Description: z.string().describe("Findings filter description").optional(),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), CriterionAdditionalPropertiesSchema)
      .describe("Map of filter criteria.").optional(),
  }).describe("Findings filter criteria."),
  Action: z.enum(["ARCHIVE", "NOOP"]).describe("Findings filter action.")
    .optional(),
  Position: z.number().int().describe("Findings filter position.").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), z.unknown()),
  }).optional(),
  Action: z.string().optional(),
  Position: z.number().optional(),
  Id: z.string(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().describe("Findings filter name").optional(),
  Description: z.string().describe("Findings filter description").optional(),
  FindingCriteria: z.object({
    Criterion: z.record(z.string(), CriterionAdditionalPropertiesSchema)
      .describe("Map of filter criteria.").optional(),
  }).describe("Findings filter criteria.").optional(),
  Action: z.enum(["ARCHIVE", "NOOP"]).describe("Findings filter action.")
    .optional(),
  Position: z.number().int().describe("Findings filter position.").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/macie/findings-filter",
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
      description: "Macie FindingsFilter resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Macie FindingsFilter",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Macie::FindingsFilter",
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
      description: "Get a Macie FindingsFilter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Macie FindingsFilter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Macie::FindingsFilter",
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
      description: "Update a Macie FindingsFilter",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Macie::FindingsFilter",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Macie::FindingsFilter",
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
      description: "Delete a Macie FindingsFilter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Macie FindingsFilter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Macie::FindingsFilter",
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
      description: "Sync Macie FindingsFilter state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Macie::FindingsFilter",
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
