// Auto-generated extension model for @swamp/aws/stepfunctions/state-machine-alias
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

export const RoutingConfigurationVersionSchema = z.object({
  StateMachineVersionArn: z.string().min(1).max(2048).describe(
    "The Amazon Resource Name (ARN) that identifies one or two state machine versions defined in the routing configuration.",
  ),
  Weight: z.number().int().min(0).max(100).describe(
    "The percentage of traffic you want to route to the state machine version. The sum of the weights in the routing configuration must be equal to 100.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(80).describe("The alias name.").optional(),
  Description: z.string().min(1).max(256).describe(
    "An optional description of the alias.",
  ).optional(),
  RoutingConfiguration: z.array(RoutingConfigurationVersionSchema).describe(
    "The routing configuration of the alias. One or two versions can be mapped to an alias to split StartExecution requests of the same state machine.",
  ).optional(),
  DeploymentPreference: z.object({
    StateMachineVersionArn: z.string().min(1).max(2048),
    Type: z.enum(["LINEAR", "ALL_AT_ONCE", "CANARY"]).describe(
      "The type of deployment to perform.",
    ),
    Percentage: z.number().int().min(1).max(99).describe(
      "The percentage of traffic to shift to the new version in each increment.",
    ).optional(),
    Interval: z.number().int().min(1).max(2100).describe(
      "The time in minutes between each traffic shifting increment.",
    ).optional(),
    Alarms: z.array(z.string().min(1).max(256)).describe(
      "A list of CloudWatch alarm names that will be monitored during the deployment. The deployment will fail and rollback if any alarms go into ALARM state.",
    ).optional(),
  }).describe("The settings to enable gradual state machine deployments.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  RoutingConfiguration: z.array(RoutingConfigurationVersionSchema).optional(),
  DeploymentPreference: z.object({
    StateMachineVersionArn: z.string(),
    Type: z.string(),
    Percentage: z.number(),
    Interval: z.number(),
    Alarms: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(80).describe("The alias name.").optional(),
  Description: z.string().min(1).max(256).describe(
    "An optional description of the alias.",
  ).optional(),
  RoutingConfiguration: z.array(RoutingConfigurationVersionSchema).describe(
    "The routing configuration of the alias. One or two versions can be mapped to an alias to split StartExecution requests of the same state machine.",
  ).optional(),
  DeploymentPreference: z.object({
    StateMachineVersionArn: z.string().min(1).max(2048).optional(),
    Type: z.enum(["LINEAR", "ALL_AT_ONCE", "CANARY"]).describe(
      "The type of deployment to perform.",
    ).optional(),
    Percentage: z.number().int().min(1).max(99).describe(
      "The percentage of traffic to shift to the new version in each increment.",
    ).optional(),
    Interval: z.number().int().min(1).max(2100).describe(
      "The time in minutes between each traffic shifting increment.",
    ).optional(),
    Alarms: z.array(z.string().min(1).max(256)).describe(
      "A list of CloudWatch alarm names that will be monitored during the deployment. The deployment will fail and rollback if any alarms go into ALARM state.",
    ).optional(),
  }).describe("The settings to enable gradual state machine deployments.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/stepfunctions/state-machine-alias",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "StepFunctions StateMachineAlias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a StepFunctions StateMachineAlias",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::StepFunctions::StateMachineAlias",
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
      description: "Get a StepFunctions StateMachineAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StepFunctions StateMachineAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::StepFunctions::StateMachineAlias",
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
      description: "Update a StepFunctions StateMachineAlias",
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
          "AWS::StepFunctions::StateMachineAlias",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::StepFunctions::StateMachineAlias",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a StepFunctions StateMachineAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StepFunctions StateMachineAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::StepFunctions::StateMachineAlias",
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
      description: "Sync StepFunctions StateMachineAlias state from AWS",
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
            "AWS::StepFunctions::StateMachineAlias",
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
