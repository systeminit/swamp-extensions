// Auto-generated extension model for @swamp/aws/ec2/ipam
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

export const IpamOperatingRegionSchema = z.object({
  RegionName: z.string().describe("The name of the region."),
});

export const IpamOrganizationalUnitExclusionSchema = z.object({
  OrganizationsEntityPath: z.string().min(1).describe(
    "An AWS Organizations entity path. Build the path for the OU(s) using AWS Organizations IDs separated by a '/'. Include all child OUs by ending the path with '/*'.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().optional(),
  OperatingRegions: z.array(IpamOperatingRegionSchema).describe(
    "The regions IPAM is enabled for. Allows pools to be created in these regions, as well as enabling monitoring",
  ).optional(),
  Tier: z.enum(["free", "advanced"]).describe("The tier of the IPAM.")
    .optional(),
  EnablePrivateGua: z.boolean().describe(
    "Enable provisioning of GUA space in private pools.",
  ).optional(),
  MeteredAccount: z.enum(["ipam-owner", "resource-owner"]).describe(
    "A metered account is an account that is charged for active IP addresses managed in IPAM",
  ).optional(),
  DefaultResourceDiscoveryOrganizationalUnitExclusions: z.array(
    IpamOrganizationalUnitExclusionSchema,
  ).describe(
    "A set of organizational unit (OU) exclusions for the default resource discovery, created with this IPAM.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  IpamId: z.string(),
  Arn: z.string().optional(),
  DefaultResourceDiscoveryId: z.string().optional(),
  DefaultResourceDiscoveryAssociationId: z.string().optional(),
  ResourceDiscoveryAssociationCount: z.number().optional(),
  Description: z.string().optional(),
  PublicDefaultScopeId: z.string().optional(),
  PrivateDefaultScopeId: z.string().optional(),
  ScopeCount: z.number().optional(),
  OperatingRegions: z.array(IpamOperatingRegionSchema).optional(),
  Tier: z.string().optional(),
  EnablePrivateGua: z.boolean().optional(),
  MeteredAccount: z.string().optional(),
  DefaultResourceDiscoveryOrganizationalUnitExclusions: z.array(
    IpamOrganizationalUnitExclusionSchema,
  ).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().optional(),
  OperatingRegions: z.array(IpamOperatingRegionSchema).describe(
    "The regions IPAM is enabled for. Allows pools to be created in these regions, as well as enabling monitoring",
  ).optional(),
  Tier: z.enum(["free", "advanced"]).describe("The tier of the IPAM.")
    .optional(),
  EnablePrivateGua: z.boolean().describe(
    "Enable provisioning of GUA space in private pools.",
  ).optional(),
  MeteredAccount: z.enum(["ipam-owner", "resource-owner"]).describe(
    "A metered account is an account that is charged for active IP addresses managed in IPAM",
  ).optional(),
  DefaultResourceDiscoveryOrganizationalUnitExclusions: z.array(
    IpamOrganizationalUnitExclusionSchema,
  ).describe(
    "A set of organizational unit (OU) exclusions for the default resource discovery, created with this IPAM.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/ipam",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 IPAM resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 IPAM",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::IPAM",
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
      description: "Get a EC2 IPAM",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAM",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::IPAM",
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
      description: "Update a EC2 IPAM",
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
        const identifier = existing.IpamId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::IPAM",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::IPAM",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a EC2 IPAM",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAM",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::IPAM",
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
      description: "Sync EC2 IPAM state from AWS",
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
        const identifier = existing.IpamId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::IPAM",
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
