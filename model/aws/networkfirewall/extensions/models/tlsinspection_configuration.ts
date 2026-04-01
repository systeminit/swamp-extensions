// Auto-generated extension model for @swamp/aws/networkfirewall/tlsinspection-configuration
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

export const ServerCertificateSchema = z.object({
  ResourceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN.").optional(),
});

export const AddressSchema = z.object({
  AddressDefinition: z.string().min(1).max(255).regex(
    new RegExp("^([a-fA-F\\d:\\.]+/\\d{1,3})$"),
  ),
});

export const PortRangeSchema = z.object({
  FromPort: z.number().int().min(0).max(65535),
  ToPort: z.number().int().min(0).max(65535),
});

export const ServerCertificateScopeSchema = z.object({
  Sources: z.array(AddressSchema).optional(),
  Destinations: z.array(AddressSchema).optional(),
  SourcePorts: z.array(PortRangeSchema).optional(),
  DestinationPorts: z.array(PortRangeSchema).optional(),
  Protocols: z.array(z.number().int().min(0).max(255)).optional(),
});

export const ServerCertificateConfigurationSchema = z.object({
  ServerCertificates: z.array(ServerCertificateSchema).optional(),
  Scopes: z.array(ServerCertificateScopeSchema).optional(),
  CertificateAuthorityArn: z.string().min(1).max(256).regex(
    new RegExp("^(arn:aws.*)$"),
  ).describe("A resource ARN.").optional(),
  CheckCertificateRevocationStatus: z.object({
    RevokedStatusAction: z.enum(["PASS", "DROP", "REJECT"]).optional(),
    UnknownStatusAction: z.enum(["PASS", "DROP", "REJECT"]).optional(),
  }).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^.*$")),
  Value: z.string().min(0).max(255).regex(new RegExp("^.*$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TLSInspectionConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ),
  TLSInspectionConfiguration: z.object({
    ServerCertificateConfigurations: z.array(
      ServerCertificateConfigurationSchema,
    ).optional(),
  }),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  TLSInspectionConfigurationName: z.string().optional(),
  TLSInspectionConfigurationArn: z.string(),
  TLSInspectionConfiguration: z.object({
    ServerCertificateConfigurations: z.array(
      ServerCertificateConfigurationSchema,
    ),
  }).optional(),
  TLSInspectionConfigurationId: z.string().optional(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TLSInspectionConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).optional(),
  TLSInspectionConfiguration: z.object({
    ServerCertificateConfigurations: z.array(
      ServerCertificateConfigurationSchema,
    ).optional(),
  }).optional(),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/networkfirewall/tlsinspection-configuration",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "NetworkFirewall TLSInspectionConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkFirewall TLSInspectionConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::NetworkFirewall::TLSInspectionConfiguration",
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
      description: "Get a NetworkFirewall TLSInspectionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall TLSInspectionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::NetworkFirewall::TLSInspectionConfiguration",
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
      description: "Update a NetworkFirewall TLSInspectionConfiguration",
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
        const identifier = existing.TLSInspectionConfigurationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkFirewall::TLSInspectionConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::NetworkFirewall::TLSInspectionConfiguration",
          identifier,
          currentState,
          desiredState,
          ["TLSInspectionConfigurationName"],
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
      description: "Delete a NetworkFirewall TLSInspectionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall TLSInspectionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::NetworkFirewall::TLSInspectionConfiguration",
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
      description:
        "Sync NetworkFirewall TLSInspectionConfiguration state from AWS",
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
        const identifier = existing.TLSInspectionConfigurationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkFirewall::TLSInspectionConfiguration",
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
