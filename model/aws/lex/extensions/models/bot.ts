// Auto-generated extension model for @swamp/aws/lex/bot
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

export const LambdaCodeHookSchema = z.object({
  CodeHookInterfaceVersion: z.string().min(1).max(5),
  LambdaArn: z.string().min(20).max(2048),
});

export const CodeHookSpecificationSchema = z.object({
  LambdaCodeHook: LambdaCodeHookSchema,
});

export const BotAliasLocaleSettingsSchema = z.object({
  CodeHookSpecification: CodeHookSpecificationSchema.optional(),
  Enabled: z.boolean(),
});

export const BotAliasLocaleSettingsItemSchema = z.object({
  LocaleId: z.string().min(1).max(128),
  BotAliasLocaleSetting: BotAliasLocaleSettingsSchema,
});

export const S3BucketLogDestinationSchema = z.object({
  S3BucketArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:[\\w\\-]+:s3:::[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
  LogPrefix: z.string().min(0).max(1024),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w\\-]+:kms:[\\w\\-]+:[\\d]{12}:(?:key\\/[\\w\\-]+|alias\\/[a-zA-Z0-9:\\/_\\-]{1,256})$",
    ),
  ).optional(),
});

export const AudioLogDestinationSchema = z.object({
  S3Bucket: S3BucketLogDestinationSchema,
});

export const AudioLogSettingSchema = z.object({
  Destination: AudioLogDestinationSchema,
  Enabled: z.boolean(),
});

export const CloudWatchLogGroupLogDestinationSchema = z.object({
  CloudWatchLogGroupArn: z.string().min(1).max(2048),
  LogPrefix: z.string().min(0).max(1024),
});

export const TextLogDestinationSchema = z.object({
  CloudWatch: CloudWatchLogGroupLogDestinationSchema,
});

export const TextLogSettingSchema = z.object({
  Destination: TextLogDestinationSchema,
  Enabled: z.boolean(),
});

export const ConversationLogSettingsSchema = z.object({
  AudioLogSettings: z.array(AudioLogSettingSchema).optional(),
  TextLogSettings: z.array(TextLogSettingSchema).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400),
  BotLocales: z.array(z.string()).optional(),
  BotFileS3Location: z.object({
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ),
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
  }).optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  TestBotAliasSettings: z.object({
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }).optional(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)),
  }).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  RoleArn: z.string().optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }).optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  IdleSessionTTLInSeconds: z.number().optional(),
  BotLocales: z.array(z.string()).optional(),
  BotFileS3Location: z.object({
    S3Bucket: z.string(),
    S3ObjectKey: z.string(),
    S3ObjectVersion: z.string(),
  }).optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  TestBotAliasSettings: z.object({
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema),
    ConversationLogSettings: ConversationLogSettingsSchema,
    Description: z.string(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$"))
    .optional(),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ).optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean().optional(),
  }).optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400).optional(),
  BotLocales: z.array(z.string()).optional(),
  BotFileS3Location: z.object({
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ).optional(),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ).optional(),
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
  }).optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  TestBotAliasSettings: z.object({
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean().optional(),
    }).optional(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/lex/bot",
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
      description: "Lex Bot resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lex Bot",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lex::Bot",
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
      description: "Get a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lex::Bot",
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
      description: "Update a Lex Bot",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lex::Bot",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lex::Bot",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lex::Bot",
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
      description: "Sync Lex Bot state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lex::Bot",
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
