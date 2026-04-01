// Auto-generated extension model for @swamp/aws/lambda/alias
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

export const VersionWeightSchema = z.object({
  FunctionWeight: z.number().describe(
    "The percentage of traffic that the alias routes to the second version.",
  ),
  FunctionVersion: z.string().describe("The qualifier of the second version."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FunctionName: z.string().describe("The name of the Lambda function."),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number().int().describe(
      "The amount of provisioned concurrency to allocate for the alias.",
    ),
  }).describe(
    "Specifies a provisioned concurrency configuration for a function's alias.",
  ).optional(),
  Description: z.string().describe("A description of the alias.").optional(),
  FunctionVersion: z.string().describe(
    "The function version that the alias invokes.",
  ),
  RoutingConfig: z.object({
    AdditionalVersionWeights: z.array(VersionWeightSchema).describe(
      "The second version, and the percentage of traffic that's routed to it.",
    ).optional(),
  }).describe("The routing configuration of the alias.").optional(),
  Name: z.string().describe("The name of the alias."),
});

const StateSchema = z.object({
  FunctionName: z.string().optional(),
  AliasArn: z.string(),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number(),
  }).optional(),
  Description: z.string().optional(),
  FunctionVersion: z.string().optional(),
  RoutingConfig: z.object({
    AdditionalVersionWeights: z.array(VersionWeightSchema),
  }).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FunctionName: z.string().describe("The name of the Lambda function.")
    .optional(),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number().int().describe(
      "The amount of provisioned concurrency to allocate for the alias.",
    ).optional(),
  }).describe(
    "Specifies a provisioned concurrency configuration for a function's alias.",
  ).optional(),
  Description: z.string().describe("A description of the alias.").optional(),
  FunctionVersion: z.string().describe(
    "The function version that the alias invokes.",
  ).optional(),
  RoutingConfig: z.object({
    AdditionalVersionWeights: z.array(VersionWeightSchema).describe(
      "The second version, and the percentage of traffic that's routed to it.",
    ).optional(),
  }).describe("The routing configuration of the alias.").optional(),
  Name: z.string().describe("The name of the alias.").optional(),
});

export const model = {
  type: "@swamp/aws/lambda/alias",
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
      description: "Lambda Alias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda Alias",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::Alias",
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
      description: "Get a Lambda Alias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Alias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lambda::Alias",
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
      description: "Update a Lambda Alias",
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
        const identifier = existing.AliasArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::Alias",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lambda::Alias",
          identifier,
          currentState,
          desiredState,
          ["Name", "FunctionName"],
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
      description: "Delete a Lambda Alias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Alias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lambda::Alias",
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
      description: "Sync Lambda Alias state from AWS",
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
        const identifier = existing.AliasArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::Alias",
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
