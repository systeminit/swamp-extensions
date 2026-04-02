// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores-sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/sessions/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.sessions.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "includeAnswerDetails": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.sessions.create",
  "path": "v1/{+parent}/sessions",
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

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.sessions.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.sessions.delete",
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
    "Optional. The display name of the session. This field is used to identify the session in the UI. By default, the display name is the first turn query text in the session.",
  ).optional(),
  isPinned: z.boolean().describe(
    "Optional. Whether the session is pinned, pinned session will be displayed on the top of the session list.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. The labels for the session. Can be set as filter in ListSessionsRequest.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*`",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS"]).describe(
    "The state of the session.",
  ).optional(),
  turns: z.array(z.object({
    answer: z.string().describe(
      "Optional. The resource name of the answer to the user query. Only set if the answer generation (/answer API call) happened in this turn.",
    ).optional(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(
        z.enum([
          "ANSWER_SKIPPED_REASON_UNSPECIFIED",
          "ADVERSARIAL_QUERY_IGNORED",
          "NON_ANSWER_SEEKING_QUERY_IGNORED",
          "OUT_OF_DOMAIN_QUERY_IGNORED",
          "POTENTIAL_POLICY_VIOLATION",
          "NO_RELEVANT_CONTENT",
          "JAIL_BREAKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
          "NON_ANSWER_SEEKING_QUERY_IGNORED_V2",
          "LOW_GROUNDED_ANSWER",
          "USER_DEFINED_CLASSIFICATION_QUERY_IGNORED",
          "UNHELPFUL_ANSWER",
        ]),
      ).describe(
        "Additional answer-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
      ).optional(),
      answerText: z.string().describe("The textual answer.").optional(),
      citations: z.array(z.object({
        endIndex: z.string().describe(
          "End of the attributed segment, exclusive. Measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
        sources: z.array(z.object({
          referenceId: z.string().describe("ID of the citation source.")
            .optional(),
        })).describe("Citation sources for the attributed segment.").optional(),
        startIndex: z.string().describe(
          "Index indicates the start of the segment, measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
      })).describe("Citations.").optional(),
      completeTime: z.string().describe(
        "Output only. Answer completed timestamp.",
      ).optional(),
      createTime: z.string().describe("Output only. Answer creation timestamp.")
        .optional(),
      groundingScore: z.number().describe(
        "A score in the range of [0, 1] describing how grounded the answer is by the reference chunks.",
      ).optional(),
      groundingSupports: z.array(z.object({
        endIndex: z.string().describe("Required. End of the claim, exclusive.")
          .optional(),
        groundingCheckRequired: z.boolean().describe(
          "Indicates that this claim required grounding check. When the system decided this claim didn't require attribution/grounding check, this field is set to false. In that case, no grounding check was done for the claim and therefore `grounding_score`, `sources` is not returned.",
        ).optional(),
        groundingScore: z.number().describe(
          "A score in the range of [0, 1] describing how grounded is a specific claim by the references. Higher value means that the claim is better supported by the reference chunks.",
        ).optional(),
        sources: z.array(z.object({
          referenceId: z.string().describe("ID of the citation source.")
            .optional(),
        })).describe("Optional. Citation sources for the claim.").optional(),
        startIndex: z.string().describe(
          "Required. Index indicates the start of the claim, measured in bytes (UTF-8 unicode).",
        ).optional(),
      })).describe("Optional. Grounding supports.").optional(),
      name: z.string().describe(
        "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*/answers/*`",
      ).optional(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.object({
          positive: z.boolean().describe("Classification output.").optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "ADVERSARIAL_QUERY",
            "NON_ANSWER_SEEKING_QUERY",
            "JAIL_BREAKING_QUERY",
            "NON_ANSWER_SEEKING_QUERY_V2",
            "USER_DEFINED_CLASSIFICATION_QUERY",
          ]).describe("Query classification type.").optional(),
        })).describe("Query classification information.").optional(),
      }).describe("Query understanding information.").optional(),
      references: z.array(z.object({
        chunkInfo: z.object({
          chunk: z.string().describe("Chunk resource name.").optional(),
          content: z.string().describe("Chunk textual content.").optional(),
          documentMetadata: z.object({
            document: z.string().describe("Document resource name.").optional(),
            pageIdentifier: z.string().describe("Page identifier.").optional(),
            structData: z.record(z.string(), z.string()).describe(
              "The structured JSON metadata for the document. It is populated from the struct data from the Chunk in search result.",
            ).optional(),
            title: z.string().describe("Title.").optional(),
            uri: z.string().describe("URI for the document.").optional(),
          }).describe("Document metadata.").optional(),
          relevanceScore: z.number().describe(
            "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
          ).optional(),
        }).describe("Chunk information.").optional(),
        structuredDocumentInfo: z.object({
          document: z.string().describe("Document resource name.").optional(),
          structData: z.record(z.string(), z.string()).describe(
            "Structured search data.",
          ).optional(),
          title: z.string().describe("Output only. The title of the document.")
            .optional(),
          uri: z.string().describe("Output only. The URI of the document.")
            .optional(),
        }).describe("Structured search information.").optional(),
        unstructuredDocumentInfo: z.object({
          chunkContents: z.array(z.object({
            content: z.string().describe("Chunk textual content.").optional(),
            pageIdentifier: z.string().describe("Page identifier.").optional(),
            relevanceScore: z.number().describe(
              "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
            ).optional(),
          })).describe(
            "List of cited chunk contents derived from document content.",
          ).optional(),
          document: z.string().describe("Document resource name.").optional(),
          structData: z.record(z.string(), z.string()).describe(
            "The structured JSON metadata for the document. It is populated from the struct data from the Chunk in search result.",
          ).optional(),
          title: z.string().describe("Title.").optional(),
          uri: z.string().describe("URI for the document.").optional(),
        }).describe("Unstructured document information.").optional(),
      })).describe("References.").optional(),
      relatedQuestions: z.array(z.string()).describe(
        "Suggested related questions.",
      ).optional(),
      safetyRatings: z.array(z.object({
        blocked: z.boolean().describe(
          "Output only. Indicates whether the content was filtered out because of this rating.",
        ).optional(),
        category: z.enum([
          "HARM_CATEGORY_UNSPECIFIED",
          "HARM_CATEGORY_HATE_SPEECH",
          "HARM_CATEGORY_DANGEROUS_CONTENT",
          "HARM_CATEGORY_HARASSMENT",
          "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "HARM_CATEGORY_CIVIC_INTEGRITY",
        ]).describe("Output only. Harm category.").optional(),
        probability: z.enum([
          "HARM_PROBABILITY_UNSPECIFIED",
          "NEGLIGIBLE",
          "LOW",
          "MEDIUM",
          "HIGH",
        ]).describe("Output only. Harm probability levels in the content.")
          .optional(),
        probabilityScore: z.number().describe(
          "Output only. Harm probability score.",
        ).optional(),
        severity: z.enum([
          "HARM_SEVERITY_UNSPECIFIED",
          "HARM_SEVERITY_NEGLIGIBLE",
          "HARM_SEVERITY_LOW",
          "HARM_SEVERITY_MEDIUM",
          "HARM_SEVERITY_HIGH",
        ]).describe("Output only. Harm severity levels in the content.")
          .optional(),
        severityScore: z.number().describe("Output only. Harm severity score.")
          .optional(),
      })).describe("Optional. Safety ratings.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "STREAMING",
      ]).describe("The state of the answer generation.").optional(),
      steps: z.array(z.object({
        actions: z.array(z.object({
          observation: z.object({
            searchResults: z.array(z.object({
              chunkInfo: z.array(z.object({
                chunk: z.string().describe("Chunk resource name.").optional(),
                content: z.string().describe("Chunk textual content.")
                  .optional(),
                relevanceScore: z.number().describe(
                  "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
                ).optional(),
              })).describe(
                "If citation_type is CHUNK_LEVEL_CITATION and chunk mode is on, populate chunk info.",
              ).optional(),
              document: z.string().describe("Document resource name.")
                .optional(),
              snippetInfo: z.array(z.object({
                snippet: z.string().describe("Snippet content.").optional(),
                snippetStatus: z.string().describe(
                  "Status of the snippet defined by the search team.",
                ).optional(),
              })).describe(
                "If citation_type is DOCUMENT_LEVEL_CITATION, populate document level snippets.",
              ).optional(),
              structData: z.record(z.string(), z.string()).describe(
                "Data representation. The structured JSON data for the document. It's populated from the struct data from the Document, or the Chunk in search result.",
              ).optional(),
              title: z.string().describe("Title.").optional(),
              uri: z.string().describe("URI for the document.").optional(),
            })).describe(
              "Search results observed by the search action, it can be snippets info or chunk info, depending on the citation type set by the user.",
            ).optional(),
          }).describe("Observation.").optional(),
          searchAction: z.object({
            query: z.string().describe("The query to search.").optional(),
          }).describe("Search action.").optional(),
        })).describe("Actions.").optional(),
        description: z.string().describe("The description of the step.")
          .optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "IN_PROGRESS",
          "FAILED",
          "SUCCEEDED",
        ]).describe("The state of the step.").optional(),
        thought: z.string().describe("The thought of the step.").optional(),
      })).describe("Answer generation steps.").optional(),
    }).describe("Defines an answer.").optional(),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(
        z.enum([
          "ASSIST_SKIPPED_REASON_UNSPECIFIED",
          "NON_ASSIST_SEEKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
        ]),
      ).describe("Reasons for not answering the assist call.").optional(),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.object({
          bannedPhraseEnforcementResult: z.object({
            bannedPhrases: z.array(z.string()).describe(
              "The banned phrases that were found in the query or the answer.",
            ).optional(),
          }).describe(
            "Customer policy enforcement result for the banned phrase policy.",
          ).optional(),
          modelArmorEnforcementResult: z.object({
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
            modelArmorViolation: z.string().describe(
              "The Model Armor violation that was found.",
            ).optional(),
          }).describe(
            "Customer policy enforcement result for the Model Armor policy.",
          ).optional(),
        })).describe(
          "Customer policy enforcement results. Populated only if the assist call was skipped due to a policy violation. It contains results from those filters that blocked the processing of the query.",
        ).optional(),
        verdict: z.enum(["UNSPECIFIED", "ALLOW", "BLOCK"]).describe(
          "Final verdict of the customer policy enforcement. If only one policy blocked the processing, the verdict is BLOCK.",
        ).optional(),
      }).describe(
        "Customer policy enforcement results. Contains the results of the various policy checks, like the banned phrases or the Model Armor checks.",
      ).optional(),
      name: z.string().describe(
        "Immutable. Identifier. Resource name of the `AssistAnswer`. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/sessions/{session}/assistAnswers/{assist_answer}` This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
      ).optional(),
      replies: z.array(z.object({
        groundedContent: z.object({
          citationMetadata: z.object({
            citations: z.array(z.object({
              endIndex: z.number().int().describe(
                "Output only. End index into the content.",
              ).optional(),
              license: z.string().describe(
                "Output only. License of the attribution.",
              ).optional(),
              publicationDate: z.object({
                day: z.number().int().describe(
                  "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                ).optional(),
                month: z.number().int().describe(
                  "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                ).optional(),
                year: z.number().int().describe(
                  "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                ).optional(),
              }).describe(
                "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
              ).optional(),
              startIndex: z.number().int().describe(
                "Output only. Start index into the content.",
              ).optional(),
              title: z.string().describe(
                "Output only. Title of the attribution.",
              ).optional(),
              uri: z.string().describe(
                "Output only. Url reference of the attribution.",
              ).optional(),
            })).describe("Output only. List of citations.").optional(),
          }).describe(
            "A collection of source attributions for a piece of content.",
          ).optional(),
          content: z.object({
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
            }).describe("Result of executing ExecutableCode.").optional(),
            executableCode: z.object({
              code: z.string().describe(
                "Required. The code content. Currently only supports Python.",
              ).optional(),
            }).describe(
              "Code generated by the model that is meant to be executed by the model.",
            ).optional(),
            file: z.object({
              fileId: z.string().describe("Required. The file ID.").optional(),
              mimeType: z.string().describe(
                "Required. The media type (MIME type) of the file.",
              ).optional(),
            }).describe("A file, e.g., an audio summary.").optional(),
            inlineData: z.object({
              data: z.string().describe("Required. Raw bytes.").optional(),
              mimeType: z.string().describe(
                "Required. The media type (MIME type) of the generated data.",
              ).optional(),
            }).describe("Inline blob.").optional(),
            role: z.string().describe(
              'The producer of the content. Can be "model" or "user".',
            ).optional(),
            text: z.string().describe("Inline text.").optional(),
            thought: z.boolean().describe(
              "Optional. Indicates if the part is thought from the model.",
            ).optional(),
          }).describe("Multi-modal content.").optional(),
          textGroundingMetadata: z.object({
            references: z.array(z.object({
              content: z.string().describe("Referenced text content.")
                .optional(),
              documentMetadata: z.object({
                document: z.string().describe("Document resource name.")
                  .optional(),
                domain: z.string().describe(
                  "Domain name from the document URI. Note that the `uri` field may contain a URL that redirects to the actual website, in which case this will contain the domain name of the target site.",
                ).optional(),
                mimeType: z.string().describe(
                  "The mime type of the document. https://www.iana.org/assignments/media-types/media-types.xhtml.",
                ).optional(),
                pageIdentifier: z.string().describe("Page identifier.")
                  .optional(),
                title: z.string().describe("Title.").optional(),
                uri: z.string().describe(
                  "URI for the document. It may contain a URL that redirects to the actual website.",
                ).optional(),
              }).describe("Document metadata.").optional(),
            })).describe("References for the grounded text.").optional(),
            segments: z.array(z.object({
              endIndex: z.string().describe("End of the segment, exclusive.")
                .optional(),
              groundingScore: z.number().describe("Score for the segment.")
                .optional(),
              referenceIndices: z.array(z.number().int()).describe(
                "References for the segment.",
              ).optional(),
              startIndex: z.string().describe(
                "Zero-based index indicating the start of the segment, measured in bytes of a UTF-8 string (i.e. characters encoded on multiple bytes have a length of more than one).",
              ).optional(),
              text: z.string().describe("The text segment itself.").optional(),
            })).describe("Grounding information for parts of the text.")
              .optional(),
          }).describe("Grounding details for text sources.").optional(),
        }).describe(
          'A piece of content and possibly its grounding information. Not all content needs grounding. Phrases like "Of course, I will gladly search it for you." do not need grounding.',
        ).optional(),
      })).describe("Replies of the assistant.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "SKIPPED",
      ]).describe("State of the answer generation.").optional(),
    }).describe("AssistAnswer resource, main part of AssistResponse.")
      .optional(),
    query: z.object({
      queryId: z.string().describe("Output only. Unique Id for the query.")
        .optional(),
      text: z.string().describe("Plain text.").optional(),
    }).describe("Defines a user inputed query.").optional(),
    queryConfig: z.record(z.string(), z.string()).describe(
      'Optional. Represents metadata related to the query config, for example LLM model and version used, model parameters (temperature, grounding parameters, etc.). The prefix "google." is reserved for Google-developed functionality.',
    ).optional(),
  })).describe("Turns.").optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  isPinned: z.boolean().optional(),
  labels: z.array(z.string()).optional(),
  name: z.string(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  turns: z.array(z.object({
    answer: z.string(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(z.string()),
      answerText: z.string(),
      citations: z.array(z.object({
        endIndex: z.string(),
        sources: z.array(z.object({
          referenceId: z.string(),
        })),
        startIndex: z.string(),
      })),
      completeTime: z.string(),
      createTime: z.string(),
      groundingScore: z.number(),
      groundingSupports: z.array(z.object({
        endIndex: z.string(),
        groundingCheckRequired: z.boolean(),
        groundingScore: z.number(),
        sources: z.array(z.object({
          referenceId: z.string(),
        })),
        startIndex: z.string(),
      })),
      name: z.string(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.object({
          positive: z.boolean(),
          type: z.string(),
        })),
      }),
      references: z.array(z.object({
        chunkInfo: z.object({
          chunk: z.string(),
          content: z.string(),
          documentMetadata: z.object({
            document: z.string(),
            pageIdentifier: z.string(),
            structData: z.record(z.string(), z.unknown()),
            title: z.string(),
            uri: z.string(),
          }),
          relevanceScore: z.number(),
        }),
        structuredDocumentInfo: z.object({
          document: z.string(),
          structData: z.record(z.string(), z.unknown()),
          title: z.string(),
          uri: z.string(),
        }),
        unstructuredDocumentInfo: z.object({
          chunkContents: z.array(z.object({
            content: z.string(),
            pageIdentifier: z.string(),
            relevanceScore: z.number(),
          })),
          document: z.string(),
          structData: z.record(z.string(), z.unknown()),
          title: z.string(),
          uri: z.string(),
        }),
      })),
      relatedQuestions: z.array(z.string()),
      safetyRatings: z.array(z.object({
        blocked: z.boolean(),
        category: z.string(),
        probability: z.string(),
        probabilityScore: z.number(),
        severity: z.string(),
        severityScore: z.number(),
      })),
      state: z.string(),
      steps: z.array(z.object({
        actions: z.array(z.object({
          observation: z.object({
            searchResults: z.array(z.object({
              chunkInfo: z.array(z.object({
                chunk: z.string(),
                content: z.string(),
                relevanceScore: z.number(),
              })),
              document: z.string(),
              snippetInfo: z.array(z.object({
                snippet: z.string(),
                snippetStatus: z.string(),
              })),
              structData: z.record(z.string(), z.unknown()),
              title: z.string(),
              uri: z.string(),
            })),
          }),
          searchAction: z.object({
            query: z.string(),
          }),
        })),
        description: z.string(),
        state: z.string(),
        thought: z.string(),
      })),
    }),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(z.string()),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.object({
          bannedPhraseEnforcementResult: z.object({
            bannedPhrases: z.array(z.string()),
          }),
          modelArmorEnforcementResult: z.object({
            error: z.object({
              code: z.number(),
              details: z.array(z.record(z.string(), z.unknown())),
              message: z.string(),
            }),
            modelArmorViolation: z.string(),
          }),
        })),
        verdict: z.string(),
      }),
      name: z.string(),
      replies: z.array(z.object({
        groundedContent: z.object({
          citationMetadata: z.object({
            citations: z.array(z.object({
              endIndex: z.number(),
              license: z.string(),
              publicationDate: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              startIndex: z.number(),
              title: z.string(),
              uri: z.string(),
            })),
          }),
          content: z.object({
            codeExecutionResult: z.object({
              outcome: z.string(),
              output: z.string(),
            }),
            executableCode: z.object({
              code: z.string(),
            }),
            file: z.object({
              fileId: z.string(),
              mimeType: z.string(),
            }),
            inlineData: z.object({
              data: z.string(),
              mimeType: z.string(),
            }),
            role: z.string(),
            text: z.string(),
            thought: z.boolean(),
          }),
          textGroundingMetadata: z.object({
            references: z.array(z.object({
              content: z.string(),
              documentMetadata: z.object({
                document: z.string(),
                domain: z.string(),
                mimeType: z.string(),
                pageIdentifier: z.string(),
                title: z.string(),
                uri: z.string(),
              }),
            })),
            segments: z.array(z.object({
              endIndex: z.string(),
              groundingScore: z.number(),
              referenceIndices: z.array(z.number()),
              startIndex: z.string(),
              text: z.string(),
            })),
          }),
        }),
      })),
      state: z.string(),
    }),
    query: z.object({
      queryId: z.string(),
      text: z.string(),
    }),
    queryConfig: z.record(z.string(), z.unknown()),
  })).optional(),
  userPseudoId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. The display name of the session. This field is used to identify the session in the UI. By default, the display name is the first turn query text in the session.",
  ).optional(),
  isPinned: z.boolean().describe(
    "Optional. Whether the session is pinned, pinned session will be displayed on the top of the session list.",
  ).optional(),
  labels: z.array(z.string()).describe(
    "Optional. The labels for the session. Can be set as filter in ListSessionsRequest.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*`",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS"]).describe(
    "The state of the session.",
  ).optional(),
  turns: z.array(z.object({
    answer: z.string().describe(
      "Optional. The resource name of the answer to the user query. Only set if the answer generation (/answer API call) happened in this turn.",
    ).optional(),
    detailedAnswer: z.object({
      answerSkippedReasons: z.array(
        z.enum([
          "ANSWER_SKIPPED_REASON_UNSPECIFIED",
          "ADVERSARIAL_QUERY_IGNORED",
          "NON_ANSWER_SEEKING_QUERY_IGNORED",
          "OUT_OF_DOMAIN_QUERY_IGNORED",
          "POTENTIAL_POLICY_VIOLATION",
          "NO_RELEVANT_CONTENT",
          "JAIL_BREAKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
          "NON_ANSWER_SEEKING_QUERY_IGNORED_V2",
          "LOW_GROUNDED_ANSWER",
          "USER_DEFINED_CLASSIFICATION_QUERY_IGNORED",
          "UNHELPFUL_ANSWER",
        ]),
      ).describe(
        "Additional answer-skipped reasons. This provides the reason for ignored cases. If nothing is skipped, this field is not set.",
      ).optional(),
      answerText: z.string().describe("The textual answer.").optional(),
      citations: z.array(z.object({
        endIndex: z.string().describe(
          "End of the attributed segment, exclusive. Measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
        sources: z.array(z.object({
          referenceId: z.string().describe("ID of the citation source.")
            .optional(),
        })).describe("Citation sources for the attributed segment.").optional(),
        startIndex: z.string().describe(
          "Index indicates the start of the segment, measured in bytes (UTF-8 unicode). If there are multi-byte characters,such as non-ASCII characters, the index measurement is longer than the string length.",
        ).optional(),
      })).describe("Citations.").optional(),
      completeTime: z.string().describe(
        "Output only. Answer completed timestamp.",
      ).optional(),
      createTime: z.string().describe("Output only. Answer creation timestamp.")
        .optional(),
      groundingScore: z.number().describe(
        "A score in the range of [0, 1] describing how grounded the answer is by the reference chunks.",
      ).optional(),
      groundingSupports: z.array(z.object({
        endIndex: z.string().describe("Required. End of the claim, exclusive.")
          .optional(),
        groundingCheckRequired: z.boolean().describe(
          "Indicates that this claim required grounding check. When the system decided this claim didn't require attribution/grounding check, this field is set to false. In that case, no grounding check was done for the claim and therefore `grounding_score`, `sources` is not returned.",
        ).optional(),
        groundingScore: z.number().describe(
          "A score in the range of [0, 1] describing how grounded is a specific claim by the references. Higher value means that the claim is better supported by the reference chunks.",
        ).optional(),
        sources: z.array(z.object({
          referenceId: z.string().describe("ID of the citation source.")
            .optional(),
        })).describe("Optional. Citation sources for the claim.").optional(),
        startIndex: z.string().describe(
          "Required. Index indicates the start of the claim, measured in bytes (UTF-8 unicode).",
        ).optional(),
      })).describe("Optional. Grounding supports.").optional(),
      name: z.string().describe(
        "Immutable. Fully qualified name `projects/{project}/locations/global/collections/{collection}/engines/{engine}/sessions/*/answers/*`",
      ).optional(),
      queryUnderstandingInfo: z.object({
        queryClassificationInfo: z.array(z.object({
          positive: z.boolean().describe("Classification output.").optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "ADVERSARIAL_QUERY",
            "NON_ANSWER_SEEKING_QUERY",
            "JAIL_BREAKING_QUERY",
            "NON_ANSWER_SEEKING_QUERY_V2",
            "USER_DEFINED_CLASSIFICATION_QUERY",
          ]).describe("Query classification type.").optional(),
        })).describe("Query classification information.").optional(),
      }).describe("Query understanding information.").optional(),
      references: z.array(z.object({
        chunkInfo: z.object({
          chunk: z.string().describe("Chunk resource name.").optional(),
          content: z.string().describe("Chunk textual content.").optional(),
          documentMetadata: z.object({
            document: z.string().describe("Document resource name.").optional(),
            pageIdentifier: z.string().describe("Page identifier.").optional(),
            structData: z.record(z.string(), z.string()).describe(
              "The structured JSON metadata for the document. It is populated from the struct data from the Chunk in search result.",
            ).optional(),
            title: z.string().describe("Title.").optional(),
            uri: z.string().describe("URI for the document.").optional(),
          }).describe("Document metadata.").optional(),
          relevanceScore: z.number().describe(
            "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
          ).optional(),
        }).describe("Chunk information.").optional(),
        structuredDocumentInfo: z.object({
          document: z.string().describe("Document resource name.").optional(),
          structData: z.record(z.string(), z.string()).describe(
            "Structured search data.",
          ).optional(),
          title: z.string().describe("Output only. The title of the document.")
            .optional(),
          uri: z.string().describe("Output only. The URI of the document.")
            .optional(),
        }).describe("Structured search information.").optional(),
        unstructuredDocumentInfo: z.object({
          chunkContents: z.array(z.object({
            content: z.string().describe("Chunk textual content.").optional(),
            pageIdentifier: z.string().describe("Page identifier.").optional(),
            relevanceScore: z.number().describe(
              "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
            ).optional(),
          })).describe(
            "List of cited chunk contents derived from document content.",
          ).optional(),
          document: z.string().describe("Document resource name.").optional(),
          structData: z.record(z.string(), z.string()).describe(
            "The structured JSON metadata for the document. It is populated from the struct data from the Chunk in search result.",
          ).optional(),
          title: z.string().describe("Title.").optional(),
          uri: z.string().describe("URI for the document.").optional(),
        }).describe("Unstructured document information.").optional(),
      })).describe("References.").optional(),
      relatedQuestions: z.array(z.string()).describe(
        "Suggested related questions.",
      ).optional(),
      safetyRatings: z.array(z.object({
        blocked: z.boolean().describe(
          "Output only. Indicates whether the content was filtered out because of this rating.",
        ).optional(),
        category: z.enum([
          "HARM_CATEGORY_UNSPECIFIED",
          "HARM_CATEGORY_HATE_SPEECH",
          "HARM_CATEGORY_DANGEROUS_CONTENT",
          "HARM_CATEGORY_HARASSMENT",
          "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "HARM_CATEGORY_CIVIC_INTEGRITY",
        ]).describe("Output only. Harm category.").optional(),
        probability: z.enum([
          "HARM_PROBABILITY_UNSPECIFIED",
          "NEGLIGIBLE",
          "LOW",
          "MEDIUM",
          "HIGH",
        ]).describe("Output only. Harm probability levels in the content.")
          .optional(),
        probabilityScore: z.number().describe(
          "Output only. Harm probability score.",
        ).optional(),
        severity: z.enum([
          "HARM_SEVERITY_UNSPECIFIED",
          "HARM_SEVERITY_NEGLIGIBLE",
          "HARM_SEVERITY_LOW",
          "HARM_SEVERITY_MEDIUM",
          "HARM_SEVERITY_HIGH",
        ]).describe("Output only. Harm severity levels in the content.")
          .optional(),
        severityScore: z.number().describe("Output only. Harm severity score.")
          .optional(),
      })).describe("Optional. Safety ratings.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "STREAMING",
      ]).describe("The state of the answer generation.").optional(),
      steps: z.array(z.object({
        actions: z.array(z.object({
          observation: z.object({
            searchResults: z.array(z.object({
              chunkInfo: z.array(z.object({
                chunk: z.string().describe("Chunk resource name.").optional(),
                content: z.string().describe("Chunk textual content.")
                  .optional(),
                relevanceScore: z.number().describe(
                  "The relevance of the chunk for a given query. Values range from 0.0 (completely irrelevant) to 1.0 (completely relevant). This value is for informational purpose only. It may change for the same query and chunk at any time due to a model retraining or change in implementation.",
                ).optional(),
              })).describe(
                "If citation_type is CHUNK_LEVEL_CITATION and chunk mode is on, populate chunk info.",
              ).optional(),
              document: z.string().describe("Document resource name.")
                .optional(),
              snippetInfo: z.array(z.object({
                snippet: z.string().describe("Snippet content.").optional(),
                snippetStatus: z.string().describe(
                  "Status of the snippet defined by the search team.",
                ).optional(),
              })).describe(
                "If citation_type is DOCUMENT_LEVEL_CITATION, populate document level snippets.",
              ).optional(),
              structData: z.record(z.string(), z.string()).describe(
                "Data representation. The structured JSON data for the document. It's populated from the struct data from the Document, or the Chunk in search result.",
              ).optional(),
              title: z.string().describe("Title.").optional(),
              uri: z.string().describe("URI for the document.").optional(),
            })).describe(
              "Search results observed by the search action, it can be snippets info or chunk info, depending on the citation type set by the user.",
            ).optional(),
          }).describe("Observation.").optional(),
          searchAction: z.object({
            query: z.string().describe("The query to search.").optional(),
          }).describe("Search action.").optional(),
        })).describe("Actions.").optional(),
        description: z.string().describe("The description of the step.")
          .optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "IN_PROGRESS",
          "FAILED",
          "SUCCEEDED",
        ]).describe("The state of the step.").optional(),
        thought: z.string().describe("The thought of the step.").optional(),
      })).describe("Answer generation steps.").optional(),
    }).describe("Defines an answer.").optional(),
    detailedAssistAnswer: z.object({
      assistSkippedReasons: z.array(
        z.enum([
          "ASSIST_SKIPPED_REASON_UNSPECIFIED",
          "NON_ASSIST_SEEKING_QUERY_IGNORED",
          "CUSTOMER_POLICY_VIOLATION",
        ]),
      ).describe("Reasons for not answering the assist call.").optional(),
      customerPolicyEnforcementResult: z.object({
        policyResults: z.array(z.object({
          bannedPhraseEnforcementResult: z.object({
            bannedPhrases: z.array(z.string()).describe(
              "The banned phrases that were found in the query or the answer.",
            ).optional(),
          }).describe(
            "Customer policy enforcement result for the banned phrase policy.",
          ).optional(),
          modelArmorEnforcementResult: z.object({
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
            modelArmorViolation: z.string().describe(
              "The Model Armor violation that was found.",
            ).optional(),
          }).describe(
            "Customer policy enforcement result for the Model Armor policy.",
          ).optional(),
        })).describe(
          "Customer policy enforcement results. Populated only if the assist call was skipped due to a policy violation. It contains results from those filters that blocked the processing of the query.",
        ).optional(),
        verdict: z.enum(["UNSPECIFIED", "ALLOW", "BLOCK"]).describe(
          "Final verdict of the customer policy enforcement. If only one policy blocked the processing, the verdict is BLOCK.",
        ).optional(),
      }).describe(
        "Customer policy enforcement results. Contains the results of the various policy checks, like the banned phrases or the Model Armor checks.",
      ).optional(),
      name: z.string().describe(
        "Immutable. Identifier. Resource name of the `AssistAnswer`. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/sessions/{session}/assistAnswers/{assist_answer}` This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
      ).optional(),
      replies: z.array(z.object({
        groundedContent: z.object({
          citationMetadata: z.object({
            citations: z.array(z.object({
              endIndex: z.number().int().describe(
                "Output only. End index into the content.",
              ).optional(),
              license: z.string().describe(
                "Output only. License of the attribution.",
              ).optional(),
              publicationDate: z.object({
                day: z.number().int().describe(
                  "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                ).optional(),
                month: z.number().int().describe(
                  "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                ).optional(),
                year: z.number().int().describe(
                  "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                ).optional(),
              }).describe(
                "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
              ).optional(),
              startIndex: z.number().int().describe(
                "Output only. Start index into the content.",
              ).optional(),
              title: z.string().describe(
                "Output only. Title of the attribution.",
              ).optional(),
              uri: z.string().describe(
                "Output only. Url reference of the attribution.",
              ).optional(),
            })).describe("Output only. List of citations.").optional(),
          }).describe(
            "A collection of source attributions for a piece of content.",
          ).optional(),
          content: z.object({
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
            }).describe("Result of executing ExecutableCode.").optional(),
            executableCode: z.object({
              code: z.string().describe(
                "Required. The code content. Currently only supports Python.",
              ).optional(),
            }).describe(
              "Code generated by the model that is meant to be executed by the model.",
            ).optional(),
            file: z.object({
              fileId: z.string().describe("Required. The file ID.").optional(),
              mimeType: z.string().describe(
                "Required. The media type (MIME type) of the file.",
              ).optional(),
            }).describe("A file, e.g., an audio summary.").optional(),
            inlineData: z.object({
              data: z.string().describe("Required. Raw bytes.").optional(),
              mimeType: z.string().describe(
                "Required. The media type (MIME type) of the generated data.",
              ).optional(),
            }).describe("Inline blob.").optional(),
            role: z.string().describe(
              'The producer of the content. Can be "model" or "user".',
            ).optional(),
            text: z.string().describe("Inline text.").optional(),
            thought: z.boolean().describe(
              "Optional. Indicates if the part is thought from the model.",
            ).optional(),
          }).describe("Multi-modal content.").optional(),
          textGroundingMetadata: z.object({
            references: z.array(z.object({
              content: z.string().describe("Referenced text content.")
                .optional(),
              documentMetadata: z.object({
                document: z.string().describe("Document resource name.")
                  .optional(),
                domain: z.string().describe(
                  "Domain name from the document URI. Note that the `uri` field may contain a URL that redirects to the actual website, in which case this will contain the domain name of the target site.",
                ).optional(),
                mimeType: z.string().describe(
                  "The mime type of the document. https://www.iana.org/assignments/media-types/media-types.xhtml.",
                ).optional(),
                pageIdentifier: z.string().describe("Page identifier.")
                  .optional(),
                title: z.string().describe("Title.").optional(),
                uri: z.string().describe(
                  "URI for the document. It may contain a URL that redirects to the actual website.",
                ).optional(),
              }).describe("Document metadata.").optional(),
            })).describe("References for the grounded text.").optional(),
            segments: z.array(z.object({
              endIndex: z.string().describe("End of the segment, exclusive.")
                .optional(),
              groundingScore: z.number().describe("Score for the segment.")
                .optional(),
              referenceIndices: z.array(z.number().int()).describe(
                "References for the segment.",
              ).optional(),
              startIndex: z.string().describe(
                "Zero-based index indicating the start of the segment, measured in bytes of a UTF-8 string (i.e. characters encoded on multiple bytes have a length of more than one).",
              ).optional(),
              text: z.string().describe("The text segment itself.").optional(),
            })).describe("Grounding information for parts of the text.")
              .optional(),
          }).describe("Grounding details for text sources.").optional(),
        }).describe(
          'A piece of content and possibly its grounding information. Not all content needs grounding. Phrases like "Of course, I will gladly search it for you." do not need grounding.',
        ).optional(),
      })).describe("Replies of the assistant.").optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "FAILED",
        "SUCCEEDED",
        "SKIPPED",
      ]).describe("State of the answer generation.").optional(),
    }).describe("AssistAnswer resource, main part of AssistResponse.")
      .optional(),
    query: z.object({
      queryId: z.string().describe("Output only. Unique Id for the query.")
        .optional(),
      text: z.string().describe("Plain text.").optional(),
    }).describe("Defines a user inputed query.").optional(),
    queryConfig: z.record(z.string(), z.string()).describe(
      'Optional. Represents metadata related to the query config, for example LLM model and version used, model parameters (temperature, grounding parameters, etc.). The prefix "google." is reserved for Google-developed functionality.',
    ).optional(),
  })).describe("Turns.").optional(),
  userPseudoId: z.string().describe("A unique identifier for tracking users.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/discoveryengine/datastores-sessions",
  version: "2026.04.02.2",
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
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "External session proto definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessions",
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
        if (g["isPinned"] !== undefined) body["isPinned"] = g["isPinned"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["turns"] !== undefined) body["turns"] = g["turns"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
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
        const instanceName = (result.name ?? g.name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
        const instanceName = (result.name ?? g.name)?.toString() ??
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
      description: "Update sessions attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isPinned"] !== undefined) body["isPinned"] = g["isPinned"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["turns"] !== undefined) body["turns"] = g["turns"];
        if (g["userPseudoId"] !== undefined) {
          body["userPseudoId"] = g["userPseudoId"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
        const instanceName = g.name?.toString() ?? args.identifier;
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
      description: "Sync sessions state from GCP",
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
  },
};
