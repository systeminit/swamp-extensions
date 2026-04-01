// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-peering-attachment
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
    "The value of the tag. Constraints: Tag values are case-sensitive and accept a maximum of 255 Unicode characters.",
  ).optional(),
  Key: z.string().describe(
    "The key of the tag. Constraints: Tag keys are case-sensitive and accept a maximum of 127 Unicode characters. May not begin with aws:.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Status: z.object({
    Message: z.string().describe("The status message, if applicable.")
      .optional(),
    Code: z.string().describe("The status code.").optional(),
  }).describe("The status of the transit gateway peering attachment.")
    .optional(),
  TransitGatewayId: z.string().describe("The ID of the transit gateway."),
  PeerTransitGatewayId: z.string().describe(
    "The ID of the peer transit gateway.",
  ),
  PeerAccountId: z.string().describe("The ID of the peer account"),
  PeerRegion: z.string().describe("Peer Region"),
  Tags: z.array(TagSchema).describe(
    "The tags for the transit gateway peering attachment.",
  ).optional(),
});

const StateSchema = z.object({
  Status: z.object({
    Message: z.string(),
    Code: z.string(),
  }).optional(),
  TransitGatewayId: z.string().optional(),
  PeerTransitGatewayId: z.string().optional(),
  PeerAccountId: z.string().optional(),
  State: z.string().optional(),
  CreationTime: z.string().optional(),
  PeerRegion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TransitGatewayAttachmentId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Status: z.object({
    Message: z.string().describe("The status message, if applicable.")
      .optional(),
    Code: z.string().describe("The status code.").optional(),
  }).describe("The status of the transit gateway peering attachment.")
    .optional(),
  TransitGatewayId: z.string().describe("The ID of the transit gateway.")
    .optional(),
  PeerTransitGatewayId: z.string().describe(
    "The ID of the peer transit gateway.",
  ).optional(),
  PeerAccountId: z.string().describe("The ID of the peer account").optional(),
  PeerRegion: z.string().describe("Peer Region").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags for the transit gateway peering attachment.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/transit-gateway-peering-attachment",
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
      description: "EC2 TransitGatewayPeeringAttachment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayPeeringAttachment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::TransitGatewayPeeringAttachment",
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
      description: "Get a EC2 TransitGatewayPeeringAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayPeeringAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::TransitGatewayPeeringAttachment",
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
      description: "Update a EC2 TransitGatewayPeeringAttachment",
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
        const identifier = existing.TransitGatewayAttachmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::TransitGatewayPeeringAttachment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::TransitGatewayPeeringAttachment",
          identifier,
          currentState,
          desiredState,
          [
            "TransitGatewayId",
            "PeerTransitGatewayId",
            "PeerRegion",
            "PeerAccountId",
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
      description: "Delete a EC2 TransitGatewayPeeringAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayPeeringAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayPeeringAttachment",
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
      description: "Sync EC2 TransitGatewayPeeringAttachment state from AWS",
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
        const identifier = existing.TransitGatewayAttachmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayPeeringAttachment",
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
