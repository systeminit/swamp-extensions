// Auto-generated extension model for @swamp/gcp/contactcenterinsights/conversations-analyses
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
  return `${parent}/analyses/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.conversations.analyses.get",
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
  "id":
    "contactcenterinsights.projects.locations.conversations.analyses.create",
  "path": "v1/{+parent}/analyses",
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
  "id":
    "contactcenterinsights.projects.locations.conversations.analyses.delete",
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
  analysisResult: z.object({
    callAnalysisMetadata: z.object({
      annotations: z.array(z.object({
        annotationEndBoundary: z.object({
          transcriptIndex: z.number().int().describe(
            "The index in the sequence of transcribed pieces of the conversation where the boundary is located. This index starts at zero.",
          ).optional(),
          wordIndex: z.number().int().describe(
            "The word index of this boundary with respect to the first word in the transcript piece. This index starts at zero.",
          ).optional(),
        }).describe(
          "A point in a conversation that marks the start or the end of an annotation.",
        ).optional(),
        annotationStartBoundary: z.object({
          transcriptIndex: z.number().int().describe(
            "The index in the sequence of transcribed pieces of the conversation where the boundary is located. This index starts at zero.",
          ).optional(),
          wordIndex: z.number().int().describe(
            "The word index of this boundary with respect to the first word in the transcript piece. This index starts at zero.",
          ).optional(),
        }).describe(
          "A point in a conversation that marks the start or the end of an annotation.",
        ).optional(),
        channelTag: z.number().int().describe(
          "The channel of the audio where the annotation occurs. For single-channel audio, this field is not populated.",
        ).optional(),
        entityMentionData: z.object({
          entityUniqueId: z.string().describe(
            "The key of this entity in conversation entities. Can be used to retrieve the exact `Entity` this mention is attached to.",
          ).optional(),
          sentiment: z.object({
            magnitude: z.number().describe(
              "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
            ).optional(),
            score: z.number().describe(
              "The sentiment score between -1.0 (negative) and 1.0 (positive).",
            ).optional(),
          }).describe("The data for a sentiment annotation.").optional(),
          type: z.enum(["MENTION_TYPE_UNSPECIFIED", "PROPER", "COMMON"])
            .describe("The type of the entity mention.").optional(),
        }).describe(
          "The data for an entity mention annotation. This represents a mention of an `Entity` in the conversation.",
        ).optional(),
        holdData: z.object({}).describe("The data for a hold annotation.")
          .optional(),
        intentMatchData: z.object({
          intentUniqueId: z.string().describe(
            "The id of the matched intent. Can be used to retrieve the corresponding intent information.",
          ).optional(),
        }).describe(
          "The data for an intent match. Represents an intent match for a text segment in the conversation. A text segment can be part of a sentence, a complete sentence, or an utterance with multiple sentences.",
        ).optional(),
        interruptionData: z.object({}).describe(
          "The data for an interruption annotation.",
        ).optional(),
        issueMatchData: z.object({
          issueAssignment: z.object({
            displayName: z.string().describe(
              "Immutable. Display name of the assigned issue. This field is set at time of analysis and immutable since then.",
            ).optional(),
            issue: z.string().describe("Resource name of the assigned issue.")
              .optional(),
            score: z.number().describe(
              "Score indicating the likelihood of the issue assignment. currently bounded on [0,1].",
            ).optional(),
          }).describe("Information about the issue.").optional(),
        }).describe("The data for an issue match annotation.").optional(),
        phraseMatchData: z.object({
          displayName: z.string().describe(
            "The human-readable name of the phrase matcher.",
          ).optional(),
          phraseMatcher: z.string().describe(
            "The unique identifier (the resource name) of the phrase matcher.",
          ).optional(),
        }).describe(
          "The data for a matched phrase matcher. Represents information identifying a phrase matcher for a given match.",
        ).optional(),
        sentimentData: z.object({
          magnitude: z.number().describe(
            "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
          ).optional(),
          score: z.number().describe(
            "The sentiment score between -1.0 (negative) and 1.0 (positive).",
          ).optional(),
        }).describe("The data for a sentiment annotation.").optional(),
        silenceData: z.object({}).describe("The data for a silence annotation.")
          .optional(),
      })).describe("A list of call annotations that apply to this call.")
        .optional(),
      entities: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The representative name for the entity.",
          ).optional(),
          metadata: z.record(z.string(), z.string()).describe(
            "Metadata associated with the entity. For most entity types, the metadata is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if they are available. For the metadata associated with other entity types, see the Type table below.",
          ).optional(),
          salience: z.number().describe(
            "The salience score associated with the entity in the [0, 1.0] range. The salience score for an entity provides information about the importance or centrality of that entity to the entire document text. Scores closer to 0 are less salient, while scores closer to 1.0 are highly salient.",
          ).optional(),
          sentiment: z.object({
            magnitude: z.number().describe(
              "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
            ).optional(),
            score: z.number().describe(
              "The sentiment score between -1.0 (negative) and 1.0 (positive).",
            ).optional(),
          }).describe("The data for a sentiment annotation.").optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "PERSON",
            "LOCATION",
            "ORGANIZATION",
            "EVENT",
            "WORK_OF_ART",
            "CONSUMER_GOOD",
            "OTHER",
            "PHONE_NUMBER",
            "ADDRESS",
            "DATE",
            "NUMBER",
            "PRICE",
          ]).describe("The entity type.").optional(),
        }),
      ).describe("All the entities in the call.").optional(),
      intents: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The human-readable name of the intent.",
          ).optional(),
          id: z.string().describe("The unique identifier of the intent.")
            .optional(),
        }),
      ).describe("All the matched intents in the call.").optional(),
      issueModelResult: z.object({
        issueModel: z.string().describe(
          "Issue model that generates the result. Format: projects/{project}/locations/{location}/issueModels/{issue_model}",
        ).optional(),
        issues: z.array(z.object({
          displayName: z.string().describe(
            "Immutable. Display name of the assigned issue. This field is set at time of analysis and immutable since then.",
          ).optional(),
          issue: z.string().describe("Resource name of the assigned issue.")
            .optional(),
          score: z.number().describe(
            "Score indicating the likelihood of the issue assignment. currently bounded on [0,1].",
          ).optional(),
        })).describe("All the matched issues.").optional(),
      }).describe("Issue Modeling result on a conversation.").optional(),
      phraseMatchers: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The human-readable name of the phrase matcher.",
          ).optional(),
          phraseMatcher: z.string().describe(
            "The unique identifier (the resource name) of the phrase matcher.",
          ).optional(),
        }),
      ).describe("All the matched phrase matchers in the call.").optional(),
      qaScorecardResults: z.array(z.object({
        agentId: z.string().describe(
          "ID of the agent that handled the conversation.",
        ).optional(),
        conversation: z.string().describe(
          "The conversation scored by this result.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The timestamp that the revision was created.",
        ).optional(),
        name: z.string().describe(
          "Identifier. The name of the scorecard result. Format: projects/{project}/locations/{location}/qaScorecardResults/{qa_scorecard_result}",
        ).optional(),
        normalizedScore: z.number().describe(
          "The normalized score, which is the score divided by the potential score. Any manual edits are included if they exist.",
        ).optional(),
        potentialScore: z.number().describe(
          "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
        ).optional(),
        qaAnswers: z.array(z.object({
          answerSources: z.array(z.object({
            answerValue: z.object({
              boolValue: z.boolean().describe("Boolean value.").optional(),
              key: z.string().describe(
                "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
              ).optional(),
              naValue: z.boolean().describe(
                'A value of "Not Applicable (N/A)". Should only ever be `true`.',
              ).optional(),
              normalizedScore: z.number().describe(
                "Output only. Normalized score of the questions. Calculated as score / potential_score.",
              ).optional(),
              numValue: z.number().describe("Numerical value.").optional(),
              potentialScore: z.number().describe(
                "Output only. The maximum potential score of the question.",
              ).optional(),
              score: z.number().describe(
                "Output only. Numerical score of the answer.",
              ).optional(),
              skipValue: z.boolean().describe(
                'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
              ).optional(),
              strValue: z.string().describe("String value.").optional(),
            }).describe(
              "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
            ).optional(),
            sourceType: z.enum([
              "SOURCE_TYPE_UNSPECIFIED",
              "SYSTEM_GENERATED",
              "MANUAL_EDIT",
            ]).describe("What created the answer.").optional(),
          })).describe(
            "Lists all answer sources containing one or more answer values of a specific source type, e.g., all system-generated answer sources, or all manual edit answer sources.",
          ).optional(),
          answerValue: z.object({
            boolValue: z.boolean().describe("Boolean value.").optional(),
            key: z.string().describe(
              "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
            ).optional(),
            naValue: z.boolean().describe(
              'A value of "Not Applicable (N/A)". Should only ever be `true`.',
            ).optional(),
            normalizedScore: z.number().describe(
              "Output only. Normalized score of the questions. Calculated as score / potential_score.",
            ).optional(),
            numValue: z.number().describe("Numerical value.").optional(),
            potentialScore: z.number().describe(
              "Output only. The maximum potential score of the question.",
            ).optional(),
            score: z.number().describe(
              "Output only. Numerical score of the answer.",
            ).optional(),
            skipValue: z.boolean().describe(
              'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
            ).optional(),
            strValue: z.string().describe("String value.").optional(),
          }).describe(
            "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
          ).optional(),
          conversation: z.string().describe(
            "The conversation the answer applies to.",
          ).optional(),
          qaQuestion: z.string().describe(
            "The QaQuestion answered by this answer.",
          ).optional(),
          questionBody: z.string().describe(
            'Question text. E.g., "Did the agent greet the customer?"',
          ).optional(),
          tags: z.array(z.string()).describe(
            "User-defined list of arbitrary tags. Matches the value from QaScorecard.ScorecardQuestion.tags. Used for grouping/organization and for weighting the score of each answer.",
          ).optional(),
        })).describe("Set of QaAnswers represented in the result.").optional(),
        qaScorecardRevision: z.string().describe(
          "The QaScorecardRevision scored by this result.",
        ).optional(),
        qaTagResults: z.array(z.object({
          normalizedScore: z.number().describe(
            "The normalized score the tag applies to.",
          ).optional(),
          potentialScore: z.number().describe(
            "The potential score the tag applies to.",
          ).optional(),
          score: z.number().describe("The score the tag applies to.")
            .optional(),
          tag: z.string().describe("The tag the score applies to.").optional(),
        })).describe("Collection of tags and their scores.").optional(),
        score: z.number().describe(
          "The overall numerical score of the result, incorporating any manual edits if they exist.",
        ).optional(),
        scoreSources: z.array(z.object({
          normalizedScore: z.number().describe(
            "The normalized score, which is the score divided by the potential score.",
          ).optional(),
          potentialScore: z.number().describe(
            "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
          ).optional(),
          qaTagResults: z.array(z.object({
            normalizedScore: z.number().describe(
              "The normalized score the tag applies to.",
            ).optional(),
            potentialScore: z.number().describe(
              "The potential score the tag applies to.",
            ).optional(),
            score: z.number().describe("The score the tag applies to.")
              .optional(),
            tag: z.string().describe("The tag the score applies to.")
              .optional(),
          })).describe("Collection of tags and their scores.").optional(),
          score: z.number().describe(
            "The overall numerical score of the result.",
          ).optional(),
          sourceType: z.enum([
            "SOURCE_TYPE_UNSPECIFIED",
            "SYSTEM_GENERATED_ONLY",
            "INCLUDES_MANUAL_EDITS",
          ]).describe("What created the score.").optional(),
        })).describe("List of all individual score sets.").optional(),
      })).describe("Results of scoring QaScorecards.").optional(),
      sentiments: z.array(z.object({
        channelTag: z.number().int().describe(
          "The channel of the audio that the data applies to.",
        ).optional(),
        sentimentData: z.object({
          magnitude: z.number().describe(
            "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
          ).optional(),
          score: z.number().describe(
            "The sentiment score between -1.0 (negative) and 1.0 (positive).",
          ).optional(),
        }).describe("The data for a sentiment annotation.").optional(),
      })).describe(
        "Overall conversation-level sentiment for each channel of the call.",
      ).optional(),
      silence: z.object({
        silenceDuration: z.string().describe(
          "Amount of time calculated to be in silence.",
        ).optional(),
        silencePercentage: z.number().describe(
          "Percentage of the total conversation spent in silence.",
        ).optional(),
      }).describe("Conversation-level silence data.").optional(),
    }).describe("Call-specific metadata created during analysis.").optional(),
    endTime: z.string().describe("The time at which the analysis ended.")
      .optional(),
  }).describe("The result of an analysis.").optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()).describe(
      "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
    ).optional(),
    phraseMatchers: z.array(z.string()).describe(
      "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
    ).optional(),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()).describe(
          "List of QaScorecardRevisions.",
        ).optional(),
      }).describe("Container for a list of scorecards.").optional(),
    }).describe("Configuration for the QA feature.").optional(),
    runAutoLabelingAnnotator: z.boolean().describe(
      "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
    ).optional(),
    runEntityAnnotator: z.boolean().describe(
      "Whether to run the entity annotator.",
    ).optional(),
    runIntentAnnotator: z.boolean().describe(
      "Whether to run the intent annotator.",
    ).optional(),
    runInterruptionAnnotator: z.boolean().describe(
      "Whether to run the interruption annotator.",
    ).optional(),
    runIssueModelAnnotator: z.boolean().describe(
      "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
    ).optional(),
    runPhraseMatcherAnnotator: z.boolean().describe(
      "Whether to run the active phrase matcher annotator(s).",
    ).optional(),
    runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
      .optional(),
    runSentimentAnnotator: z.boolean().describe(
      "Whether to run the sentiment annotator.",
    ).optional(),
    runSilenceAnnotator: z.boolean().describe(
      "Whether to run the silence annotator.",
    ).optional(),
    runSummarizationAnnotator: z.boolean().describe(
      "Whether to run the summarization annotator.",
    ).optional(),
    summarizationConfig: z.object({
      conversationProfile: z.string().describe(
        "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
      ).optional(),
      generator: z.string().describe(
        "The resource name of the existing created generator. Format: projects//locations//generators/",
      ).optional(),
      summarizationModel: z.enum([
        "SUMMARIZATION_MODEL_UNSPECIFIED",
        "BASELINE_MODEL",
        "BASELINE_MODEL_V2_0",
      ]).describe("Default summarization model to be used.").optional(),
    }).describe("Configuration for summarization.").optional(),
  }).describe(
    "Selector of all available annotators and phrase matchers to run.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the analysis. Format: projects/{project}/locations/{location}/conversations/{conversation}/analyses/{analysis}",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  analysisResult: z.object({
    callAnalysisMetadata: z.object({
      annotations: z.array(z.object({
        annotationEndBoundary: z.object({
          transcriptIndex: z.number(),
          wordIndex: z.number(),
        }),
        annotationStartBoundary: z.object({
          transcriptIndex: z.number(),
          wordIndex: z.number(),
        }),
        channelTag: z.number(),
        entityMentionData: z.object({
          entityUniqueId: z.string(),
          sentiment: z.object({
            magnitude: z.number(),
            score: z.number(),
          }),
          type: z.string(),
        }),
        holdData: z.object({}),
        intentMatchData: z.object({
          intentUniqueId: z.string(),
        }),
        interruptionData: z.object({}),
        issueMatchData: z.object({
          issueAssignment: z.object({
            displayName: z.string(),
            issue: z.string(),
            score: z.number(),
          }),
        }),
        phraseMatchData: z.object({
          displayName: z.string(),
          phraseMatcher: z.string(),
        }),
        sentimentData: z.object({
          magnitude: z.number(),
          score: z.number(),
        }),
        silenceData: z.object({}),
      })),
      entities: z.record(z.string(), z.unknown()),
      intents: z.record(z.string(), z.unknown()),
      issueModelResult: z.object({
        issueModel: z.string(),
        issues: z.array(z.object({
          displayName: z.string(),
          issue: z.string(),
          score: z.number(),
        })),
      }),
      phraseMatchers: z.record(z.string(), z.unknown()),
      qaScorecardResults: z.array(z.object({
        agentId: z.string(),
        conversation: z.string(),
        createTime: z.string(),
        name: z.string(),
        normalizedScore: z.number(),
        potentialScore: z.number(),
        qaAnswers: z.array(z.object({
          answerSources: z.array(z.object({
            answerValue: z.object({
              boolValue: z.boolean(),
              key: z.string(),
              naValue: z.boolean(),
              normalizedScore: z.number(),
              numValue: z.number(),
              potentialScore: z.number(),
              score: z.number(),
              skipValue: z.boolean(),
              strValue: z.string(),
            }),
            sourceType: z.string(),
          })),
          answerValue: z.object({
            boolValue: z.boolean(),
            key: z.string(),
            naValue: z.boolean(),
            normalizedScore: z.number(),
            numValue: z.number(),
            potentialScore: z.number(),
            score: z.number(),
            skipValue: z.boolean(),
            strValue: z.string(),
          }),
          conversation: z.string(),
          qaQuestion: z.string(),
          questionBody: z.string(),
          tags: z.array(z.string()),
        })),
        qaScorecardRevision: z.string(),
        qaTagResults: z.array(z.object({
          normalizedScore: z.number(),
          potentialScore: z.number(),
          score: z.number(),
          tag: z.string(),
        })),
        score: z.number(),
        scoreSources: z.array(z.object({
          normalizedScore: z.number(),
          potentialScore: z.number(),
          qaTagResults: z.array(z.object({
            normalizedScore: z.number(),
            potentialScore: z.number(),
            score: z.number(),
            tag: z.string(),
          })),
          score: z.number(),
          sourceType: z.string(),
        })),
      })),
      sentiments: z.array(z.object({
        channelTag: z.number(),
        sentimentData: z.object({
          magnitude: z.number(),
          score: z.number(),
        }),
      })),
      silence: z.object({
        silenceDuration: z.string(),
        silencePercentage: z.number(),
      }),
    }),
    endTime: z.string(),
  }).optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()),
    phraseMatchers: z.array(z.string()),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()),
      }),
    }),
    runAutoLabelingAnnotator: z.boolean(),
    runEntityAnnotator: z.boolean(),
    runIntentAnnotator: z.boolean(),
    runInterruptionAnnotator: z.boolean(),
    runIssueModelAnnotator: z.boolean(),
    runPhraseMatcherAnnotator: z.boolean(),
    runQaAnnotator: z.boolean(),
    runSentimentAnnotator: z.boolean(),
    runSilenceAnnotator: z.boolean(),
    runSummarizationAnnotator: z.boolean(),
    summarizationConfig: z.object({
      conversationProfile: z.string(),
      generator: z.string(),
      summarizationModel: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  name: z.string(),
  requestTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  analysisResult: z.object({
    callAnalysisMetadata: z.object({
      annotations: z.array(z.object({
        annotationEndBoundary: z.object({
          transcriptIndex: z.number().int().describe(
            "The index in the sequence of transcribed pieces of the conversation where the boundary is located. This index starts at zero.",
          ).optional(),
          wordIndex: z.number().int().describe(
            "The word index of this boundary with respect to the first word in the transcript piece. This index starts at zero.",
          ).optional(),
        }).describe(
          "A point in a conversation that marks the start or the end of an annotation.",
        ).optional(),
        annotationStartBoundary: z.object({
          transcriptIndex: z.number().int().describe(
            "The index in the sequence of transcribed pieces of the conversation where the boundary is located. This index starts at zero.",
          ).optional(),
          wordIndex: z.number().int().describe(
            "The word index of this boundary with respect to the first word in the transcript piece. This index starts at zero.",
          ).optional(),
        }).describe(
          "A point in a conversation that marks the start or the end of an annotation.",
        ).optional(),
        channelTag: z.number().int().describe(
          "The channel of the audio where the annotation occurs. For single-channel audio, this field is not populated.",
        ).optional(),
        entityMentionData: z.object({
          entityUniqueId: z.string().describe(
            "The key of this entity in conversation entities. Can be used to retrieve the exact `Entity` this mention is attached to.",
          ).optional(),
          sentiment: z.object({
            magnitude: z.number().describe(
              "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
            ).optional(),
            score: z.number().describe(
              "The sentiment score between -1.0 (negative) and 1.0 (positive).",
            ).optional(),
          }).describe("The data for a sentiment annotation.").optional(),
          type: z.enum(["MENTION_TYPE_UNSPECIFIED", "PROPER", "COMMON"])
            .describe("The type of the entity mention.").optional(),
        }).describe(
          "The data for an entity mention annotation. This represents a mention of an `Entity` in the conversation.",
        ).optional(),
        holdData: z.object({}).describe("The data for a hold annotation.")
          .optional(),
        intentMatchData: z.object({
          intentUniqueId: z.string().describe(
            "The id of the matched intent. Can be used to retrieve the corresponding intent information.",
          ).optional(),
        }).describe(
          "The data for an intent match. Represents an intent match for a text segment in the conversation. A text segment can be part of a sentence, a complete sentence, or an utterance with multiple sentences.",
        ).optional(),
        interruptionData: z.object({}).describe(
          "The data for an interruption annotation.",
        ).optional(),
        issueMatchData: z.object({
          issueAssignment: z.object({
            displayName: z.string().describe(
              "Immutable. Display name of the assigned issue. This field is set at time of analysis and immutable since then.",
            ).optional(),
            issue: z.string().describe("Resource name of the assigned issue.")
              .optional(),
            score: z.number().describe(
              "Score indicating the likelihood of the issue assignment. currently bounded on [0,1].",
            ).optional(),
          }).describe("Information about the issue.").optional(),
        }).describe("The data for an issue match annotation.").optional(),
        phraseMatchData: z.object({
          displayName: z.string().describe(
            "The human-readable name of the phrase matcher.",
          ).optional(),
          phraseMatcher: z.string().describe(
            "The unique identifier (the resource name) of the phrase matcher.",
          ).optional(),
        }).describe(
          "The data for a matched phrase matcher. Represents information identifying a phrase matcher for a given match.",
        ).optional(),
        sentimentData: z.object({
          magnitude: z.number().describe(
            "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
          ).optional(),
          score: z.number().describe(
            "The sentiment score between -1.0 (negative) and 1.0 (positive).",
          ).optional(),
        }).describe("The data for a sentiment annotation.").optional(),
        silenceData: z.object({}).describe("The data for a silence annotation.")
          .optional(),
      })).describe("A list of call annotations that apply to this call.")
        .optional(),
      entities: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The representative name for the entity.",
          ).optional(),
          metadata: z.record(z.string(), z.string()).describe(
            "Metadata associated with the entity. For most entity types, the metadata is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if they are available. For the metadata associated with other entity types, see the Type table below.",
          ).optional(),
          salience: z.number().describe(
            "The salience score associated with the entity in the [0, 1.0] range. The salience score for an entity provides information about the importance or centrality of that entity to the entire document text. Scores closer to 0 are less salient, while scores closer to 1.0 are highly salient.",
          ).optional(),
          sentiment: z.object({
            magnitude: z.number().describe(
              "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
            ).optional(),
            score: z.number().describe(
              "The sentiment score between -1.0 (negative) and 1.0 (positive).",
            ).optional(),
          }).describe("The data for a sentiment annotation.").optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "PERSON",
            "LOCATION",
            "ORGANIZATION",
            "EVENT",
            "WORK_OF_ART",
            "CONSUMER_GOOD",
            "OTHER",
            "PHONE_NUMBER",
            "ADDRESS",
            "DATE",
            "NUMBER",
            "PRICE",
          ]).describe("The entity type.").optional(),
        }),
      ).describe("All the entities in the call.").optional(),
      intents: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The human-readable name of the intent.",
          ).optional(),
          id: z.string().describe("The unique identifier of the intent.")
            .optional(),
        }),
      ).describe("All the matched intents in the call.").optional(),
      issueModelResult: z.object({
        issueModel: z.string().describe(
          "Issue model that generates the result. Format: projects/{project}/locations/{location}/issueModels/{issue_model}",
        ).optional(),
        issues: z.array(z.object({
          displayName: z.string().describe(
            "Immutable. Display name of the assigned issue. This field is set at time of analysis and immutable since then.",
          ).optional(),
          issue: z.string().describe("Resource name of the assigned issue.")
            .optional(),
          score: z.number().describe(
            "Score indicating the likelihood of the issue assignment. currently bounded on [0,1].",
          ).optional(),
        })).describe("All the matched issues.").optional(),
      }).describe("Issue Modeling result on a conversation.").optional(),
      phraseMatchers: z.record(
        z.string(),
        z.object({
          displayName: z.string().describe(
            "The human-readable name of the phrase matcher.",
          ).optional(),
          phraseMatcher: z.string().describe(
            "The unique identifier (the resource name) of the phrase matcher.",
          ).optional(),
        }),
      ).describe("All the matched phrase matchers in the call.").optional(),
      qaScorecardResults: z.array(z.object({
        agentId: z.string().describe(
          "ID of the agent that handled the conversation.",
        ).optional(),
        conversation: z.string().describe(
          "The conversation scored by this result.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The timestamp that the revision was created.",
        ).optional(),
        name: z.string().describe(
          "Identifier. The name of the scorecard result. Format: projects/{project}/locations/{location}/qaScorecardResults/{qa_scorecard_result}",
        ).optional(),
        normalizedScore: z.number().describe(
          "The normalized score, which is the score divided by the potential score. Any manual edits are included if they exist.",
        ).optional(),
        potentialScore: z.number().describe(
          "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
        ).optional(),
        qaAnswers: z.array(z.object({
          answerSources: z.array(z.object({
            answerValue: z.object({
              boolValue: z.boolean().describe("Boolean value.").optional(),
              key: z.string().describe(
                "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
              ).optional(),
              naValue: z.boolean().describe(
                'A value of "Not Applicable (N/A)". Should only ever be `true`.',
              ).optional(),
              normalizedScore: z.number().describe(
                "Output only. Normalized score of the questions. Calculated as score / potential_score.",
              ).optional(),
              numValue: z.number().describe("Numerical value.").optional(),
              potentialScore: z.number().describe(
                "Output only. The maximum potential score of the question.",
              ).optional(),
              score: z.number().describe(
                "Output only. Numerical score of the answer.",
              ).optional(),
              skipValue: z.boolean().describe(
                'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
              ).optional(),
              strValue: z.string().describe("String value.").optional(),
            }).describe(
              "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
            ).optional(),
            sourceType: z.enum([
              "SOURCE_TYPE_UNSPECIFIED",
              "SYSTEM_GENERATED",
              "MANUAL_EDIT",
            ]).describe("What created the answer.").optional(),
          })).describe(
            "Lists all answer sources containing one or more answer values of a specific source type, e.g., all system-generated answer sources, or all manual edit answer sources.",
          ).optional(),
          answerValue: z.object({
            boolValue: z.boolean().describe("Boolean value.").optional(),
            key: z.string().describe(
              "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
            ).optional(),
            naValue: z.boolean().describe(
              'A value of "Not Applicable (N/A)". Should only ever be `true`.',
            ).optional(),
            normalizedScore: z.number().describe(
              "Output only. Normalized score of the questions. Calculated as score / potential_score.",
            ).optional(),
            numValue: z.number().describe("Numerical value.").optional(),
            potentialScore: z.number().describe(
              "Output only. The maximum potential score of the question.",
            ).optional(),
            score: z.number().describe(
              "Output only. Numerical score of the answer.",
            ).optional(),
            skipValue: z.boolean().describe(
              'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
            ).optional(),
            strValue: z.string().describe("String value.").optional(),
          }).describe(
            "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
          ).optional(),
          conversation: z.string().describe(
            "The conversation the answer applies to.",
          ).optional(),
          qaQuestion: z.string().describe(
            "The QaQuestion answered by this answer.",
          ).optional(),
          questionBody: z.string().describe(
            'Question text. E.g., "Did the agent greet the customer?"',
          ).optional(),
          tags: z.array(z.string()).describe(
            "User-defined list of arbitrary tags. Matches the value from QaScorecard.ScorecardQuestion.tags. Used for grouping/organization and for weighting the score of each answer.",
          ).optional(),
        })).describe("Set of QaAnswers represented in the result.").optional(),
        qaScorecardRevision: z.string().describe(
          "The QaScorecardRevision scored by this result.",
        ).optional(),
        qaTagResults: z.array(z.object({
          normalizedScore: z.number().describe(
            "The normalized score the tag applies to.",
          ).optional(),
          potentialScore: z.number().describe(
            "The potential score the tag applies to.",
          ).optional(),
          score: z.number().describe("The score the tag applies to.")
            .optional(),
          tag: z.string().describe("The tag the score applies to.").optional(),
        })).describe("Collection of tags and their scores.").optional(),
        score: z.number().describe(
          "The overall numerical score of the result, incorporating any manual edits if they exist.",
        ).optional(),
        scoreSources: z.array(z.object({
          normalizedScore: z.number().describe(
            "The normalized score, which is the score divided by the potential score.",
          ).optional(),
          potentialScore: z.number().describe(
            "The maximum potential overall score of the scorecard. Any questions answered using `na_value` are excluded from this calculation.",
          ).optional(),
          qaTagResults: z.array(z.object({
            normalizedScore: z.number().describe(
              "The normalized score the tag applies to.",
            ).optional(),
            potentialScore: z.number().describe(
              "The potential score the tag applies to.",
            ).optional(),
            score: z.number().describe("The score the tag applies to.")
              .optional(),
            tag: z.string().describe("The tag the score applies to.")
              .optional(),
          })).describe("Collection of tags and their scores.").optional(),
          score: z.number().describe(
            "The overall numerical score of the result.",
          ).optional(),
          sourceType: z.enum([
            "SOURCE_TYPE_UNSPECIFIED",
            "SYSTEM_GENERATED_ONLY",
            "INCLUDES_MANUAL_EDITS",
          ]).describe("What created the score.").optional(),
        })).describe("List of all individual score sets.").optional(),
      })).describe("Results of scoring QaScorecards.").optional(),
      sentiments: z.array(z.object({
        channelTag: z.number().int().describe(
          "The channel of the audio that the data applies to.",
        ).optional(),
        sentimentData: z.object({
          magnitude: z.number().describe(
            "A non-negative number from 0 to infinity which represents the absolute magnitude of sentiment regardless of score.",
          ).optional(),
          score: z.number().describe(
            "The sentiment score between -1.0 (negative) and 1.0 (positive).",
          ).optional(),
        }).describe("The data for a sentiment annotation.").optional(),
      })).describe(
        "Overall conversation-level sentiment for each channel of the call.",
      ).optional(),
      silence: z.object({
        silenceDuration: z.string().describe(
          "Amount of time calculated to be in silence.",
        ).optional(),
        silencePercentage: z.number().describe(
          "Percentage of the total conversation spent in silence.",
        ).optional(),
      }).describe("Conversation-level silence data.").optional(),
    }).describe("Call-specific metadata created during analysis.").optional(),
    endTime: z.string().describe("The time at which the analysis ended.")
      .optional(),
  }).describe("The result of an analysis.").optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()).describe(
      "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
    ).optional(),
    phraseMatchers: z.array(z.string()).describe(
      "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
    ).optional(),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()).describe(
          "List of QaScorecardRevisions.",
        ).optional(),
      }).describe("Container for a list of scorecards.").optional(),
    }).describe("Configuration for the QA feature.").optional(),
    runAutoLabelingAnnotator: z.boolean().describe(
      "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
    ).optional(),
    runEntityAnnotator: z.boolean().describe(
      "Whether to run the entity annotator.",
    ).optional(),
    runIntentAnnotator: z.boolean().describe(
      "Whether to run the intent annotator.",
    ).optional(),
    runInterruptionAnnotator: z.boolean().describe(
      "Whether to run the interruption annotator.",
    ).optional(),
    runIssueModelAnnotator: z.boolean().describe(
      "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
    ).optional(),
    runPhraseMatcherAnnotator: z.boolean().describe(
      "Whether to run the active phrase matcher annotator(s).",
    ).optional(),
    runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
      .optional(),
    runSentimentAnnotator: z.boolean().describe(
      "Whether to run the sentiment annotator.",
    ).optional(),
    runSilenceAnnotator: z.boolean().describe(
      "Whether to run the silence annotator.",
    ).optional(),
    runSummarizationAnnotator: z.boolean().describe(
      "Whether to run the summarization annotator.",
    ).optional(),
    summarizationConfig: z.object({
      conversationProfile: z.string().describe(
        "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
      ).optional(),
      generator: z.string().describe(
        "The resource name of the existing created generator. Format: projects//locations//generators/",
      ).optional(),
      summarizationModel: z.enum([
        "SUMMARIZATION_MODEL_UNSPECIFIED",
        "BASELINE_MODEL",
        "BASELINE_MODEL_V2_0",
      ]).describe("Default summarization model to be used.").optional(),
    }).describe("Configuration for summarization.").optional(),
  }).describe(
    "Selector of all available annotators and phrase matchers to run.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the analysis. Format: projects/{project}/locations/{location}/conversations/{conversation}/analyses/{analysis}",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/contactcenterinsights/conversations-analyses",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The analysis resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a analyses",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["analysisResult"] !== undefined) {
          body["analysisResult"] = g["analysisResult"];
        }
        if (g["annotatorSelector"] !== undefined) {
          body["annotatorSelector"] = g["annotatorSelector"];
        }
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
      description: "Get a analyses",
      arguments: z.object({
        identifier: z.string().describe("The name of the analyses"),
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
    delete: {
      description: "Delete the analyses",
      arguments: z.object({
        identifier: z.string().describe("The name of the analyses"),
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
      description: "Sync analyses state from GCP",
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
