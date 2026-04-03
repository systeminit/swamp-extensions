// Auto-generated extension model for @swamp/aws/ec2/network-insights-access-scope
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
  Key: z.string(),
  Value: z.string().optional(),
});

export const PacketHeaderStatementRequestSchema = z.object({
  SourceAddresses: z.array(z.string()).optional(),
  DestinationAddresses: z.array(z.string()).optional(),
  SourcePorts: z.array(z.string()).optional(),
  DestinationPorts: z.array(z.string()).optional(),
  SourcePrefixLists: z.array(z.string()).optional(),
  DestinationPrefixLists: z.array(z.string()).optional(),
  Protocols: z.array(z.enum(["tcp", "udp"])).optional(),
});

export const ResourceStatementRequestSchema = z.object({
  Resources: z.array(z.string()).optional(),
  ResourceTypes: z.array(z.string()).optional(),
});

export const PathStatementRequestSchema = z.object({
  PacketHeaderStatement: PacketHeaderStatementRequestSchema.optional(),
  ResourceStatement: ResourceStatementRequestSchema.optional(),
});

export const ThroughResourcesStatementRequestSchema = z.object({
  ResourceStatement: ResourceStatementRequestSchema.optional(),
});

export const AccessScopePathRequestSchema = z.object({
  Source: PathStatementRequestSchema.optional(),
  Destination: PathStatementRequestSchema.optional(),
  ThroughResources: z.array(ThroughResourcesStatementRequestSchema).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Tags: z.array(TagSchema).optional(),
  MatchPaths: z.array(AccessScopePathRequestSchema).optional(),
  ExcludePaths: z.array(AccessScopePathRequestSchema).optional(),
});

const StateSchema = z.object({
  NetworkInsightsAccessScopeId: z.string(),
  NetworkInsightsAccessScopeArn: z.string().optional(),
  CreatedDate: z.string().optional(),
  UpdatedDate: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  MatchPaths: z.array(AccessScopePathRequestSchema).optional(),
  ExcludePaths: z.array(AccessScopePathRequestSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  MatchPaths: z.array(AccessScopePathRequestSchema).optional(),
  ExcludePaths: z.array(AccessScopePathRequestSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ec2/network-insights-access-scope",
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
      description: "EC2 NetworkInsightsAccessScope resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 NetworkInsightsAccessScope",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::NetworkInsightsAccessScope",
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
      description: "Get a EC2 NetworkInsightsAccessScope",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsAccessScope",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::NetworkInsightsAccessScope",
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
      description: "Update a EC2 NetworkInsightsAccessScope",
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
        const identifier = existing.NetworkInsightsAccessScopeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::NetworkInsightsAccessScope",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::NetworkInsightsAccessScope",
          identifier,
          currentState,
          desiredState,
          ["MatchPaths", "ExcludePaths"],
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
      description: "Delete a EC2 NetworkInsightsAccessScope",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsAccessScope",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::NetworkInsightsAccessScope",
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
      description: "Sync EC2 NetworkInsightsAccessScope state from AWS",
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
        const identifier = existing.NetworkInsightsAccessScopeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::NetworkInsightsAccessScope",
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
