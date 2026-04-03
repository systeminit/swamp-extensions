// Auto-generated extension model for @swamp/aws/databrew/dataset
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

export const JsonOptionsSchema = z.object({
  MultiLine: z.boolean().optional(),
});

export const ExcelOptionsSchema = z.object({
  SheetNames: z.array(z.string()).optional(),
  SheetIndexes: z.array(z.number().int()).optional(),
  HeaderRow: z.boolean().optional(),
});

export const CsvOptionsSchema = z.object({
  Delimiter: z.string().min(1).max(1).optional(),
  HeaderRow: z.boolean().optional(),
});

export const S3LocationSchema = z.object({
  Bucket: z.string(),
  Key: z.string().optional(),
  BucketOwner: z.string().min(12).max(12).describe("Bucket owner").optional(),
});

export const DataCatalogInputDefinitionSchema = z.object({
  CatalogId: z.string().describe("Catalog id").optional(),
  DatabaseName: z.string().describe("Database name").optional(),
  TableName: z.string().describe("Table name").optional(),
  TempDirectory: S3LocationSchema.describe("Input location").optional(),
});

export const DatabaseInputDefinitionSchema = z.object({
  GlueConnectionName: z.string().describe("Glue connection name"),
  DatabaseTableName: z.string().describe("Database table name").optional(),
  TempDirectory: S3LocationSchema.describe("Input location").optional(),
  QueryString: z.string().describe(
    "Custom SQL to run against the provided AWS Glue connection. This SQL will be used as the input for DataBrew projects and jobs.",
  ).optional(),
});

export const MetadataSchema = z.object({
  SourceArn: z.string().describe(
    "Arn of the source of the dataset. For e.g.: AppFlow Flow ARN.",
  ).optional(),
});

export const FilesLimitSchema = z.object({
  MaxFiles: z.number().int().describe("Maximum number of files"),
  OrderedBy: z.enum(["LAST_MODIFIED_DATE"]).describe("Ordered by").optional(),
  Order: z.enum(["ASCENDING", "DESCENDING"]).describe("Order").optional(),
});

export const FilterValueSchema = z.object({
  ValueReference: z.string().min(2).max(128).regex(
    new RegExp("^:[A-Za-z0-9_]+$"),
  ).describe("Variable name"),
  Value: z.string().min(0).max(1024),
});

export const FilterExpressionSchema = z.object({
  Expression: z.string().min(4).max(1024).regex(
    new RegExp("^[><0-9A-Za-z_.,:)(!= ]+$"),
  ).describe("Filtering expression for a parameter"),
  ValuesMap: z.array(FilterValueSchema),
});

export const DatetimeOptionsSchema = z.object({
  Format: z.string().min(2).max(100).describe(
    "Date/time format of a date parameter",
  ),
  TimezoneOffset: z.string().min(1).max(6).regex(
    new RegExp("^(Z|[-+](\\d|\\d{2}|\\d{2}:?\\d{2}))$"),
  ).describe("Timezone offset").optional(),
  LocaleCode: z.string().min(2).max(100).regex(
    new RegExp("^[A-Za-z0-9_\\.#@\\-]+$"),
  ).describe("Locale code for a date parameter").optional(),
});

export const DatasetParameterSchema = z.object({
  Name: z.string().min(1).max(255).describe("Parameter name"),
  Type: z.enum(["String", "Number", "Datetime"]).describe("Parameter type"),
  DatetimeOptions: DatetimeOptionsSchema.optional(),
  CreateColumn: z.boolean().describe(
    "Add the value of this parameter as a column in a dataset.",
  ).optional(),
  Filter: FilterExpressionSchema.optional(),
});

export const PathParameterSchema = z.object({
  PathParameterName: z.string().min(1).max(255).describe("Parameter name"),
  DatasetParameter: DatasetParameterSchema,
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(1).max(255).describe("Dataset name"),
  Format: z.enum(["CSV", "JSON", "PARQUET", "EXCEL", "ORC"]).describe(
    "Dataset format",
  ).optional(),
  FormatOptions: z.object({
    Json: JsonOptionsSchema.describe("Json options").optional(),
    Excel: ExcelOptionsSchema.optional(),
    Csv: CsvOptionsSchema.describe("Csv options").optional(),
  }).describe("Format options for dataset").optional(),
  Input: z.object({
    S3InputDefinition: S3LocationSchema.describe("Input location").optional(),
    DataCatalogInputDefinition: DataCatalogInputDefinitionSchema.optional(),
    DatabaseInputDefinition: DatabaseInputDefinitionSchema.optional(),
    Metadata: MetadataSchema.optional(),
  }).describe("Input"),
  Source: z.enum(["S3", "DATA-CATALOG", "DATABASE"]).describe(
    "Source type of the dataset",
  ).optional(),
  PathOptions: z.object({
    FilesLimit: FilesLimitSchema.optional(),
    LastModifiedDateCondition: FilterExpressionSchema.optional(),
    Parameters: z.array(PathParameterSchema).optional(),
  }).describe("PathOptions").optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Format: z.string().optional(),
  FormatOptions: z.object({
    Json: JsonOptionsSchema,
    Excel: ExcelOptionsSchema,
    Csv: CsvOptionsSchema,
  }).optional(),
  Input: z.object({
    S3InputDefinition: S3LocationSchema,
    DataCatalogInputDefinition: DataCatalogInputDefinitionSchema,
    DatabaseInputDefinition: DatabaseInputDefinitionSchema,
    Metadata: MetadataSchema,
  }).optional(),
  Source: z.string().optional(),
  PathOptions: z.object({
    FilesLimit: FilesLimitSchema,
    LastModifiedDateCondition: FilterExpressionSchema,
    Parameters: z.array(PathParameterSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(255).describe("Dataset name").optional(),
  Format: z.enum(["CSV", "JSON", "PARQUET", "EXCEL", "ORC"]).describe(
    "Dataset format",
  ).optional(),
  FormatOptions: z.object({
    Json: JsonOptionsSchema.describe("Json options").optional(),
    Excel: ExcelOptionsSchema.optional(),
    Csv: CsvOptionsSchema.describe("Csv options").optional(),
  }).describe("Format options for dataset").optional(),
  Input: z.object({
    S3InputDefinition: S3LocationSchema.describe("Input location").optional(),
    DataCatalogInputDefinition: DataCatalogInputDefinitionSchema.optional(),
    DatabaseInputDefinition: DatabaseInputDefinitionSchema.optional(),
    Metadata: MetadataSchema.optional(),
  }).describe("Input").optional(),
  Source: z.enum(["S3", "DATA-CATALOG", "DATABASE"]).describe(
    "Source type of the dataset",
  ).optional(),
  PathOptions: z.object({
    FilesLimit: FilesLimitSchema.optional(),
    LastModifiedDateCondition: FilterExpressionSchema.optional(),
    Parameters: z.array(PathParameterSchema).optional(),
  }).describe("PathOptions").optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/databrew/dataset",
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
      description: "DataBrew Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataBrew Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataBrew::Dataset",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a DataBrew Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataBrew::Dataset",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a DataBrew Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataBrew::Dataset",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataBrew::Dataset",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a DataBrew Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataBrew::Dataset",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync DataBrew Dataset state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataBrew::Dataset",
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
