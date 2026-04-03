// Auto-generated extension model for @swamp/aws/emrcontainers/virtual-cluster
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

export const EksInfoSchema = z.object({
  Namespace: z.string().min(1).max(63).regex(
    new RegExp("[a-z0-9]([-a-z0-9]*[a-z0-9])?"),
  ),
});

export const ContainerInfoSchema = z.object({
  EksInfo: EksInfoSchema,
});

export const TagSchema = z.object({
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ContainerProvider: z.object({
    Type: z.string().describe("The type of the container provider"),
    Info: ContainerInfoSchema,
  }).describe("Container provider of the virtual cluster."),
  Name: z.string().min(1).max(64).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+"))
    .describe("Name of the virtual cluster."),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this virtual cluster.",
  ).optional(),
  SecurityConfigurationId: z.string().min(1).max(64).regex(
    new RegExp("[0-9a-z]+"),
  ).describe("The ID of the security configuration.").optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  ContainerProvider: z.object({
    Type: z.string(),
    Id: z.string(),
    Info: ContainerInfoSchema,
  }).optional(),
  Id: z.string(),
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SecurityConfigurationId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ContainerProvider: z.object({
    Type: z.string().describe("The type of the container provider").optional(),
    Info: ContainerInfoSchema.optional(),
  }).describe("Container provider of the virtual cluster.").optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+"))
    .describe("Name of the virtual cluster.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this virtual cluster.",
  ).optional(),
  SecurityConfigurationId: z.string().min(1).max(64).regex(
    new RegExp("[0-9a-z]+"),
  ).describe("The ID of the security configuration.").optional(),
});

export const model = {
  type: "@swamp/aws/emrcontainers/virtual-cluster",
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
      description: "EMRContainers VirtualCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMRContainers VirtualCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EMRContainers::VirtualCluster",
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
      description: "Get a EMRContainers VirtualCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers VirtualCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EMRContainers::VirtualCluster",
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
      description: "Update a EMRContainers VirtualCluster",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EMRContainers::VirtualCluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EMRContainers::VirtualCluster",
          identifier,
          currentState,
          desiredState,
          ["ContainerProvider", "Name"],
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
      description: "Delete a EMRContainers VirtualCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMRContainers VirtualCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EMRContainers::VirtualCluster",
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
      description: "Sync EMRContainers VirtualCluster state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMRContainers::VirtualCluster",
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
