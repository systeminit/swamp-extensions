// Auto-generated extension model for @swamp/aws/appstream/directory-config
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

const GlobalArgsSchema = z.object({
  OrganizationalUnitDistinguishedNames: z.array(z.string()),
  ServiceAccountCredentials: z.object({
    AccountName: z.string(),
    AccountPassword: z.string(),
  }),
  DirectoryName: z.string(),
  CertificateBasedAuthProperties: z.object({
    Status: z.string().optional(),
    CertificateAuthorityArn: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  OrganizationalUnitDistinguishedNames: z.array(z.string()).optional(),
  ServiceAccountCredentials: z.object({
    AccountName: z.string(),
    AccountPassword: z.string(),
  }).optional(),
  DirectoryName: z.string(),
  CertificateBasedAuthProperties: z.object({
    Status: z.string(),
    CertificateAuthorityArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  OrganizationalUnitDistinguishedNames: z.array(z.string()).optional(),
  ServiceAccountCredentials: z.object({
    AccountName: z.string().optional(),
    AccountPassword: z.string().optional(),
  }).optional(),
  DirectoryName: z.string().optional(),
  CertificateBasedAuthProperties: z.object({
    Status: z.string().optional(),
    CertificateAuthorityArn: z.string().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/appstream/directory-config",
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
      description: "AppStream DirectoryConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppStream DirectoryConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppStream::DirectoryConfig",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DirectoryName ?? g.DirectoryName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a AppStream DirectoryConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream DirectoryConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppStream::DirectoryConfig",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DirectoryName ?? context.globalArgs.DirectoryName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a AppStream DirectoryConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DirectoryName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DirectoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppStream::DirectoryConfig",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppStream::DirectoryConfig",
          identifier,
          currentState,
          desiredState,
          ["DirectoryName"],
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
      description: "Delete a AppStream DirectoryConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream DirectoryConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppStream::DirectoryConfig",
          args.identifier,
        );
        const instanceName = context.globalArgs.DirectoryName?.toString() ??
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
      description: "Sync AppStream DirectoryConfig state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DirectoryName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DirectoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppStream::DirectoryConfig",
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
