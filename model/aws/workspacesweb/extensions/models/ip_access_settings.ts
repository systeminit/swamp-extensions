// Auto-generated extension model for @swamp/aws/workspacesweb/ip-access-settings
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

export const IpRuleSchema = z.object({
  IpRange: z.string().regex(
    new RegExp(
      "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(?:/([0-9]|[12][0-9]|3[0-2])|)$",
    ),
  ).describe("A single IP address or an IP address range in CIDR notation"),
  Description: z.string().min(1).max(256).regex(new RegExp("^.+$")).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp("^.+$")).optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^.+$")).optional(),
  IpRules: z.array(IpRuleSchema),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  AssociatedPortalArns: z.array(z.string()).optional(),
  CreationDate: z.string().optional(),
  CustomerManagedKey: z.string().optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  IpAccessSettingsArn: z.string(),
  IpRules: z.array(IpRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp("^.+$")).optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^.+$")).optional(),
  IpRules: z.array(IpRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/workspacesweb/ip-access-settings",
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
      description: "WorkSpacesWeb IpAccessSettings resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesWeb IpAccessSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WorkSpacesWeb::IpAccessSettings",
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
      description: "Get a WorkSpacesWeb IpAccessSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb IpAccessSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::WorkSpacesWeb::IpAccessSettings",
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
      description: "Update a WorkSpacesWeb IpAccessSettings",
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
        const identifier = existing.IpAccessSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpacesWeb::IpAccessSettings",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WorkSpacesWeb::IpAccessSettings",
          identifier,
          currentState,
          desiredState,
          ["AdditionalEncryptionContext", "CustomerManagedKey"],
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
      description: "Delete a WorkSpacesWeb IpAccessSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb IpAccessSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::WorkSpacesWeb::IpAccessSettings",
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
      description: "Sync WorkSpacesWeb IpAccessSettings state from AWS",
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
        const identifier = existing.IpAccessSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpacesWeb::IpAccessSettings",
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
