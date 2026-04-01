// Auto-generated extension model for @swamp/aws/bedrockagentcore/memory
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

export const SemanticMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

export const SummaryMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

export const UserPreferenceMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

export const SemanticOverrideExtractionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

export const SemanticOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

export const SemanticOverrideSchema = z.object({
  Extraction: SemanticOverrideExtractionConfigurationInputSchema.optional(),
  Consolidation: SemanticOverrideConsolidationConfigurationInputSchema
    .optional(),
});

export const SummaryOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

export const SummaryOverrideSchema = z.object({
  Consolidation: SummaryOverrideConsolidationConfigurationInputSchema
    .optional(),
});

export const UserPreferenceOverrideExtractionConfigurationInputSchema = z
  .object({
    AppendToPrompt: z.string().min(1).max(30000).describe(
      "Text prompt for model instructions",
    ),
    ModelId: z.string(),
  });

export const UserPreferenceOverrideConsolidationConfigurationInputSchema = z
  .object({
    AppendToPrompt: z.string().min(1).max(30000).describe(
      "Text prompt for model instructions",
    ),
    ModelId: z.string(),
  });

export const UserPreferenceOverrideSchema = z.object({
  Extraction: UserPreferenceOverrideExtractionConfigurationInputSchema
    .optional(),
  Consolidation: UserPreferenceOverrideConsolidationConfigurationInputSchema
    .optional(),
});

export const MessageBasedTriggerInputSchema = z.object({
  MessageCount: z.number().int().min(1).max(50).optional(),
});

export const TokenBasedTriggerInputSchema = z.object({
  TokenCount: z.number().int().min(100).max(500000).optional(),
});

export const TimeBasedTriggerInputSchema = z.object({
  IdleSessionTimeout: z.number().int().min(10).max(3000).optional(),
});

export const TriggerConditionInputSchema = z.object({
  MessageBasedTrigger: MessageBasedTriggerInputSchema.optional(),
  TokenBasedTrigger: TokenBasedTriggerInputSchema.optional(),
  TimeBasedTrigger: TimeBasedTriggerInputSchema.optional(),
});

export const InvocationConfigurationInputSchema = z.object({
  TopicArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  PayloadDeliveryBucketName: z.string().regex(
    new RegExp("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$"),
  ).optional(),
});

export const SelfManagedConfigurationSchema = z.object({
  TriggerConditions: z.array(TriggerConditionInputSchema).optional(),
  InvocationConfiguration: InvocationConfigurationInputSchema.optional(),
  HistoricalContextWindowSize: z.number().int().min(0).max(50).optional(),
});

export const EpisodicOverrideExtractionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

export const EpisodicOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

export const EpisodicOverrideReflectionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
});

export const EpisodicOverrideSchema = z.object({
  Extraction: EpisodicOverrideExtractionConfigurationInputSchema.optional(),
  Consolidation: EpisodicOverrideConsolidationConfigurationInputSchema
    .optional(),
  Reflection: EpisodicOverrideReflectionConfigurationInputSchema.optional(),
});

export const CustomConfigurationInputSchema = z.object({
  SemanticOverride: SemanticOverrideSchema.optional(),
  SummaryOverride: SummaryOverrideSchema.optional(),
  UserPreferenceOverride: UserPreferenceOverrideSchema.optional(),
  SelfManagedConfiguration: SelfManagedConfigurationSchema.optional(),
  EpisodicOverride: EpisodicOverrideSchema.optional(),
});

export const CustomMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  Configuration: CustomConfigurationInputSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

export const EpisodicReflectionConfigurationInputSchema = z.object({
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy"),
});

export const EpisodicMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  ReflectionConfiguration: EpisodicReflectionConfigurationInputSchema
    .optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

export const MemoryStrategySchema = z.object({
  SemanticMemoryStrategy: SemanticMemoryStrategySchema.optional(),
  SummaryMemoryStrategy: SummaryMemoryStrategySchema.optional(),
  UserPreferenceMemoryStrategy: UserPreferenceMemoryStrategySchema.optional(),
  CustomMemoryStrategy: CustomMemoryStrategySchema.optional(),
  EpisodicMemoryStrategy: EpisodicMemoryStrategySchema.optional(),
});

export const ContentConfigurationSchema = z.object({
  Type: z.enum(["MEMORY_RECORDS"]).describe("The type of content to deliver"),
  Level: z.enum(["METADATA_ONLY", "FULL_CONTENT"]).describe(
    "The level of content detail to deliver",
  ).optional(),
});

export const KinesisResourceSchema = z.object({
  DataStreamArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format"),
  ContentConfigurations: z.array(ContentConfigurationSchema),
});

export const StreamDeliveryResourceSchema = z.object({
  Kinesis: KinesisResourceSchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  MemoryExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  EventExpiryDuration: z.number().int().min(3).max(365).describe(
    "Duration in days until memory events expire",
  ),
  MemoryStrategies: z.array(MemoryStrategySchema).describe(
    "List of memory strategies attached to this memory",
  ).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
  MemoryExecutionRoleArn: z.string().optional(),
  EventExpiryDuration: z.number().optional(),
  MemoryArn: z.string(),
  MemoryId: z.string().optional(),
  Status: z.string().optional(),
  FailureReason: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  MemoryStrategies: z.array(MemoryStrategySchema).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ).optional(),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  MemoryExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  EventExpiryDuration: z.number().int().min(3).max(365).describe(
    "Duration in days until memory events expire",
  ).optional(),
  MemoryStrategies: z.array(MemoryStrategySchema).describe(
    "List of memory strategies attached to this memory",
  ).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema).optional(),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

export const model = {
  type: "@swamp/aws/bedrockagentcore/memory",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore Memory resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Memory",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Memory",
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
      description: "Get a BedrockAgentCore Memory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Memory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::Memory",
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
      description: "Update a BedrockAgentCore Memory",
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
        const identifier = existing.MemoryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Memory",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::Memory",
          identifier,
          currentState,
          desiredState,
          ["Name", "EncryptionKeyArn"],
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
      description: "Delete a BedrockAgentCore Memory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Memory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Memory",
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
      description: "Sync BedrockAgentCore Memory state from AWS",
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
        const identifier = existing.MemoryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Memory",
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
