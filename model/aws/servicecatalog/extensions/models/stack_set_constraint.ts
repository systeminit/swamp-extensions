// Auto-generated extension model for @swamp/aws/servicecatalog/stack-set-constraint
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().describe("The description of the constraint."),
  StackInstanceControl: z.string().describe(
    "Permission to create, update, and delete stack instances. Choose from ALLOWED and NOT_ALLOWED.",
  ),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  PortfolioId: z.string().describe("The portfolio identifier."),
  ProductId: z.string().describe("The product identifier."),
  RegionList: z.array(z.string()).describe(
    "One or more AWS Regions where the provisioned product will be available.",
  ),
  AdminRole: z.string().describe("AdminRole ARN."),
  AccountList: z.array(z.string()).describe(
    "One or more AWS accounts that will have access to the provisioned product.",
  ),
  ExecutionRole: z.string().describe("ExecutionRole name."),
});

const StateSchema = z.object({
  Id: z.string(),
  Description: z.string().optional(),
  StackInstanceControl: z.string().optional(),
  AcceptLanguage: z.string().optional(),
  PortfolioId: z.string().optional(),
  ProductId: z.string().optional(),
  RegionList: z.array(z.string()).optional(),
  AdminRole: z.string().optional(),
  AccountList: z.array(z.string()).optional(),
  ExecutionRole: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().describe("The description of the constraint.")
    .optional(),
  StackInstanceControl: z.string().describe(
    "Permission to create, update, and delete stack instances. Choose from ALLOWED and NOT_ALLOWED.",
  ).optional(),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  PortfolioId: z.string().describe("The portfolio identifier.").optional(),
  ProductId: z.string().describe("The product identifier.").optional(),
  RegionList: z.array(z.string()).describe(
    "One or more AWS Regions where the provisioned product will be available.",
  ).optional(),
  AdminRole: z.string().describe("AdminRole ARN.").optional(),
  AccountList: z.array(z.string()).describe(
    "One or more AWS accounts that will have access to the provisioned product.",
  ).optional(),
  ExecutionRole: z.string().describe("ExecutionRole name.").optional(),
});

export const model = {
  type: "@swamp/aws/servicecatalog/stack-set-constraint",
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
      description: "ServiceCatalog StackSetConstraint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ServiceCatalog StackSetConstraint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ServiceCatalog::StackSetConstraint",
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
      description: "Get a ServiceCatalog StackSetConstraint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog StackSetConstraint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ServiceCatalog::StackSetConstraint",
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
      description: "Update a ServiceCatalog StackSetConstraint",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ServiceCatalog::StackSetConstraint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ServiceCatalog::StackSetConstraint",
          identifier,
          currentState,
          desiredState,
          ["PortfolioId", "ProductId"],
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
      description: "Delete a ServiceCatalog StackSetConstraint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog StackSetConstraint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ServiceCatalog::StackSetConstraint",
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
      description: "Sync ServiceCatalog StackSetConstraint state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ServiceCatalog::StackSetConstraint",
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
