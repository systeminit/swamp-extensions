// Auto-generated extension model for @swamp/aws/ec2/customer-gateway
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

export const TagSchema = z.object({
  Value: z.string().describe("The tag value."),
  Key: z.string().describe("The tag key."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Type: z.string().describe(
    "The type of VPN connection that this customer gateway supports ( ipsec.1).",
  ),
  IpAddress: z.string().describe(
    "The IP address for the customer gateway device's outside interface. The address must be static. If OutsideIpAddressType in your VPN connection options is set to PrivateIpv4, you can use an RFC6598 or RFC1918 private IPv4 address. If OutsideIpAddressType is set to Ipv6, you can use an IPv6 address.",
  ),
  BgpAsnExtended: z.number().min(2147483648).max(4294967294).describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Valid values: 2,147,483,648 to 4,294,967,295",
  ).optional(),
  BgpAsn: z.number().int().describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Default: 65000 Valid values: 1 to 2,147,483,647",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags for the customer gateway.",
  ).optional(),
  CertificateArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:acm:[a-z]{2}((-gov)|(-iso([a-z]{1})?))?-[a-z]+-\\d{1}:\\d{12}:certificate\\/[a-zA-Z0-9-_]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) for the customer gateway certificate.",
  ).optional(),
  DeviceName: z.string().describe("The name of customer gateway device.")
    .optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  CustomerGatewayId: z.string(),
  IpAddress: z.string().optional(),
  BgpAsnExtended: z.number().optional(),
  BgpAsn: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  CertificateArn: z.string().optional(),
  DeviceName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Type: z.string().describe(
    "The type of VPN connection that this customer gateway supports ( ipsec.1).",
  ).optional(),
  IpAddress: z.string().describe(
    "The IP address for the customer gateway device's outside interface. The address must be static. If OutsideIpAddressType in your VPN connection options is set to PrivateIpv4, you can use an RFC6598 or RFC1918 private IPv4 address. If OutsideIpAddressType is set to Ipv6, you can use an IPv6 address.",
  ).optional(),
  BgpAsnExtended: z.number().min(2147483648).max(4294967294).describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Valid values: 2,147,483,648 to 4,294,967,295",
  ).optional(),
  BgpAsn: z.number().int().describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Default: 65000 Valid values: 1 to 2,147,483,647",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags for the customer gateway.",
  ).optional(),
  CertificateArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:acm:[a-z]{2}((-gov)|(-iso([a-z]{1})?))?-[a-z]+-\\d{1}:\\d{12}:certificate\\/[a-zA-Z0-9-_]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) for the customer gateway certificate.",
  ).optional(),
  DeviceName: z.string().describe("The name of customer gateway device.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/ec2/customer-gateway",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 CustomerGateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 CustomerGateway",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::CustomerGateway",
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
      description: "Get a EC2 CustomerGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 CustomerGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::CustomerGateway",
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
      description: "Update a EC2 CustomerGateway",
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
        const identifier = existing.CustomerGatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::CustomerGateway",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::CustomerGateway",
          identifier,
          currentState,
          desiredState,
          [
            "CertificateArn",
            "BgpAsn",
            "BgpAsnExtended",
            "Type",
            "IpAddress",
            "DeviceName",
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
      description: "Delete a EC2 CustomerGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 CustomerGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::CustomerGateway",
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
      description: "Sync EC2 CustomerGateway state from AWS",
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
        const identifier = existing.CustomerGatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::CustomerGateway",
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
