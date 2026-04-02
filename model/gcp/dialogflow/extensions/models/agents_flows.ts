// Auto-generated extension model for @swamp/gcp/dialogflow/agents-flows
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
  return `${parent}/flows/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.get",
  "path": "v3/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.create",
  "path": "v3/{+parent}/flows",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.flows.patch",
  "path": "v3/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
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
  "id": "dialogflow.projects.locations.agents.flows.delete",
  "path": "v3/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  eventHandlers: z.array(z.object({
    event: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    targetPlaybook: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    enabled: z.boolean().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  }).optional(),
  locked: z.boolean().optional(),
  multiLanguageSettings: z.object({
    enableMultiLanguageDetection: z.boolean().optional(),
    supportedResponseLanguageCodes: z.array(z.string()).optional(),
  }).optional(),
  name: z.string().optional(),
  nluSettings: z.object({
    classificationThreshold: z.number().optional(),
    modelTrainingMode: z.enum([
      "MODEL_TRAINING_MODE_UNSPECIFIED",
      "MODEL_TRAINING_MODE_AUTOMATIC",
      "MODEL_TRAINING_MODE_MANUAL",
    ]).optional(),
    modelType: z.enum([
      "MODEL_TYPE_UNSPECIFIED",
      "MODEL_TYPE_STANDARD",
      "MODEL_TYPE_ADVANCED",
    ]).optional(),
  }).optional(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string().optional(),
    description: z.string().optional(),
    intent: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string(),
    }),
    dtmfSettings: z.object({
      enabled: z.boolean(),
      endpointingTimeoutDuration: z.string(),
      finishDigit: z.string(),
      interdigitTimeoutDuration: z.string(),
      maxDigits: z.number(),
    }),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean(),
      enableInteractionLogging: z.boolean(),
      enableStackdriverLogging: z.boolean(),
    }),
    speechSettings: z.object({
      endpointerSensitivity: z.number(),
      models: z.record(z.string(), z.unknown()),
      noSpeechTimeout: z.string(),
      useTimeoutBasedEndpointing: z.boolean(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  eventHandlers: z.array(z.object({
    event: z.string(),
    name: z.string(),
    targetFlow: z.string(),
    targetPage: z.string(),
    targetPlaybook: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string(),
        }),
        dtmfSettings: z.object({
          enabled: z.boolean(),
          endpointingTimeoutDuration: z.string(),
          finishDigit: z.string(),
          interdigitTimeoutDuration: z.string(),
          maxDigits: z.number(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean(),
          enableInteractionLogging: z.boolean(),
          enableStackdriverLogging: z.boolean(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.number(),
          models: z.record(z.string(), z.unknown()),
          noSpeechTimeout: z.string(),
          useTimeoutBasedEndpointing: z.boolean(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string(),
            message: z.object({
              channel: z.string(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              endInteraction: z.object({}),
              knowledgeInfoCard: z.object({}),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean(),
                  audio: z.string(),
                  uri: z.string(),
                })),
              }),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean(),
                ssml: z.string(),
                text: z.string(),
              }),
              payload: z.record(z.string(), z.unknown()),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean(),
                audioUri: z.string(),
              }),
              responseType: z.string(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string(),
              }),
              text: z.object({
                allowPlaybackInterruption: z.boolean(),
                text: z.array(z.string()),
              }),
              toolCall: z.object({
                action: z.string(),
                inputParameters: z.record(z.string(), z.unknown()),
                tool: z.string(),
              }),
            }),
          })),
          condition: z.string(),
        })),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.string(),
        inputParameters: z.record(z.string(), z.unknown()),
        outputParameter: z.string(),
      })),
      messages: z.array(z.object({
        channel: z.string(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        endInteraction: z.object({}),
        knowledgeInfoCard: z.object({}),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean(),
            audio: z.string(),
            uri: z.string(),
          })),
        }),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean(),
          ssml: z.string(),
          text: z.string(),
        }),
        payload: z.record(z.string(), z.unknown()),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean(),
          audioUri: z.string(),
        }),
        responseType: z.string(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string(),
        }),
        text: z.object({
          allowPlaybackInterruption: z.boolean(),
          text: z.array(z.string()),
        }),
        toolCall: z.object({
          action: z.string(),
          inputParameters: z.record(z.string(), z.unknown()),
          tool: z.string(),
        }),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.string(),
        value: z.string(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  })).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string(),
    name: z.string(),
    type: z.string(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string(),
        type: z.string(),
      }),
      schemaReference: z.object({
        schema: z.string(),
        tool: z.string(),
      }),
    }),
  })).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string(),
      dataStoreType: z.string(),
      documentProcessingMode: z.string(),
    })),
    enabled: z.boolean(),
    targetFlow: z.string(),
    targetPage: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string(),
        }),
        dtmfSettings: z.object({
          enabled: z.boolean(),
          endpointingTimeoutDuration: z.string(),
          finishDigit: z.string(),
          interdigitTimeoutDuration: z.string(),
          maxDigits: z.number(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean(),
          enableInteractionLogging: z.boolean(),
          enableStackdriverLogging: z.boolean(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.number(),
          models: z.record(z.string(), z.unknown()),
          noSpeechTimeout: z.string(),
          useTimeoutBasedEndpointing: z.boolean(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string(),
            message: z.object({
              channel: z.string(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              endInteraction: z.object({}),
              knowledgeInfoCard: z.object({}),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean(),
                  audio: z.string(),
                  uri: z.string(),
                })),
              }),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean(),
                ssml: z.string(),
                text: z.string(),
              }),
              payload: z.record(z.string(), z.unknown()),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean(),
                audioUri: z.string(),
              }),
              responseType: z.string(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string(),
              }),
              text: z.object({
                allowPlaybackInterruption: z.boolean(),
                text: z.array(z.string()),
              }),
              toolCall: z.object({
                action: z.string(),
                inputParameters: z.record(z.string(), z.unknown()),
                tool: z.string(),
              }),
            }),
          })),
          condition: z.string(),
        })),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.string(),
        inputParameters: z.record(z.string(), z.unknown()),
        outputParameter: z.string(),
      })),
      messages: z.array(z.object({
        channel: z.string(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        endInteraction: z.object({}),
        knowledgeInfoCard: z.object({}),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean(),
            audio: z.string(),
            uri: z.string(),
          })),
        }),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean(),
          ssml: z.string(),
          text: z.string(),
        }),
        payload: z.record(z.string(), z.unknown()),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean(),
          audioUri: z.string(),
        }),
        responseType: z.string(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string(),
        }),
        text: z.object({
          allowPlaybackInterruption: z.boolean(),
          text: z.array(z.string()),
        }),
        toolCall: z.object({
          action: z.string(),
          inputParameters: z.record(z.string(), z.unknown()),
          tool: z.string(),
        }),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.string(),
        value: z.string(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  }).optional(),
  locked: z.boolean().optional(),
  multiLanguageSettings: z.object({
    enableMultiLanguageDetection: z.boolean(),
    supportedResponseLanguageCodes: z.array(z.string()),
  }).optional(),
  name: z.string(),
  nluSettings: z.object({
    classificationThreshold: z.number(),
    modelTrainingMode: z.string(),
    modelType: z.string(),
  }).optional(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string(),
    name: z.string(),
    type: z.string(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string(),
        type: z.string(),
      }),
      schemaReference: z.object({
        schema: z.string(),
        tool: z.string(),
      }),
    }),
  })).optional(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string(),
    description: z.string(),
    intent: z.string(),
    name: z.string(),
    targetFlow: z.string(),
    targetPage: z.string(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string(),
        }),
        dtmfSettings: z.object({
          enabled: z.boolean(),
          endpointingTimeoutDuration: z.string(),
          finishDigit: z.string(),
          interdigitTimeoutDuration: z.string(),
          maxDigits: z.number(),
        }),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean(),
          enableInteractionLogging: z.boolean(),
          enableStackdriverLogging: z.boolean(),
        }),
        speechSettings: z.object({
          endpointerSensitivity: z.number(),
          models: z.record(z.string(), z.unknown()),
          noSpeechTimeout: z.string(),
          useTimeoutBasedEndpointing: z.boolean(),
        }),
      }),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string(),
            message: z.object({
              channel: z.string(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              endInteraction: z.object({}),
              knowledgeInfoCard: z.object({}),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.unknown()),
              }),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean(),
                  audio: z.string(),
                  uri: z.string(),
                })),
              }),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean(),
                ssml: z.string(),
                text: z.string(),
              }),
              payload: z.record(z.string(), z.unknown()),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean(),
                audioUri: z.string(),
              }),
              responseType: z.string(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string(),
              }),
              text: z.object({
                allowPlaybackInterruption: z.boolean(),
                text: z.array(z.string()),
              }),
              toolCall: z.object({
                action: z.string(),
                inputParameters: z.record(z.string(), z.unknown()),
                tool: z.string(),
              }),
            }),
          })),
          condition: z.string(),
        })),
      })),
      enableGenerativeFallback: z.boolean(),
      generators: z.array(z.object({
        generator: z.string(),
        inputParameters: z.record(z.string(), z.unknown()),
        outputParameter: z.string(),
      })),
      messages: z.array(z.object({
        channel: z.string(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        endInteraction: z.object({}),
        knowledgeInfoCard: z.object({}),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.unknown()),
        }),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean(),
            audio: z.string(),
            uri: z.string(),
          })),
        }),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean(),
          ssml: z.string(),
          text: z.string(),
        }),
        payload: z.record(z.string(), z.unknown()),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean(),
          audioUri: z.string(),
        }),
        responseType: z.string(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string(),
        }),
        text: z.object({
          allowPlaybackInterruption: z.boolean(),
          text: z.array(z.string()),
        }),
        toolCall: z.object({
          action: z.string(),
          inputParameters: z.record(z.string(), z.unknown()),
          tool: z.string(),
        }),
      })),
      returnPartialResponses: z.boolean(),
      setParameterActions: z.array(z.object({
        parameter: z.string(),
        value: z.string(),
      })),
      tag: z.string(),
      webhook: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advancedSettings: z.object({
    audioExportGcsDestination: z.object({
      uri: z.string().optional(),
    }).optional(),
    dtmfSettings: z.object({
      enabled: z.boolean().optional(),
      endpointingTimeoutDuration: z.string().optional(),
      finishDigit: z.string().optional(),
      interdigitTimeoutDuration: z.string().optional(),
      maxDigits: z.number().int().optional(),
    }).optional(),
    loggingSettings: z.object({
      enableConsentBasedRedaction: z.boolean().optional(),
      enableInteractionLogging: z.boolean().optional(),
      enableStackdriverLogging: z.boolean().optional(),
    }).optional(),
    speechSettings: z.object({
      endpointerSensitivity: z.number().int().optional(),
      models: z.record(z.string(), z.string()).optional(),
      noSpeechTimeout: z.string().optional(),
      useTimeoutBasedEndpointing: z.boolean().optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  eventHandlers: z.array(z.object({
    event: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    targetPlaybook: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  inputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  knowledgeConnectorSettings: z.object({
    dataStoreConnections: z.array(z.object({
      dataStore: z.string().optional(),
      dataStoreType: z.enum([
        "DATA_STORE_TYPE_UNSPECIFIED",
        "PUBLIC_WEB",
        "UNSTRUCTURED",
        "STRUCTURED",
      ]).optional(),
      documentProcessingMode: z.enum([
        "DOCUMENT_PROCESSING_MODE_UNSPECIFIED",
        "DOCUMENTS",
        "CHUNKS",
      ]).optional(),
    })).optional(),
    enabled: z.boolean().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  }).optional(),
  locked: z.boolean().optional(),
  multiLanguageSettings: z.object({
    enableMultiLanguageDetection: z.boolean().optional(),
    supportedResponseLanguageCodes: z.array(z.string()).optional(),
  }).optional(),
  name: z.string().optional(),
  nluSettings: z.object({
    classificationThreshold: z.number().optional(),
    modelTrainingMode: z.enum([
      "MODEL_TRAINING_MODE_UNSPECIFIED",
      "MODEL_TRAINING_MODE_AUTOMATIC",
      "MODEL_TRAINING_MODE_MANUAL",
    ]).optional(),
    modelType: z.enum([
      "MODEL_TYPE_UNSPECIFIED",
      "MODEL_TYPE_STANDARD",
      "MODEL_TYPE_ADVANCED",
    ]).optional(),
  }).optional(),
  outputParameterDefinitions: z.array(z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    type: z.enum([
      "PARAMETER_TYPE_UNSPECIFIED",
      "STRING",
      "NUMBER",
      "BOOLEAN",
      "NULL",
      "OBJECT",
      "LIST",
    ]).optional(),
    typeSchema: z.object({
      inlineSchema: z.object({
        items: z.string().describe(
          "Circular reference to GoogleCloudDialogflowCxV3TypeSchema",
        ).optional(),
        type: z.enum([
          "DATA_TYPE_UNSPECIFIED",
          "STRING",
          "NUMBER",
          "BOOLEAN",
          "ARRAY",
        ]).optional(),
      }).optional(),
      schemaReference: z.object({
        schema: z.string().optional(),
        tool: z.string().optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  transitionRouteGroups: z.array(z.string()).optional(),
  transitionRoutes: z.array(z.object({
    condition: z.string().optional(),
    description: z.string().optional(),
    intent: z.string().optional(),
    name: z.string().optional(),
    targetFlow: z.string().optional(),
    targetPage: z.string().optional(),
    triggerFulfillment: z.object({
      advancedSettings: z.object({
        audioExportGcsDestination: z.object({
          uri: z.string().optional(),
        }).optional(),
        dtmfSettings: z.object({
          enabled: z.boolean().optional(),
          endpointingTimeoutDuration: z.string().optional(),
          finishDigit: z.string().optional(),
          interdigitTimeoutDuration: z.string().optional(),
          maxDigits: z.number().int().optional(),
        }).optional(),
        loggingSettings: z.object({
          enableConsentBasedRedaction: z.boolean().optional(),
          enableInteractionLogging: z.boolean().optional(),
          enableStackdriverLogging: z.boolean().optional(),
        }).optional(),
        speechSettings: z.object({
          endpointerSensitivity: z.number().int().optional(),
          models: z.record(z.string(), z.string()).optional(),
          noSpeechTimeout: z.string().optional(),
          useTimeoutBasedEndpointing: z.boolean().optional(),
        }).optional(),
      }).optional(),
      conditionalCases: z.array(z.object({
        cases: z.array(z.object({
          caseContent: z.array(z.object({
            additionalCases: z.string().describe(
              "Circular reference to GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
            ).optional(),
            message: z.object({
              channel: z.string().optional(),
              conversationSuccess: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              endInteraction: z.object({}).optional(),
              knowledgeInfoCard: z.object({}).optional(),
              liveAgentHandoff: z.object({
                metadata: z.record(z.string(), z.string()).optional(),
              }).optional(),
              mixedAudio: z.object({
                segments: z.array(z.object({
                  allowPlaybackInterruption: z.boolean().optional(),
                  audio: z.string().optional(),
                  uri: z.string().optional(),
                })).optional(),
              }).optional(),
              outputAudioText: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                ssml: z.string().optional(),
                text: z.string().optional(),
              }).optional(),
              payload: z.record(z.string(), z.string()).optional(),
              playAudio: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                audioUri: z.string().optional(),
              }).optional(),
              responseType: z.enum([
                "RESPONSE_TYPE_UNSPECIFIED",
                "ENTRY_PROMPT",
                "PARAMETER_PROMPT",
                "HANDLER_PROMPT",
              ]).optional(),
              telephonyTransferCall: z.object({
                phoneNumber: z.string().optional(),
              }).optional(),
              text: z.object({
                allowPlaybackInterruption: z.boolean().optional(),
                text: z.array(z.string()).optional(),
              }).optional(),
              toolCall: z.object({
                action: z.string().optional(),
                inputParameters: z.record(z.string(), z.string()).optional(),
                tool: z.string().optional(),
              }).optional(),
            }).optional(),
          })).optional(),
          condition: z.string().optional(),
        })).optional(),
      })).optional(),
      enableGenerativeFallback: z.boolean().optional(),
      generators: z.array(z.object({
        generator: z.string().optional(),
        inputParameters: z.record(z.string(), z.string()).optional(),
        outputParameter: z.string().optional(),
      })).optional(),
      messages: z.array(z.object({
        channel: z.string().optional(),
        conversationSuccess: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        endInteraction: z.object({}).optional(),
        knowledgeInfoCard: z.object({}).optional(),
        liveAgentHandoff: z.object({
          metadata: z.record(z.string(), z.string()).optional(),
        }).optional(),
        mixedAudio: z.object({
          segments: z.array(z.object({
            allowPlaybackInterruption: z.boolean().optional(),
            audio: z.string().optional(),
            uri: z.string().optional(),
          })).optional(),
        }).optional(),
        outputAudioText: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          ssml: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional(),
        playAudio: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          audioUri: z.string().optional(),
        }).optional(),
        responseType: z.enum([
          "RESPONSE_TYPE_UNSPECIFIED",
          "ENTRY_PROMPT",
          "PARAMETER_PROMPT",
          "HANDLER_PROMPT",
        ]).optional(),
        telephonyTransferCall: z.object({
          phoneNumber: z.string().optional(),
        }).optional(),
        text: z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        }).optional(),
        toolCall: z.object({
          action: z.string().optional(),
          inputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      })).optional(),
      returnPartialResponses: z.boolean().optional(),
      setParameterActions: z.array(z.object({
        parameter: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      tag: z.string().optional(),
      webhook: z.string().optional(),
    }).optional(),
  })).optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dialogflow/agents-flows",
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
      description: "GCP dialogflow Agents.Flows resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a flows",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["eventHandlers"] !== undefined) {
          body["eventHandlers"] = g["eventHandlers"];
        }
        if (g["inputParameterDefinitions"] !== undefined) {
          body["inputParameterDefinitions"] = g["inputParameterDefinitions"];
        }
        if (g["knowledgeConnectorSettings"] !== undefined) {
          body["knowledgeConnectorSettings"] = g["knowledgeConnectorSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["multiLanguageSettings"] !== undefined) {
          body["multiLanguageSettings"] = g["multiLanguageSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nluSettings"] !== undefined) {
          body["nluSettings"] = g["nluSettings"];
        }
        if (g["outputParameterDefinitions"] !== undefined) {
          body["outputParameterDefinitions"] = g["outputParameterDefinitions"];
        }
        if (g["transitionRouteGroups"] !== undefined) {
          body["transitionRouteGroups"] = g["transitionRouteGroups"];
        }
        if (g["transitionRoutes"] !== undefined) {
          body["transitionRoutes"] = g["transitionRoutes"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
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
      description: "Get a flows",
      arguments: z.object({
        identifier: z.string().describe("The name of the flows"),
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
      description: "Update flows attributes",
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
        if (g["advancedSettings"] !== undefined) {
          body["advancedSettings"] = g["advancedSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["eventHandlers"] !== undefined) {
          body["eventHandlers"] = g["eventHandlers"];
        }
        if (g["inputParameterDefinitions"] !== undefined) {
          body["inputParameterDefinitions"] = g["inputParameterDefinitions"];
        }
        if (g["knowledgeConnectorSettings"] !== undefined) {
          body["knowledgeConnectorSettings"] = g["knowledgeConnectorSettings"];
        }
        if (g["locked"] !== undefined) body["locked"] = g["locked"];
        if (g["multiLanguageSettings"] !== undefined) {
          body["multiLanguageSettings"] = g["multiLanguageSettings"];
        }
        if (g["nluSettings"] !== undefined) {
          body["nluSettings"] = g["nluSettings"];
        }
        if (g["outputParameterDefinitions"] !== undefined) {
          body["outputParameterDefinitions"] = g["outputParameterDefinitions"];
        }
        if (g["transitionRouteGroups"] !== undefined) {
          body["transitionRouteGroups"] = g["transitionRouteGroups"];
        }
        if (g["transitionRoutes"] !== undefined) {
          body["transitionRoutes"] = g["transitionRoutes"];
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
      description: "Delete the flows",
      arguments: z.object({
        identifier: z.string().describe("The name of the flows"),
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
      description: "Sync flows state from GCP",
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
    export: {
      description: "export",
      arguments: z.object({
        flowUri: z.any().optional(),
        includeReferencedFlows: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["flowUri"] !== undefined) body["flowUri"] = args["flowUri"];
        if (args["includeReferencedFlows"] !== undefined) {
          body["includeReferencedFlows"] = args["includeReferencedFlows"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.flows.export",
            "path": "v3/{+name}:export",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_validation_result: {
      description: "get validation result",
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
            "id":
              "dialogflow.projects.locations.agents.flows.getValidationResult",
            "path": "v3/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "languageCode": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        flowContent: z.any().optional(),
        flowImportStrategy: z.any().optional(),
        flowUri: z.any().optional(),
        importOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["flowContent"] !== undefined) {
          body["flowContent"] = args["flowContent"];
        }
        if (args["flowImportStrategy"] !== undefined) {
          body["flowImportStrategy"] = args["flowImportStrategy"];
        }
        if (args["flowUri"] !== undefined) body["flowUri"] = args["flowUri"];
        if (args["importOption"] !== undefined) {
          body["importOption"] = args["importOption"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.flows.import",
            "path": "v3/{+parent}/flows:import",
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
    train: {
      description: "train",
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
            "id": "dialogflow.projects.locations.agents.flows.train",
            "path": "v3/{+name}:train",
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
    validate: {
      description: "validate",
      arguments: z.object({
        languageCode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.flows.validate",
            "path": "v3/{+name}:validate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
