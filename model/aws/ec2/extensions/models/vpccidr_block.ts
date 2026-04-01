// Auto-generated extension model for @swamp/aws/ec2/vpccidr-block
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CidrBlock: z.string().describe(
    "An IPv4 CIDR block to associate with the VPC.",
  ).optional(),
  Ipv6Pool: z.string().describe(
    "The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block.",
  ).optional(),
  VpcId: z.string().describe("The ID of the VPC."),
  Ipv6CidrBlock: z.string().describe(
    "An IPv6 CIDR block from the IPv6 address pool.",
  ).optional(),
  Ipv4IpamPoolId: z.string().describe(
    "The ID of the IPv4 IPAM pool to Associate a CIDR from to a VPC.",
  ).optional(),
  Ipv4NetmaskLength: z.number().int().describe(
    "The netmask length of the IPv4 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool.",
  ).optional(),
  Ipv6IpamPoolId: z.string().describe(
    "The ID of the IPv6 IPAM pool to Associate a CIDR from to a VPC.",
  ).optional(),
  Ipv6NetmaskLength: z.number().int().describe(
    "The netmask length of the IPv6 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool.",
  ).optional(),
  AmazonProvidedIpv6CidrBlock: z.boolean().describe(
    "Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC. You cannot specify the range of IPv6 addresses, or the size of the CIDR block.",
  ).optional(),
  Ipv6CidrBlockNetworkBorderGroup: z.string().describe(
    "The name of the location from which we advertise the IPV6 CIDR block.",
  ).optional(),
});

const StateSchema = z.object({
  CidrBlock: z.string().optional(),
  Ipv6Pool: z.string().optional(),
  Id: z.string(),
  VpcId: z.string(),
  Ipv6CidrBlock: z.string().optional(),
  Ipv4IpamPoolId: z.string().optional(),
  Ipv4NetmaskLength: z.number().optional(),
  Ipv6IpamPoolId: z.string().optional(),
  Ipv6NetmaskLength: z.number().optional(),
  AmazonProvidedIpv6CidrBlock: z.boolean().optional(),
  Ipv6AddressAttribute: z.string().optional(),
  IpSource: z.string().optional(),
  Ipv6CidrBlockNetworkBorderGroup: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CidrBlock: z.string().describe(
    "An IPv4 CIDR block to associate with the VPC.",
  ).optional(),
  Ipv6Pool: z.string().describe(
    "The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block.",
  ).optional(),
  VpcId: z.string().describe("The ID of the VPC.").optional(),
  Ipv6CidrBlock: z.string().describe(
    "An IPv6 CIDR block from the IPv6 address pool.",
  ).optional(),
  Ipv4IpamPoolId: z.string().describe(
    "The ID of the IPv4 IPAM pool to Associate a CIDR from to a VPC.",
  ).optional(),
  Ipv4NetmaskLength: z.number().int().describe(
    "The netmask length of the IPv4 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool.",
  ).optional(),
  Ipv6IpamPoolId: z.string().describe(
    "The ID of the IPv6 IPAM pool to Associate a CIDR from to a VPC.",
  ).optional(),
  Ipv6NetmaskLength: z.number().int().describe(
    "The netmask length of the IPv6 CIDR you would like to associate from an Amazon VPC IP Address Manager (IPAM) pool.",
  ).optional(),
  AmazonProvidedIpv6CidrBlock: z.boolean().describe(
    "Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC. You cannot specify the range of IPv6 addresses, or the size of the CIDR block.",
  ).optional(),
  Ipv6CidrBlockNetworkBorderGroup: z.string().describe(
    "The name of the location from which we advertise the IPV6 CIDR block.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/vpccidr-block",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 VPCCidrBlock resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 VPCCidrBlock",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::VPCCidrBlock",
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
      description: "Get a EC2 VPCCidrBlock",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPCCidrBlock",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::VPCCidrBlock",
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
    delete: {
      description: "Delete a EC2 VPCCidrBlock",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPCCidrBlock",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::VPCCidrBlock",
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
      description: "Sync EC2 VPCCidrBlock state from AWS",
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
        const idParts = [existing.Id?.toString(), existing.VpcId?.toString()];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EC2::VPCCidrBlock",
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
