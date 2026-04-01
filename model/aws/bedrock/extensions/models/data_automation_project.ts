// Auto-generated extension model for @swamp/aws/bedrock/data-automation-project
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

export const BlueprintItemSchema = z.object({
  BlueprintArn: z.string().max(128).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov|-iso|-iso-[a-z]):bedrock:[a-zA-Z0-9-]*:(aws|[0-9]{12}):blueprint/(bedrock-data-automation-public-[a-zA-Z0-9-_]{1,30}|[a-zA-Z0-9-]{12,36})$",
    ),
  ).describe("ARN of a Blueprint"),
  BlueprintVersion: z.string().min(1).max(128).regex(new RegExp("^[0-9]*$"))
    .describe("Blueprint Version").optional(),
  BlueprintStage: z.enum(["DEVELOPMENT", "LIVE"]).describe(
    "Stage of the Blueprint",
  ).optional(),
});

export const SplitterConfigurationSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ModalityProcessingConfigurationSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const PIIEntitiesConfigurationSchema = z.object({
  PiiEntityTypes: z.array(
    z.enum([
      "ALL",
      "ADDRESS",
      "AGE",
      "NAME",
      "EMAIL",
      "PHONE",
      "USERNAME",
      "PASSWORD",
      "DRIVER_ID",
      "LICENSE_PLATE",
      "VEHICLE_IDENTIFICATION_NUMBER",
      "CREDIT_DEBIT_CARD_CVV",
      "CREDIT_DEBIT_CARD_EXPIRY",
      "CREDIT_DEBIT_CARD_NUMBER",
      "PIN",
      "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
      "SWIFT_CODE",
      "IP_ADDRESS",
      "MAC_ADDRESS",
      "URL",
      "AWS_ACCESS_KEY",
      "AWS_SECRET_KEY",
      "US_BANK_ACCOUNT_NUMBER",
      "US_BANK_ROUTING_NUMBER",
      "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
      "US_PASSPORT_NUMBER",
      "US_SOCIAL_SECURITY_NUMBER",
      "CA_HEALTH_NUMBER",
      "CA_SOCIAL_INSURANCE_NUMBER",
      "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
      "UK_NATIONAL_INSURANCE_NUMBER",
      "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
    ]),
  ).optional(),
  RedactionMaskMode: z.enum(["PII", "ENTITY_TYPE"]).optional(),
});

export const SensitiveDataConfigurationSchema = z.object({
  DetectionMode: z.enum(["DETECTION", "DETECTION_AND_REDACTION"]).optional(),
  DetectionScope: z.array(z.enum(["STANDARD", "CUSTOM"])).optional(),
  PiiEntitiesConfiguration: PIIEntitiesConfigurationSchema.optional(),
});

export const DocumentOverrideConfigurationSchema = z.object({
  Splitter: SplitterConfigurationSchema.optional(),
  ModalityProcessing: ModalityProcessingConfigurationSchema.optional(),
  SensitiveDataConfiguration: SensitiveDataConfigurationSchema.optional(),
});

export const AudioLanguageConfigurationSchema = z.object({
  InputLanguages: z.array(
    z.enum(["EN", "DE", "ES", "FR", "IT", "PT", "JA", "KO", "CN", "TW", "HK"]),
  ).optional(),
  GenerativeOutputLanguage: z.enum(["DEFAULT", "EN"]).optional(),
  IdentifyMultipleLanguages: z.boolean().optional(),
});

export const AudioOverrideConfigurationSchema = z.object({
  ModalityProcessing: ModalityProcessingConfigurationSchema.optional(),
  LanguageConfiguration: AudioLanguageConfigurationSchema.optional(),
  SensitiveDataConfiguration: SensitiveDataConfigurationSchema.optional(),
});

export const VideoOverrideConfigurationSchema = z.object({
  ModalityProcessing: ModalityProcessingConfigurationSchema.optional(),
  SensitiveDataConfiguration: SensitiveDataConfigurationSchema.optional(),
});

export const ImageOverrideConfigurationSchema = z.object({
  ModalityProcessing: ModalityProcessingConfigurationSchema.optional(),
  SensitiveDataConfiguration: SensitiveDataConfigurationSchema.optional(),
});

export const ModalityRoutingConfigurationSchema = z.object({
  jpeg: z.enum(["DOCUMENT", "IMAGE", "VIDEO", "AUDIO"]).optional(),
  png: z.enum(["DOCUMENT", "IMAGE", "VIDEO", "AUDIO"]).optional(),
  mp4: z.enum(["DOCUMENT", "IMAGE", "VIDEO", "AUDIO"]).optional(),
  mov: z.enum(["DOCUMENT", "IMAGE", "VIDEO", "AUDIO"]).optional(),
});

export const DocumentExtractionGranularitySchema = z.object({
  Types: z.array(z.enum(["DOCUMENT", "PAGE", "ELEMENT", "WORD", "LINE"]))
    .optional(),
});

export const DocumentBoundingBoxSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const DocumentStandardExtractionSchema = z.object({
  Granularity: DocumentExtractionGranularitySchema,
  BoundingBox: DocumentBoundingBoxSchema,
});

export const DocumentStandardGenerativeFieldSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const DocumentOutputTextFormatSchema = z.object({
  Types: z.array(z.enum(["PLAIN_TEXT", "MARKDOWN", "HTML", "CSV"])).optional(),
});

export const DocumentOutputAdditionalFileFormatSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const DocumentOutputFormatSchema = z.object({
  TextFormat: DocumentOutputTextFormatSchema,
  AdditionalFileFormat: DocumentOutputAdditionalFileFormatSchema,
});

export const DocumentStandardOutputConfigurationSchema = z.object({
  Extraction: DocumentStandardExtractionSchema.optional(),
  GenerativeField: DocumentStandardGenerativeFieldSchema.optional(),
  OutputFormat: DocumentOutputFormatSchema.optional(),
});

export const ImageExtractionCategorySchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(z.enum(["CONTENT_MODERATION", "TEXT_DETECTION", "LOGOS"]))
    .optional(),
});

export const ImageBoundingBoxSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const ImageStandardExtractionSchema = z.object({
  Category: ImageExtractionCategorySchema,
  BoundingBox: ImageBoundingBoxSchema,
});

export const ImageStandardGenerativeFieldSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(z.enum(["IMAGE_SUMMARY", "IAB"])).optional(),
});

export const ImageStandardOutputConfigurationSchema = z.object({
  Extraction: ImageStandardExtractionSchema.optional(),
  GenerativeField: ImageStandardGenerativeFieldSchema.optional(),
});

export const VideoExtractionCategorySchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(
    z.enum(["CONTENT_MODERATION", "TEXT_DETECTION", "TRANSCRIPT", "LOGOS"]),
  ).optional(),
});

export const VideoBoundingBoxSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const VideoStandardExtractionSchema = z.object({
  Category: VideoExtractionCategorySchema,
  BoundingBox: VideoBoundingBoxSchema,
});

export const VideoStandardGenerativeFieldSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(z.enum(["VIDEO_SUMMARY", "IAB", "CHAPTER_SUMMARY"]))
    .optional(),
});

export const VideoStandardOutputConfigurationSchema = z.object({
  Extraction: VideoStandardExtractionSchema.optional(),
  GenerativeField: VideoStandardGenerativeFieldSchema.optional(),
});

export const SpeakerLabelingConfigurationSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const ChannelLabelingConfigurationSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
});

export const TranscriptConfigurationSchema = z.object({
  SpeakerLabeling: SpeakerLabelingConfigurationSchema.optional(),
  ChannelLabeling: ChannelLabelingConfigurationSchema.optional(),
});

export const AudioExtractionCategoryTypeConfigurationSchema = z.object({
  Transcript: TranscriptConfigurationSchema.optional(),
});

export const AudioExtractionCategorySchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(
    z.enum([
      "AUDIO_CONTENT_MODERATION",
      "TRANSCRIPT",
      "TOPIC_CONTENT_MODERATION",
    ]),
  ).optional(),
  TypeConfiguration: AudioExtractionCategoryTypeConfigurationSchema.optional(),
});

export const AudioStandardExtractionSchema = z.object({
  Category: AudioExtractionCategorySchema,
});

export const AudioStandardGenerativeFieldSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]),
  Types: z.array(z.enum(["AUDIO_SUMMARY", "IAB", "TOPIC_SUMMARY"])).optional(),
});

export const AudioStandardOutputConfigurationSchema = z.object({
  Extraction: AudioStandardExtractionSchema.optional(),
  GenerativeField: AudioStandardGenerativeFieldSchema.optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Key for the tag"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Value for the tag"),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CustomOutputConfiguration: z.object({
    Blueprints: z.array(BlueprintItemSchema).optional(),
  }).describe("Custom output configuration").optional(),
  OverrideConfiguration: z.object({
    Document: DocumentOverrideConfigurationSchema.optional(),
    Audio: AudioOverrideConfigurationSchema.optional(),
    Video: VideoOverrideConfigurationSchema.optional(),
    Image: ImageOverrideConfigurationSchema.optional(),
    ModalityRouting: ModalityRoutingConfigurationSchema.describe(
      "Modality routing configuration",
    ).optional(),
  }).describe("Override configuration").optional(),
  ProjectDescription: z.string().describe(
    "Description of the DataAutomationProject",
  ).optional(),
  ProjectName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Name of the DataAutomationProject"),
  ProjectType: z.enum(["ASYNC", "SYNC"]).describe(
    "Type of the DataAutomationProject - Sync or Async",
  ).optional(),
  StandardOutputConfiguration: z.object({
    Document: DocumentStandardOutputConfigurationSchema.optional(),
    Image: ImageStandardOutputConfigurationSchema.optional(),
    Video: VideoStandardOutputConfigurationSchema.optional(),
    Audio: AudioStandardOutputConfigurationSchema.optional(),
  }).describe("Standard output configuration").optional(),
  KmsKeyId: z.string().min(1).max(2048).describe("KMS key identifier")
    .optional(),
  KmsEncryptionContext: z.record(z.string(), z.string()).describe(
    "KMS encryption context",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  CustomOutputConfiguration: z.object({
    Blueprints: z.array(BlueprintItemSchema),
  }).optional(),
  LastModifiedTime: z.string().optional(),
  OverrideConfiguration: z.object({
    Document: DocumentOverrideConfigurationSchema,
    Audio: AudioOverrideConfigurationSchema,
    Video: VideoOverrideConfigurationSchema,
    Image: ImageOverrideConfigurationSchema,
    ModalityRouting: ModalityRoutingConfigurationSchema,
  }).optional(),
  ProjectArn: z.string(),
  ProjectDescription: z.string().optional(),
  ProjectName: z.string().optional(),
  ProjectType: z.string().optional(),
  ProjectStage: z.string().optional(),
  StandardOutputConfiguration: z.object({
    Document: DocumentStandardOutputConfigurationSchema,
    Image: ImageStandardOutputConfigurationSchema,
    Video: VideoStandardOutputConfigurationSchema,
    Audio: AudioStandardOutputConfigurationSchema,
  }).optional(),
  Status: z.string().optional(),
  KmsKeyId: z.string().optional(),
  KmsEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CustomOutputConfiguration: z.object({
    Blueprints: z.array(BlueprintItemSchema).optional(),
  }).describe("Custom output configuration").optional(),
  OverrideConfiguration: z.object({
    Document: DocumentOverrideConfigurationSchema.optional(),
    Audio: AudioOverrideConfigurationSchema.optional(),
    Video: VideoOverrideConfigurationSchema.optional(),
    Image: ImageOverrideConfigurationSchema.optional(),
    ModalityRouting: ModalityRoutingConfigurationSchema.describe(
      "Modality routing configuration",
    ).optional(),
  }).describe("Override configuration").optional(),
  ProjectDescription: z.string().describe(
    "Description of the DataAutomationProject",
  ).optional(),
  ProjectName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Name of the DataAutomationProject").optional(),
  ProjectType: z.enum(["ASYNC", "SYNC"]).describe(
    "Type of the DataAutomationProject - Sync or Async",
  ).optional(),
  StandardOutputConfiguration: z.object({
    Document: DocumentStandardOutputConfigurationSchema.optional(),
    Image: ImageStandardOutputConfigurationSchema.optional(),
    Video: VideoStandardOutputConfigurationSchema.optional(),
    Audio: AudioStandardOutputConfigurationSchema.optional(),
  }).describe("Standard output configuration").optional(),
  KmsKeyId: z.string().min(1).max(2048).describe("KMS key identifier")
    .optional(),
  KmsEncryptionContext: z.record(z.string(), z.string()).describe(
    "KMS encryption context",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
});

export const model = {
  type: "@swamp/aws/bedrock/data-automation-project",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock DataAutomationProject resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock DataAutomationProject",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::DataAutomationProject",
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
      description: "Get a Bedrock DataAutomationProject",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock DataAutomationProject",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::DataAutomationProject",
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
      description: "Update a Bedrock DataAutomationProject",
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
        const identifier = existing.ProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::DataAutomationProject",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::DataAutomationProject",
          identifier,
          currentState,
          desiredState,
          ["ProjectName", "ProjectType"],
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
      description: "Delete a Bedrock DataAutomationProject",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock DataAutomationProject",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::DataAutomationProject",
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
      description: "Sync Bedrock DataAutomationProject state from AWS",
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
        const identifier = existing.ProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::DataAutomationProject",
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
