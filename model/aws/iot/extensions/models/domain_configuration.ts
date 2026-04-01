// Auto-generated extension model for @swamp/aws/iot/domain-configuration
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
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  DomainConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[\\w.-]+$"),
  ).optional(),
  AuthorizerConfig: z.object({
    AllowAuthorizerOverride: z.boolean().optional(),
    DefaultAuthorizerName: z.string().min(1).max(128).regex(
      new RegExp("^[\\w=,@-]+$"),
    ).optional(),
  }).optional(),
  DomainName: z.string().min(1).max(253).optional(),
  ServerCertificateArns: z.array(
    z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
      ),
    ),
  ).optional(),
  ServiceType: z.enum(["DATA", "CREDENTIAL_PROVIDER", "JOBS"]).optional(),
  ValidationCertificateArn: z.string().regex(
    new RegExp(
      "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
    ),
  ).optional(),
  DomainConfigurationStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  ServerCertificateConfig: z.object({
    EnableOCSPCheck: z.boolean().optional(),
    OcspLambdaArn: z.string().min(1).max(170).optional(),
    OcspAuthorizedResponderArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
      ),
    ).optional(),
  }).optional(),
  TlsConfig: z.object({
    SecurityPolicy: z.string().max(128).optional(),
  }).optional(),
  AuthenticationType: z.enum([
    "AWS_X509",
    "CUSTOM_AUTH",
    "AWS_SIGV4",
    "CUSTOM_AUTH_X509",
    "DEFAULT",
  ]).optional(),
  ApplicationProtocol: z.enum(["SECURE_MQTT", "MQTT_WSS", "HTTPS", "DEFAULT"])
    .optional(),
  ClientCertificateConfig: z.object({
    ClientCertificateCallbackArn: z.string().min(1).max(170).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  DomainConfigurationName: z.string(),
  AuthorizerConfig: z.object({
    AllowAuthorizerOverride: z.boolean(),
    DefaultAuthorizerName: z.string(),
  }).optional(),
  DomainName: z.string().optional(),
  ServerCertificateArns: z.array(z.string()).optional(),
  ServiceType: z.string().optional(),
  ValidationCertificateArn: z.string().optional(),
  Arn: z.string().optional(),
  DomainConfigurationStatus: z.string().optional(),
  DomainType: z.string().optional(),
  ServerCertificateConfig: z.object({
    EnableOCSPCheck: z.boolean(),
    OcspLambdaArn: z.string(),
    OcspAuthorizedResponderArn: z.string(),
  }).optional(),
  ServerCertificates: z.array(z.object({
    ServerCertificateArn: z.string(),
    ServerCertificateStatus: z.string(),
    ServerCertificateStatusDetail: z.string(),
  })).optional(),
  TlsConfig: z.object({
    SecurityPolicy: z.string(),
  }).optional(),
  AuthenticationType: z.string().optional(),
  ApplicationProtocol: z.string().optional(),
  ClientCertificateConfig: z.object({
    ClientCertificateCallbackArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  DomainConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[\\w.-]+$"),
  ).optional(),
  AuthorizerConfig: z.object({
    AllowAuthorizerOverride: z.boolean().optional(),
    DefaultAuthorizerName: z.string().min(1).max(128).regex(
      new RegExp("^[\\w=,@-]+$"),
    ).optional(),
  }).optional(),
  DomainName: z.string().min(1).max(253).optional(),
  ServerCertificateArns: z.array(
    z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
      ),
    ),
  ).optional(),
  ServiceType: z.enum(["DATA", "CREDENTIAL_PROVIDER", "JOBS"]).optional(),
  ValidationCertificateArn: z.string().regex(
    new RegExp(
      "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
    ),
  ).optional(),
  DomainConfigurationStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  ServerCertificateConfig: z.object({
    EnableOCSPCheck: z.boolean().optional(),
    OcspLambdaArn: z.string().min(1).max(170).optional(),
    OcspAuthorizedResponderArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-cn|-us-gov|-iso-b|-iso)?:acm:[a-z]{2}-(gov-|iso-|isob-)?[a-z]{4,9}-\\d{1}:\\d{12}:certificate/[a-zA-Z0-9/-]+$",
      ),
    ).optional(),
  }).optional(),
  TlsConfig: z.object({
    SecurityPolicy: z.string().max(128).optional(),
  }).optional(),
  AuthenticationType: z.enum([
    "AWS_X509",
    "CUSTOM_AUTH",
    "AWS_SIGV4",
    "CUSTOM_AUTH_X509",
    "DEFAULT",
  ]).optional(),
  ApplicationProtocol: z.enum(["SECURE_MQTT", "MQTT_WSS", "HTTPS", "DEFAULT"])
    .optional(),
  ClientCertificateConfig: z.object({
    ClientCertificateCallbackArn: z.string().min(1).max(170).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iot/domain-configuration",
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
      description: "IoT DomainConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT DomainConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::DomainConfiguration",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DomainConfigurationName ?? g.DomainConfigurationName)
            ?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoT DomainConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT DomainConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::DomainConfiguration",
          args.identifier,
        ) as StateData;
        const instanceName = (result.DomainConfigurationName ??
          context.globalArgs.DomainConfigurationName)?.toString() ??
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
      description: "Update a IoT DomainConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DomainConfigurationName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DomainConfigurationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::DomainConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::DomainConfiguration",
          identifier,
          currentState,
          desiredState,
          [
            "DomainConfigurationName",
            "DomainName",
            "ServiceType",
            "ValidationCertificateArn",
            "ServerCertificateArns",
          ],
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
      description: "Delete a IoT DomainConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT DomainConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::DomainConfiguration",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.DomainConfigurationName?.toString() ??
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
      description: "Sync IoT DomainConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DomainConfigurationName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DomainConfigurationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::DomainConfiguration",
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
