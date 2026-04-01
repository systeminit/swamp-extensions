// Auto-generated extension model for @swamp/aws/emrcontainers/security-configuration
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

export const EksInfoSchema = z.object({
  Namespace: z.string().describe("The EKS namespace.").optional(),
});

export const ContainerInfoSchema = z.object({
  EksInfo: EksInfoSchema.describe("EKS information.").optional(),
});

export const SecureNamespaceInfoSchema = z.object({
  ClusterId: z.string().min(1).max(100).describe("The ID of the cluster.")
    .optional(),
  Namespace: z.string().min(1).max(63).describe("The namespace.").optional(),
});

export const LakeFormationConfigurationSchema = z.object({
  AuthorizedSessionTagValue: z.string().min(1).max(256).describe(
    "The session tag to authorize Lake Formation access.",
  ).optional(),
  SecureNamespaceInfo: SecureNamespaceInfoSchema.describe(
    "Secure namespace information for Lake Formation.",
  ).optional(),
  QueryEngineRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):iam::\\d{12}:role/.+$",
    ),
  ).describe("The ARN of the query engine role.").optional(),
  QueryAccessControlEnabled: z.boolean().describe(
    "Whether query access control is enabled.",
  ).optional(),
});

export const AuthorizationConfigurationSchema = z.object({
  LakeFormationConfiguration: LakeFormationConfigurationSchema.describe(
    "Lake Formation configuration.",
  ).optional(),
});

export const IdentityCenterConfigurationSchema = z.object({
  EnableIdentityCenter: z.boolean().describe(
    "Whether to enable Identity Center integration.",
  ).optional(),
  IdentityCenterApplicationAssignmentRequired: z.boolean().describe(
    "Whether Identity Center application assignment is required.",
  ).optional(),
  IdentityCenterInstanceARN: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
    ),
  ).describe("The ARN of the Identity Center instance.").optional(),
});

export const IAMConfigurationSchema = z.object({
  SystemRole: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):iam::\\d{12}:role/.+$",
    ),
  ).describe("The system role ARN.").optional(),
});

export const AuthenticationConfigurationSchema = z.object({
  IdentityCenterConfiguration: IdentityCenterConfigurationSchema.describe(
    "Identity Center configuration.",
  ).optional(),
  IAMConfiguration: IAMConfigurationSchema.describe("IAM configuration.")
    .optional(),
});

export const TLSCertificateConfigurationSchema = z.object({
  CertificateProviderType: z.enum(["PEM"]).describe(
    "The certificate provider type.",
  ).optional(),
  PublicKeySecretArn: z.string().describe(
    "The ARN of the secret containing the public key.",
  ).optional(),
  PrivateKeySecretArn: z.string().describe(
    "The ARN of the secret containing the private key.",
  ).optional(),
});

export const InTransitEncryptionConfigurationSchema = z.object({
  TLSCertificateConfiguration: TLSCertificateConfigurationSchema.describe(
    "TLS certificate configuration for in-transit encryption.",
  ).optional(),
});

export const S3EncryptionConfigurationSchema = z.object({
  EncryptionOption: z.enum(["SSE-S3", "SSE-KMS", "CSE-KMS"]).describe(
    "The S3 encryption option.",
  ).optional(),
  KMSKeyId: z.string().describe("The KMS key ID for encryption.").optional(),
});

export const LocalDiskEncryptionConfigurationSchema = z.object({
  EncryptionKeyProviderType: z.enum(["AwsKms"]).describe(
    "The encryption key provider type.",
  ).optional(),
  AwsKmsKeyId: z.string().describe("The AWS KMS key ID.").optional(),
});

export const AtRestEncryptionConfigurationSchema = z.object({
  S3EncryptionConfiguration: S3EncryptionConfigurationSchema.describe(
    "S3 encryption configuration.",
  ).optional(),
  LocalDiskEncryptionConfiguration: LocalDiskEncryptionConfigurationSchema
    .describe("Local disk encryption configuration.").optional(),
});

export const EncryptionConfigurationSchema = z.object({
  InTransitEncryptionConfiguration: InTransitEncryptionConfigurationSchema
    .describe("In-transit encryption configuration.").optional(),
  AtRestEncryptionConfiguration: AtRestEncryptionConfigurationSchema.describe(
    "At-rest encryption configuration.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().describe("The key name of the tag."),
  Value: z.string().describe("The value for the tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name of the security configuration.").optional(),
  ContainerProvider: z.object({
    Type: z.enum(["EKS"]).describe("The container provider type."),
    Info: ContainerInfoSchema.describe("Container information.").optional(),
  }).describe("Container provider for the security configuration.").optional(),
  SecurityConfigurationData: z.object({
    AuthorizationConfiguration: AuthorizationConfigurationSchema.describe(
      "Authorization configuration for the security configuration.",
    ).optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "Authentication configuration for the security configuration.",
    ).optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.describe(
      "Encryption configuration for the security configuration.",
    ).optional(),
  }).describe("Security configuration input for the security configuration."),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this security configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  ContainerProvider: z.object({
    Type: z.string(),
    Id: z.string(),
    Info: ContainerInfoSchema,
  }).optional(),
  SecurityConfigurationData: z.object({
    AuthorizationConfiguration: AuthorizationConfigurationSchema,
    AuthenticationConfiguration: AuthenticationConfigurationSchema,
    EncryptionConfiguration: EncryptionConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name of the security configuration.").optional(),
  ContainerProvider: z.object({
    Type: z.enum(["EKS"]).describe("The container provider type.").optional(),
    Info: ContainerInfoSchema.describe("Container information.").optional(),
  }).describe("Container provider for the security configuration.").optional(),
  SecurityConfigurationData: z.object({
    AuthorizationConfiguration: AuthorizationConfigurationSchema.describe(
      "Authorization configuration for the security configuration.",
    ).optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "Authentication configuration for the security configuration.",
    ).optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.describe(
      "Encryption configuration for the security configuration.",
    ).optional(),
  }).describe("Security configuration input for the security configuration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this security configuration.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/emrcontainers/security-configuration",
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
      description: "EMRContainers SecurityConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMRContainers SecurityConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EMRContainers::SecurityConfiguration",
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
      description: "Get a EMRContainers SecurityConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers SecurityConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EMRContainers::SecurityConfiguration",
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
      description: "Update a EMRContainers SecurityConfiguration",
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
          "AWS::EMRContainers::SecurityConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EMRContainers::SecurityConfiguration",
          identifier,
          currentState,
          desiredState,
          ["SecurityConfigurationData", "Name", "ContainerProvider"],
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
      description: "Delete a EMRContainers SecurityConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers SecurityConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EMRContainers::SecurityConfiguration",
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
      description: "Sync EMRContainers SecurityConfiguration state from AWS",
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
            "AWS::EMRContainers::SecurityConfiguration",
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
