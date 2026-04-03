// Auto-generated extension model for @swamp/aws/ses/contact-list
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

export const TopicSchema = z.object({
  TopicName: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,64}$")).describe(
    "The name of the topic.",
  ),
  DisplayName: z.string().min(0).max(128).describe(
    "The display name of the topic.",
  ),
  Description: z.string().min(0).max(500).describe(
    "The description of the topic.",
  ).optional(),
  DefaultSubscriptionStatus: z.string(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  ContactListName: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,64}$"))
    .describe("The name of the contact list.").optional(),
  Description: z.string().max(500).describe(
    "The description of the contact list.",
  ).optional(),
  Topics: z.array(TopicSchema).describe(
    "The topics associated with the contact list.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the contact list.",
  ).optional(),
});

const StateSchema = z.object({
  ContactListName: z.string(),
  Description: z.string().optional(),
  Topics: z.array(TopicSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ContactListName: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,64}$"))
    .describe("The name of the contact list.").optional(),
  Description: z.string().max(500).describe(
    "The description of the contact list.",
  ).optional(),
  Topics: z.array(TopicSchema).describe(
    "The topics associated with the contact list.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the contact list.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ses/contact-list",
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
      description: "SES ContactList resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES ContactList",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::ContactList",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ContactListName ?? g.ContactListName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SES ContactList",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ContactList",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::ContactList",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.ContactListName ?? context.globalArgs.ContactListName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SES ContactList",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ContactListName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ContactListName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::ContactList",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::ContactList",
          identifier,
          currentState,
          desiredState,
          ["ContactListName"],
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
      description: "Delete a SES ContactList",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ContactList",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::ContactList",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ContactListName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SES ContactList state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ContactListName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ContactListName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::ContactList",
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
