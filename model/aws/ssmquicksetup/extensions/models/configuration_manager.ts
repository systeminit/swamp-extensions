// Auto-generated extension model for @swamp/aws/ssmquicksetup/configuration-manager
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

export const ConfigurationDefinitionSchema = z.object({
  Type: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.:/]{3,200}$")),
  Parameters: z.record(z.string(), z.string().max(40960)),
  TypeVersion: z.string().min(1).max(128).optional(),
  LocalDeploymentExecutionRoleName: z.string().min(1).max(256).optional(),
  LocalDeploymentAdministrationRoleArn: z.string().optional(),
  id: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ConfigurationDefinitions: z.array(ConfigurationDefinitionSchema),
  Description: z.string().regex(new RegExp("^.{0,512}$")).optional(),
  Name: z.string().regex(new RegExp("^[ A-Za-z0-9_-]{1,50}$")).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9 +=@_\\/:.-]+$")),
  ).optional(),
});

const StateSchema = z.object({
  ConfigurationDefinitions: z.array(ConfigurationDefinitionSchema).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  LastModifiedAt: z.string().optional(),
  ManagerArn: z.string(),
  Name: z.string().optional(),
  StatusSummaries: z.array(z.object({
    StatusType: z.string(),
    Status: z.string(),
    StatusMessage: z.string(),
    LastUpdatedAt: z.string(),
    StatusDetails: z.record(z.string(), z.unknown()),
  })).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ConfigurationDefinitions: z.array(ConfigurationDefinitionSchema).optional(),
  Description: z.string().regex(new RegExp("^.{0,512}$")).optional(),
  Name: z.string().regex(new RegExp("^[ A-Za-z0-9_-]{1,50}$")).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9 +=@_\\/:.-]+$")),
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ssmquicksetup/configuration-manager",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSMQuickSetup ConfigurationManager resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMQuickSetup ConfigurationManager",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSMQuickSetup::ConfigurationManager",
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
      description: "Get a SSMQuickSetup ConfigurationManager",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMQuickSetup ConfigurationManager",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSMQuickSetup::ConfigurationManager",
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
      description: "Update a SSMQuickSetup ConfigurationManager",
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
        const identifier = existing.ManagerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSMQuickSetup::ConfigurationManager",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSMQuickSetup::ConfigurationManager",
          identifier,
          currentState,
          desiredState,
          ["Type", "TypeVersion"],
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
      description: "Delete a SSMQuickSetup ConfigurationManager",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMQuickSetup ConfigurationManager",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSMQuickSetup::ConfigurationManager",
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
      description: "Sync SSMQuickSetup ConfigurationManager state from AWS",
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
        const identifier = existing.ManagerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSMQuickSetup::ConfigurationManager",
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
