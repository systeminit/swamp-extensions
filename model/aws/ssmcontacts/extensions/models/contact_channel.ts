// Auto-generated extension model for @swamp/aws/ssmcontacts/contact-channel
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
  ContactId: z.string().min(1).max(2048).regex(
    new RegExp(
      "arn:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]*:[0-9]+:([\\w+=\\/,.@:-]+)*",
    ),
  ).describe("ARN of the contact resource").optional(),
  ChannelName: z.string().min(1).max(255).regex(
    new RegExp(
      "[a-zA-Z 0-9_\\-+'&amp;\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2000-\\u3300]+",
    ),
  ).describe(
    "The device name. String of 6 to 50 alphabetical, numeric, dash, and underscore characters.",
  ).optional(),
  ChannelType: z.enum(["SMS", "VOICE", "EMAIL"]).describe(
    "Device type, which specify notification channel. Currently supported values: “SMS”, “VOICE”, “EMAIL”, “CHATBOT.",
  ).optional(),
  DeferActivation: z.boolean().describe(
    "If you want to activate the channel at a later time, you can choose to defer activation. SSM Incident Manager can't engage your contact channel until it has been activated.",
  ).optional(),
  ChannelAddress: z.string().describe(
    "The details that SSM Incident Manager uses when trying to engage the contact channel.",
  ).optional(),
});

const StateSchema = z.object({
  ContactId: z.string().optional(),
  ChannelName: z.string().optional(),
  ChannelType: z.string().optional(),
  DeferActivation: z.boolean().optional(),
  ChannelAddress: z.string().optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ContactId: z.string().min(1).max(2048).regex(
    new RegExp(
      "arn:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]*:[0-9]+:([\\w+=\\/,.@:-]+)*",
    ),
  ).describe("ARN of the contact resource").optional(),
  ChannelName: z.string().min(1).max(255).regex(
    new RegExp(
      "[a-zA-Z 0-9_\\-+'&amp;\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2000-\\u3300]+",
    ),
  ).describe(
    "The device name. String of 6 to 50 alphabetical, numeric, dash, and underscore characters.",
  ).optional(),
  ChannelType: z.enum(["SMS", "VOICE", "EMAIL"]).describe(
    "Device type, which specify notification channel. Currently supported values: “SMS”, “VOICE”, “EMAIL”, “CHATBOT.",
  ).optional(),
  DeferActivation: z.boolean().describe(
    "If you want to activate the channel at a later time, you can choose to defer activation. SSM Incident Manager can't engage your contact channel until it has been activated.",
  ).optional(),
  ChannelAddress: z.string().describe(
    "The details that SSM Incident Manager uses when trying to engage the contact channel.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ssmcontacts/contact-channel",
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
      description: "SSMContacts ContactChannel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMContacts ContactChannel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSMContacts::ContactChannel",
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
      description: "Get a SSMContacts ContactChannel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts ContactChannel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSMContacts::ContactChannel",
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
      description: "Update a SSMContacts ContactChannel",
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
          "AWS::SSMContacts::ContactChannel",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSMContacts::ContactChannel",
          identifier,
          currentState,
          desiredState,
          ["ContactId", "ChannelType"],
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
      description: "Delete a SSMContacts ContactChannel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts ContactChannel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSMContacts::ContactChannel",
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
      description: "Sync SSMContacts ContactChannel state from AWS",
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
            "AWS::SSMContacts::ContactChannel",
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
