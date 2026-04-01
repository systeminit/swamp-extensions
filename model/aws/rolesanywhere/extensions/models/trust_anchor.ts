// Auto-generated extension model for @swamp/aws/rolesanywhere/trust-anchor
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

export const NotificationSettingSchema = z.object({
  Enabled: z.boolean(),
  Event: z.enum(["CA_CERTIFICATE_EXPIRY", "END_ENTITY_CERTIFICATE_EXPIRY"]),
  Threshold: z.number().min(1).max(360).optional(),
  Channel: z.enum(["ALL"]).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Enabled: z.boolean().optional(),
  Name: z.string(),
  NotificationSettings: z.array(NotificationSettingSchema).optional(),
  Source: z.object({
    SourceType: z.enum(["AWS_ACM_PCA", "CERTIFICATE_BUNDLE"]),
    SourceData: z.object({
      X509CertificateData: z.string().optional(),
      AcmPcaArn: z.string().optional(),
    }),
  }),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Enabled: z.boolean().optional(),
  Name: z.string().optional(),
  NotificationSettings: z.array(NotificationSettingSchema).optional(),
  Source: z.object({
    SourceType: z.string(),
    SourceData: z.object({
      X509CertificateData: z.string(),
      AcmPcaArn: z.string(),
    }),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  TrustAnchorId: z.string(),
  TrustAnchorArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Enabled: z.boolean().optional(),
  Name: z.string().optional(),
  NotificationSettings: z.array(NotificationSettingSchema).optional(),
  Source: z.object({
    SourceType: z.enum(["AWS_ACM_PCA", "CERTIFICATE_BUNDLE"]).optional(),
    SourceData: z.object({
      X509CertificateData: z.string().optional(),
      AcmPcaArn: z.string().optional(),
    }).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/rolesanywhere/trust-anchor",
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
      description: "RolesAnywhere TrustAnchor resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RolesAnywhere TrustAnchor",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RolesAnywhere::TrustAnchor",
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
      description: "Get a RolesAnywhere TrustAnchor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RolesAnywhere TrustAnchor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RolesAnywhere::TrustAnchor",
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
      description: "Update a RolesAnywhere TrustAnchor",
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
        const identifier = existing.TrustAnchorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RolesAnywhere::TrustAnchor",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RolesAnywhere::TrustAnchor",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a RolesAnywhere TrustAnchor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RolesAnywhere TrustAnchor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RolesAnywhere::TrustAnchor",
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
      description: "Sync RolesAnywhere TrustAnchor state from AWS",
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
        const identifier = existing.TrustAnchorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RolesAnywhere::TrustAnchor",
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
