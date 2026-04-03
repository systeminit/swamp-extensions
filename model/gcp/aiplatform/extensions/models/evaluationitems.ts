// Auto-generated extension model for @swamp/gcp/aiplatform/evaluationitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/evaluationItems/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationItems.get",
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
  "id": "aiplatform.projects.locations.evaluationItems.create",
  "path": "v1/{+parent}/evaluationItems",
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

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationItems.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
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
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
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
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
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
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Responses from model or agent.").optional(),
    prompt: z.object({
      promptTemplateData: z.object({
        values: z.record(
          z.string(),
          z.object({
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
          }),
        ).describe("The values for fields in the prompt template.").optional(),
      }).describe(
        "Message to hold a prompt template and the values to populate the template.",
      ).optional(),
      text: z.string().describe("Text prompt.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe(
      "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
    ).optional(),
    rubrics: z.record(
      z.string(),
      z.object({
        displayName: z.string().describe(
          'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
        ).optional(),
        groupId: z.string().describe("Unique identifier for the group.")
          .optional(),
        rubrics: z.array(z.object({
          content: z.object({
            property: z.object({
              description: z.string().describe(
                'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
              ).optional(),
            }).describe("Defines criteria based on a specific property.")
              .optional(),
          }).describe("Content of the rubric, defining the testable criteria.")
            .optional(),
          importance: z.enum([
            "IMPORTANCE_UNSPECIFIED",
            "HIGH",
            "MEDIUM",
            "LOW",
          ]).describe("Optional. The relative importance of this rubric.")
            .optional(),
          rubricId: z.string().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.string().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        })).describe("Rubrics that are part of this group.").optional(),
      }),
    ).describe(
      "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
    ).optional(),
  }).describe(
    "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
  ).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string().describe(
        "Optional. Additional results for the metric.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The candidate that is being evaluated. The value is the same as the candidate name in the EvaluationRequest.",
      ).optional(),
      explanation: z.string().describe(
        "Optional. The explanation for the metric.",
      ).optional(),
      metric: z.string().describe("Required. The metric that was evaluated.")
        .optional(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.object({
          content: z.object({
            property: z.object({
              description: z.string().describe(
                'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
              ).optional(),
            }).describe("Defines criteria based on a specific property.")
              .optional(),
          }).describe("Content of the rubric, defining the testable criteria.")
            .optional(),
          importance: z.enum([
            "IMPORTANCE_UNSPECIFIED",
            "HIGH",
            "MEDIUM",
            "LOW",
          ]).describe("Optional. The relative importance of this rubric.")
            .optional(),
          rubricId: z.string().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.string().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        }).describe(
          "Message representing a single testable criterion for evaluation. One input prompt could have multiple rubrics.",
        ).optional(),
        reasoning: z.string().describe(
          "Optional. Human-readable reasoning or explanation for the verdict. This can include specific examples or details from the evaluated content that justify the given verdict.",
        ).optional(),
        verdict: z.boolean().describe(
          'Required. Outcome of the evaluation against the rubric, represented as a boolean. `true` indicates a "Pass", `false` indicates a "Fail".',
        ).optional(),
      })).describe("Optional. The rubric verdicts for the metric.").optional(),
      score: z.number().describe("Optional. The score for the metric.")
        .optional(),
    })).describe("Optional. The results for the metric.").optional(),
    evaluationRequest: z.string().describe(
      "Required. The request item that was evaluated. Format: projects/{project}/locations/{location}/evaluationItems/{evaluation_item}",
    ).optional(),
    evaluationRun: z.string().describe(
      "Required. The evaluation run that was used to generate the result. Format: projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}",
    ).optional(),
    metadata: z.string().describe(
      "Optional. Metadata about the evaluation result.",
    ).optional(),
    metric: z.string().describe("Required. The metric that was evaluated.")
      .optional(),
    request: z.object({
      candidateResponses: z.array(z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
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
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      })).describe(
        "Optional. Responses from model under test and other baseline models for comparison.",
      ).optional(),
      goldenResponse: z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
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
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      }).describe("Responses from model or agent.").optional(),
      prompt: z.object({
        promptTemplateData: z.object({
          values: z.record(
            z.string(),
            z.object({
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
                  code: z.string().describe(
                    "Required. The code to be executed.",
                  ).optional(),
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
            }),
          ).describe("The values for fields in the prompt template.")
            .optional(),
        }).describe(
          "Message to hold a prompt template and the values to populate the template.",
        ).optional(),
        text: z.string().describe("Text prompt.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the prompt template.",
        ).optional(),
      }).describe(
        "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
      ).optional(),
      rubrics: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
          ).optional(),
          groupId: z.string().describe("Unique identifier for the group.")
            .optional(),
          rubrics: z.array(z.object({
            content: z.object({
              property: z.object({
                description: z.string().describe(
                  'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
                ).optional(),
              }).describe("Defines criteria based on a specific property.")
                .optional(),
            }).describe(
              "Content of the rubric, defining the testable criteria.",
            ).optional(),
            importance: z.enum([
              "IMPORTANCE_UNSPECIFIED",
              "HIGH",
              "MEDIUM",
              "LOW",
            ]).describe("Optional. The relative importance of this rubric.")
              .optional(),
            rubricId: z.string().describe(
              "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
            ).optional(),
            type: z.string().describe(
              'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
            ).optional(),
          })).describe("Rubrics that are part of this group.").optional(),
        }),
      ).describe(
        "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
      ).optional(),
    }).describe(
      "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
    ).optional(),
  }).describe("Evaluation result.").optional(),
  gcsUri: z.string().describe(
    "The Cloud Storage object where the request or response is stored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the EvaluationItem.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationItem.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationItem. Format: `projects/{project}/locations/{location}/evaluationItems/{evaluation_item}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  evaluationItemType: z.string().optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      candidate: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      text: z.string(),
      value: z.string(),
    })),
    goldenResponse: z.object({
      candidate: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      text: z.string(),
      value: z.string(),
    }),
    prompt: z.object({
      promptTemplateData: z.object({
        values: z.record(z.string(), z.unknown()),
      }),
      text: z.string(),
      value: z.string(),
    }),
    rubrics: z.record(z.string(), z.unknown()),
  }).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string(),
      candidate: z.string(),
      explanation: z.string(),
      metric: z.string(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.object({
          content: z.object({
            property: z.object({
              description: z.string(),
            }),
          }),
          importance: z.string(),
          rubricId: z.string(),
          type: z.string(),
        }),
        reasoning: z.string(),
        verdict: z.boolean(),
      })),
      score: z.number(),
    })),
    evaluationRequest: z.string(),
    evaluationRun: z.string(),
    metadata: z.string(),
    metric: z.string(),
    request: z.object({
      candidateResponses: z.array(z.object({
        candidate: z.string(),
        error: z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        }),
        text: z.string(),
        value: z.string(),
      })),
      goldenResponse: z.object({
        candidate: z.string(),
        error: z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        }),
        text: z.string(),
        value: z.string(),
      }),
      prompt: z.object({
        promptTemplateData: z.object({
          values: z.record(z.string(), z.unknown()),
        }),
        text: z.string(),
        value: z.string(),
      }),
      rubrics: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  gcsUri: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metadata: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Required. The display name of the EvaluationItem.",
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
  evaluationItemType: z.enum([
    "EVALUATION_ITEM_TYPE_UNSPECIFIED",
    "REQUEST",
    "RESULT",
  ]).describe("Required. The type of the EvaluationItem.").optional(),
  evaluationRequest: z.object({
    candidateResponses: z.array(z.object({
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
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
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    })).describe(
      "Optional. Responses from model under test and other baseline models for comparison.",
    ).optional(),
    goldenResponse: z.object({
      candidate: z.string().describe(
        "Required. The name of the candidate that produced the response.",
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
      text: z.string().describe("Text response.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the response template.",
      ).optional(),
    }).describe("Responses from model or agent.").optional(),
    prompt: z.object({
      promptTemplateData: z.object({
        values: z.record(
          z.string(),
          z.object({
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
          }),
        ).describe("The values for fields in the prompt template.").optional(),
      }).describe(
        "Message to hold a prompt template and the values to populate the template.",
      ).optional(),
      text: z.string().describe("Text prompt.").optional(),
      value: z.string().describe(
        "Fields and values that can be used to populate the prompt template.",
      ).optional(),
    }).describe(
      "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
    ).optional(),
    rubrics: z.record(
      z.string(),
      z.object({
        displayName: z.string().describe(
          'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
        ).optional(),
        groupId: z.string().describe("Unique identifier for the group.")
          .optional(),
        rubrics: z.array(z.object({
          content: z.object({
            property: z.object({
              description: z.string().describe(
                'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
              ).optional(),
            }).describe("Defines criteria based on a specific property.")
              .optional(),
          }).describe("Content of the rubric, defining the testable criteria.")
            .optional(),
          importance: z.enum([
            "IMPORTANCE_UNSPECIFIED",
            "HIGH",
            "MEDIUM",
            "LOW",
          ]).describe("Optional. The relative importance of this rubric.")
            .optional(),
          rubricId: z.string().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.string().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        })).describe("Rubrics that are part of this group.").optional(),
      }),
    ).describe(
      "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
    ).optional(),
  }).describe(
    "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
  ).optional(),
  evaluationResponse: z.object({
    candidateResults: z.array(z.object({
      additionalResults: z.string().describe(
        "Optional. Additional results for the metric.",
      ).optional(),
      candidate: z.string().describe(
        "Required. The candidate that is being evaluated. The value is the same as the candidate name in the EvaluationRequest.",
      ).optional(),
      explanation: z.string().describe(
        "Optional. The explanation for the metric.",
      ).optional(),
      metric: z.string().describe("Required. The metric that was evaluated.")
        .optional(),
      rubricVerdicts: z.array(z.object({
        evaluatedRubric: z.object({
          content: z.object({
            property: z.object({
              description: z.string().describe(
                'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
              ).optional(),
            }).describe("Defines criteria based on a specific property.")
              .optional(),
          }).describe("Content of the rubric, defining the testable criteria.")
            .optional(),
          importance: z.enum([
            "IMPORTANCE_UNSPECIFIED",
            "HIGH",
            "MEDIUM",
            "LOW",
          ]).describe("Optional. The relative importance of this rubric.")
            .optional(),
          rubricId: z.string().describe(
            "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
          ).optional(),
          type: z.string().describe(
            'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
          ).optional(),
        }).describe(
          "Message representing a single testable criterion for evaluation. One input prompt could have multiple rubrics.",
        ).optional(),
        reasoning: z.string().describe(
          "Optional. Human-readable reasoning or explanation for the verdict. This can include specific examples or details from the evaluated content that justify the given verdict.",
        ).optional(),
        verdict: z.boolean().describe(
          'Required. Outcome of the evaluation against the rubric, represented as a boolean. `true` indicates a "Pass", `false` indicates a "Fail".',
        ).optional(),
      })).describe("Optional. The rubric verdicts for the metric.").optional(),
      score: z.number().describe("Optional. The score for the metric.")
        .optional(),
    })).describe("Optional. The results for the metric.").optional(),
    evaluationRequest: z.string().describe(
      "Required. The request item that was evaluated. Format: projects/{project}/locations/{location}/evaluationItems/{evaluation_item}",
    ).optional(),
    evaluationRun: z.string().describe(
      "Required. The evaluation run that was used to generate the result. Format: projects/{project}/locations/{location}/evaluationRuns/{evaluation_run}",
    ).optional(),
    metadata: z.string().describe(
      "Optional. Metadata about the evaluation result.",
    ).optional(),
    metric: z.string().describe("Required. The metric that was evaluated.")
      .optional(),
    request: z.object({
      candidateResponses: z.array(z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
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
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      })).describe(
        "Optional. Responses from model under test and other baseline models for comparison.",
      ).optional(),
      goldenResponse: z.object({
        candidate: z.string().describe(
          "Required. The name of the candidate that produced the response.",
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
        text: z.string().describe("Text response.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the response template.",
        ).optional(),
      }).describe("Responses from model or agent.").optional(),
      prompt: z.object({
        promptTemplateData: z.object({
          values: z.record(
            z.string(),
            z.object({
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
                  code: z.string().describe(
                    "Required. The code to be executed.",
                  ).optional(),
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
            }),
          ).describe("The values for fields in the prompt template.")
            .optional(),
        }).describe(
          "Message to hold a prompt template and the values to populate the template.",
        ).optional(),
        text: z.string().describe("Text prompt.").optional(),
        value: z.string().describe(
          "Fields and values that can be used to populate the prompt template.",
        ).optional(),
      }).describe(
        "Prompt to be evaluated. This can represent a single-turn prompt or a multi-turn conversation for agent evaluations.",
      ).optional(),
      rubrics: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            'Human-readable name for the group. This should be unique within a given context if used for display or selection. Example: "Instruction Following V1", "Content Quality - Summarization Task".',
          ).optional(),
          groupId: z.string().describe("Unique identifier for the group.")
            .optional(),
          rubrics: z.array(z.object({
            content: z.object({
              property: z.object({
                description: z.string().describe(
                  'Description of the property being evaluated. Example: "The model\'s response is grammatically correct."',
                ).optional(),
              }).describe("Defines criteria based on a specific property.")
                .optional(),
            }).describe(
              "Content of the rubric, defining the testable criteria.",
            ).optional(),
            importance: z.enum([
              "IMPORTANCE_UNSPECIFIED",
              "HIGH",
              "MEDIUM",
              "LOW",
            ]).describe("Optional. The relative importance of this rubric.")
              .optional(),
            rubricId: z.string().describe(
              "Unique identifier for the rubric. This ID is used to refer to this rubric, e.g., in RubricVerdict.",
            ).optional(),
            type: z.string().describe(
              'Optional. A type designator for the rubric, which can inform how it\'s evaluated or interpreted by systems or users. It\'s recommended to use consistent, well-defined, upper snake_case strings. Examples: "SUMMARIZATION_QUALITY", "SAFETY_HARMFUL_CONTENT", "INSTRUCTION_ADHERENCE".',
            ).optional(),
          })).describe("Rubrics that are part of this group.").optional(),
        }),
      ).describe(
        "Optional. Named groups of rubrics associated with this prompt. The key is a user-defined name for the rubric group.",
      ).optional(),
    }).describe(
      "A single evaluation request supporting input for both single-turn model generation and multi-turn agent execution traces. Valid input modes: 1. Inference Mode: `prompt` is set (containing text or AgentData context). 2. Offline Eval Mode: `prompt` is unset, and `candidate_responses` contains `agent_data` (the completed execution trace). Validation Rule: Either `prompt` must be set, OR at least one of the `candidate_responses` must contain `agent_data`.",
    ).optional(),
  }).describe("Evaluation result.").optional(),
  gcsUri: z.string().describe(
    "The Cloud Storage object where the request or response is stored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for the EvaluationItem.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationItem.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationItem. Format: `projects/{project}/locations/{location}/evaluationItems/{evaluation_item}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/aiplatform/evaluationitems",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      description:
        "EvaluationItem is a single evaluation request or result. The content of an Ev...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationItems",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["evaluationItemType"] !== undefined) {
          body["evaluationItemType"] = g["evaluationItemType"];
        }
        if (g["evaluationRequest"] !== undefined) {
          body["evaluationRequest"] = g["evaluationRequest"];
        }
        if (g["evaluationResponse"] !== undefined) {
          body["evaluationResponse"] = g["evaluationResponse"];
        }
        if (g["gcsUri"] !== undefined) body["gcsUri"] = g["gcsUri"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
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
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
    delete: {
      description: "Delete the evaluationItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationItems"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync evaluationItems state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
  },
};
