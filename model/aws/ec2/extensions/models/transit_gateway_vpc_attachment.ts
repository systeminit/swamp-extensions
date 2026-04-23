// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-vpc-attachment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 TransitGatewayVpcAttachment (AWS::EC2::TransitGatewayVpcAttachment).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TransitGatewayId: z.string(),
  VpcId: z.string(),
  SubnetIds: z.array(z.string()),
  AddSubnetIds: z.array(z.string()).optional(),
  RemoveSubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Options: z.object({
    DnsSupport: z.string().describe(
      "Indicates whether to enable DNS Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    Ipv6Support: z.string().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    ApplianceModeSupport: z.string().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    SecurityGroupReferencingSupport: z.string().describe(
      "Indicates whether to enable Security Group referencing support for Vpc Attachment. Valid values: enable | disable",
    ).optional(),
  }).describe("The options for the transit gateway vpc attachment.").optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  TransitGatewayId: z.string().optional(),
  VpcId: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  AddSubnetIds: z.array(z.string()).optional(),
  RemoveSubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Options: z.object({
    DnsSupport: z.string(),
    Ipv6Support: z.string(),
    ApplianceModeSupport: z.string(),
    SecurityGroupReferencingSupport: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TransitGatewayId: z.string().optional(),
  VpcId: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  AddSubnetIds: z.array(z.string()).optional(),
  RemoveSubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Options: z.object({
    DnsSupport: z.string().describe(
      "Indicates whether to enable DNS Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    Ipv6Support: z.string().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    ApplianceModeSupport: z.string().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    SecurityGroupReferencingSupport: z.string().describe(
      "Indicates whether to enable Security Group referencing support for Vpc Attachment. Valid values: enable | disable",
    ).optional(),
  }).describe("The options for the transit gateway vpc attachment.").optional(),
});

/** Swamp extension model for EC2 TransitGatewayVpcAttachment. Registered at `@swamp/aws/ec2/transit-gateway-vpc-attachment`. */
export const model = {
  type: "@swamp/aws/ec2/transit-gateway-vpc-attachment",
  version: "2026.04.23.2",
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
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 TransitGatewayVpcAttachment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayVpcAttachment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::TransitGatewayVpcAttachment",
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
      description: "Get a EC2 TransitGatewayVpcAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayVpcAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::TransitGatewayVpcAttachment",
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
      description: "Update a EC2 TransitGatewayVpcAttachment",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::TransitGatewayVpcAttachment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::TransitGatewayVpcAttachment",
          identifier,
          currentState,
          desiredState,
          ["TransitGatewayId", "SubnetIds", "VpcId"],
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
      description: "Delete a EC2 TransitGatewayVpcAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayVpcAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayVpcAttachment",
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
      description: "Sync EC2 TransitGatewayVpcAttachment state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayVpcAttachment",
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
