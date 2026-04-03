// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-multicast-group-member
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
  GroupIpAddress: z.string().describe(
    "The IP address assigned to the transit gateway multicast group.",
  ),
  TransitGatewayMulticastDomainId: z.string().describe(
    "The ID of the transit gateway multicast domain.",
  ),
  NetworkInterfaceId: z.string().describe(
    "The ID of the transit gateway attachment.",
  ),
});

const StateSchema = z.object({
  GroupIpAddress: z.string(),
  TransitGatewayAttachmentId: z.string().optional(),
  TransitGatewayMulticastDomainId: z.string(),
  SubnetId: z.string().optional(),
  ResourceId: z.string().optional(),
  ResourceType: z.string().optional(),
  NetworkInterfaceId: z.string(),
  GroupMember: z.boolean().optional(),
  GroupSource: z.boolean().optional(),
  MemberType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  GroupIpAddress: z.string().describe(
    "The IP address assigned to the transit gateway multicast group.",
  ).optional(),
  TransitGatewayMulticastDomainId: z.string().describe(
    "The ID of the transit gateway multicast domain.",
  ).optional(),
  NetworkInterfaceId: z.string().describe(
    "The ID of the transit gateway attachment.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/transit-gateway-multicast-group-member",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 TransitGatewayMulticastGroupMember resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayMulticastGroupMember",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::TransitGatewayMulticastGroupMember",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a EC2 TransitGatewayMulticastGroupMember",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMulticastGroupMember",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::TransitGatewayMulticastGroupMember",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a EC2 TransitGatewayMulticastGroupMember",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMulticastGroupMember",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayMulticastGroupMember",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync EC2 TransitGatewayMulticastGroupMember state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const idParts = [
          existing.TransitGatewayMulticastDomainId?.toString(),
          existing.GroupIpAddress?.toString(),
          existing.NetworkInterfaceId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayMulticastGroupMember",
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
