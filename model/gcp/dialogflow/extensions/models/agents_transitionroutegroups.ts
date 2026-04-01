// Auto-generated extension model for @swamp/gcp/dialogflow/agents-transitionroutegroups
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
  return `${parent}/transitionRouteGroups/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.transitionRouteGroups.get",
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
  "id": "dialogflow.projects.locations.agents.transitionRouteGroups.create",
  "path": "v3/{+parent}/transitionRouteGroups",
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
  "id": "dialogflow.projects.locations.agents.transitionRouteGroups.patch",
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
  "id": "dialogflow.projects.locations.agents.transitionRouteGroups.delete",
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
  displayName: z.string().optional(),
  name: z.string().optional(),
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
  displayName: z.string().optional(),
  name: z.string(),
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
  displayName: z.string().optional(),
  name: z.string().optional(),
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
  type: "@swamp/gcp/dialogflow/agents-transitionroutegroups",
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
      description: "GCP dialogflow Agents.TransitionRouteGroups resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a transitionRouteGroups",
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
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Get a transitionRouteGroups",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the transitionRouteGroups",
        ),
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
      description: "Update transitionRouteGroups attributes",
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
      description: "Delete the transitionRouteGroups",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the transitionRouteGroups",
        ),
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
      description: "Sync transitionRouteGroups state from GCP",
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
