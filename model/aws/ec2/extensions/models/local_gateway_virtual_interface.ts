// Auto-generated extension model for @swamp/aws/ec2/local-gateway-virtual-interface
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
  Key: z.string().min(1).max(127).regex(new RegExp("^(?!aws:.*)")).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
  Value: z.string().min(1).max(255).regex(new RegExp("^(?!aws:.*)")).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  LocalGatewayVirtualInterfaceGroupId: z.string().describe(
    "The ID of the virtual interface group",
  ),
  OutpostLagId: z.string().describe("The Outpost LAG ID."),
  Vlan: z.number().int().describe("The ID of the VLAN."),
  LocalAddress: z.string().describe("The local address."),
  PeerAddress: z.string().describe("The peer address."),
  PeerBgpAsn: z.number().int().describe("The peer BGP ASN.").optional(),
  PeerBgpAsnExtended: z.number().int().describe(
    "The extended 32-bit ASN of the BGP peer for use with larger ASN values.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  LocalGatewayVirtualInterfaceId: z.string(),
  LocalGatewayId: z.string().optional(),
  LocalGatewayVirtualInterfaceGroupId: z.string().optional(),
  OutpostLagId: z.string().optional(),
  Vlan: z.number().optional(),
  LocalAddress: z.string().optional(),
  PeerAddress: z.string().optional(),
  LocalBgpAsn: z.number().optional(),
  PeerBgpAsn: z.number().optional(),
  PeerBgpAsnExtended: z.number().optional(),
  OwnerId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ConfigurationState: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  LocalGatewayVirtualInterfaceGroupId: z.string().describe(
    "The ID of the virtual interface group",
  ).optional(),
  OutpostLagId: z.string().describe("The Outpost LAG ID.").optional(),
  Vlan: z.number().int().describe("The ID of the VLAN.").optional(),
  LocalAddress: z.string().describe("The local address.").optional(),
  PeerAddress: z.string().describe("The peer address.").optional(),
  PeerBgpAsn: z.number().int().describe("The peer BGP ASN.").optional(),
  PeerBgpAsnExtended: z.number().int().describe(
    "The extended 32-bit ASN of the BGP peer for use with larger ASN values.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/local-gateway-virtual-interface",
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
      description: "EC2 LocalGatewayVirtualInterface resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 LocalGatewayVirtualInterface",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::LocalGatewayVirtualInterface",
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
      description: "Get a EC2 LocalGatewayVirtualInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 LocalGatewayVirtualInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::LocalGatewayVirtualInterface",
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
      description: "Update a EC2 LocalGatewayVirtualInterface",
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
        const identifier = existing.LocalGatewayVirtualInterfaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::LocalGatewayVirtualInterface",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::LocalGatewayVirtualInterface",
          identifier,
          currentState,
          desiredState,
          [
            "LocalGatewayVirtualInterfaceGroupId",
            "OutpostLagId",
            "Vlan",
            "LocalAddress",
            "PeerAddress",
            "PeerBgpAsn",
            "PeerBgpAsnExtended",
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
      description: "Delete a EC2 LocalGatewayVirtualInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 LocalGatewayVirtualInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::LocalGatewayVirtualInterface",
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
      description: "Sync EC2 LocalGatewayVirtualInterface state from AWS",
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
        const identifier = existing.LocalGatewayVirtualInterfaceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::LocalGatewayVirtualInterface",
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
