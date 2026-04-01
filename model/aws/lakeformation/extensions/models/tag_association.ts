// Auto-generated extension model for @swamp/aws/lakeformation/tag-association
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const DatabaseResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12),
  Name: z.string().min(1).max(255),
});

export const TableResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12),
  DatabaseName: z.string().min(1).max(255),
  Name: z.string().min(1).max(255).optional(),
  TableWildcard: z.string().optional(),
});

export const TableWithColumnsResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12),
  DatabaseName: z.string().min(1).max(255),
  Name: z.string().min(1).max(255),
  ColumnNames: z.array(z.string().min(1).max(255)),
});

export const LFTagPairSchema = z.object({
  CatalogId: z.string().min(12).max(12),
  TagKey: z.string().min(1).max(128),
  TagValues: z.array(z.string().min(0).max(256)),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Resource: z.object({
    Catalog: z.string().optional(),
    Database: DatabaseResourceSchema.optional(),
    Table: TableResourceSchema.optional(),
    TableWithColumns: TableWithColumnsResourceSchema.optional(),
  }).describe("Resource to tag with the Lake Formation Tags"),
  LFTags: z.array(LFTagPairSchema).describe(
    "List of Lake Formation Tags to associate with the Lake Formation Resource",
  ),
});

const StateSchema = z.object({
  Resource: z.object({
    Catalog: z.string(),
    Database: DatabaseResourceSchema,
    Table: TableResourceSchema,
    TableWithColumns: TableWithColumnsResourceSchema,
  }).optional(),
  LFTags: z.array(LFTagPairSchema).optional(),
  ResourceIdentifier: z.string(),
  TagsIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Resource: z.object({
    Catalog: z.string().optional(),
    Database: DatabaseResourceSchema.optional(),
    Table: TableResourceSchema.optional(),
    TableWithColumns: TableWithColumnsResourceSchema.optional(),
  }).describe("Resource to tag with the Lake Formation Tags").optional(),
  LFTags: z.array(LFTagPairSchema).describe(
    "List of Lake Formation Tags to associate with the Lake Formation Resource",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/lakeformation/tag-association",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "LakeFormation TagAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LakeFormation TagAssociation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::LakeFormation::TagAssociation",
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
      description: "Get a LakeFormation TagAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation TagAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::LakeFormation::TagAssociation",
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
      description: "Delete a LakeFormation TagAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation TagAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::LakeFormation::TagAssociation",
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
      description: "Sync LakeFormation TagAssociation state from AWS",
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
          existing.ResourceIdentifier?.toString(),
          existing.TagsIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::LakeFormation::TagAssociation",
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
