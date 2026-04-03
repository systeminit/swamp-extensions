// Auto-generated extension model for @swamp/aws/refactorspaces/environment
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

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^(?!aws:).+")).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9-_\\s\\.\\!\\*\\#\\@\\']+$"),
  ).optional(),
  Name: z.string().min(3).max(63).regex(
    new RegExp("^(?!env-)[a-zA-Z0-9]+[a-zA-Z0-9-_ ]+$"),
  ).optional(),
  NetworkFabricType: z.enum(["TRANSIT_GATEWAY", "NONE"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that you can assign to help organize the frameworks that you create. Each tag is a key-value pair.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  EnvironmentIdentifier: z.string(),
  Name: z.string().optional(),
  NetworkFabricType: z.string().optional(),
  Arn: z.string().optional(),
  TransitGatewayId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9-_\\s\\.\\!\\*\\#\\@\\']+$"),
  ).optional(),
  Name: z.string().min(3).max(63).regex(
    new RegExp("^(?!env-)[a-zA-Z0-9]+[a-zA-Z0-9-_ ]+$"),
  ).optional(),
  NetworkFabricType: z.enum(["TRANSIT_GATEWAY", "NONE"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that you can assign to help organize the frameworks that you create. Each tag is a key-value pair.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/refactorspaces/environment",
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
      description: "RefactorSpaces Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RefactorSpaces Environment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RefactorSpaces::Environment",
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
      description: "Get a RefactorSpaces Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RefactorSpaces Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RefactorSpaces::Environment",
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
      description: "Update a RefactorSpaces Environment",
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
        const identifier = existing.EnvironmentIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RefactorSpaces::Environment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RefactorSpaces::Environment",
          identifier,
          currentState,
          desiredState,
          ["Description", "Name", "NetworkFabricType"],
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
      description: "Delete a RefactorSpaces Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RefactorSpaces Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RefactorSpaces::Environment",
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
      description: "Sync RefactorSpaces Environment state from AWS",
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
        const identifier = existing.EnvironmentIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RefactorSpaces::Environment",
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
