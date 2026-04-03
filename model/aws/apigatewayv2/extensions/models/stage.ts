// Auto-generated extension model for @swamp/aws/apigatewayv2/stage
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
  ClientCertificateId: z.string().describe(
    "The identifier of a client certificate for a Stage. Supported only for WebSocket APIs.",
  ).optional(),
  DeploymentId: z.string().describe(
    "The deployment identifier for the API stage. Can't be updated if autoDeploy is enabled.",
  ).optional(),
  Description: z.string().describe("The description for the API stage.")
    .optional(),
  AutoDeploy: z.boolean().describe(
    "Specifies whether updates to an API automatically trigger a new deployment. The default value is false.",
  ).optional(),
  AccessLogSettings: z.object({
    Format: z.string().optional(),
    DestinationArn: z.string().optional(),
  }).describe("Settings for logging access in this stage.").optional(),
  RouteSettings: z.string().describe("Route settings for the stage.")
    .optional(),
  StageName: z.string().describe(
    "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
  ),
  StageVariables: z.string().describe(
    "A map that defines the stage variables for a Stage. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.",
  ).optional(),
  ApiId: z.string().describe("The API identifier."),
  DefaultRouteSettings: z.object({
    LoggingLevel: z.string().optional(),
    DataTraceEnabled: z.boolean().optional(),
    ThrottlingBurstLimit: z.number().int().optional(),
    DetailedMetricsEnabled: z.boolean().optional(),
    ThrottlingRateLimit: z.number().optional(),
  }).describe("The default route settings for the stage.").optional(),
  Tags: z.string().describe(
    "The collection of tags. Each tag element is associated with a given resource.",
  ).optional(),
});

const StateSchema = z.object({
  ClientCertificateId: z.string().optional(),
  DeploymentId: z.string().optional(),
  Description: z.string().optional(),
  AutoDeploy: z.boolean().optional(),
  AccessLogSettings: z.object({
    Format: z.string(),
    DestinationArn: z.string(),
  }).optional(),
  RouteSettings: z.string().optional(),
  StageName: z.string(),
  StageVariables: z.string().optional(),
  ApiId: z.string(),
  DefaultRouteSettings: z.object({
    LoggingLevel: z.string(),
    DataTraceEnabled: z.boolean(),
    ThrottlingBurstLimit: z.number(),
    DetailedMetricsEnabled: z.boolean(),
    ThrottlingRateLimit: z.number(),
  }).optional(),
  Tags: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ClientCertificateId: z.string().describe(
    "The identifier of a client certificate for a Stage. Supported only for WebSocket APIs.",
  ).optional(),
  DeploymentId: z.string().describe(
    "The deployment identifier for the API stage. Can't be updated if autoDeploy is enabled.",
  ).optional(),
  Description: z.string().describe("The description for the API stage.")
    .optional(),
  AutoDeploy: z.boolean().describe(
    "Specifies whether updates to an API automatically trigger a new deployment. The default value is false.",
  ).optional(),
  AccessLogSettings: z.object({
    Format: z.string().optional(),
    DestinationArn: z.string().optional(),
  }).describe("Settings for logging access in this stage.").optional(),
  RouteSettings: z.string().describe("Route settings for the stage.")
    .optional(),
  StageName: z.string().describe(
    "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
  ).optional(),
  StageVariables: z.string().describe(
    "A map that defines the stage variables for a Stage. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.",
  ).optional(),
  ApiId: z.string().describe("The API identifier.").optional(),
  DefaultRouteSettings: z.object({
    LoggingLevel: z.string().optional(),
    DataTraceEnabled: z.boolean().optional(),
    ThrottlingBurstLimit: z.number().int().optional(),
    DetailedMetricsEnabled: z.boolean().optional(),
    ThrottlingRateLimit: z.number().optional(),
  }).describe("The default route settings for the stage.").optional(),
  Tags: z.string().describe(
    "The collection of tags. Each tag element is associated with a given resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/apigatewayv2/stage",
  version: "2026.04.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApiGatewayV2 Stage resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGatewayV2 Stage",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGatewayV2::Stage",
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
      description: "Get a ApiGatewayV2 Stage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Stage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ApiGatewayV2::Stage",
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
      description: "Update a ApiGatewayV2 Stage",
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
          existing.ApiId?.toString(),
          existing.StageName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApiGatewayV2::Stage",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGatewayV2::Stage",
          identifier,
          currentState,
          desiredState,
          ["StageName", "ApiId"],
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
      description: "Delete a ApiGatewayV2 Stage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Stage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ApiGatewayV2::Stage",
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
      description: "Sync ApiGatewayV2 Stage state from AWS",
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
          existing.ApiId?.toString(),
          existing.StageName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApiGatewayV2::Stage",
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
