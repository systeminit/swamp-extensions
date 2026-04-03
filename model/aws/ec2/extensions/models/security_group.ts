// Auto-generated extension model for @swamp/aws/ec2/security-group
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

export const IngressSchema = z.object({
  CidrIp: z.string().optional(),
  CidrIpv6: z.string().optional(),
  Description: z.string().optional(),
  FromPort: z.number().int().optional(),
  SourceSecurityGroupName: z.string().optional(),
  ToPort: z.number().int().optional(),
  SourceSecurityGroupOwnerId: z.string().optional(),
  IpProtocol: z.string(),
  SourceSecurityGroupId: z.string().optional(),
  SourcePrefixListId: z.string().optional(),
});

export const EgressSchema = z.object({
  CidrIp: z.string().optional(),
  CidrIpv6: z.string().optional(),
  Description: z.string().optional(),
  FromPort: z.number().int().optional(),
  ToPort: z.number().int().optional(),
  IpProtocol: z.string(),
  DestinationSecurityGroupId: z.string().optional(),
  DestinationPrefixListId: z.string().optional(),
});

export const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  GroupDescription: z.string().describe(
    "A description for the security group.",
  ),
  GroupName: z.string().describe("The name of the security group.").optional(),
  VpcId: z.string().describe("The ID of the VPC for the security group.")
    .optional(),
  SecurityGroupIngress: z.array(IngressSchema).describe(
    "The inbound rules associated with the security group. There is a short interruption during which you cannot connect to the security group.",
  ).optional(),
  SecurityGroupEgress: z.array(EgressSchema).describe(
    "[VPC only] The outbound rules associated with the security group. There is a short interruption during which you cannot connect to the security group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the security group.")
    .optional(),
});

const StateSchema = z.object({
  GroupDescription: z.string().optional(),
  GroupName: z.string().optional(),
  VpcId: z.string().optional(),
  Id: z.string(),
  SecurityGroupIngress: z.array(IngressSchema).optional(),
  SecurityGroupEgress: z.array(EgressSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  GroupId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  GroupDescription: z.string().describe("A description for the security group.")
    .optional(),
  GroupName: z.string().describe("The name of the security group.").optional(),
  VpcId: z.string().describe("The ID of the VPC for the security group.")
    .optional(),
  SecurityGroupIngress: z.array(IngressSchema).describe(
    "The inbound rules associated with the security group. There is a short interruption during which you cannot connect to the security group.",
  ).optional(),
  SecurityGroupEgress: z.array(EgressSchema).describe(
    "[VPC only] The outbound rules associated with the security group. There is a short interruption during which you cannot connect to the security group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the security group.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/ec2/security-group",
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
      description: "EC2 SecurityGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 SecurityGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::SecurityGroup",
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
      description: "Get a EC2 SecurityGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 SecurityGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::SecurityGroup",
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
      description: "Update a EC2 SecurityGroup",
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
          "AWS::EC2::SecurityGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::SecurityGroup",
          identifier,
          currentState,
          desiredState,
          ["GroupDescription", "GroupName", "VpcId"],
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
      description: "Delete a EC2 SecurityGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 SecurityGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::SecurityGroup",
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
      description: "Sync EC2 SecurityGroup state from AWS",
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
            "AWS::EC2::SecurityGroup",
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
