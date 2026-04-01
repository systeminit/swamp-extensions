// Auto-generated extension model for @swamp/aws/proton/service-template
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
  Key: z.string().min(1).max(128).describe("The key of the resource tag."),
  Value: z.string().min(0).max(256).describe("The value of the resource tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().min(0).max(500).describe(
    "A description of the service template.",
  ).optional(),
  DisplayName: z.string().min(1).max(100).describe(
    "The name of the service template as displayed in the developer interface.",
  ).optional(),
  EncryptionKey: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):[a-zA-Z0-9-]+:[a-zA-Z0-9-]*:\\d{12}:([\\w+=,.@-]+[/:])*[\\w+=,.@-]+$",
    ),
  ).describe("A customer provided encryption key that's used to encrypt data.")
    .optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z]+[0-9A-Za-z_\\-]*$"),
  ).optional(),
  PipelineProvisioning: z.enum(["CUSTOMER_MANAGED"]).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional list of metadata items that you can associate with the Proton service template. A tag is a key-value pair. For more information, see Proton resources and tagging in the Proton User Guide.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  EncryptionKey: z.string().optional(),
  Name: z.string().optional(),
  PipelineProvisioning: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(0).max(500).describe(
    "A description of the service template.",
  ).optional(),
  DisplayName: z.string().min(1).max(100).describe(
    "The name of the service template as displayed in the developer interface.",
  ).optional(),
  EncryptionKey: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):[a-zA-Z0-9-]+:[a-zA-Z0-9-]*:\\d{12}:([\\w+=,.@-]+[/:])*[\\w+=,.@-]+$",
    ),
  ).describe("A customer provided encryption key that's used to encrypt data.")
    .optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z]+[0-9A-Za-z_\\-]*$"),
  ).optional(),
  PipelineProvisioning: z.enum(["CUSTOMER_MANAGED"]).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional list of metadata items that you can associate with the Proton service template. A tag is a key-value pair. For more information, see Proton resources and tagging in the Proton User Guide.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/proton/service-template",
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
      description: "Proton ServiceTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Proton ServiceTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Proton::ServiceTemplate",
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
      description: "Get a Proton ServiceTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Proton ServiceTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Proton::ServiceTemplate",
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
      description: "Update a Proton ServiceTemplate",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Proton::ServiceTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Proton::ServiceTemplate",
          identifier,
          currentState,
          desiredState,
          ["EncryptionKey", "Name", "PipelineProvisioning"],
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
      description: "Delete a Proton ServiceTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Proton ServiceTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Proton::ServiceTemplate",
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
      description: "Sync Proton ServiceTemplate state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Proton::ServiceTemplate",
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
