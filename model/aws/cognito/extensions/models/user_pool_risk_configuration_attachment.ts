// Auto-generated extension model for @swamp/aws/cognito/user-pool-risk-configuration-attachment
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

export const CompromisedCredentialsActionsTypeSchema = z.object({
  EventAction: z.string(),
});

export const AccountTakeoverActionTypeSchema = z.object({
  EventAction: z.string(),
  Notify: z.boolean(),
});

export const AccountTakeoverActionsTypeSchema = z.object({
  HighAction: AccountTakeoverActionTypeSchema.optional(),
  LowAction: AccountTakeoverActionTypeSchema.optional(),
  MediumAction: AccountTakeoverActionTypeSchema.optional(),
});

export const NotifyEmailTypeSchema = z.object({
  HtmlBody: z.string().optional(),
  Subject: z.string(),
  TextBody: z.string().optional(),
});

export const NotifyConfigurationTypeSchema = z.object({
  BlockEmail: NotifyEmailTypeSchema.optional(),
  MfaEmail: NotifyEmailTypeSchema.optional(),
  NoActionEmail: NotifyEmailTypeSchema.optional(),
  From: z.string().optional(),
  ReplyTo: z.string().optional(),
  SourceArn: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  UserPoolId: z.string(),
  ClientId: z.string(),
  RiskExceptionConfiguration: z.object({
    BlockedIPRangeList: z.array(z.string()).optional(),
    SkippedIPRangeList: z.array(z.string()).optional(),
  }).optional(),
  CompromisedCredentialsRiskConfiguration: z.object({
    Actions: CompromisedCredentialsActionsTypeSchema,
    EventFilter: z.array(z.string()).optional(),
  }).optional(),
  AccountTakeoverRiskConfiguration: z.object({
    Actions: AccountTakeoverActionsTypeSchema,
    NotifyConfiguration: NotifyConfigurationTypeSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  UserPoolId: z.string(),
  ClientId: z.string(),
  RiskExceptionConfiguration: z.object({
    BlockedIPRangeList: z.array(z.string()),
    SkippedIPRangeList: z.array(z.string()),
  }).optional(),
  CompromisedCredentialsRiskConfiguration: z.object({
    Actions: CompromisedCredentialsActionsTypeSchema,
    EventFilter: z.array(z.string()),
  }).optional(),
  AccountTakeoverRiskConfiguration: z.object({
    Actions: AccountTakeoverActionsTypeSchema,
    NotifyConfiguration: NotifyConfigurationTypeSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  UserPoolId: z.string().optional(),
  ClientId: z.string().optional(),
  RiskExceptionConfiguration: z.object({
    BlockedIPRangeList: z.array(z.string()).optional(),
    SkippedIPRangeList: z.array(z.string()).optional(),
  }).optional(),
  CompromisedCredentialsRiskConfiguration: z.object({
    Actions: CompromisedCredentialsActionsTypeSchema.optional(),
    EventFilter: z.array(z.string()).optional(),
  }).optional(),
  AccountTakeoverRiskConfiguration: z.object({
    Actions: AccountTakeoverActionsTypeSchema.optional(),
    NotifyConfiguration: NotifyConfigurationTypeSchema.optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/cognito/user-pool-risk-configuration-attachment",
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
      description: "Cognito UserPoolRiskConfigurationAttachment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cognito UserPoolRiskConfigurationAttachment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Cognito::UserPoolRiskConfigurationAttachment",
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
      description: "Get a Cognito UserPoolRiskConfigurationAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito UserPoolRiskConfigurationAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Cognito::UserPoolRiskConfigurationAttachment",
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
      description: "Update a Cognito UserPoolRiskConfigurationAttachment",
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
          existing.UserPoolId?.toString(),
          existing.ClientId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Cognito::UserPoolRiskConfigurationAttachment",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Cognito::UserPoolRiskConfigurationAttachment",
          identifier,
          currentState,
          desiredState,
          ["UserPoolId", "ClientId"],
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
      description: "Delete a Cognito UserPoolRiskConfigurationAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito UserPoolRiskConfigurationAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Cognito::UserPoolRiskConfigurationAttachment",
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
      description:
        "Sync Cognito UserPoolRiskConfigurationAttachment state from AWS",
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
          existing.UserPoolId?.toString(),
          existing.ClientId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Cognito::UserPoolRiskConfigurationAttachment",
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
