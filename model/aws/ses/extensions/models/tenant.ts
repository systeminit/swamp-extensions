// Auto-generated extension model for @swamp/aws/ses/tenant
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

export const ResourceAssociationSchema = z.object({
  ResourceArn: z.string().min(1).describe(
    "The ARN of the resource to associate with the tenant",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key of the key-value tag."),
  Value: z.string().min(0).max(256).describe("The value of the key-value tag."),
});

const GlobalArgsSchema = z.object({
  TenantName: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-_]+$"))
    .describe("The name of the tenant."),
  ResourceAssociations: z.array(ResourceAssociationSchema).describe(
    "The list of resources to associate with the tenant.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the tenant.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  TenantName: z.string(),
  ResourceAssociations: z.array(ResourceAssociationSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  TenantName: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-_]+$"))
    .describe("The name of the tenant.").optional(),
  ResourceAssociations: z.array(ResourceAssociationSchema).describe(
    "The list of resources to associate with the tenant.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the tenant.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ses/tenant",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SES Tenant resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES Tenant",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::Tenant",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.TenantName ?? g.TenantName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SES Tenant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES Tenant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::Tenant",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.TenantName ?? context.globalArgs.TenantName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SES Tenant",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.TenantName?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TenantName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::Tenant",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::Tenant",
          identifier,
          currentState,
          desiredState,
          ["TenantName"],
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
      description: "Delete a SES Tenant",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES Tenant",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::Tenant",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.TenantName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync SES Tenant state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.TenantName?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TenantName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::Tenant",
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
