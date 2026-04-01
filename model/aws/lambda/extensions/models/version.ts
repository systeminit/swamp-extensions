// Auto-generated extension model for @swamp/aws/lambda/version
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
  CodeSha256: z.string().describe(
    "Only publish a version if the hash value matches the value that's specified. Use this option to avoid publishing a version if the function code has changed since you last updated it. Updates are not supported for this property.",
  ).optional(),
  Description: z.string().min(0).max(256).describe(
    "A description for the version to override the description in the function configuration. Updates are not supported for this property.",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe("The name of the Lambda function."),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number().int().describe(
      "The amount of provisioned concurrency to allocate for the version.",
    ),
  }).describe(
    "Specifies a provisioned concurrency configuration for a function's version. Updates are not supported for this property.",
  ).optional(),
  RuntimePolicy: z.object({
    RuntimeVersionArn: z.string().min(26).max(2048).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}::runtime:.+$",
      ),
    ).describe(
      "The ARN of the runtime the function is configured to use. If the runtime update mode is manual, the ARN is returned, otherwise null is returned.",
    ).optional(),
    UpdateRuntimeOn: z.string().describe("The runtime update mode."),
  }).describe(
    "Specifies the runtime management configuration of a function. Displays runtimeVersionArn only for Manual.",
  ).optional(),
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number().int().min(0).describe(
      "The minimum number of execution environments to maintain for the function.",
    ).optional(),
    MaxExecutionEnvironments: z.number().int().min(0).describe(
      "The maximum number of execution environments that can be provisioned for the function.",
    ).optional(),
  }).describe(
    "The scaling configuration to apply to the function, including minimum and maximum execution environment limits.",
  ).optional(),
});

const StateSchema = z.object({
  FunctionArn: z.string(),
  Version: z.string().optional(),
  CodeSha256: z.string().optional(),
  Description: z.string().optional(),
  FunctionName: z.string().optional(),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number(),
  }).optional(),
  RuntimePolicy: z.object({
    RuntimeVersionArn: z.string(),
    UpdateRuntimeOn: z.string(),
  }).optional(),
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number(),
    MaxExecutionEnvironments: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CodeSha256: z.string().describe(
    "Only publish a version if the hash value matches the value that's specified. Use this option to avoid publishing a version if the function code has changed since you last updated it. Updates are not supported for this property.",
  ).optional(),
  Description: z.string().min(0).max(256).describe(
    "A description for the version to override the description in the function configuration. Updates are not supported for this property.",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe("The name of the Lambda function.").optional(),
  ProvisionedConcurrencyConfig: z.object({
    ProvisionedConcurrentExecutions: z.number().int().describe(
      "The amount of provisioned concurrency to allocate for the version.",
    ).optional(),
  }).describe(
    "Specifies a provisioned concurrency configuration for a function's version. Updates are not supported for this property.",
  ).optional(),
  RuntimePolicy: z.object({
    RuntimeVersionArn: z.string().min(26).max(2048).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}::runtime:.+$",
      ),
    ).describe(
      "The ARN of the runtime the function is configured to use. If the runtime update mode is manual, the ARN is returned, otherwise null is returned.",
    ).optional(),
    UpdateRuntimeOn: z.string().describe("The runtime update mode.").optional(),
  }).describe(
    "Specifies the runtime management configuration of a function. Displays runtimeVersionArn only for Manual.",
  ).optional(),
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number().int().min(0).describe(
      "The minimum number of execution environments to maintain for the function.",
    ).optional(),
    MaxExecutionEnvironments: z.number().int().min(0).describe(
      "The maximum number of execution environments that can be provisioned for the function.",
    ).optional(),
  }).describe(
    "The scaling configuration to apply to the function, including minimum and maximum execution environment limits.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/lambda/version",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lambda Version resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda Version",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::Version",
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
      description: "Get a Lambda Version",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Version",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lambda::Version",
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
      description: "Update a Lambda Version",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::Version",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lambda::Version",
          identifier,
          currentState,
          desiredState,
          [
            "FunctionName",
            "Description",
            "CodeSha256",
            "ProvisionedConcurrencyConfig",
            "RuntimePolicy",
          ],
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
      description: "Delete a Lambda Version",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Version",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lambda::Version",
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
      description: "Sync Lambda Version state from AWS",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::Version",
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
