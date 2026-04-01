// Auto-generated extension model for @swamp/gcp/dlp/filestoredataprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/fileStoreDataProfiles/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.fileStoreDataProfiles.get",
  "path": "v2/{+name}",
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

const DELETE_CONFIG = {
  "id": "dlp.organizations.locations.fileStoreDataProfiles.delete",
  "path": "v2/{+name}",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  configSnapshot: z.object({
    dataProfileJob: z.object({
      dataProfileActions: z.array(z.object({
        exportData: z.object({
          profileTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          sampleFindingsTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        }),
        pubSubNotification: z.object({
          detailOfMessage: z.string(),
          event: z.string(),
          pubsubCondition: z.object({
            expressions: z.object({
              conditions: z.array(z.object({
                minimumRiskScore: z.string(),
                minimumSensitivityScore: z.string(),
              })),
              logicalOperator: z.string(),
            }),
          }),
          topic: z.string(),
        }),
        publishToChronicle: z.object({}),
        publishToDataplexCatalog: z.object({
          lowerDataRiskToLow: z.boolean(),
        }),
        publishToScc: z.object({}),
        tagResources: z.object({
          lowerDataRiskToLow: z.boolean(),
          profileGenerationsToTag: z.array(z.string()),
          tagConditions: z.array(z.object({
            sensitivityScore: z.object({
              score: z.string(),
            }),
            tag: z.object({
              namespacedValue: z.string(),
            }),
          })),
        }),
      })),
      inspectTemplates: z.array(z.string()),
      location: z.object({
        folderId: z.string(),
        organizationId: z.string(),
      }),
      otherCloudStartingLocation: z.object({
        awsLocation: z.object({
          accountId: z.string(),
          allAssetInventoryAssets: z.boolean(),
        }),
      }),
      projectId: z.string(),
    }),
    discoveryConfig: z.object({
      actions: z.array(z.object({
        exportData: z.object({
          profileTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          sampleFindingsTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        }),
        pubSubNotification: z.object({
          detailOfMessage: z.string(),
          event: z.string(),
          pubsubCondition: z.object({
            expressions: z.object({
              conditions: z.array(z.object({
                minimumRiskScore: z.string(),
                minimumSensitivityScore: z.string(),
              })),
              logicalOperator: z.string(),
            }),
          }),
          topic: z.string(),
        }),
        publishToChronicle: z.object({}),
        publishToDataplexCatalog: z.object({
          lowerDataRiskToLow: z.boolean(),
        }),
        publishToScc: z.object({}),
        tagResources: z.object({
          lowerDataRiskToLow: z.boolean(),
          profileGenerationsToTag: z.array(z.string()),
          tagConditions: z.array(z.object({
            sensitivityScore: z.object({
              score: z.string(),
            }),
            tag: z.object({
              namespacedValue: z.string(),
            }),
          })),
        }),
      })),
      createTime: z.string(),
      displayName: z.string(),
      errors: z.array(z.object({
        details: z.object({
          code: z.number(),
          details: z.array(z.record(z.string(), z.unknown())),
          message: z.string(),
        }),
        extraInfo: z.string(),
        timestamps: z.array(z.string()),
      })),
      inspectTemplates: z.array(z.string()),
      lastRunTime: z.string(),
      name: z.string(),
      orgConfig: z.object({
        location: z.object({
          folderId: z.string(),
          organizationId: z.string(),
        }),
        projectId: z.string(),
      }),
      otherCloudStartingLocation: z.object({
        awsLocation: z.object({
          accountId: z.string(),
          allAssetInventoryAssets: z.boolean(),
        }),
      }),
      processingLocation: z.object({
        documentFallbackLocation: z.object({
          globalProcessing: z.object({}),
          multiRegionProcessing: z.object({}),
        }),
        imageFallbackLocation: z.object({
          globalProcessing: z.object({}),
          multiRegionProcessing: z.object({}),
        }),
      }),
      status: z.string(),
      targets: z.array(z.object({
        bigQueryTarget: z.object({
          cadence: z.object({
            inspectTemplateModifiedCadence: z.object({
              frequency: z.string(),
            }),
            refreshFrequency: z.string(),
            schemaModifiedCadence: z.object({
              frequency: z.string(),
              types: z.array(z.string()),
            }),
            tableModifiedCadence: z.object({
              frequency: z.string(),
              types: z.array(z.string()),
            }),
          }),
          conditions: z.object({
            createdAfter: z.string(),
            orConditions: z.object({
              minAge: z.string(),
              minRowCount: z.number(),
            }),
            typeCollection: z.string(),
            types: z.object({
              types: z.array(z.string()),
            }),
          }),
          disabled: z.object({}),
          filter: z.object({
            otherTables: z.object({}),
            tableReference: z.object({
              datasetId: z.string(),
              projectId: z.string(),
              tableId: z.string(),
            }),
            tables: z.object({
              includeRegexes: z.object({
                patterns: z.array(z.object({
                  datasetIdRegex: z.string(),
                  projectIdRegex: z.string(),
                  tableIdRegex: z.string(),
                })),
              }),
            }),
          }),
        }),
        cloudSqlTarget: z.object({
          conditions: z.object({
            databaseEngines: z.array(z.string()),
            types: z.array(z.string()),
          }),
          disabled: z.object({}),
          filter: z.object({
            collection: z.object({
              includeRegexes: z.object({
                patterns: z.array(z.object({
                  databaseRegex: z.string(),
                  databaseResourceNameRegex: z.string(),
                  instanceRegex: z.string(),
                  projectIdRegex: z.string(),
                })),
              }),
            }),
            databaseResourceReference: z.object({
              database: z.string(),
              databaseResource: z.string(),
              instance: z.string(),
              projectId: z.string(),
            }),
            others: z.object({}),
          }),
          generationCadence: z.object({
            inspectTemplateModifiedCadence: z.object({
              frequency: z.string(),
            }),
            refreshFrequency: z.string(),
            schemaModifiedCadence: z.object({
              frequency: z.string(),
              types: z.array(z.string()),
            }),
          }),
        }),
        cloudStorageTarget: z.object({
          conditions: z.object({
            cloudStorageConditions: z.object({
              includedBucketAttributes: z.array(z.string()),
              includedObjectAttributes: z.array(z.string()),
            }),
            createdAfter: z.string(),
            minAge: z.string(),
          }),
          disabled: z.object({}),
          filter: z.object({
            cloudStorageResourceReference: z.object({
              bucketName: z.string(),
              projectId: z.string(),
            }),
            collection: z.object({
              includeRegexes: z.object({
                patterns: z.array(z.object({
                  cloudStorageRegex: z.object({
                    bucketNameRegex: z.string(),
                    projectIdRegex: z.string(),
                  }),
                })),
              }),
              includeTags: z.object({
                tagFilters: z.array(z.object({
                  namespacedTagKey: z.string(),
                  namespacedTagValue: z.string(),
                })),
              }),
            }),
            others: z.object({}),
          }),
          generationCadence: z.object({
            inspectTemplateModifiedCadence: z.object({
              frequency: z.string(),
            }),
            refreshFrequency: z.string(),
          }),
        }),
        otherCloudTarget: z.object({
          conditions: z.object({
            amazonS3BucketConditions: z.object({
              bucketTypes: z.array(z.string()),
              objectStorageClasses: z.array(z.string()),
            }),
            minAge: z.string(),
          }),
          dataSourceType: z.object({
            dataSource: z.string(),
          }),
          disabled: z.object({}),
          filter: z.object({
            collection: z.object({
              includeRegexes: z.object({
                patterns: z.array(z.object({
                  amazonS3BucketRegex: z.object({
                    awsAccountRegex: z.object({
                      accountIdRegex: z.string(),
                    }),
                    bucketNameRegex: z.string(),
                  }),
                })),
              }),
            }),
            others: z.object({}),
            singleResource: z.object({
              amazonS3Bucket: z.object({
                awsAccount: z.object({
                  accountId: z.string(),
                }),
                bucketName: z.string(),
              }),
            }),
          }),
          generationCadence: z.object({
            inspectTemplateModifiedCadence: z.object({
              frequency: z.string(),
            }),
            refreshFrequency: z.string(),
          }),
        }),
        secretsTarget: z.object({}),
        vertexDatasetTarget: z.object({
          conditions: z.object({
            createdAfter: z.string(),
            minAge: z.string(),
          }),
          disabled: z.object({}),
          filter: z.object({
            collection: z.object({
              vertexDatasetRegexes: z.object({
                patterns: z.array(z.object({
                  projectIdRegex: z.string(),
                })),
              }),
            }),
            others: z.object({}),
            vertexDatasetResourceReference: z.object({
              datasetResourceName: z.string(),
            }),
          }),
          generationCadence: z.object({
            inspectTemplateModifiedCadence: z.object({
              frequency: z.string(),
            }),
            refreshFrequency: z.string(),
          }),
        }),
      })),
      updateTime: z.string(),
    }),
    inspectConfig: z.object({
      contentOptions: z.array(z.string()),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.object({
          hotwordRule: z.object({
            hotwordRegex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
            proximity: z.object({
              windowAfter: z.number(),
              windowBefore: z.number(),
            }),
          }),
        })),
        dictionary: z.object({
          cloudStoragePath: z.object({
            path: z.string(),
          }),
          wordList: z.object({
            words: z.array(z.string()),
          }),
        }),
        exclusionType: z.string(),
        infoType: z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        }),
        likelihood: z.string(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.string(),
          valueRegex: z.string(),
        }),
        regex: z.object({
          groupIndexes: z.array(z.number()),
          pattern: z.string(),
        }),
        sensitivityScore: z.object({
          score: z.string(),
        }),
        storedType: z.object({
          createTime: z.string(),
          name: z.string(),
        }),
        surrogateType: z.object({}),
      })),
      excludeInfoTypes: z.boolean(),
      includeQuote: z.boolean(),
      infoTypes: z.array(z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.string(),
        }),
        version: z.string(),
      })),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          }),
          maxFindings: z.number(),
        })),
        maxFindingsPerItem: z.number(),
        maxFindingsPerRequest: z.number(),
      }),
      minLikelihood: z.string(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        }),
        minLikelihood: z.string(),
      })),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        })),
        rules: z.array(z.object({
          adjustmentRule: z.object({
            adjustByImageFindings: z.object({
              imageContainmentType: z.object({
                encloses: z.object({}),
                fullyInside: z.object({}),
                overlaps: z.object({}),
              }),
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
              minLikelihood: z.string(),
            }),
            adjustByMatchingInfoTypes: z.object({
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
              matchingType: z.string(),
              minLikelihood: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
          }),
          exclusionRule: z.object({
            dictionary: z.object({
              cloudStoragePath: z.object({
                path: z.string(),
              }),
              wordList: z.object({
                words: z.array(z.string()),
              }),
            }),
            excludeByHotword: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number()),
                pattern: z.string(),
              }),
              proximity: z.object({
                windowAfter: z.number(),
                windowBefore: z.number(),
              }),
            }),
            excludeByImageFindings: z.object({
              imageContainmentType: z.object({
                encloses: z.object({}),
                fullyInside: z.object({}),
                overlaps: z.object({}),
              }),
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
            }),
            excludeInfoTypes: z.object({
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
            }),
            matchingType: z.string(),
            regex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
          }),
          hotwordRule: z.object({
            hotwordRegex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
            proximity: z.object({
              windowAfter: z.number(),
              windowBefore: z.number(),
            }),
          }),
        })),
      })),
    }),
    inspectTemplateModifiedTime: z.string(),
    inspectTemplateName: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataRiskLevel: z.object({
    score: z.string(),
  }).optional(),
  dataSourceType: z.object({
    dataSource: z.string(),
  }).optional(),
  dataStorageLocations: z.array(z.string()).optional(),
  domains: z.array(z.object({
    category: z.string(),
    signals: z.array(z.string()),
  })).optional(),
  fileClusterSummaries: z.array(z.object({
    dataRiskLevel: z.object({
      score: z.string(),
    }),
    errors: z.array(z.object({
      details: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      extraInfo: z.string(),
      timestamps: z.array(z.string()),
    })),
    fileClusterType: z.object({
      cluster: z.string(),
    }),
    fileExtensionsScanned: z.array(z.object({
      fileExtension: z.string(),
    })),
    fileExtensionsSeen: z.array(z.object({
      fileExtension: z.string(),
    })),
    fileStoreInfoTypeSummaries: z.array(z.object({
      infoType: z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.string(),
        }),
        version: z.string(),
      }),
    })),
    noFilesExist: z.boolean(),
    sensitivityScore: z.object({
      score: z.string(),
    }),
  })).optional(),
  fileStoreInfoTypeSummaries: z.array(z.object({
    infoType: z.object({
      name: z.string(),
      sensitivityScore: z.object({
        score: z.string(),
      }),
      version: z.string(),
    }),
  })).optional(),
  fileStoreIsEmpty: z.boolean().optional(),
  fileStoreLocation: z.string().optional(),
  fileStorePath: z.string().optional(),
  fullResource: z.string().optional(),
  lastModifiedTime: z.string().optional(),
  locationType: z.string().optional(),
  name: z.string(),
  profileLastGenerated: z.string().optional(),
  profileStatus: z.object({
    status: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    timestamp: z.string(),
  }).optional(),
  projectDataProfile: z.string().optional(),
  projectId: z.string().optional(),
  relatedResources: z.array(z.object({
    fullResource: z.string(),
  })).optional(),
  resourceAttributes: z.record(z.string(), z.unknown()).optional(),
  resourceLabels: z.record(z.string(), z.unknown()).optional(),
  resourceVisibility: z.string().optional(),
  sampleFindingsTable: z.object({
    datasetId: z.string(),
    projectId: z.string(),
    tableId: z.string(),
  }).optional(),
  sensitivityScore: z.object({
    score: z.string(),
  }).optional(),
  state: z.string().optional(),
  tags: z.array(z.object({
    key: z.string(),
    namespacedTagValue: z.string(),
    value: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dlp/filestoredataprofiles",
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
        "The profile for a file store. * Cloud Storage: maps 1:1 with a bucket. * Amaz...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a fileStoreDataProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the fileStoreDataProfiles",
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
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the fileStoreDataProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the fileStoreDataProfiles",
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
      description: "Sync fileStoreDataProfiles state from GCP",
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
