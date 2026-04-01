// Auto-generated extension model for @swamp/aws/qbusiness/index
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

export const DocumentAttributeConfigurationSchema = z.object({
  Name: z.string().min(1).max(30).regex(
    new RegExp("^[a-zA-Z0-9_][a-zA-Z0-9_-]*$"),
  ).optional(),
  Type: z.enum(["STRING", "STRING_LIST", "NUMBER", "DATE"]).optional(),
  Search: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const TextDocumentStatisticsSchema = z.object({
  IndexedTextBytes: z.number().min(0).optional(),
  IndexedTextDocumentCount: z.number().min(0).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ),
  CapacityConfiguration: z.object({
    Units: z.number().min(1).optional(),
  }).optional(),
  Description: z.string().min(0).max(1000).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  DisplayName: z.string().min(1).max(1000).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ),
  DocumentAttributeConfigurations: z.array(DocumentAttributeConfigurationSchema)
    .optional(),
  IndexStatistics: z.object({
    TextDocumentStatistics: TextDocumentStatisticsSchema.optional(),
  }).optional(),
  Type: z.enum(["ENTERPRISE", "STARTER"]).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ApplicationId: z.string(),
  CapacityConfiguration: z.object({
    Units: z.number(),
  }).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  DocumentAttributeConfigurations: z.array(DocumentAttributeConfigurationSchema)
    .optional(),
  IndexArn: z.string().optional(),
  IndexId: z.string(),
  IndexStatistics: z.object({
    TextDocumentStatistics: TextDocumentStatisticsSchema,
  }).optional(),
  Type: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ).optional(),
  CapacityConfiguration: z.object({
    Units: z.number().min(1).optional(),
  }).optional(),
  Description: z.string().min(0).max(1000).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  DisplayName: z.string().min(1).max(1000).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ).optional(),
  DocumentAttributeConfigurations: z.array(DocumentAttributeConfigurationSchema)
    .optional(),
  IndexStatistics: z.object({
    TextDocumentStatistics: TextDocumentStatisticsSchema.optional(),
  }).optional(),
  Type: z.enum(["ENTERPRISE", "STARTER"]).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/qbusiness/index",
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
      description: "QBusiness Index resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QBusiness Index",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QBusiness::Index",
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
      description: "Get a QBusiness Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::QBusiness::Index",
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
      description: "Update a QBusiness Index",
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
        const idParts = [
          existing.ApplicationId?.toString(),
          existing.IndexId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QBusiness::Index",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::QBusiness::Index",
          identifier,
          currentState,
          desiredState,
          ["ApplicationId", "Type"],
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
      description: "Delete a QBusiness Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::QBusiness::Index",
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
      description: "Sync QBusiness Index state from AWS",
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
        const idParts = [
          existing.ApplicationId?.toString(),
          existing.IndexId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QBusiness::Index",
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
