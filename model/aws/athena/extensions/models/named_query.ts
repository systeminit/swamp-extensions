// Auto-generated extension model for @swamp/aws/athena/named-query
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(128).describe("The query name.").optional(),
  Database: z.string().min(1).max(255).describe(
    "The database to which the query belongs.",
  ),
  Description: z.string().min(1).max(1024).describe("The query description.")
    .optional(),
  QueryString: z.string().min(1).max(262144).describe(
    "The contents of the query with all query statements.",
  ),
  WorkGroup: z.string().min(1).max(128).describe(
    "The name of the workgroup that contains the named query.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Database: z.string().optional(),
  Description: z.string().optional(),
  QueryString: z.string().optional(),
  WorkGroup: z.string().optional(),
  NamedQueryId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(128).describe("The query name.").optional(),
  Database: z.string().min(1).max(255).describe(
    "The database to which the query belongs.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe("The query description.")
    .optional(),
  QueryString: z.string().min(1).max(262144).describe(
    "The contents of the query with all query statements.",
  ).optional(),
  WorkGroup: z.string().min(1).max(128).describe(
    "The name of the workgroup that contains the named query.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/athena/named-query",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Athena NamedQuery resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Athena NamedQuery",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Athena::NamedQuery",
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
      description: "Get a Athena NamedQuery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena NamedQuery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Athena::NamedQuery",
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
    delete: {
      description: "Delete a Athena NamedQuery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena NamedQuery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Athena::NamedQuery",
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
      description: "Sync Athena NamedQuery state from AWS",
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
        const identifier = existing.NamedQueryId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Athena::NamedQuery",
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
