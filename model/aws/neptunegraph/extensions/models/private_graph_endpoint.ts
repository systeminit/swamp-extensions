// Auto-generated extension model for @swamp/aws/neptunegraph/private-graph-endpoint
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  GraphIdentifier: z.string().describe(
    "The auto-generated Graph Id assigned by the service.",
  ),
  SecurityGroupIds: z.array(z.string()).describe(
    "The security group Ids associated with the VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The subnet Ids associated with the VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ).optional(),
  VpcId: z.string().describe(
    "The VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ),
});

const StateSchema = z.object({
  GraphIdentifier: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  VpcId: z.string().optional(),
  PrivateGraphEndpointIdentifier: z.string(),
  VpcEndpointId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  GraphIdentifier: z.string().describe(
    "The auto-generated Graph Id assigned by the service.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The security group Ids associated with the VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The subnet Ids associated with the VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ).optional(),
  VpcId: z.string().describe(
    "The VPC where you want the private graph endpoint to be created, ie, the graph will be reachable from within the VPC.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/neptunegraph/private-graph-endpoint",
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
      description: "NeptuneGraph PrivateGraphEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NeptuneGraph PrivateGraphEndpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::NeptuneGraph::PrivateGraphEndpoint",
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
      description: "Get a NeptuneGraph PrivateGraphEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NeptuneGraph PrivateGraphEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::NeptuneGraph::PrivateGraphEndpoint",
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
      description: "Update a NeptuneGraph PrivateGraphEndpoint",
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
        const identifier = existing.PrivateGraphEndpointIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NeptuneGraph::PrivateGraphEndpoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::NeptuneGraph::PrivateGraphEndpoint",
          identifier,
          currentState,
          desiredState,
          ["GraphIdentifier", "SecurityGroupIds", "SubnetIds", "VpcId"],
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
      description: "Delete a NeptuneGraph PrivateGraphEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NeptuneGraph PrivateGraphEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::NeptuneGraph::PrivateGraphEndpoint",
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
      description: "Sync NeptuneGraph PrivateGraphEndpoint state from AWS",
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
        const identifier = existing.PrivateGraphEndpointIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NeptuneGraph::PrivateGraphEndpoint",
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
