// Auto-generated extension model for @swamp/aws/iotanalytics/dataset
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

export const DatasetContentVersionValueSchema = z.object({
  DatasetName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ),
});

export const OutputFileUriValueSchema = z.object({
  FileName: z.string().regex(new RegExp("^[\\w\\.-]{1,255}$")),
});

export const VariableSchema = z.object({
  VariableName: z.string().min(1).max(256),
  DatasetContentVersionValue: DatasetContentVersionValueSchema.optional(),
  StringValue: z.string().min(0).max(1024).optional(),
  DoubleValue: z.number().optional(),
  OutputFileUriValue: OutputFileUriValueSchema.optional(),
});

export const ResourceConfigurationSchema = z.object({
  VolumeSizeInGB: z.number().int().min(1).max(50),
  ComputeType: z.enum(["ACU_1", "ACU_2"]),
});

export const ContainerActionSchema = z.object({
  Variables: z.array(VariableSchema).optional(),
  ExecutionRoleArn: z.string().min(20).max(2048),
  Image: z.string().max(255),
  ResourceConfiguration: ResourceConfigurationSchema,
});

export const DeltaTimeSchema = z.object({
  OffsetSeconds: z.number().int(),
  TimeExpression: z.string(),
});

export const FilterSchema = z.object({
  DeltaTime: DeltaTimeSchema.optional(),
});

export const QueryActionSchema = z.object({
  Filters: z.array(FilterSchema).optional(),
  SqlQuery: z.string(),
});

export const ActionSchema = z.object({
  ActionName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_]+$")),
  ContainerAction: ContainerActionSchema.optional(),
  QueryAction: QueryActionSchema.optional(),
});

export const DeltaTimeSessionWindowConfigurationSchema = z.object({
  TimeoutInMinutes: z.number().int().min(1).max(60),
});

export const LateDataRuleConfigurationSchema = z.object({
  DeltaTimeSessionWindowConfiguration: DeltaTimeSessionWindowConfigurationSchema
    .optional(),
});

export const LateDataRuleSchema = z.object({
  RuleConfiguration: LateDataRuleConfigurationSchema,
  RuleName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_]+$"))
    .optional(),
});

export const IotEventsDestinationConfigurationSchema = z.object({
  InputName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"),
  ),
  RoleArn: z.string().min(20).max(2048),
});

export const GlueConfigurationSchema = z.object({
  DatabaseName: z.string().min(1).max(150),
  TableName: z.string().min(1).max(150),
});

export const S3DestinationConfigurationSchema = z.object({
  GlueConfiguration: GlueConfigurationSchema.optional(),
  Bucket: z.string().min(3).max(255).regex(new RegExp("^[a-zA-Z0-9.\\-_]*$")),
  Key: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9!_.*'()/{}:-]*$"),
  ),
  RoleArn: z.string().min(20).max(2048),
});

export const DatasetContentDeliveryRuleDestinationSchema = z.object({
  IotEventsDestinationConfiguration: IotEventsDestinationConfigurationSchema
    .optional(),
  S3DestinationConfiguration: S3DestinationConfigurationSchema.optional(),
});

export const DatasetContentDeliveryRuleSchema = z.object({
  Destination: DatasetContentDeliveryRuleDestinationSchema,
  EntryName: z.string().optional(),
});

export const TriggeringDatasetSchema = z.object({
  DatasetName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ),
});

export const ScheduleSchema = z.object({
  ScheduleExpression: z.string(),
});

export const TriggerSchema = z.object({
  TriggeringDataset: TriggeringDatasetSchema.optional(),
  Schedule: ScheduleSchema.optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  Actions: z.array(ActionSchema),
  LateDataRules: z.array(LateDataRuleSchema).optional(),
  DatasetName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ).optional(),
  ContentDeliveryRules: z.array(DatasetContentDeliveryRuleSchema).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  VersioningConfiguration: z.object({
    Unlimited: z.boolean().optional(),
    MaxVersions: z.number().int().min(1).max(1000).optional(),
  }).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Actions: z.array(ActionSchema).optional(),
  LateDataRules: z.array(LateDataRuleSchema).optional(),
  DatasetName: z.string(),
  ContentDeliveryRules: z.array(DatasetContentDeliveryRuleSchema).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  VersioningConfiguration: z.object({
    Unlimited: z.boolean(),
    MaxVersions: z.number(),
  }).optional(),
  Id: z.string().optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number(),
    Unlimited: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Actions: z.array(ActionSchema).optional(),
  LateDataRules: z.array(LateDataRuleSchema).optional(),
  DatasetName: z.string().min(1).max(128).regex(
    new RegExp("(^(?!_{2}))(^[a-zA-Z0-9_]+$)"),
  ).optional(),
  ContentDeliveryRules: z.array(DatasetContentDeliveryRuleSchema).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  VersioningConfiguration: z.object({
    Unlimited: z.boolean().optional(),
    MaxVersions: z.number().int().min(1).max(1000).optional(),
  }).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iotanalytics/dataset",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTAnalytics Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTAnalytics Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTAnalytics::Dataset",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DatasetName ?? g.DatasetName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTAnalytics Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTAnalytics::Dataset",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DatasetName ?? context.globalArgs.DatasetName)?.toString() ??
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
      description: "Update a IoTAnalytics Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DatasetName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DatasetName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTAnalytics::Dataset",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTAnalytics::Dataset",
          identifier,
          currentState,
          desiredState,
          ["DatasetName"],
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
      description: "Delete a IoTAnalytics Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTAnalytics::Dataset",
          args.identifier,
        );
        const instanceName = context.globalArgs.DatasetName?.toString() ??
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
      description: "Sync IoTAnalytics Dataset state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DatasetName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DatasetName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTAnalytics::Dataset",
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
