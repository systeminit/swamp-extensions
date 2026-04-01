// Auto-generated extension model for @swamp/aws/eks/identity-provider-config
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

export const RequiredClaimSchema = z.object({
  Key: z.string().min(1).max(63).describe("The key of the requiredClaims."),
  Value: z.string().min(1).max(253).describe(
    "The value for the requiredClaims.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ClusterName: z.string().describe(
    "The name of the identity provider configuration.",
  ),
  Type: z.enum(["oidc"]).describe(
    "The type of the identity provider configuration.",
  ),
  IdentityProviderConfigName: z.string().describe(
    "The name of the OIDC provider configuration.",
  ).optional(),
  Oidc: z.object({
    ClientId: z.string().describe(
      "This is also known as audience. The ID for the client application that makes authentication requests to the OpenID identity provider.",
    ),
    GroupsClaim: z.string().describe(
      "The JWT claim that the provider uses to return your groups.",
    ).optional(),
    GroupsPrefix: z.string().describe(
      "The prefix that is prepended to group claims to prevent clashes with existing names (such as system: groups).",
    ).optional(),
    IssuerUrl: z.string().describe(
      "The URL of the OpenID identity provider that allows the API server to discover public signing keys for verifying tokens.",
    ),
    RequiredClaims: z.array(RequiredClaimSchema).optional(),
    UsernameClaim: z.string().describe(
      "The JSON Web Token (JWT) claim to use as the username. The default is sub, which is expected to be a unique identifier of the end user. You can choose other claims, such as email or name, depending on the OpenID identity provider. Claims other than email are prefixed with the issuer URL to prevent naming clashes with other plug-ins.",
    ).optional(),
    UsernamePrefix: z.string().describe(
      "The prefix that is prepended to username claims to prevent clashes with existing names. If you do not provide this field, and username is a value other than email, the prefix defaults to issuerurl#. You can use the value - to disable all prefixing.",
    ).optional(),
  }).describe("An object representing an OpenID Connect (OIDC) configuration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ClusterName: z.string(),
  Type: z.string(),
  IdentityProviderConfigName: z.string(),
  Oidc: z.object({
    ClientId: z.string(),
    GroupsClaim: z.string(),
    GroupsPrefix: z.string(),
    IssuerUrl: z.string(),
    RequiredClaims: z.array(RequiredClaimSchema),
    UsernameClaim: z.string(),
    UsernamePrefix: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  IdentityProviderConfigArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ClusterName: z.string().describe(
    "The name of the identity provider configuration.",
  ).optional(),
  Type: z.enum(["oidc"]).describe(
    "The type of the identity provider configuration.",
  ).optional(),
  IdentityProviderConfigName: z.string().describe(
    "The name of the OIDC provider configuration.",
  ).optional(),
  Oidc: z.object({
    ClientId: z.string().describe(
      "This is also known as audience. The ID for the client application that makes authentication requests to the OpenID identity provider.",
    ).optional(),
    GroupsClaim: z.string().describe(
      "The JWT claim that the provider uses to return your groups.",
    ).optional(),
    GroupsPrefix: z.string().describe(
      "The prefix that is prepended to group claims to prevent clashes with existing names (such as system: groups).",
    ).optional(),
    IssuerUrl: z.string().describe(
      "The URL of the OpenID identity provider that allows the API server to discover public signing keys for verifying tokens.",
    ).optional(),
    RequiredClaims: z.array(RequiredClaimSchema).optional(),
    UsernameClaim: z.string().describe(
      "The JSON Web Token (JWT) claim to use as the username. The default is sub, which is expected to be a unique identifier of the end user. You can choose other claims, such as email or name, depending on the OpenID identity provider. Claims other than email are prefixed with the issuer URL to prevent naming clashes with other plug-ins.",
    ).optional(),
    UsernamePrefix: z.string().describe(
      "The prefix that is prepended to username claims to prevent clashes with existing names. If you do not provide this field, and username is a value other than email, the prefix defaults to issuerurl#. You can use the value - to disable all prefixing.",
    ).optional(),
  }).describe("An object representing an OpenID Connect (OIDC) configuration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/eks/identity-provider-config",
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
      description: "EKS IdentityProviderConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EKS IdentityProviderConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EKS::IdentityProviderConfig",
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
      description: "Get a EKS IdentityProviderConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS IdentityProviderConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EKS::IdentityProviderConfig",
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
      description: "Update a EKS IdentityProviderConfig",
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
          existing.IdentityProviderConfigName?.toString(),
          existing.ClusterName?.toString(),
          existing.Type?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::EKS::IdentityProviderConfig",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EKS::IdentityProviderConfig",
          identifier,
          currentState,
          desiredState,
          ["Oidc", "Type", "IdentityProviderConfigName", "ClusterName"],
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
      description: "Delete a EKS IdentityProviderConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS IdentityProviderConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EKS::IdentityProviderConfig",
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
      description: "Sync EKS IdentityProviderConfig state from AWS",
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
          existing.IdentityProviderConfigName?.toString(),
          existing.ClusterName?.toString(),
          existing.Type?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EKS::IdentityProviderConfig",
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
