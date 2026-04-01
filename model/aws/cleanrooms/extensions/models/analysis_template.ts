// Auto-generated extension model for @swamp/aws/cleanrooms/analysis-template
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

export const AnalysisParameterSchema = z.object({
  DefaultValue: z.string().min(0).max(1000).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("[0-9a-zA-Z_]+")),
  Type: z.enum([
    "SMALLINT",
    "INTEGER",
    "BIGINT",
    "DECIMAL",
    "REAL",
    "DOUBLE_PRECISION",
    "BOOLEAN",
    "CHAR",
    "VARCHAR",
    "DATE",
    "TIMESTAMP",
    "TIMESTAMPTZ",
    "TIME",
    "TIMETZ",
    "VARBYTE",
    "BINARY",
    "BYTE",
    "CHARACTER",
    "DOUBLE",
    "FLOAT",
    "INT",
    "LONG",
    "NUMERIC",
    "SHORT",
    "STRING",
    "TIMESTAMP_LTZ",
    "TIMESTAMP_NTZ",
    "TINYINT",
  ]),
});

export const S3LocationSchema = z.object({
  Bucket: z.string().min(3).max(63),
  Key: z.string(),
});

export const AnalysisTemplateArtifactSchema = z.object({
  Location: S3LocationSchema,
});

export const AnalysisTemplateArtifactsSchema = z.object({
  EntryPoint: AnalysisTemplateArtifactSchema,
  AdditionalArtifacts: z.array(AnalysisTemplateArtifactSchema).optional(),
  RoleArn: z.string().min(32).max(512),
});

export const HashSchema = z.object({
  Sha256: z.string().optional(),
});

export const AnalysisTemplateArtifactMetadataSchema = z.object({
  EntryPointHash: HashSchema,
  AdditionalArtifactHashes: z.array(HashSchema).optional(),
});

export const SyntheticDataColumnPropertiesSchema = z.object({
  ColumnName: z.string().max(128).regex(
    new RegExp("^[a-z0-9_](([a-z0-9_]+-)*([a-z0-9_]+))?$"),
  ),
  ColumnType: z.enum(["CATEGORICAL", "NUMERICAL"]),
  IsPredictiveValue: z.boolean(),
});

export const ColumnClassificationDetailsSchema = z.object({
  ColumnMapping: z.array(SyntheticDataColumnPropertiesSchema),
});

export const MLSyntheticDataParametersSchema = z.object({
  Epsilon: z.number().min(0.0001).max(10),
  MaxMembershipInferenceAttackScore: z.number().min(0.5).max(1),
  ColumnClassification: ColumnClassificationDetailsSchema,
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms analysis template.",
  ).optional(),
  AnalysisParameters: z.array(AnalysisParameterSchema).describe(
    "The member who can query can provide this placeholder for a literal data value in an analysis template",
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ),
  Schema: z.object({
    ReferencedTables: z.array(
      z.string().max(128).regex(
        new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
      ),
    ),
  }).optional(),
  Source: z.object({
    Text: z.string().min(0).max(90000).optional(),
    Artifacts: AnalysisTemplateArtifactsSchema.optional(),
  }),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataSchema.optional(),
  }).optional(),
  Format: z.enum(["SQL", "PYSPARK_1_0"]),
  ErrorMessageConfiguration: z.object({
    Type: z.enum(["DETAILED"]),
  }).optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CollaborationArn: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AnalysisParameters: z.array(AnalysisParameterSchema).optional(),
  AnalysisTemplateIdentifier: z.string(),
  Description: z.string().optional(),
  MembershipArn: z.string().optional(),
  MembershipIdentifier: z.string(),
  Name: z.string().optional(),
  Schema: z.object({
    ReferencedTables: z.array(z.string()),
  }).optional(),
  Source: z.object({
    Text: z.string(),
    Artifacts: AnalysisTemplateArtifactsSchema,
  }).optional(),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataSchema,
  }).optional(),
  Format: z.string().optional(),
  ErrorMessageConfiguration: z.object({
    Type: z.string(),
  }).optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms analysis template.",
  ).optional(),
  AnalysisParameters: z.array(AnalysisParameterSchema).describe(
    "The member who can query can provide this placeholder for a literal data value in an analysis template",
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ).optional(),
  Schema: z.object({
    ReferencedTables: z.array(
      z.string().max(128).regex(
        new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
      ),
    ).optional(),
  }).optional(),
  Source: z.object({
    Text: z.string().min(0).max(90000).optional(),
    Artifacts: AnalysisTemplateArtifactsSchema.optional(),
  }).optional(),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataSchema.optional(),
  }).optional(),
  Format: z.enum(["SQL", "PYSPARK_1_0"]).optional(),
  ErrorMessageConfiguration: z.object({
    Type: z.enum(["DETAILED"]).optional(),
  }).optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersSchema.optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/cleanrooms/analysis-template",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CleanRooms AnalysisTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms AnalysisTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Get a CleanRooms AnalysisTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms AnalysisTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Update a CleanRooms AnalysisTemplate",
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
          existing.AnalysisTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CleanRooms::AnalysisTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CleanRooms::AnalysisTemplate",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "MembershipIdentifier",
            "Source",
            "Format",
            "AnalysisParameters",
            "Schema",
            "ErrorMessageConfiguration",
            "SyntheticDataParameters",
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
      description: "Delete a CleanRooms AnalysisTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms AnalysisTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Sync CleanRooms AnalysisTemplate state from AWS",
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
          existing.AnalysisTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CleanRooms::AnalysisTemplate",
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
