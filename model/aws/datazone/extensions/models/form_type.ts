// Auto-generated extension model for @swamp/aws/datazone/form-type
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
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain in which this metadata form type is created.",
    ),
  Model: z.object({
    Smithy: z.string().min(1).max(100000).optional(),
  }).describe("The model of this Amazon DataZone metadata form type."),
  Description: z.string().min(0).max(2048).describe(
    "The description of this Amazon DataZone metadata form type.",
  ).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("^(?![0-9_])\\w+$|^_\\w*[a-zA-Z0-9]\\w*$"),
  ).describe("The name of this Amazon DataZone metadata form type."),
  OwningProjectIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone project that owns this metadata form type.",
    ),
  Status: z.enum(["ENABLED", "DISABLED"]).describe(
    "The status of this Amazon DataZone metadata form type.",
  ).optional(),
});

const StateSchema = z.object({
  DomainIdentifier: z.string(),
  Model: z.object({
    Smithy: z.string(),
  }).optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  OwningProjectIdentifier: z.string().optional(),
  DomainId: z.string().optional(),
  OwningProjectId: z.string().optional(),
  Revision: z.string().optional(),
  FormTypeIdentifier: z.string(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain in which this metadata form type is created.",
    ).optional(),
  Model: z.object({
    Smithy: z.string().min(1).max(100000).optional(),
  }).describe("The model of this Amazon DataZone metadata form type.")
    .optional(),
  Description: z.string().min(0).max(2048).describe(
    "The description of this Amazon DataZone metadata form type.",
  ).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("^(?![0-9_])\\w+$|^_\\w*[a-zA-Z0-9]\\w*$"),
  ).describe("The name of this Amazon DataZone metadata form type.").optional(),
  OwningProjectIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone project that owns this metadata form type.",
    ).optional(),
  Status: z.enum(["ENABLED", "DISABLED"]).describe(
    "The status of this Amazon DataZone metadata form type.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/datazone/form-type",
  version: "2026.04.01.3",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataZone FormType resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone FormType",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataZone::FormType",
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
      description: "Get a DataZone FormType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone FormType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataZone::FormType",
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
      description: "Update a DataZone FormType",
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
          existing.DomainIdentifier?.toString(),
          existing.FormTypeIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::FormType",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataZone::FormType",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "Name"],
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
      description: "Delete a DataZone FormType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone FormType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataZone::FormType",
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
      description: "Sync DataZone FormType state from AWS",
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
          existing.DomainIdentifier?.toString(),
          existing.FormTypeIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::FormType",
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
