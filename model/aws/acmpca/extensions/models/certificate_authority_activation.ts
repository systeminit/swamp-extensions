// Auto-generated extension model for @swamp/aws/acmpca/certificate-authority-activation
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ACMPCA CertificateAuthorityActivation (AWS::ACMPCA::CertificateAuthorityActivation).
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
  CertificateAuthorityArn: z.string().describe(
    "Arn of the Certificate Authority.",
  ),
  Certificate: z.string().describe(
    "Certificate Authority certificate that will be installed in the Certificate Authority.",
  ),
  CertificateChain: z.string().describe(
    "Certificate chain for the Certificate Authority certificate.",
  ).optional(),
  Status: z.string().describe("The status of the Certificate Authority.")
    .optional(),
});

const StateSchema = z.object({
  CertificateAuthorityArn: z.string(),
  Certificate: z.string().optional(),
  CertificateChain: z.string().optional(),
  Status: z.string().optional(),
  CompleteCertificateChain: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  CertificateAuthorityArn: z.string().describe(
    "Arn of the Certificate Authority.",
  ).optional(),
  Certificate: z.string().describe(
    "Certificate Authority certificate that will be installed in the Certificate Authority.",
  ).optional(),
  CertificateChain: z.string().describe(
    "Certificate chain for the Certificate Authority certificate.",
  ).optional(),
  Status: z.string().describe("The status of the Certificate Authority.")
    .optional(),
});

/** Swamp extension model for ACMPCA CertificateAuthorityActivation. Registered at `@swamp/aws/acmpca/certificate-authority-activation`. */
export const model = {
  type: "@swamp/aws/acmpca/certificate-authority-activation",
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
      description: "ACMPCA CertificateAuthorityActivation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ACMPCA CertificateAuthorityActivation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ACMPCA::CertificateAuthorityActivation",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.CertificateAuthorityArn ?? g.CertificateAuthorityArn)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ACMPCA CertificateAuthorityActivation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA CertificateAuthorityActivation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ACMPCA::CertificateAuthorityActivation",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.CertificateAuthorityArn ??
          context.globalArgs.CertificateAuthorityArn)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ACMPCA CertificateAuthorityActivation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.CertificateAuthorityArn?.toString() ?? "current").replace(
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
        const identifier = existing.CertificateAuthorityArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ACMPCA::CertificateAuthorityActivation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ACMPCA::CertificateAuthorityActivation",
          identifier,
          currentState,
          desiredState,
          ["CertificateAuthorityArn"],
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
      description: "Delete a ACMPCA CertificateAuthorityActivation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ACMPCA CertificateAuthorityActivation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ACMPCA::CertificateAuthorityActivation",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.CertificateAuthorityArn?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync ACMPCA CertificateAuthorityActivation state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.CertificateAuthorityArn?.toString() ?? "current").replace(
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
        const identifier = existing.CertificateAuthorityArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ACMPCA::CertificateAuthorityActivation",
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
