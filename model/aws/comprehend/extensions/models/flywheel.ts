// Auto-generated extension model for @swamp/aws/comprehend/flywheel
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

export const VpcConfigSchema = z.object({
  SecurityGroupIds: z.array(
    z.string().min(1).max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
  ),
  Subnets: z.array(
    z.string().min(1).max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

export const DocumentClassificationConfigSchema = z.object({
  Mode: z.enum(["MULTI_CLASS", "MULTI_LABEL"]),
  Labels: z.array(z.string().max(5000)).optional(),
});

export const EntityTypesListItemSchema = z.object({
  Type: z.string().min(1).max(64).regex(
    new RegExp("^(?![^\\n\\r\\t,]*\\\\n|\\\\r|\\\\t)[^\\n\\r\\t,]+$"),
  ),
});

export const EntityRecognitionConfigSchema = z.object({
  EntityTypes: z.array(EntityTypesListItemSchema).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ActiveModelArn: z.string().max(256).regex(
    new RegExp(
      "arn:aws(-[^:]+)?:comprehend:[a-zA-Z0-9-]*:[0-9]{12}:(document-classifier|entity-recognizer)/[a-zA-Z0-9](-*[a-zA-Z0-9])*(/version/[a-zA-Z0-9](-*[a-zA-Z0-9])*)?",
    ),
  ).optional(),
  DataAccessRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+"),
  ),
  DataLakeS3Uri: z.string().max(512).regex(
    new RegExp("s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?"),
  ),
  DataSecurityConfig: z.object({
    ModelKmsKeyId: z.string().min(1).max(2048).optional(),
    VolumeKmsKeyId: z.string().min(1).max(2048).optional(),
    DataLakeKmsKeyId: z.string().min(1).max(2048).optional(),
    VpcConfig: VpcConfigSchema.optional(),
  }).optional(),
  FlywheelName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ),
  ModelType: z.enum(["DOCUMENT_CLASSIFIER", "ENTITY_RECOGNIZER"]).optional(),
  Tags: z.array(TagSchema).optional(),
  TaskConfig: z.object({
    LanguageCode: z.enum(["en", "es", "fr", "it", "de", "pt"]),
    DocumentClassificationConfig: DocumentClassificationConfigSchema.optional(),
    EntityRecognitionConfig: EntityRecognitionConfigSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  ActiveModelArn: z.string().optional(),
  DataAccessRoleArn: z.string().optional(),
  DataLakeS3Uri: z.string().optional(),
  DataSecurityConfig: z.object({
    ModelKmsKeyId: z.string(),
    VolumeKmsKeyId: z.string(),
    DataLakeKmsKeyId: z.string(),
    VpcConfig: VpcConfigSchema,
  }).optional(),
  FlywheelName: z.string().optional(),
  ModelType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TaskConfig: z.object({
    LanguageCode: z.string(),
    DocumentClassificationConfig: DocumentClassificationConfigSchema,
    EntityRecognitionConfig: EntityRecognitionConfigSchema,
  }).optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ActiveModelArn: z.string().max(256).regex(
    new RegExp(
      "arn:aws(-[^:]+)?:comprehend:[a-zA-Z0-9-]*:[0-9]{12}:(document-classifier|entity-recognizer)/[a-zA-Z0-9](-*[a-zA-Z0-9])*(/version/[a-zA-Z0-9](-*[a-zA-Z0-9])*)?",
    ),
  ).optional(),
  DataAccessRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+"),
  ).optional(),
  DataLakeS3Uri: z.string().max(512).regex(
    new RegExp("s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?"),
  ).optional(),
  DataSecurityConfig: z.object({
    ModelKmsKeyId: z.string().min(1).max(2048).optional(),
    VolumeKmsKeyId: z.string().min(1).max(2048).optional(),
    DataLakeKmsKeyId: z.string().min(1).max(2048).optional(),
    VpcConfig: VpcConfigSchema.optional(),
  }).optional(),
  FlywheelName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).optional(),
  ModelType: z.enum(["DOCUMENT_CLASSIFIER", "ENTITY_RECOGNIZER"]).optional(),
  Tags: z.array(TagSchema).optional(),
  TaskConfig: z.object({
    LanguageCode: z.enum(["en", "es", "fr", "it", "de", "pt"]).optional(),
    DocumentClassificationConfig: DocumentClassificationConfigSchema.optional(),
    EntityRecognitionConfig: EntityRecognitionConfigSchema.optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/comprehend/flywheel",
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
      description: "Comprehend Flywheel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Comprehend Flywheel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Comprehend::Flywheel",
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
      description: "Get a Comprehend Flywheel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Comprehend Flywheel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Comprehend::Flywheel",
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
      description: "Update a Comprehend Flywheel",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Comprehend::Flywheel",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Comprehend::Flywheel",
          identifier,
          currentState,
          desiredState,
          ["FlywheelName", "ModelType", "DataLakeS3Uri", "TaskConfig"],
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
      description: "Delete a Comprehend Flywheel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Comprehend Flywheel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Comprehend::Flywheel",
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
      description: "Sync Comprehend Flywheel state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Comprehend::Flywheel",
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
