// Auto-generated extension model for @swamp/aws/apigateway/domain-name
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

export const TagSchema = z.object({
  Key: z.string().describe(
    "A string you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources.",
  ).optional(),
  Value: z.string().describe("The value for the specified tag key.").optional(),
});

const GlobalArgsSchema = z.object({
  DomainName: z.string().optional(),
  EndpointConfiguration: z.object({
    Types: z.array(z.string()).optional(),
    IpAddressType: z.string().optional(),
  }).describe(
    "The endpoint configuration of this DomainName showing the endpoint types and IP address types of the domain name.",
  ).optional(),
  MutualTlsAuthentication: z.object({
    TruststoreUri: z.string().optional(),
    TruststoreVersion: z.string().optional(),
  }).optional(),
  CertificateArn: z.string().optional(),
  RegionalCertificateArn: z.string().optional(),
  OwnershipVerificationCertificateArn: z.string().describe(
    "The ARN of the public certificate issued by ACM to validate ownership of your custom domain. Only required when configuring mutual TLS and using an ACM imported or private CA certificate ARN as the RegionalCertificateArn.",
  ).optional(),
  SecurityPolicy: z.string().optional(),
  EndpointAccessMode: z.string().optional(),
  RoutingMode: z.enum([
    "BASE_PATH_MAPPING_ONLY",
    "ROUTING_RULE_THEN_BASE_PATH_MAPPING",
    "ROUTING_RULE_ONLY",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  DomainNameArn: z.string().optional(),
  DistributionDomainName: z.string().optional(),
  DistributionHostedZoneId: z.string().optional(),
  EndpointConfiguration: z.object({
    Types: z.array(z.string()),
    IpAddressType: z.string(),
  }).optional(),
  MutualTlsAuthentication: z.object({
    TruststoreUri: z.string(),
    TruststoreVersion: z.string(),
  }).optional(),
  RegionalDomainName: z.string().optional(),
  RegionalHostedZoneId: z.string().optional(),
  CertificateArn: z.string().optional(),
  RegionalCertificateArn: z.string().optional(),
  OwnershipVerificationCertificateArn: z.string().optional(),
  SecurityPolicy: z.string().optional(),
  EndpointAccessMode: z.string().optional(),
  RoutingMode: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  DomainName: z.string().optional(),
  EndpointConfiguration: z.object({
    Types: z.array(z.string()).optional(),
    IpAddressType: z.string().optional(),
  }).describe(
    "The endpoint configuration of this DomainName showing the endpoint types and IP address types of the domain name.",
  ).optional(),
  MutualTlsAuthentication: z.object({
    TruststoreUri: z.string().optional(),
    TruststoreVersion: z.string().optional(),
  }).optional(),
  CertificateArn: z.string().optional(),
  RegionalCertificateArn: z.string().optional(),
  OwnershipVerificationCertificateArn: z.string().describe(
    "The ARN of the public certificate issued by ACM to validate ownership of your custom domain. Only required when configuring mutual TLS and using an ACM imported or private CA certificate ARN as the RegionalCertificateArn.",
  ).optional(),
  SecurityPolicy: z.string().optional(),
  EndpointAccessMode: z.string().optional(),
  RoutingMode: z.enum([
    "BASE_PATH_MAPPING_ONLY",
    "ROUTING_RULE_THEN_BASE_PATH_MAPPING",
    "ROUTING_RULE_ONLY",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/apigateway/domain-name",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApiGateway DomainName resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway DomainName",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGateway::DomainName",
          desiredState,
        ) as StateData;
        const instanceName = (result.DomainName ?? g.DomainName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ApiGateway DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ApiGateway::DomainName",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DomainName ?? context.globalArgs.DomainName)?.toString() ??
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
      description: "Update a ApiGateway DomainName",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DomainName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApiGateway::DomainName",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGateway::DomainName",
          identifier,
          currentState,
          desiredState,
          ["DomainName"],
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
      description: "Delete a ApiGateway DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ApiGateway::DomainName",
          args.identifier,
        );
        const instanceName = context.globalArgs.DomainName?.toString() ??
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
      description: "Sync ApiGateway DomainName state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DomainName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApiGateway::DomainName",
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
