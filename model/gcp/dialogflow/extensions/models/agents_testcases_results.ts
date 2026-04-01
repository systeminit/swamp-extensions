// Auto-generated extension model for @swamp/gcp/dialogflow/agents-testcases-results
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/results/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.testCases.results.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
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
  environment: z.string().optional(),
  name: z.string(),
  testResult: z.string().optional(),
  testTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dialogflow/agents-testcases-results",
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
      description: "GCP dialogflow Agents.TestCases.Results resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a results",
      arguments: z.object({
        identifier: z.string().describe("The name of the results"),
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
      description: "Sync results state from GCP",
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
