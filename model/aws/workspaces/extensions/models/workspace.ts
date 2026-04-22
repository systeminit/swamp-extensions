// Auto-generated extension model for @swamp/aws/workspaces/workspace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkSpaces Workspace (AWS::WorkSpaces::Workspace).
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

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BundleId: z.string(),
  DirectoryId: z.string(),
  RootVolumeEncryptionEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string(),
  UserVolumeEncryptionEnabled: z.boolean().optional(),
  VolumeEncryptionKey: z.string().optional(),
  WorkspaceProperties: z.object({
    ComputeTypeName: z.string().optional(),
    RootVolumeSizeGib: z.number().int().optional(),
    RunningMode: z.string().optional(),
    RunningModeAutoStopTimeoutInMinutes: z.number().int().optional(),
    UserVolumeSizeGib: z.number().int().optional(),
  }).optional(),
});

const StateSchema = z.object({
  WorkspaceId: z.string(),
  BundleId: z.string().optional(),
  DirectoryId: z.string().optional(),
  Id: z.string().optional(),
  RootVolumeEncryptionEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string().optional(),
  UserVolumeEncryptionEnabled: z.boolean().optional(),
  VolumeEncryptionKey: z.string().optional(),
  WorkspaceProperties: z.object({
    ComputeTypeName: z.string(),
    RootVolumeSizeGib: z.number(),
    RunningMode: z.string(),
    RunningModeAutoStopTimeoutInMinutes: z.number(),
    UserVolumeSizeGib: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BundleId: z.string().optional(),
  DirectoryId: z.string().optional(),
  RootVolumeEncryptionEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string().optional(),
  UserVolumeEncryptionEnabled: z.boolean().optional(),
  VolumeEncryptionKey: z.string().optional(),
  WorkspaceProperties: z.object({
    ComputeTypeName: z.string().optional(),
    RootVolumeSizeGib: z.number().int().optional(),
    RunningMode: z.string().optional(),
    RunningModeAutoStopTimeoutInMinutes: z.number().int().optional(),
    UserVolumeSizeGib: z.number().int().optional(),
  }).optional(),
});

/** Swamp extension model for WorkSpaces Workspace. Registered at `@swamp/aws/workspaces/workspace`. */
export const model = {
  type: "@swamp/aws/workspaces/workspace",
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
      description: "WorkSpaces Workspace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpaces Workspace",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WorkSpaces::Workspace",
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
      description: "Get a WorkSpaces Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpaces Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::WorkSpaces::Workspace",
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
      description: "Update a WorkSpaces Workspace",
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
        const identifier = existing.WorkspaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpaces::Workspace",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WorkSpaces::Workspace",
          identifier,
          currentState,
          desiredState,
          ["UserName", "DirectoryId"],
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
      description: "Delete a WorkSpaces Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpaces Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::WorkSpaces::Workspace",
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
      description: "Sync WorkSpaces Workspace state from AWS",
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
        const identifier = existing.WorkspaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpaces::Workspace",
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
