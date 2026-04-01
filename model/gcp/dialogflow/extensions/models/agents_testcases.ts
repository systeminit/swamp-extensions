// Auto-generated extension model for @swamp/gcp/dialogflow/agents-testcases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/testCases/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.testCases.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.testCases.create",
  "path": "v3/{+parent}/testCases",
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
  "id": "dialogflow.projects.locations.agents.testCases.patch",
  "path": "v3/{+name}",
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

const GlobalArgsSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean().optional(),
        injectedParameters: z.record(z.string(), z.string()).optional(),
        input: z.object({
          audio: z.object({
            audio: z.string().optional(),
            config: z.object({
              audioEncoding: z.enum([
                "AUDIO_ENCODING_UNSPECIFIED",
                "AUDIO_ENCODING_LINEAR_16",
                "AUDIO_ENCODING_FLAC",
                "AUDIO_ENCODING_MULAW",
                "AUDIO_ENCODING_AMR",
                "AUDIO_ENCODING_AMR_WB",
                "AUDIO_ENCODING_OGG_OPUS",
                "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
                "AUDIO_ENCODING_ALAW",
              ]).optional(),
              bargeInConfig: z.object({
                noBargeInDuration: z.string().optional(),
                totalDuration: z.string().optional(),
              }).optional(),
              enableWordInfo: z.boolean().optional(),
              model: z.string().optional(),
              modelVariant: z.enum([
                "SPEECH_MODEL_VARIANT_UNSPECIFIED",
                "USE_BEST_AVAILABLE",
                "USE_STANDARD",
                "USE_ENHANCED",
              ]).optional(),
              optOutConformerModelMigration: z.boolean().optional(),
              phraseHints: z.array(z.string()).optional(),
              sampleRateHertz: z.number().int().optional(),
              singleUtterance: z.boolean().optional(),
            }).optional(),
          }).optional(),
          dtmf: z.object({
            digits: z.string().optional(),
            finishDigit: z.string().optional(),
          }).optional(),
          event: z.object({
            event: z.string().optional(),
          }).optional(),
          intent: z.object({
            intent: z.string().optional(),
          }).optional(),
          languageCode: z.string().optional(),
          text: z.object({
            text: z.string().optional(),
          }).optional(),
          toolCallResult: z.object({
            action: z.string().optional(),
            error: z.object({
              message: z.string().optional(),
            }).optional(),
            outputParameters: z.record(z.string(), z.string()).optional(),
            tool: z.string().optional(),
          }).optional(),
        }).optional(),
        isWebhookEnabled: z.boolean().optional(),
      }).optional(),
      virtualAgentOutput: z.object({
        currentPage: z.object({
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
          entryFulfillment: z.object({
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
          form: z.object({
            parameters: z.array(z.object({
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
              defaultValue: z.string().optional(),
              displayName: z.string().optional(),
              entityType: z.string().optional(),
              fillBehavior: z.object({
                initialPromptFulfillment: z.object({
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
                            metadata: z.record(z.string(), z.string())
                              .optional(),
                          }).optional(),
                          endInteraction: z.object({}).optional(),
                          knowledgeInfoCard: z.object({}).optional(),
                          liveAgentHandoff: z.object({
                            metadata: z.record(z.string(), z.string())
                              .optional(),
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
                            inputParameters: z.record(z.string(), z.string())
                              .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                repromptEventHandlers: z.array(z.object({
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
                              metadata: z.record(z.string(), z.string())
                                .optional(),
                            }).optional(),
                            endInteraction: z.object({}).optional(),
                            knowledgeInfoCard: z.object({}).optional(),
                            liveAgentHandoff: z.object({
                              metadata: z.record(z.string(), z.string())
                                .optional(),
                            }).optional(),
                            mixedAudio: z.object({
                              segments: z.array(z.object({
                                allowPlaybackInterruption: z.boolean()
                                  .optional(),
                                audio: z.string().optional(),
                                uri: z.string().optional(),
                              })).optional(),
                            }).optional(),
                            outputAudioText: z.object({
                              allowPlaybackInterruption: z.boolean().optional(),
                              ssml: z.string().optional(),
                              text: z.string().optional(),
                            }).optional(),
                            payload: z.record(z.string(), z.string())
                              .optional(),
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
                              inputParameters: z.record(z.string(), z.string())
                                .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
              }).optional(),
              isList: z.boolean().optional(),
              redact: z.boolean().optional(),
              required: z.boolean().optional(),
            })).optional(),
          }).optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
          name: z.string().optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
        }).optional(),
        diagnosticInfo: z.record(z.string(), z.string()).optional(),
        differences: z.array(z.object({
          description: z.string().optional(),
          type: z.enum([
            "DIFF_TYPE_UNSPECIFIED",
            "INTENT",
            "PAGE",
            "PARAMETERS",
            "UTTERANCE",
            "FLOW",
          ]).optional(),
        })).optional(),
        sessionParameters: z.record(z.string(), z.string()).optional(),
        status: z.object({
          code: z.number().int().optional(),
          details: z.array(z.record(z.string(), z.string())).optional(),
          message: z.string().optional(),
        }).optional(),
        textResponses: z.array(z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        })).optional(),
        triggeredIntent: z.object({
          description: z.string().optional(),
          displayName: z.string().optional(),
          dtmfPattern: z.string().optional(),
          isFallback: z.boolean().optional(),
          labels: z.record(z.string(), z.string()).optional(),
          name: z.string().optional(),
          parameters: z.array(z.object({
            entityType: z.string().optional(),
            id: z.string().optional(),
            isList: z.boolean().optional(),
            redact: z.boolean().optional(),
          })).optional(),
          priority: z.number().int().optional(),
          trainingPhrases: z.array(z.object({
            id: z.string().optional(),
            parts: z.array(z.object({
              parameterId: z.string().optional(),
              text: z.string().optional(),
            })).optional(),
            repeatCount: z.number().int().optional(),
          })).optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    environment: z.string().optional(),
    name: z.string().optional(),
    testResult: z.enum(["TEST_RESULT_UNSPECIFIED", "PASSED", "FAILED"])
      .optional(),
    testTime: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean().optional(),
      injectedParameters: z.record(z.string(), z.string()).optional(),
      input: z.object({
        audio: z.object({
          audio: z.string().optional(),
          config: z.object({
            audioEncoding: z.enum([
              "AUDIO_ENCODING_UNSPECIFIED",
              "AUDIO_ENCODING_LINEAR_16",
              "AUDIO_ENCODING_FLAC",
              "AUDIO_ENCODING_MULAW",
              "AUDIO_ENCODING_AMR",
              "AUDIO_ENCODING_AMR_WB",
              "AUDIO_ENCODING_OGG_OPUS",
              "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
              "AUDIO_ENCODING_ALAW",
            ]).optional(),
            bargeInConfig: z.object({
              noBargeInDuration: z.string().optional(),
              totalDuration: z.string().optional(),
            }).optional(),
            enableWordInfo: z.boolean().optional(),
            model: z.string().optional(),
            modelVariant: z.enum([
              "SPEECH_MODEL_VARIANT_UNSPECIFIED",
              "USE_BEST_AVAILABLE",
              "USE_STANDARD",
              "USE_ENHANCED",
            ]).optional(),
            optOutConformerModelMigration: z.boolean().optional(),
            phraseHints: z.array(z.string()).optional(),
            sampleRateHertz: z.number().int().optional(),
            singleUtterance: z.boolean().optional(),
          }).optional(),
        }).optional(),
        dtmf: z.object({
          digits: z.string().optional(),
          finishDigit: z.string().optional(),
        }).optional(),
        event: z.object({
          event: z.string().optional(),
        }).optional(),
        intent: z.object({
          intent: z.string().optional(),
        }).optional(),
        languageCode: z.string().optional(),
        text: z.object({
          text: z.string().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.string().optional(),
          error: z.object({
            message: z.string().optional(),
          }).optional(),
          outputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      }).optional(),
      isWebhookEnabled: z.boolean().optional(),
    }).optional(),
    virtualAgentOutput: z.object({
      currentPage: z.object({
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
        entryFulfillment: z.object({
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
        form: z.object({
          parameters: z.array(z.object({
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
            defaultValue: z.string().optional(),
            displayName: z.string().optional(),
            entityType: z.string().optional(),
            fillBehavior: z.object({
              initialPromptFulfillment: z.object({
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
                          inputParameters: z.record(z.string(), z.string())
                            .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
              repromptEventHandlers: z.array(z.object({
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
                            metadata: z.record(z.string(), z.string())
                              .optional(),
                          }).optional(),
                          endInteraction: z.object({}).optional(),
                          knowledgeInfoCard: z.object({}).optional(),
                          liveAgentHandoff: z.object({
                            metadata: z.record(z.string(), z.string())
                              .optional(),
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
                            inputParameters: z.record(z.string(), z.string())
                              .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
            }).optional(),
            isList: z.boolean().optional(),
            redact: z.boolean().optional(),
            required: z.boolean().optional(),
          })).optional(),
        }).optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
        name: z.string().optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
      }).optional(),
      diagnosticInfo: z.record(z.string(), z.string()).optional(),
      differences: z.array(z.object({
        description: z.string().optional(),
        type: z.enum([
          "DIFF_TYPE_UNSPECIFIED",
          "INTENT",
          "PAGE",
          "PARAMETERS",
          "UTTERANCE",
          "FLOW",
        ]).optional(),
      })).optional(),
      sessionParameters: z.record(z.string(), z.string()).optional(),
      status: z.object({
        code: z.number().int().optional(),
        details: z.array(z.record(z.string(), z.string())).optional(),
        message: z.string().optional(),
      }).optional(),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        text: z.array(z.string()).optional(),
      })).optional(),
      triggeredIntent: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        dtmfPattern: z.string().optional(),
        isFallback: z.boolean().optional(),
        labels: z.record(z.string(), z.string()).optional(),
        name: z.string().optional(),
        parameters: z.array(z.object({
          entityType: z.string().optional(),
          id: z.string().optional(),
          isList: z.boolean().optional(),
          redact: z.boolean().optional(),
        })).optional(),
        priority: z.number().int().optional(),
        trainingPhrases: z.array(z.object({
          id: z.string().optional(),
          parts: z.array(z.object({
            parameterId: z.string().optional(),
            text: z.string().optional(),
          })).optional(),
          repeatCount: z.number().int().optional(),
        })).optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  testConfig: z.object({
    flow: z.string().optional(),
    page: z.string().optional(),
    trackingParameters: z.array(z.string()).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean(),
        injectedParameters: z.record(z.string(), z.unknown()),
        input: z.object({
          audio: z.object({
            audio: z.string(),
            config: z.object({
              audioEncoding: z.string(),
              bargeInConfig: z.object({
                noBargeInDuration: z.string(),
                totalDuration: z.string(),
              }),
              enableWordInfo: z.boolean(),
              model: z.string(),
              modelVariant: z.string(),
              optOutConformerModelMigration: z.boolean(),
              phraseHints: z.array(z.string()),
              sampleRateHertz: z.number(),
              singleUtterance: z.boolean(),
            }),
          }),
          dtmf: z.object({
            digits: z.string(),
            finishDigit: z.string(),
          }),
          event: z.object({
            event: z.string(),
          }),
          intent: z.object({
            intent: z.string(),
          }),
          languageCode: z.string(),
          text: z.object({
            text: z.string(),
          }),
          toolCallResult: z.object({
            action: z.string(),
            error: z.object({
              message: z.string(),
            }),
            outputParameters: z.record(z.string(), z.unknown()),
            tool: z.string(),
          }),
        }),
        isWebhookEnabled: z.boolean(),
      }),
      virtualAgentOutput: z.object({
        currentPage: z.object({
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
          description: z.string(),
          displayName: z.string(),
          entryFulfillment: z.object({
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
          })),
          form: z.object({
            parameters: z.array(z.object({
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
              defaultValue: z.string(),
              displayName: z.string(),
              entityType: z.string(),
              fillBehavior: z.object({
                initialPromptFulfillment: z.object({
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
                repromptEventHandlers: z.array(z.object({
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
                              inputParameters: z.record(
                                z.string(),
                                z.unknown(),
                              ),
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
                })),
              }),
              isList: z.boolean(),
              redact: z.boolean(),
              required: z.boolean(),
            })),
          }),
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
          }),
          name: z.string(),
          transitionRouteGroups: z.array(z.string()),
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
          })),
        }),
        diagnosticInfo: z.record(z.string(), z.unknown()),
        differences: z.array(z.object({
          description: z.string(),
          type: z.string(),
        })),
        sessionParameters: z.record(z.string(), z.unknown()),
        status: z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        }),
        textResponses: z.array(z.object({
          allowPlaybackInterruption: z.boolean(),
          text: z.array(z.string()),
        })),
        triggeredIntent: z.object({
          description: z.string(),
          displayName: z.string(),
          dtmfPattern: z.string(),
          isFallback: z.boolean(),
          labels: z.record(z.string(), z.unknown()),
          name: z.string(),
          parameters: z.array(z.object({
            entityType: z.string(),
            id: z.string(),
            isList: z.boolean(),
            redact: z.boolean(),
          })),
          priority: z.number(),
          trainingPhrases: z.array(z.object({
            id: z.string(),
            parts: z.array(z.object({
              parameterId: z.string(),
              text: z.string(),
            })),
            repeatCount: z.number(),
          })),
        }),
      }),
    })),
    environment: z.string(),
    name: z.string(),
    testResult: z.string(),
    testTime: z.string(),
  }).optional(),
  name: z.string(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean(),
      injectedParameters: z.record(z.string(), z.unknown()),
      input: z.object({
        audio: z.object({
          audio: z.string(),
          config: z.object({
            audioEncoding: z.string(),
            bargeInConfig: z.object({
              noBargeInDuration: z.string(),
              totalDuration: z.string(),
            }),
            enableWordInfo: z.boolean(),
            model: z.string(),
            modelVariant: z.string(),
            optOutConformerModelMigration: z.boolean(),
            phraseHints: z.array(z.string()),
            sampleRateHertz: z.number(),
            singleUtterance: z.boolean(),
          }),
        }),
        dtmf: z.object({
          digits: z.string(),
          finishDigit: z.string(),
        }),
        event: z.object({
          event: z.string(),
        }),
        intent: z.object({
          intent: z.string(),
        }),
        languageCode: z.string(),
        text: z.object({
          text: z.string(),
        }),
        toolCallResult: z.object({
          action: z.string(),
          error: z.object({
            message: z.string(),
          }),
          outputParameters: z.record(z.string(), z.unknown()),
          tool: z.string(),
        }),
      }),
      isWebhookEnabled: z.boolean(),
    }),
    virtualAgentOutput: z.object({
      currentPage: z.object({
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
        description: z.string(),
        displayName: z.string(),
        entryFulfillment: z.object({
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
        })),
        form: z.object({
          parameters: z.array(z.object({
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
            defaultValue: z.string(),
            displayName: z.string(),
            entityType: z.string(),
            fillBehavior: z.object({
              initialPromptFulfillment: z.object({
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
              repromptEventHandlers: z.array(z.object({
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
              })),
            }),
            isList: z.boolean(),
            redact: z.boolean(),
            required: z.boolean(),
          })),
        }),
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
        }),
        name: z.string(),
        transitionRouteGroups: z.array(z.string()),
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
        })),
      }),
      diagnosticInfo: z.record(z.string(), z.unknown()),
      differences: z.array(z.object({
        description: z.string(),
        type: z.string(),
      })),
      sessionParameters: z.record(z.string(), z.unknown()),
      status: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.boolean(),
        text: z.array(z.string()),
      })),
      triggeredIntent: z.object({
        description: z.string(),
        displayName: z.string(),
        dtmfPattern: z.string(),
        isFallback: z.boolean(),
        labels: z.record(z.string(), z.unknown()),
        name: z.string(),
        parameters: z.array(z.object({
          entityType: z.string(),
          id: z.string(),
          isList: z.boolean(),
          redact: z.boolean(),
        })),
        priority: z.number(),
        trainingPhrases: z.array(z.object({
          id: z.string(),
          parts: z.array(z.object({
            parameterId: z.string(),
            text: z.string(),
          })),
          repeatCount: z.number(),
        })),
      }),
    }),
  })).optional(),
  testConfig: z.object({
    flow: z.string(),
    page: z.string(),
    trackingParameters: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean().optional(),
        injectedParameters: z.record(z.string(), z.string()).optional(),
        input: z.object({
          audio: z.object({
            audio: z.string().optional(),
            config: z.object({
              audioEncoding: z.enum([
                "AUDIO_ENCODING_UNSPECIFIED",
                "AUDIO_ENCODING_LINEAR_16",
                "AUDIO_ENCODING_FLAC",
                "AUDIO_ENCODING_MULAW",
                "AUDIO_ENCODING_AMR",
                "AUDIO_ENCODING_AMR_WB",
                "AUDIO_ENCODING_OGG_OPUS",
                "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
                "AUDIO_ENCODING_ALAW",
              ]).optional(),
              bargeInConfig: z.object({
                noBargeInDuration: z.string().optional(),
                totalDuration: z.string().optional(),
              }).optional(),
              enableWordInfo: z.boolean().optional(),
              model: z.string().optional(),
              modelVariant: z.enum([
                "SPEECH_MODEL_VARIANT_UNSPECIFIED",
                "USE_BEST_AVAILABLE",
                "USE_STANDARD",
                "USE_ENHANCED",
              ]).optional(),
              optOutConformerModelMigration: z.boolean().optional(),
              phraseHints: z.array(z.string()).optional(),
              sampleRateHertz: z.number().int().optional(),
              singleUtterance: z.boolean().optional(),
            }).optional(),
          }).optional(),
          dtmf: z.object({
            digits: z.string().optional(),
            finishDigit: z.string().optional(),
          }).optional(),
          event: z.object({
            event: z.string().optional(),
          }).optional(),
          intent: z.object({
            intent: z.string().optional(),
          }).optional(),
          languageCode: z.string().optional(),
          text: z.object({
            text: z.string().optional(),
          }).optional(),
          toolCallResult: z.object({
            action: z.string().optional(),
            error: z.object({
              message: z.string().optional(),
            }).optional(),
            outputParameters: z.record(z.string(), z.string()).optional(),
            tool: z.string().optional(),
          }).optional(),
        }).optional(),
        isWebhookEnabled: z.boolean().optional(),
      }).optional(),
      virtualAgentOutput: z.object({
        currentPage: z.object({
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
          entryFulfillment: z.object({
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
          form: z.object({
            parameters: z.array(z.object({
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
              defaultValue: z.string().optional(),
              displayName: z.string().optional(),
              entityType: z.string().optional(),
              fillBehavior: z.object({
                initialPromptFulfillment: z.object({
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
                            metadata: z.record(z.string(), z.string())
                              .optional(),
                          }).optional(),
                          endInteraction: z.object({}).optional(),
                          knowledgeInfoCard: z.object({}).optional(),
                          liveAgentHandoff: z.object({
                            metadata: z.record(z.string(), z.string())
                              .optional(),
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
                            inputParameters: z.record(z.string(), z.string())
                              .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                repromptEventHandlers: z.array(z.object({
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
                              metadata: z.record(z.string(), z.string())
                                .optional(),
                            }).optional(),
                            endInteraction: z.object({}).optional(),
                            knowledgeInfoCard: z.object({}).optional(),
                            liveAgentHandoff: z.object({
                              metadata: z.record(z.string(), z.string())
                                .optional(),
                            }).optional(),
                            mixedAudio: z.object({
                              segments: z.array(z.object({
                                allowPlaybackInterruption: z.boolean()
                                  .optional(),
                                audio: z.string().optional(),
                                uri: z.string().optional(),
                              })).optional(),
                            }).optional(),
                            outputAudioText: z.object({
                              allowPlaybackInterruption: z.boolean().optional(),
                              ssml: z.string().optional(),
                              text: z.string().optional(),
                            }).optional(),
                            payload: z.record(z.string(), z.string())
                              .optional(),
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
                              inputParameters: z.record(z.string(), z.string())
                                .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
              }).optional(),
              isList: z.boolean().optional(),
              redact: z.boolean().optional(),
              required: z.boolean().optional(),
            })).optional(),
          }).optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
          name: z.string().optional(),
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
                        inputParameters: z.record(z.string(), z.string())
                          .optional(),
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
        }).optional(),
        diagnosticInfo: z.record(z.string(), z.string()).optional(),
        differences: z.array(z.object({
          description: z.string().optional(),
          type: z.enum([
            "DIFF_TYPE_UNSPECIFIED",
            "INTENT",
            "PAGE",
            "PARAMETERS",
            "UTTERANCE",
            "FLOW",
          ]).optional(),
        })).optional(),
        sessionParameters: z.record(z.string(), z.string()).optional(),
        status: z.object({
          code: z.number().int().optional(),
          details: z.array(z.record(z.string(), z.string())).optional(),
          message: z.string().optional(),
        }).optional(),
        textResponses: z.array(z.object({
          allowPlaybackInterruption: z.boolean().optional(),
          text: z.array(z.string()).optional(),
        })).optional(),
        triggeredIntent: z.object({
          description: z.string().optional(),
          displayName: z.string().optional(),
          dtmfPattern: z.string().optional(),
          isFallback: z.boolean().optional(),
          labels: z.record(z.string(), z.string()).optional(),
          name: z.string().optional(),
          parameters: z.array(z.object({
            entityType: z.string().optional(),
            id: z.string().optional(),
            isList: z.boolean().optional(),
            redact: z.boolean().optional(),
          })).optional(),
          priority: z.number().int().optional(),
          trainingPhrases: z.array(z.object({
            id: z.string().optional(),
            parts: z.array(z.object({
              parameterId: z.string().optional(),
              text: z.string().optional(),
            })).optional(),
            repeatCount: z.number().int().optional(),
          })).optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    environment: z.string().optional(),
    name: z.string().optional(),
    testResult: z.enum(["TEST_RESULT_UNSPECIFIED", "PASSED", "FAILED"])
      .optional(),
    testTime: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean().optional(),
      injectedParameters: z.record(z.string(), z.string()).optional(),
      input: z.object({
        audio: z.object({
          audio: z.string().optional(),
          config: z.object({
            audioEncoding: z.enum([
              "AUDIO_ENCODING_UNSPECIFIED",
              "AUDIO_ENCODING_LINEAR_16",
              "AUDIO_ENCODING_FLAC",
              "AUDIO_ENCODING_MULAW",
              "AUDIO_ENCODING_AMR",
              "AUDIO_ENCODING_AMR_WB",
              "AUDIO_ENCODING_OGG_OPUS",
              "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE",
              "AUDIO_ENCODING_ALAW",
            ]).optional(),
            bargeInConfig: z.object({
              noBargeInDuration: z.string().optional(),
              totalDuration: z.string().optional(),
            }).optional(),
            enableWordInfo: z.boolean().optional(),
            model: z.string().optional(),
            modelVariant: z.enum([
              "SPEECH_MODEL_VARIANT_UNSPECIFIED",
              "USE_BEST_AVAILABLE",
              "USE_STANDARD",
              "USE_ENHANCED",
            ]).optional(),
            optOutConformerModelMigration: z.boolean().optional(),
            phraseHints: z.array(z.string()).optional(),
            sampleRateHertz: z.number().int().optional(),
            singleUtterance: z.boolean().optional(),
          }).optional(),
        }).optional(),
        dtmf: z.object({
          digits: z.string().optional(),
          finishDigit: z.string().optional(),
        }).optional(),
        event: z.object({
          event: z.string().optional(),
        }).optional(),
        intent: z.object({
          intent: z.string().optional(),
        }).optional(),
        languageCode: z.string().optional(),
        text: z.object({
          text: z.string().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.string().optional(),
          error: z.object({
            message: z.string().optional(),
          }).optional(),
          outputParameters: z.record(z.string(), z.string()).optional(),
          tool: z.string().optional(),
        }).optional(),
      }).optional(),
      isWebhookEnabled: z.boolean().optional(),
    }).optional(),
    virtualAgentOutput: z.object({
      currentPage: z.object({
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
        entryFulfillment: z.object({
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
        form: z.object({
          parameters: z.array(z.object({
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
            defaultValue: z.string().optional(),
            displayName: z.string().optional(),
            entityType: z.string().optional(),
            fillBehavior: z.object({
              initialPromptFulfillment: z.object({
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
                          inputParameters: z.record(z.string(), z.string())
                            .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
              repromptEventHandlers: z.array(z.object({
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
                            metadata: z.record(z.string(), z.string())
                              .optional(),
                          }).optional(),
                          endInteraction: z.object({}).optional(),
                          knowledgeInfoCard: z.object({}).optional(),
                          liveAgentHandoff: z.object({
                            metadata: z.record(z.string(), z.string())
                              .optional(),
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
                            inputParameters: z.record(z.string(), z.string())
                              .optional(),
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
                    inputParameters: z.record(z.string(), z.string())
                      .optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
            }).optional(),
            isList: z.boolean().optional(),
            redact: z.boolean().optional(),
            required: z.boolean().optional(),
          })).optional(),
        }).optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
        name: z.string().optional(),
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
                      inputParameters: z.record(z.string(), z.string())
                        .optional(),
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
      }).optional(),
      diagnosticInfo: z.record(z.string(), z.string()).optional(),
      differences: z.array(z.object({
        description: z.string().optional(),
        type: z.enum([
          "DIFF_TYPE_UNSPECIFIED",
          "INTENT",
          "PAGE",
          "PARAMETERS",
          "UTTERANCE",
          "FLOW",
        ]).optional(),
      })).optional(),
      sessionParameters: z.record(z.string(), z.string()).optional(),
      status: z.object({
        code: z.number().int().optional(),
        details: z.array(z.record(z.string(), z.string())).optional(),
        message: z.string().optional(),
      }).optional(),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.boolean().optional(),
        text: z.array(z.string()).optional(),
      })).optional(),
      triggeredIntent: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        dtmfPattern: z.string().optional(),
        isFallback: z.boolean().optional(),
        labels: z.record(z.string(), z.string()).optional(),
        name: z.string().optional(),
        parameters: z.array(z.object({
          entityType: z.string().optional(),
          id: z.string().optional(),
          isList: z.boolean().optional(),
          redact: z.boolean().optional(),
        })).optional(),
        priority: z.number().int().optional(),
        trainingPhrases: z.array(z.object({
          id: z.string().optional(),
          parts: z.array(z.object({
            parameterId: z.string().optional(),
            text: z.string().optional(),
          })).optional(),
          repeatCount: z.number().int().optional(),
        })).optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  testConfig: z.object({
    flow: z.string().optional(),
    page: z.string().optional(),
    trackingParameters: z.array(z.string()).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dialogflow/agents-testcases",
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
      description: "GCP dialogflow Agents.TestCases resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a testCases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastTestResult"] !== undefined) {
          body["lastTestResult"] = g["lastTestResult"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["testCaseConversationTurns"] !== undefined) {
          body["testCaseConversationTurns"] = g["testCaseConversationTurns"];
        }
        if (g["testConfig"] !== undefined) body["testConfig"] = g["testConfig"];
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
      description: "Get a testCases",
      arguments: z.object({
        identifier: z.string().describe("The name of the testCases"),
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
      description: "Update testCases attributes",
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
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastTestResult"] !== undefined) {
          body["lastTestResult"] = g["lastTestResult"];
        }
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["testCaseConversationTurns"] !== undefined) {
          body["testCaseConversationTurns"] = g["testCaseConversationTurns"];
        }
        if (g["testConfig"] !== undefined) body["testConfig"] = g["testConfig"];
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
    sync: {
      description: "Sync testCases state from GCP",
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.batchDelete",
            "path": "v3/{+parent}/testCases:batchDelete",
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
    batch_run: {
      description: "batch run",
      arguments: z.object({
        environment: z.any().optional(),
        testCases: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        if (args["testCases"] !== undefined) {
          body["testCases"] = args["testCases"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.batchRun",
            "path": "v3/{+parent}/testCases:batchRun",
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
    calculate_coverage: {
      description: "calculate coverage",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["agent"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.testCases.calculateCoverage",
            "path": "v3/{+agent}/testCases:calculateCoverage",
            "httpMethod": "GET",
            "parameterOrder": ["agent"],
            "parameters": {
              "agent": { "location": "path", "required": true },
              "type": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({
        dataFormat: z.any().optional(),
        filter: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["dataFormat"] !== undefined) {
          body["dataFormat"] = args["dataFormat"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.export",
            "path": "v3/{+parent}/testCases:export",
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
    import: {
      description: "import",
      arguments: z.object({
        content: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.import",
            "path": "v3/{+parent}/testCases:import",
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
    run: {
      description: "run",
      arguments: z.object({
        environment: z.any().optional(),
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
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.run",
            "path": "v3/{+name}:run",
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
