// Auto-generated extension model for @swamp/aws/chatbot/custom-action
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

export const CustomActionAttachmentCriteriaSchema = z.object({
  Operator: z.enum(["HAS_VALUE", "EQUALS"]),
  VariableName: z.string(),
  Value: z.string().min(0).max(1024).optional(),
});

export const CustomActionAttachmentSchema = z.object({
  NotificationType: z.string().min(1).max(100).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).optional(),
  ButtonText: z.string().min(1).max(50).regex(new RegExp("^[\\S\\s]+$"))
    .optional(),
  Criteria: z.array(CustomActionAttachmentCriteriaSchema).optional(),
  Variables: z.record(z.string(), z.string()).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ActionName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]{1,64}$"),
  ),
  AliasName: z.string().min(1).max(30).regex(new RegExp("^[A-Za-z0-9-_]+$"))
    .optional(),
  Attachments: z.array(CustomActionAttachmentSchema).optional(),
  Definition: z.object({
    CommandText: z.string().min(1).max(5000),
  }),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ActionName: z.string().optional(),
  AliasName: z.string().optional(),
  Attachments: z.array(CustomActionAttachmentSchema).optional(),
  CustomActionArn: z.string(),
  Definition: z.object({
    CommandText: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ActionName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]{1,64}$"),
  ).optional(),
  AliasName: z.string().min(1).max(30).regex(new RegExp("^[A-Za-z0-9-_]+$"))
    .optional(),
  Attachments: z.array(CustomActionAttachmentSchema).optional(),
  Definition: z.object({
    CommandText: z.string().min(1).max(5000).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/chatbot/custom-action",
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
      description: "Chatbot CustomAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Chatbot CustomAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Chatbot::CustomAction",
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
      description: "Get a Chatbot CustomAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chatbot CustomAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Chatbot::CustomAction",
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
      description: "Update a Chatbot CustomAction",
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
        const identifier = existing.CustomActionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Chatbot::CustomAction",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Chatbot::CustomAction",
          identifier,
          currentState,
          desiredState,
          ["ActionName"],
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
      description: "Delete a Chatbot CustomAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chatbot CustomAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Chatbot::CustomAction",
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
      description: "Sync Chatbot CustomAction state from AWS",
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
        const identifier = existing.CustomActionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Chatbot::CustomAction",
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
