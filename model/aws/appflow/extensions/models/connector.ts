// Auto-generated extension model for @swamp/aws/appflow/connector
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

export const LambdaConnectorProvisioningConfigSchema = z.object({
  LambdaArn: z.string().max(512).regex(new RegExp("arn:*:.*:.*:[0-9]+:.*"))
    .describe("Lambda ARN of the connector being registered."),
});

const GlobalArgsSchema = z.object({
  ConnectorLabel: z.string().max(512).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe(
    "The name of the connector. The name is unique for each ConnectorRegistration in your AWS account.",
  ).optional(),
  ConnectorProvisioningType: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe(
    "The provisioning type of the connector. Currently the only supported value is LAMBDA.",
  ),
  ConnectorProvisioningConfig: z.object({
    Lambda: LambdaConnectorProvisioningConfigSchema.describe(
      "Contains information about the configuration of the lambda which is being registered as the connector.",
    ).optional(),
  }).describe(
    "Contains information about the configuration of the connector being registered.",
  ),
  Description: z.string().max(2048).regex(new RegExp("[\\s\\w/!@#+=.-]*"))
    .describe("A description about the connector that's being registered.")
    .optional(),
});

const StateSchema = z.object({
  ConnectorLabel: z.string(),
  ConnectorArn: z.string().optional(),
  ConnectorProvisioningType: z.string().optional(),
  ConnectorProvisioningConfig: z.object({
    Lambda: LambdaConnectorProvisioningConfigSchema,
  }).optional(),
  Description: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ConnectorLabel: z.string().max(512).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe(
    "The name of the connector. The name is unique for each ConnectorRegistration in your AWS account.",
  ).optional(),
  ConnectorProvisioningType: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe(
    "The provisioning type of the connector. Currently the only supported value is LAMBDA.",
  ).optional(),
  ConnectorProvisioningConfig: z.object({
    Lambda: LambdaConnectorProvisioningConfigSchema.describe(
      "Contains information about the configuration of the lambda which is being registered as the connector.",
    ).optional(),
  }).describe(
    "Contains information about the configuration of the connector being registered.",
  ).optional(),
  Description: z.string().max(2048).regex(new RegExp("[\\s\\w/!@#+=.-]*"))
    .describe("A description about the connector that's being registered.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/appflow/connector",
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
      description: "AppFlow Connector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppFlow Connector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppFlow::Connector",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ConnectorLabel ?? g.ConnectorLabel)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a AppFlow Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppFlow::Connector",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ConnectorLabel ?? context.globalArgs.ConnectorLabel)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a AppFlow Connector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ConnectorLabel?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConnectorLabel?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppFlow::Connector",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppFlow::Connector",
          identifier,
          currentState,
          desiredState,
          ["ConnectorLabel"],
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
      description: "Delete a AppFlow Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppFlow::Connector",
          args.identifier,
        );
        const instanceName = context.globalArgs.ConnectorLabel?.toString() ??
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
      description: "Sync AppFlow Connector state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ConnectorLabel?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConnectorLabel?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppFlow::Connector",
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
