// Auto-generated extension model for @swamp/aws/customerprofiles/integration
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

export const ConnectorOperatorSchema = z.object({
  Marketo: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "BETWEEN",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  S3: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Salesforce: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "CONTAINS",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  ServiceNow: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "CONTAINS",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Zendesk: z.enum([
    "PROJECTION",
    "GREATER_THAN",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
});

export const TaskPropertiesMapSchema = z.object({
  OperatorPropertyKey: z.enum([
    "VALUE",
    "VALUES",
    "DATA_TYPE",
    "UPPER_BOUND",
    "LOWER_BOUND",
    "SOURCE_DATA_TYPE",
    "DESTINATION_DATA_TYPE",
    "VALIDATION_ACTION",
    "MASK_VALUE",
    "MASK_LENGTH",
    "TRUNCATE_LENGTH",
    "MATH_OPERATION_FIELDS_ORDER",
    "CONCAT_FORMAT",
    "SUBFIELD_CATEGORY_MAP",
  ]),
  Property: z.string().max(2048).regex(new RegExp(".+")),
});

export const TaskSchema = z.object({
  ConnectorOperator: ConnectorOperatorSchema.optional(),
  SourceFields: z.array(z.string().max(2048).regex(new RegExp(".*"))),
  DestinationField: z.string().max(256).regex(new RegExp(".*")).optional(),
  TaskType: z.enum([
    "Arithmetic",
    "Filter",
    "Map",
    "Mask",
    "Merge",
    "Truncate",
    "Validate",
  ]),
  TaskProperties: z.array(TaskPropertiesMapSchema).optional(),
});

export const ScheduledTriggerPropertiesSchema = z.object({
  ScheduleExpression: z.string().max(256).regex(new RegExp(".*")),
  DataPullMode: z.enum(["Incremental", "Complete"]).optional(),
  ScheduleStartTime: z.number().optional(),
  ScheduleEndTime: z.number().optional(),
  Timezone: z.string().max(256).regex(new RegExp(".*")).optional(),
  ScheduleOffset: z.number().int().min(0).max(36000).optional(),
  FirstExecutionFrom: z.number().optional(),
});

export const TriggerPropertiesSchema = z.object({
  Scheduled: ScheduledTriggerPropertiesSchema.optional(),
});

export const TriggerConfigSchema = z.object({
  TriggerType: z.enum(["Scheduled", "Event", "OnDemand"]),
  TriggerProperties: TriggerPropertiesSchema.optional(),
});

export const IncrementalPullConfigSchema = z.object({
  DatetimeTypeFieldName: z.string().max(256).optional(),
});

export const MarketoSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

export const S3SourcePropertiesSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")),
  BucketPrefix: z.string().max(512).regex(new RegExp(".*")).optional(),
});

export const SalesforceSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  EnableDynamicFieldUpdate: z.boolean().optional(),
  IncludeDeletedRecords: z.boolean().optional(),
});

export const ServiceNowSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

export const ZendeskSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

export const SourceConnectorPropertiesSchema = z.object({
  Marketo: MarketoSourcePropertiesSchema.optional(),
  S3: S3SourcePropertiesSchema.optional(),
  Salesforce: SalesforceSourcePropertiesSchema.optional(),
  ServiceNow: ServiceNowSourcePropertiesSchema.optional(),
  Zendesk: ZendeskSourcePropertiesSchema.optional(),
});

export const SourceFlowConfigSchema = z.object({
  ConnectorType: z.enum([
    "Salesforce",
    "Marketo",
    "ServiceNow",
    "Zendesk",
    "S3",
  ]),
  ConnectorProfileName: z.string().max(256).regex(new RegExp("[\\w/!@#+=.-]+"))
    .optional(),
  IncrementalPullConfig: IncrementalPullConfigSchema.optional(),
  SourceConnectorProperties: SourceConnectorPropertiesSchema,
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
});

export const ObjectTypeMappingSchema = z.object({
  Key: z.string().min(1).max(255),
  Value: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  Uri: z.string().min(1).max(255).describe(
    "The URI of the S3 bucket or any other type of data source.",
  ).optional(),
  FlowDefinition: z.object({
    FlowName: z.string().max(256).regex(new RegExp("[a-zA-Z0-9][\\w!@#.-]+")),
    Description: z.string().max(2048).regex(new RegExp("[\\w!@#\\-.?,\\s]*"))
      .optional(),
    KmsArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
    ),
    Tasks: z.array(TaskSchema),
    TriggerConfig: TriggerConfigSchema,
    SourceFlowConfig: SourceFlowConfigSchema,
  }).optional(),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe(
    "The name of the ObjectType defined for the 3rd party data in Profile Service",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the integration",
  ).optional(),
  ObjectTypeNames: z.array(ObjectTypeMappingSchema).describe(
    "The mapping between 3rd party event types and ObjectType names",
  ).optional(),
  EventTriggerNames: z.array(
    z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ).describe(
    "A list of unique names for active event triggers associated with the integration.",
  ).optional(),
  Scope: z.enum(["PROFILE", "DOMAIN"]).describe(
    "Scope of the integration, such as 'PROFILE' or 'DOMAIN'",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  Uri: z.string(),
  FlowDefinition: z.object({
    FlowName: z.string(),
    Description: z.string(),
    KmsArn: z.string(),
    Tasks: z.array(TaskSchema),
    TriggerConfig: TriggerConfigSchema,
    SourceFlowConfig: SourceFlowConfigSchema,
  }).optional(),
  ObjectTypeName: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ObjectTypeNames: z.array(ObjectTypeMappingSchema).optional(),
  EventTriggerNames: z.array(z.string()).optional(),
  Scope: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain.").optional(),
  Uri: z.string().min(1).max(255).describe(
    "The URI of the S3 bucket or any other type of data source.",
  ).optional(),
  FlowDefinition: z.object({
    FlowName: z.string().max(256).regex(new RegExp("[a-zA-Z0-9][\\w!@#.-]+"))
      .optional(),
    Description: z.string().max(2048).regex(new RegExp("[\\w!@#\\-.?,\\s]*"))
      .optional(),
    KmsArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
    ).optional(),
    Tasks: z.array(TaskSchema).optional(),
    TriggerConfig: TriggerConfigSchema.optional(),
    SourceFlowConfig: SourceFlowConfigSchema.optional(),
  }).optional(),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe(
    "The name of the ObjectType defined for the 3rd party data in Profile Service",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the integration",
  ).optional(),
  ObjectTypeNames: z.array(ObjectTypeMappingSchema).describe(
    "The mapping between 3rd party event types and ObjectType names",
  ).optional(),
  EventTriggerNames: z.array(
    z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ).describe(
    "A list of unique names for active event triggers associated with the integration.",
  ).optional(),
  Scope: z.enum(["PROFILE", "DOMAIN"]).describe(
    "Scope of the integration, such as 'PROFILE' or 'DOMAIN'",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/customerprofiles/integration",
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
      description: "CustomerProfiles Integration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles Integration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CustomerProfiles::Integration",
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
      description: "Get a CustomerProfiles Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CustomerProfiles::Integration",
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
      description: "Update a CustomerProfiles Integration",
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
          existing.DomainName?.toString(),
          existing.Uri?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::Integration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CustomerProfiles::Integration",
          identifier,
          currentState,
          desiredState,
          ["DomainName", "Uri"],
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
      description: "Delete a CustomerProfiles Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::Integration",
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
      description: "Sync CustomerProfiles Integration state from AWS",
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
          existing.DomainName?.toString(),
          existing.Uri?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::Integration",
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
