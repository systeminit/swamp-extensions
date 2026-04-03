// Auto-generated extension model for @swamp/aws/detective/member-invitation
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
  GraphArn: z.string().regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:detective:(([a-z]+-)+[0-9]+):[0-9]{12}:graph:[0-9a-f]{32}",
    ),
  ).describe(
    "The ARN of the graph to which the member account will be invited",
  ),
  MemberId: z.string().regex(new RegExp("[0-9]{12}")).describe(
    "The AWS account ID to be invited to join the graph as a member",
  ),
  MemberEmailAddress: z.string().regex(new RegExp(".*@.*")).describe(
    "The root email address for the account to be invited, for validation. Updating this field has no effect.",
  ),
  DisableEmailNotification: z.boolean().describe(
    "When set to true, invitation emails are not sent to the member accounts. Member accounts must still accept the invitation before they are added to the behavior graph. Updating this field has no effect.",
  ).optional(),
  Message: z.string().min(1).max(1000).describe(
    "A message to be included in the email invitation sent to the invited account. Updating this field has no effect.",
  ).optional(),
});

const StateSchema = z.object({
  GraphArn: z.string(),
  MemberId: z.string(),
  MemberEmailAddress: z.string().optional(),
  DisableEmailNotification: z.boolean().optional(),
  Message: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  GraphArn: z.string().regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:detective:(([a-z]+-)+[0-9]+):[0-9]{12}:graph:[0-9a-f]{32}",
    ),
  ).describe("The ARN of the graph to which the member account will be invited")
    .optional(),
  MemberId: z.string().regex(new RegExp("[0-9]{12}")).describe(
    "The AWS account ID to be invited to join the graph as a member",
  ).optional(),
  MemberEmailAddress: z.string().regex(new RegExp(".*@.*")).describe(
    "The root email address for the account to be invited, for validation. Updating this field has no effect.",
  ).optional(),
  DisableEmailNotification: z.boolean().describe(
    "When set to true, invitation emails are not sent to the member accounts. Member accounts must still accept the invitation before they are added to the behavior graph. Updating this field has no effect.",
  ).optional(),
  Message: z.string().min(1).max(1000).describe(
    "A message to be included in the email invitation sent to the invited account. Updating this field has no effect.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/detective/member-invitation",
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
      description: "Detective MemberInvitation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Detective MemberInvitation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Detective::MemberInvitation",
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
      description: "Get a Detective MemberInvitation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Detective MemberInvitation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Detective::MemberInvitation",
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
      description: "Update a Detective MemberInvitation",
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
          existing.GraphArn?.toString(),
          existing.MemberId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Detective::MemberInvitation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Detective::MemberInvitation",
          identifier,
          currentState,
          desiredState,
          ["GraphArn", "MemberId"],
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
      description: "Delete a Detective MemberInvitation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Detective MemberInvitation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Detective::MemberInvitation",
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
      description: "Sync Detective MemberInvitation state from AWS",
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
          existing.GraphArn?.toString(),
          existing.MemberId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Detective::MemberInvitation",
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
