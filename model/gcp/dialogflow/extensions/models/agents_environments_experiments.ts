// Auto-generated extension model for @swamp/gcp/dialogflow/agents-environments-experiments
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
  return `${parent}/experiments/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.get",
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
  "id": "dialogflow.projects.locations.agents.environments.experiments.create",
  "path": "v3/{+parent}/experiments",
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
  "id": "dialogflow.projects.locations.agents.environments.experiments.patch",
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

const DELETE_CONFIG = {
  "id": "dialogflow.projects.locations.agents.environments.experiments.delete",
  "path": "v3/{+name}",
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
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string().optional(),
  result: z.object({
    lastUpdateTime: z.string().optional(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.object({
          confidenceLevel: z.number().optional(),
          lowerBound: z.number().optional(),
          ratio: z.number().optional(),
          upperBound: z.number().optional(),
        }).optional(),
        count: z.number().optional(),
        countType: z.enum([
          "COUNT_TYPE_UNSPECIFIED",
          "TOTAL_NO_MATCH_COUNT",
          "TOTAL_TURN_COUNT",
          "AVERAGE_TURN_COUNT",
        ]).optional(),
        ratio: z.number().optional(),
        type: z.enum([
          "METRIC_UNSPECIFIED",
          "CONTAINED_SESSION_NO_CALLBACK_RATE",
          "LIVE_AGENT_HANDOFF_RATE",
          "CALLBACK_SESSION_RATE",
          "ABANDONED_SESSION_RATE",
          "SESSION_END_RATE",
        ]).optional(),
      })).optional(),
      sessionCount: z.number().int().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string().optional(),
    rolloutCondition: z.string().optional(),
    rolloutSteps: z.array(z.object({
      displayName: z.string().optional(),
      minDuration: z.string().optional(),
      trafficPercent: z.number().int().optional(),
    })).optional(),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string().optional(),
    step: z.string().optional(),
    stepIndex: z.number().int().optional(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "RUNNING",
    "DONE",
    "ROLLOUT_FAILED",
  ]).optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  })).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean(),
        trafficAllocation: z.number(),
        version: z.string(),
      })),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string(),
  result: z.object({
    lastUpdateTime: z.string(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.object({
          confidenceLevel: z.number(),
          lowerBound: z.number(),
          ratio: z.number(),
          upperBound: z.number(),
        }),
        count: z.number(),
        countType: z.string(),
        ratio: z.number(),
        type: z.string(),
      })),
      sessionCount: z.number(),
      version: z.string(),
    })),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string(),
    rolloutCondition: z.string(),
    rolloutSteps: z.array(z.object({
      displayName: z.string(),
      minDuration: z.string(),
      trafficPercent: z.number(),
    })),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string(),
    step: z.string(),
    stepIndex: z.number(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean(),
        trafficAllocation: z.number(),
        version: z.string(),
      })),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  createTime: z.string().optional(),
  definition: z.object({
    condition: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  experimentLength: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  name: z.string().optional(),
  result: z.object({
    lastUpdateTime: z.string().optional(),
    versionMetrics: z.array(z.object({
      metrics: z.array(z.object({
        confidenceInterval: z.object({
          confidenceLevel: z.number().optional(),
          lowerBound: z.number().optional(),
          ratio: z.number().optional(),
          upperBound: z.number().optional(),
        }).optional(),
        count: z.number().optional(),
        countType: z.enum([
          "COUNT_TYPE_UNSPECIFIED",
          "TOTAL_NO_MATCH_COUNT",
          "TOTAL_TURN_COUNT",
          "AVERAGE_TURN_COUNT",
        ]).optional(),
        ratio: z.number().optional(),
        type: z.enum([
          "METRIC_UNSPECIFIED",
          "CONTAINED_SESSION_NO_CALLBACK_RATE",
          "LIVE_AGENT_HANDOFF_RATE",
          "CALLBACK_SESSION_RATE",
          "ABANDONED_SESSION_RATE",
          "SESSION_END_RATE",
        ]).optional(),
      })).optional(),
      sessionCount: z.number().int().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  rolloutConfig: z.object({
    failureCondition: z.string().optional(),
    rolloutCondition: z.string().optional(),
    rolloutSteps: z.array(z.object({
      displayName: z.string().optional(),
      minDuration: z.string().optional(),
      trafficPercent: z.number().int().optional(),
    })).optional(),
  }).optional(),
  rolloutFailureReason: z.string().optional(),
  rolloutState: z.object({
    startTime: z.string().optional(),
    step: z.string().optional(),
    stepIndex: z.number().int().optional(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "RUNNING",
    "DONE",
    "ROLLOUT_FAILED",
  ]).optional(),
  variantsHistory: z.array(z.object({
    updateTime: z.string().optional(),
    versionVariants: z.object({
      variants: z.array(z.object({
        isControlGroup: z.boolean().optional(),
        trafficAllocation: z.number().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
  })).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dialogflow/agents-environments-experiments",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents.Environments.Experiments resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a experiments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["definition"] !== undefined) body["definition"] = g["definition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["experimentLength"] !== undefined) {
          body["experimentLength"] = g["experimentLength"];
        }
        if (g["lastUpdateTime"] !== undefined) {
          body["lastUpdateTime"] = g["lastUpdateTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["result"] !== undefined) body["result"] = g["result"];
        if (g["rolloutConfig"] !== undefined) {
          body["rolloutConfig"] = g["rolloutConfig"];
        }
        if (g["rolloutFailureReason"] !== undefined) {
          body["rolloutFailureReason"] = g["rolloutFailureReason"];
        }
        if (g["rolloutState"] !== undefined) {
          body["rolloutState"] = g["rolloutState"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["variantsHistory"] !== undefined) {
          body["variantsHistory"] = g["variantsHistory"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "DONE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
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
      description: "Update experiments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["definition"] !== undefined) body["definition"] = g["definition"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["experimentLength"] !== undefined) {
          body["experimentLength"] = g["experimentLength"];
        }
        if (g["lastUpdateTime"] !== undefined) {
          body["lastUpdateTime"] = g["lastUpdateTime"];
        }
        if (g["result"] !== undefined) body["result"] = g["result"];
        if (g["rolloutConfig"] !== undefined) {
          body["rolloutConfig"] = g["rolloutConfig"];
        }
        if (g["rolloutFailureReason"] !== undefined) {
          body["rolloutFailureReason"] = g["rolloutFailureReason"];
        }
        if (g["rolloutState"] !== undefined) {
          body["rolloutState"] = g["rolloutState"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["variantsHistory"] !== undefined) {
          body["variantsHistory"] = g["variantsHistory"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "DONE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
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
      description: "Sync experiments state from GCP",
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
    start: {
      description: "start",
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
              "dialogflow.projects.locations.agents.environments.experiments.start",
            "path": "v3/{+name}:start",
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
    stop: {
      description: "stop",
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
              "dialogflow.projects.locations.agents.environments.experiments.stop",
            "path": "v3/{+name}:stop",
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
  },
};
