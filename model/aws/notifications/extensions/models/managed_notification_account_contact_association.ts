// Auto-generated extension model for @swamp/aws/notifications/managed-notification-account-contact-association
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
  ManagedNotificationConfigurationArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]{3,10}:notifications::([0-9]{12}|):managed-notification-configuration/category/[a-zA-Z0-9\\-]{3,64}/sub-category/[a-zA-Z0-9\\-]{3,64}$",
    ),
  ).describe(
    "The managed notification configuration ARN, against which the account contact association will be created",
  ),
  ContactIdentifier: z.enum([
    "ACCOUNT_PRIMARY",
    "ACCOUNT_ALTERNATE_SECURITY",
    "ACCOUNT_ALTERNATE_OPERATIONS",
    "ACCOUNT_ALTERNATE_BILLING",
  ]).describe("This unique identifier for Contact"),
});

const StateSchema = z.object({
  ManagedNotificationConfigurationArn: z.string(),
  ContactIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ManagedNotificationConfigurationArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]{3,10}:notifications::([0-9]{12}|):managed-notification-configuration/category/[a-zA-Z0-9\\-]{3,64}/sub-category/[a-zA-Z0-9\\-]{3,64}$",
    ),
  ).describe(
    "The managed notification configuration ARN, against which the account contact association will be created",
  ).optional(),
  ContactIdentifier: z.enum([
    "ACCOUNT_PRIMARY",
    "ACCOUNT_ALTERNATE_SECURITY",
    "ACCOUNT_ALTERNATE_OPERATIONS",
    "ACCOUNT_ALTERNATE_BILLING",
  ]).describe("This unique identifier for Contact").optional(),
});

export const model = {
  type:
    "@swamp/aws/notifications/managed-notification-account-contact-association",
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
      description:
        "Notifications ManagedNotificationAccountContactAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description:
        "Create a Notifications ManagedNotificationAccountContactAssociation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Notifications::ManagedNotificationAccountContactAssociation",
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
      description:
        "Get a Notifications ManagedNotificationAccountContactAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Notifications ManagedNotificationAccountContactAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Notifications::ManagedNotificationAccountContactAssociation",
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
      description:
        "Update a Notifications ManagedNotificationAccountContactAssociation",
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
          existing.ManagedNotificationConfigurationArn?.toString(),
          existing.ContactIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Notifications::ManagedNotificationAccountContactAssociation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Notifications::ManagedNotificationAccountContactAssociation",
          identifier,
          currentState,
          desiredState,
          ["ManagedNotificationConfigurationArn", "ContactIdentifier"],
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
      description:
        "Delete a Notifications ManagedNotificationAccountContactAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Notifications ManagedNotificationAccountContactAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Notifications::ManagedNotificationAccountContactAssociation",
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
        "Sync Notifications ManagedNotificationAccountContactAssociation state from AWS",
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
          existing.ManagedNotificationConfigurationArn?.toString(),
          existing.ContactIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Notifications::ManagedNotificationAccountContactAssociation",
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
