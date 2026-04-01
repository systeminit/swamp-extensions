// Auto-generated extension model for @swamp/aws/supportapp/slack-workspace-configuration
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
  TeamId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The team ID in Slack, which uniquely identifies a workspace.",
  ),
  VersionId: z.string().min(1).max(256).regex(new RegExp("^[0-9]+$")).describe(
    "An identifier used to update an existing Slack workspace configuration in AWS CloudFormation.",
  ).optional(),
});

const StateSchema = z.object({
  TeamId: z.string(),
  VersionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  TeamId: z.string().min(1).max(256).regex(new RegExp("^\\S+$")).describe(
    "The team ID in Slack, which uniquely identifies a workspace.",
  ).optional(),
  VersionId: z.string().min(1).max(256).regex(new RegExp("^[0-9]+$")).describe(
    "An identifier used to update an existing Slack workspace configuration in AWS CloudFormation.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/supportapp/slack-workspace-configuration",
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
      description: "SupportApp SlackWorkspaceConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SupportApp SlackWorkspaceConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SupportApp::SlackWorkspaceConfiguration",
          desiredState,
        ) as StateData;
        const instanceName = (result.TeamId ?? g.TeamId)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SupportApp SlackWorkspaceConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SupportApp SlackWorkspaceConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SupportApp::SlackWorkspaceConfiguration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.TeamId ?? context.globalArgs.TeamId)?.toString() ??
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
      description: "Update a SupportApp SlackWorkspaceConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TeamId?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TeamId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SupportApp::SlackWorkspaceConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SupportApp::SlackWorkspaceConfiguration",
          identifier,
          currentState,
          desiredState,
          ["TeamId"],
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
      description: "Delete a SupportApp SlackWorkspaceConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SupportApp SlackWorkspaceConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SupportApp::SlackWorkspaceConfiguration",
          args.identifier,
        );
        const instanceName = context.globalArgs.TeamId?.toString() ??
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
      description: "Sync SupportApp SlackWorkspaceConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TeamId?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TeamId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SupportApp::SlackWorkspaceConfiguration",
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
