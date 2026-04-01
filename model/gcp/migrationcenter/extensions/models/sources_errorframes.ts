// Auto-generated extension model for @swamp/gcp/migrationcenter/sources-errorframes
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
  return `${parent}/errorFrames/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.sources.errorFrames.get",
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
  ingestionTime: z.string().optional(),
  name: z.string(),
  originalFrame: z.object({
    attributes: z.record(z.string(), z.unknown()),
    collectionType: z.string(),
    databaseDeploymentDetails: z.object({
      aggregatedStats: z.object({
        databaseCount: z.number(),
      }),
      awsRds: z.object({}),
      edition: z.string(),
      generatedId: z.string(),
      manualUniqueId: z.string(),
      mysql: z.object({
        plugins: z.array(z.object({
          enabled: z.boolean(),
          plugin: z.string(),
          version: z.string(),
        })),
        properties: z.array(z.object({
          enabled: z.boolean(),
          numericValue: z.string(),
          property: z.string(),
        })),
        resourceGroupsCount: z.number(),
        variables: z.array(z.object({
          category: z.string(),
          value: z.string(),
          variable: z.string(),
        })),
      }),
      postgresql: z.object({
        properties: z.array(z.object({
          enabled: z.boolean(),
          numericValue: z.string(),
          property: z.string(),
        })),
        settings: z.array(z.object({
          boolValue: z.boolean(),
          intValue: z.string(),
          realValue: z.number(),
          setting: z.string(),
          source: z.string(),
          stringValue: z.string(),
          unit: z.string(),
        })),
      }),
      sqlServer: z.object({
        features: z.array(z.object({
          enabled: z.boolean(),
          featureName: z.string(),
        })),
        serverFlags: z.array(z.object({
          serverFlagName: z.string(),
          value: z.string(),
          valueInUse: z.string(),
        })),
        traceFlags: z.array(z.object({
          scope: z.string(),
          traceFlagName: z.string(),
        })),
      }),
      topology: z.object({
        coreCount: z.number(),
        coreLimit: z.number(),
        diskAllocatedBytes: z.string(),
        diskUsedBytes: z.string(),
        instances: z.array(z.object({
          instanceName: z.string(),
          network: z.object({
            hostNames: z.array(z.string()),
            ipAddresses: z.array(z.string()),
            primaryMacAddress: z.string(),
          }),
          role: z.string(),
        })),
        memoryBytes: z.string(),
        memoryLimitBytes: z.string(),
        physicalCoreCount: z.number(),
        physicalCoreLimit: z.number(),
      }),
      version: z.string(),
    }),
    databaseDetails: z.object({
      allocatedStorageBytes: z.string(),
      databaseName: z.string(),
      parentDatabaseDeployment: z.object({
        generatedId: z.string(),
        manualUniqueId: z.string(),
      }),
      schemas: z.array(z.object({
        mysql: z.object({
          storageEngines: z.array(z.object({
            encryptedTableCount: z.number(),
            engine: z.string(),
            tableCount: z.number(),
          })),
        }),
        objects: z.array(z.object({
          category: z.string(),
          count: z.string(),
        })),
        postgresql: z.object({
          foreignTablesCount: z.number(),
          postgresqlExtensions: z.array(z.object({
            extension: z.string(),
            version: z.string(),
          })),
        }),
        schemaName: z.string(),
        sqlServer: z.object({
          clrObjectCount: z.number(),
        }),
        tablesSizeBytes: z.string(),
      })),
    }),
    labels: z.record(z.string(), z.unknown()),
    machineDetails: z.object({
      architecture: z.object({
        bios: z.object({
          biosName: z.string(),
          id: z.string(),
          manufacturer: z.string(),
          releaseDate: z.object({
            day: z.number(),
            month: z.number(),
            year: z.number(),
          }),
          smbiosUuid: z.string(),
          version: z.string(),
        }),
        cpuArchitecture: z.string(),
        cpuManufacturer: z.string(),
        cpuName: z.string(),
        cpuSocketCount: z.number(),
        cpuThreadCount: z.number(),
        firmwareType: z.string(),
        hyperthreading: z.string(),
        vendor: z.string(),
      }),
      coreCount: z.number(),
      createTime: z.string(),
      diskPartitions: z.object({
        freeSpaceBytes: z.string(),
        partitions: z.object({
          entries: z.array(z.object({
            capacityBytes: z.string(),
            fileSystem: z.string(),
            freeBytes: z.string(),
            mountPoint: z.string(),
            subPartitions: z.string(),
            type: z.string(),
            uuid: z.string(),
          })),
        }),
        totalCapacityBytes: z.string(),
      }),
      disks: z.object({
        disks: z.object({
          entries: z.array(z.object({
            capacityBytes: z.string(),
            diskLabel: z.string(),
            diskLabelType: z.string(),
            freeBytes: z.string(),
            hwAddress: z.string(),
            interfaceType: z.string(),
            partitions: z.object({
              entries: z.array(z.object({
                capacityBytes: z.string(),
                fileSystem: z.string(),
                freeBytes: z.string(),
                mountPoint: z.string(),
                subPartitions: z.string(),
                type: z.string(),
                uuid: z.string(),
              })),
            }),
            vmware: z.object({
              backingType: z.string(),
              rdmCompatibility: z.string(),
              shared: z.boolean(),
              vmdkMode: z.string(),
            }),
          })),
        }),
        totalCapacityBytes: z.string(),
        totalFreeBytes: z.string(),
      }),
      guestOs: z.object({
        config: z.object({
          fstab: z.object({
            entries: z.array(z.object({
              file: z.string(),
              freq: z.number(),
              mntops: z.string(),
              passno: z.number(),
              spec: z.string(),
              vfstype: z.string(),
            })),
          }),
          hosts: z.object({
            entries: z.array(z.object({
              hostNames: z.array(z.string()),
              ip: z.string(),
            })),
          }),
          issue: z.string(),
          nfsExports: z.object({
            entries: z.array(z.object({
              exportDirectory: z.string(),
              hosts: z.array(z.string()),
            })),
          }),
          selinuxMode: z.string(),
        }),
        family: z.string(),
        osName: z.string(),
        runtime: z.object({
          domain: z.string(),
          installedApps: z.object({
            entries: z.array(z.object({
              applicationName: z.string(),
              installTime: z.string(),
              licenses: z.array(z.string()),
              path: z.string(),
              vendor: z.string(),
              version: z.string(),
            })),
          }),
          lastBootTime: z.string(),
          machineName: z.string(),
          network: z.object({
            connections: z.object({
              entries: z.array(z.object({
                localIpAddress: z.string(),
                localPort: z.number(),
                pid: z.string(),
                processName: z.string(),
                protocol: z.string(),
                remoteIpAddress: z.string(),
                remotePort: z.number(),
                state: z.string(),
              })),
            }),
            scanTime: z.string(),
          }),
          openFileList: z.object({
            entries: z.array(z.object({
              command: z.string(),
              filePath: z.string(),
              fileType: z.string(),
              user: z.string(),
            })),
          }),
          processes: z.object({
            entries: z.array(z.object({
              attributes: z.record(z.string(), z.unknown()),
              cmdline: z.string(),
              exePath: z.string(),
              pid: z.string(),
              user: z.string(),
            })),
          }),
          services: z.object({
            entries: z.array(z.object({
              cmdline: z.string(),
              exePath: z.string(),
              pid: z.string(),
              serviceName: z.string(),
              startMode: z.string(),
              state: z.string(),
            })),
          }),
        }),
        version: z.string(),
      }),
      machineName: z.string(),
      memoryMb: z.number(),
      network: z.object({
        adapters: z.object({
          entries: z.array(z.object({
            adapterType: z.string(),
            addresses: z.object({
              entries: z.array(z.object({
                assignment: z.string(),
                bcast: z.string(),
                fqdn: z.string(),
                ipAddress: z.string(),
                subnetMask: z.string(),
              })),
            }),
            macAddress: z.string(),
          })),
        }),
        defaultGateway: z.string(),
        primaryIpAddress: z.string(),
        primaryMacAddress: z.string(),
        publicIpAddress: z.string(),
      }),
      platform: z.object({
        awsEc2Details: z.object({
          hyperthreading: z.string(),
          location: z.string(),
          machineTypeLabel: z.string(),
        }),
        azureVmDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
          machineTypeLabel: z.string(),
          provisioningState: z.string(),
        }),
        genericDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
        }),
        physicalDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
        }),
        vmwareDetails: z.object({
          esxHyperthreading: z.string(),
          esxVersion: z.string(),
          osid: z.string(),
          vcenterFolder: z.string(),
          vcenterUri: z.string(),
          vcenterVersion: z.string(),
          vcenterVmId: z.string(),
        }),
      }),
      powerState: z.string(),
      uuid: z.string(),
    }),
    performanceSamples: z.array(z.object({
      cpu: z.object({
        utilizedPercentage: z.number(),
      }),
      disk: z.object({
        averageIops: z.number(),
        averageReadIops: z.number(),
        averageWriteIops: z.number(),
      }),
      memory: z.object({
        utilizedPercentage: z.number(),
      }),
      network: z.object({
        averageEgressBps: z.number(),
        averageIngressBps: z.number(),
      }),
      sampleTime: z.string(),
    })),
    reportTime: z.string(),
    traceToken: z.string(),
  }).optional(),
  violations: z.array(z.object({
    field: z.string(),
    violation: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/migrationcenter/sources-errorframes",
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
        "Message representing a frame which failed to be processed due to an error.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a errorFrames",
      arguments: z.object({
        identifier: z.string().describe("The name of the errorFrames"),
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
      description: "Sync errorFrames state from GCP",
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
