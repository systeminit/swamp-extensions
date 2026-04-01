// Auto-generated extension model for @swamp/aws/wisdom/aiagent
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

export const TagConditionSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(1).max(256).optional(),
});

export const KnowledgeBaseAssociationConfigurationDataSchema = z.object({
  ContentTagFilter: z.object({
    TagCondition: TagConditionSchema.optional(),
    AndConditions: z.array(TagConditionSchema).optional(),
    OrConditions: z.array(z.object({
      AndConditions: z.array(TagConditionSchema).optional(),
      TagCondition: TagConditionSchema.optional(),
    })).optional(),
  }).optional(),
  MaxResults: z.number().min(1).max(100).optional(),
  OverrideKnowledgeBaseSearchType: z.enum(["HYBRID", "SEMANTIC"]).optional(),
});

export const AssociationConfigurationSchema = z.object({
  AssociationId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).optional(),
  AssociationType: z.enum(["KNOWLEDGE_BASE"]).optional(),
  AssociationConfigurationData: z.object({
    KnowledgeBaseAssociationConfigurationData:
      KnowledgeBaseAssociationConfigurationDataSchema.optional(),
  }).optional(),
});

export const ManualSearchAIAgentConfigurationSchema = z.object({
  AnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

export const AnswerRecommendationAIAgentConfigurationSchema = z.object({
  IntentLabelingGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  QueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

export const SelfServiceAIAgentConfigurationSchema = z.object({
  SelfServicePreProcessingAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  SelfServiceAnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  SelfServiceAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
});

export const EmailResponseAIAgentConfigurationSchema = z.object({
  EmailResponseAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  EmailQueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

export const EmailOverviewAIAgentConfigurationSchema = z.object({
  EmailOverviewAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
});

export const EmailGenerativeAnswerAIAgentConfigurationSchema = z.object({
  EmailGenerativeAnswerAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  EmailQueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

export const ToolInstructionSchema = z.object({
  Instruction: z.string().optional(),
  Examples: z.array(z.string()).optional(),
});

export const ToolOverrideConstantInputValueSchema = z.object({
  Type: z.enum(["STRING", "NUMBER", "JSON_STRING"]),
  Value: z.string().min(1),
});

export const ToolOverrideInputValueSchema = z.object({
  JsonPath: z.string().min(1),
  Value: z.object({
    Constant: ToolOverrideConstantInputValueSchema.optional(),
  }),
});

export const ToolOutputConfigurationSchema = z.object({
  OutputVariableNameOverride: z.string().min(1).optional(),
  SessionDataNamespace: z.string().min(1).optional(),
});

export const ToolOutputFilterSchema = z.object({
  JsonPath: z.string().min(1),
  OutputConfiguration: ToolOutputConfigurationSchema.optional(),
});

export const UserInteractionConfigurationSchema = z.object({
  IsUserConfirmationRequired: z.boolean().optional(),
});

export const ToolConfigurationSchema = z.object({
  ToolName: z.string().min(1),
  ToolType: z.enum(["MODEL_CONTEXT_PROTOCOL", "RETURN_TO_CONTROL", "CONSTANT"]),
  Title: z.string().min(1).optional(),
  ToolId: z.string().min(1).optional(),
  Description: z.string().min(1).optional(),
  Instruction: ToolInstructionSchema.optional(),
  OverrideInputValues: z.array(ToolOverrideInputValueSchema).optional(),
  OutputFilters: z.array(ToolOutputFilterSchema).optional(),
  InputSchema: z.string().optional(),
  OutputSchema: z.string().optional(),
  Annotations: z.string().optional(),
  UserInteractionConfiguration: UserInteractionConfigurationSchema.optional(),
});

export const OrchestrationAIAgentConfigurationSchema = z.object({
  OrchestrationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ),
  OrchestrationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  ConnectInstanceArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:[a-z-]+?:[a-z-]+?:[a-z0-9-]*?:([0-9]{12})?:[a-zA-Z0-9-:/]+$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
  ToolConfigurations: z.array(ToolConfigurationSchema).optional(),
});

export const NoteTakingAIAgentConfigurationSchema = z.object({
  NoteTakingAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  NoteTakingAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
});

export const CaseSummarizationAIAgentConfigurationSchema = z.object({
  CaseSummarizationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  CaseSummarizationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema
      .optional(),
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema.optional(),
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema
      .optional(),
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema
      .optional(),
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema
      .optional(),
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema.optional(),
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema
      .optional(),
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema
      .optional(),
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema.optional(),
  }),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\s_.,-]+"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Type: z.enum([
    "MANUAL_SEARCH",
    "ANSWER_RECOMMENDATION",
    "SELF_SERVICE",
    "EMAIL_RESPONSE",
    "EMAIL_OVERVIEW",
    "EMAIL_GENERATIVE_ANSWER",
    "ORCHESTRATION",
    "NOTE_TAKING",
    "CASE_SUMMARIZATION",
  ]),
});

const StateSchema = z.object({
  AIAgentId: z.string(),
  AIAgentArn: z.string().optional(),
  AssistantId: z.string(),
  AssistantArn: z.string().optional(),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema,
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema,
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema,
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema,
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema,
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema,
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema,
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema,
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema,
  }).optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Type: z.string().optional(),
  ModifiedTimeSeconds: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ).optional(),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema
      .optional(),
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema.optional(),
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema
      .optional(),
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema
      .optional(),
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema
      .optional(),
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema.optional(),
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema
      .optional(),
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema
      .optional(),
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema.optional(),
  }).optional(),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\s_.,-]+"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Type: z.enum([
    "MANUAL_SEARCH",
    "ANSWER_RECOMMENDATION",
    "SELF_SERVICE",
    "EMAIL_RESPONSE",
    "EMAIL_OVERVIEW",
    "EMAIL_GENERATIVE_ANSWER",
    "ORCHESTRATION",
    "NOTE_TAKING",
    "CASE_SUMMARIZATION",
  ]).optional(),
});

export const model = {
  type: "@swamp/aws/wisdom/aiagent",
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
      description: "Wisdom AIAgent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom AIAgent",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Wisdom::AIAgent",
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
      description: "Get a Wisdom AIAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Wisdom::AIAgent",
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
      description: "Update a Wisdom AIAgent",
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
        const idParts = [
          existing.AIAgentId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Wisdom::AIAgent",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Wisdom::AIAgent",
          identifier,
          currentState,
          desiredState,
          ["AssistantId", "Name", "Tags", "Type"],
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
      description: "Delete a Wisdom AIAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Wisdom::AIAgent",
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
      description: "Sync Wisdom AIAgent state from AWS",
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
        const idParts = [
          existing.AIAgentId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Wisdom::AIAgent",
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
