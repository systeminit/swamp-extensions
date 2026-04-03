// Auto-generated extension model for @swamp/aws/cur/report-definition
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
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  ReportName: z.string().min(1).max(256).regex(
    new RegExp("[0-9A-Za-z!\\-_.*\\'()]+"),
  ).describe(
    "The name of the report that you want to create. The name must be unique, is case sensitive, and can't include spaces.",
  ),
  TimeUnit: z.enum(["HOURLY", "DAILY", "MONTHLY"]).describe(
    "The granularity of the line items in the report.",
  ),
  Format: z.enum(["textORcsv", "Parquet"]).describe(
    "The format that AWS saves the report in.",
  ),
  Compression: z.enum(["ZIP", "GZIP", "Parquet"]).describe(
    "The compression format that AWS uses for the report.",
  ),
  AdditionalSchemaElements: z.array(
    z.enum([
      "RESOURCES",
      "SPLIT_COST_ALLOCATION_DATA",
      "MANUAL_DISCOUNT_COMPATIBILITY",
    ]),
  ).describe(
    "A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.",
  ).optional(),
  S3Bucket: z.string().min(1).max(256).regex(new RegExp("[A-Za-z0-9_\\.\\-]+"))
    .describe("The S3 bucket where AWS delivers the report."),
  S3Prefix: z.string().min(1).max(256).regex(
    new RegExp("[0-9A-Za-z!\\-_.*\\'()/]*"),
  ).describe(
    "The prefix that AWS adds to the report name when AWS delivers the report. Your prefix can't include spaces.",
  ),
  S3Region: z.string().describe(
    "The region of the S3 bucket that AWS delivers the report into.",
  ),
  AdditionalArtifacts: z.array(z.enum(["REDSHIFT", "QUICKSIGHT", "ATHENA"]))
    .describe(
      "A list of manifests that you want Amazon Web Services to create for this report.",
    ).optional(),
  RefreshClosedReports: z.boolean().describe(
    "Whether you want Amazon Web Services to update your reports after they have been finalized if Amazon Web Services detects charges related to previous months. These charges can include refunds, credits, or support fees.",
  ),
  ReportVersioning: z.enum(["CREATE_NEW_REPORT", "OVERWRITE_REPORT"]).describe(
    "Whether you want Amazon Web Services to overwrite the previous version of each report or to deliver the report in addition to the previous versions.",
  ),
  BillingViewArn: z.string().min(1).max(128).regex(
    new RegExp(
      "(arn:aws(-cn)?:billing::[0-9]{12}:billingview/)?[a-zA-Z0-9_\\+=\\.\\-@].{1,30}",
    ),
  ).describe(
    "The Amazon resource name of the billing view. You can get this value by using the billing view service public APIs.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ReportName: z.string(),
  TimeUnit: z.string().optional(),
  Format: z.string().optional(),
  Compression: z.string().optional(),
  AdditionalSchemaElements: z.array(z.string()).optional(),
  S3Bucket: z.string().optional(),
  S3Prefix: z.string().optional(),
  S3Region: z.string().optional(),
  AdditionalArtifacts: z.array(z.string()).optional(),
  RefreshClosedReports: z.boolean().optional(),
  ReportVersioning: z.string().optional(),
  BillingViewArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ReportName: z.string().min(1).max(256).regex(
    new RegExp("[0-9A-Za-z!\\-_.*\\'()]+"),
  ).describe(
    "The name of the report that you want to create. The name must be unique, is case sensitive, and can't include spaces.",
  ).optional(),
  TimeUnit: z.enum(["HOURLY", "DAILY", "MONTHLY"]).describe(
    "The granularity of the line items in the report.",
  ).optional(),
  Format: z.enum(["textORcsv", "Parquet"]).describe(
    "The format that AWS saves the report in.",
  ).optional(),
  Compression: z.enum(["ZIP", "GZIP", "Parquet"]).describe(
    "The compression format that AWS uses for the report.",
  ).optional(),
  AdditionalSchemaElements: z.array(
    z.enum([
      "RESOURCES",
      "SPLIT_COST_ALLOCATION_DATA",
      "MANUAL_DISCOUNT_COMPATIBILITY",
    ]),
  ).describe(
    "A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.",
  ).optional(),
  S3Bucket: z.string().min(1).max(256).regex(new RegExp("[A-Za-z0-9_\\.\\-]+"))
    .describe("The S3 bucket where AWS delivers the report.").optional(),
  S3Prefix: z.string().min(1).max(256).regex(
    new RegExp("[0-9A-Za-z!\\-_.*\\'()/]*"),
  ).describe(
    "The prefix that AWS adds to the report name when AWS delivers the report. Your prefix can't include spaces.",
  ).optional(),
  S3Region: z.string().describe(
    "The region of the S3 bucket that AWS delivers the report into.",
  ).optional(),
  AdditionalArtifacts: z.array(z.enum(["REDSHIFT", "QUICKSIGHT", "ATHENA"]))
    .describe(
      "A list of manifests that you want Amazon Web Services to create for this report.",
    ).optional(),
  RefreshClosedReports: z.boolean().describe(
    "Whether you want Amazon Web Services to update your reports after they have been finalized if Amazon Web Services detects charges related to previous months. These charges can include refunds, credits, or support fees.",
  ).optional(),
  ReportVersioning: z.enum(["CREATE_NEW_REPORT", "OVERWRITE_REPORT"]).describe(
    "Whether you want Amazon Web Services to overwrite the previous version of each report or to deliver the report in addition to the previous versions.",
  ).optional(),
  BillingViewArn: z.string().min(1).max(128).regex(
    new RegExp(
      "(arn:aws(-cn)?:billing::[0-9]{12}:billingview/)?[a-zA-Z0-9_\\+=\\.\\-@].{1,30}",
    ),
  ).describe(
    "The Amazon resource name of the billing view. You can get this value by using the billing view service public APIs.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/cur/report-definition",
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
      description: "CUR ReportDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CUR ReportDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CUR::ReportDefinition",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ReportName ?? g.ReportName)?.toString() ?? "current")
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
      description: "Get a CUR ReportDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CUR ReportDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CUR::ReportDefinition",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.ReportName ?? context.globalArgs.ReportName)?.toString() ??
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
      description: "Update a CUR ReportDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ReportName?.toString() ?? "current").replace(
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
        const identifier = existing.ReportName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CUR::ReportDefinition",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CUR::ReportDefinition",
          identifier,
          currentState,
          desiredState,
          [
            "ReportName",
            "AdditionalSchemaElements",
            "TimeUnit",
            "ReportVersioning",
            "BillingViewArn",
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
      description: "Delete a CUR ReportDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CUR ReportDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CUR::ReportDefinition",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ReportName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync CUR ReportDefinition state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ReportName?.toString() ?? "current").replace(
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
        const identifier = existing.ReportName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CUR::ReportDefinition",
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
