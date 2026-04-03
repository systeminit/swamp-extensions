// Auto-generated extension model for @swamp/aws/controltower/enabled-baseline
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

export const ParameterSchema = z.object({
  Key: z.string().min(1).max(256).optional(),
  Value: z.string().optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(256).optional(),
  Value: z.string().min(0).max(256).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BaselineIdentifier: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[0-9a-zA-Z_\\-:\\/]+$"),
  ),
  BaselineVersion: z.string().regex(new RegExp("^\\d+(?:\\.\\d+){0,2}$")),
  TargetIdentifier: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[0-9a-zA-Z_\\-:\\/]+$"),
  ),
  Parameters: z.array(ParameterSchema).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  BaselineIdentifier: z.string().optional(),
  BaselineVersion: z.string().optional(),
  EnabledBaselineIdentifier: z.string(),
  TargetIdentifier: z.string().optional(),
  Parameters: z.array(ParameterSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BaselineIdentifier: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[0-9a-zA-Z_\\-:\\/]+$"),
  ).optional(),
  BaselineVersion: z.string().regex(new RegExp("^\\d+(?:\\.\\d+){0,2}$"))
    .optional(),
  TargetIdentifier: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[0-9a-zA-Z_\\-:\\/]+$"),
  ).optional(),
  Parameters: z.array(ParameterSchema).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/controltower/enabled-baseline",
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
      description: "ControlTower EnabledBaseline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ControlTower EnabledBaseline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ControlTower::EnabledBaseline",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ControlTower EnabledBaseline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ControlTower EnabledBaseline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ControlTower::EnabledBaseline",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ControlTower EnabledBaseline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const identifier = existing.EnabledBaselineIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ControlTower::EnabledBaseline",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ControlTower::EnabledBaseline",
          identifier,
          currentState,
          desiredState,
          ["TargetIdentifier", "BaselineIdentifier"],
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
      description: "Delete a ControlTower EnabledBaseline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ControlTower EnabledBaseline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ControlTower::EnabledBaseline",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync ControlTower EnabledBaseline state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const identifier = existing.EnabledBaselineIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ControlTower::EnabledBaseline",
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
