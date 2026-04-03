// Auto-generated extension model for @swamp/gcp/migrationcenter/reportconfigs-reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/reports/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.get",
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

const INSERT_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.create",
  "path": "v1/{+parent}/reports",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "reportId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "migrationcenter.projects.locations.reportConfigs.reports.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe("Free-text description.").optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "PENDING", "SUCCEEDED", "FAILED"])
    .describe("Report creation state.").optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.string().describe("The X-axis label for this data point.")
            .optional(),
          value: z.number().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.string().describe("The X-axis label for this data point.")
            .optional(),
          value: z.number().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      storageUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      totalAssets: z.string().describe(
        "Count of the number of unique assets in this collection.",
      ).optional(),
      totalCores: z.string().describe(
        "Sum of the CPU core count of all the assets in this collection.",
      ).optional(),
      totalMemoryBytes: z.string().describe(
        "Sum of the memory in bytes of all the assets in this collection.",
      ).optional(),
      totalStorageBytes: z.string().describe(
        "Sum of persistent storage in bytes of all the assets in this collection.",
      ).optional(),
    }).describe("Aggregate statistics for a collection of assets.").optional(),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryUtilizationChart: z.object({
          free: z.string().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.string().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        operatingSystem: z.object({
          dataPoints: z.array(z.object({
            label: z.string().describe("The X-axis label for this data point.")
              .optional(),
            value: z.number().describe("The Y-axis value for this data point.")
              .optional(),
          })).describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        softwareInstances: z.object({
          dataPoints: z.array(z.object({
            label: z.string().describe("The X-axis label for this data point.")
              .optional(),
            value: z.number().describe("The Y-axis value for this data point.")
              .optional(),
          })).describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        storageBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        storageUtilizationChart: z.object({
          free: z.string().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.string().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        totalAssets: z.string().describe(
          "Count of the number of unique assets in this collection.",
        ).optional(),
        totalCores: z.string().describe(
          "Sum of the CPU core count of all the assets in this collection.",
        ).optional(),
        totalMemoryBytes: z.string().describe(
          "Sum of the memory in bytes of all the assets in this collection.",
        ).optional(),
        totalStorageBytes: z.string().describe(
          "Sum of persistent storage in bytes of all the assets in this collection.",
        ).optional(),
      }).describe("Aggregate statistics for a collection of assets.")
        .optional(),
      description: z.string().describe("Description for the Group.").optional(),
      displayName: z.string().describe("Display Name for the Group.")
        .optional(),
      overlappingAssetCount: z.string().describe(
        "This field is deprecated, do not rely on it having a value.",
      ).optional(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which were allocated.",
          ).optional(),
          allocatedDiskTypes: z.array(
            z.enum([
              "PERSISTENT_DISK_TYPE_UNSPECIFIED",
              "PERSISTENT_DISK_TYPE_STANDARD",
              "PERSISTENT_DISK_TYPE_BALANCED",
              "PERSISTENT_DISK_TYPE_SSD",
            ]),
          ).describe("Set of disk types allocated to assets.").optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets were allocated.",
          ).optional(),
          machineSeriesAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to this machine series.",
            ).optional(),
            machineSeries: z.object({
              code: z.string().describe(
                "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
              ).optional(),
            }).describe(
              "A machine series, for a target product (e.g. Compute Engine, Google Cloud VMware Engine).",
            ).optional(),
          })).describe("Distribution of assets based on the Machine Series.")
            .optional(),
        }).describe(
          "A set of findings that applies to assets destined for Compute Engine.",
        ).optional(),
        description: z.string().describe("Description for the Preference Set.")
          .optional(),
        displayName: z.string().describe("Display Name of the Preference Set")
          .optional(),
        machinePreferences: z.object({
          commitmentPlan: z.enum([
            "COMMITMENT_PLAN_UNSPECIFIED",
            "COMMITMENT_PLAN_NONE",
            "COMMITMENT_PLAN_ONE_YEAR",
            "COMMITMENT_PLAN_THREE_YEARS",
          ]).describe(
            "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
          ).optional(),
          computeEnginePreferences: z.object({
            licenseType: z.enum([
              "LICENSE_TYPE_UNSPECIFIED",
              "LICENSE_TYPE_DEFAULT",
              "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE",
            ]).describe(
              "License type to consider when calculating costs for virtual machine insights and recommendations. If unspecified, costs are calculated based on the default licensing plan.",
            ).optional(),
            machinePreferences: z.object({
              allowedMachineSeries: z.array(z.object({
                code: z.string().describe(
                  "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
                ).optional(),
              })).describe(
                "Compute Engine machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series.",
              ).optional(),
            }).describe(
              "The type of machines to consider when calculating virtual machine migration insights and recommendations. Not all machine types are available in all zones and regions.",
            ).optional(),
            persistentDiskType: z.enum([
              "PERSISTENT_DISK_TYPE_UNSPECIFIED",
              "PERSISTENT_DISK_TYPE_STANDARD",
              "PERSISTENT_DISK_TYPE_BALANCED",
              "PERSISTENT_DISK_TYPE_SSD",
            ]).describe(
              "Persistent disk type to use. If unspecified (default), all types are considered, based on available usage data.",
            ).optional(),
          }).describe(
            "The user preferences relating to Compute Engine target platform.",
          ).optional(),
          regionPreferences: z.object({
            preferredRegions: z.array(z.string()).describe(
              "A list of preferred regions, ordered by the most preferred region first. Set only valid Google Cloud region names. See https://cloud.google.com/compute/docs/regions-zones for available regions.",
            ).optional(),
          }).describe("The user preferences relating to target regions.")
            .optional(),
          sizingOptimizationStrategy: z.enum([
            "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED",
            "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE",
            "SIZING_OPTIMIZATION_STRATEGY_MODERATE",
            "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE",
          ]).describe(
            "Sizing optimization strategy specifies the preferred strategy used when extrapolating usage data to calculate insights and recommendations for a virtual machine. If you are unsure which value to set, a moderate sizing optimization strategy is often a good value to start with.",
          ).optional(),
          soleTenancyPreferences: z.object({
            commitmentPlan: z.enum([
              "COMMITMENT_PLAN_UNSPECIFIED",
              "ON_DEMAND",
              "COMMITMENT_1_YEAR",
              "COMMITMENT_3_YEAR",
            ]).describe(
              "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
            ).optional(),
            cpuOvercommitRatio: z.number().describe(
              "CPU overcommit ratio. Acceptable values are between 1.0 and 2.0 inclusive.",
            ).optional(),
            hostMaintenancePolicy: z.enum([
              "HOST_MAINTENANCE_POLICY_UNSPECIFIED",
              "HOST_MAINTENANCE_POLICY_DEFAULT",
              "HOST_MAINTENANCE_POLICY_RESTART_IN_PLACE",
              "HOST_MAINTENANCE_POLICY_MIGRATE_WITHIN_NODE_GROUP",
            ]).describe("Sole Tenancy nodes maintenance policy.").optional(),
            nodeTypes: z.array(z.object({
              nodeName: z.string().describe(
                "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
              ).optional(),
            })).describe(
              "A list of sole tenant node types. An empty list means that all possible node types will be considered.",
            ).optional(),
          }).describe("Preferences concerning Sole Tenancy nodes and VMs.")
            .optional(),
          targetProduct: z.enum([
            "COMPUTE_MIGRATION_TARGET_PRODUCT_UNSPECIFIED",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_COMPUTE_ENGINE",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_VMWARE_ENGINE",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_SOLE_TENANCY",
          ]).describe(
            "Target product for assets using this preference set. Specify either target product or business goal, but not both.",
          ).optional(),
          vmwareEnginePreferences: z.object({
            commitmentPlan: z.enum([
              "COMMITMENT_PLAN_UNSPECIFIED",
              "ON_DEMAND",
              "COMMITMENT_1_YEAR_MONTHLY_PAYMENTS",
              "COMMITMENT_3_YEAR_MONTHLY_PAYMENTS",
              "COMMITMENT_1_YEAR_UPFRONT_PAYMENT",
              "COMMITMENT_3_YEAR_UPFRONT_PAYMENT",
            ]).describe(
              "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
            ).optional(),
            cpuOvercommitRatio: z.number().describe(
              "CPU overcommit ratio. Acceptable values are between 1.0 and 8.0, with 0.1 increment.",
            ).optional(),
            memoryOvercommitRatio: z.number().describe(
              "Memory overcommit ratio. Acceptable values are 1.0, 1.25, 1.5, 1.75 and 2.0.",
            ).optional(),
            storageDeduplicationCompressionRatio: z.number().describe(
              "The Deduplication and Compression ratio is based on the logical (Used Before) space required to store data before applying deduplication and compression, in relation to the physical (Used After) space required after applying deduplication and compression. Specifically, the ratio is the Used Before space divided by the Used After space. For example, if the Used Before space is 3 GB, but the physical Used After space is 1 GB, the deduplication and compression ratio is 3x. Acceptable values are between 1.0 and 4.0.",
            ).optional(),
          }).describe(
            "The user preferences relating to Google Cloud VMware Engine target platform.",
          ).optional(),
        }).describe(
          "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
        ).optional(),
        monthlyCostCompute: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostNetworkEgress: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostOsLicense: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostOther: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostStorage: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostTotal: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        soleTenantFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which are allocated",
          ).optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets are allocated",
          ).optional(),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to these nodes",
            ).optional(),
            node: z.object({
              nodeName: z.string().describe(
                "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
              ).optional(),
            }).describe("A Sole Tenant node type.").optional(),
            nodeCount: z.string().describe(
              "Count of this node type to be provisioned",
            ).optional(),
          })).describe("Set of per-nodetype allocation records").optional(),
        }).describe(
          "A set of findings that applies to assets destined for Sole-Tenant nodes.",
        ).optional(),
        vmwareEngineFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which are allocated",
          ).optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets were allocated",
          ).optional(),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to these nodes",
            ).optional(),
            nodeCount: z.string().describe(
              "Count of this node type to be provisioned",
            ).optional(),
            vmwareNode: z.object({
              code: z.string().describe(
                'Code to identify VMware Engine node series, e.g. "ve1-standard-72". Based on the displayName of cloud.google.com/vmware-engine/docs/reference/rest/v1/projects.locations.nodeTypes',
              ).optional(),
            }).describe("A VMWare Engine Node").optional(),
          })).describe("Set of per-nodetype allocation records").optional(),
        }).describe(
          "A set of findings that applies to assets destined for VMWare Engine.",
        ).optional(),
      })).describe("Findings for each of the PreferenceSets for this group.")
        .optional(),
    })).describe("Findings for each Group included in this report.").optional(),
  }).describe(
    "Describes the Summary view of a Report, which contains aggregated values for all the groups and preference sets included in this Report.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TOTAL_COST_OF_OWNERSHIP"]).describe(
    "Report type.",
  ).optional(),
  reportId: z.string().describe(
    "Required. User specified id for the report. It will become the last component of the report name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The id must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          lowerBound: z.string(),
          upperBound: z.string(),
        })),
      }),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          lowerBound: z.string(),
          upperBound: z.string(),
        })),
      }),
      memoryUtilizationChart: z.object({
        free: z.string(),
        used: z.string(),
      }),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.string(),
          value: z.number(),
        })),
      }),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.string(),
          value: z.number(),
        })),
      }),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string(),
          lowerBound: z.string(),
          upperBound: z.string(),
        })),
      }),
      storageUtilizationChart: z.object({
        free: z.string(),
        used: z.string(),
      }),
      totalAssets: z.string(),
      totalCores: z.string(),
      totalMemoryBytes: z.string(),
      totalStorageBytes: z.string(),
    }),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string(),
            lowerBound: z.string(),
            upperBound: z.string(),
          })),
        }),
        memoryBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string(),
            lowerBound: z.string(),
            upperBound: z.string(),
          })),
        }),
        memoryUtilizationChart: z.object({
          free: z.string(),
          used: z.string(),
        }),
        operatingSystem: z.object({
          dataPoints: z.array(z.object({
            label: z.string(),
            value: z.number(),
          })),
        }),
        softwareInstances: z.object({
          dataPoints: z.array(z.object({
            label: z.string(),
            value: z.number(),
          })),
        }),
        storageBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string(),
            lowerBound: z.string(),
            upperBound: z.string(),
          })),
        }),
        storageUtilizationChart: z.object({
          free: z.string(),
          used: z.string(),
        }),
        totalAssets: z.string(),
        totalCores: z.string(),
        totalMemoryBytes: z.string(),
        totalStorageBytes: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
      overlappingAssetCount: z.string(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.object({
          allocatedAssetCount: z.string(),
          allocatedDiskTypes: z.array(z.string()),
          allocatedRegions: z.array(z.string()),
          machineSeriesAllocations: z.array(z.object({
            allocatedAssetCount: z.string(),
            machineSeries: z.object({
              code: z.string(),
            }),
          })),
        }),
        description: z.string(),
        displayName: z.string(),
        machinePreferences: z.object({
          commitmentPlan: z.string(),
          computeEnginePreferences: z.object({
            licenseType: z.string(),
            machinePreferences: z.object({
              allowedMachineSeries: z.array(z.object({
                code: z.string(),
              })),
            }),
            persistentDiskType: z.string(),
          }),
          regionPreferences: z.object({
            preferredRegions: z.array(z.string()),
          }),
          sizingOptimizationStrategy: z.string(),
          soleTenancyPreferences: z.object({
            commitmentPlan: z.string(),
            cpuOvercommitRatio: z.number(),
            hostMaintenancePolicy: z.string(),
            nodeTypes: z.array(z.object({
              nodeName: z.string(),
            })),
          }),
          targetProduct: z.string(),
          vmwareEnginePreferences: z.object({
            commitmentPlan: z.string(),
            cpuOvercommitRatio: z.number(),
            memoryOvercommitRatio: z.number(),
            storageDeduplicationCompressionRatio: z.number(),
          }),
        }),
        monthlyCostCompute: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        monthlyCostNetworkEgress: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        monthlyCostOsLicense: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        monthlyCostOther: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        monthlyCostStorage: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        monthlyCostTotal: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        soleTenantFinding: z.object({
          allocatedAssetCount: z.string(),
          allocatedRegions: z.array(z.string()),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string(),
            node: z.object({
              nodeName: z.string(),
            }),
            nodeCount: z.string(),
          })),
        }),
        vmwareEngineFinding: z.object({
          allocatedAssetCount: z.string(),
          allocatedRegions: z.array(z.string()),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string(),
            nodeCount: z.string(),
            vmwareNode: z.object({
              code: z.string(),
            }),
          })),
        }),
      })),
    })),
  }).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe("Free-text description.").optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "PENDING", "SUCCEEDED", "FAILED"])
    .describe("Report creation state.").optional(),
  summary: z.object({
    allAssetsStats: z.object({
      coreCountHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      memoryUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      operatingSystem: z.object({
        dataPoints: z.array(z.object({
          label: z.string().describe("The X-axis label for this data point.")
            .optional(),
          value: z.number().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      softwareInstances: z.object({
        dataPoints: z.array(z.object({
          label: z.string().describe("The X-axis label for this data point.")
            .optional(),
          value: z.number().describe("The Y-axis value for this data point.")
            .optional(),
        })).describe(
          "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
        ).optional(),
      }).describe("Describes a collection of data points rendered as a Chart.")
        .optional(),
      storageBytesHistogram: z.object({
        buckets: z.array(z.object({
          count: z.string().describe("Count of items in the bucket.")
            .optional(),
          lowerBound: z.string().describe("Lower bound - inclusive.")
            .optional(),
          upperBound: z.string().describe("Upper bound - exclusive.")
            .optional(),
        })).describe(
          "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
        ).optional(),
      }).describe(
        "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
      ).optional(),
      storageUtilizationChart: z.object({
        free: z.string().describe(
          'Aggregate value which falls into the "Free" bucket.',
        ).optional(),
        used: z.string().describe(
          'Aggregate value which falls into the "Used" bucket.',
        ).optional(),
      }).describe(
        'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
      ).optional(),
      totalAssets: z.string().describe(
        "Count of the number of unique assets in this collection.",
      ).optional(),
      totalCores: z.string().describe(
        "Sum of the CPU core count of all the assets in this collection.",
      ).optional(),
      totalMemoryBytes: z.string().describe(
        "Sum of the memory in bytes of all the assets in this collection.",
      ).optional(),
      totalStorageBytes: z.string().describe(
        "Sum of persistent storage in bytes of all the assets in this collection.",
      ).optional(),
    }).describe("Aggregate statistics for a collection of assets.").optional(),
    groupFindings: z.array(z.object({
      assetAggregateStats: z.object({
        coreCountHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        memoryUtilizationChart: z.object({
          free: z.string().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.string().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        operatingSystem: z.object({
          dataPoints: z.array(z.object({
            label: z.string().describe("The X-axis label for this data point.")
              .optional(),
            value: z.number().describe("The Y-axis value for this data point.")
              .optional(),
          })).describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        softwareInstances: z.object({
          dataPoints: z.array(z.object({
            label: z.string().describe("The X-axis label for this data point.")
              .optional(),
            value: z.number().describe("The Y-axis value for this data point.")
              .optional(),
          })).describe(
            "Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value.",
          ).optional(),
        }).describe(
          "Describes a collection of data points rendered as a Chart.",
        ).optional(),
        storageBytesHistogram: z.object({
          buckets: z.array(z.object({
            count: z.string().describe("Count of items in the bucket.")
              .optional(),
            lowerBound: z.string().describe("Lower bound - inclusive.")
              .optional(),
            upperBound: z.string().describe("Upper bound - exclusive.")
              .optional(),
          })).describe(
            "Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity.",
          ).optional(),
        }).describe(
          "A Histogram Chart shows a distribution of values into buckets, showing a count of values which fall into a bucket.",
        ).optional(),
        storageUtilizationChart: z.object({
          free: z.string().describe(
            'Aggregate value which falls into the "Free" bucket.',
          ).optional(),
          used: z.string().describe(
            'Aggregate value which falls into the "Used" bucket.',
          ).optional(),
        }).describe(
          'Utilization Chart is a specific type of visualization which displays a metric classified into "Used" and "Free" buckets.',
        ).optional(),
        totalAssets: z.string().describe(
          "Count of the number of unique assets in this collection.",
        ).optional(),
        totalCores: z.string().describe(
          "Sum of the CPU core count of all the assets in this collection.",
        ).optional(),
        totalMemoryBytes: z.string().describe(
          "Sum of the memory in bytes of all the assets in this collection.",
        ).optional(),
        totalStorageBytes: z.string().describe(
          "Sum of persistent storage in bytes of all the assets in this collection.",
        ).optional(),
      }).describe("Aggregate statistics for a collection of assets.")
        .optional(),
      description: z.string().describe("Description for the Group.").optional(),
      displayName: z.string().describe("Display Name for the Group.")
        .optional(),
      overlappingAssetCount: z.string().describe(
        "This field is deprecated, do not rely on it having a value.",
      ).optional(),
      preferenceSetFindings: z.array(z.object({
        computeEngineFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which were allocated.",
          ).optional(),
          allocatedDiskTypes: z.array(
            z.enum([
              "PERSISTENT_DISK_TYPE_UNSPECIFIED",
              "PERSISTENT_DISK_TYPE_STANDARD",
              "PERSISTENT_DISK_TYPE_BALANCED",
              "PERSISTENT_DISK_TYPE_SSD",
            ]),
          ).describe("Set of disk types allocated to assets.").optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets were allocated.",
          ).optional(),
          machineSeriesAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to this machine series.",
            ).optional(),
            machineSeries: z.object({
              code: z.string().describe(
                "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
              ).optional(),
            }).describe(
              "A machine series, for a target product (e.g. Compute Engine, Google Cloud VMware Engine).",
            ).optional(),
          })).describe("Distribution of assets based on the Machine Series.")
            .optional(),
        }).describe(
          "A set of findings that applies to assets destined for Compute Engine.",
        ).optional(),
        description: z.string().describe("Description for the Preference Set.")
          .optional(),
        displayName: z.string().describe("Display Name of the Preference Set")
          .optional(),
        machinePreferences: z.object({
          commitmentPlan: z.enum([
            "COMMITMENT_PLAN_UNSPECIFIED",
            "COMMITMENT_PLAN_NONE",
            "COMMITMENT_PLAN_ONE_YEAR",
            "COMMITMENT_PLAN_THREE_YEARS",
          ]).describe(
            "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
          ).optional(),
          computeEnginePreferences: z.object({
            licenseType: z.enum([
              "LICENSE_TYPE_UNSPECIFIED",
              "LICENSE_TYPE_DEFAULT",
              "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE",
            ]).describe(
              "License type to consider when calculating costs for virtual machine insights and recommendations. If unspecified, costs are calculated based on the default licensing plan.",
            ).optional(),
            machinePreferences: z.object({
              allowedMachineSeries: z.array(z.object({
                code: z.string().describe(
                  "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
                ).optional(),
              })).describe(
                "Compute Engine machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series.",
              ).optional(),
            }).describe(
              "The type of machines to consider when calculating virtual machine migration insights and recommendations. Not all machine types are available in all zones and regions.",
            ).optional(),
            persistentDiskType: z.enum([
              "PERSISTENT_DISK_TYPE_UNSPECIFIED",
              "PERSISTENT_DISK_TYPE_STANDARD",
              "PERSISTENT_DISK_TYPE_BALANCED",
              "PERSISTENT_DISK_TYPE_SSD",
            ]).describe(
              "Persistent disk type to use. If unspecified (default), all types are considered, based on available usage data.",
            ).optional(),
          }).describe(
            "The user preferences relating to Compute Engine target platform.",
          ).optional(),
          regionPreferences: z.object({
            preferredRegions: z.array(z.string()).describe(
              "A list of preferred regions, ordered by the most preferred region first. Set only valid Google Cloud region names. See https://cloud.google.com/compute/docs/regions-zones for available regions.",
            ).optional(),
          }).describe("The user preferences relating to target regions.")
            .optional(),
          sizingOptimizationStrategy: z.enum([
            "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED",
            "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE",
            "SIZING_OPTIMIZATION_STRATEGY_MODERATE",
            "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE",
          ]).describe(
            "Sizing optimization strategy specifies the preferred strategy used when extrapolating usage data to calculate insights and recommendations for a virtual machine. If you are unsure which value to set, a moderate sizing optimization strategy is often a good value to start with.",
          ).optional(),
          soleTenancyPreferences: z.object({
            commitmentPlan: z.enum([
              "COMMITMENT_PLAN_UNSPECIFIED",
              "ON_DEMAND",
              "COMMITMENT_1_YEAR",
              "COMMITMENT_3_YEAR",
            ]).describe(
              "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
            ).optional(),
            cpuOvercommitRatio: z.number().describe(
              "CPU overcommit ratio. Acceptable values are between 1.0 and 2.0 inclusive.",
            ).optional(),
            hostMaintenancePolicy: z.enum([
              "HOST_MAINTENANCE_POLICY_UNSPECIFIED",
              "HOST_MAINTENANCE_POLICY_DEFAULT",
              "HOST_MAINTENANCE_POLICY_RESTART_IN_PLACE",
              "HOST_MAINTENANCE_POLICY_MIGRATE_WITHIN_NODE_GROUP",
            ]).describe("Sole Tenancy nodes maintenance policy.").optional(),
            nodeTypes: z.array(z.object({
              nodeName: z.string().describe(
                "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
              ).optional(),
            })).describe(
              "A list of sole tenant node types. An empty list means that all possible node types will be considered.",
            ).optional(),
          }).describe("Preferences concerning Sole Tenancy nodes and VMs.")
            .optional(),
          targetProduct: z.enum([
            "COMPUTE_MIGRATION_TARGET_PRODUCT_UNSPECIFIED",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_COMPUTE_ENGINE",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_VMWARE_ENGINE",
            "COMPUTE_MIGRATION_TARGET_PRODUCT_SOLE_TENANCY",
          ]).describe(
            "Target product for assets using this preference set. Specify either target product or business goal, but not both.",
          ).optional(),
          vmwareEnginePreferences: z.object({
            commitmentPlan: z.enum([
              "COMMITMENT_PLAN_UNSPECIFIED",
              "ON_DEMAND",
              "COMMITMENT_1_YEAR_MONTHLY_PAYMENTS",
              "COMMITMENT_3_YEAR_MONTHLY_PAYMENTS",
              "COMMITMENT_1_YEAR_UPFRONT_PAYMENT",
              "COMMITMENT_3_YEAR_UPFRONT_PAYMENT",
            ]).describe(
              "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
            ).optional(),
            cpuOvercommitRatio: z.number().describe(
              "CPU overcommit ratio. Acceptable values are between 1.0 and 8.0, with 0.1 increment.",
            ).optional(),
            memoryOvercommitRatio: z.number().describe(
              "Memory overcommit ratio. Acceptable values are 1.0, 1.25, 1.5, 1.75 and 2.0.",
            ).optional(),
            storageDeduplicationCompressionRatio: z.number().describe(
              "The Deduplication and Compression ratio is based on the logical (Used Before) space required to store data before applying deduplication and compression, in relation to the physical (Used After) space required after applying deduplication and compression. Specifically, the ratio is the Used Before space divided by the Used After space. For example, if the Used Before space is 3 GB, but the physical Used After space is 1 GB, the deduplication and compression ratio is 3x. Acceptable values are between 1.0 and 4.0.",
            ).optional(),
          }).describe(
            "The user preferences relating to Google Cloud VMware Engine target platform.",
          ).optional(),
        }).describe(
          "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
        ).optional(),
        monthlyCostCompute: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostNetworkEgress: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostOsLicense: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostOther: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostStorage: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        monthlyCostTotal: z.object({
          currencyCode: z.string().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.number().int().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.string().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        soleTenantFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which are allocated",
          ).optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets are allocated",
          ).optional(),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to these nodes",
            ).optional(),
            node: z.object({
              nodeName: z.string().describe(
                "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
              ).optional(),
            }).describe("A Sole Tenant node type.").optional(),
            nodeCount: z.string().describe(
              "Count of this node type to be provisioned",
            ).optional(),
          })).describe("Set of per-nodetype allocation records").optional(),
        }).describe(
          "A set of findings that applies to assets destined for Sole-Tenant nodes.",
        ).optional(),
        vmwareEngineFinding: z.object({
          allocatedAssetCount: z.string().describe(
            "Count of assets which are allocated",
          ).optional(),
          allocatedRegions: z.array(z.string()).describe(
            "Set of regions in which the assets were allocated",
          ).optional(),
          nodeAllocations: z.array(z.object({
            allocatedAssetCount: z.string().describe(
              "Count of assets allocated to these nodes",
            ).optional(),
            nodeCount: z.string().describe(
              "Count of this node type to be provisioned",
            ).optional(),
            vmwareNode: z.object({
              code: z.string().describe(
                'Code to identify VMware Engine node series, e.g. "ve1-standard-72". Based on the displayName of cloud.google.com/vmware-engine/docs/reference/rest/v1/projects.locations.nodeTypes',
              ).optional(),
            }).describe("A VMWare Engine Node").optional(),
          })).describe("Set of per-nodetype allocation records").optional(),
        }).describe(
          "A set of findings that applies to assets destined for VMWare Engine.",
        ).optional(),
      })).describe("Findings for each of the PreferenceSets for this group.")
        .optional(),
    })).describe("Findings for each Group included in this report.").optional(),
  }).describe(
    "Describes the Summary view of a Report, which contains aggregated values for all the groups and preference sets included in this Report.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TOTAL_COST_OF_OWNERSHIP"]).describe(
    "Report type.",
  ).optional(),
  reportId: z.string().describe(
    "Required. User specified id for the report. It will become the last component of the report name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The id must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/migrationcenter/reportconfigs-reports",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Report represents a point-in-time rendering of the ReportConfig results.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reports",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["summary"] !== undefined) body["summary"] = g["summary"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["reportId"] !== undefined) body["reportId"] = g["reportId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
        ) as StateData;
        const instanceName = g.name?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
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
      description: "Delete the reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
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
      description: "Sync reports state from GCP",
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
