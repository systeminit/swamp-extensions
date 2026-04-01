// Auto-generated extension model for @swamp/aws/verifiedpermissions/identity-source
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

export const CognitoGroupConfigurationSchema = z.object({
  GroupEntityType: z.string().min(1).max(200).regex(
    new RegExp("^([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*$"),
  ),
});

export const CognitoUserPoolConfigurationSchema = z.object({
  UserPoolArn: z.string().min(1).max(255).regex(
    new RegExp(
      "^arn:[a-zA-Z0-9-]+:cognito-idp:(([a-zA-Z0-9-]+:\\d{12}:userpool/[\\w-]+_[0-9a-zA-Z]+))$",
    ),
  ),
  ClientIds: z.array(z.string().min(1).max(255).regex(new RegExp("^.*$")))
    .optional(),
  GroupConfiguration: CognitoGroupConfigurationSchema.optional(),
});

export const OpenIdConnectGroupConfigurationSchema = z.object({
  GroupClaim: z.string().min(1),
  GroupEntityType: z.string().min(1).max(200).regex(
    new RegExp("^([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*$"),
  ),
});

export const OpenIdConnectAccessTokenConfigurationSchema = z.object({
  PrincipalIdClaim: z.string().min(1).optional(),
  Audiences: z.array(z.string().min(1).max(255)).optional(),
});

export const OpenIdConnectIdentityTokenConfigurationSchema = z.object({
  PrincipalIdClaim: z.string().min(1).optional(),
  ClientIds: z.array(z.string().min(1).max(255).regex(new RegExp("^.*$")))
    .optional(),
});

export const OpenIdConnectConfigurationSchema = z.object({
  Issuer: z.string().min(1).max(2048).regex(new RegExp("^https://.*$")),
  EntityIdPrefix: z.string().min(1).max(100).optional(),
  GroupConfiguration: OpenIdConnectGroupConfigurationSchema.optional(),
  TokenSelection: z.object({
    AccessTokenOnly: OpenIdConnectAccessTokenConfigurationSchema.optional(),
    IdentityTokenOnly: OpenIdConnectIdentityTokenConfigurationSchema.optional(),
  }),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Configuration: z.object({
    CognitoUserPoolConfiguration: CognitoUserPoolConfigurationSchema.optional(),
    OpenIdConnectConfiguration: OpenIdConnectConfigurationSchema.optional(),
  }),
  Details: z.object({
    ClientIds: z.array(z.string().min(1).max(255).regex(new RegExp("^.*$")))
      .optional(),
    UserPoolArn: z.string().min(1).max(255).regex(
      new RegExp(
        "^arn:[a-zA-Z0-9-]+:cognito-idp:(([a-zA-Z0-9-]+:\\d{12}:userpool/[\\w-]+_[0-9a-zA-Z]+))$",
      ),
    ).optional(),
    DiscoveryUrl: z.string().min(1).max(2048).regex(new RegExp("^https://.*$"))
      .optional(),
    OpenIdIssuer: z.enum(["COGNITO"]).optional(),
  }).optional(),
  PolicyStoreId: z.string().min(1).max(200).regex(
    new RegExp("^[a-zA-Z0-9-]*$"),
  ),
  PrincipalEntityType: z.string().min(1).max(200).regex(new RegExp("^.*$"))
    .optional(),
});

const StateSchema = z.object({
  Configuration: z.object({
    CognitoUserPoolConfiguration: CognitoUserPoolConfigurationSchema,
    OpenIdConnectConfiguration: OpenIdConnectConfigurationSchema,
  }).optional(),
  Details: z.object({
    ClientIds: z.array(z.string()),
    UserPoolArn: z.string(),
    DiscoveryUrl: z.string(),
    OpenIdIssuer: z.string(),
  }).optional(),
  IdentitySourceId: z.string(),
  PolicyStoreId: z.string(),
  PrincipalEntityType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Configuration: z.object({
    CognitoUserPoolConfiguration: CognitoUserPoolConfigurationSchema.optional(),
    OpenIdConnectConfiguration: OpenIdConnectConfigurationSchema.optional(),
  }).optional(),
  Details: z.object({
    ClientIds: z.array(z.string().min(1).max(255).regex(new RegExp("^.*$")))
      .optional(),
    UserPoolArn: z.string().min(1).max(255).regex(
      new RegExp(
        "^arn:[a-zA-Z0-9-]+:cognito-idp:(([a-zA-Z0-9-]+:\\d{12}:userpool/[\\w-]+_[0-9a-zA-Z]+))$",
      ),
    ).optional(),
    DiscoveryUrl: z.string().min(1).max(2048).regex(new RegExp("^https://.*$"))
      .optional(),
    OpenIdIssuer: z.enum(["COGNITO"]).optional(),
  }).optional(),
  PolicyStoreId: z.string().min(1).max(200).regex(new RegExp("^[a-zA-Z0-9-]*$"))
    .optional(),
  PrincipalEntityType: z.string().min(1).max(200).regex(new RegExp("^.*$"))
    .optional(),
});

export const model = {
  type: "@swamp/aws/verifiedpermissions/identity-source",
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
      description: "VerifiedPermissions IdentitySource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a VerifiedPermissions IdentitySource",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::VerifiedPermissions::IdentitySource",
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
      description: "Get a VerifiedPermissions IdentitySource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VerifiedPermissions IdentitySource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::VerifiedPermissions::IdentitySource",
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
      description: "Update a VerifiedPermissions IdentitySource",
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
          existing.IdentitySourceId?.toString(),
          existing.PolicyStoreId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::VerifiedPermissions::IdentitySource",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::VerifiedPermissions::IdentitySource",
          identifier,
          currentState,
          desiredState,
          ["PolicyStoreId"],
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
      description: "Delete a VerifiedPermissions IdentitySource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VerifiedPermissions IdentitySource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::VerifiedPermissions::IdentitySource",
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
      description: "Sync VerifiedPermissions IdentitySource state from AWS",
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
          existing.IdentitySourceId?.toString(),
          existing.PolicyStoreId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::VerifiedPermissions::IdentitySource",
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
