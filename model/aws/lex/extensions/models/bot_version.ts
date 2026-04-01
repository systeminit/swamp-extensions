// Auto-generated extension model for @swamp/aws/lex/bot-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const BotVersionLocaleDetailsSchema = z.object({
  SourceBotVersion: z.string().min(1).max(5).regex(
    new RegExp("^(DRAFT|[0-9]+)$"),
  ).describe("The version of a bot."),
});

export const BotVersionLocaleSpecificationSchema = z.object({
  LocaleId: z.string().describe(
    "The identifier of the language and locale that the bot will be used in.",
  ),
  BotVersionLocaleDetails: BotVersionLocaleDetailsSchema.describe(
    "The version of a bot used for a bot locale.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BotId: z.string().min(10).max(10).regex(new RegExp("^[0-9a-zA-Z]+$"))
    .describe("Unique ID of resource"),
  Description: z.string().max(200).describe(
    "A description of the version. Use the description to help identify the version in lists.",
  ).optional(),
  BotVersionLocaleSpecification: z.array(BotVersionLocaleSpecificationSchema)
    .describe(
      "Specifies the locales that Amazon Lex adds to this version. You can choose the Draft version or any other previously published version for each locale.",
    ),
});

const StateSchema = z.object({
  BotId: z.string(),
  BotVersion: z.string(),
  Description: z.string().optional(),
  BotVersionLocaleSpecification: z.array(BotVersionLocaleSpecificationSchema)
    .optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BotId: z.string().min(10).max(10).regex(new RegExp("^[0-9a-zA-Z]+$"))
    .describe("Unique ID of resource").optional(),
  Description: z.string().max(200).describe(
    "A description of the version. Use the description to help identify the version in lists.",
  ).optional(),
  BotVersionLocaleSpecification: z.array(BotVersionLocaleSpecificationSchema)
    .describe(
      "Specifies the locales that Amazon Lex adds to this version. You can choose the Draft version or any other previously published version for each locale.",
    ).optional(),
});

export const model = {
  type: "@swamp/aws/lex/bot-version",
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
      description: "Lex BotVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lex BotVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lex::BotVersion",
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
      description: "Get a Lex BotVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex BotVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lex::BotVersion",
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
    delete: {
      description: "Delete a Lex BotVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex BotVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lex::BotVersion",
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
      description: "Sync Lex BotVersion state from AWS",
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
        const idParts = [
          existing.BotId?.toString(),
          existing.BotVersion?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Lex::BotVersion",
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
