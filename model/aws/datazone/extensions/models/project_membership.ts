// Auto-generated extension model for @swamp/aws/datazone/project-membership
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
  Designation: z.enum([
    "PROJECT_OWNER",
    "PROJECT_CONTRIBUTOR",
    "PROJECT_CATALOG_VIEWER",
    "PROJECT_CATALOG_CONSUMER",
    "PROJECT_CATALOG_STEWARD",
  ]),
  DomainIdentifier: z.string().regex(
    new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"),
  ),
  Member: z.object({
    UserIdentifier: z.string().optional(),
    GroupIdentifier: z.string().optional(),
  }),
  ProjectIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$")),
});

const StateSchema = z.object({
  Designation: z.string().optional(),
  DomainIdentifier: z.string(),
  Member: z.object({
    UserIdentifier: z.string(),
    GroupIdentifier: z.string(),
  }).optional(),
  MemberIdentifier: z.string(),
  MemberIdentifierType: z.string(),
  ProjectIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Designation: z.enum([
    "PROJECT_OWNER",
    "PROJECT_CONTRIBUTOR",
    "PROJECT_CATALOG_VIEWER",
    "PROJECT_CATALOG_CONSUMER",
    "PROJECT_CATALOG_STEWARD",
  ]).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .optional(),
  Member: z.object({
    UserIdentifier: z.string().optional(),
    GroupIdentifier: z.string().optional(),
  }).optional(),
  ProjectIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$"))
    .optional(),
});

export const model = {
  type: "@swamp/aws/datazone/project-membership",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataZone ProjectMembership resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone ProjectMembership",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataZone::ProjectMembership",
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
      description: "Get a DataZone ProjectMembership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone ProjectMembership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataZone::ProjectMembership",
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
      description: "Update a DataZone ProjectMembership",
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
        const idParts = [
          existing.DomainIdentifier?.toString(),
          existing.MemberIdentifier?.toString(),
          existing.MemberIdentifierType?.toString(),
          existing.ProjectIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::ProjectMembership",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataZone::ProjectMembership",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "ProjectIdentifier", "Member"],
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
      description: "Delete a DataZone ProjectMembership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone ProjectMembership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataZone::ProjectMembership",
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
      description: "Sync DataZone ProjectMembership state from AWS",
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
        const idParts = [
          existing.DomainIdentifier?.toString(),
          existing.MemberIdentifier?.toString(),
          existing.MemberIdentifierType?.toString(),
          existing.ProjectIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::ProjectMembership",
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
