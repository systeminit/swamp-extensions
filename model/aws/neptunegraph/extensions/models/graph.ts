// Auto-generated extension model for @swamp/aws/neptunegraph/graph
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DeletionProtection: z.boolean().describe(
    "Value that indicates whether the Graph has deletion protection enabled. The graph can't be deleted when deletion protection is enabled. _Default_: If not specified, the default value is true.",
  ).optional(),
  GraphName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe(
    "Contains a user-supplied name for the Graph. If you don't specify a name, we generate a unique Graph Name using a combination of Stack Name and a UUID comprising of 4 characters. _Important_: If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  ProvisionedMemory: z.number().int().describe("Memory for the Graph."),
  PublicConnectivity: z.boolean().describe(
    "Specifies whether the Graph can be reached over the internet. Access to all graphs requires IAM authentication. When the Graph is publicly reachable, its Domain Name System (DNS) endpoint resolves to the public IP address from the internet. When the Graph isn't publicly reachable, you need to create a PrivateGraphEndpoint in a given VPC to ensure the DNS name resolves to a private IP address that is reachable from the VPC. _Default_: If not specified, the default value is false.",
  ).optional(),
  ReplicaCount: z.number().int().describe(
    "Specifies the number of replicas you want when finished. All replicas will be provisioned in different availability zones. Replica Count should always be less than or equal to 2. _Default_: If not specified, the default value is 1.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with this graph.")
    .optional(),
  VectorSearchConfiguration: z.object({
    VectorSearchDimension: z.number().int().describe(
      "The vector search dimension",
    ),
  }).describe("Vector Search Configuration").optional(),
});

const StateSchema = z.object({
  DeletionProtection: z.boolean().optional(),
  GraphName: z.string().optional(),
  ProvisionedMemory: z.number().optional(),
  PublicConnectivity: z.boolean().optional(),
  ReplicaCount: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  VectorSearchConfiguration: z.object({
    VectorSearchDimension: z.number(),
  }).optional(),
  Endpoint: z.string().optional(),
  GraphArn: z.string().optional(),
  GraphId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DeletionProtection: z.boolean().describe(
    "Value that indicates whether the Graph has deletion protection enabled. The graph can't be deleted when deletion protection is enabled. _Default_: If not specified, the default value is true.",
  ).optional(),
  GraphName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe(
    "Contains a user-supplied name for the Graph. If you don't specify a name, we generate a unique Graph Name using a combination of Stack Name and a UUID comprising of 4 characters. _Important_: If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  ProvisionedMemory: z.number().int().describe("Memory for the Graph.")
    .optional(),
  PublicConnectivity: z.boolean().describe(
    "Specifies whether the Graph can be reached over the internet. Access to all graphs requires IAM authentication. When the Graph is publicly reachable, its Domain Name System (DNS) endpoint resolves to the public IP address from the internet. When the Graph isn't publicly reachable, you need to create a PrivateGraphEndpoint in a given VPC to ensure the DNS name resolves to a private IP address that is reachable from the VPC. _Default_: If not specified, the default value is false.",
  ).optional(),
  ReplicaCount: z.number().int().describe(
    "Specifies the number of replicas you want when finished. All replicas will be provisioned in different availability zones. Replica Count should always be less than or equal to 2. _Default_: If not specified, the default value is 1.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with this graph.")
    .optional(),
  VectorSearchConfiguration: z.object({
    VectorSearchDimension: z.number().int().describe(
      "The vector search dimension",
    ).optional(),
  }).describe("Vector Search Configuration").optional(),
});

export const model = {
  type: "@swamp/aws/neptunegraph/graph",
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
      description: "NeptuneGraph Graph resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NeptuneGraph Graph",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::NeptuneGraph::Graph",
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
      description: "Get a NeptuneGraph Graph",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NeptuneGraph Graph",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::NeptuneGraph::Graph",
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
      description: "Update a NeptuneGraph Graph",
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
        const identifier = existing.GraphId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NeptuneGraph::Graph",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::NeptuneGraph::Graph",
          identifier,
          currentState,
          desiredState,
          ["GraphName", "ReplicaCount", "VectorSearchConfiguration"],
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
      description: "Delete a NeptuneGraph Graph",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NeptuneGraph Graph",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::NeptuneGraph::Graph",
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
      description: "Sync NeptuneGraph Graph state from AWS",
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
        const identifier = existing.GraphId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NeptuneGraph::Graph",
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
