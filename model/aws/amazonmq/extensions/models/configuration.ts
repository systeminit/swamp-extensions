// Auto-generated extension model for @swamp/aws/amazonmq/configuration
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

export const TagsEntrySchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AuthenticationStrategy: z.string().describe(
    "The authentication strategy associated with the configuration. The default is SIMPLE.",
  ).optional(),
  EngineType: z.string().describe(
    "The type of broker engine. Note: Currently, Amazon MQ only supports ACTIVEMQ for creating and editing broker configurations.",
  ),
  EngineVersion: z.string().describe("The version of the broker engine.")
    .optional(),
  Data: z.string().describe("The base64-encoded XML configuration.").optional(),
  Description: z.string().describe("The description of the configuration.")
    .optional(),
  Name: z.string().describe("The name of the configuration."),
  Tags: z.array(TagsEntrySchema).describe(
    "Create tags when creating the configuration.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AuthenticationStrategy: z.string().optional(),
  EngineType: z.string().optional(),
  EngineVersion: z.string().optional(),
  Data: z.string().optional(),
  Description: z.string().optional(),
  Id: z.string(),
  Name: z.string().optional(),
  Revision: z.string().optional(),
  Tags: z.array(TagsEntrySchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AuthenticationStrategy: z.string().describe(
    "The authentication strategy associated with the configuration. The default is SIMPLE.",
  ).optional(),
  EngineType: z.string().describe(
    "The type of broker engine. Note: Currently, Amazon MQ only supports ACTIVEMQ for creating and editing broker configurations.",
  ).optional(),
  EngineVersion: z.string().describe("The version of the broker engine.")
    .optional(),
  Data: z.string().describe("The base64-encoded XML configuration.").optional(),
  Description: z.string().describe("The description of the configuration.")
    .optional(),
  Name: z.string().describe("The name of the configuration.").optional(),
  Tags: z.array(TagsEntrySchema).describe(
    "Create tags when creating the configuration.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/amazonmq/configuration",
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
      description: "AmazonMQ Configuration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AmazonMQ Configuration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AmazonMQ::Configuration",
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
      description: "Get a AmazonMQ Configuration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmazonMQ Configuration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AmazonMQ::Configuration",
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
      description: "Update a AmazonMQ Configuration",
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
          "AWS::AmazonMQ::Configuration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AmazonMQ::Configuration",
          identifier,
          currentState,
          desiredState,
          ["AuthenticationStrategy", "EngineType", "EngineVersion", "Name"],
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
      description: "Delete a AmazonMQ Configuration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmazonMQ Configuration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AmazonMQ::Configuration",
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
      description: "Sync AmazonMQ Configuration state from AWS",
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
            "AWS::AmazonMQ::Configuration",
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
