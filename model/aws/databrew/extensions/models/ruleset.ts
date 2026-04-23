// Auto-generated extension model for @swamp/aws/databrew/ruleset
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataBrew Ruleset (AWS::DataBrew::Ruleset).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const SubstitutionValueSchema = z.object({
  ValueReference: z.string().min(2).max(128).regex(
    new RegExp("^:[A-Za-z0-9_]+$"),
  ).describe("Variable name"),
  Value: z.string().min(0).max(1024).describe("Value or column name"),
});

const ThresholdSchema = z.object({
  Value: z.number().describe("Threshold value for a rule"),
  Type: z.enum([
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN_OR_EQUAL",
    "GREATER_THAN",
    "LESS_THAN",
  ]).describe("Threshold type for a rule").optional(),
  Unit: z.enum(["COUNT", "PERCENTAGE"]).describe("Threshold unit for a rule")
    .optional(),
});

const ColumnSelectorSchema = z.object({
  Regex: z.string().min(1).max(255).describe(
    "A regular expression for selecting a column from a dataset",
  ).optional(),
  Name: z.string().min(1).max(255).describe(
    "The name of a column from a dataset",
  ).optional(),
});

const RuleSchema = z.object({
  Name: z.string().min(1).max(128).describe("Name of the rule"),
  Disabled: z.boolean().describe("Boolean value to disable/enable a rule")
    .optional(),
  CheckExpression: z.string().min(4).max(1024).regex(
    new RegExp("^[><0-9A-Za-z_.,:)(!= ]+$"),
  ).describe("Expression with rule conditions"),
  SubstitutionMap: z.array(SubstitutionValueSchema).optional(),
  Threshold: ThresholdSchema.optional(),
  ColumnSelectors: z.array(ColumnSelectorSchema).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(1).max(255).describe("Name of the Ruleset"),
  Description: z.string().max(1024).describe("Description of the Ruleset")
    .optional(),
  TargetArn: z.string().min(20).max(2048).describe(
    "Arn of the target resource (dataset) to apply the ruleset to",
  ),
  Rules: z.array(RuleSchema).describe(
    "List of the data quality rules in the ruleset",
  ),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  TargetArn: z.string().optional(),
  Rules: z.array(RuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(255).describe("Name of the Ruleset").optional(),
  Description: z.string().max(1024).describe("Description of the Ruleset")
    .optional(),
  TargetArn: z.string().min(20).max(2048).describe(
    "Arn of the target resource (dataset) to apply the ruleset to",
  ).optional(),
  Rules: z.array(RuleSchema).describe(
    "List of the data quality rules in the ruleset",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for DataBrew Ruleset. Registered at `@swamp/aws/databrew/ruleset`. */
export const model = {
  type: "@swamp/aws/databrew/ruleset",
  version: "2026.04.23.2",
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
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataBrew Ruleset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataBrew Ruleset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataBrew::Ruleset",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a DataBrew Ruleset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Ruleset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataBrew::Ruleset",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a DataBrew Ruleset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataBrew::Ruleset",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataBrew::Ruleset",
          identifier,
          currentState,
          desiredState,
          ["Name", "TargetArn"],
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
      description: "Delete a DataBrew Ruleset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Ruleset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataBrew::Ruleset",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync DataBrew Ruleset state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataBrew::Ruleset",
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
