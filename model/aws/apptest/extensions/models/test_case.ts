// Auto-generated extension model for @swamp/aws/apptest/test-case
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

export const M2ManagedActionPropertiesSchema = z.object({
  ForceStop: z.boolean().optional(),
  ImportDataSetLocation: z.string().regex(new RegExp("^\\S{1,1000}$"))
    .optional(),
});

export const M2ManagedApplicationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Configure", "Deconfigure"]),
  Properties: M2ManagedActionPropertiesSchema.optional(),
});

export const M2NonManagedApplicationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Configure", "Deconfigure"]),
});

export const CloudFormationActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.enum(["Create", "Delete"]).optional(),
});

export const BatchSchema = z.object({
  BatchJobName: z.string().regex(new RegExp("^\\S{1,1000}$")),
  BatchJobParameters: z.record(z.string(), z.string()).optional(),
  ExportDataSetNames: z.array(z.string().regex(new RegExp("^\\S{1,100}$")))
    .optional(),
});

export const ScriptSchema = z.object({
  ScriptLocation: z.string().min(0).max(1024),
  Type: z.enum(["Selenium"]),
});

export const TN3270Schema = z.object({
  Script: ScriptSchema,
  ExportDataSetNames: z.array(z.string().regex(new RegExp("^\\S{1,100}$")))
    .optional(),
});

export const MainframeActionPropertiesSchema = z.object({
  DmsTaskArn: z.string().regex(new RegExp("^\\S{1,1000}$")).optional(),
});

export const MainframeActionSchema = z.object({
  Resource: z.string().regex(new RegExp("^\\S{1,1000}$")),
  ActionType: z.object({
    Batch: BatchSchema.optional(),
    Tn3270: TN3270Schema.optional(),
  }),
  Properties: MainframeActionPropertiesSchema.optional(),
});

export const DataSetSchema = z.object({
  Type: z.enum(["PS"]),
  Name: z.string().regex(new RegExp("^\\S{1,100}$")),
  Ccsid: z.string().regex(new RegExp("^\\S{1,50}$")),
  Format: z.enum(["FIXED", "VARIABLE", "LINE_SEQUENTIAL"]),
  Length: z.number(),
});

export const SourceDatabaseMetadataSchema = z.object({
  Type: z.enum(["z/OS-DB2"]),
  CaptureTool: z.enum(["Precisely", "AWS DMS"]),
});

export const TargetDatabaseMetadataSchema = z.object({
  Type: z.enum(["PostgreSQL"]),
  CaptureTool: z.enum(["Precisely", "AWS DMS"]),
});

export const DatabaseCDCSchema = z.object({
  SourceMetadata: SourceDatabaseMetadataSchema,
  TargetMetadata: TargetDatabaseMetadataSchema,
});

export const InputFileSchema = z.object({
  SourceLocation: z.string().regex(new RegExp("^\\S{1,1000}$")),
  TargetLocation: z.string().regex(new RegExp("^\\S{1,1000}$")),
  FileMetadata: z.object({
    DataSets: z.array(DataSetSchema).optional(),
    DatabaseCDC: DatabaseCDCSchema.optional(),
  }),
});

export const OutputFileSchema = z.object({
  FileLocation: z.string().min(0).max(1024).optional(),
});

export const CompareActionSchema = z.object({
  Input: z.object({
    File: InputFileSchema.optional(),
  }),
  Output: z.object({
    File: OutputFileSchema.optional(),
  }).optional(),
});

export const StepSchema = z.object({
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$")),
  Description: z.string().min(0).max(1000).optional(),
  Action: z.object({
    ResourceAction: z.object({
      M2ManagedApplicationAction: M2ManagedApplicationActionSchema.optional(),
      M2NonManagedApplicationAction: M2NonManagedApplicationActionSchema
        .optional(),
      CloudFormationAction: CloudFormationActionSchema.optional(),
    }).optional(),
    MainframeAction: MainframeActionSchema.optional(),
    CompareAction: CompareActionSchema.optional(),
  }),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().min(0).max(1000).optional(),
  LatestVersion: z.object({
    Version: z.number(),
  }).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$")),
  Steps: z.array(StepSchema),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  LastUpdateTime: z.string().optional(),
  LatestVersion: z.object({
    Version: z.number(),
    Status: z.string(),
  }).optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  Steps: z.array(StepSchema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TestCaseArn: z.string().optional(),
  TestCaseId: z.string(),
  TestCaseVersion: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(0).max(1000).optional(),
  LatestVersion: z.object({
    Version: z.number().optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9_\\-]{1,59}$"))
    .optional(),
  Steps: z.array(StepSchema).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/apptest/test-case",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppTest TestCase resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppTest TestCase",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppTest::TestCase",
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
      description: "Get a AppTest TestCase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppTest TestCase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppTest::TestCase",
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
      description: "Update a AppTest TestCase",
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
        const identifier = existing.TestCaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppTest::TestCase",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppTest::TestCase",
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
      description: "Delete a AppTest TestCase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppTest TestCase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppTest::TestCase",
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
      description: "Sync AppTest TestCase state from AWS",
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
        const identifier = existing.TestCaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppTest::TestCase",
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
