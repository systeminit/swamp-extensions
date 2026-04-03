// Auto-generated extension model for @swamp/aws/supportapp/slack-channel-configuration
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
  TeamId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The team ID in Slack, which uniquely identifies a workspace.",
  ),
  ChannelId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The channel ID in Slack, which identifies a channel within a workspace.",
  ),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^.+$")).describe(
    "The channel name in Slack.",
  ).optional(),
  NotifyOnCreateOrReopenCase: z.boolean().describe(
    "Whether to notify when a case is created or reopened.",
  ).optional(),
  NotifyOnAddCorrespondenceToCase: z.boolean().describe(
    "Whether to notify when a correspondence is added to a case.",
  ).optional(),
  NotifyOnResolveCase: z.boolean().describe(
    "Whether to notify when a case is resolved.",
  ).optional(),
  NotifyOnCaseSeverity: z.enum(["none", "all", "high"]).describe(
    "The severity level of a support case that a customer wants to get notified for.",
  ),
  ChannelRoleArn: z.string().min(31).max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role\\/(.+)$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that grants the AWS Support App access to perform operations for AWS services.",
  ),
});

const StateSchema = z.object({
  TeamId: z.string(),
  ChannelId: z.string(),
  ChannelName: z.string().optional(),
  NotifyOnCreateOrReopenCase: z.boolean().optional(),
  NotifyOnAddCorrespondenceToCase: z.boolean().optional(),
  NotifyOnResolveCase: z.boolean().optional(),
  NotifyOnCaseSeverity: z.string().optional(),
  ChannelRoleArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TeamId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The team ID in Slack, which uniquely identifies a workspace.",
  ).optional(),
  ChannelId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The channel ID in Slack, which identifies a channel within a workspace.",
  ).optional(),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^.+$")).describe(
    "The channel name in Slack.",
  ).optional(),
  NotifyOnCreateOrReopenCase: z.boolean().describe(
    "Whether to notify when a case is created or reopened.",
  ).optional(),
  NotifyOnAddCorrespondenceToCase: z.boolean().describe(
    "Whether to notify when a correspondence is added to a case.",
  ).optional(),
  NotifyOnResolveCase: z.boolean().describe(
    "Whether to notify when a case is resolved.",
  ).optional(),
  NotifyOnCaseSeverity: z.enum(["none", "all", "high"]).describe(
    "The severity level of a support case that a customer wants to get notified for.",
  ).optional(),
  ChannelRoleArn: z.string().min(31).max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role\\/(.+)$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that grants the AWS Support App access to perform operations for AWS services.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/supportapp/slack-channel-configuration",
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
      description: "SupportApp SlackChannelConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SupportApp SlackChannelConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SupportApp::SlackChannelConfiguration",
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
      description: "Get a SupportApp SlackChannelConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SupportApp SlackChannelConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SupportApp::SlackChannelConfiguration",
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
      description: "Update a SupportApp SlackChannelConfiguration",
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
        const idParts = [
          existing.TeamId?.toString(),
          existing.ChannelId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SupportApp::SlackChannelConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SupportApp::SlackChannelConfiguration",
          identifier,
          currentState,
          desiredState,
          ["TeamId", "ChannelId"],
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
      description: "Delete a SupportApp SlackChannelConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SupportApp SlackChannelConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SupportApp::SlackChannelConfiguration",
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
      description: "Sync SupportApp SlackChannelConfiguration state from AWS",
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
        const idParts = [
          existing.TeamId?.toString(),
          existing.ChannelId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SupportApp::SlackChannelConfiguration",
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
