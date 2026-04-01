// Auto-generated extension model for @swamp/aws/omics/annotation-store
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

export const TsvStoreOptionsSchema = z.object({
  AnnotationType: z.enum([
    "GENERIC",
    "CHR_POS",
    "CHR_POS_REF_ALT",
    "CHR_START_END_ONE_BASE",
    "CHR_START_END_REF_ALT_ONE_BASE",
    "CHR_START_END_ZERO_BASE",
    "CHR_START_END_REF_ALT_ZERO_BASE",
  ]).optional(),
  FormatToHeader: z.record(z.string(), z.string().min(0).max(1000)).optional(),
  Schema: z.array(
    z.record(
      z.string(),
      z.enum(["LONG", "INT", "STRING", "FLOAT", "DOUBLE", "BOOLEAN"]),
    ),
  ).optional(),
});

const GlobalArgsSchema = z.object({
  Description: z.string().min(0).max(500).optional(),
  Name: z.string().regex(new RegExp("^([a-z]){1}([a-z0-9_]){2,254}")),
  Reference: z.object({
    ReferenceArn: z.string().min(1).max(127).regex(new RegExp("^arn:.+$")),
  }).optional(),
  SseConfig: z.object({
    Type: z.enum(["KMS"]),
    KeyArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:([^:\n]*):([^:\n]*):([^:\n]*):([0-9]{12}):([^:\n]*)"),
    ).optional(),
  }).optional(),
  StoreFormat: z.enum(["GFF", "TSV", "VCF"]),
  StoreOptions: z.object({
    TsvStoreOptions: TsvStoreOptionsSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string(),
  Reference: z.object({
    ReferenceArn: z.string(),
  }).optional(),
  SseConfig: z.object({
    Type: z.string(),
    KeyArn: z.string(),
  }).optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  StoreArn: z.string().optional(),
  StoreFormat: z.string().optional(),
  StoreOptions: z.object({
    TsvStoreOptions: TsvStoreOptionsSchema,
  }).optional(),
  StoreSizeBytes: z.number().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  UpdateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().min(0).max(500).optional(),
  Name: z.string().regex(new RegExp("^([a-z]){1}([a-z0-9_]){2,254}"))
    .optional(),
  Reference: z.object({
    ReferenceArn: z.string().min(1).max(127).regex(new RegExp("^arn:.+$"))
      .optional(),
  }).optional(),
  SseConfig: z.object({
    Type: z.enum(["KMS"]).optional(),
    KeyArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:([^:\n]*):([^:\n]*):([^:\n]*):([0-9]{12}):([^:\n]*)"),
    ).optional(),
  }).optional(),
  StoreFormat: z.enum(["GFF", "TSV", "VCF"]).optional(),
  StoreOptions: z.object({
    TsvStoreOptions: TsvStoreOptionsSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/omics/annotation-store",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Omics AnnotationStore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Omics AnnotationStore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Omics::AnnotationStore",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Omics AnnotationStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics AnnotationStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Omics::AnnotationStore",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Omics AnnotationStore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Omics::AnnotationStore",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Omics::AnnotationStore",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Reference",
            "SseConfig",
            "StoreFormat",
            "StoreOptions",
            "Tags",
          ],
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
      description: "Delete a Omics AnnotationStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics AnnotationStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Omics::AnnotationStore",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description: "Sync Omics AnnotationStore state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Omics::AnnotationStore",
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
