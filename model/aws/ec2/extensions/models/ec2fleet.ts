// Auto-generated extension model for @swamp/aws/ec2/ec2fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const CapacityReservationOptionsRequestSchema = z.object({
  UsageStrategy: z.enum(["use-capacity-reservations-first"]).optional(),
});

export const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

export const TagSpecificationSchema = z.object({
  ResourceType: z.enum([
    "client-vpn-endpoint",
    "customer-gateway",
    "dedicated-host",
    "dhcp-options",
    "egress-only-internet-gateway",
    "elastic-gpu",
    "elastic-ip",
    "export-image-task",
    "export-instance-task",
    "fleet",
    "fpga-image",
    "host-reservation",
    "image",
    "import-image-task",
    "import-snapshot-task",
    "instance",
    "internet-gateway",
    "key-pair",
    "launch-template",
    "local-gateway-route-table-vpc-association",
    "natgateway",
    "network-acl",
    "network-insights-analysis",
    "network-insights-path",
    "network-interface",
    "placement-group",
    "reserved-instances",
    "route-table",
    "security-group",
    "snapshot",
    "spot-fleet-request",
    "spot-instances-request",
    "subnet",
    "traffic-mirror-filter",
    "traffic-mirror-session",
    "traffic-mirror-target",
    "transit-gateway",
    "transit-gateway-attachment",
    "transit-gateway-connect-peer",
    "transit-gateway-multicast-domain",
    "transit-gateway-route-table",
    "volume",
    "vpc",
    "vpc-flow-log",
    "vpc-peering-connection",
    "vpn-connection",
    "vpn-gateway",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const CapacityRebalanceSchema = z.object({
  ReplacementStrategy: z.enum(["launch", "launch-before-terminate"]).optional(),
  TerminationDelay: z.number().int().optional(),
});

export const MaintenanceStrategiesSchema = z.object({
  CapacityRebalance: CapacityRebalanceSchema.optional(),
});

export const FleetLaunchTemplateSpecificationRequestSchema = z.object({
  LaunchTemplateName: z.string().min(3).max(128).regex(
    new RegExp("[a-zA-Z0-9\\(\\)\\.\\-/_]+"),
  ).optional(),
  LaunchTemplateId: z.string().optional(),
  Version: z.string(),
});

export const PlacementSchema = z.object({
  GroupName: z.string().optional(),
  Tenancy: z.string().optional(),
  SpreadDomain: z.string().optional(),
  PartitionNumber: z.number().int().optional(),
  AvailabilityZone: z.string().optional(),
  Affinity: z.string().optional(),
  HostId: z.string().optional(),
  HostResourceGroupArn: z.string().optional(),
});

export const VCpuCountRangeRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const MemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const MemoryGiBPerVCpuRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

export const NetworkBandwidthGbpsRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

export const NetworkInterfaceCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const TotalLocalStorageGBRequestSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

export const BaselineEbsBandwidthMbpsRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const AcceleratorCountRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const AcceleratorTotalMemoryMiBRequestSchema = z.object({
  Min: z.number().int().optional(),
  Max: z.number().int().optional(),
});

export const PerformanceFactorReferenceRequestSchema = z.object({
  InstanceFamily: z.string().optional(),
});

export const CpuPerformanceFactorRequestSchema = z.object({
  References: z.array(PerformanceFactorReferenceRequestSchema).optional(),
});

export const BaselinePerformanceFactorsRequestSchema = z.object({
  Cpu: CpuPerformanceFactorRequestSchema.optional(),
});

export const InstanceRequirementsRequestSchema = z.object({
  VCpuCount: VCpuCountRangeRequestSchema.optional(),
  MemoryMiB: MemoryMiBRequestSchema.optional(),
  CpuManufacturers: z.array(
    z.enum(["intel", "amd", "amazon-web-services", "apple"]),
  ).optional(),
  MemoryGiBPerVCpu: MemoryGiBPerVCpuRequestSchema.optional(),
  AllowedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  ExcludedInstanceTypes: z.array(
    z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9\\.\\*]+")),
  ).optional(),
  InstanceGenerations: z.array(z.enum(["current", "previous"])).optional(),
  SpotMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  OnDemandMaxPricePercentageOverLowestPrice: z.number().int().optional(),
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: z.number().int().optional(),
  BareMetal: z.enum(["included", "required", "excluded"]).optional(),
  BurstablePerformance: z.enum(["included", "required", "excluded"]).optional(),
  RequireHibernateSupport: z.boolean().optional(),
  NetworkBandwidthGbps: NetworkBandwidthGbpsRequestSchema.optional(),
  NetworkInterfaceCount: NetworkInterfaceCountRequestSchema.optional(),
  LocalStorage: z.enum(["included", "required", "excluded"]).optional(),
  LocalStorageTypes: z.array(z.enum(["hdd", "ssd"])).optional(),
  TotalLocalStorageGB: TotalLocalStorageGBRequestSchema.optional(),
  BaselineEbsBandwidthMbps: BaselineEbsBandwidthMbpsRequestSchema.optional(),
  AcceleratorTypes: z.array(z.enum(["gpu", "fpga", "inference", "media"]))
    .optional(),
  AcceleratorCount: AcceleratorCountRequestSchema.optional(),
  AcceleratorManufacturers: z.array(
    z.enum(["amazon-web-services", "amd", "habana", "nvidia", "xilinx"]),
  ).optional(),
  AcceleratorNames: z.array(
    z.enum([
      "a10g",
      "a100",
      "h100",
      "inferentia",
      "k520",
      "k80",
      "m60",
      "radeon-pro-v520",
      "t4",
      "t4g",
      "vu9p",
      "v100",
      "l40s",
      "l4",
      "gaudi-hl-205",
      "inferentia2",
      "trainium",
      "trainium2",
      "u30",
    ]),
  ).optional(),
  AcceleratorTotalMemoryMiB: AcceleratorTotalMemoryMiBRequestSchema.optional(),
  BaselinePerformanceFactors: BaselinePerformanceFactorsRequestSchema
    .optional(),
  RequireEncryptionInTransit: z.boolean().optional(),
});

export const EbsBlockDeviceSchema = z.object({
  DeleteOnTermination: z.boolean().optional(),
  Encrypted: z.boolean().optional(),
  Iops: z.number().int().optional(),
  KmsKeyId: z.string().optional(),
  SnapshotId: z.string().optional(),
  VolumeSize: z.number().int().optional(),
  VolumeType: z.enum(["gp2", "gp3", "io1", "io2", "sc1", "st1", "standard"])
    .optional(),
});

export const BlockDeviceMappingSchema = z.object({
  DeviceName: z.string().optional(),
  Ebs: EbsBlockDeviceSchema.optional(),
  NoDevice: z.string().optional(),
  VirtualName: z.string().optional(),
});

export const FleetLaunchTemplateOverridesRequestSchema = z.object({
  WeightedCapacity: z.number().optional(),
  Placement: PlacementSchema.optional(),
  Priority: z.number().optional(),
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  SubnetId: z.string().optional(),
  InstanceType: z.string().optional(),
  InstanceRequirements: InstanceRequirementsRequestSchema.optional(),
  MaxPrice: z.string().optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
});

export const FleetLaunchTemplateConfigRequestSchema = z.object({
  LaunchTemplateSpecification: FleetLaunchTemplateSpecificationRequestSchema
    .optional(),
  Overrides: z.array(FleetLaunchTemplateOverridesRequestSchema).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.enum([
      "on-demand",
      "spot",
      "reserved-capacity",
    ]).optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
    TotalTargetCapacity: z.number().int(),
    OnDemandTargetCapacity: z.number().int().optional(),
    SpotTargetCapacity: z.number().int().optional(),
  }),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.string().optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema
      .optional(),
  }).optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.enum(["interruptible-capacity-reservation"]))
      .optional(),
  }).optional(),
  Type: z.enum(["maintain", "request", "instant"]).optional(),
  ExcessCapacityTerminationPolicy: z.enum(["termination", "no-termination"])
    .optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    MaintenanceStrategies: MaintenanceStrategiesSchema.optional(),
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.enum([
      "lowest-price",
      "lowestPrice",
      "diversified",
      "capacityOptimized",
      "capacity-optimized",
      "capacityOptimizedPrioritized",
      "capacity-optimized-prioritized",
      "priceCapacityOptimized",
      "price-capacity-optimized",
    ]).optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
  }).optional(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Context: z.string().optional(),
});

const StateSchema = z.object({
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.string(),
    TargetCapacityUnitType: z.string(),
    TotalTargetCapacity: z.number(),
    OnDemandTargetCapacity: z.number(),
    SpotTargetCapacity: z.number(),
  }).optional(),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean(),
    AllocationStrategy: z.string(),
    SingleInstanceType: z.boolean(),
    MinTargetCapacity: z.number(),
    MaxTotalPrice: z.string(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema,
  }).optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.string()),
  }).optional(),
  Type: z.string().optional(),
  ExcessCapacityTerminationPolicy: z.string().optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    MaintenanceStrategies: MaintenanceStrategiesSchema,
    SingleAvailabilityZone: z.boolean(),
    AllocationStrategy: z.string(),
    SingleInstanceType: z.boolean(),
    MinTargetCapacity: z.number(),
    MaxTotalPrice: z.string(),
    InstanceInterruptionBehavior: z.string(),
    InstancePoolsToUseCount: z.number(),
  }).optional(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema)
    .optional(),
  FleetId: z.string(),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Context: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TargetCapacitySpecification: z.object({
    DefaultTargetCapacityType: z.enum([
      "on-demand",
      "spot",
      "reserved-capacity",
    ]).optional(),
    TargetCapacityUnitType: z.enum(["vcpu", "memory-mib", "units"]).optional(),
    TotalTargetCapacity: z.number().int().optional(),
    OnDemandTargetCapacity: z.number().int().optional(),
    SpotTargetCapacity: z.number().int().optional(),
  }).optional(),
  OnDemandOptions: z.object({
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.string().optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    CapacityReservationOptions: CapacityReservationOptionsRequestSchema
      .optional(),
  }).optional(),
  ReservedCapacityOptions: z.object({
    ReservationTypes: z.array(z.enum(["interruptible-capacity-reservation"]))
      .optional(),
  }).optional(),
  Type: z.enum(["maintain", "request", "instant"]).optional(),
  ExcessCapacityTerminationPolicy: z.enum(["termination", "no-termination"])
    .optional(),
  TagSpecifications: z.array(TagSpecificationSchema).optional(),
  SpotOptions: z.object({
    MaintenanceStrategies: MaintenanceStrategiesSchema.optional(),
    SingleAvailabilityZone: z.boolean().optional(),
    AllocationStrategy: z.enum([
      "lowest-price",
      "lowestPrice",
      "diversified",
      "capacityOptimized",
      "capacity-optimized",
      "capacityOptimizedPrioritized",
      "capacity-optimized-prioritized",
      "priceCapacityOptimized",
      "price-capacity-optimized",
    ]).optional(),
    SingleInstanceType: z.boolean().optional(),
    MinTargetCapacity: z.number().int().optional(),
    MaxTotalPrice: z.string().optional(),
    InstanceInterruptionBehavior: z.enum(["hibernate", "stop", "terminate"])
      .optional(),
    InstancePoolsToUseCount: z.number().int().optional(),
  }).optional(),
  ValidFrom: z.string().optional(),
  ReplaceUnhealthyInstances: z.boolean().optional(),
  LaunchTemplateConfigs: z.array(FleetLaunchTemplateConfigRequestSchema)
    .optional(),
  TerminateInstancesWithExpiration: z.boolean().optional(),
  ValidUntil: z.string().optional(),
  Context: z.string().optional(),
});

export const model = {
  type: "@swamp/aws/ec2/ec2fleet",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 EC2Fleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 EC2Fleet",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::EC2Fleet",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a EC2 EC2Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 EC2Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::EC2Fleet",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a EC2 EC2Fleet",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::EC2Fleet",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::EC2Fleet",
          identifier,
          currentState,
          desiredState,
          [
            "LaunchTemplateConfigs",
            "OnDemandOptions",
            "ReservedCapacityOptions",
            "ReplaceUnhealthyInstances",
            "SpotOptions",
            "TagSpecifications",
            "TerminateInstancesWithExpiration",
            "Type",
            "ValidFrom",
            "ValidUntil",
            "TargetCapacityUnitType",
            "DefaultTargetCapacityType",
          ],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a EC2 EC2Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 EC2Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::EC2Fleet",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync EC2 EC2Fleet state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::EC2Fleet",
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
              identifier,
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
