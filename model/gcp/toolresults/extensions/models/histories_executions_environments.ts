// Auto-generated extension model for @swamp/gcp/toolresults/histories-executions-environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://toolresults.googleapis.com/";

const GET_CONFIG = {
  "id": "toolresults.projects.histories.executions.environments.get",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/environments/{environmentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "environmentId",
  ],
  "parameters": {
    "environmentId": {
      "location": "path",
      "required": true,
    },
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  completionTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  creationTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  dimensionValue: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  environmentId: z.string().optional(),
  environmentResult: z.object({
    outcome: z.object({
      failureDetail: z.object({
        crashed: z.boolean(),
        deviceOutOfMemory: z.boolean(),
        failedRoboscript: z.boolean(),
        notInstalled: z.boolean(),
        otherNativeCrash: z.boolean(),
        timedOut: z.boolean(),
        unableToCrawl: z.boolean(),
      }),
      inconclusiveDetail: z.object({
        abortedByUser: z.boolean(),
        hasErrorLogs: z.boolean(),
        infrastructureFailure: z.boolean(),
      }),
      skippedDetail: z.object({
        incompatibleAppVersion: z.boolean(),
        incompatibleArchitecture: z.boolean(),
        incompatibleDevice: z.boolean(),
        pendingTimeout: z.boolean(),
      }),
      successDetail: z.object({
        otherNativeCrash: z.boolean(),
      }),
      summary: z.string(),
    }),
    state: z.string(),
    testSuiteOverviews: z.array(z.object({
      elapsedTime: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      errorCount: z.number(),
      failureCount: z.number(),
      flakyCount: z.number(),
      name: z.string(),
      skippedCount: z.number(),
      totalCount: z.number(),
      xmlSource: z.object({
        fileUri: z.string(),
      }),
    })),
  }).optional(),
  executionId: z.string().optional(),
  historyId: z.string().optional(),
  projectId: z.string().optional(),
  resultsStorage: z.object({
    resultsStoragePath: z.object({
      fileUri: z.string(),
    }),
    xunitXmlFile: z.object({
      fileUri: z.string(),
    }),
  }).optional(),
  shardSummaries: z.array(z.object({
    runs: z.array(z.object({})),
    shardResult: z.object({
      outcome: z.object({
        failureDetail: z.object({
          crashed: z.boolean(),
          deviceOutOfMemory: z.boolean(),
          failedRoboscript: z.boolean(),
          notInstalled: z.boolean(),
          otherNativeCrash: z.boolean(),
          timedOut: z.boolean(),
          unableToCrawl: z.boolean(),
        }),
        inconclusiveDetail: z.object({
          abortedByUser: z.boolean(),
          hasErrorLogs: z.boolean(),
          infrastructureFailure: z.boolean(),
        }),
        skippedDetail: z.object({
          incompatibleAppVersion: z.boolean(),
          incompatibleArchitecture: z.boolean(),
          incompatibleDevice: z.boolean(),
          pendingTimeout: z.boolean(),
        }),
        successDetail: z.object({
          otherNativeCrash: z.boolean(),
        }),
        summary: z.string(),
      }),
      state: z.string(),
      testSuiteOverviews: z.array(z.object({
        elapsedTime: z.object({
          nanos: z.number(),
          seconds: z.string(),
        }),
        errorCount: z.number(),
        failureCount: z.number(),
        flakyCount: z.number(),
        name: z.string(),
        skippedCount: z.number(),
        totalCount: z.number(),
        xmlSource: z.object({
          fileUri: z.string(),
        }),
      })),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/toolresults/histories-executions-environments",
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
      description:
        "An Environment represents the set of test runs (Steps) from the parent Execut...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        params["environmentId"] = args.identifier;
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
      description: "Sync environments state from GCP",
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
          if (g["historyId"] !== undefined) {
            params["historyId"] = String(g["historyId"]);
          } else if (existing["historyId"]) {
            params["historyId"] = String(existing["historyId"]);
          }
          if (g["executionId"] !== undefined) {
            params["executionId"] = String(g["executionId"]);
          } else if (existing["executionId"]) {
            params["executionId"] = String(existing["executionId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["environmentId"] = identifier;
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
