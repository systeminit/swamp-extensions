// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-connect-peer
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
  Value: z.string().describe(
    "The value of the tag. Constraints: Tag values are case-sensitive and accept a maximum of 256 Unicode characters.",
  ).optional(),
  Key: z.string().describe(
    "The key of the tag. Constraints: Tag keys are case-sensitive and accept a maximum of 127 Unicode characters. May not begin with aws:.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TransitGatewayAttachmentId: z.string().describe(
    "The ID of the Connect attachment.",
  ),
  ConnectPeerConfiguration: z.object({
    InsideCidrBlocks: z.array(z.string()).describe(
      "The range of interior BGP peer IP addresses.",
    ),
  }).describe("The Connect peer details."),
  Tags: z.array(TagSchema).describe("The tags for the Connect Peer.")
    .optional(),
});

const StateSchema = z.object({
  TransitGatewayAttachmentId: z.string().optional(),
  TransitGatewayConnectPeerId: z.string(),
  State: z.string().optional(),
  CreationTime: z.string().optional(),
  ConnectPeerConfiguration: z.object({
    TransitGatewayAddress: z.string(),
    PeerAddress: z.string(),
    InsideCidrBlocks: z.array(z.string()),
    Protocol: z.string(),
    BgpConfigurations: z.array(z.object({
      TransitGatewayAsn: z.number(),
      PeerAsn: z.number(),
      TransitGatewayAddress: z.string(),
      PeerAddress: z.string(),
      BgpStatus: z.string(),
    })),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TransitGatewayAttachmentId: z.string().describe(
    "The ID of the Connect attachment.",
  ).optional(),
  ConnectPeerConfiguration: z.object({
    InsideCidrBlocks: z.array(z.string()).describe(
      "The range of interior BGP peer IP addresses.",
    ).optional(),
  }).describe("The Connect peer details.").optional(),
  Tags: z.array(TagSchema).describe("The tags for the Connect Peer.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/ec2/transit-gateway-connect-peer",
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
      description: "EC2 TransitGatewayConnectPeer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayConnectPeer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::TransitGatewayConnectPeer",
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
      description: "Get a EC2 TransitGatewayConnectPeer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayConnectPeer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::TransitGatewayConnectPeer",
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
      description: "Update a EC2 TransitGatewayConnectPeer",
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
        const identifier = existing.TransitGatewayConnectPeerId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::TransitGatewayConnectPeer",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::TransitGatewayConnectPeer",
          identifier,
          currentState,
          desiredState,
          [
            "TransitGatewayAttachmentId",
            "ConnectPeerConfiguration",
            "PeerAddress",
            "InsideCidrBlocks",
            "TransitGatewayAddress",
            "PeerAsn",
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
      description: "Delete a EC2 TransitGatewayConnectPeer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayConnectPeer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayConnectPeer",
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
      description: "Sync EC2 TransitGatewayConnectPeer state from AWS",
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
        const identifier = existing.TransitGatewayConnectPeerId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayConnectPeer",
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
