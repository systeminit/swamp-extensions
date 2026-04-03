// Auto-generated extension model for @swamp/aws/mediaconnect/router-network-interface
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

export const PublicRouterNetworkInterfaceRuleSchema = z.object({
  Cidr: z.string().describe(
    "The CIDR block that is allowed to access the public router network interface.",
  ),
});

export const PublicRouterNetworkInterfaceConfigurationSchema = z.object({
  AllowRules: z.array(PublicRouterNetworkInterfaceRuleSchema).describe(
    "The list of allowed CIDR blocks for the public router network interface.",
  ),
});

export const VpcRouterNetworkInterfaceConfigurationSchema = z.object({
  SecurityGroupIds: z.array(z.string()).describe(
    "The IDs of the security groups to associate with the router network interface within the VPC.",
  ),
  SubnetId: z.string().describe(
    "The ID of the subnet within the VPC to associate the router network interface with.",
  ),
});

export const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Configuration: z.object({
    Public: PublicRouterNetworkInterfaceConfigurationSchema.describe(
      "The configuration settings for a public router network interface, including the list of allowed CIDR blocks.",
    ).optional(),
    Vpc: VpcRouterNetworkInterfaceConfigurationSchema.describe(
      "The configuration settings for a router network interface within a VPC, including the security group IDs and subnet ID.",
    ).optional(),
  }).describe("The configuration settings for a router network interface."),
  Name: z.string().min(1).max(128).describe(
    "The name of the router network interface.",
  ),
  RegionName: z.string().describe(
    "The AWS Region for the router network interface. Defaults to the current region if not specified.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this router network interface.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  AssociatedInputCount: z.number().optional(),
  AssociatedOutputCount: z.number().optional(),
  Configuration: z.object({
    Public: PublicRouterNetworkInterfaceConfigurationSchema,
    Vpc: VpcRouterNetworkInterfaceConfigurationSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  NetworkInterfaceType: z.string().optional(),
  RegionName: z.string().optional(),
  State: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Configuration: z.object({
    Public: PublicRouterNetworkInterfaceConfigurationSchema.describe(
      "The configuration settings for a public router network interface, including the list of allowed CIDR blocks.",
    ).optional(),
    Vpc: VpcRouterNetworkInterfaceConfigurationSchema.describe(
      "The configuration settings for a router network interface within a VPC, including the security group IDs and subnet ID.",
    ).optional(),
  }).describe("The configuration settings for a router network interface.")
    .optional(),
  Name: z.string().min(1).max(128).describe(
    "The name of the router network interface.",
  ).optional(),
  RegionName: z.string().describe(
    "The AWS Region for the router network interface. Defaults to the current region if not specified.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this router network interface.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/mediaconnect/router-network-interface",
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
      description: "MediaConnect RouterNetworkInterface resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect RouterNetworkInterface",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaConnect::RouterNetworkInterface",
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
      description: "Get a MediaConnect RouterNetworkInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterNetworkInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaConnect::RouterNetworkInterface",
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
    update: {
      description: "Update a MediaConnect RouterNetworkInterface",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::RouterNetworkInterface",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaConnect::RouterNetworkInterface",
          identifier,
          currentState,
          desiredState,
          ["RegionName"],
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
      description: "Delete a MediaConnect RouterNetworkInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterNetworkInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaConnect::RouterNetworkInterface",
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
      description: "Sync MediaConnect RouterNetworkInterface state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::RouterNetworkInterface",
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
