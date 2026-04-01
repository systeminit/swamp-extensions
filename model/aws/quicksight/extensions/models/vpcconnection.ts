// Auto-generated extension model for @swamp/aws/quicksight/vpcconnection
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
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(1).max(256).describe("Tag value."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AvailabilityStatus: z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "PARTIALLY_AVAILABLE",
  ]).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  DnsResolvers: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128).optional(),
  RoleArn: z.string().optional(),
  SecurityGroupIds: z.array(
    z.string().min(1).max(255).regex(new RegExp("^sg-[0-9a-z]*$")),
  ).optional(),
  SubnetIds: z.array(
    z.string().min(1).max(255).regex(new RegExp("^subnet-[0-9a-z]*$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConnectionId: z.string().min(1).max(1000).regex(new RegExp("[\\w\\-]+"))
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AvailabilityStatus: z.string().optional(),
  AwsAccountId: z.string(),
  CreatedTime: z.string().optional(),
  DnsResolvers: z.array(z.string()).optional(),
  LastUpdatedTime: z.string().optional(),
  Name: z.string().optional(),
  NetworkInterfaces: z.array(z.object({
    SubnetId: z.string(),
    AvailabilityZone: z.string(),
    ErrorMessage: z.string(),
    Status: z.string(),
    NetworkInterfaceId: z.string(),
  })).optional(),
  RoleArn: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  Status: z.string().optional(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConnectionId: z.string(),
  VPCId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AvailabilityStatus: z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "PARTIALLY_AVAILABLE",
  ]).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  DnsResolvers: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128).optional(),
  RoleArn: z.string().optional(),
  SecurityGroupIds: z.array(
    z.string().min(1).max(255).regex(new RegExp("^sg-[0-9a-z]*$")),
  ).optional(),
  SubnetIds: z.array(
    z.string().min(1).max(255).regex(new RegExp("^subnet-[0-9a-z]*$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  VPCConnectionId: z.string().min(1).max(1000).regex(new RegExp("[\\w\\-]+"))
    .optional(),
});

export const model = {
  type: "@swamp/aws/quicksight/vpcconnection",
  version: "2026.04.01.3",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "QuickSight VPCConnection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight VPCConnection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QuickSight::VPCConnection",
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
      description: "Get a QuickSight VPCConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight VPCConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::QuickSight::VPCConnection",
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
      description: "Update a QuickSight VPCConnection",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.VPCConnectionId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::VPCConnection",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::QuickSight::VPCConnection",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "VPCConnectionId"],
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
      description: "Delete a QuickSight VPCConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight VPCConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::QuickSight::VPCConnection",
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
      description: "Sync QuickSight VPCConnection state from AWS",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.VPCConnectionId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::VPCConnection",
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
