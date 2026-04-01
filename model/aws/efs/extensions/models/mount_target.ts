// Auto-generated extension model for @swamp/aws/efs/mount-target
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  IpAddress: z.string().describe(
    "If the IpAddressType for the mount target is IPv4 ( IPV4_ONLY or DUAL_STACK), then specify the IPv4 address to use. If you do not specify an IpAddress, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  Ipv6Address: z.string().describe(
    "If the IPAddressType for the mount target is IPv6 ( IPV6_ONLY or DUAL_STACK), then specify the IPv6 address to use. If you do not specify an Ipv6Address, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  IpAddressType: z.enum(["IPV4_ONLY", "IPV6_ONLY", "DUAL_STACK"]).describe(
    "The IP address type for the mount target. The possible values are IPV4_ONLY (only IPv4 addresses), IPV6_ONLY (only IPv6 addresses), and DUAL_STACK (dual-stack, both IPv4 and IPv6 addresses). If you don’t specify an IpAddressType, then IPV4_ONLY is used. The IPAddressType must match the IP type of the subnet. Additionally, the IPAddressType parameter overrides the value set as the default IP address for the subnet in the VPC. For example, if the IPAddressType is IPV4_ONLY and AssignIpv6AddressOnCreation is true, then IPv4 is used for the mount target. For more information, see [Modify the IP addressing attributes of your subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-public-ip.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the file system for which to create the mount target.",
  ),
  SecurityGroups: z.array(z.string()).describe(
    "VPC security group IDs, of the form sg-xxxxxxxx. These must be for the same VPC as the subnet specified. The maximum number of security groups depends on account quota. For more information, see [Amazon VPC Quotas](https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html) in the *Amazon VPC User Guide* (see the *Security Groups* table). If you don't specify a security group, then Amazon EFS uses the default security group for the subnet's VPC.",
  ),
  SubnetId: z.string().describe(
    "The ID of the subnet to add the mount target in. For One Zone file systems, use the subnet that is associated with the file system's Availability Zone. The subnet type must be the same type as the IpAddressType.",
  ),
});

const StateSchema = z.object({
  Id: z.string(),
  IpAddress: z.string().optional(),
  Ipv6Address: z.string().optional(),
  IpAddressType: z.string().optional(),
  FileSystemId: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  SubnetId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  IpAddress: z.string().describe(
    "If the IpAddressType for the mount target is IPv4 ( IPV4_ONLY or DUAL_STACK), then specify the IPv4 address to use. If you do not specify an IpAddress, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  Ipv6Address: z.string().describe(
    "If the IPAddressType for the mount target is IPv6 ( IPV6_ONLY or DUAL_STACK), then specify the IPv6 address to use. If you do not specify an Ipv6Address, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  IpAddressType: z.enum(["IPV4_ONLY", "IPV6_ONLY", "DUAL_STACK"]).describe(
    "The IP address type for the mount target. The possible values are IPV4_ONLY (only IPv4 addresses), IPV6_ONLY (only IPv6 addresses), and DUAL_STACK (dual-stack, both IPv4 and IPv6 addresses). If you don’t specify an IpAddressType, then IPV4_ONLY is used. The IPAddressType must match the IP type of the subnet. Additionally, the IPAddressType parameter overrides the value set as the default IP address for the subnet in the VPC. For example, if the IPAddressType is IPV4_ONLY and AssignIpv6AddressOnCreation is true, then IPv4 is used for the mount target. For more information, see [Modify the IP addressing attributes of your subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-public-ip.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the file system for which to create the mount target.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "VPC security group IDs, of the form sg-xxxxxxxx. These must be for the same VPC as the subnet specified. The maximum number of security groups depends on account quota. For more information, see [Amazon VPC Quotas](https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html) in the *Amazon VPC User Guide* (see the *Security Groups* table). If you don't specify a security group, then Amazon EFS uses the default security group for the subnet's VPC.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet to add the mount target in. For One Zone file systems, use the subnet that is associated with the file system's Availability Zone. The subnet type must be the same type as the IpAddressType.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/efs/mount-target",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EFS MountTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EFS MountTarget",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EFS::MountTarget",
          desiredState,
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
      description: "Get a EFS MountTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS MountTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EFS::MountTarget",
          args.identifier,
        ) as StateData;
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Update a EFS MountTarget",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EFS::MountTarget",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EFS::MountTarget",
          identifier,
          currentState,
          desiredState,
          [
            "IpAddress",
            "Ipv6Address",
            "IpAddressType",
            "SubnetId",
            "FileSystemId",
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
      description: "Delete a EFS MountTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS MountTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EFS::MountTarget",
          args.identifier,
        );
        const instanceName = context.globalArgs.name?.toString() ??
          args.identifier;
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
      description: "Sync EFS MountTarget state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EFS::MountTarget",
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
