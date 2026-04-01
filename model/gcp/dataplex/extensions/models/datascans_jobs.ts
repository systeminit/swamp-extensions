// Auto-generated extension model for @swamp/gcp/dataplex/datascans-jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.jobs.get",
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
    "view": {
      "location": "query",
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
  createTime: z.string().optional(),
  dataDiscoveryResult: z.object({
    bigqueryPublishing: z.object({
      dataset: z.string(),
      location: z.string(),
    }),
    scanStatistics: z.object({
      dataProcessedBytes: z.string(),
      filesExcluded: z.number(),
      filesetsCreated: z.number(),
      filesetsDeleted: z.number(),
      filesetsUpdated: z.number(),
      scannedFileCount: z.number(),
      tablesCreated: z.number(),
      tablesDeleted: z.number(),
      tablesUpdated: z.number(),
    }),
  }).optional(),
  dataDiscoverySpec: z.object({
    bigqueryPublishingConfig: z.object({
      connection: z.string(),
      location: z.string(),
      project: z.string(),
      tableType: z.string(),
    }),
    storageConfig: z.object({
      csvOptions: z.object({
        delimiter: z.string(),
        encoding: z.string(),
        headerRows: z.number(),
        quote: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
      excludePatterns: z.array(z.string()),
      includePatterns: z.array(z.string()),
      jsonOptions: z.object({
        encoding: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
    }),
  }).optional(),
  dataDocumentationResult: z.object({
    datasetResult: z.object({
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schemaRelationships: z.array(z.object({
        leftSchemaPaths: z.object({
          paths: z.array(z.string()),
          tableFqn: z.string(),
        }),
        rightSchemaPaths: z.object({
          paths: z.array(z.string()),
          tableFqn: z.string(),
        }),
        sources: z.array(z.string()),
        type: z.string(),
      })),
      tableResults: z.array(z.object({
        name: z.string(),
        overview: z.string(),
        queries: z.array(z.object({
          description: z.string(),
          sql: z.string(),
        })),
        schema: z.object({
          fields: z.array(z.object({
            description: z.string(),
            fields: z.array(z.string()),
            name: z.string(),
          })),
        }),
      })),
    }),
    tableResult: z.object({
      name: z.string(),
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schema: z.object({
        fields: z.array(z.object({
          description: z.string(),
          fields: z.array(z.string()),
          name: z.string(),
        })),
      }),
    }),
  }).optional(),
  dataDocumentationSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    generationScopes: z.array(z.string()),
  }).optional(),
  dataProfileResult: z.object({
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    profile: z.object({
      fields: z.array(z.object({
        mode: z.string(),
        name: z.string(),
        profile: z.object({
          distinctRatio: z.number(),
          doubleProfile: z.object({
            average: z.number(),
            max: z.number(),
            min: z.number(),
            quartiles: z.array(z.number()),
            standardDeviation: z.number(),
          }),
          integerProfile: z.object({
            average: z.number(),
            max: z.string(),
            min: z.string(),
            quartiles: z.array(z.string()),
            standardDeviation: z.number(),
          }),
          nullRatio: z.number(),
          stringProfile: z.object({
            averageLength: z.number(),
            maxLength: z.string(),
            minLength: z.string(),
          }),
          topNValues: z.array(z.object({
            count: z.string(),
            ratio: z.number(),
            value: z.string(),
          })),
        }),
        type: z.string(),
      })),
    }),
    rowCount: z.string(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
  }).optional(),
  dataProfileSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    excludeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    includeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
    }),
    rowFilter: z.string(),
    samplingPercent: z.number(),
  }).optional(),
  dataQualityResult: z.object({
    anomalyDetectionGeneratedAssets: z.object({
      dataIntermediateTable: z.string(),
      freshnessIntermediateTable: z.string(),
      resultTable: z.string(),
      volumeIntermediateTable: z.string(),
    }),
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    columns: z.array(z.object({
      column: z.string(),
      dimensions: z.array(z.object({
        dimension: z.object({
          name: z.string(),
        }),
        passed: z.boolean(),
        score: z.number(),
      })),
      passed: z.boolean(),
      score: z.number(),
    })),
    dimensions: z.array(z.object({
      dimension: z.object({
        name: z.string(),
      }),
      passed: z.boolean(),
      score: z.number(),
    })),
    passed: z.boolean(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    rowCount: z.string(),
    rules: z.array(z.object({
      assertionRowCount: z.string(),
      debugQueriesResultSets: z.array(z.object({
        results: z.array(z.object({
          name: z.string(),
          type: z.string(),
          value: z.string(),
        })),
      })),
      evaluatedCount: z.string(),
      failingRowsQuery: z.string(),
      nullCount: z.string(),
      passRatio: z.number(),
      passed: z.boolean(),
      passedCount: z.string(),
      rule: z.object({
        column: z.string(),
        debugQueries: z.array(z.object({
          description: z.string(),
          sqlStatement: z.string(),
        })),
        description: z.string(),
        dimension: z.string(),
        ignoreNull: z.boolean(),
        name: z.string(),
        nonNullExpectation: z.object({}),
        rangeExpectation: z.object({
          maxValue: z.string(),
          minValue: z.string(),
          strictMaxEnabled: z.boolean(),
          strictMinEnabled: z.boolean(),
        }),
        regexExpectation: z.object({
          regex: z.string(),
        }),
        rowConditionExpectation: z.object({
          sqlExpression: z.string(),
        }),
        setExpectation: z.object({
          values: z.array(z.string()),
        }),
        sqlAssertion: z.object({
          sqlStatement: z.string(),
        }),
        statisticRangeExpectation: z.object({
          maxValue: z.string(),
          minValue: z.string(),
          statistic: z.string(),
          strictMaxEnabled: z.boolean(),
          strictMinEnabled: z.boolean(),
        }),
        suspended: z.boolean(),
        tableConditionExpectation: z.object({
          sqlExpression: z.string(),
        }),
        threshold: z.number(),
        uniquenessExpectation: z.object({}),
      }),
    })),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
    score: z.number(),
  }).optional(),
  dataQualitySpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
      notificationReport: z.object({
        jobEndTrigger: z.object({}),
        jobFailureTrigger: z.object({}),
        recipients: z.object({
          emails: z.array(z.string()),
        }),
        scoreThresholdTrigger: z.object({
          scoreThreshold: z.number(),
        }),
      }),
    }),
    rowFilter: z.string(),
    rules: z.array(z.object({
      column: z.string(),
      debugQueries: z.array(z.object({
        description: z.string(),
        sqlStatement: z.string(),
      })),
      description: z.string(),
      dimension: z.string(),
      ignoreNull: z.boolean(),
      name: z.string(),
      nonNullExpectation: z.object({}),
      rangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      regexExpectation: z.object({
        regex: z.string(),
      }),
      rowConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      setExpectation: z.object({
        values: z.array(z.string()),
      }),
      sqlAssertion: z.object({
        sqlStatement: z.string(),
      }),
      statisticRangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        statistic: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      suspended: z.boolean(),
      tableConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      threshold: z.number(),
      uniquenessExpectation: z.object({}),
    })),
    samplingPercent: z.number(),
  }).optional(),
  endTime: z.string().optional(),
  message: z.string().optional(),
  name: z.string(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dataplex/datascans-jobs",
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
      description:
        "A DataScanJob represents an instance of DataScan execution.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Sync jobs state from GCP",
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
    generate_data_quality_rules: {
      description: "generate data quality rules",
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
              "dataplex.projects.locations.dataScans.jobs.generateDataQualityRules",
            "path": "v1/{+name}:generateDataQualityRules",
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
