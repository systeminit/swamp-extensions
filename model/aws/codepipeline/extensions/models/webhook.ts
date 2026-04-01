// Auto-generated extension model for @swamp/aws/codepipeline/webhook
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

export const WebhookFilterRuleSchema = z.object({
  JsonPath: z.string().min(1).max(150).describe(
    "A JsonPath expression that is applied to the body/payload of the webhook. The value selected by the JsonPath expression must match the value specified in the MatchEquals field. Otherwise, the request is ignored.",
  ),
  MatchEquals: z.string().min(1).max(150).describe(
    "The value selected by the JsonPath expression must match what is supplied in the MatchEquals field. Otherwise, the request is ignored.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string().min(1).max(100).describe(
      "The property used to configure acceptance of webhooks in an IP address range. For IP, only the AllowedIPRange property must be set. This property must be set to a valid CIDR range.",
    ).optional(),
    SecretToken: z.string().min(1).max(100).describe(
      "The property used to configure GitHub authentication. For GITHUB_HMAC, only the SecretToken property must be set.",
    ).optional(),
  }).describe(
    "Properties that configure the authentication applied to incoming webhook trigger requests",
  ),
  Filters: z.array(WebhookFilterRuleSchema).describe(
    "A list of rules applied to the body/payload sent in the POST request to a webhook URL",
  ),
  Authentication: z.enum(["GITHUB_HMAC", "IP", "UNAUTHENTICATED"]).describe(
    "Supported options are GITHUB_HMAC, IP, and UNAUTHENTICATED.",
  ),
  TargetPipeline: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe("The name of the pipeline you want to connect to the webhook."),
  TargetAction: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe(
    "The name of the action in a pipeline you want to connect to the webhook.",
  ),
  Name: z.string().min(1).max(100).regex(new RegExp("[A-Za-z0-9.@\\-_]+"))
    .describe("The name of the webhook").optional(),
  TargetPipelineVersion: z.number().int().describe(
    "The version number of the pipeline to be connected to the trigger request.",
  ).optional(),
  RegisterWithThirdParty: z.boolean().describe(
    "Configures a connection between the webhook that was created and the external tool with events to be detected.",
  ).optional(),
});

const StateSchema = z.object({
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string(),
    SecretToken: z.string(),
  }).optional(),
  Filters: z.array(WebhookFilterRuleSchema).optional(),
  Authentication: z.string().optional(),
  TargetPipeline: z.string().optional(),
  TargetAction: z.string().optional(),
  Id: z.string(),
  Url: z.string().optional(),
  Name: z.string().optional(),
  TargetPipelineVersion: z.number().optional(),
  RegisterWithThirdParty: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string().min(1).max(100).describe(
      "The property used to configure acceptance of webhooks in an IP address range. For IP, only the AllowedIPRange property must be set. This property must be set to a valid CIDR range.",
    ).optional(),
    SecretToken: z.string().min(1).max(100).describe(
      "The property used to configure GitHub authentication. For GITHUB_HMAC, only the SecretToken property must be set.",
    ).optional(),
  }).describe(
    "Properties that configure the authentication applied to incoming webhook trigger requests",
  ).optional(),
  Filters: z.array(WebhookFilterRuleSchema).describe(
    "A list of rules applied to the body/payload sent in the POST request to a webhook URL",
  ).optional(),
  Authentication: z.enum(["GITHUB_HMAC", "IP", "UNAUTHENTICATED"]).describe(
    "Supported options are GITHUB_HMAC, IP, and UNAUTHENTICATED.",
  ).optional(),
  TargetPipeline: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe("The name of the pipeline you want to connect to the webhook.")
    .optional(),
  TargetAction: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe(
    "The name of the action in a pipeline you want to connect to the webhook.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("[A-Za-z0-9.@\\-_]+"))
    .describe("The name of the webhook").optional(),
  TargetPipelineVersion: z.number().int().describe(
    "The version number of the pipeline to be connected to the trigger request.",
  ).optional(),
  RegisterWithThirdParty: z.boolean().describe(
    "Configures a connection between the webhook that was created and the external tool with events to be detected.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/codepipeline/webhook",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodePipeline Webhook resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodePipeline Webhook",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Get a CodePipeline Webhook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Webhook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Update a CodePipeline Webhook",
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
          "AWS::CodePipeline::Webhook",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Delete a CodePipeline Webhook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Webhook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Sync CodePipeline Webhook state from AWS",
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
            "AWS::CodePipeline::Webhook",
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
