// Auto-generated extension model for @swamp/gcp/aiplatform/tuningjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/tuningJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.tuningJobs.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "aiplatform.projects.locations.tuningJobs.create",
  "path": "v1/{+parent}/tuningJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  baseModel: z.string().describe(
    "The base model that is being tuned. See [Supported models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/tuning#supported_models).",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the TuningJob.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels with user-defined metadata to organize TuningJob and generated resources such as Model and Endpoint. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  preTunedModel: z.object({
    baseModel: z.string().describe(
      "Output only. The name of the base model this PreTunedModel was tuned from.",
    ).optional(),
    checkpointId: z.string().describe(
      "Optional. The source checkpoint id. If not specified, the default checkpoint will be used.",
    ).optional(),
    tunedModelName: z.string().describe(
      "The resource name of the Model. E.g., a model resource name with a specified version id or alias: `projects/{project}/locations/{location}/models/{model}@{version_id}` `projects/{project}/locations/{location}/models/{model}@{alias}` Or, omit the version id to use the default version: `projects/{project}/locations/{location}/models/{model}`",
    ).optional(),
  }).describe("A pre-tuned model for continuous tuning.").optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for Preference Optimization and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for Preference Optimization. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for preference optimization.")
        .optional(),
      beta: z.number().describe(
        "Optional. Weight for KL Divergence regularization.",
      ).optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate.",
      ).optional(),
    }).describe("Hyperparameters for Preference Optimization.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Cloud Storage path to file containing training dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Cloud Storage path to file containing validation dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
  }).describe("Tuning Spec for Preference Optimization.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the tuningJob workload runs as. If not specified, the Vertex AI Secure Fine-Tuned Service Agent in the project will be used. See https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-agent Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
        autoraterModel: z.string().describe(
          "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        flipEnabled: z.boolean().describe(
          "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
        ).optional(),
        generationConfig: z.object({
          audioTimestamp: z.boolean().describe(
            "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
          ).optional(),
          candidateCount: z.number().int().describe(
            "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
          ).optional(),
          enableAffectiveDialog: z.boolean().describe(
            "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
          ).optional(),
          frequencyPenalty: z.number().describe(
            "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
          ).optional(),
          imageConfig: z.object({
            aspectRatio: z.string().describe(
              'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
            ).optional(),
            imageOutputOptions: z.object({
              compressionQuality: z.number().int().describe(
                "Optional. The compression quality of the output image.",
              ).optional(),
              mimeType: z.string().describe(
                "Optional. The image format that the output should be saved as.",
              ).optional(),
            }).describe("The image output format for generated images.")
              .optional(),
            imageSize: z.string().describe(
              "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
            ).optional(),
            personGeneration: z.enum([
              "PERSON_GENERATION_UNSPECIFIED",
              "ALLOW_ALL",
              "ALLOW_ADULT",
              "ALLOW_NONE",
            ]).describe(
              "Optional. Controls whether the model can generate people.",
            ).optional(),
            prominentPeople: z.enum([
              "PROMINENT_PEOPLE_UNSPECIFIED",
              "ALLOW_PROMINENT_PEOPLE",
              "BLOCK_PROMINENT_PEOPLE",
            ]).describe(
              "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
            ).optional(),
          }).describe(
            "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
          ).optional(),
          logprobs: z.number().int().describe(
            "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
          ).optional(),
          maxOutputTokens: z.number().int().describe(
            "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
          ).optional(),
          mediaResolution: z.enum([
            "MEDIA_RESOLUTION_UNSPECIFIED",
            "MEDIA_RESOLUTION_LOW",
            "MEDIA_RESOLUTION_MEDIUM",
            "MEDIA_RESOLUTION_HIGH",
          ]).describe(
            "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
          ).optional(),
          presencePenalty: z.number().describe(
            "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
          ).optional(),
          responseJsonSchema: z.string().describe(
            "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
          ).optional(),
          responseLogprobs: z.boolean().describe(
            "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
          ).optional(),
          responseMimeType: z.string().describe(
            "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
          ).optional(),
          responseModalities: z.array(
            z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
          ).describe(
            "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
          ).optional(),
          responseSchema: z.object({
            additionalProperties: z.string().describe(
              "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
            ).optional(),
            anyOf: z.array(z.string()).describe(
              "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
            ).optional(),
            default: z.string().describe(
              "Optional. Default value to use if the field is not specified.",
            ).optional(),
            defs: z.record(z.string(), z.string()).describe(
              "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
            ).optional(),
            description: z.string().describe(
              "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
            ).optional(),
            enum: z.array(z.string()).describe(
              'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
            ).optional(),
            example: z.string().describe(
              "Optional. Example of an instance of this schema.",
            ).optional(),
            format: z.string().describe(
              "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
            ).optional(),
            items: z.string().describe(
              "Circular reference to GoogleCloudAiplatformV1Schema",
            ).optional(),
            maxItems: z.string().describe(
              "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
            ).optional(),
            maxLength: z.string().describe(
              "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
            ).optional(),
            maxProperties: z.string().describe(
              "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
            ).optional(),
            maximum: z.number().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
            ).optional(),
            minItems: z.string().describe(
              "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
            ).optional(),
            minLength: z.string().describe(
              "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
            ).optional(),
            minProperties: z.string().describe(
              "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
            ).optional(),
            minimum: z.number().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
            ).optional(),
            nullable: z.boolean().describe(
              "Optional. Indicates if the value of this field can be null.",
            ).optional(),
            pattern: z.string().describe(
              "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
            ).optional(),
            properties: z.record(z.string(), z.string()).describe(
              "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
            ).optional(),
            propertyOrdering: z.array(z.string()).describe(
              "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
            ).optional(),
            ref: z.string().describe(
              'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
            ).optional(),
            required: z.array(z.string()).describe(
              "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
            ).optional(),
            title: z.string().describe("Optional. Title for the schema.")
              .optional(),
            type: z.enum([
              "TYPE_UNSPECIFIED",
              "STRING",
              "NUMBER",
              "INTEGER",
              "BOOLEAN",
              "ARRAY",
              "OBJECT",
              "NULL",
            ]).describe("Optional. Data type of the schema field.").optional(),
          }).describe(
            "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.object({
              modelRoutingPreference: z.enum([
                "UNKNOWN",
                "PRIORITIZE_QUALITY",
                "BALANCED",
                "PRIORITIZE_COST",
              ]).describe("The model routing preference.").optional(),
            }).describe(
              "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
            ).optional(),
            manualMode: z.object({
              modelName: z.string().describe(
                "The name of the model to use. Only public LLM models are accepted.",
              ).optional(),
            }).describe(
              "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
            ).optional(),
          }).describe(
            "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
          ).optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.string().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.object({
              speakerVoiceConfigs: z.array(z.object({
                speaker: z.string().describe(
                  "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                ).optional(),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string().describe(
                      "The name of the prebuilt voice to use.",
                    ).optional(),
                  }).describe("Configuration for a prebuilt voice.").optional(),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string().describe(
                      "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                    ).optional(),
                    voiceSampleAudio: z.string().describe(
                      "Optional. The sample of the custom voice.",
                    ).optional(),
                  }).describe(
                    "The configuration for the replicated voice to use.",
                  ).optional(),
                }).describe("Configuration for a voice.").optional(),
              })).describe(
                "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
              ).optional(),
            }).describe(
              "Configuration for a multi-speaker text-to-speech request.",
            ).optional(),
            voiceConfig: z.object({
              prebuiltVoiceConfig: z.object({
                voiceName: z.string().describe(
                  "The name of the prebuilt voice to use.",
                ).optional(),
              }).describe("Configuration for a prebuilt voice.").optional(),
              replicatedVoiceConfig: z.object({
                mimeType: z.string().describe(
                  "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                ).optional(),
                voiceSampleAudio: z.string().describe(
                  "Optional. The sample of the custom voice.",
                ).optional(),
              }).describe("The configuration for the replicated voice to use.")
                .optional(),
            }).describe("Configuration for a voice.").optional(),
          }).describe("Configuration for speech generation.").optional(),
          stopSequences: z.array(z.string()).describe(
            'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
          ).optional(),
          temperature: z.number().describe(
            "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
          ).optional(),
          thinkingConfig: z.object({
            includeThoughts: z.boolean().describe(
              'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
            ).optional(),
            thinkingBudget: z.number().int().describe(
              "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
            ).optional(),
            thinkingLevel: z.enum([
              "THINKING_LEVEL_UNSPECIFIED",
              "LOW",
              "MEDIUM",
              "HIGH",
              "MINIMAL",
            ]).describe(
              "Optional. The number of thoughts tokens that the model should generate.",
            ).optional(),
          }).describe(
            'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
          ).optional(),
          topK: z.number().describe(
            "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
          ).optional(),
          topP: z.number().describe(
            "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
          ).optional(),
        }).describe(
          "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
      ).optional(),
      datasetCustomMetrics: z.array(z.object({
        aggregationFunction: z.string().describe(
          'Required. The Python code string containing the aggregation function. Expected function signature: `def aggregate(instances: list[dict[str, Any]]) -> dict[str, float]:` The `instances` argument is a list of dictionaries, where each dictionary represents a single evaluation result item. The structure of each dictionary corresponds to the fields in the `EvaluationResult` message. This includes: - `"request"`: Contains the original input data and model inputs (from `EvaluationResult.EvaluationRequest`). - `"candidate_results"`: Contains the results of any instance-level metrics (from `EvaluationResult.CandidateResults`). Example of a single item in the `instances` list: { "request": { "prompt": {"text": "What is the capital of France?"}, "golden_response": {"text": "Paris"}, "candidate_responses": [{"candidate": "model-v1", "text": "Paris"}] }, "candidate_results": [ {"metric": "exact_match", "score": 1.0}, {"metric": "bleu", "score": 0.9} ] }',
        ).optional(),
        displayName: z.string().describe(
          'Optional. A display name for this custom summary metric. Used to prefix keys in the output summaryMetrics map. If not provided, a default name like "dataset_custom_metric_1", "dataset_custom_metric_2", etc., will be generated based on the order in the repeated field.',
        ).optional(),
      })).describe(
        "Optional. Specifications for custom dataset-level aggregations.",
      ).optional(),
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.number().int().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.string().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.string()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.string()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.string()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.string().describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.string()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.string()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.string()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.enum([
              "UNKNOWN",
              "PRIORITIZE_QUALITY",
              "BALANCED",
              "PRIORITIZE_COST",
            ]).describe("The model routing preference.").optional(),
          }).describe(
            "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
          ).optional(),
          manualMode: z.object({
            modelName: z.string().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe(
            "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
          ).optional(),
        }).describe(
          "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
        ).optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.array(z.object({
              speaker: z.string().describe(
                "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
              ).optional(),
              voiceConfig: z.object({
                prebuiltVoiceConfig: z.object({
                  voiceName: z.string().describe(
                    "The name of the prebuilt voice to use.",
                  ).optional(),
                }).describe("Configuration for a prebuilt voice.").optional(),
                replicatedVoiceConfig: z.object({
                  mimeType: z.string().describe(
                    "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                  ).optional(),
                  voiceSampleAudio: z.string().describe(
                    "Optional. The sample of the custom voice.",
                  ).optional(),
                }).describe(
                  "The configuration for the replicated voice to use.",
                ).optional(),
              }).describe("Configuration for a voice.").optional(),
            })).describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "Configuration for a multi-speaker text-to-speech request.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.object({
              voiceName: z.string().describe(
                "The name of the prebuilt voice to use.",
              ).optional(),
            }).describe("Configuration for a prebuilt voice.").optional(),
            replicatedVoiceConfig: z.object({
              mimeType: z.string().describe(
                "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
              ).optional(),
              voiceSampleAudio: z.string().describe(
                "Optional. The sample of the custom voice.",
              ).optional(),
            }).describe("The configuration for the replicated voice to use.")
              .optional(),
          }).describe("Configuration for a voice.").optional(),
        }).describe("Configuration for speech generation.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
      }).describe(
        "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
      ).optional(),
      metrics: z.array(z.object({
        aggregationMetrics: z.array(
          z.enum([
            "AGGREGATION_METRIC_UNSPECIFIED",
            "AVERAGE",
            "MODE",
            "STANDARD_DEVIATION",
            "VARIANCE",
            "MINIMUM",
            "MAXIMUM",
            "MEDIAN",
            "PERCENTILE_P90",
            "PERCENTILE_P95",
            "PERCENTILE_P99",
          ]),
        ).describe("Optional. The aggregation metrics to use.").optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.boolean().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe(
          "Spec for bleu score metric - calculates the precision of n-grams in the prediction as compared to reference - returns a score ranging between 0 to 1.",
        ).optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.record(z.string(), z.string()).describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.enum([
            "COMPUTATION_BASED_METRIC_TYPE_UNSPECIFIED",
            "EXACT_MATCH",
            "BLEU",
            "ROUGE",
          ]).describe("Required. The type of the computation based metric.")
            .optional(),
        }).describe("Specification for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.string().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe(
          "Specificies a metric that is populated by evaluating user-defined Python code.",
        ).optional(),
        exactMatchSpec: z.object({}).describe(
          "Spec for exact match metric - returns 1 if prediction and reference exactly matches, otherwise 0.",
        ).optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.record(z.string(), z.string()).describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.object({
            autoraterModel: z.string().describe(
              "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
            ).optional(),
            flipEnabled: z.boolean().describe(
              "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
            ).optional(),
            generationConfig: z.object({
              audioTimestamp: z.boolean().describe(
                "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
              ).optional(),
              candidateCount: z.number().int().describe(
                "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
              ).optional(),
              enableAffectiveDialog: z.boolean().describe(
                "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
              ).optional(),
              frequencyPenalty: z.number().describe(
                "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
              ).optional(),
              imageConfig: z.object({
                aspectRatio: z.string().describe(
                  'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
                ).optional(),
                imageOutputOptions: z.object({
                  compressionQuality: z.number().int().describe(
                    "Optional. The compression quality of the output image.",
                  ).optional(),
                  mimeType: z.string().describe(
                    "Optional. The image format that the output should be saved as.",
                  ).optional(),
                }).describe("The image output format for generated images.")
                  .optional(),
                imageSize: z.string().describe(
                  "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
                ).optional(),
                personGeneration: z.enum([
                  "PERSON_GENERATION_UNSPECIFIED",
                  "ALLOW_ALL",
                  "ALLOW_ADULT",
                  "ALLOW_NONE",
                ]).describe(
                  "Optional. Controls whether the model can generate people.",
                ).optional(),
                prominentPeople: z.enum([
                  "PROMINENT_PEOPLE_UNSPECIFIED",
                  "ALLOW_PROMINENT_PEOPLE",
                  "BLOCK_PROMINENT_PEOPLE",
                ]).describe(
                  "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
                ).optional(),
              }).describe(
                "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
              ).optional(),
              logprobs: z.number().int().describe(
                "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
              ).optional(),
              maxOutputTokens: z.number().int().describe(
                "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
              ).optional(),
              mediaResolution: z.enum([
                "MEDIA_RESOLUTION_UNSPECIFIED",
                "MEDIA_RESOLUTION_LOW",
                "MEDIA_RESOLUTION_MEDIUM",
                "MEDIA_RESOLUTION_HIGH",
              ]).describe(
                "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
              ).optional(),
              presencePenalty: z.number().describe(
                "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
              ).optional(),
              responseJsonSchema: z.string().describe(
                "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
              ).optional(),
              responseLogprobs: z.boolean().describe(
                "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
              ).optional(),
              responseMimeType: z.string().describe(
                "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
              ).optional(),
              responseModalities: z.array(
                z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
              ).describe(
                "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
              ).optional(),
              responseSchema: z.object({
                additionalProperties: z.string().describe(
                  "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
                ).optional(),
                anyOf: z.array(z.string()).describe(
                  "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
                ).optional(),
                default: z.string().describe(
                  "Optional. Default value to use if the field is not specified.",
                ).optional(),
                defs: z.record(z.string(), z.string()).describe(
                  "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
                ).optional(),
                description: z.string().describe(
                  "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
                ).optional(),
                enum: z.array(z.string()).describe(
                  'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
                ).optional(),
                example: z.string().describe(
                  "Optional. Example of an instance of this schema.",
                ).optional(),
                format: z.string().describe(
                  "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
                ).optional(),
                items: z.string().describe(
                  "Circular reference to GoogleCloudAiplatformV1Schema",
                ).optional(),
                maxItems: z.string().describe(
                  "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
                ).optional(),
                maxLength: z.string().describe(
                  "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
                ).optional(),
                maxProperties: z.string().describe(
                  "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
                ).optional(),
                maximum: z.number().describe(
                  "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
                ).optional(),
                minItems: z.string().describe(
                  "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
                ).optional(),
                minLength: z.string().describe(
                  "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
                ).optional(),
                minProperties: z.string().describe(
                  "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
                ).optional(),
                minimum: z.number().describe(
                  "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
                ).optional(),
                nullable: z.boolean().describe(
                  "Optional. Indicates if the value of this field can be null.",
                ).optional(),
                pattern: z.string().describe(
                  "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
                ).optional(),
                properties: z.record(z.string(), z.string()).describe(
                  "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
                ).optional(),
                propertyOrdering: z.array(z.string()).describe(
                  "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
                ).optional(),
                ref: z.string().describe(
                  'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
                ).optional(),
                required: z.array(z.string()).describe(
                  "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
                ).optional(),
                title: z.string().describe("Optional. Title for the schema.")
                  .optional(),
                type: z.enum([
                  "TYPE_UNSPECIFIED",
                  "STRING",
                  "NUMBER",
                  "INTEGER",
                  "BOOLEAN",
                  "ARRAY",
                  "OBJECT",
                  "NULL",
                ]).describe("Optional. Data type of the schema field.")
                  .optional(),
              }).describe(
                "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
              ).optional(),
              routingConfig: z.object({
                autoMode: z.object({
                  modelRoutingPreference: z.enum([
                    "UNKNOWN",
                    "PRIORITIZE_QUALITY",
                    "BALANCED",
                    "PRIORITIZE_COST",
                  ]).describe("The model routing preference.").optional(),
                }).describe(
                  "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
                ).optional(),
                manualMode: z.object({
                  modelName: z.string().describe(
                    "The name of the model to use. Only public LLM models are accepted.",
                  ).optional(),
                }).describe(
                  "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
                ).optional(),
              }).describe(
                "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
              ).optional(),
              seed: z.number().int().describe(
                "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
              ).optional(),
              speechConfig: z.object({
                languageCode: z.string().describe(
                  "Optional. The language code (ISO 639-1) for the speech synthesis.",
                ).optional(),
                multiSpeakerVoiceConfig: z.object({
                  speakerVoiceConfigs: z.array(z.object({
                    speaker: z.string().describe(
                      "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                    ).optional(),
                    voiceConfig: z.object({
                      prebuiltVoiceConfig: z.object({
                        voiceName: z.string().describe(
                          "The name of the prebuilt voice to use.",
                        ).optional(),
                      }).describe("Configuration for a prebuilt voice.")
                        .optional(),
                      replicatedVoiceConfig: z.object({
                        mimeType: z.string().describe(
                          "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                        ).optional(),
                        voiceSampleAudio: z.string().describe(
                          "Optional. The sample of the custom voice.",
                        ).optional(),
                      }).describe(
                        "The configuration for the replicated voice to use.",
                      ).optional(),
                    }).describe("Configuration for a voice.").optional(),
                  })).describe(
                    "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
                  ).optional(),
                }).describe(
                  "Configuration for a multi-speaker text-to-speech request.",
                ).optional(),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string().describe(
                      "The name of the prebuilt voice to use.",
                    ).optional(),
                  }).describe("Configuration for a prebuilt voice.").optional(),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string().describe(
                      "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                    ).optional(),
                    voiceSampleAudio: z.string().describe(
                      "Optional. The sample of the custom voice.",
                    ).optional(),
                  }).describe(
                    "The configuration for the replicated voice to use.",
                  ).optional(),
                }).describe("Configuration for a voice.").optional(),
              }).describe("Configuration for speech generation.").optional(),
              stopSequences: z.array(z.string()).describe(
                'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
              ).optional(),
              temperature: z.number().describe(
                "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
              ).optional(),
              thinkingConfig: z.object({
                includeThoughts: z.boolean().describe(
                  'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
                ).optional(),
                thinkingBudget: z.number().int().describe(
                  "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
                ).optional(),
                thinkingLevel: z.enum([
                  "THINKING_LEVEL_UNSPECIFIED",
                  "LOW",
                  "MEDIUM",
                  "HIGH",
                  "MINIMAL",
                ]).describe(
                  "Optional. The number of thoughts tokens that the model should generate.",
                ).optional(),
              }).describe(
                'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
              ).optional(),
              topK: z.number().describe(
                "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
              ).optional(),
              topP: z.number().describe(
                "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
              ).optional(),
            }).describe(
              "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
            ).optional(),
            samplingCount: z.number().int().describe(
              "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
            ).optional(),
          }).describe(
            "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
          ).optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.object({
            metricSpecName: z.string().describe(
              'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
            ).optional(),
            metricSpecParameters: z.record(z.string(), z.string()).describe(
              "Optional. The parameters needed to run the pre-defined metric.",
            ).optional(),
          }).describe("The spec for a pre-defined metric.").optional(),
          rubricGenerationSpec: z.object({
            modelConfig: z.object({
              autoraterModel: z.string().describe(
                "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
              ).optional(),
              flipEnabled: z.boolean().describe(
                "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
              ).optional(),
              generationConfig: z.object({
                audioTimestamp: z.boolean().describe(
                  "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
                ).optional(),
                candidateCount: z.number().int().describe(
                  "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
                ).optional(),
                enableAffectiveDialog: z.boolean().describe(
                  "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
                ).optional(),
                frequencyPenalty: z.number().describe(
                  "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
                ).optional(),
                imageConfig: z.object({
                  aspectRatio: z.string().describe(
                    'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
                  ).optional(),
                  imageOutputOptions: z.object({
                    compressionQuality: z.number().int().describe(
                      "Optional. The compression quality of the output image.",
                    ).optional(),
                    mimeType: z.string().describe(
                      "Optional. The image format that the output should be saved as.",
                    ).optional(),
                  }).describe("The image output format for generated images.")
                    .optional(),
                  imageSize: z.string().describe(
                    "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
                  ).optional(),
                  personGeneration: z.enum([
                    "PERSON_GENERATION_UNSPECIFIED",
                    "ALLOW_ALL",
                    "ALLOW_ADULT",
                    "ALLOW_NONE",
                  ]).describe(
                    "Optional. Controls whether the model can generate people.",
                  ).optional(),
                  prominentPeople: z.enum([
                    "PROMINENT_PEOPLE_UNSPECIFIED",
                    "ALLOW_PROMINENT_PEOPLE",
                    "BLOCK_PROMINENT_PEOPLE",
                  ]).describe(
                    "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
                  ).optional(),
                }).describe(
                  "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
                ).optional(),
                logprobs: z.number().int().describe(
                  "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
                ).optional(),
                maxOutputTokens: z.number().int().describe(
                  "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
                ).optional(),
                mediaResolution: z.enum([
                  "MEDIA_RESOLUTION_UNSPECIFIED",
                  "MEDIA_RESOLUTION_LOW",
                  "MEDIA_RESOLUTION_MEDIUM",
                  "MEDIA_RESOLUTION_HIGH",
                ]).describe(
                  "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
                ).optional(),
                presencePenalty: z.number().describe(
                  "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
                ).optional(),
                responseJsonSchema: z.string().describe(
                  "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
                ).optional(),
                responseLogprobs: z.boolean().describe(
                  "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
                ).optional(),
                responseMimeType: z.string().describe(
                  "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
                ).optional(),
                responseModalities: z.array(
                  z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
                ).describe(
                  "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
                ).optional(),
                responseSchema: z.object({
                  additionalProperties: z.string().describe(
                    "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
                  ).optional(),
                  anyOf: z.array(z.string()).describe(
                    "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
                  ).optional(),
                  default: z.string().describe(
                    "Optional. Default value to use if the field is not specified.",
                  ).optional(),
                  defs: z.record(z.string(), z.string()).describe(
                    "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
                  ).optional(),
                  description: z.string().describe(
                    "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
                  ).optional(),
                  enum: z.array(z.string()).describe(
                    'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
                  ).optional(),
                  example: z.string().describe(
                    "Optional. Example of an instance of this schema.",
                  ).optional(),
                  format: z.string().describe(
                    "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
                  ).optional(),
                  items: z.string().describe(
                    "Circular reference to GoogleCloudAiplatformV1Schema",
                  ).optional(),
                  maxItems: z.string().describe(
                    "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
                  ).optional(),
                  maxLength: z.string().describe(
                    "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
                  ).optional(),
                  maxProperties: z.string().describe(
                    "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
                  ).optional(),
                  maximum: z.number().describe(
                    "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
                  ).optional(),
                  minItems: z.string().describe(
                    "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
                  ).optional(),
                  minLength: z.string().describe(
                    "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
                  ).optional(),
                  minProperties: z.string().describe(
                    "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
                  ).optional(),
                  minimum: z.number().describe(
                    "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
                  ).optional(),
                  nullable: z.boolean().describe(
                    "Optional. Indicates if the value of this field can be null.",
                  ).optional(),
                  pattern: z.string().describe(
                    "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
                  ).optional(),
                  properties: z.record(z.string(), z.string()).describe(
                    "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
                  ).optional(),
                  propertyOrdering: z.array(z.string()).describe(
                    "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
                  ).optional(),
                  ref: z.string().describe(
                    'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
                  ).optional(),
                  required: z.array(z.string()).describe(
                    "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
                  ).optional(),
                  title: z.string().describe("Optional. Title for the schema.")
                    .optional(),
                  type: z.enum([
                    "TYPE_UNSPECIFIED",
                    "STRING",
                    "NUMBER",
                    "INTEGER",
                    "BOOLEAN",
                    "ARRAY",
                    "OBJECT",
                    "NULL",
                  ]).describe("Optional. Data type of the schema field.")
                    .optional(),
                }).describe(
                  "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
                ).optional(),
                routingConfig: z.object({
                  autoMode: z.object({
                    modelRoutingPreference: z.enum([
                      "UNKNOWN",
                      "PRIORITIZE_QUALITY",
                      "BALANCED",
                      "PRIORITIZE_COST",
                    ]).describe("The model routing preference.").optional(),
                  }).describe(
                    "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
                  ).optional(),
                  manualMode: z.object({
                    modelName: z.string().describe(
                      "The name of the model to use. Only public LLM models are accepted.",
                    ).optional(),
                  }).describe(
                    "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
                  ).optional(),
                }).describe(
                  "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
                ).optional(),
                seed: z.number().int().describe(
                  "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
                ).optional(),
                speechConfig: z.object({
                  languageCode: z.string().describe(
                    "Optional. The language code (ISO 639-1) for the speech synthesis.",
                  ).optional(),
                  multiSpeakerVoiceConfig: z.object({
                    speakerVoiceConfigs: z.array(z.object({
                      speaker: z.string().describe(
                        "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                      ).optional(),
                      voiceConfig: z.object({
                        prebuiltVoiceConfig: z.object({
                          voiceName: z.string().describe(
                            "The name of the prebuilt voice to use.",
                          ).optional(),
                        }).describe("Configuration for a prebuilt voice.")
                          .optional(),
                        replicatedVoiceConfig: z.object({
                          mimeType: z.string().describe(
                            "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                          ).optional(),
                          voiceSampleAudio: z.string().describe(
                            "Optional. The sample of the custom voice.",
                          ).optional(),
                        }).describe(
                          "The configuration for the replicated voice to use.",
                        ).optional(),
                      }).describe("Configuration for a voice.").optional(),
                    })).describe(
                      "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
                    ).optional(),
                  }).describe(
                    "Configuration for a multi-speaker text-to-speech request.",
                  ).optional(),
                  voiceConfig: z.object({
                    prebuiltVoiceConfig: z.object({
                      voiceName: z.string().describe(
                        "The name of the prebuilt voice to use.",
                      ).optional(),
                    }).describe("Configuration for a prebuilt voice.")
                      .optional(),
                    replicatedVoiceConfig: z.object({
                      mimeType: z.string().describe(
                        "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                      ).optional(),
                      voiceSampleAudio: z.string().describe(
                        "Optional. The sample of the custom voice.",
                      ).optional(),
                    }).describe(
                      "The configuration for the replicated voice to use.",
                    ).optional(),
                  }).describe("Configuration for a voice.").optional(),
                }).describe("Configuration for speech generation.").optional(),
                stopSequences: z.array(z.string()).describe(
                  'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
                ).optional(),
                temperature: z.number().describe(
                  "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
                ).optional(),
                thinkingConfig: z.object({
                  includeThoughts: z.boolean().describe(
                    'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
                  ).optional(),
                  thinkingBudget: z.number().int().describe(
                    "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
                  ).optional(),
                  thinkingLevel: z.enum([
                    "THINKING_LEVEL_UNSPECIFIED",
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                    "MINIMAL",
                  ]).describe(
                    "Optional. The number of thoughts tokens that the model should generate.",
                  ).optional(),
                }).describe(
                  'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
                ).optional(),
                topK: z.number().describe(
                  "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
                ).optional(),
                topP: z.number().describe(
                  "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
                ).optional(),
              }).describe(
                "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
              ).optional(),
              samplingCount: z.number().int().describe(
                "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
              ).optional(),
            }).describe(
              "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
            ).optional(),
            promptTemplate: z.string().describe(
              "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
            ).optional(),
            rubricContentType: z.enum([
              "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
              "PROPERTY",
              "NL_QUESTION_ANSWER",
              "PYTHON_CODE_ASSERTION",
            ]).describe("The type of rubric content to be generated.")
              .optional(),
            rubricTypeOntology: z.array(z.string()).describe(
              "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
            ).optional(),
          }).describe("Specification for how rubrics should be generated.")
            .optional(),
          rubricGroupKey: z.string().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Specification for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.record(z.string(), z.string()).describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.object({
            description: z.string().describe(
              "Optional. The description of the score explaining the directionality etc.",
            ).optional(),
            max: z.number().describe(
              "Required. The maximum value of the score range (inclusive).",
            ).optional(),
            min: z.number().describe(
              "Required. The minimum value of the score range (inclusive).",
            ).optional(),
            step: z.number().describe(
              "Optional. The distance between discrete steps in the range. If unset, the range is assumed to be continuous.",
            ).optional(),
          }).describe(
            "The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.string().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.string().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.string().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean().describe(
              "Optional. Whether to return raw output.",
            ).optional(),
          }).describe("Spec for custom output format configuration.")
            .optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Metric prompt template for pairwise metric.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for pairwise metric.",
          ).optional(),
        }).describe("Spec for pairwise metric.").optional(),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean().describe(
              "Optional. Whether to return raw output.",
            ).optional(),
          }).describe("Spec for custom output format configuration.")
            .optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Metric prompt template for pointwise metric.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for pointwise metric.",
          ).optional(),
        }).describe("Spec for pointwise metric.").optional(),
        predefinedMetricSpec: z.object({
          metricSpecName: z.string().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.record(z.string(), z.string()).describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("The spec for a pre-defined metric.").optional(),
        rougeSpec: z.object({
          rougeType: z.string().describe(
            "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
          ).optional(),
          splitSummaries: z.boolean().describe(
            "Optional. Whether to split summaries while using rougeLsum.",
          ).optional(),
          useStemmer: z.boolean().describe(
            "Optional. Whether to use stemmer to compute rouge score.",
          ).optional(),
        }).describe(
          "Spec for rouge score metric - calculates the recall of n-grams in prediction as compared to reference - returns a score ranging between 0 and 1.",
        ).optional(),
      })).describe("Required. The metrics used for evaluation.").optional(),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string().describe(
            "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
          ).optional(),
        }).describe(
          "The Google Cloud Storage location where the output is to be written to.",
        ).optional(),
      }).describe("Config for evaluation output.").optional(),
    }).describe("Evaluation Config for Tuning Job.").optional(),
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for SFT and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for SFT. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for tuning.").optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate. Mutually exclusive with `learning_rate`. This feature is only available for 1P models.",
      ).optional(),
    }).describe("Hyperparameters for SFT.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Training dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Validation dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
  }).describe("Tuning Spec for Supervised Tuning for first party models.")
    .optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      endpoint: z.string().describe(
        "The Endpoint resource name that the checkpoint is deployed to. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
      ).optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe(
      "Output only. The checkpoints associated with this TunedModel. This field is only populated for tuning jobs that enable intermediate checkpoints.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. A resource name of an Endpoint. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
    ).optional(),
    model: z.string().describe(
      "Output only. The resource name of the TunedModel. Format: `projects/{project}/locations/{location}/models/{model}@{version_id}` When tuning from a base model, the version ID will be 1. For continuous tuning, if the provided tuned_model_display_name is set and different from parent model's display name, the tuned model will have a new parent model with version 1. Otherwise the version id will be incremented by 1 from the last version ID in the parent model. E.g., `projects/{project}/locations/{location}/models/{model}@{last_version_id + 1}`",
    ).optional(),
  }).describe(
    "The Model Registry Model and Online Prediction Endpoint associated with this TuningJob.",
  ).optional(),
  tunedModelDisplayName: z.string().describe(
    "Optional. The display name of the TunedModel. The name can be up to 128 characters long and can consist of any UTF-8 characters. For continuous tuning, tuned_model_display_name will by default use the same display name as the pre-tuned model. If a new display name is provided, the tuning job will create a new model instead of a new version.",
  ).optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `dropped_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.object({
          completion: z.object({
            parts: z.array(z.object({
              codeExecutionResult: z.object({
                outcome: z.enum([
                  "OUTCOME_UNSPECIFIED",
                  "OUTCOME_OK",
                  "OUTCOME_FAILED",
                  "OUTCOME_DEADLINE_EXCEEDED",
                ]).describe("Required. Outcome of the code execution.")
                  .optional(),
                output: z.string().describe(
                  "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
                ).optional(),
              }).describe(
                "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
              ).optional(),
              executableCode: z.object({
                code: z.string().describe("Required. The code to be executed.")
                  .optional(),
                language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
                  "Required. Programming language of the `code`.",
                ).optional(),
              }).describe(
                "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
              ).optional(),
              fileData: z.object({
                displayName: z.string().describe(
                  "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
                ).optional(),
                fileUri: z.string().describe(
                  "Required. The URI of the file in Google Cloud Storage.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
              ).optional(),
              functionCall: z.object({
                args: z.record(z.string(), z.string()).describe(
                  "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
                ).optional(),
                name: z.string().describe(
                  "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
                ).optional(),
                partialArgs: z.array(z.object({
                  boolValue: z.boolean().describe(
                    "Optional. Represents a boolean value.",
                  ).optional(),
                  jsonPath: z.string().describe(
                    'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
                  ).optional(),
                  nullValue: z.enum(["NULL_VALUE"]).describe(
                    "Optional. Represents a null value.",
                  ).optional(),
                  numberValue: z.number().describe(
                    "Optional. Represents a double value.",
                  ).optional(),
                  stringValue: z.string().describe(
                    "Optional. Represents a string value.",
                  ).optional(),
                  willContinue: z.boolean().describe(
                    "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
                  ).optional(),
                })).describe(
                  "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
                ).optional(),
                willContinue: z.boolean().describe(
                  "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
                ).optional(),
              }).describe(
                "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
              ).optional(),
              functionResponse: z.object({
                name: z.string().describe(
                  "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
                ).optional(),
                parts: z.array(z.object({
                  fileData: z.object({
                    displayName: z.string().describe(
                      "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                    ).optional(),
                    fileUri: z.string().describe("Required. URI.").optional(),
                    mimeType: z.string().describe(
                      "Required. The IANA standard MIME type of the source data.",
                    ).optional(),
                  }).describe("URI based data for function response.")
                    .optional(),
                  inlineData: z.object({
                    data: z.string().describe("Required. Raw bytes.")
                      .optional(),
                    displayName: z.string().describe(
                      "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                    ).optional(),
                    mimeType: z.string().describe(
                      "Required. The IANA standard MIME type of the source data.",
                    ).optional(),
                  }).describe(
                    "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
                  ).optional(),
                })).describe(
                  "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
                ).optional(),
                response: z.record(z.string(), z.string()).describe(
                  'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
                ).optional(),
                scheduling: z.enum([
                  "SCHEDULING_UNSPECIFIED",
                  "SILENT",
                  "WHEN_IDLE",
                  "INTERRUPT",
                ]).describe(
                  "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
                ).optional(),
              }).describe(
                "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
              ).optional(),
              inlineData: z.object({
                data: z.string().describe(
                  "Required. The raw bytes of the data.",
                ).optional(),
                displayName: z.string().describe(
                  "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
              ).optional(),
              mediaResolution: z.object({
                level: z.enum([
                  "MEDIA_RESOLUTION_UNSPECIFIED",
                  "MEDIA_RESOLUTION_LOW",
                  "MEDIA_RESOLUTION_MEDIUM",
                  "MEDIA_RESOLUTION_HIGH",
                  "MEDIA_RESOLUTION_ULTRA_HIGH",
                ]).describe("The tokenization quality used for given media.")
                  .optional(),
              }).describe(
                "per part media resolution. Media resolution for the input media.",
              ).optional(),
              text: z.string().describe(
                "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
              ).optional(),
              thought: z.boolean().describe(
                "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
              ).optional(),
              thoughtSignature: z.string().describe(
                "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
              ).optional(),
              videoMetadata: z.object({
                endOffset: z.string().describe(
                  "Optional. The end offset of the video.",
                ).optional(),
                fps: z.number().describe(
                  "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
                ).optional(),
                startOffset: z.string().describe(
                  "Optional. The start offset of the video.",
                ).optional(),
              }).describe(
                "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
              ).optional(),
            })).describe(
              "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
            ).optional(),
            role: z.string().describe(
              "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
            ).optional(),
          }).describe(
            "The structured data content of a message. A Content message contains a `role` field, which indicates the producer of the content, and a `parts` field, which contains the multi-part data of the message.",
          ).optional(),
          score: z.number().describe("The score for the given completion.")
            .optional(),
        })).describe("List of completions for a given prompt.").optional(),
        contents: z.array(z.object({
          parts: z.array(z.object({
            codeExecutionResult: z.object({
              outcome: z.enum([
                "OUTCOME_UNSPECIFIED",
                "OUTCOME_OK",
                "OUTCOME_FAILED",
                "OUTCOME_DEADLINE_EXCEEDED",
              ]).describe("Required. Outcome of the code execution.")
                .optional(),
              output: z.string().describe(
                "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
              ).optional(),
            }).describe(
              "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
            ).optional(),
            executableCode: z.object({
              code: z.string().describe("Required. The code to be executed.")
                .optional(),
              language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
                "Required. Programming language of the `code`.",
              ).optional(),
            }).describe(
              "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
            ).optional(),
            fileData: z.object({
              displayName: z.string().describe(
                "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
              ).optional(),
              fileUri: z.string().describe(
                "Required. The URI of the file in Google Cloud Storage.",
              ).optional(),
              mimeType: z.string().describe(
                "Required. The IANA standard MIME type of the source data.",
              ).optional(),
            }).describe(
              "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
            ).optional(),
            functionCall: z.object({
              args: z.record(z.string(), z.string()).describe(
                "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
              ).optional(),
              name: z.string().describe(
                "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
              ).optional(),
              partialArgs: z.array(z.object({
                boolValue: z.boolean().describe(
                  "Optional. Represents a boolean value.",
                ).optional(),
                jsonPath: z.string().describe(
                  'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
                ).optional(),
                nullValue: z.enum(["NULL_VALUE"]).describe(
                  "Optional. Represents a null value.",
                ).optional(),
                numberValue: z.number().describe(
                  "Optional. Represents a double value.",
                ).optional(),
                stringValue: z.string().describe(
                  "Optional. Represents a string value.",
                ).optional(),
                willContinue: z.boolean().describe(
                  "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
                ).optional(),
              })).describe(
                "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
              ).optional(),
              willContinue: z.boolean().describe(
                "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
              ).optional(),
            }).describe(
              "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
            ).optional(),
            functionResponse: z.object({
              name: z.string().describe(
                "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
              ).optional(),
              parts: z.array(z.object({
                fileData: z.object({
                  displayName: z.string().describe(
                    "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                  ).optional(),
                  fileUri: z.string().describe("Required. URI.").optional(),
                  mimeType: z.string().describe(
                    "Required. The IANA standard MIME type of the source data.",
                  ).optional(),
                }).describe("URI based data for function response.").optional(),
                inlineData: z.object({
                  data: z.string().describe("Required. Raw bytes.").optional(),
                  displayName: z.string().describe(
                    "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                  ).optional(),
                  mimeType: z.string().describe(
                    "Required. The IANA standard MIME type of the source data.",
                  ).optional(),
                }).describe(
                  "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
                ).optional(),
              })).describe(
                "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
              ).optional(),
              response: z.record(z.string(), z.string()).describe(
                'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
              ).optional(),
              scheduling: z.enum([
                "SCHEDULING_UNSPECIFIED",
                "SILENT",
                "WHEN_IDLE",
                "INTERRUPT",
              ]).describe(
                "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
              ).optional(),
            }).describe(
              "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
            ).optional(),
            inlineData: z.object({
              data: z.string().describe("Required. The raw bytes of the data.")
                .optional(),
              displayName: z.string().describe(
                "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
              ).optional(),
              mimeType: z.string().describe(
                "Required. The IANA standard MIME type of the source data.",
              ).optional(),
            }).describe(
              "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
            ).optional(),
            mediaResolution: z.object({
              level: z.enum([
                "MEDIA_RESOLUTION_UNSPECIFIED",
                "MEDIA_RESOLUTION_LOW",
                "MEDIA_RESOLUTION_MEDIUM",
                "MEDIA_RESOLUTION_HIGH",
                "MEDIA_RESOLUTION_ULTRA_HIGH",
              ]).describe("The tokenization quality used for given media.")
                .optional(),
            }).describe(
              "per part media resolution. Media resolution for the input media.",
            ).optional(),
            text: z.string().describe(
              "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
            ).optional(),
            thought: z.boolean().describe(
              "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
            ).optional(),
            thoughtSignature: z.string().describe(
              "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
            ).optional(),
            videoMetadata: z.object({
              endOffset: z.string().describe(
                "Optional. The end offset of the video.",
              ).optional(),
              fps: z.number().describe(
                "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
              ).optional(),
              startOffset: z.string().describe(
                "Optional. The start offset of the video.",
              ).optional(),
            }).describe(
              "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
            ).optional(),
          })).describe(
            "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
          ).optional(),
          role: z.string().describe(
            "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
          ).optional(),
        })).describe("Multi-turn contents that represents the Prompt.")
          .optional(),
      })).describe("Output only. Sample user examples in the training dataset.")
        .optional(),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
    }).describe(
      "Statistics computed for datasets used for preference optimization.",
    ).optional(),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `truncated_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      totalBillableCharacterCount: z.string().describe(
        "Output only. Number of billable characters in the tuning dataset.",
      ).optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      totalTruncatedExampleCount: z.string().describe(
        "Output only. The number of examples in the dataset that have been dropped. An example can be dropped for reasons including: too many tokens, contains an invalid image, contains too many images, etc.",
      ).optional(),
      totalTuningCharacterCount: z.string().describe(
        "Output only. Number of tuning characters in the tuning dataset.",
      ).optional(),
      truncatedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.object({
          codeExecutionResult: z.object({
            outcome: z.enum([
              "OUTCOME_UNSPECIFIED",
              "OUTCOME_OK",
              "OUTCOME_FAILED",
              "OUTCOME_DEADLINE_EXCEEDED",
            ]).describe("Required. Outcome of the code execution.").optional(),
            output: z.string().describe(
              "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
            ).optional(),
          }).describe(
            "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
          ).optional(),
          executableCode: z.object({
            code: z.string().describe("Required. The code to be executed.")
              .optional(),
            language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
              "Required. Programming language of the `code`.",
            ).optional(),
          }).describe(
            "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
          ).optional(),
          fileData: z.object({
            displayName: z.string().describe(
              "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
            ).optional(),
            fileUri: z.string().describe(
              "Required. The URI of the file in Google Cloud Storage.",
            ).optional(),
            mimeType: z.string().describe(
              "Required. The IANA standard MIME type of the source data.",
            ).optional(),
          }).describe(
            "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
          ).optional(),
          functionCall: z.object({
            args: z.record(z.string(), z.string()).describe(
              "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
            ).optional(),
            name: z.string().describe(
              "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
            ).optional(),
            partialArgs: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. Represents a boolean value.",
              ).optional(),
              jsonPath: z.string().describe(
                'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
              ).optional(),
              nullValue: z.enum(["NULL_VALUE"]).describe(
                "Optional. Represents a null value.",
              ).optional(),
              numberValue: z.number().describe(
                "Optional. Represents a double value.",
              ).optional(),
              stringValue: z.string().describe(
                "Optional. Represents a string value.",
              ).optional(),
              willContinue: z.boolean().describe(
                "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
              ).optional(),
            })).describe(
              "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
            ).optional(),
            willContinue: z.boolean().describe(
              "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
            ).optional(),
          }).describe(
            "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
          ).optional(),
          functionResponse: z.object({
            name: z.string().describe(
              "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
            ).optional(),
            parts: z.array(z.object({
              fileData: z.object({
                displayName: z.string().describe(
                  "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                ).optional(),
                fileUri: z.string().describe("Required. URI.").optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe("URI based data for function response.").optional(),
              inlineData: z.object({
                data: z.string().describe("Required. Raw bytes.").optional(),
                displayName: z.string().describe(
                  "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
              ).optional(),
            })).describe(
              "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
            ).optional(),
            response: z.record(z.string(), z.string()).describe(
              'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
            ).optional(),
            scheduling: z.enum([
              "SCHEDULING_UNSPECIFIED",
              "SILENT",
              "WHEN_IDLE",
              "INTERRUPT",
            ]).describe(
              "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
            ).optional(),
          }).describe(
            "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
          ).optional(),
          inlineData: z.object({
            data: z.string().describe("Required. The raw bytes of the data.")
              .optional(),
            displayName: z.string().describe(
              "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
            ).optional(),
            mimeType: z.string().describe(
              "Required. The IANA standard MIME type of the source data.",
            ).optional(),
          }).describe(
            "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
          ).optional(),
          mediaResolution: z.object({
            level: z.enum([
              "MEDIA_RESOLUTION_UNSPECIFIED",
              "MEDIA_RESOLUTION_LOW",
              "MEDIA_RESOLUTION_MEDIUM",
              "MEDIA_RESOLUTION_HIGH",
              "MEDIA_RESOLUTION_ULTRA_HIGH",
            ]).describe("The tokenization quality used for given media.")
              .optional(),
          }).describe(
            "per part media resolution. Media resolution for the input media.",
          ).optional(),
          text: z.string().describe(
            "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
          ).optional(),
          thought: z.boolean().describe(
            "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
          ).optional(),
          thoughtSignature: z.string().describe(
            "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
          ).optional(),
          videoMetadata: z.object({
            endOffset: z.string().describe(
              "Optional. The end offset of the video.",
            ).optional(),
            fps: z.number().describe(
              "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
            ).optional(),
            startOffset: z.string().describe(
              "Optional. The start offset of the video.",
            ).optional(),
          }).describe(
            "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
          ).optional(),
        })).describe(
          "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
        ).optional(),
        role: z.string().describe(
          "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
        ).optional(),
      })).describe(
        "Output only. Sample user messages in the training dataset uri.",
      ).optional(),
      userInputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userOutputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
    }).describe("Tuning data statistics for Supervised Tuning.").optional(),
  }).describe("The tuning data statistic values for TuningJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  baseModel: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  evaluateDatasetRuns: z.array(z.object({
    checkpointId: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    evaluateDatasetResponse: z.object({
      aggregationOutput: z.object({
        aggregationResults: z.array(z.object({
          aggregationMetric: z.string(),
          bleuMetricValue: z.object({
            score: z.number(),
          }),
          customCodeExecutionResult: z.object({
            score: z.number(),
          }),
          exactMatchMetricValue: z.object({
            score: z.number(),
          }),
          pairwiseMetricResult: z.object({
            customOutput: z.object({
              rawOutputs: z.object({
                rawOutput: z.array(z.string()),
              }),
            }),
            explanation: z.string(),
            pairwiseChoice: z.string(),
          }),
          pointwiseMetricResult: z.object({
            customOutput: z.object({
              rawOutputs: z.object({
                rawOutput: z.array(z.string()),
              }),
            }),
            explanation: z.string(),
            score: z.number(),
          }),
          rougeMetricValue: z.object({
            score: z.number(),
          }),
        })),
        dataset: z.object({
          bigquerySource: z.object({
            inputUri: z.string(),
          }),
          gcsSource: z.object({
            uris: z.array(z.string()),
          }),
        }),
      }),
      outputInfo: z.object({
        gcsOutputDirectory: z.string(),
      }),
    }),
    evaluationRun: z.string(),
    operationName: z.string(),
  })).optional(),
  experiment: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  preTunedModel: z.object({
    baseModel: z.string(),
    checkpointId: z.string(),
    tunedModelName: z.string(),
  }).optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean(),
    hyperParameters: z.object({
      adapterSize: z.string(),
      beta: z.number(),
      epochCount: z.string(),
      learningRateMultiplier: z.number(),
    }),
    trainingDatasetUri: z.string(),
    validationDatasetUri: z.string(),
  }).optional(),
  serviceAccount: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
        autoraterModel: z.string(),
        flipEnabled: z.boolean(),
        generationConfig: z.object({
          audioTimestamp: z.boolean(),
          candidateCount: z.number(),
          enableAffectiveDialog: z.boolean(),
          frequencyPenalty: z.number(),
          imageConfig: z.object({
            aspectRatio: z.string(),
            imageOutputOptions: z.object({
              compressionQuality: z.number(),
              mimeType: z.string(),
            }),
            imageSize: z.string(),
            personGeneration: z.string(),
            prominentPeople: z.string(),
          }),
          logprobs: z.number(),
          maxOutputTokens: z.number(),
          mediaResolution: z.string(),
          presencePenalty: z.number(),
          responseJsonSchema: z.string(),
          responseLogprobs: z.boolean(),
          responseMimeType: z.string(),
          responseModalities: z.array(z.string()),
          responseSchema: z.object({
            additionalProperties: z.string(),
            anyOf: z.array(z.string()),
            default: z.string(),
            defs: z.record(z.string(), z.unknown()),
            description: z.string(),
            enum: z.array(z.string()),
            example: z.string(),
            format: z.string(),
            items: z.string(),
            maxItems: z.string(),
            maxLength: z.string(),
            maxProperties: z.string(),
            maximum: z.number(),
            minItems: z.string(),
            minLength: z.string(),
            minProperties: z.string(),
            minimum: z.number(),
            nullable: z.boolean(),
            pattern: z.string(),
            properties: z.record(z.string(), z.unknown()),
            propertyOrdering: z.array(z.string()),
            ref: z.string(),
            required: z.array(z.string()),
            title: z.string(),
            type: z.string(),
          }),
          routingConfig: z.object({
            autoMode: z.object({
              modelRoutingPreference: z.string(),
            }),
            manualMode: z.object({
              modelName: z.string(),
            }),
          }),
          seed: z.number(),
          speechConfig: z.object({
            languageCode: z.string(),
            multiSpeakerVoiceConfig: z.object({
              speakerVoiceConfigs: z.array(z.object({
                speaker: z.string(),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string(),
                  }),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string(),
                    voiceSampleAudio: z.string(),
                  }),
                }),
              })),
            }),
            voiceConfig: z.object({
              prebuiltVoiceConfig: z.object({
                voiceName: z.string(),
              }),
              replicatedVoiceConfig: z.object({
                mimeType: z.string(),
                voiceSampleAudio: z.string(),
              }),
            }),
          }),
          stopSequences: z.array(z.string()),
          temperature: z.number(),
          thinkingConfig: z.object({
            includeThoughts: z.boolean(),
            thinkingBudget: z.number(),
            thinkingLevel: z.string(),
          }),
          topK: z.number(),
          topP: z.number(),
        }),
        samplingCount: z.number(),
      }),
      datasetCustomMetrics: z.array(z.object({
        aggregationFunction: z.string(),
        displayName: z.string(),
      })),
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean(),
        candidateCount: z.number(),
        enableAffectiveDialog: z.boolean(),
        frequencyPenalty: z.number(),
        imageConfig: z.object({
          aspectRatio: z.string(),
          imageOutputOptions: z.object({
            compressionQuality: z.number(),
            mimeType: z.string(),
          }),
          imageSize: z.string(),
          personGeneration: z.string(),
          prominentPeople: z.string(),
        }),
        logprobs: z.number(),
        maxOutputTokens: z.number(),
        mediaResolution: z.string(),
        presencePenalty: z.number(),
        responseJsonSchema: z.string(),
        responseLogprobs: z.boolean(),
        responseMimeType: z.string(),
        responseModalities: z.array(z.string()),
        responseSchema: z.object({
          additionalProperties: z.string(),
          anyOf: z.array(z.string()),
          default: z.string(),
          defs: z.record(z.string(), z.unknown()),
          description: z.string(),
          enum: z.array(z.string()),
          example: z.string(),
          format: z.string(),
          items: z.string(),
          maxItems: z.string(),
          maxLength: z.string(),
          maxProperties: z.string(),
          maximum: z.number(),
          minItems: z.string(),
          minLength: z.string(),
          minProperties: z.string(),
          minimum: z.number(),
          nullable: z.boolean(),
          pattern: z.string(),
          properties: z.record(z.string(), z.unknown()),
          propertyOrdering: z.array(z.string()),
          ref: z.string(),
          required: z.array(z.string()),
          title: z.string(),
          type: z.string(),
        }),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.string(),
          }),
          manualMode: z.object({
            modelName: z.string(),
          }),
        }),
        seed: z.number(),
        speechConfig: z.object({
          languageCode: z.string(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.array(z.object({
              speaker: z.string(),
              voiceConfig: z.object({
                prebuiltVoiceConfig: z.object({
                  voiceName: z.string(),
                }),
                replicatedVoiceConfig: z.object({
                  mimeType: z.string(),
                  voiceSampleAudio: z.string(),
                }),
              }),
            })),
          }),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.object({
              voiceName: z.string(),
            }),
            replicatedVoiceConfig: z.object({
              mimeType: z.string(),
              voiceSampleAudio: z.string(),
            }),
          }),
        }),
        stopSequences: z.array(z.string()),
        temperature: z.number(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean(),
          thinkingBudget: z.number(),
          thinkingLevel: z.string(),
        }),
        topK: z.number(),
        topP: z.number(),
      }),
      metrics: z.array(z.object({
        aggregationMetrics: z.array(z.string()),
        bleuSpec: z.object({
          useEffectiveOrder: z.boolean(),
        }),
        computationBasedMetricSpec: z.object({
          parameters: z.record(z.string(), z.unknown()),
          type: z.string(),
        }),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.string(),
        }),
        exactMatchSpec: z.object({}),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.record(z.string(), z.unknown()),
          judgeAutoraterConfig: z.object({
            autoraterModel: z.string(),
            flipEnabled: z.boolean(),
            generationConfig: z.object({
              audioTimestamp: z.boolean(),
              candidateCount: z.number(),
              enableAffectiveDialog: z.boolean(),
              frequencyPenalty: z.number(),
              imageConfig: z.object({
                aspectRatio: z.string(),
                imageOutputOptions: z.object({
                  compressionQuality: z.number(),
                  mimeType: z.string(),
                }),
                imageSize: z.string(),
                personGeneration: z.string(),
                prominentPeople: z.string(),
              }),
              logprobs: z.number(),
              maxOutputTokens: z.number(),
              mediaResolution: z.string(),
              presencePenalty: z.number(),
              responseJsonSchema: z.string(),
              responseLogprobs: z.boolean(),
              responseMimeType: z.string(),
              responseModalities: z.array(z.string()),
              responseSchema: z.object({
                additionalProperties: z.string(),
                anyOf: z.array(z.string()),
                default: z.string(),
                defs: z.record(z.string(), z.unknown()),
                description: z.string(),
                enum: z.array(z.string()),
                example: z.string(),
                format: z.string(),
                items: z.string(),
                maxItems: z.string(),
                maxLength: z.string(),
                maxProperties: z.string(),
                maximum: z.number(),
                minItems: z.string(),
                minLength: z.string(),
                minProperties: z.string(),
                minimum: z.number(),
                nullable: z.boolean(),
                pattern: z.string(),
                properties: z.record(z.string(), z.unknown()),
                propertyOrdering: z.array(z.string()),
                ref: z.string(),
                required: z.array(z.string()),
                title: z.string(),
                type: z.string(),
              }),
              routingConfig: z.object({
                autoMode: z.object({
                  modelRoutingPreference: z.string(),
                }),
                manualMode: z.object({
                  modelName: z.string(),
                }),
              }),
              seed: z.number(),
              speechConfig: z.object({
                languageCode: z.string(),
                multiSpeakerVoiceConfig: z.object({
                  speakerVoiceConfigs: z.array(z.object({
                    speaker: z.string(),
                    voiceConfig: z.object({
                      prebuiltVoiceConfig: z.object({
                        voiceName: z.string(),
                      }),
                      replicatedVoiceConfig: z.object({
                        mimeType: z.string(),
                        voiceSampleAudio: z.string(),
                      }),
                    }),
                  })),
                }),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string(),
                  }),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string(),
                    voiceSampleAudio: z.string(),
                  }),
                }),
              }),
              stopSequences: z.array(z.string()),
              temperature: z.number(),
              thinkingConfig: z.object({
                includeThoughts: z.boolean(),
                thinkingBudget: z.number(),
                thinkingLevel: z.string(),
              }),
              topK: z.number(),
              topP: z.number(),
            }),
            samplingCount: z.number(),
          }),
          metricPromptTemplate: z.string(),
          predefinedRubricGenerationSpec: z.object({
            metricSpecName: z.string(),
            metricSpecParameters: z.record(z.string(), z.unknown()),
          }),
          rubricGenerationSpec: z.object({
            modelConfig: z.object({
              autoraterModel: z.string(),
              flipEnabled: z.boolean(),
              generationConfig: z.object({
                audioTimestamp: z.boolean(),
                candidateCount: z.number(),
                enableAffectiveDialog: z.boolean(),
                frequencyPenalty: z.number(),
                imageConfig: z.object({
                  aspectRatio: z.string(),
                  imageOutputOptions: z.object({
                    compressionQuality: z.number(),
                    mimeType: z.string(),
                  }),
                  imageSize: z.string(),
                  personGeneration: z.string(),
                  prominentPeople: z.string(),
                }),
                logprobs: z.number(),
                maxOutputTokens: z.number(),
                mediaResolution: z.string(),
                presencePenalty: z.number(),
                responseJsonSchema: z.string(),
                responseLogprobs: z.boolean(),
                responseMimeType: z.string(),
                responseModalities: z.array(z.string()),
                responseSchema: z.object({
                  additionalProperties: z.string(),
                  anyOf: z.array(z.string()),
                  default: z.string(),
                  defs: z.record(z.string(), z.unknown()),
                  description: z.string(),
                  enum: z.array(z.string()),
                  example: z.string(),
                  format: z.string(),
                  items: z.string(),
                  maxItems: z.string(),
                  maxLength: z.string(),
                  maxProperties: z.string(),
                  maximum: z.number(),
                  minItems: z.string(),
                  minLength: z.string(),
                  minProperties: z.string(),
                  minimum: z.number(),
                  nullable: z.boolean(),
                  pattern: z.string(),
                  properties: z.record(z.string(), z.unknown()),
                  propertyOrdering: z.array(z.string()),
                  ref: z.string(),
                  required: z.array(z.string()),
                  title: z.string(),
                  type: z.string(),
                }),
                routingConfig: z.object({
                  autoMode: z.object({
                    modelRoutingPreference: z.string(),
                  }),
                  manualMode: z.object({
                    modelName: z.string(),
                  }),
                }),
                seed: z.number(),
                speechConfig: z.object({
                  languageCode: z.string(),
                  multiSpeakerVoiceConfig: z.object({
                    speakerVoiceConfigs: z.array(z.object({
                      speaker: z.string(),
                      voiceConfig: z.object({
                        prebuiltVoiceConfig: z.object({
                          voiceName: z.string(),
                        }),
                        replicatedVoiceConfig: z.object({
                          mimeType: z.string(),
                          voiceSampleAudio: z.string(),
                        }),
                      }),
                    })),
                  }),
                  voiceConfig: z.object({
                    prebuiltVoiceConfig: z.object({
                      voiceName: z.string(),
                    }),
                    replicatedVoiceConfig: z.object({
                      mimeType: z.string(),
                      voiceSampleAudio: z.string(),
                    }),
                  }),
                }),
                stopSequences: z.array(z.string()),
                temperature: z.number(),
                thinkingConfig: z.object({
                  includeThoughts: z.boolean(),
                  thinkingBudget: z.number(),
                  thinkingLevel: z.string(),
                }),
                topK: z.number(),
                topP: z.number(),
              }),
              samplingCount: z.number(),
            }),
            promptTemplate: z.string(),
            rubricContentType: z.string(),
            rubricTypeOntology: z.array(z.string()),
          }),
          rubricGroupKey: z.string(),
          systemInstruction: z.string(),
        }),
        metadata: z.object({
          otherMetadata: z.record(z.string(), z.unknown()),
          scoreRange: z.object({
            description: z.string(),
            max: z.number(),
            min: z.number(),
            step: z.number(),
          }),
          title: z.string(),
        }),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.string(),
          candidateResponseFieldName: z.string(),
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean(),
          }),
          metricPromptTemplate: z.string(),
          systemInstruction: z.string(),
        }),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean(),
          }),
          metricPromptTemplate: z.string(),
          systemInstruction: z.string(),
        }),
        predefinedMetricSpec: z.object({
          metricSpecName: z.string(),
          metricSpecParameters: z.record(z.string(), z.unknown()),
        }),
        rougeSpec: z.object({
          rougeType: z.string(),
          splitSummaries: z.boolean(),
          useStemmer: z.boolean(),
        }),
      })),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string(),
        }),
      }),
    }),
    exportLastCheckpointOnly: z.boolean(),
    hyperParameters: z.object({
      adapterSize: z.string(),
      epochCount: z.string(),
      learningRateMultiplier: z.number(),
    }),
    trainingDatasetUri: z.string(),
    validationDatasetUri: z.string(),
  }).optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string(),
      endpoint: z.string(),
      epoch: z.string(),
      step: z.string(),
    })),
    endpoint: z.string(),
    model: z.string(),
  }).optional(),
  tunedModelDisplayName: z.string().optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()),
      droppedExampleReasons: z.array(z.string()),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      totalBillableTokenCount: z.string(),
      tuningDatasetExampleCount: z.string(),
      tuningStepCount: z.string(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.object({
          completion: z.object({
            parts: z.array(z.object({
              codeExecutionResult: z.object({
                outcome: z.string(),
                output: z.string(),
              }),
              executableCode: z.object({
                code: z.string(),
                language: z.string(),
              }),
              fileData: z.object({
                displayName: z.string(),
                fileUri: z.string(),
                mimeType: z.string(),
              }),
              functionCall: z.object({
                args: z.record(z.string(), z.unknown()),
                name: z.string(),
                partialArgs: z.array(z.object({
                  boolValue: z.boolean(),
                  jsonPath: z.string(),
                  nullValue: z.string(),
                  numberValue: z.number(),
                  stringValue: z.string(),
                  willContinue: z.boolean(),
                })),
                willContinue: z.boolean(),
              }),
              functionResponse: z.object({
                name: z.string(),
                parts: z.array(z.object({
                  fileData: z.object({
                    displayName: z.string(),
                    fileUri: z.string(),
                    mimeType: z.string(),
                  }),
                  inlineData: z.object({
                    data: z.string(),
                    displayName: z.string(),
                    mimeType: z.string(),
                  }),
                })),
                response: z.record(z.string(), z.unknown()),
                scheduling: z.string(),
              }),
              inlineData: z.object({
                data: z.string(),
                displayName: z.string(),
                mimeType: z.string(),
              }),
              mediaResolution: z.object({
                level: z.string(),
              }),
              text: z.string(),
              thought: z.boolean(),
              thoughtSignature: z.string(),
              videoMetadata: z.object({
                endOffset: z.string(),
                fps: z.number(),
                startOffset: z.string(),
              }),
            })),
            role: z.string(),
          }),
          score: z.number(),
        })),
        contents: z.array(z.object({
          parts: z.array(z.object({
            codeExecutionResult: z.object({
              outcome: z.string(),
              output: z.string(),
            }),
            executableCode: z.object({
              code: z.string(),
              language: z.string(),
            }),
            fileData: z.object({
              displayName: z.string(),
              fileUri: z.string(),
              mimeType: z.string(),
            }),
            functionCall: z.object({
              args: z.record(z.string(), z.unknown()),
              name: z.string(),
              partialArgs: z.array(z.object({
                boolValue: z.boolean(),
                jsonPath: z.string(),
                nullValue: z.string(),
                numberValue: z.number(),
                stringValue: z.string(),
                willContinue: z.boolean(),
              })),
              willContinue: z.boolean(),
            }),
            functionResponse: z.object({
              name: z.string(),
              parts: z.array(z.object({
                fileData: z.object({
                  displayName: z.string(),
                  fileUri: z.string(),
                  mimeType: z.string(),
                }),
                inlineData: z.object({
                  data: z.string(),
                  displayName: z.string(),
                  mimeType: z.string(),
                }),
              })),
              response: z.record(z.string(), z.unknown()),
              scheduling: z.string(),
            }),
            inlineData: z.object({
              data: z.string(),
              displayName: z.string(),
              mimeType: z.string(),
            }),
            mediaResolution: z.object({
              level: z.string(),
            }),
            text: z.string(),
            thought: z.boolean(),
            thoughtSignature: z.string(),
            videoMetadata: z.object({
              endOffset: z.string(),
              fps: z.number(),
              startOffset: z.string(),
            }),
          })),
          role: z.string(),
        })),
      })),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.number(),
      }),
    }),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()),
      totalBillableCharacterCount: z.string(),
      totalBillableTokenCount: z.string(),
      totalTruncatedExampleCount: z.string(),
      totalTuningCharacterCount: z.string(),
      truncatedExampleIndices: z.array(z.string()),
      tuningDatasetExampleCount: z.string(),
      tuningStepCount: z.string(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.object({
          codeExecutionResult: z.object({
            outcome: z.string(),
            output: z.string(),
          }),
          executableCode: z.object({
            code: z.string(),
            language: z.string(),
          }),
          fileData: z.object({
            displayName: z.string(),
            fileUri: z.string(),
            mimeType: z.string(),
          }),
          functionCall: z.object({
            args: z.record(z.string(), z.unknown()),
            name: z.string(),
            partialArgs: z.array(z.object({
              boolValue: z.boolean(),
              jsonPath: z.string(),
              nullValue: z.string(),
              numberValue: z.number(),
              stringValue: z.string(),
              willContinue: z.boolean(),
            })),
            willContinue: z.boolean(),
          }),
          functionResponse: z.object({
            name: z.string(),
            parts: z.array(z.object({
              fileData: z.object({
                displayName: z.string(),
                fileUri: z.string(),
                mimeType: z.string(),
              }),
              inlineData: z.object({
                data: z.string(),
                displayName: z.string(),
                mimeType: z.string(),
              }),
            })),
            response: z.record(z.string(), z.unknown()),
            scheduling: z.string(),
          }),
          inlineData: z.object({
            data: z.string(),
            displayName: z.string(),
            mimeType: z.string(),
          }),
          mediaResolution: z.object({
            level: z.string(),
          }),
          text: z.string(),
          thought: z.boolean(),
          thoughtSignature: z.string(),
          videoMetadata: z.object({
            endOffset: z.string(),
            fps: z.number(),
            startOffset: z.string(),
          }),
        })),
        role: z.string(),
      })),
      userInputTokenDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.number(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.number(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
      userOutputTokenDistribution: z.object({
        billableSum: z.string(),
        buckets: z.array(z.object({
          count: z.number(),
          left: z.number(),
          right: z.number(),
        })),
        max: z.number(),
        mean: z.number(),
        median: z.number(),
        min: z.number(),
        p5: z.number(),
        p95: z.number(),
        sum: z.string(),
      }),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  baseModel: z.string().describe(
    "The base model that is being tuned. See [Supported models](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/tuning#supported_models).",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the TuningJob.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels with user-defined metadata to organize TuningJob and generated resources such as Model and Endpoint. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  preTunedModel: z.object({
    baseModel: z.string().describe(
      "Output only. The name of the base model this PreTunedModel was tuned from.",
    ).optional(),
    checkpointId: z.string().describe(
      "Optional. The source checkpoint id. If not specified, the default checkpoint will be used.",
    ).optional(),
    tunedModelName: z.string().describe(
      "The resource name of the Model. E.g., a model resource name with a specified version id or alias: `projects/{project}/locations/{location}/models/{model}@{version_id}` `projects/{project}/locations/{location}/models/{model}@{alias}` Or, omit the version id to use the default version: `projects/{project}/locations/{location}/models/{model}`",
    ).optional(),
  }).describe("A pre-tuned model for continuous tuning.").optional(),
  preferenceOptimizationSpec: z.object({
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for Preference Optimization and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for Preference Optimization. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for preference optimization.")
        .optional(),
      beta: z.number().describe(
        "Optional. Weight for KL Divergence regularization.",
      ).optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate.",
      ).optional(),
    }).describe("Hyperparameters for Preference Optimization.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Cloud Storage path to file containing training dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Cloud Storage path to file containing validation dataset for preference optimization tuning. The dataset must be formatted as a JSONL file.",
    ).optional(),
  }).describe("Tuning Spec for Preference Optimization.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the tuningJob workload runs as. If not specified, the Vertex AI Secure Fine-Tuned Service Agent in the project will be used. See https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-agent Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  supervisedTuningSpec: z.object({
    evaluationConfig: z.object({
      autoraterConfig: z.object({
        autoraterModel: z.string().describe(
          "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
        ).optional(),
        flipEnabled: z.boolean().describe(
          "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
        ).optional(),
        generationConfig: z.object({
          audioTimestamp: z.boolean().describe(
            "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
          ).optional(),
          candidateCount: z.number().int().describe(
            "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
          ).optional(),
          enableAffectiveDialog: z.boolean().describe(
            "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
          ).optional(),
          frequencyPenalty: z.number().describe(
            "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
          ).optional(),
          imageConfig: z.object({
            aspectRatio: z.string().describe(
              'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
            ).optional(),
            imageOutputOptions: z.object({
              compressionQuality: z.number().int().describe(
                "Optional. The compression quality of the output image.",
              ).optional(),
              mimeType: z.string().describe(
                "Optional. The image format that the output should be saved as.",
              ).optional(),
            }).describe("The image output format for generated images.")
              .optional(),
            imageSize: z.string().describe(
              "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
            ).optional(),
            personGeneration: z.enum([
              "PERSON_GENERATION_UNSPECIFIED",
              "ALLOW_ALL",
              "ALLOW_ADULT",
              "ALLOW_NONE",
            ]).describe(
              "Optional. Controls whether the model can generate people.",
            ).optional(),
            prominentPeople: z.enum([
              "PROMINENT_PEOPLE_UNSPECIFIED",
              "ALLOW_PROMINENT_PEOPLE",
              "BLOCK_PROMINENT_PEOPLE",
            ]).describe(
              "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
            ).optional(),
          }).describe(
            "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
          ).optional(),
          logprobs: z.number().int().describe(
            "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
          ).optional(),
          maxOutputTokens: z.number().int().describe(
            "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
          ).optional(),
          mediaResolution: z.enum([
            "MEDIA_RESOLUTION_UNSPECIFIED",
            "MEDIA_RESOLUTION_LOW",
            "MEDIA_RESOLUTION_MEDIUM",
            "MEDIA_RESOLUTION_HIGH",
          ]).describe(
            "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
          ).optional(),
          presencePenalty: z.number().describe(
            "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
          ).optional(),
          responseJsonSchema: z.string().describe(
            "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
          ).optional(),
          responseLogprobs: z.boolean().describe(
            "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
          ).optional(),
          responseMimeType: z.string().describe(
            "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
          ).optional(),
          responseModalities: z.array(
            z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
          ).describe(
            "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
          ).optional(),
          responseSchema: z.object({
            additionalProperties: z.string().describe(
              "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
            ).optional(),
            anyOf: z.array(z.string()).describe(
              "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
            ).optional(),
            default: z.string().describe(
              "Optional. Default value to use if the field is not specified.",
            ).optional(),
            defs: z.record(z.string(), z.string()).describe(
              "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
            ).optional(),
            description: z.string().describe(
              "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
            ).optional(),
            enum: z.array(z.string()).describe(
              'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
            ).optional(),
            example: z.string().describe(
              "Optional. Example of an instance of this schema.",
            ).optional(),
            format: z.string().describe(
              "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
            ).optional(),
            items: z.string().describe(
              "Circular reference to GoogleCloudAiplatformV1Schema",
            ).optional(),
            maxItems: z.string().describe(
              "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
            ).optional(),
            maxLength: z.string().describe(
              "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
            ).optional(),
            maxProperties: z.string().describe(
              "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
            ).optional(),
            maximum: z.number().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
            ).optional(),
            minItems: z.string().describe(
              "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
            ).optional(),
            minLength: z.string().describe(
              "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
            ).optional(),
            minProperties: z.string().describe(
              "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
            ).optional(),
            minimum: z.number().describe(
              "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
            ).optional(),
            nullable: z.boolean().describe(
              "Optional. Indicates if the value of this field can be null.",
            ).optional(),
            pattern: z.string().describe(
              "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
            ).optional(),
            properties: z.record(z.string(), z.string()).describe(
              "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
            ).optional(),
            propertyOrdering: z.array(z.string()).describe(
              "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
            ).optional(),
            ref: z.string().describe(
              'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
            ).optional(),
            required: z.array(z.string()).describe(
              "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
            ).optional(),
            title: z.string().describe("Optional. Title for the schema.")
              .optional(),
            type: z.enum([
              "TYPE_UNSPECIFIED",
              "STRING",
              "NUMBER",
              "INTEGER",
              "BOOLEAN",
              "ARRAY",
              "OBJECT",
              "NULL",
            ]).describe("Optional. Data type of the schema field.").optional(),
          }).describe(
            "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
          ).optional(),
          routingConfig: z.object({
            autoMode: z.object({
              modelRoutingPreference: z.enum([
                "UNKNOWN",
                "PRIORITIZE_QUALITY",
                "BALANCED",
                "PRIORITIZE_COST",
              ]).describe("The model routing preference.").optional(),
            }).describe(
              "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
            ).optional(),
            manualMode: z.object({
              modelName: z.string().describe(
                "The name of the model to use. Only public LLM models are accepted.",
              ).optional(),
            }).describe(
              "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
            ).optional(),
          }).describe(
            "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
          ).optional(),
          seed: z.number().int().describe(
            "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
          ).optional(),
          speechConfig: z.object({
            languageCode: z.string().describe(
              "Optional. The language code (ISO 639-1) for the speech synthesis.",
            ).optional(),
            multiSpeakerVoiceConfig: z.object({
              speakerVoiceConfigs: z.array(z.object({
                speaker: z.string().describe(
                  "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                ).optional(),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string().describe(
                      "The name of the prebuilt voice to use.",
                    ).optional(),
                  }).describe("Configuration for a prebuilt voice.").optional(),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string().describe(
                      "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                    ).optional(),
                    voiceSampleAudio: z.string().describe(
                      "Optional. The sample of the custom voice.",
                    ).optional(),
                  }).describe(
                    "The configuration for the replicated voice to use.",
                  ).optional(),
                }).describe("Configuration for a voice.").optional(),
              })).describe(
                "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
              ).optional(),
            }).describe(
              "Configuration for a multi-speaker text-to-speech request.",
            ).optional(),
            voiceConfig: z.object({
              prebuiltVoiceConfig: z.object({
                voiceName: z.string().describe(
                  "The name of the prebuilt voice to use.",
                ).optional(),
              }).describe("Configuration for a prebuilt voice.").optional(),
              replicatedVoiceConfig: z.object({
                mimeType: z.string().describe(
                  "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                ).optional(),
                voiceSampleAudio: z.string().describe(
                  "Optional. The sample of the custom voice.",
                ).optional(),
              }).describe("The configuration for the replicated voice to use.")
                .optional(),
            }).describe("Configuration for a voice.").optional(),
          }).describe("Configuration for speech generation.").optional(),
          stopSequences: z.array(z.string()).describe(
            'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
          ).optional(),
          temperature: z.number().describe(
            "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
          ).optional(),
          thinkingConfig: z.object({
            includeThoughts: z.boolean().describe(
              'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
            ).optional(),
            thinkingBudget: z.number().int().describe(
              "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
            ).optional(),
            thinkingLevel: z.enum([
              "THINKING_LEVEL_UNSPECIFIED",
              "LOW",
              "MEDIUM",
              "HIGH",
              "MINIMAL",
            ]).describe(
              "Optional. The number of thoughts tokens that the model should generate.",
            ).optional(),
          }).describe(
            'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
          ).optional(),
          topK: z.number().describe(
            "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
          ).optional(),
          topP: z.number().describe(
            "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
          ).optional(),
        }).describe(
          "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
        ).optional(),
        samplingCount: z.number().int().describe(
          "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
        ).optional(),
      }).describe(
        "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
      ).optional(),
      datasetCustomMetrics: z.array(z.object({
        aggregationFunction: z.string().describe(
          'Required. The Python code string containing the aggregation function. Expected function signature: `def aggregate(instances: list[dict[str, Any]]) -> dict[str, float]:` The `instances` argument is a list of dictionaries, where each dictionary represents a single evaluation result item. The structure of each dictionary corresponds to the fields in the `EvaluationResult` message. This includes: - `"request"`: Contains the original input data and model inputs (from `EvaluationResult.EvaluationRequest`). - `"candidate_results"`: Contains the results of any instance-level metrics (from `EvaluationResult.CandidateResults`). Example of a single item in the `instances` list: { "request": { "prompt": {"text": "What is the capital of France?"}, "golden_response": {"text": "Paris"}, "candidate_responses": [{"candidate": "model-v1", "text": "Paris"}] }, "candidate_results": [ {"metric": "exact_match", "score": 1.0}, {"metric": "bleu", "score": 0.9} ] }',
        ).optional(),
        displayName: z.string().describe(
          'Optional. A display name for this custom summary metric. Used to prefix keys in the output summaryMetrics map. If not provided, a default name like "dataset_custom_metric_1", "dataset_custom_metric_2", etc., will be generated based on the order in the repeated field.',
        ).optional(),
      })).describe(
        "Optional. Specifications for custom dataset-level aggregations.",
      ).optional(),
      inferenceGenerationConfig: z.object({
        audioTimestamp: z.boolean().describe(
          "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
        ).optional(),
        candidateCount: z.number().int().describe(
          "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
        ).optional(),
        enableAffectiveDialog: z.boolean().describe(
          "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
        ).optional(),
        frequencyPenalty: z.number().describe(
          "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        imageConfig: z.object({
          aspectRatio: z.string().describe(
            'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
          ).optional(),
          imageOutputOptions: z.object({
            compressionQuality: z.number().int().describe(
              "Optional. The compression quality of the output image.",
            ).optional(),
            mimeType: z.string().describe(
              "Optional. The image format that the output should be saved as.",
            ).optional(),
          }).describe("The image output format for generated images.")
            .optional(),
          imageSize: z.string().describe(
            "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
          ).optional(),
          personGeneration: z.enum([
            "PERSON_GENERATION_UNSPECIFIED",
            "ALLOW_ALL",
            "ALLOW_ADULT",
            "ALLOW_NONE",
          ]).describe(
            "Optional. Controls whether the model can generate people.",
          ).optional(),
          prominentPeople: z.enum([
            "PROMINENT_PEOPLE_UNSPECIFIED",
            "ALLOW_PROMINENT_PEOPLE",
            "BLOCK_PROMINENT_PEOPLE",
          ]).describe(
            "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
          ).optional(),
        }).describe(
          "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
        ).optional(),
        logprobs: z.number().int().describe(
          "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
        ).optional(),
        maxOutputTokens: z.number().int().describe(
          "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
        ).optional(),
        mediaResolution: z.enum([
          "MEDIA_RESOLUTION_UNSPECIFIED",
          "MEDIA_RESOLUTION_LOW",
          "MEDIA_RESOLUTION_MEDIUM",
          "MEDIA_RESOLUTION_HIGH",
        ]).describe(
          "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
        ).optional(),
        presencePenalty: z.number().describe(
          "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
        ).optional(),
        responseJsonSchema: z.string().describe(
          "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
        ).optional(),
        responseLogprobs: z.boolean().describe(
          "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
        ).optional(),
        responseMimeType: z.string().describe(
          "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
        ).optional(),
        responseModalities: z.array(
          z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
        ).describe(
          "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
        ).optional(),
        responseSchema: z.object({
          additionalProperties: z.string().describe(
            "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
          ).optional(),
          anyOf: z.array(z.string()).describe(
            "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
          ).optional(),
          default: z.string().describe(
            "Optional. Default value to use if the field is not specified.",
          ).optional(),
          defs: z.record(z.string(), z.string()).describe(
            "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
          ).optional(),
          description: z.string().describe(
            "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
          ).optional(),
          enum: z.array(z.string()).describe(
            'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
          ).optional(),
          example: z.string().describe(
            "Optional. Example of an instance of this schema.",
          ).optional(),
          format: z.string().describe(
            "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
          ).optional(),
          items: z.string().describe(
            "Circular reference to GoogleCloudAiplatformV1Schema",
          ).optional(),
          maxItems: z.string().describe(
            "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
          ).optional(),
          maxLength: z.string().describe(
            "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
          ).optional(),
          maxProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
          ).optional(),
          maximum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
          ).optional(),
          minItems: z.string().describe(
            "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
          ).optional(),
          minLength: z.string().describe(
            "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
          ).optional(),
          minProperties: z.string().describe(
            "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
          ).optional(),
          minimum: z.number().describe(
            "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
          ).optional(),
          nullable: z.boolean().describe(
            "Optional. Indicates if the value of this field can be null.",
          ).optional(),
          pattern: z.string().describe(
            "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
          ).optional(),
          properties: z.record(z.string(), z.string()).describe(
            "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
          ).optional(),
          propertyOrdering: z.array(z.string()).describe(
            "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
          ).optional(),
          ref: z.string().describe(
            'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
          ).optional(),
          required: z.array(z.string()).describe(
            "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
          ).optional(),
          title: z.string().describe("Optional. Title for the schema.")
            .optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "STRING",
            "NUMBER",
            "INTEGER",
            "BOOLEAN",
            "ARRAY",
            "OBJECT",
            "NULL",
          ]).describe("Optional. Data type of the schema field.").optional(),
        }).describe(
          "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
        ).optional(),
        routingConfig: z.object({
          autoMode: z.object({
            modelRoutingPreference: z.enum([
              "UNKNOWN",
              "PRIORITIZE_QUALITY",
              "BALANCED",
              "PRIORITIZE_COST",
            ]).describe("The model routing preference.").optional(),
          }).describe(
            "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
          ).optional(),
          manualMode: z.object({
            modelName: z.string().describe(
              "The name of the model to use. Only public LLM models are accepted.",
            ).optional(),
          }).describe(
            "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
          ).optional(),
        }).describe(
          "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
        ).optional(),
        seed: z.number().int().describe(
          "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
        ).optional(),
        speechConfig: z.object({
          languageCode: z.string().describe(
            "Optional. The language code (ISO 639-1) for the speech synthesis.",
          ).optional(),
          multiSpeakerVoiceConfig: z.object({
            speakerVoiceConfigs: z.array(z.object({
              speaker: z.string().describe(
                "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
              ).optional(),
              voiceConfig: z.object({
                prebuiltVoiceConfig: z.object({
                  voiceName: z.string().describe(
                    "The name of the prebuilt voice to use.",
                  ).optional(),
                }).describe("Configuration for a prebuilt voice.").optional(),
                replicatedVoiceConfig: z.object({
                  mimeType: z.string().describe(
                    "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                  ).optional(),
                  voiceSampleAudio: z.string().describe(
                    "Optional. The sample of the custom voice.",
                  ).optional(),
                }).describe(
                  "The configuration for the replicated voice to use.",
                ).optional(),
              }).describe("Configuration for a voice.").optional(),
            })).describe(
              "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
            ).optional(),
          }).describe(
            "Configuration for a multi-speaker text-to-speech request.",
          ).optional(),
          voiceConfig: z.object({
            prebuiltVoiceConfig: z.object({
              voiceName: z.string().describe(
                "The name of the prebuilt voice to use.",
              ).optional(),
            }).describe("Configuration for a prebuilt voice.").optional(),
            replicatedVoiceConfig: z.object({
              mimeType: z.string().describe(
                "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
              ).optional(),
              voiceSampleAudio: z.string().describe(
                "Optional. The sample of the custom voice.",
              ).optional(),
            }).describe("The configuration for the replicated voice to use.")
              .optional(),
          }).describe("Configuration for a voice.").optional(),
        }).describe("Configuration for speech generation.").optional(),
        stopSequences: z.array(z.string()).describe(
          'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
        ).optional(),
        temperature: z.number().describe(
          "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
        ).optional(),
        thinkingConfig: z.object({
          includeThoughts: z.boolean().describe(
            'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
          ).optional(),
          thinkingBudget: z.number().int().describe(
            "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
          ).optional(),
          thinkingLevel: z.enum([
            "THINKING_LEVEL_UNSPECIFIED",
            "LOW",
            "MEDIUM",
            "HIGH",
            "MINIMAL",
          ]).describe(
            "Optional. The number of thoughts tokens that the model should generate.",
          ).optional(),
        }).describe(
          'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
        ).optional(),
        topK: z.number().describe(
          "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
        ).optional(),
        topP: z.number().describe(
          "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
        ).optional(),
      }).describe(
        "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
      ).optional(),
      metrics: z.array(z.object({
        aggregationMetrics: z.array(
          z.enum([
            "AGGREGATION_METRIC_UNSPECIFIED",
            "AVERAGE",
            "MODE",
            "STANDARD_DEVIATION",
            "VARIANCE",
            "MINIMUM",
            "MAXIMUM",
            "MEDIAN",
            "PERCENTILE_P90",
            "PERCENTILE_P95",
            "PERCENTILE_P99",
          ]),
        ).describe("Optional. The aggregation metrics to use.").optional(),
        bleuSpec: z.object({
          useEffectiveOrder: z.boolean().describe(
            "Optional. Whether to use_effective_order to compute bleu score.",
          ).optional(),
        }).describe(
          "Spec for bleu score metric - calculates the precision of n-grams in the prediction as compared to reference - returns a score ranging between 0 to 1.",
        ).optional(),
        computationBasedMetricSpec: z.object({
          parameters: z.record(z.string(), z.string()).describe(
            'Optional. A map of parameters for the metric, e.g. {"rouge_type": "rougeL"}.',
          ).optional(),
          type: z.enum([
            "COMPUTATION_BASED_METRIC_TYPE_UNSPECIFIED",
            "EXACT_MATCH",
            "BLEU",
            "ROUGE",
          ]).describe("Required. The type of the computation based metric.")
            .optional(),
        }).describe("Specification for a computation based metric.").optional(),
        customCodeExecutionSpec: z.object({
          evaluationFunction: z.string().describe(
            "Required. Python function. Expected user to define the following function, e.g.: def evaluate(instance: dict[str, Any]) -> float: Please include this function signature in the code snippet. Instance is the evaluation instance, any fields populated in the instance are available to the function as instance[field_name]. Example: Example input: ` instance= EvaluationInstance( response=EvaluationInstance.InstanceData(text=\"The answer is 4.\"), reference=EvaluationInstance.InstanceData(text=\"4\")) ` Example converted input: ` { 'response': {'text': 'The answer is 4.'}, 'reference': {'text': '4'} } ` Example python function: ` def evaluate(instance: dict[str, Any]) -> float: if instance'response' == instance'reference': return 1.0 return 0.0 ` CustomCodeExecutionSpec is also supported in Batch Evaluation (EvalDataset RPC) and Tuning Evaluation. Each line in the input jsonl file will be converted to dict[str, Any] and passed to the evaluation function.",
          ).optional(),
        }).describe(
          "Specificies a metric that is populated by evaluating user-defined Python code.",
        ).optional(),
        exactMatchSpec: z.object({}).describe(
          "Spec for exact match metric - returns 1 if prediction and reference exactly matches, otherwise 0.",
        ).optional(),
        llmBasedMetricSpec: z.object({
          additionalConfig: z.record(z.string(), z.string()).describe(
            "Optional. Optional additional configuration for the metric.",
          ).optional(),
          judgeAutoraterConfig: z.object({
            autoraterModel: z.string().describe(
              "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
            ).optional(),
            flipEnabled: z.boolean().describe(
              "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
            ).optional(),
            generationConfig: z.object({
              audioTimestamp: z.boolean().describe(
                "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
              ).optional(),
              candidateCount: z.number().int().describe(
                "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
              ).optional(),
              enableAffectiveDialog: z.boolean().describe(
                "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
              ).optional(),
              frequencyPenalty: z.number().describe(
                "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
              ).optional(),
              imageConfig: z.object({
                aspectRatio: z.string().describe(
                  'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
                ).optional(),
                imageOutputOptions: z.object({
                  compressionQuality: z.number().int().describe(
                    "Optional. The compression quality of the output image.",
                  ).optional(),
                  mimeType: z.string().describe(
                    "Optional. The image format that the output should be saved as.",
                  ).optional(),
                }).describe("The image output format for generated images.")
                  .optional(),
                imageSize: z.string().describe(
                  "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
                ).optional(),
                personGeneration: z.enum([
                  "PERSON_GENERATION_UNSPECIFIED",
                  "ALLOW_ALL",
                  "ALLOW_ADULT",
                  "ALLOW_NONE",
                ]).describe(
                  "Optional. Controls whether the model can generate people.",
                ).optional(),
                prominentPeople: z.enum([
                  "PROMINENT_PEOPLE_UNSPECIFIED",
                  "ALLOW_PROMINENT_PEOPLE",
                  "BLOCK_PROMINENT_PEOPLE",
                ]).describe(
                  "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
                ).optional(),
              }).describe(
                "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
              ).optional(),
              logprobs: z.number().int().describe(
                "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
              ).optional(),
              maxOutputTokens: z.number().int().describe(
                "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
              ).optional(),
              mediaResolution: z.enum([
                "MEDIA_RESOLUTION_UNSPECIFIED",
                "MEDIA_RESOLUTION_LOW",
                "MEDIA_RESOLUTION_MEDIUM",
                "MEDIA_RESOLUTION_HIGH",
              ]).describe(
                "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
              ).optional(),
              presencePenalty: z.number().describe(
                "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
              ).optional(),
              responseJsonSchema: z.string().describe(
                "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
              ).optional(),
              responseLogprobs: z.boolean().describe(
                "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
              ).optional(),
              responseMimeType: z.string().describe(
                "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
              ).optional(),
              responseModalities: z.array(
                z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
              ).describe(
                "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
              ).optional(),
              responseSchema: z.object({
                additionalProperties: z.string().describe(
                  "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
                ).optional(),
                anyOf: z.array(z.string()).describe(
                  "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
                ).optional(),
                default: z.string().describe(
                  "Optional. Default value to use if the field is not specified.",
                ).optional(),
                defs: z.record(z.string(), z.string()).describe(
                  "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
                ).optional(),
                description: z.string().describe(
                  "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
                ).optional(),
                enum: z.array(z.string()).describe(
                  'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
                ).optional(),
                example: z.string().describe(
                  "Optional. Example of an instance of this schema.",
                ).optional(),
                format: z.string().describe(
                  "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
                ).optional(),
                items: z.string().describe(
                  "Circular reference to GoogleCloudAiplatformV1Schema",
                ).optional(),
                maxItems: z.string().describe(
                  "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
                ).optional(),
                maxLength: z.string().describe(
                  "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
                ).optional(),
                maxProperties: z.string().describe(
                  "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
                ).optional(),
                maximum: z.number().describe(
                  "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
                ).optional(),
                minItems: z.string().describe(
                  "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
                ).optional(),
                minLength: z.string().describe(
                  "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
                ).optional(),
                minProperties: z.string().describe(
                  "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
                ).optional(),
                minimum: z.number().describe(
                  "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
                ).optional(),
                nullable: z.boolean().describe(
                  "Optional. Indicates if the value of this field can be null.",
                ).optional(),
                pattern: z.string().describe(
                  "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
                ).optional(),
                properties: z.record(z.string(), z.string()).describe(
                  "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
                ).optional(),
                propertyOrdering: z.array(z.string()).describe(
                  "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
                ).optional(),
                ref: z.string().describe(
                  'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
                ).optional(),
                required: z.array(z.string()).describe(
                  "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
                ).optional(),
                title: z.string().describe("Optional. Title for the schema.")
                  .optional(),
                type: z.enum([
                  "TYPE_UNSPECIFIED",
                  "STRING",
                  "NUMBER",
                  "INTEGER",
                  "BOOLEAN",
                  "ARRAY",
                  "OBJECT",
                  "NULL",
                ]).describe("Optional. Data type of the schema field.")
                  .optional(),
              }).describe(
                "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
              ).optional(),
              routingConfig: z.object({
                autoMode: z.object({
                  modelRoutingPreference: z.enum([
                    "UNKNOWN",
                    "PRIORITIZE_QUALITY",
                    "BALANCED",
                    "PRIORITIZE_COST",
                  ]).describe("The model routing preference.").optional(),
                }).describe(
                  "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
                ).optional(),
                manualMode: z.object({
                  modelName: z.string().describe(
                    "The name of the model to use. Only public LLM models are accepted.",
                  ).optional(),
                }).describe(
                  "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
                ).optional(),
              }).describe(
                "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
              ).optional(),
              seed: z.number().int().describe(
                "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
              ).optional(),
              speechConfig: z.object({
                languageCode: z.string().describe(
                  "Optional. The language code (ISO 639-1) for the speech synthesis.",
                ).optional(),
                multiSpeakerVoiceConfig: z.object({
                  speakerVoiceConfigs: z.array(z.object({
                    speaker: z.string().describe(
                      "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                    ).optional(),
                    voiceConfig: z.object({
                      prebuiltVoiceConfig: z.object({
                        voiceName: z.string().describe(
                          "The name of the prebuilt voice to use.",
                        ).optional(),
                      }).describe("Configuration for a prebuilt voice.")
                        .optional(),
                      replicatedVoiceConfig: z.object({
                        mimeType: z.string().describe(
                          "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                        ).optional(),
                        voiceSampleAudio: z.string().describe(
                          "Optional. The sample of the custom voice.",
                        ).optional(),
                      }).describe(
                        "The configuration for the replicated voice to use.",
                      ).optional(),
                    }).describe("Configuration for a voice.").optional(),
                  })).describe(
                    "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
                  ).optional(),
                }).describe(
                  "Configuration for a multi-speaker text-to-speech request.",
                ).optional(),
                voiceConfig: z.object({
                  prebuiltVoiceConfig: z.object({
                    voiceName: z.string().describe(
                      "The name of the prebuilt voice to use.",
                    ).optional(),
                  }).describe("Configuration for a prebuilt voice.").optional(),
                  replicatedVoiceConfig: z.object({
                    mimeType: z.string().describe(
                      "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                    ).optional(),
                    voiceSampleAudio: z.string().describe(
                      "Optional. The sample of the custom voice.",
                    ).optional(),
                  }).describe(
                    "The configuration for the replicated voice to use.",
                  ).optional(),
                }).describe("Configuration for a voice.").optional(),
              }).describe("Configuration for speech generation.").optional(),
              stopSequences: z.array(z.string()).describe(
                'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
              ).optional(),
              temperature: z.number().describe(
                "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
              ).optional(),
              thinkingConfig: z.object({
                includeThoughts: z.boolean().describe(
                  'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
                ).optional(),
                thinkingBudget: z.number().int().describe(
                  "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
                ).optional(),
                thinkingLevel: z.enum([
                  "THINKING_LEVEL_UNSPECIFIED",
                  "LOW",
                  "MEDIUM",
                  "HIGH",
                  "MINIMAL",
                ]).describe(
                  "Optional. The number of thoughts tokens that the model should generate.",
                ).optional(),
              }).describe(
                'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
              ).optional(),
              topK: z.number().describe(
                "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
              ).optional(),
              topP: z.number().describe(
                "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
              ).optional(),
            }).describe(
              "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
            ).optional(),
            samplingCount: z.number().int().describe(
              "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
            ).optional(),
          }).describe(
            "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
          ).optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Template for the prompt sent to the judge model.",
          ).optional(),
          predefinedRubricGenerationSpec: z.object({
            metricSpecName: z.string().describe(
              'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
            ).optional(),
            metricSpecParameters: z.record(z.string(), z.string()).describe(
              "Optional. The parameters needed to run the pre-defined metric.",
            ).optional(),
          }).describe("The spec for a pre-defined metric.").optional(),
          rubricGenerationSpec: z.object({
            modelConfig: z.object({
              autoraterModel: z.string().describe(
                "Optional. The fully qualified name of the publisher model or tuned autorater endpoint to use. Publisher model format: `projects/{project}/locations/{location}/publishers/*/models/*` Tuned model endpoint format: `projects/{project}/locations/{location}/endpoints/{endpoint}`",
              ).optional(),
              flipEnabled: z.boolean().describe(
                "Optional. Default is true. Whether to flip the candidate and baseline responses. This is only applicable to the pairwise metric. If enabled, also provide PairwiseMetricSpec.candidate_response_field_name and PairwiseMetricSpec.baseline_response_field_name. When rendering PairwiseMetricSpec.metric_prompt_template, the candidate and baseline fields will be flipped for half of the samples to reduce bias.",
              ).optional(),
              generationConfig: z.object({
                audioTimestamp: z.boolean().describe(
                  "Optional. If enabled, audio timestamps will be included in the request to the model. This can be useful for synchronizing audio with other modalities in the response.",
                ).optional(),
                candidateCount: z.number().int().describe(
                  "Optional. The number of candidate responses to generate. A higher `candidate_count` can provide more options to choose from, but it also consumes more resources. This can be useful for generating a variety of responses and selecting the best one.",
                ).optional(),
                enableAffectiveDialog: z.boolean().describe(
                  "Optional. If enabled, the model will detect emotions and adapt its responses accordingly. For example, if the model detects that the user is frustrated, it may provide a more empathetic response.",
                ).optional(),
                frequencyPenalty: z.number().describe(
                  "Optional. Penalizes tokens based on their frequency in the generated text. A positive value helps to reduce the repetition of words and phrases. Valid values can range from [-2.0, 2.0].",
                ).optional(),
                imageConfig: z.object({
                  aspectRatio: z.string().describe(
                    'Optional. The desired aspect ratio for the generated images. The following aspect ratios are supported: "1:1" "2:3", "3:2" "3:4", "4:3" "4:5", "5:4" "9:16", "16:9" "21:9"',
                  ).optional(),
                  imageOutputOptions: z.object({
                    compressionQuality: z.number().int().describe(
                      "Optional. The compression quality of the output image.",
                    ).optional(),
                    mimeType: z.string().describe(
                      "Optional. The image format that the output should be saved as.",
                    ).optional(),
                  }).describe("The image output format for generated images.")
                    .optional(),
                  imageSize: z.string().describe(
                    "Optional. Specifies the size of generated images. Supported values are `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.",
                  ).optional(),
                  personGeneration: z.enum([
                    "PERSON_GENERATION_UNSPECIFIED",
                    "ALLOW_ALL",
                    "ALLOW_ADULT",
                    "ALLOW_NONE",
                  ]).describe(
                    "Optional. Controls whether the model can generate people.",
                  ).optional(),
                  prominentPeople: z.enum([
                    "PROMINENT_PEOPLE_UNSPECIFIED",
                    "ALLOW_PROMINENT_PEOPLE",
                    "BLOCK_PROMINENT_PEOPLE",
                  ]).describe(
                    "Optional. Controls whether prominent people (celebrities) generation is allowed. If used with personGeneration, personGeneration enum would take precedence. For instance, if ALLOW_NONE is set, all person generation would be blocked. If this field is unspecified, the default behavior is to allow prominent people.",
                  ).optional(),
                }).describe(
                  "Configuration for image generation. This message allows you to control various aspects of image generation, such as the output format, aspect ratio, and whether the model can generate images of people.",
                ).optional(),
                logprobs: z.number().int().describe(
                  "Optional. The number of top log probabilities to return for each token. This can be used to see which other tokens were considered likely candidates for a given position. A higher value will return more options, but it will also increase the size of the response.",
                ).optional(),
                maxOutputTokens: z.number().int().describe(
                  "Optional. The maximum number of tokens to generate in the response. A token is approximately four characters. The default value varies by model. This parameter can be used to control the length of the generated text and prevent overly long responses.",
                ).optional(),
                mediaResolution: z.enum([
                  "MEDIA_RESOLUTION_UNSPECIFIED",
                  "MEDIA_RESOLUTION_LOW",
                  "MEDIA_RESOLUTION_MEDIUM",
                  "MEDIA_RESOLUTION_HIGH",
                ]).describe(
                  "Optional. The token resolution at which input media content is sampled. This is used to control the trade-off between the quality of the response and the number of tokens used to represent the media. A higher resolution allows the model to perceive more detail, which can lead to a more nuanced response, but it will also use more tokens. This does not affect the image dimensions sent to the model.",
                ).optional(),
                presencePenalty: z.number().describe(
                  "Optional. Penalizes tokens that have already appeared in the generated text. A positive value encourages the model to generate more diverse and less repetitive text. Valid values can range from [-2.0, 2.0].",
                ).optional(),
                responseJsonSchema: z.string().describe(
                  "Optional. When this field is set, response_schema must be omitted and response_mime_type must be set to `application/json`.",
                ).optional(),
                responseLogprobs: z.boolean().describe(
                  "Optional. If set to true, the log probabilities of the output tokens are returned. Log probabilities are the logarithm of the probability of a token appearing in the output. A higher log probability means the token is more likely to be generated. This can be useful for analyzing the model's confidence in its own output and for debugging.",
                ).optional(),
                responseMimeType: z.string().describe(
                  "Optional. The IANA standard MIME type of the response. The model will generate output that conforms to this MIME type. Supported values include 'text/plain' (default) and 'application/json'. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined.",
                ).optional(),
                responseModalities: z.array(
                  z.enum(["MODALITY_UNSPECIFIED", "TEXT", "IMAGE", "AUDIO"]),
                ).describe(
                  "Optional. The modalities of the response. The model will generate a response that includes all the specified modalities. For example, if this is set to `[TEXT, IMAGE]`, the response will include both text and an image.",
                ).optional(),
                responseSchema: z.object({
                  additionalProperties: z.string().describe(
                    "Optional. If `type` is `OBJECT`, specifies how to handle properties not defined in `properties`. If it is a boolean `false`, no additional properties are allowed. If it is a schema, additional properties are allowed if they conform to the schema.",
                  ).optional(),
                  anyOf: z.array(z.string()).describe(
                    "Optional. The instance must be valid against any (one or more) of the subschemas listed in `any_of`.",
                  ).optional(),
                  default: z.string().describe(
                    "Optional. Default value to use if the field is not specified.",
                  ).optional(),
                  defs: z.record(z.string(), z.string()).describe(
                    "Optional. `defs` provides a map of schema definitions that can be reused by `ref` elsewhere in the schema. Only allowed at root level of the schema.",
                  ).optional(),
                  description: z.string().describe(
                    "Optional. Describes the data. The model uses this field to understand the purpose of the schema and how to use it. It is a best practice to provide a clear and descriptive explanation for the schema and its properties here, rather than in the prompt.",
                  ).optional(),
                  enum: z.array(z.string()).describe(
                    'Optional. Possible values of the field. This field can be used to restrict a value to a fixed set of values. To mark a field as an enum, set `format` to `enum` and provide the list of possible values in `enum`. For example: 1. To define directions: `{type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]}` 2. To define apartment numbers: `{type:INTEGER, format:enum, enum:["101", "201", "301"]}`',
                  ).optional(),
                  example: z.string().describe(
                    "Optional. Example of an instance of this schema.",
                  ).optional(),
                  format: z.string().describe(
                    "Optional. The format of the data. For `NUMBER` type, format can be `float` or `double`. For `INTEGER` type, format can be `int32` or `int64`. For `STRING` type, format can be `email`, `byte`, `date`, `date-time`, `password`, and other formats to further refine the data type.",
                  ).optional(),
                  items: z.string().describe(
                    "Circular reference to GoogleCloudAiplatformV1Schema",
                  ).optional(),
                  maxItems: z.string().describe(
                    "Optional. If type is `ARRAY`, `max_items` specifies the maximum number of items in an array.",
                  ).optional(),
                  maxLength: z.string().describe(
                    "Optional. If type is `STRING`, `max_length` specifies the maximum length of the string.",
                  ).optional(),
                  maxProperties: z.string().describe(
                    "Optional. If type is `OBJECT`, `max_properties` specifies the maximum number of properties that can be provided.",
                  ).optional(),
                  maximum: z.number().describe(
                    "Optional. If type is `INTEGER` or `NUMBER`, `maximum` specifies the maximum allowed value.",
                  ).optional(),
                  minItems: z.string().describe(
                    "Optional. If type is `ARRAY`, `min_items` specifies the minimum number of items in an array.",
                  ).optional(),
                  minLength: z.string().describe(
                    "Optional. If type is `STRING`, `min_length` specifies the minimum length of the string.",
                  ).optional(),
                  minProperties: z.string().describe(
                    "Optional. If type is `OBJECT`, `min_properties` specifies the minimum number of properties that can be provided.",
                  ).optional(),
                  minimum: z.number().describe(
                    "Optional. If type is `INTEGER` or `NUMBER`, `minimum` specifies the minimum allowed value.",
                  ).optional(),
                  nullable: z.boolean().describe(
                    "Optional. Indicates if the value of this field can be null.",
                  ).optional(),
                  pattern: z.string().describe(
                    "Optional. If type is `STRING`, `pattern` specifies a regular expression that the string must match.",
                  ).optional(),
                  properties: z.record(z.string(), z.string()).describe(
                    "Optional. If type is `OBJECT`, `properties` is a map of property names to schema definitions for each property of the object.",
                  ).optional(),
                  propertyOrdering: z.array(z.string()).describe(
                    "Optional. Order of properties displayed or used where order matters. This is not a standard field in OpenAPI specification, but can be used to control the order of properties.",
                  ).optional(),
                  ref: z.string().describe(
                    'Optional. Allows referencing another schema definition to use in place of this schema. The value must be a valid reference to a schema in `defs`. For example, the following schema defines a reference to a schema node named "Pet": type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring',
                  ).optional(),
                  required: z.array(z.string()).describe(
                    "Optional. If type is `OBJECT`, `required` lists the names of properties that must be present.",
                  ).optional(),
                  title: z.string().describe("Optional. Title for the schema.")
                    .optional(),
                  type: z.enum([
                    "TYPE_UNSPECIFIED",
                    "STRING",
                    "NUMBER",
                    "INTEGER",
                    "BOOLEAN",
                    "ARRAY",
                    "OBJECT",
                    "NULL",
                  ]).describe("Optional. Data type of the schema field.")
                    .optional(),
                }).describe(
                  "Defines the schema of input and output data. This is a subset of the [OpenAPI 3.0 Schema Object](https://spec.openapis.org/oas/v3.0.3#schema-object).",
                ).optional(),
                routingConfig: z.object({
                  autoMode: z.object({
                    modelRoutingPreference: z.enum([
                      "UNKNOWN",
                      "PRIORITIZE_QUALITY",
                      "BALANCED",
                      "PRIORITIZE_COST",
                    ]).describe("The model routing preference.").optional(),
                  }).describe(
                    "The configuration for automated routing. When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.",
                  ).optional(),
                  manualMode: z.object({
                    modelName: z.string().describe(
                      "The name of the model to use. Only public LLM models are accepted.",
                    ).optional(),
                  }).describe(
                    "The configuration for manual routing. When manual routing is specified, the model will be selected based on the model name provided.",
                  ).optional(),
                }).describe(
                  "The configuration for routing the request to a specific model. This can be used to control which model is used for the generation, either automatically or by specifying a model name.",
                ).optional(),
                seed: z.number().int().describe(
                  "Optional. A seed for the random number generator. By setting a seed, you can make the model's output mostly deterministic. For a given prompt and parameters (like temperature, top_p, etc.), the model will produce the same response every time. However, it's not a guaranteed absolute deterministic behavior. This is different from parameters like `temperature`, which control the *level* of randomness. `seed` ensures that the \"random\" choices the model makes are the same on every run, making it essential for testing and ensuring reproducible results.",
                ).optional(),
                speechConfig: z.object({
                  languageCode: z.string().describe(
                    "Optional. The language code (ISO 639-1) for the speech synthesis.",
                  ).optional(),
                  multiSpeakerVoiceConfig: z.object({
                    speakerVoiceConfigs: z.array(z.object({
                      speaker: z.string().describe(
                        "Required. The name of the speaker. This should be the same as the speaker name used in the prompt.",
                      ).optional(),
                      voiceConfig: z.object({
                        prebuiltVoiceConfig: z.object({
                          voiceName: z.string().describe(
                            "The name of the prebuilt voice to use.",
                          ).optional(),
                        }).describe("Configuration for a prebuilt voice.")
                          .optional(),
                        replicatedVoiceConfig: z.object({
                          mimeType: z.string().describe(
                            "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                          ).optional(),
                          voiceSampleAudio: z.string().describe(
                            "Optional. The sample of the custom voice.",
                          ).optional(),
                        }).describe(
                          "The configuration for the replicated voice to use.",
                        ).optional(),
                      }).describe("Configuration for a voice.").optional(),
                    })).describe(
                      "Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided.",
                    ).optional(),
                  }).describe(
                    "Configuration for a multi-speaker text-to-speech request.",
                  ).optional(),
                  voiceConfig: z.object({
                    prebuiltVoiceConfig: z.object({
                      voiceName: z.string().describe(
                        "The name of the prebuilt voice to use.",
                      ).optional(),
                    }).describe("Configuration for a prebuilt voice.")
                      .optional(),
                    replicatedVoiceConfig: z.object({
                      mimeType: z.string().describe(
                        "Optional. The mimetype of the voice sample. The only currently supported value is `audio/wav`. This represents 16-bit signed little-endian wav data, with a 24kHz sampling rate. `mime_type` will default to `audio/wav` if not set.",
                      ).optional(),
                      voiceSampleAudio: z.string().describe(
                        "Optional. The sample of the custom voice.",
                      ).optional(),
                    }).describe(
                      "The configuration for the replicated voice to use.",
                    ).optional(),
                  }).describe("Configuration for a voice.").optional(),
                }).describe("Configuration for speech generation.").optional(),
                stopSequences: z.array(z.string()).describe(
                  'Optional. A list of character sequences that will stop the model from generating further tokens. If a stop sequence is generated, the output will end at that point. This is useful for controlling the length and structure of the output. For example, you can use ["\\n", "###"] to stop generation at a new line or a specific marker.',
                ).optional(),
                temperature: z.number().describe(
                  "Optional. Controls the randomness of the output. A higher temperature results in more creative and diverse responses, while a lower temperature makes the output more predictable and focused. The valid range is (0.0, 2.0].",
                ).optional(),
                thinkingConfig: z.object({
                  includeThoughts: z.boolean().describe(
                    'Optional. If true, the model will include its thoughts in the response. "Thoughts" are the intermediate steps the model takes to arrive at the final response. They can provide insights into the model\'s reasoning process and help with debugging. If this is true, thoughts are returned only when available.',
                  ).optional(),
                  thinkingBudget: z.number().int().describe(
                    "Optional. The token budget for the model's thinking process. The model will make a best effort to stay within this budget. This can be used to control the trade-off between response quality and latency.",
                  ).optional(),
                  thinkingLevel: z.enum([
                    "THINKING_LEVEL_UNSPECIFIED",
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                    "MINIMAL",
                  ]).describe(
                    "Optional. The number of thoughts tokens that the model should generate.",
                  ).optional(),
                }).describe(
                  'Configuration for the model\'s thinking features. "Thinking" is a process where the model breaks down a complex task into smaller, manageable steps. This allows the model to reason about the task, plan its approach, and execute the plan to generate a high-quality response.',
                ).optional(),
                topK: z.number().describe(
                  "Optional. Specifies the top-k sampling threshold. The model considers only the top k most probable tokens for the next token. This can be useful for generating more coherent and less random text. For example, a `top_k` of 40 means the model will choose the next word from the 40 most likely words.",
                ).optional(),
                topP: z.number().describe(
                  "Optional. Specifies the nucleus sampling threshold. The model considers only the smallest set of tokens whose cumulative probability is at least `top_p`. This helps generate more diverse and less repetitive responses. For example, a `top_p` of 0.9 means the model considers tokens until the cumulative probability of the tokens to select from reaches 0.9. It's recommended to adjust either temperature or `top_p`, but not both.",
                ).optional(),
              }).describe(
                "Configuration for content generation. This message contains all the parameters that control how the model generates content. It allows you to influence the randomness, length, and structure of the output.",
              ).optional(),
              samplingCount: z.number().int().describe(
                "Optional. Number of samples for each instance in the dataset. If not specified, the default is 4. Minimum value is 1, maximum value is 32.",
              ).optional(),
            }).describe(
              "The configs for autorater. This is applicable to both EvaluateInstances and EvaluateDataset.",
            ).optional(),
            promptTemplate: z.string().describe(
              "Template for the prompt used to generate rubrics. The details should be updated based on the most-recent recipe requirements.",
            ).optional(),
            rubricContentType: z.enum([
              "RUBRIC_CONTENT_TYPE_UNSPECIFIED",
              "PROPERTY",
              "NL_QUESTION_ANSWER",
              "PYTHON_CODE_ASSERTION",
            ]).describe("The type of rubric content to be generated.")
              .optional(),
            rubricTypeOntology: z.array(z.string()).describe(
              "Optional. An optional, pre-defined list of allowed types for generated rubrics. If this field is provided, it implies `include_rubric_type` should be true, and the generated rubric types should be chosen from this ontology.",
            ).optional(),
          }).describe("Specification for how rubrics should be generated.")
            .optional(),
          rubricGroupKey: z.string().describe(
            "Use a pre-defined group of rubrics associated with the input. Refers to a key in the rubric_groups map of EvaluationInstance.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for the judge model.",
          ).optional(),
        }).describe("Specification for an LLM based metric.").optional(),
        metadata: z.object({
          otherMetadata: z.record(z.string(), z.string()).describe(
            "Optional. Flexible metadata for user-defined attributes.",
          ).optional(),
          scoreRange: z.object({
            description: z.string().describe(
              "Optional. The description of the score explaining the directionality etc.",
            ).optional(),
            max: z.number().describe(
              "Required. The maximum value of the score range (inclusive).",
            ).optional(),
            min: z.number().describe(
              "Required. The minimum value of the score range (inclusive).",
            ).optional(),
            step: z.number().describe(
              "Optional. The distance between discrete steps in the range. If unset, the range is assumed to be continuous.",
            ).optional(),
          }).describe(
            "The range of possible scores for this metric, used for plotting.",
          ).optional(),
          title: z.string().describe(
            "Optional. The user-friendly name for the metric. If not set for a registered metric, it will default to the metric's display name.",
          ).optional(),
        }).describe(
          "Metadata about the metric, used for visualization and organization.",
        ).optional(),
        pairwiseMetricSpec: z.object({
          baselineResponseFieldName: z.string().describe(
            "Optional. The field name of the baseline response.",
          ).optional(),
          candidateResponseFieldName: z.string().describe(
            "Optional. The field name of the candidate response.",
          ).optional(),
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean().describe(
              "Optional. Whether to return raw output.",
            ).optional(),
          }).describe("Spec for custom output format configuration.")
            .optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Metric prompt template for pairwise metric.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for pairwise metric.",
          ).optional(),
        }).describe("Spec for pairwise metric.").optional(),
        pointwiseMetricSpec: z.object({
          customOutputFormatConfig: z.object({
            returnRawOutput: z.boolean().describe(
              "Optional. Whether to return raw output.",
            ).optional(),
          }).describe("Spec for custom output format configuration.")
            .optional(),
          metricPromptTemplate: z.string().describe(
            "Required. Metric prompt template for pointwise metric.",
          ).optional(),
          systemInstruction: z.string().describe(
            "Optional. System instructions for pointwise metric.",
          ).optional(),
        }).describe("Spec for pointwise metric.").optional(),
        predefinedMetricSpec: z.object({
          metricSpecName: z.string().describe(
            'Required. The name of a pre-defined metric, such as "instruction_following_v1" or "text_quality_v1".',
          ).optional(),
          metricSpecParameters: z.record(z.string(), z.string()).describe(
            "Optional. The parameters needed to run the pre-defined metric.",
          ).optional(),
        }).describe("The spec for a pre-defined metric.").optional(),
        rougeSpec: z.object({
          rougeType: z.string().describe(
            "Optional. Supported rouge types are rougen[1-9], rougeL, and rougeLsum.",
          ).optional(),
          splitSummaries: z.boolean().describe(
            "Optional. Whether to split summaries while using rougeLsum.",
          ).optional(),
          useStemmer: z.boolean().describe(
            "Optional. Whether to use stemmer to compute rouge score.",
          ).optional(),
        }).describe(
          "Spec for rouge score metric - calculates the recall of n-grams in prediction as compared to reference - returns a score ranging between 0 and 1.",
        ).optional(),
      })).describe("Required. The metrics used for evaluation.").optional(),
      outputConfig: z.object({
        gcsDestination: z.object({
          outputUriPrefix: z.string().describe(
            "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
          ).optional(),
        }).describe(
          "The Google Cloud Storage location where the output is to be written to.",
        ).optional(),
      }).describe("Config for evaluation output.").optional(),
    }).describe("Evaluation Config for Tuning Job.").optional(),
    exportLastCheckpointOnly: z.boolean().describe(
      "Optional. If set to true, disable intermediate checkpoints for SFT and only the last checkpoint will be exported. Otherwise, enable intermediate checkpoints for SFT. Default is false.",
    ).optional(),
    hyperParameters: z.object({
      adapterSize: z.enum([
        "ADAPTER_SIZE_UNSPECIFIED",
        "ADAPTER_SIZE_ONE",
        "ADAPTER_SIZE_TWO",
        "ADAPTER_SIZE_FOUR",
        "ADAPTER_SIZE_EIGHT",
        "ADAPTER_SIZE_SIXTEEN",
        "ADAPTER_SIZE_THIRTY_TWO",
      ]).describe("Optional. Adapter size for tuning.").optional(),
      epochCount: z.string().describe(
        "Optional. Number of complete passes the model makes over the entire training dataset during training.",
      ).optional(),
      learningRateMultiplier: z.number().describe(
        "Optional. Multiplier for adjusting the default learning rate. Mutually exclusive with `learning_rate`. This feature is only available for 1P models.",
      ).optional(),
    }).describe("Hyperparameters for SFT.").optional(),
    trainingDatasetUri: z.string().describe(
      "Required. Training dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
    validationDatasetUri: z.string().describe(
      "Optional. Validation dataset used for tuning. The dataset can be specified as either a Cloud Storage path to a JSONL file or as the resource name of a Vertex Multimodal Dataset.",
    ).optional(),
  }).describe("Tuning Spec for Supervised Tuning for first party models.")
    .optional(),
  tunedModel: z.object({
    checkpoints: z.array(z.object({
      checkpointId: z.string().describe("The ID of the checkpoint.").optional(),
      endpoint: z.string().describe(
        "The Endpoint resource name that the checkpoint is deployed to. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
      ).optional(),
      epoch: z.string().describe("The epoch of the checkpoint.").optional(),
      step: z.string().describe("The step of the checkpoint.").optional(),
    })).describe(
      "Output only. The checkpoints associated with this TunedModel. This field is only populated for tuning jobs that enable intermediate checkpoints.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. A resource name of an Endpoint. Format: `projects/{project}/locations/{location}/endpoints/{endpoint}`.",
    ).optional(),
    model: z.string().describe(
      "Output only. The resource name of the TunedModel. Format: `projects/{project}/locations/{location}/models/{model}@{version_id}` When tuning from a base model, the version ID will be 1. For continuous tuning, if the provided tuned_model_display_name is set and different from parent model's display name, the tuned model will have a new parent model with version 1. Otherwise the version id will be incremented by 1 from the last version ID in the parent model. E.g., `projects/{project}/locations/{location}/models/{model}@{last_version_id + 1}`",
    ).optional(),
  }).describe(
    "The Model Registry Model and Online Prediction Endpoint associated with this TuningJob.",
  ).optional(),
  tunedModelDisplayName: z.string().describe(
    "Optional. The display name of the TunedModel. The name can be up to 128 characters long and can consist of any UTF-8 characters. For continuous tuning, tuned_model_display_name will by default use the same display name as the pre-tuned model. If a new display name is provided, the tuning job will create a new model instead of a new version.",
  ).optional(),
  tuningDataStats: z.object({
    preferenceOptimizationDataStats: z.object({
      droppedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `dropped_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      scoreVariancePerExampleDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      scoresDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        completions: z.array(z.object({
          completion: z.object({
            parts: z.array(z.object({
              codeExecutionResult: z.object({
                outcome: z.enum([
                  "OUTCOME_UNSPECIFIED",
                  "OUTCOME_OK",
                  "OUTCOME_FAILED",
                  "OUTCOME_DEADLINE_EXCEEDED",
                ]).describe("Required. Outcome of the code execution.")
                  .optional(),
                output: z.string().describe(
                  "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
                ).optional(),
              }).describe(
                "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
              ).optional(),
              executableCode: z.object({
                code: z.string().describe("Required. The code to be executed.")
                  .optional(),
                language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
                  "Required. Programming language of the `code`.",
                ).optional(),
              }).describe(
                "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
              ).optional(),
              fileData: z.object({
                displayName: z.string().describe(
                  "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
                ).optional(),
                fileUri: z.string().describe(
                  "Required. The URI of the file in Google Cloud Storage.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
              ).optional(),
              functionCall: z.object({
                args: z.record(z.string(), z.string()).describe(
                  "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
                ).optional(),
                name: z.string().describe(
                  "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
                ).optional(),
                partialArgs: z.array(z.object({
                  boolValue: z.boolean().describe(
                    "Optional. Represents a boolean value.",
                  ).optional(),
                  jsonPath: z.string().describe(
                    'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
                  ).optional(),
                  nullValue: z.enum(["NULL_VALUE"]).describe(
                    "Optional. Represents a null value.",
                  ).optional(),
                  numberValue: z.number().describe(
                    "Optional. Represents a double value.",
                  ).optional(),
                  stringValue: z.string().describe(
                    "Optional. Represents a string value.",
                  ).optional(),
                  willContinue: z.boolean().describe(
                    "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
                  ).optional(),
                })).describe(
                  "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
                ).optional(),
                willContinue: z.boolean().describe(
                  "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
                ).optional(),
              }).describe(
                "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
              ).optional(),
              functionResponse: z.object({
                name: z.string().describe(
                  "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
                ).optional(),
                parts: z.array(z.object({
                  fileData: z.object({
                    displayName: z.string().describe(
                      "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                    ).optional(),
                    fileUri: z.string().describe("Required. URI.").optional(),
                    mimeType: z.string().describe(
                      "Required. The IANA standard MIME type of the source data.",
                    ).optional(),
                  }).describe("URI based data for function response.")
                    .optional(),
                  inlineData: z.object({
                    data: z.string().describe("Required. Raw bytes.")
                      .optional(),
                    displayName: z.string().describe(
                      "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                    ).optional(),
                    mimeType: z.string().describe(
                      "Required. The IANA standard MIME type of the source data.",
                    ).optional(),
                  }).describe(
                    "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
                  ).optional(),
                })).describe(
                  "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
                ).optional(),
                response: z.record(z.string(), z.string()).describe(
                  'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
                ).optional(),
                scheduling: z.enum([
                  "SCHEDULING_UNSPECIFIED",
                  "SILENT",
                  "WHEN_IDLE",
                  "INTERRUPT",
                ]).describe(
                  "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
                ).optional(),
              }).describe(
                "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
              ).optional(),
              inlineData: z.object({
                data: z.string().describe(
                  "Required. The raw bytes of the data.",
                ).optional(),
                displayName: z.string().describe(
                  "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
              ).optional(),
              mediaResolution: z.object({
                level: z.enum([
                  "MEDIA_RESOLUTION_UNSPECIFIED",
                  "MEDIA_RESOLUTION_LOW",
                  "MEDIA_RESOLUTION_MEDIUM",
                  "MEDIA_RESOLUTION_HIGH",
                  "MEDIA_RESOLUTION_ULTRA_HIGH",
                ]).describe("The tokenization quality used for given media.")
                  .optional(),
              }).describe(
                "per part media resolution. Media resolution for the input media.",
              ).optional(),
              text: z.string().describe(
                "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
              ).optional(),
              thought: z.boolean().describe(
                "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
              ).optional(),
              thoughtSignature: z.string().describe(
                "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
              ).optional(),
              videoMetadata: z.object({
                endOffset: z.string().describe(
                  "Optional. The end offset of the video.",
                ).optional(),
                fps: z.number().describe(
                  "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
                ).optional(),
                startOffset: z.string().describe(
                  "Optional. The start offset of the video.",
                ).optional(),
              }).describe(
                "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
              ).optional(),
            })).describe(
              "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
            ).optional(),
            role: z.string().describe(
              "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
            ).optional(),
          }).describe(
            "The structured data content of a message. A Content message contains a `role` field, which indicates the producer of the content, and a `parts` field, which contains the multi-part data of the message.",
          ).optional(),
          score: z.number().describe("The score for the given completion.")
            .optional(),
        })).describe("List of completions for a given prompt.").optional(),
        contents: z.array(z.object({
          parts: z.array(z.object({
            codeExecutionResult: z.object({
              outcome: z.enum([
                "OUTCOME_UNSPECIFIED",
                "OUTCOME_OK",
                "OUTCOME_FAILED",
                "OUTCOME_DEADLINE_EXCEEDED",
              ]).describe("Required. Outcome of the code execution.")
                .optional(),
              output: z.string().describe(
                "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
              ).optional(),
            }).describe(
              "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
            ).optional(),
            executableCode: z.object({
              code: z.string().describe("Required. The code to be executed.")
                .optional(),
              language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
                "Required. Programming language of the `code`.",
              ).optional(),
            }).describe(
              "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
            ).optional(),
            fileData: z.object({
              displayName: z.string().describe(
                "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
              ).optional(),
              fileUri: z.string().describe(
                "Required. The URI of the file in Google Cloud Storage.",
              ).optional(),
              mimeType: z.string().describe(
                "Required. The IANA standard MIME type of the source data.",
              ).optional(),
            }).describe(
              "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
            ).optional(),
            functionCall: z.object({
              args: z.record(z.string(), z.string()).describe(
                "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
              ).optional(),
              name: z.string().describe(
                "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
              ).optional(),
              partialArgs: z.array(z.object({
                boolValue: z.boolean().describe(
                  "Optional. Represents a boolean value.",
                ).optional(),
                jsonPath: z.string().describe(
                  'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
                ).optional(),
                nullValue: z.enum(["NULL_VALUE"]).describe(
                  "Optional. Represents a null value.",
                ).optional(),
                numberValue: z.number().describe(
                  "Optional. Represents a double value.",
                ).optional(),
                stringValue: z.string().describe(
                  "Optional. Represents a string value.",
                ).optional(),
                willContinue: z.boolean().describe(
                  "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
                ).optional(),
              })).describe(
                "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
              ).optional(),
              willContinue: z.boolean().describe(
                "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
              ).optional(),
            }).describe(
              "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
            ).optional(),
            functionResponse: z.object({
              name: z.string().describe(
                "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
              ).optional(),
              parts: z.array(z.object({
                fileData: z.object({
                  displayName: z.string().describe(
                    "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                  ).optional(),
                  fileUri: z.string().describe("Required. URI.").optional(),
                  mimeType: z.string().describe(
                    "Required. The IANA standard MIME type of the source data.",
                  ).optional(),
                }).describe("URI based data for function response.").optional(),
                inlineData: z.object({
                  data: z.string().describe("Required. Raw bytes.").optional(),
                  displayName: z.string().describe(
                    "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                  ).optional(),
                  mimeType: z.string().describe(
                    "Required. The IANA standard MIME type of the source data.",
                  ).optional(),
                }).describe(
                  "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
                ).optional(),
              })).describe(
                "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
              ).optional(),
              response: z.record(z.string(), z.string()).describe(
                'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
              ).optional(),
              scheduling: z.enum([
                "SCHEDULING_UNSPECIFIED",
                "SILENT",
                "WHEN_IDLE",
                "INTERRUPT",
              ]).describe(
                "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
              ).optional(),
            }).describe(
              "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
            ).optional(),
            inlineData: z.object({
              data: z.string().describe("Required. The raw bytes of the data.")
                .optional(),
              displayName: z.string().describe(
                "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
              ).optional(),
              mimeType: z.string().describe(
                "Required. The IANA standard MIME type of the source data.",
              ).optional(),
            }).describe(
              "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
            ).optional(),
            mediaResolution: z.object({
              level: z.enum([
                "MEDIA_RESOLUTION_UNSPECIFIED",
                "MEDIA_RESOLUTION_LOW",
                "MEDIA_RESOLUTION_MEDIUM",
                "MEDIA_RESOLUTION_HIGH",
                "MEDIA_RESOLUTION_ULTRA_HIGH",
              ]).describe("The tokenization quality used for given media.")
                .optional(),
            }).describe(
              "per part media resolution. Media resolution for the input media.",
            ).optional(),
            text: z.string().describe(
              "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
            ).optional(),
            thought: z.boolean().describe(
              "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
            ).optional(),
            thoughtSignature: z.string().describe(
              "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
            ).optional(),
            videoMetadata: z.object({
              endOffset: z.string().describe(
                "Optional. The end offset of the video.",
              ).optional(),
              fps: z.number().describe(
                "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
              ).optional(),
              startOffset: z.string().describe(
                "Optional. The start offset of the video.",
              ).optional(),
            }).describe(
              "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
            ).optional(),
          })).describe(
            "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
          ).optional(),
          role: z.string().describe(
            "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
          ).optional(),
        })).describe("Multi-turn contents that represents the Prompt.")
          .optional(),
      })).describe("Output only. Sample user examples in the training dataset.")
        .optional(),
      userInputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
      userOutputTokenDistribution: z.object({
        buckets: z.array(z.object({
          count: z.string().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.number().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Distribution computed over a tuning dataset.").optional(),
    }).describe(
      "Statistics computed for datasets used for preference optimization.",
    ).optional(),
    supervisedTuningDataStats: z.object({
      droppedExampleReasons: z.array(z.string()).describe(
        "Output only. For each index in `truncated_example_indices`, the user-facing reason why the example was dropped.",
      ).optional(),
      totalBillableCharacterCount: z.string().describe(
        "Output only. Number of billable characters in the tuning dataset.",
      ).optional(),
      totalBillableTokenCount: z.string().describe(
        "Output only. Number of billable tokens in the tuning dataset.",
      ).optional(),
      totalTruncatedExampleCount: z.string().describe(
        "Output only. The number of examples in the dataset that have been dropped. An example can be dropped for reasons including: too many tokens, contains an invalid image, contains too many images, etc.",
      ).optional(),
      totalTuningCharacterCount: z.string().describe(
        "Output only. Number of tuning characters in the tuning dataset.",
      ).optional(),
      truncatedExampleIndices: z.array(z.string()).describe(
        "Output only. A partial sample of the indices (starting from 1) of the dropped examples.",
      ).optional(),
      tuningDatasetExampleCount: z.string().describe(
        "Output only. Number of examples in the tuning dataset.",
      ).optional(),
      tuningStepCount: z.string().describe(
        "Output only. Number of tuning steps for this Tuning Job.",
      ).optional(),
      userDatasetExamples: z.array(z.object({
        parts: z.array(z.object({
          codeExecutionResult: z.object({
            outcome: z.enum([
              "OUTCOME_UNSPECIFIED",
              "OUTCOME_OK",
              "OUTCOME_FAILED",
              "OUTCOME_DEADLINE_EXCEEDED",
            ]).describe("Required. Outcome of the code execution.").optional(),
            output: z.string().describe(
              "Optional. Contains stdout when code execution is successful, stderr or other description otherwise.",
            ).optional(),
          }).describe(
            "Result of executing the ExecutableCode. Generated only when the `CodeExecution` tool is used.",
          ).optional(),
          executableCode: z.object({
            code: z.string().describe("Required. The code to be executed.")
              .optional(),
            language: z.enum(["LANGUAGE_UNSPECIFIED", "PYTHON"]).describe(
              "Required. Programming language of the `code`.",
            ).optional(),
          }).describe(
            "Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the `CodeExecution` tool, in which the code will be automatically executed, and a corresponding CodeExecutionResult will also be generated.",
          ).optional(),
          fileData: z.object({
            displayName: z.string().describe(
              "Optional. The display name of the file. Used to provide a label or filename to distinguish files. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
            ).optional(),
            fileUri: z.string().describe(
              "Required. The URI of the file in Google Cloud Storage.",
            ).optional(),
            mimeType: z.string().describe(
              "Required. The IANA standard MIME type of the source data.",
            ).optional(),
          }).describe(
            "URI-based data. A FileData message contains a URI pointing to data of a specific media type. It is used to represent images, audio, and video stored in Google Cloud Storage.",
          ).optional(),
          functionCall: z.object({
            args: z.record(z.string(), z.string()).describe(
              "Optional. The function parameters and values in JSON object format. See FunctionDeclaration.parameters for parameter details.",
            ).optional(),
            name: z.string().describe(
              "Optional. The name of the function to call. Matches FunctionDeclaration.name.",
            ).optional(),
            partialArgs: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. Represents a boolean value.",
              ).optional(),
              jsonPath: z.string().describe(
                'Required. A JSON Path (RFC 9535) to the argument being streamed. https://datatracker.ietf.org/doc/html/rfc9535. e.g. "$.foo.bar[0].data".',
              ).optional(),
              nullValue: z.enum(["NULL_VALUE"]).describe(
                "Optional. Represents a null value.",
              ).optional(),
              numberValue: z.number().describe(
                "Optional. Represents a double value.",
              ).optional(),
              stringValue: z.string().describe(
                "Optional. Represents a string value.",
              ).optional(),
              willContinue: z.boolean().describe(
                "Optional. Whether this is not the last part of the same json_path. If true, another PartialArg message for the current json_path is expected to follow.",
              ).optional(),
            })).describe(
              "Optional. The partial argument value of the function call. If provided, represents the arguments/fields that are streamed incrementally.",
            ).optional(),
            willContinue: z.boolean().describe(
              "Optional. Whether this is the last part of the FunctionCall. If true, another partial message for the current FunctionCall is expected to follow.",
            ).optional(),
          }).describe(
            "A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name and a structured JSON object containing the parameters and their values.",
          ).optional(),
          functionResponse: z.object({
            name: z.string().describe(
              "Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.",
            ).optional(),
            parts: z.array(z.object({
              fileData: z.object({
                displayName: z.string().describe(
                  "Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                ).optional(),
                fileUri: z.string().describe("Required. URI.").optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe("URI based data for function response.").optional(),
              inlineData: z.object({
                data: z.string().describe("Required. Raw bytes.").optional(),
                displayName: z.string().describe(
                  "Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled.",
                ).optional(),
                mimeType: z.string().describe(
                  "Required. The IANA standard MIME type of the source data.",
                ).optional(),
              }).describe(
                "Raw media bytes for function response. Text should not be sent as raw bytes, use the 'text' field.",
              ).optional(),
            })).describe(
              "Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.",
            ).optional(),
            response: z.record(z.string(), z.string()).describe(
              'Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.',
            ).optional(),
            scheduling: z.enum([
              "SCHEDULING_UNSPECIFIED",
              "SILENT",
              "WHEN_IDLE",
              "INTERRUPT",
            ]).describe(
              "Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.",
            ).optional(),
          }).describe(
            "The result output from a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function is used as context to the model. This should contain the result of a `FunctionCall` made based on model prediction.",
          ).optional(),
          inlineData: z.object({
            data: z.string().describe("Required. The raw bytes of the data.")
              .optional(),
            displayName: z.string().describe(
              "Optional. The display name of the blob. Used to provide a label or filename to distinguish blobs. This field is only returned in `PromptMessage` for prompt management. It is used in the Gemini calls only when server-side tools (`code_execution`, `google_search`, and `url_context`) are enabled.",
            ).optional(),
            mimeType: z.string().describe(
              "Required. The IANA standard MIME type of the source data.",
            ).optional(),
          }).describe(
            "A content blob. A Blob contains data of a specific media type. It is used to represent images, audio, and video.",
          ).optional(),
          mediaResolution: z.object({
            level: z.enum([
              "MEDIA_RESOLUTION_UNSPECIFIED",
              "MEDIA_RESOLUTION_LOW",
              "MEDIA_RESOLUTION_MEDIUM",
              "MEDIA_RESOLUTION_HIGH",
              "MEDIA_RESOLUTION_ULTRA_HIGH",
            ]).describe("The tokenization quality used for given media.")
              .optional(),
          }).describe(
            "per part media resolution. Media resolution for the input media.",
          ).optional(),
          text: z.string().describe(
            "Optional. The text content of the part. When sent from the VSCode Gemini Code Assist extension, references to @mentioned items will be converted to markdown boldface text. For example `@my-repo` will be converted to and sent as `**my-repo**` by the IDE agent.",
          ).optional(),
          thought: z.boolean().describe(
            "Optional. Indicates whether the `part` represents the model's thought process or reasoning.",
          ).optional(),
          thoughtSignature: z.string().describe(
            "Optional. An opaque signature for the thought so it can be reused in subsequent requests.",
          ).optional(),
          videoMetadata: z.object({
            endOffset: z.string().describe(
              "Optional. The end offset of the video.",
            ).optional(),
            fps: z.number().describe(
              "Optional. The frame rate of the video sent to the model. If not specified, the default value is 1.0. The valid range is (0.0, 24.0].",
            ).optional(),
            startOffset: z.string().describe(
              "Optional. The start offset of the video.",
            ).optional(),
          }).describe(
            "Provides metadata for a video, including the start and end offsets for clipping and the frame rate.",
          ).optional(),
        })).describe(
          "Required. A list of Part objects that make up a single message. Parts of a message can have different MIME types. A Content message must have at least one Part.",
        ).optional(),
        role: z.string().describe(
          "Optional. The producer of the content. Must be either 'user' or 'model'. If not set, the service will default to 'user'.",
        ).optional(),
      })).describe(
        "Output only. Sample user messages in the training dataset uri.",
      ).optional(),
      userInputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userMessagePerExampleDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
      userOutputTokenDistribution: z.object({
        billableSum: z.string().describe(
          "Output only. Sum of a given population of values that are billable.",
        ).optional(),
        buckets: z.array(z.object({
          count: z.number().describe(
            "Output only. Number of values in the bucket.",
          ).optional(),
          left: z.number().describe("Output only. Left bound of the bucket.")
            .optional(),
          right: z.number().describe("Output only. Right bound of the bucket.")
            .optional(),
        })).describe("Output only. Defines the histogram bucket.").optional(),
        max: z.number().describe(
          "Output only. The maximum of the population values.",
        ).optional(),
        mean: z.number().describe(
          "Output only. The arithmetic mean of the values in the population.",
        ).optional(),
        median: z.number().describe(
          "Output only. The median of the values in the population.",
        ).optional(),
        min: z.number().describe(
          "Output only. The minimum of the population values.",
        ).optional(),
        p5: z.number().describe(
          "Output only. The 5th percentile of the values in the population.",
        ).optional(),
        p95: z.number().describe(
          "Output only. The 95th percentile of the values in the population.",
        ).optional(),
        sum: z.string().describe(
          "Output only. Sum of a given population of values.",
        ).optional(),
      }).describe("Dataset distribution for Supervised Tuning.").optional(),
    }).describe("Tuning data statistics for Supervised Tuning.").optional(),
  }).describe("The tuning data statistic values for TuningJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/aiplatform/tuningjobs",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a TuningJob that runs with Google owned models.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tuningJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["baseModel"] !== undefined) body["baseModel"] = g["baseModel"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["preTunedModel"] !== undefined) {
          body["preTunedModel"] = g["preTunedModel"];
        }
        if (g["preferenceOptimizationSpec"] !== undefined) {
          body["preferenceOptimizationSpec"] = g["preferenceOptimizationSpec"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["supervisedTuningSpec"] !== undefined) {
          body["supervisedTuningSpec"] = g["supervisedTuningSpec"];
        }
        if (g["tunedModel"] !== undefined) body["tunedModel"] = g["tunedModel"];
        if (g["tunedModelDisplayName"] !== undefined) {
          body["tunedModelDisplayName"] = g["tunedModelDisplayName"];
        }
        if (g["tuningDataStats"] !== undefined) {
          body["tuningDataStats"] = g["tuningDataStats"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a tuningJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the tuningJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync tuningJobs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.tuningJobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rebase_tuned_model: {
      description: "rebase tuned model",
      arguments: z.object({
        artifactDestination: z.any().optional(),
        deployToSameEndpoint: z.any().optional(),
        tunedModelRef: z.any().optional(),
        tuningJob: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["artifactDestination"] !== undefined) {
          body["artifactDestination"] = args["artifactDestination"];
        }
        if (args["deployToSameEndpoint"] !== undefined) {
          body["deployToSameEndpoint"] = args["deployToSameEndpoint"];
        }
        if (args["tunedModelRef"] !== undefined) {
          body["tunedModelRef"] = args["tunedModelRef"];
        }
        if (args["tuningJob"] !== undefined) {
          body["tuningJob"] = args["tuningJob"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.tuningJobs.rebaseTunedModel",
            "path": "v1/{+parent}/tuningJobs:rebaseTunedModel",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
