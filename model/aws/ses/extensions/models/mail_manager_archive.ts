// Auto-generated extension model for @swamp/aws/ses/mail-manager-archive
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]+$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9/_\\+=\\.:@\\-]*$"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ArchiveName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$"),
  ).optional(),
  KmsKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-z0-9-]{1,20}:[0-9]{12}:(key|alias)/.+$",
    ),
  ).optional(),
  Retention: z.object({
    RetentionPeriod: z.enum([
      "THREE_MONTHS",
      "SIX_MONTHS",
      "NINE_MONTHS",
      "ONE_YEAR",
      "EIGHTEEN_MONTHS",
      "TWO_YEARS",
      "THIRTY_MONTHS",
      "THREE_YEARS",
      "FOUR_YEARS",
      "FIVE_YEARS",
      "SIX_YEARS",
      "SEVEN_YEARS",
      "EIGHT_YEARS",
      "NINE_YEARS",
      "TEN_YEARS",
      "PERMANENT",
    ]).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ArchiveArn: z.string().optional(),
  ArchiveId: z.string(),
  ArchiveName: z.string().optional(),
  ArchiveState: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Retention: z.object({
    RetentionPeriod: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ArchiveName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$"),
  ).optional(),
  KmsKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-z0-9-]{1,20}:[0-9]{12}:(key|alias)/.+$",
    ),
  ).optional(),
  Retention: z.object({
    RetentionPeriod: z.enum([
      "THREE_MONTHS",
      "SIX_MONTHS",
      "NINE_MONTHS",
      "ONE_YEAR",
      "EIGHTEEN_MONTHS",
      "TWO_YEARS",
      "THIRTY_MONTHS",
      "THREE_YEARS",
      "FOUR_YEARS",
      "FIVE_YEARS",
      "SIX_YEARS",
      "SEVEN_YEARS",
      "EIGHT_YEARS",
      "NINE_YEARS",
      "TEN_YEARS",
      "PERMANENT",
    ]).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ses/mail-manager-archive",
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
      description: "SES MailManagerArchive resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MailManagerArchive",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::MailManagerArchive",
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
      description: "Get a SES MailManagerArchive",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerArchive",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::MailManagerArchive",
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
      description: "Update a SES MailManagerArchive",
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
        const identifier = existing.ArchiveId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MailManagerArchive",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::MailManagerArchive",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyArn"],
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
      description: "Delete a SES MailManagerArchive",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MailManagerArchive",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::MailManagerArchive",
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
      description: "Sync SES MailManagerArchive state from AWS",
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
        const identifier = existing.ArchiveId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MailManagerArchive",
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
