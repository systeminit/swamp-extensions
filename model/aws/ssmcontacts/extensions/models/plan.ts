// Auto-generated extension model for @swamp/aws/ssmcontacts/plan
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

export const ContactTargetInfoSchema = z.object({
  ContactId: z.string().describe(
    "The Amazon Resource Name (ARN) of the contact.",
  ),
  IsEssential: z.boolean().describe(
    "A Boolean value determining if the contact's acknowledgement stops the progress of stages in the plan.",
  ),
});

export const ChannelTargetInfoSchema = z.object({
  ChannelId: z.string().describe(
    "The Amazon Resource Name (ARN) of the contact channel.",
  ),
  RetryIntervalInMinutes: z.number().int().describe(
    "The number of minutes to wait to retry sending engagement in the case the engagement initially fails.",
  ),
});

export const TargetsSchema = z.object({
  ContactTargetInfo: ContactTargetInfoSchema.describe(
    "The contact that SSM Incident Manager is engaging during an incident.",
  ).optional(),
  ChannelTargetInfo: ChannelTargetInfoSchema.describe(
    "Information about the contact channel that SSM Incident Manager uses to engage the contact.",
  ).optional(),
});

export const StageSchema = z.object({
  DurationInMinutes: z.number().int().describe(
    "The time to wait until beginning the next stage.",
  ),
  Targets: z.array(TargetsSchema).describe(
    "The contacts or contact methods that the escalation plan or engagement plan is engaging.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ContactId: z.string().regex(
    new RegExp(
      "arn:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]*:[0-9]+:([\\w+=\\/,.@:-]+)*",
    ),
  ).describe(
    "Contact ID for the AWS SSM Incident Manager Contact to associate the plan.",
  ).optional(),
  Stages: z.array(StageSchema).describe(
    "The stages that an escalation plan or engagement plan engages contacts and contact methods in.",
  ).optional(),
  RotationIds: z.array(z.string()).describe(
    "Rotation Ids to associate with Oncall Contact for engagement.",
  ).optional(),
});

const StateSchema = z.object({
  ContactId: z.string().optional(),
  Stages: z.array(StageSchema).optional(),
  RotationIds: z.array(z.string()).optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ContactId: z.string().regex(
    new RegExp(
      "arn:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]+:[-\\w+=\\/,.@]*:[0-9]+:([\\w+=\\/,.@:-]+)*",
    ),
  ).describe(
    "Contact ID for the AWS SSM Incident Manager Contact to associate the plan.",
  ).optional(),
  Stages: z.array(StageSchema).describe(
    "The stages that an escalation plan or engagement plan engages contacts and contact methods in.",
  ).optional(),
  RotationIds: z.array(z.string()).describe(
    "Rotation Ids to associate with Oncall Contact for engagement.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ssmcontacts/plan",
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
      description: "SSMContacts Plan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMContacts Plan",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSMContacts::Plan",
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
      description: "Get a SSMContacts Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSMContacts::Plan",
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
      description: "Update a SSMContacts Plan",
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
          "AWS::SSMContacts::Plan",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSMContacts::Plan",
          identifier,
          currentState,
          desiredState,
          ["ContactId"],
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
      description: "Delete a SSMContacts Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSMContacts::Plan",
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
      description: "Sync SSMContacts Plan state from AWS",
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
            "AWS::SSMContacts::Plan",
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
