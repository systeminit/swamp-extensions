// Auto-generated extension model for @swamp/aws/ses/mail-manager-ingress-point
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

export const PublicNetworkConfigurationSchema = z.object({
  IpType: z.unknown(),
});

export const PrivateNetworkConfigurationSchema = z.object({
  VpcEndpointId: z.string().regex(new RegExp("^vpce-[a-zA-Z0-9]{17}$")),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]+$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]*$"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TrafficPolicyId: z.string().min(1).max(100),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string().min(8).max(64).regex(
      new RegExp("^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{}|.,?]+$"),
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov):secretsmanager:[a-z0-9-]+:\\d{12}:secret:[a-zA-Z0-9/_+=,.@-]+$",
      ),
    ).optional(),
  }).optional(),
  IngressPointName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
  ).optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema.optional(),
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema.optional(),
  }).optional(),
  RuleSetId: z.string().min(1).max(100),
  StatusToUpdate: z.enum(["ACTIVE", "CLOSED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum(["OPEN", "AUTH"]),
});

const StateSchema = z.object({
  ARecord: z.string().optional(),
  TrafficPolicyId: z.string().optional(),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string(),
    SecretArn: z.string(),
  }).optional(),
  IngressPointArn: z.string().optional(),
  IngressPointId: z.string(),
  IngressPointName: z.string().optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema,
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema,
  }).optional(),
  RuleSetId: z.string().optional(),
  Status: z.string().optional(),
  StatusToUpdate: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TrafficPolicyId: z.string().min(1).max(100).optional(),
  IngressPointConfiguration: z.object({
    SmtpPassword: z.string().min(8).max(64).regex(
      new RegExp("^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{}|.,?]+$"),
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov):secretsmanager:[a-z0-9-]+:\\d{12}:secret:[a-zA-Z0-9/_+=,.@-]+$",
      ),
    ).optional(),
  }).optional(),
  IngressPointName: z.string().min(3).max(63).regex(
    new RegExp("^[A-Za-z0-9_\\-]+$"),
  ).optional(),
  NetworkConfiguration: z.object({
    PublicNetworkConfiguration: PublicNetworkConfigurationSchema.optional(),
    PrivateNetworkConfiguration: PrivateNetworkConfigurationSchema.optional(),
  }).optional(),
  RuleSetId: z.string().min(1).max(100).optional(),
  StatusToUpdate: z.enum(["ACTIVE", "CLOSED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum(["OPEN", "AUTH"]).optional(),
});

export const model = {
  type: "@swamp/aws/ses/mail-manager-ingress-point",
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
      description: "SES MailManagerIngressPoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MailManagerIngressPoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Get a SES MailManagerIngressPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerIngressPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Update a SES MailManagerIngressPoint",
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
        const identifier = existing.IngressPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MailManagerIngressPoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::MailManagerIngressPoint",
          identifier,
          currentState,
          desiredState,
          ["NetworkConfiguration", "Type"],
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
      description: "Delete a SES MailManagerIngressPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerIngressPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::MailManagerIngressPoint",
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
      description: "Sync SES MailManagerIngressPoint state from AWS",
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
        const identifier = existing.IngressPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MailManagerIngressPoint",
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
