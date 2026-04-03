// Auto-generated extension model for @swamp/aws/opensearchserverless/security-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

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
  Description: z.string().min(1).max(1000).describe(
    "Security config description",
  ).optional(),
  Name: z.string().min(3).max(32).regex(new RegExp("^[a-z][a-z0-9-]{2,31}$"))
    .describe("The friendly name of the security config").optional(),
  SamlOptions: z.object({
    Metadata: z.string().min(1).max(51200).regex(
      new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+"),
    ).describe("The XML saml provider metadata document that you want to use"),
    UserAttribute: z.string().min(1).max(2048).regex(new RegExp("[\\w+=,.@-]+"))
      .describe("Custom attribute for this saml integration").optional(),
    GroupAttribute: z.string().min(1).max(2048).regex(
      new RegExp("[\\w+=,.@-]+"),
    ).describe("Group attribute for this saml integration").optional(),
    OpenSearchServerlessEntityId: z.string().min(1).max(1024).regex(
      new RegExp("^aws:opensearch:[0-9]{12}:*"),
    ).describe(
      "Custom entity id attribute to override default entity id for this saml integration",
    ).optional(),
    SessionTimeout: z.number().int().describe(
      "Defines the session timeout in minutes",
    ).optional(),
  }).describe("Describes saml options in form of key value map").optional(),
  IamIdentityCenterOptions: z.object({
    InstanceArn: z.string().describe(
      "The ARN of the IAM Identity Center instance used to integrate with OpenSearch Serverless",
    ),
    UserAttribute: z.string().describe(
      "User attribute for this IAM Identity Center integration",
    ).optional(),
    GroupAttribute: z.string().describe(
      "Group attribute for this IAM Identity Center integration",
    ).optional(),
  }).describe(
    "Describes IAM Identity Center options for an OpenSearch Serverless security configuration in the form of a key-value map",
  ).optional(),
  IamFederationOptions: z.object({
    GroupAttribute: z.string().describe(
      "Group attribute for this IAM federation integration",
    ).optional(),
    UserAttribute: z.string().describe(
      "User attribute for this IAM federation integration",
    ).optional(),
  }).describe("Describe IAM federation options in form of key value map")
    .optional(),
  Type: z.enum(["saml", "iamidentitycenter", "iamfederation"]).describe(
    "Config type for security config",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Id: z.string(),
  Name: z.string().optional(),
  SamlOptions: z.object({
    Metadata: z.string(),
    UserAttribute: z.string(),
    GroupAttribute: z.string(),
    OpenSearchServerlessEntityId: z.string(),
    SessionTimeout: z.number(),
  }).optional(),
  IamIdentityCenterOptions: z.object({
    InstanceArn: z.string(),
    ApplicationArn: z.string(),
    ApplicationName: z.string(),
    ApplicationDescription: z.string(),
    UserAttribute: z.string(),
    GroupAttribute: z.string(),
  }).optional(),
  IamFederationOptions: z.object({
    GroupAttribute: z.string(),
    UserAttribute: z.string(),
  }).optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(1).max(1000).describe(
    "Security config description",
  ).optional(),
  Name: z.string().min(3).max(32).regex(new RegExp("^[a-z][a-z0-9-]{2,31}$"))
    .describe("The friendly name of the security config").optional(),
  SamlOptions: z.object({
    Metadata: z.string().min(1).max(51200).regex(
      new RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+"),
    ).describe("The XML saml provider metadata document that you want to use")
      .optional(),
    UserAttribute: z.string().min(1).max(2048).regex(new RegExp("[\\w+=,.@-]+"))
      .describe("Custom attribute for this saml integration").optional(),
    GroupAttribute: z.string().min(1).max(2048).regex(
      new RegExp("[\\w+=,.@-]+"),
    ).describe("Group attribute for this saml integration").optional(),
    OpenSearchServerlessEntityId: z.string().min(1).max(1024).regex(
      new RegExp("^aws:opensearch:[0-9]{12}:*"),
    ).describe(
      "Custom entity id attribute to override default entity id for this saml integration",
    ).optional(),
    SessionTimeout: z.number().int().describe(
      "Defines the session timeout in minutes",
    ).optional(),
  }).describe("Describes saml options in form of key value map").optional(),
  IamIdentityCenterOptions: z.object({
    InstanceArn: z.string().describe(
      "The ARN of the IAM Identity Center instance used to integrate with OpenSearch Serverless",
    ).optional(),
    UserAttribute: z.string().describe(
      "User attribute for this IAM Identity Center integration",
    ).optional(),
    GroupAttribute: z.string().describe(
      "Group attribute for this IAM Identity Center integration",
    ).optional(),
  }).describe(
    "Describes IAM Identity Center options for an OpenSearch Serverless security configuration in the form of a key-value map",
  ).optional(),
  IamFederationOptions: z.object({
    GroupAttribute: z.string().describe(
      "Group attribute for this IAM federation integration",
    ).optional(),
    UserAttribute: z.string().describe(
      "User attribute for this IAM federation integration",
    ).optional(),
  }).describe("Describe IAM federation options in form of key value map")
    .optional(),
  Type: z.enum(["saml", "iamidentitycenter", "iamfederation"]).describe(
    "Config type for security config",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/opensearchserverless/security-config",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "OpenSearchServerless SecurityConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchServerless SecurityConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::OpenSearchServerless::SecurityConfig",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a OpenSearchServerless SecurityConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless SecurityConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::OpenSearchServerless::SecurityConfig",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a OpenSearchServerless SecurityConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
          "AWS::OpenSearchServerless::SecurityConfig",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchServerless::SecurityConfig",
          identifier,
          currentState,
          desiredState,
          ["Type", "Name", "InstanceArn"],
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
      description: "Delete a OpenSearchServerless SecurityConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchServerless SecurityConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::OpenSearchServerless::SecurityConfig",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync OpenSearchServerless SecurityConfig state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
            "AWS::OpenSearchServerless::SecurityConfig",
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
