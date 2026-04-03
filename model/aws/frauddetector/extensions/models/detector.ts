// Auto-generated extension model for @swamp/aws/frauddetector/detector
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

export const OutcomeSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this outcome.")
    .optional(),
  CreatedTime: z.string().describe("The time when the outcome was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the outcome was last updated.",
  ).optional(),
});

export const RuleSchema = z.object({
  RuleId: z.string().optional(),
  RuleVersion: z.string().optional(),
  DetectorId: z.string().optional(),
  Expression: z.string().optional(),
  Language: z.enum(["DETECTORPL"]).optional(),
  Outcomes: z.array(OutcomeSchema).optional(),
  Arn: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this event type.")
    .optional(),
  CreatedTime: z.string().describe("The time when the event type was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the event type was last updated.",
  ).optional(),
});

export const EventVariableSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  DataSource: z.enum(["EVENT"]).optional(),
  DataType: z.enum(["STRING", "INTEGER", "FLOAT", "BOOLEAN"]).optional(),
  DefaultValue: z.string().optional(),
  VariableType: z.enum([
    "AUTH_CODE",
    "AVS",
    "BILLING_ADDRESS_L1",
    "BILLING_ADDRESS_L2",
    "BILLING_CITY",
    "BILLING_COUNTRY",
    "BILLING_NAME",
    "BILLING_PHONE",
    "BILLING_STATE",
    "BILLING_ZIP",
    "CARD_BIN",
    "CATEGORICAL",
    "CURRENCY_CODE",
    "EMAIL_ADDRESS",
    "FINGERPRINT",
    "FRAUD_LABEL",
    "FREE_FORM_TEXT",
    "IP_ADDRESS",
    "NUMERIC",
    "ORDER_ID",
    "PAYMENT_TYPE",
    "PHONE_NUMBER",
    "PRICE",
    "PRODUCT_CATEGORY",
    "SHIPPING_ADDRESS_L1",
    "SHIPPING_ADDRESS_L2",
    "SHIPPING_CITY",
    "SHIPPING_COUNTRY",
    "SHIPPING_NAME",
    "SHIPPING_PHONE",
    "SHIPPING_STATE",
    "SHIPPING_ZIP",
    "USERAGENT",
  ]).optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this event variable.")
    .optional(),
  CreatedTime: z.string().describe(
    "The time when the event variable was created.",
  ).optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the event variable was last updated.",
  ).optional(),
});

export const LabelSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this label.")
    .optional(),
  CreatedTime: z.string().describe("The time when the label was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the label was last updated.",
  ).optional(),
});

export const EntityTypeSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this entity type.")
    .optional(),
  CreatedTime: z.string().describe("The time when the entity type was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the entity type was last updated.",
  ).optional(),
});

export const ModelSchema = z.object({
  Arn: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DetectorId: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$"))
    .describe("The ID of the detector"),
  DetectorVersionStatus: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The desired detector version status for the detector",
  ).optional(),
  RuleExecutionMode: z.enum(["FIRST_MATCHED", "ALL_MATCHED"]).optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this detector.")
    .optional(),
  Description: z.string().min(1).max(128).describe(
    "The description of the detector.",
  ).optional(),
  Rules: z.array(RuleSchema),
  EventType: z.object({
    Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$")).describe(
      "The name for the event type",
    ).optional(),
    Inline: z.boolean().optional(),
    Tags: z.array(TagSchema).describe("Tags associated with this event type.")
      .optional(),
    Description: z.string().min(1).max(128).describe(
      "The description of the event type.",
    ).optional(),
    EventVariables: z.array(EventVariableSchema).optional(),
    Labels: z.array(LabelSchema).optional(),
    EntityTypes: z.array(EntityTypeSchema).optional(),
  }).describe("The event type to associate this detector with."),
  AssociatedModels: z.array(ModelSchema).describe(
    "The models to associate with this detector.",
  ).optional(),
});

const StateSchema = z.object({
  DetectorId: z.string().optional(),
  DetectorVersionStatus: z.string().optional(),
  DetectorVersionId: z.string().optional(),
  RuleExecutionMode: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  Rules: z.array(RuleSchema).optional(),
  EventType: z.object({
    Name: z.string(),
    Inline: z.boolean(),
    Tags: z.array(TagSchema),
    Description: z.string(),
    EventVariables: z.array(EventVariableSchema),
    Labels: z.array(LabelSchema),
    EntityTypes: z.array(EntityTypeSchema),
    Arn: z.string(),
    CreatedTime: z.string(),
    LastUpdatedTime: z.string(),
  }).optional(),
  Arn: z.string(),
  CreatedTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  AssociatedModels: z.array(ModelSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DetectorId: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$"))
    .describe("The ID of the detector").optional(),
  DetectorVersionStatus: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The desired detector version status for the detector",
  ).optional(),
  RuleExecutionMode: z.enum(["FIRST_MATCHED", "ALL_MATCHED"]).optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this detector.")
    .optional(),
  Description: z.string().min(1).max(128).describe(
    "The description of the detector.",
  ).optional(),
  Rules: z.array(RuleSchema).optional(),
  EventType: z.object({
    Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$")).describe(
      "The name for the event type",
    ).optional(),
    Inline: z.boolean().optional(),
    Tags: z.array(TagSchema).describe("Tags associated with this event type.")
      .optional(),
    Description: z.string().min(1).max(128).describe(
      "The description of the event type.",
    ).optional(),
    EventVariables: z.array(EventVariableSchema).optional(),
    Labels: z.array(LabelSchema).optional(),
    EntityTypes: z.array(EntityTypeSchema).optional(),
  }).describe("The event type to associate this detector with.").optional(),
  AssociatedModels: z.array(ModelSchema).describe(
    "The models to associate with this detector.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/frauddetector/detector",
  version: "2026.04.03.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "FraudDetector Detector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FraudDetector Detector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::FraudDetector::Detector",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a FraudDetector Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FraudDetector Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::FraudDetector::Detector",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a FraudDetector Detector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::FraudDetector::Detector",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::FraudDetector::Detector",
          identifier,
          currentState,
          desiredState,
          ["DetectorId"],
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
      description: "Delete a FraudDetector Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FraudDetector Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::FraudDetector::Detector",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync FraudDetector Detector state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::FraudDetector::Detector",
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
