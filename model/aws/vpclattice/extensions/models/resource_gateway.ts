// Auto-generated extension model for @swamp/aws/vpclattice/resource-gateway
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
  Value: z.string().min(1).max(256).optional(),
  Key: z.string().min(1).max(128),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  IpAddressType: z.enum(["IPV4", "IPV6", "DUALSTACK"]).optional(),
  VpcIdentifier: z.string().min(5).max(50),
  Ipv4AddressesPerEni: z.number().int().describe(
    "The number of IPv4 addresses to allocate per ENI for the resource gateway",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The ID of one or more subnets in which to create an endpoint network interface.",
  ),
  SecurityGroupIds: z.array(z.string()).describe(
    "The ID of one or more security groups to associate with the endpoint network interface.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().min(3).max(40).regex(
    new RegExp("^(?!rgw-)(?![-])(?!.*[-]$)(?!.*[-]{2})[a-z0-9-]+$"),
  ),
});

const StateSchema = z.object({
  IpAddressType: z.string().optional(),
  VpcIdentifier: z.string().optional(),
  Ipv4AddressesPerEni: z.number().optional(),
  Id: z.string().optional(),
  Arn: z.string(),
  SubnetIds: z.array(z.string()).optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  IpAddressType: z.enum(["IPV4", "IPV6", "DUALSTACK"]).optional(),
  VpcIdentifier: z.string().min(5).max(50).optional(),
  Ipv4AddressesPerEni: z.number().int().describe(
    "The number of IPv4 addresses to allocate per ENI for the resource gateway",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The ID of one or more subnets in which to create an endpoint network interface.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The ID of one or more security groups to associate with the endpoint network interface.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().min(3).max(40).regex(
    new RegExp("^(?!rgw-)(?![-])(?!.*[-]$)(?!.*[-]{2})[a-z0-9-]+$"),
  ).optional(),
});

export const model = {
  type: "@swamp/aws/vpclattice/resource-gateway",
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
      description: "VpcLattice ResourceGateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a VpcLattice ResourceGateway",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::VpcLattice::ResourceGateway",
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
      description: "Get a VpcLattice ResourceGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VpcLattice ResourceGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::VpcLattice::ResourceGateway",
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
      description: "Update a VpcLattice ResourceGateway",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::VpcLattice::ResourceGateway",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::VpcLattice::ResourceGateway",
          identifier,
          currentState,
          desiredState,
          ["VpcIdentifier", "SubnetIds", "IpAddressType", "Name"],
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
      description: "Delete a VpcLattice ResourceGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VpcLattice ResourceGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::VpcLattice::ResourceGateway",
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
      description: "Sync VpcLattice ResourceGateway state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::VpcLattice::ResourceGateway",
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
