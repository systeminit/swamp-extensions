// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-multicast-domain
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
  Key: z.string().describe(
    "The key of the tag. Constraints: Tag keys are case-sensitive and accept a maximum of 127 Unicode characters. May not begin with aws:.",
  ).optional(),
  Value: z.string().describe(
    "The value of the tag. Constraints: Tag values are case-sensitive and accept a maximum of 255 Unicode characters.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TransitGatewayId: z.string().describe("The ID of the transit gateway."),
  Tags: z.array(TagSchema).describe(
    "The tags for the transit gateway multicast domain.",
  ).optional(),
  Options: z.object({
    AutoAcceptSharedAssociations: z.string().describe(
      "Indicates whether to automatically cross-account subnet associations that are associated with the transit gateway multicast domain. Valid Values: enable | disable",
    ).optional(),
    Igmpv2Support: z.string().describe(
      "Indicates whether Internet Group Management Protocol (IGMP) version 2 is turned on for the transit gateway multicast domain. Valid Values: enable | disable",
    ).optional(),
    StaticSourcesSupport: z.string().describe(
      "Indicates whether support for statically configuring transit gateway multicast group sources is turned on. Valid Values: enable | disable",
    ).optional(),
  }).describe("The options for the transit gateway multicast domain.")
    .optional(),
});

const StateSchema = z.object({
  TransitGatewayMulticastDomainId: z.string(),
  TransitGatewayMulticastDomainArn: z.string().optional(),
  TransitGatewayId: z.string().optional(),
  State: z.string().optional(),
  CreationTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Options: z.object({
    AutoAcceptSharedAssociations: z.string(),
    Igmpv2Support: z.string(),
    StaticSourcesSupport: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TransitGatewayId: z.string().describe("The ID of the transit gateway.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "The tags for the transit gateway multicast domain.",
  ).optional(),
  Options: z.object({
    AutoAcceptSharedAssociations: z.string().describe(
      "Indicates whether to automatically cross-account subnet associations that are associated with the transit gateway multicast domain. Valid Values: enable | disable",
    ).optional(),
    Igmpv2Support: z.string().describe(
      "Indicates whether Internet Group Management Protocol (IGMP) version 2 is turned on for the transit gateway multicast domain. Valid Values: enable | disable",
    ).optional(),
    StaticSourcesSupport: z.string().describe(
      "Indicates whether support for statically configuring transit gateway multicast group sources is turned on. Valid Values: enable | disable",
    ).optional(),
  }).describe("The options for the transit gateway multicast domain.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/ec2/transit-gateway-multicast-domain",
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
      description: "EC2 TransitGatewayMulticastDomain resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayMulticastDomain",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::TransitGatewayMulticastDomain",
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
      description: "Get a EC2 TransitGatewayMulticastDomain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMulticastDomain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::TransitGatewayMulticastDomain",
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
      description: "Update a EC2 TransitGatewayMulticastDomain",
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
        const identifier = existing.TransitGatewayMulticastDomainId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::TransitGatewayMulticastDomain",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::TransitGatewayMulticastDomain",
          identifier,
          currentState,
          desiredState,
          ["TransitGatewayId"],
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
      description: "Delete a EC2 TransitGatewayMulticastDomain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMulticastDomain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayMulticastDomain",
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
      description: "Sync EC2 TransitGatewayMulticastDomain state from AWS",
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
        const identifier = existing.TransitGatewayMulticastDomainId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayMulticastDomain",
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
