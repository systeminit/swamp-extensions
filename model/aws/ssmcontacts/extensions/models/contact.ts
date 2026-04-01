// Auto-generated extension model for @swamp/aws/ssmcontacts/contact
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
  ).optional(),
  Targets: z.array(TargetsSchema).describe(
    "The contacts or contact methods that the escalation plan or engagement plan is engaging.",
  ).optional(),
  RotationIds: z.array(z.string()).describe(
    "List of Rotation Ids to associate with Contact",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag"),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Alias: z.string().min(1).max(255).regex(new RegExp("^[a-z0-9_\\-\\.]*$"))
    .describe(
      "Alias of the contact. String value with 20 to 256 characters. Only alphabetical, numeric characters, dash, or underscore allowed.",
    ),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\s]*$"),
  ).describe(
    "Name of the contact. String value with 3 to 256 characters. Only alphabetical, space, numeric characters, dash, or underscore allowed.",
  ),
  Type: z.enum(["PERSONAL", "ESCALATION", "ONCALL_SCHEDULE"]).describe(
    "Contact type, which specify type of contact. Currently supported values: “PERSONAL”, “SHARED”, “OTHER“.",
  ),
  Plan: z.array(StageSchema).describe(
    "The stages that an escalation plan or engagement plan engages contacts and contact methods in.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Alias: z.string().optional(),
  DisplayName: z.string().optional(),
  Type: z.string().optional(),
  Plan: z.array(StageSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Alias: z.string().min(1).max(255).regex(new RegExp("^[a-z0-9_\\-\\.]*$"))
    .describe(
      "Alias of the contact. String value with 20 to 256 characters. Only alphabetical, numeric characters, dash, or underscore allowed.",
    ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\s]*$"),
  ).describe(
    "Name of the contact. String value with 3 to 256 characters. Only alphabetical, space, numeric characters, dash, or underscore allowed.",
  ).optional(),
  Type: z.enum(["PERSONAL", "ESCALATION", "ONCALL_SCHEDULE"]).describe(
    "Contact type, which specify type of contact. Currently supported values: “PERSONAL”, “SHARED”, “OTHER“.",
  ).optional(),
  Plan: z.array(StageSchema).describe(
    "The stages that an escalation plan or engagement plan engages contacts and contact methods in.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ssmcontacts/contact",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSMContacts Contact resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMContacts Contact",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSMContacts::Contact",
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
      description: "Get a SSMContacts Contact",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Contact",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSMContacts::Contact",
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
      description: "Update a SSMContacts Contact",
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
          "AWS::SSMContacts::Contact",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSMContacts::Contact",
          identifier,
          currentState,
          desiredState,
          ["Alias", "Type"],
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
      description: "Delete a SSMContacts Contact",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMContacts Contact",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSMContacts::Contact",
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
      description: "Sync SSMContacts Contact state from AWS",
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
            "AWS::SSMContacts::Contact",
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
