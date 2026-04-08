// Auto-generated extension model for @swamp/aws/bcmpricingcalculator/bill-scenario
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(64).describe("The name of the bill scenario")
    .optional(),
  BillInterval: z.object({
    Start: z.string().optional(),
    End: z.string().optional(),
  }).describe("The time period covered by the bill scenario").optional(),
  ExpiresAt: z.string().describe("The timestamp when the bill scenario expires")
    .optional(),
  CostCategoryGroupSharingPreferenceArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:ce::[0-9]{12}:costcategory/[a-f0-9-]{36}$"),
  ).describe("The ARN of the cost category group sharing preference")
    .optional(),
  GroupSharingPreference: z.enum(["OPEN", "PRIORITIZED", "RESTRICTED"])
    .describe("The group sharing preference for the bill scenario").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  BillInterval: z.object({
    Start: z.string(),
    End: z.string(),
  }).optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  ExpiresAt: z.string().optional(),
  FailureMessage: z.string().optional(),
  CostCategoryGroupSharingPreferenceArn: z.string().optional(),
  GroupSharingPreference: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(64).describe("The name of the bill scenario")
    .optional(),
  BillInterval: z.object({
    Start: z.string().optional(),
    End: z.string().optional(),
  }).describe("The time period covered by the bill scenario").optional(),
  ExpiresAt: z.string().describe("The timestamp when the bill scenario expires")
    .optional(),
  CostCategoryGroupSharingPreferenceArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:ce::[0-9]{12}:costcategory/[a-f0-9-]{36}$"),
  ).describe("The ARN of the cost category group sharing preference")
    .optional(),
  GroupSharingPreference: z.enum(["OPEN", "PRIORITIZED", "RESTRICTED"])
    .describe("The group sharing preference for the bill scenario").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/bcmpricingcalculator/bill-scenario",
  version: "2026.04.08.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BcmPricingCalculator BillScenario resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BcmPricingCalculator BillScenario",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BcmPricingCalculator::BillScenario",
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
      description: "Get a BcmPricingCalculator BillScenario",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BcmPricingCalculator BillScenario",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BcmPricingCalculator::BillScenario",
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
      description: "Update a BcmPricingCalculator BillScenario",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BcmPricingCalculator::BillScenario",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BcmPricingCalculator::BillScenario",
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
      description: "Delete a BcmPricingCalculator BillScenario",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BcmPricingCalculator BillScenario",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BcmPricingCalculator::BillScenario",
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
      description: "Sync BcmPricingCalculator BillScenario state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BcmPricingCalculator::BillScenario",
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
