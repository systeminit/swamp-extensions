// Auto-generated extension model for @swamp/aws/bedrockagentcore/evaluator
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

export const NumericalScaleDefinitionSchema = z.object({
  Value: z.number().min(0).describe(
    "The numerical value for this rating scale option.",
  ),
  Label: z.string().min(1).max(100).describe(
    "The label that describes this numerical rating option.",
  ),
  Definition: z.string().describe(
    "The description that explains what this numerical rating represents.",
  ),
});

export const CategoricalScaleDefinitionSchema = z.object({
  Label: z.string().min(1).max(100).describe(
    "The label of this categorical rating option.",
  ),
  Definition: z.string().describe(
    "The description that explains what this categorical rating represents.",
  ),
});

export const RatingScaleSchema = z.object({
  Numerical: z.array(NumericalScaleDefinitionSchema).optional(),
  Categorical: z.array(CategoricalScaleDefinitionSchema).optional(),
});

export const InferenceConfigurationSchema = z.object({
  MaxTokens: z.number().int().min(1).describe(
    "The maximum number of tokens to generate in the model response.",
  ).optional(),
  Temperature: z.number().min(0).max(1).describe(
    "The temperature value that controls randomness in the model's responses.",
  ).optional(),
  TopP: z.number().min(0).max(1).describe(
    "The top-p sampling parameter that controls the diversity of the model's responses.",
  ).optional(),
});

export const BedrockEvaluatorModelConfigSchema = z.object({
  ModelId: z.string().describe(
    "The identifier of the Amazon Bedrock model to use for evaluation.",
  ),
  InferenceConfig: InferenceConfigurationSchema.describe(
    "The inference configuration parameters that control model behavior during evaluation.",
  ).optional(),
  AdditionalModelRequestFields: z.string().describe(
    "Additional model-specific request fields.",
  ).optional(),
});

export const EvaluatorModelConfigSchema = z.object({
  BedrockEvaluatorModelConfig: BedrockEvaluatorModelConfigSchema.describe(
    "The configuration for using Amazon Bedrock models in evaluator assessments.",
  ),
});

export const LlmAsAJudgeEvaluatorConfigSchema = z.object({
  Instructions: z.string().describe(
    "The evaluation instructions that guide the language model in assessing agent performance.",
  ),
  RatingScale: RatingScaleSchema.describe(
    "The rating scale that defines how evaluators should score agent performance.",
  ),
  ModelConfig: EvaluatorModelConfigSchema.describe(
    "The model configuration that specifies which foundation model to use for evaluation.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  EvaluatorName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe("The name of the evaluator. Must be unique within your account."),
  Description: z.string().min(1).max(200).describe(
    "The description of the evaluator.",
  ).optional(),
  EvaluatorConfig: z.object({
    LlmAsAJudge: LlmAsAJudgeEvaluatorConfigSchema.describe(
      "The configuration for LLM-as-a-Judge evaluation.",
    ),
  }).describe("The configuration for the evaluator."),
  Level: z.enum(["TOOL_CALL", "TRACE", "SESSION"]).describe(
    "The evaluation level that determines the scope of evaluation.",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of tags to assign to the evaluator.",
  ).optional(),
});

const StateSchema = z.object({
  EvaluatorId: z.string().optional(),
  EvaluatorArn: z.string(),
  EvaluatorName: z.string().optional(),
  Description: z.string().optional(),
  EvaluatorConfig: z.object({
    LlmAsAJudge: LlmAsAJudgeEvaluatorConfigSchema,
  }).optional(),
  Level: z.string().optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  EvaluatorName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe("The name of the evaluator. Must be unique within your account.")
    .optional(),
  Description: z.string().min(1).max(200).describe(
    "The description of the evaluator.",
  ).optional(),
  EvaluatorConfig: z.object({
    LlmAsAJudge: LlmAsAJudgeEvaluatorConfigSchema.describe(
      "The configuration for LLM-as-a-Judge evaluation.",
    ).optional(),
  }).describe("The configuration for the evaluator.").optional(),
  Level: z.enum(["TOOL_CALL", "TRACE", "SESSION"]).describe(
    "The evaluation level that determines the scope of evaluation.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to assign to the evaluator.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/bedrockagentcore/evaluator",
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
      description: "BedrockAgentCore Evaluator resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Evaluator",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Evaluator",
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
      description: "Get a BedrockAgentCore Evaluator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Evaluator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::Evaluator",
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
      description: "Update a BedrockAgentCore Evaluator",
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
        const identifier = existing.EvaluatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Evaluator",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::Evaluator",
          identifier,
          currentState,
          desiredState,
          ["EvaluatorName"],
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
      description: "Delete a BedrockAgentCore Evaluator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Evaluator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Evaluator",
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
      description: "Sync BedrockAgentCore Evaluator state from AWS",
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
        const identifier = existing.EvaluatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Evaluator",
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
