// Auto-generated extension model for @swamp/aws/datazone/environment-actions
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().max(2048).describe(
    "The description of the Amazon DataZone environment action.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the Amazon DataZone domain in which the environment would be created.",
    ).optional(),
  EnvironmentIdentifier: z.string().min(1).max(36).regex(
    new RegExp("[a-zA-Z0-9_-]{1,36}$"),
  ).describe(
    "The identifier of the Amazon DataZone environment in which the action is taking place",
  ).optional(),
  Identifier: z.string().min(1).max(36).regex(
    new RegExp("^[a-zA-Z0-9_-]{1,36}$"),
  ).describe("The ID of the Amazon DataZone environment action.").optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w -]+$")).describe(
    "The name of the environment action.",
  ),
  Parameters: z.object({
    Uri: z.string().min(1).max(2048).describe(
      "The URI of the console link specified as part of the environment action.",
    ).optional(),
  }).describe("The parameters of the environment action.").optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  DomainId: z.string(),
  DomainIdentifier: z.string().optional(),
  EnvironmentId: z.string(),
  EnvironmentIdentifier: z.string().optional(),
  Id: z.string(),
  Identifier: z.string().optional(),
  Name: z.string().optional(),
  Parameters: z.object({
    Uri: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().max(2048).describe(
    "The description of the Amazon DataZone environment action.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the Amazon DataZone domain in which the environment would be created.",
    ).optional(),
  EnvironmentIdentifier: z.string().min(1).max(36).regex(
    new RegExp("[a-zA-Z0-9_-]{1,36}$"),
  ).describe(
    "The identifier of the Amazon DataZone environment in which the action is taking place",
  ).optional(),
  Identifier: z.string().min(1).max(36).regex(
    new RegExp("^[a-zA-Z0-9_-]{1,36}$"),
  ).describe("The ID of the Amazon DataZone environment action.").optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w -]+$")).describe(
    "The name of the environment action.",
  ).optional(),
  Parameters: z.object({
    Uri: z.string().min(1).max(2048).describe(
      "The URI of the console link specified as part of the environment action.",
    ).optional(),
  }).describe("The parameters of the environment action.").optional(),
});

export const model = {
  type: "@swamp/aws/datazone/environment-actions",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataZone EnvironmentActions resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone EnvironmentActions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataZone::EnvironmentActions",
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
      description: "Get a DataZone EnvironmentActions",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone EnvironmentActions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataZone::EnvironmentActions",
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
      description: "Update a DataZone EnvironmentActions",
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
          existing.DomainId?.toString(),
          existing.EnvironmentId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::EnvironmentActions",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataZone::EnvironmentActions",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "EnvironmentIdentifier"],
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
      description: "Delete a DataZone EnvironmentActions",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone EnvironmentActions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataZone::EnvironmentActions",
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
      description: "Sync DataZone EnvironmentActions state from AWS",
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
          existing.DomainId?.toString(),
          existing.EnvironmentId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::EnvironmentActions",
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
