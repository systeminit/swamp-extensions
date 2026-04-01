// Auto-generated extension model for @swamp/aws/budgets/budgets-action
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

export const SubscriberSchema = z.object({
  Type: z.enum(["SNS", "EMAIL"]),
  Address: z.string(),
});

export const IamActionDefinitionSchema = z.object({
  PolicyArn: z.string(),
  Roles: z.array(z.string()).optional(),
  Groups: z.array(z.string()).optional(),
  Users: z.array(z.string()).optional(),
});

export const ScpActionDefinitionSchema = z.object({
  PolicyId: z.string(),
  TargetIds: z.array(z.string()),
});

export const SsmActionDefinitionSchema = z.object({
  Subtype: z.enum(["STOP_EC2_INSTANCES", "STOP_RDS_INSTANCES"]),
  Region: z.string(),
  InstanceIds: z.array(z.string()),
});

export const ResourceTagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BudgetName: z.string(),
  NotificationType: z.enum(["ACTUAL", "FORECASTED"]),
  ActionType: z.enum([
    "APPLY_IAM_POLICY",
    "APPLY_SCP_POLICY",
    "RUN_SSM_DOCUMENTS",
  ]),
  ActionThreshold: z.object({
    Value: z.number(),
    Type: z.enum(["PERCENTAGE", "ABSOLUTE_VALUE"]),
  }),
  ExecutionRoleArn: z.string(),
  ApprovalModel: z.enum(["AUTOMATIC", "MANUAL"]).optional(),
  Subscribers: z.array(SubscriberSchema),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema.optional(),
    ScpActionDefinition: ScpActionDefinitionSchema.optional(),
    SsmActionDefinition: SsmActionDefinitionSchema.optional(),
  }),
  ResourceTags: z.array(ResourceTagSchema).optional(),
});

const StateSchema = z.object({
  ActionId: z.string(),
  BudgetName: z.string(),
  NotificationType: z.string().optional(),
  ActionType: z.string().optional(),
  ActionThreshold: z.object({
    Value: z.number(),
    Type: z.string(),
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  ApprovalModel: z.string().optional(),
  Subscribers: z.array(SubscriberSchema).optional(),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema,
    ScpActionDefinition: ScpActionDefinitionSchema,
    SsmActionDefinition: SsmActionDefinitionSchema,
  }).optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BudgetName: z.string().optional(),
  NotificationType: z.enum(["ACTUAL", "FORECASTED"]).optional(),
  ActionType: z.enum([
    "APPLY_IAM_POLICY",
    "APPLY_SCP_POLICY",
    "RUN_SSM_DOCUMENTS",
  ]).optional(),
  ActionThreshold: z.object({
    Value: z.number().optional(),
    Type: z.enum(["PERCENTAGE", "ABSOLUTE_VALUE"]).optional(),
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  ApprovalModel: z.enum(["AUTOMATIC", "MANUAL"]).optional(),
  Subscribers: z.array(SubscriberSchema).optional(),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema.optional(),
    ScpActionDefinition: ScpActionDefinitionSchema.optional(),
    SsmActionDefinition: SsmActionDefinitionSchema.optional(),
  }).optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/budgets/budgets-action",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Budgets BudgetsAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Budgets BudgetsAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Budgets::BudgetsAction",
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
      description: "Get a Budgets BudgetsAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Budgets BudgetsAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Budgets::BudgetsAction",
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
      description: "Update a Budgets BudgetsAction",
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
          existing.ActionId?.toString(),
          existing.BudgetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Budgets::BudgetsAction",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Budgets::BudgetsAction",
          identifier,
          currentState,
          desiredState,
          ["ActionType", "BudgetName"],
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
      description: "Delete a Budgets BudgetsAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Budgets BudgetsAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Budgets::BudgetsAction",
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
      description: "Sync Budgets BudgetsAction state from AWS",
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
          existing.ActionId?.toString(),
          existing.BudgetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Budgets::BudgetsAction",
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
