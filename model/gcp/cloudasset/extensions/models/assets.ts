// Auto-generated extension model for @swamp/gcp/cloudasset/assets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudasset.googleapis.com/";

const LIST_CONFIG = {
  "id": "cloudasset.assets.list",
  "path": "v1/{+parent}/assets",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assetTypes": {
      "location": "query",
    },
    "contentType": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "readTime": {
      "location": "query",
    },
    "relationshipTypes": {
      "location": "query",
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
  accessLevel: z.object({
    basic: z.object({
      combiningFunction: z.string(),
      conditions: z.array(z.object({
        devicePolicy: z.object({
          allowedDeviceManagementLevels: z.array(z.string()),
          allowedEncryptionStatuses: z.array(z.string()),
          osConstraints: z.array(z.object({
            minimumVersion: z.string(),
            osType: z.string(),
            requireVerifiedChromeOs: z.boolean(),
          })),
          requireAdminApproval: z.boolean(),
          requireCorpOwned: z.boolean(),
          requireScreenlock: z.boolean(),
        }),
        ipSubnetworks: z.array(z.string()),
        members: z.array(z.string()),
        negate: z.boolean(),
        regions: z.array(z.string()),
        requiredAccessLevels: z.array(z.string()),
        vpcNetworkSources: z.array(z.object({
          vpcSubnetwork: z.object({
            network: z.string(),
            vpcIpSubnetworks: z.array(z.string()),
          }),
        })),
      })),
    }),
    custom: z.object({
      expr: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
    }),
    description: z.string(),
    name: z.string(),
    title: z.string(),
  }).optional(),
  accessPolicy: z.object({
    etag: z.string(),
    name: z.string(),
    parent: z.string(),
    scopes: z.array(z.string()),
    title: z.string(),
  }).optional(),
  ancestors: z.array(z.string()).optional(),
  assetExceptions: z.array(z.object({
    details: z.string(),
    exceptionType: z.string(),
  })).optional(),
  assetType: z.string().optional(),
  iamPolicy: z.object({
    auditConfigs: z.array(z.object({
      auditLogConfigs: z.array(z.object({
        exemptedMembers: z.array(z.string()),
        logType: z.string(),
      })),
      service: z.string(),
    })),
    bindings: z.array(z.object({
      condition: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      members: z.array(z.string()),
      role: z.string(),
    })),
    etag: z.string(),
    version: z.number(),
  }).optional(),
  name: z.string(),
  orgPolicy: z.array(z.object({
    booleanPolicy: z.object({
      enforced: z.boolean(),
    }),
    constraint: z.string(),
    etag: z.string(),
    listPolicy: z.object({
      allValues: z.string(),
      allowedValues: z.array(z.string()),
      deniedValues: z.array(z.string()),
      inheritFromParent: z.boolean(),
      suggestedValue: z.string(),
    }),
    restoreDefault: z.object({}),
    updateTime: z.string(),
    version: z.number(),
  })).optional(),
  osInventory: z.object({
    items: z.record(z.string(), z.unknown()),
    name: z.string(),
    osInfo: z.object({
      architecture: z.string(),
      hostname: z.string(),
      kernelRelease: z.string(),
      kernelVersion: z.string(),
      longName: z.string(),
      osconfigAgentVersion: z.string(),
      shortName: z.string(),
      version: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
  relatedAsset: z.object({
    ancestors: z.array(z.string()),
    asset: z.string(),
    assetType: z.string(),
    relationshipType: z.string(),
  }).optional(),
  relatedAssets: z.object({
    assets: z.array(z.object({
      ancestors: z.array(z.string()),
      asset: z.string(),
      assetType: z.string(),
      relationshipType: z.string(),
    })),
    relationshipAttributes: z.object({
      action: z.string(),
      sourceResourceType: z.string(),
      targetResourceType: z.string(),
      type: z.string(),
    }),
  }).optional(),
  resource: z.object({
    data: z.record(z.string(), z.unknown()),
    discoveryDocumentUri: z.string(),
    discoveryName: z.string(),
    location: z.string(),
    parent: z.string(),
    resourceUrl: z.string(),
    version: z.string(),
  }).optional(),
  servicePerimeter: z.object({
    description: z.string(),
    etag: z.string(),
    name: z.string(),
    perimeterType: z.string(),
    spec: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.array(z.string()),
          identityType: z.string(),
          sourceRestriction: z.string(),
          sources: z.array(z.object({
            accessLevel: z.string(),
            resource: z.string(),
          })),
        }),
        egressTo: z.object({
          externalResources: z.array(z.string()),
          operations: z.array(z.object({
            methodSelectors: z.array(z.object({
              method: z.string(),
              permission: z.string(),
            })),
            serviceName: z.string(),
          })),
          resources: z.array(z.string()),
          roles: z.array(z.string()),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.array(z.string()),
          identityType: z.string(),
          sources: z.array(z.object({
            accessLevel: z.string(),
            resource: z.string(),
          })),
        }),
        ingressTo: z.object({
          operations: z.array(z.object({
            methodSelectors: z.array(z.object({
              method: z.string(),
              permission: z.string(),
            })),
            serviceName: z.string(),
          })),
          resources: z.array(z.string()),
          roles: z.array(z.string()),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
      }),
    }),
    status: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.array(z.string()),
          identityType: z.string(),
          sourceRestriction: z.string(),
          sources: z.array(z.object({
            accessLevel: z.string(),
            resource: z.string(),
          })),
        }),
        egressTo: z.object({
          externalResources: z.array(z.string()),
          operations: z.array(z.object({
            methodSelectors: z.array(z.object({
              method: z.string(),
              permission: z.string(),
            })),
            serviceName: z.string(),
          })),
          resources: z.array(z.string()),
          roles: z.array(z.string()),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.array(z.string()),
          identityType: z.string(),
          sources: z.array(z.object({
            accessLevel: z.string(),
            resource: z.string(),
          })),
        }),
        ingressTo: z.object({
          operations: z.array(z.object({
            methodSelectors: z.array(z.object({
              method: z.string(),
              permission: z.string(),
            })),
            serviceName: z.string(),
          })),
          resources: z.array(z.string()),
          roles: z.array(z.string()),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
      }),
    }),
    title: z.string(),
    useExplicitDryRunSpec: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/cloudasset/assets",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An asset in Google Cloud. An asset can be any resource in the Google Cloud [r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync assets state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
