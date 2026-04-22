// Auto-generated extension model for @swamp/aws/lightsail/load-balancer-tls-certificate
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail LoadBalancerTlsCertificate (AWS::Lightsail::LoadBalancerTlsCertificate).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
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
  LoadBalancerName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name of your load balancer.",
  ),
  CertificateName: z.string().describe("The SSL/TLS certificate name."),
  CertificateDomainName: z.string().describe(
    "The domain name (e.g., example.com) for your SSL/TLS certificate.",
  ),
  CertificateAlternativeNames: z.array(z.string()).describe(
    "An array of strings listing alternative domains and subdomains for your SSL/TLS certificate.",
  ).optional(),
  IsAttached: z.boolean().describe(
    "When true, the SSL/TLS certificate is attached to the Lightsail load balancer.",
  ).optional(),
  HttpsRedirectionEnabled: z.boolean().describe(
    "A Boolean value that indicates whether HTTPS redirection is enabled for the load balancer.",
  ).optional(),
});

const StateSchema = z.object({
  LoadBalancerName: z.string(),
  CertificateName: z.string(),
  CertificateDomainName: z.string().optional(),
  CertificateAlternativeNames: z.array(z.string()).optional(),
  LoadBalancerTlsCertificateArn: z.string().optional(),
  IsAttached: z.boolean().optional(),
  HttpsRedirectionEnabled: z.boolean().optional(),
  Status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  LoadBalancerName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name of your load balancer.",
  ).optional(),
  CertificateName: z.string().describe("The SSL/TLS certificate name.")
    .optional(),
  CertificateDomainName: z.string().describe(
    "The domain name (e.g., example.com) for your SSL/TLS certificate.",
  ).optional(),
  CertificateAlternativeNames: z.array(z.string()).describe(
    "An array of strings listing alternative domains and subdomains for your SSL/TLS certificate.",
  ).optional(),
  IsAttached: z.boolean().describe(
    "When true, the SSL/TLS certificate is attached to the Lightsail load balancer.",
  ).optional(),
  HttpsRedirectionEnabled: z.boolean().describe(
    "A Boolean value that indicates whether HTTPS redirection is enabled for the load balancer.",
  ).optional(),
});

/** Swamp extension model for Lightsail LoadBalancerTlsCertificate. Registered at `@swamp/aws/lightsail/load-balancer-tls-certificate`. */
export const model = {
  type: "@swamp/aws/lightsail/load-balancer-tls-certificate",
  version: "2026.04.23.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lightsail LoadBalancerTlsCertificate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail LoadBalancerTlsCertificate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lightsail::LoadBalancerTlsCertificate",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Lightsail LoadBalancerTlsCertificate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail LoadBalancerTlsCertificate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lightsail::LoadBalancerTlsCertificate",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Lightsail LoadBalancerTlsCertificate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
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
          existing.CertificateName?.toString(),
          existing.LoadBalancerName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Lightsail::LoadBalancerTlsCertificate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::LoadBalancerTlsCertificate",
          identifier,
          currentState,
          desiredState,
          [
            "LoadBalancerName",
            "CertificateName",
            "CertificateDomainName",
            "CertificateAlternativeNames",
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
      description: "Delete a Lightsail LoadBalancerTlsCertificate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail LoadBalancerTlsCertificate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lightsail::LoadBalancerTlsCertificate",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Lightsail LoadBalancerTlsCertificate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
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
          existing.CertificateName?.toString(),
          existing.LoadBalancerName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Lightsail::LoadBalancerTlsCertificate",
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
