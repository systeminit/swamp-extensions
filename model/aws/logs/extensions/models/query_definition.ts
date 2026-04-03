// Auto-generated extension model for @swamp/aws/logs/query-definition
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

export const QueryParameterSchema = z.object({
  Name: z.string().max(128).regex(new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$"))
    .describe(
      "The name of the query parameter. A query parameter name must start with a letter or underscore, and contain only letters, digits, and underscores.",
    ),
  DefaultValue: z.string().max(1024).describe(
    "The default value to use for this query parameter if no value is supplied at execution time.",
  ).optional(),
  Description: z.string().max(512).describe(
    "A description of the query parameter that explains its purpose or expected values.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(255).describe(
    "A name for the saved query definition",
  ),
  QueryString: z.string().min(1).max(10000).describe(
    "The query string to use for this definition",
  ),
  LogGroupNames: z.array(
    z.string().min(1).max(512).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+")),
  ).describe(
    "Optionally define specific log groups as part of your query definition",
  ).optional(),
  QueryLanguage: z.enum(["CWLI", "SQL", "PPL"]).describe(
    "Query language of the query string. Possible values are CWLI, SQL, PPL, with CWLI being the default.",
  ).optional(),
  Parameters: z.array(QueryParameterSchema).describe(
    "Use this parameter to include specific query parameters as part of your query definition. Query parameters are supported only for Logs Insights QL queries. Query parameters allow you to use placeholder variables in your query string that are substituted with values at execution time. Use the {{parameterName}} syntax in your query string to reference a parameter.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  QueryString: z.string().optional(),
  LogGroupNames: z.array(z.string()).optional(),
  QueryDefinitionId: z.string(),
  QueryLanguage: z.string().optional(),
  Parameters: z.array(QueryParameterSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(255).describe(
    "A name for the saved query definition",
  ).optional(),
  QueryString: z.string().min(1).max(10000).describe(
    "The query string to use for this definition",
  ).optional(),
  LogGroupNames: z.array(
    z.string().min(1).max(512).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+")),
  ).describe(
    "Optionally define specific log groups as part of your query definition",
  ).optional(),
  QueryLanguage: z.enum(["CWLI", "SQL", "PPL"]).describe(
    "Query language of the query string. Possible values are CWLI, SQL, PPL, with CWLI being the default.",
  ).optional(),
  Parameters: z.array(QueryParameterSchema).describe(
    "Use this parameter to include specific query parameters as part of your query definition. Query parameters are supported only for Logs Insights QL queries. Query parameters allow you to use placeholder variables in your query string that are substituted with values at execution time. Use the {{parameterName}} syntax in your query string to reference a parameter.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/logs/query-definition",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "Added: Parameters",
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
      description: "Logs QueryDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs QueryDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::QueryDefinition",
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
      description: "Get a Logs QueryDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs QueryDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::QueryDefinition",
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
      description: "Update a Logs QueryDefinition",
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
        const identifier = existing.QueryDefinitionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::QueryDefinition",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::QueryDefinition",
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
      description: "Delete a Logs QueryDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs QueryDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::QueryDefinition",
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
      description: "Sync Logs QueryDefinition state from AWS",
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
        const identifier = existing.QueryDefinitionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::QueryDefinition",
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
