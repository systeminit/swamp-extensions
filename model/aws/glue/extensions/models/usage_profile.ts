// Auto-generated extension model for @swamp/aws/glue/usage-profile
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

export const ConfigurationObjectSchema = z.object({
  DefaultValue: z.string().optional(),
  AllowedValues: z.array(z.string()).optional(),
  MinValue: z.string().optional(),
  MaxValue: z.string().optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("A key to identify the tag."),
  Value: z.string().min(0).max(256).describe(
    "Corresponding tag value for the key.",
  ),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(5).max(128).describe("The name of the UsageProfile."),
  Description: z.string().min(1).max(512).regex(
    new RegExp("[a-zA-Z0-9\\-\\:\\_]{1,64}"),
  ).describe("The description of the UsageProfile.").optional(),
  Configuration: z.object({
    JobConfiguration: z.record(z.string(), ConfigurationObjectSchema)
      .optional(),
    SessionConfiguration: z.record(z.string(), ConfigurationObjectSchema)
      .optional(),
  }).describe(
    "UsageProfile configuration for supported service ex: (Jobs, Sessions).",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be applied to this UsageProfiles.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  Configuration: z.object({
    JobConfiguration: z.record(z.string(), z.unknown()),
    SessionConfiguration: z.record(z.string(), z.unknown()),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedOn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(5).max(128).describe("The name of the UsageProfile.")
    .optional(),
  Description: z.string().min(1).max(512).regex(
    new RegExp("[a-zA-Z0-9\\-\\:\\_]{1,64}"),
  ).describe("The description of the UsageProfile.").optional(),
  Configuration: z.object({
    JobConfiguration: z.record(z.string(), ConfigurationObjectSchema)
      .optional(),
    SessionConfiguration: z.record(z.string(), ConfigurationObjectSchema)
      .optional(),
  }).describe(
    "UsageProfile configuration for supported service ex: (Jobs, Sessions).",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be applied to this UsageProfiles.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/glue/usage-profile",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue UsageProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue UsageProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::UsageProfile",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Glue UsageProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue UsageProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Glue::UsageProfile",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Glue UsageProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::UsageProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::UsageProfile",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Glue UsageProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue UsageProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Glue::UsageProfile",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description: "Sync Glue UsageProfile state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::UsageProfile",
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
