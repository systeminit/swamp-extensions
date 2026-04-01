// Auto-generated extension model for @swamp/gcp/contactcenterinsights/dashboards-charts
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
  return `${parent}/charts/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.charts.get",
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
  "id": "contactcenterinsights.projects.locations.dashboards.charts.create",
  "path": "v1/{+parent}/charts",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "chartId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.charts.patch",
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
  "id": "contactcenterinsights.projects.locations.dashboards.charts.delete",
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
  chartVisualizationType: z.enum([
    "CHART_VISUALIZATION_TYPE_UNSPECIFIED",
    "BAR",
    "LINE",
    "AREA",
    "PIE",
    "SCATTER",
    "TABLE",
    "SCORE_CARD",
    "SUNBURST",
    "GAUGE",
    "SANKEY",
  ]).describe("Chart visualization type.").optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string().describe("The revision id of the chart.")
          .optional(),
        sessionId: z.string().describe("The session id of the chart.")
          .optional(),
      }).describe("The current chart checkpoint state.").optional(),
      chartConversations: z.array(z.object({
        conversationId: z.string().describe("The conversation id of the chart.")
          .optional(),
        createTime: z.string().describe("The create time of the conversation.")
          .optional(),
        messages: z.array(z.object({
          createTime: z.string().describe(
            "For user messages, this is the time at which the system received the message. For system messages, this is the time at which the system generated the message.",
          ).optional(),
          messageId: z.string().describe("The message id of the message.")
            .optional(),
          systemMessage: z.object({
            chartSpec: z.record(z.string(), z.string()).describe(
              "Chart spec from LLM",
            ).optional(),
            generatedSqlQuery: z.string().describe(
              "Raw SQL from LLM, before templatization",
            ).optional(),
            textOutput: z.object({
              texts: z.array(z.string()).describe("The parts of the message.")
                .optional(),
              type: z.enum([
                "TYPE_UNSPECIFIED",
                "THOUGHT",
                "FINAL_RESPONSE",
                "PROGRESS",
              ]).describe("The type of the text message.").optional(),
            }).describe("A text output message from the system.").optional(),
          }).describe(
            "A message from the system in response to the user. This message can also be a message from the user as historical context for multiturn conversations with the system.",
          ).optional(),
          userMessage: z.object({
            text: z.string().describe(
              "A message from the user that is interacting with the system.",
            ).optional(),
          }).describe("The user message.").optional(),
        })).describe(
          "Ordered list of messages, including user inputs and system responses.",
        ).optional(),
        updateTime: z.string().describe("The update time of the conversation.")
          .optional(),
      })).describe(
        "Output only. The chart conversations used to generate the chart.",
      ).optional(),
      chartSpec: z.record(z.string(), z.string()).describe(
        "Chart spec for the chart.",
      ).optional(),
      request: z.record(z.string(), z.string()).optional(),
      sqlComparisonKey: z.string().describe(
        "Optional. For charts with comparison, this key will determine the metric that will be compared between the current and another dataset.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate the chart.")
        .optional(),
    }).describe(
      "Request that use natural language query to generate the chart.",
    ).optional(),
    queryMetrics: z.object({
      request: z.record(z.string(), z.string()).optional(),
    }).describe("Request data that use the existing QueryMetrics.").optional(),
  }).describe("The request data for visualizing the dataset in the chart.")
    .optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string().describe("Required. The end time of the time window.")
        .optional(),
      startTime: z.string().describe(
        "Required. The start time of the time window.",
      ).optional(),
    }).describe("A time window for querying conversations.").optional(),
    relativeDateRange: z.object({
      quantity: z.string().describe(
        "Required. The quantity of units in the past.",
      ).optional(),
      unit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "DAY",
        "WEEK",
        "MONTH",
        "QUARTER",
        "YEAR",
      ]).describe("Required. The unit of time.").optional(),
    }).describe("Relative date range configuration.").optional(),
  }).describe("Date range configuration for dashboard charts.").optional(),
  description: z.string().describe("Chart description").optional(),
  displayName: z.string().describe("User provided display name of the chart.")
    .optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the container. Should support scope later.",
  ).optional(),
  height: z.number().int().describe("The height of the chart in grid units.")
    .optional(),
  name: z.string().describe(
    "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
  ).optional(),
  width: z.number().int().describe("The width of the chart in grid units.")
    .optional(),
  chartId: z.string().describe(
    "Optional. A unique ID for the new Chart. This ID will become the final component of the Chart's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  chartType: z.string().optional(),
  chartVisualizationType: z.string().optional(),
  createTime: z.string().optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string(),
        sessionId: z.string(),
      }),
      chartConversations: z.array(z.object({
        conversationId: z.string(),
        createTime: z.string(),
        messages: z.array(z.object({
          createTime: z.string(),
          messageId: z.string(),
          systemMessage: z.object({
            chartSpec: z.record(z.string(), z.unknown()),
            generatedSqlQuery: z.string(),
            textOutput: z.object({
              texts: z.array(z.string()),
              type: z.string(),
            }),
          }),
          userMessage: z.object({
            text: z.string(),
          }),
        })),
        updateTime: z.string(),
      })),
      chartSpec: z.record(z.string(), z.unknown()),
      request: z.record(z.string(), z.unknown()),
      sqlComparisonKey: z.string(),
      sqlQuery: z.string(),
    }),
    queryMetrics: z.object({
      request: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    relativeDateRange: z.object({
      quantity: z.string(),
      unit: z.string(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  filter: z.string().optional(),
  height: z.number().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  width: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  chartVisualizationType: z.enum([
    "CHART_VISUALIZATION_TYPE_UNSPECIFIED",
    "BAR",
    "LINE",
    "AREA",
    "PIE",
    "SCATTER",
    "TABLE",
    "SCORE_CARD",
    "SUNBURST",
    "GAUGE",
    "SANKEY",
  ]).describe("Chart visualization type.").optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string().describe("The revision id of the chart.")
          .optional(),
        sessionId: z.string().describe("The session id of the chart.")
          .optional(),
      }).describe("The current chart checkpoint state.").optional(),
      chartConversations: z.array(z.object({
        conversationId: z.string().describe("The conversation id of the chart.")
          .optional(),
        createTime: z.string().describe("The create time of the conversation.")
          .optional(),
        messages: z.array(z.object({
          createTime: z.string().describe(
            "For user messages, this is the time at which the system received the message. For system messages, this is the time at which the system generated the message.",
          ).optional(),
          messageId: z.string().describe("The message id of the message.")
            .optional(),
          systemMessage: z.object({
            chartSpec: z.record(z.string(), z.string()).describe(
              "Chart spec from LLM",
            ).optional(),
            generatedSqlQuery: z.string().describe(
              "Raw SQL from LLM, before templatization",
            ).optional(),
            textOutput: z.object({
              texts: z.array(z.string()).describe("The parts of the message.")
                .optional(),
              type: z.enum([
                "TYPE_UNSPECIFIED",
                "THOUGHT",
                "FINAL_RESPONSE",
                "PROGRESS",
              ]).describe("The type of the text message.").optional(),
            }).describe("A text output message from the system.").optional(),
          }).describe(
            "A message from the system in response to the user. This message can also be a message from the user as historical context for multiturn conversations with the system.",
          ).optional(),
          userMessage: z.object({
            text: z.string().describe(
              "A message from the user that is interacting with the system.",
            ).optional(),
          }).describe("The user message.").optional(),
        })).describe(
          "Ordered list of messages, including user inputs and system responses.",
        ).optional(),
        updateTime: z.string().describe("The update time of the conversation.")
          .optional(),
      })).describe(
        "Output only. The chart conversations used to generate the chart.",
      ).optional(),
      chartSpec: z.record(z.string(), z.string()).describe(
        "Chart spec for the chart.",
      ).optional(),
      request: z.record(z.string(), z.string()).optional(),
      sqlComparisonKey: z.string().describe(
        "Optional. For charts with comparison, this key will determine the metric that will be compared between the current and another dataset.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate the chart.")
        .optional(),
    }).describe(
      "Request that use natural language query to generate the chart.",
    ).optional(),
    queryMetrics: z.object({
      request: z.record(z.string(), z.string()).optional(),
    }).describe("Request data that use the existing QueryMetrics.").optional(),
  }).describe("The request data for visualizing the dataset in the chart.")
    .optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string().describe("Required. The end time of the time window.")
        .optional(),
      startTime: z.string().describe(
        "Required. The start time of the time window.",
      ).optional(),
    }).describe("A time window for querying conversations.").optional(),
    relativeDateRange: z.object({
      quantity: z.string().describe(
        "Required. The quantity of units in the past.",
      ).optional(),
      unit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "DAY",
        "WEEK",
        "MONTH",
        "QUARTER",
        "YEAR",
      ]).describe("Required. The unit of time.").optional(),
    }).describe("Relative date range configuration.").optional(),
  }).describe("Date range configuration for dashboard charts.").optional(),
  description: z.string().describe("Chart description").optional(),
  displayName: z.string().describe("User provided display name of the chart.")
    .optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the container. Should support scope later.",
  ).optional(),
  height: z.number().int().describe("The height of the chart in grid units.")
    .optional(),
  name: z.string().describe(
    "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
  ).optional(),
  width: z.number().int().describe("The width of the chart in grid units.")
    .optional(),
  chartId: z.string().describe(
    "Optional. A unique ID for the new Chart. This ID will become the final component of the Chart's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/contactcenterinsights/dashboards-charts",
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
        "Configurable dashboard's widget that displays data as a chart.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a charts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["chartVisualizationType"] !== undefined) {
          body["chartVisualizationType"] = g["chartVisualizationType"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["dateRangeConfig"] !== undefined) {
          body["dateRangeConfig"] = g["dateRangeConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["width"] !== undefined) body["width"] = g["width"];
        if (g["chartId"] !== undefined) body["chartId"] = g["chartId"];
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
      description: "Get a charts",
      arguments: z.object({
        identifier: z.string().describe("The name of the charts"),
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
      description: "Update charts attributes",
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
        if (g["chartVisualizationType"] !== undefined) {
          body["chartVisualizationType"] = g["chartVisualizationType"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["dateRangeConfig"] !== undefined) {
          body["dateRangeConfig"] = g["dateRangeConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["width"] !== undefined) body["width"] = g["width"];
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
      description: "Delete the charts",
      arguments: z.object({
        identifier: z.string().describe("The name of the charts"),
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
      description: "Sync charts state from GCP",
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
