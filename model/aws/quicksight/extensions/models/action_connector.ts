// Auto-generated extension model for @swamp/aws/quicksight/action-connector
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

export const AuthorizationCodeGrantDetailsSchema = z.object({
  ClientId: z.string().max(1024),
  ClientSecret: z.string().max(2048),
  TokenEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  AuthorizationEndpoint: z.string().min(1).max(8192).regex(
    new RegExp("^https://.*"),
  ),
});

export const AuthorizationCodeGrantMetadataSchema = z.object({
  BaseEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  RedirectUrl: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  AuthorizationCodeGrantCredentialsSource: z.enum(["PLAIN_CREDENTIALS"])
    .optional(),
  AuthorizationCodeGrantCredentialsDetails: z.object({
    AuthorizationCodeGrantDetails: AuthorizationCodeGrantDetailsSchema
      .optional(),
  }).optional(),
});

export const ClientCredentialsGrantDetailsSchema = z.object({
  ClientId: z.string().max(1024),
  ClientSecret: z.string().max(2048),
  TokenEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
});

export const ClientCredentialsGrantMetadataSchema = z.object({
  BaseEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  ClientCredentialsSource: z.enum(["PLAIN_CREDENTIALS"]).optional(),
  ClientCredentialsDetails: z.object({
    ClientCredentialsGrantDetails: ClientCredentialsGrantDetailsSchema
      .optional(),
  }).optional(),
});

export const BasicAuthConnectionMetadataSchema = z.object({
  BaseEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  Username: z.string(),
  Password: z.string(),
});

export const APIKeyConnectionMetadataSchema = z.object({
  BaseEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
  ApiKey: z.string(),
  Email: z.string().regex(
    new RegExp("^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"),
  ).optional(),
});

export const NoneConnectionMetadataSchema = z.object({
  BaseEndpoint: z.string().min(1).max(8192).regex(new RegExp("^https://.*")),
});

export const IAMConnectionMetadataSchema = z.object({
  RoleArn: z.string().min(20).max(2048),
});

export const ResourcePermissionSchema = z.object({
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(1).max(256).describe("Tag value."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ActionConnectorId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  AuthenticationConfig: z.object({
    AuthenticationType: z.enum([
      "BASIC",
      "API_KEY",
      "OAUTH2_CLIENT_CREDENTIALS",
      "NONE",
      "IAM",
      "OAUTH2_AUTHORIZATION_CODE",
    ]),
    AuthenticationMetadata: z.object({
      AuthorizationCodeGrantMetadata: AuthorizationCodeGrantMetadataSchema
        .optional(),
      ClientCredentialsGrantMetadata: ClientCredentialsGrantMetadataSchema
        .optional(),
      BasicAuthConnectionMetadata: BasicAuthConnectionMetadataSchema.optional(),
      ApiKeyConnectionMetadata: APIKeyConnectionMetadataSchema.optional(),
      NoneConnectionMetadata: NoneConnectionMetadataSchema.optional(),
      IamConnectionMetadata: IAMConnectionMetadataSchema.optional(),
    }),
  }).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")),
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[A-Za-z0-9 _.,!?-]*$"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9](?:[\\w- ]*[A-Za-z0-9])?$"),
  ),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum([
    "GENERIC_HTTP",
    "SERVICENOW_NOW_PLATFORM",
    "SALESFORCE_CRM",
    "MICROSOFT_OUTLOOK",
    "PAGERDUTY_ADVANCE",
    "JIRA_CLOUD",
    "ATLASSIAN_CONFLUENCE",
    "AMAZON_S3",
    "AMAZON_BEDROCK_AGENT_RUNTIME",
    "AMAZON_BEDROCK_RUNTIME",
    "AMAZON_BEDROCK_DATA_AUTOMATION_RUNTIME",
    "AMAZON_TEXTRACT",
    "AMAZON_COMPREHEND",
    "AMAZON_COMPREHEND_MEDICAL",
    "MICROSOFT_ONEDRIVE",
    "MICROSOFT_SHAREPOINT",
    "MICROSOFT_TEAMS",
    "SAP_BUSINESSPARTNER",
    "SAP_PRODUCTMASTERDATA",
    "SAP_PHYSICALINVENTORY",
    "SAP_BILLOFMATERIALS",
    "SAP_MATERIALSTOCK",
    "ZENDESK_SUITE",
    "SMARTSHEET",
    "SLACK",
    "ASANA",
    "BAMBOO_HR",
  ]),
  VpcConnectionArn: z.string().optional(),
});

const StateSchema = z.object({
  ActionConnectorId: z.string(),
  Arn: z.string().optional(),
  AuthenticationConfig: z.object({
    AuthenticationType: z.string(),
    AuthenticationMetadata: z.object({
      AuthorizationCodeGrantMetadata: AuthorizationCodeGrantMetadataSchema,
      ClientCredentialsGrantMetadata: ClientCredentialsGrantMetadataSchema,
      BasicAuthConnectionMetadata: BasicAuthConnectionMetadataSchema,
      ApiKeyConnectionMetadata: APIKeyConnectionMetadataSchema,
      NoneConnectionMetadata: NoneConnectionMetadataSchema,
      IamConnectionMetadata: IAMConnectionMetadataSchema,
    }),
  }).optional(),
  AwsAccountId: z.string(),
  CreatedTime: z.string().optional(),
  Description: z.string().optional(),
  EnabledActions: z.array(z.string()).optional(),
  LastUpdatedTime: z.string().optional(),
  Name: z.string().optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  VpcConnectionArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ActionConnectorId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  AuthenticationConfig: z.object({
    AuthenticationType: z.enum([
      "BASIC",
      "API_KEY",
      "OAUTH2_CLIENT_CREDENTIALS",
      "NONE",
      "IAM",
      "OAUTH2_AUTHORIZATION_CODE",
    ]).optional(),
    AuthenticationMetadata: z.object({
      AuthorizationCodeGrantMetadata: AuthorizationCodeGrantMetadataSchema
        .optional(),
      ClientCredentialsGrantMetadata: ClientCredentialsGrantMetadataSchema
        .optional(),
      BasicAuthConnectionMetadata: BasicAuthConnectionMetadataSchema.optional(),
      ApiKeyConnectionMetadata: APIKeyConnectionMetadataSchema.optional(),
      NoneConnectionMetadata: NoneConnectionMetadataSchema.optional(),
      IamConnectionMetadata: IAMConnectionMetadataSchema.optional(),
    }).optional(),
  }).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[A-Za-z0-9 _.,!?-]*$"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9](?:[\\w- ]*[A-Za-z0-9])?$"),
  ).optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum([
    "GENERIC_HTTP",
    "SERVICENOW_NOW_PLATFORM",
    "SALESFORCE_CRM",
    "MICROSOFT_OUTLOOK",
    "PAGERDUTY_ADVANCE",
    "JIRA_CLOUD",
    "ATLASSIAN_CONFLUENCE",
    "AMAZON_S3",
    "AMAZON_BEDROCK_AGENT_RUNTIME",
    "AMAZON_BEDROCK_RUNTIME",
    "AMAZON_BEDROCK_DATA_AUTOMATION_RUNTIME",
    "AMAZON_TEXTRACT",
    "AMAZON_COMPREHEND",
    "AMAZON_COMPREHEND_MEDICAL",
    "MICROSOFT_ONEDRIVE",
    "MICROSOFT_SHAREPOINT",
    "MICROSOFT_TEAMS",
    "SAP_BUSINESSPARTNER",
    "SAP_PRODUCTMASTERDATA",
    "SAP_PHYSICALINVENTORY",
    "SAP_BILLOFMATERIALS",
    "SAP_MATERIALSTOCK",
    "ZENDESK_SUITE",
    "SMARTSHEET",
    "SLACK",
    "ASANA",
    "BAMBOO_HR",
  ]).optional(),
  VpcConnectionArn: z.string().optional(),
});

export const model = {
  type: "@swamp/aws/quicksight/action-connector",
  version: "2026.04.01.2",
  upgrades: [
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
      description: "QuickSight ActionConnector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight ActionConnector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QuickSight::ActionConnector",
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
      description: "Get a QuickSight ActionConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight ActionConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::QuickSight::ActionConnector",
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
      description: "Update a QuickSight ActionConnector",
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
          existing.ActionConnectorId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::ActionConnector",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::QuickSight::ActionConnector",
          identifier,
          currentState,
          desiredState,
          ["ActionConnectorId", "AwsAccountId", "Type"],
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
      description: "Delete a QuickSight ActionConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight ActionConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::QuickSight::ActionConnector",
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
      description: "Sync QuickSight ActionConnector state from AWS",
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
          existing.ActionConnectorId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::ActionConnector",
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
