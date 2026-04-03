// Auto-generated extension model for @swamp/aws/cleanrooms/privacy-budget-template
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

export const BudgetParameterSchema = z.object({
  Type: z.enum(["CALENDAR_DAY", "CALENDAR_MONTH", "CALENDAR_WEEK", "LIFETIME"]),
  Budget: z.number().int().min(0),
  AutoRefresh: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms privacy budget template.",
  ).optional(),
  AutoRefresh: z.enum(["CALENDAR_MONTH", "NONE"]),
  PrivacyBudgetType: z.enum(["DIFFERENTIAL_PRIVACY", "ACCESS_BUDGET"]),
  Parameters: z.object({
    Epsilon: z.number().int().min(1).max(20).optional(),
    UsersNoisePerQuery: z.number().int().min(10).max(100).optional(),
    BudgetParameters: z.array(BudgetParameterSchema).optional(),
    ResourceArn: z.string().max(200).optional(),
  }),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CollaborationArn: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  PrivacyBudgetTemplateIdentifier: z.string(),
  Tags: z.array(TagSchema).optional(),
  AutoRefresh: z.string().optional(),
  PrivacyBudgetType: z.string().optional(),
  Parameters: z.object({
    Epsilon: z.number(),
    UsersNoisePerQuery: z.number(),
    BudgetParameters: z.array(BudgetParameterSchema),
    ResourceArn: z.string(),
  }).optional(),
  MembershipArn: z.string().optional(),
  MembershipIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms privacy budget template.",
  ).optional(),
  AutoRefresh: z.enum(["CALENDAR_MONTH", "NONE"]).optional(),
  PrivacyBudgetType: z.enum(["DIFFERENTIAL_PRIVACY", "ACCESS_BUDGET"])
    .optional(),
  Parameters: z.object({
    Epsilon: z.number().int().min(1).max(20).optional(),
    UsersNoisePerQuery: z.number().int().min(10).max(100).optional(),
    BudgetParameters: z.array(BudgetParameterSchema).optional(),
    ResourceArn: z.string().max(200).optional(),
  }).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
});

export const model = {
  type: "@swamp/aws/cleanrooms/privacy-budget-template",
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
      description: "CleanRooms PrivacyBudgetTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms PrivacyBudgetTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CleanRooms::PrivacyBudgetTemplate",
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
      description: "Get a CleanRooms PrivacyBudgetTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms PrivacyBudgetTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CleanRooms::PrivacyBudgetTemplate",
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
      description: "Update a CleanRooms PrivacyBudgetTemplate",
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
          existing.PrivacyBudgetTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CleanRooms::PrivacyBudgetTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CleanRooms::PrivacyBudgetTemplate",
          identifier,
          currentState,
          desiredState,
          [
            "MembershipIdentifier",
            "PrivacyBudgetType",
            "AutoRefresh",
            "ResourceArn",
          ],
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
      description: "Delete a CleanRooms PrivacyBudgetTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms PrivacyBudgetTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CleanRooms::PrivacyBudgetTemplate",
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
      description: "Sync CleanRooms PrivacyBudgetTemplate state from AWS",
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
          existing.PrivacyBudgetTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CleanRooms::PrivacyBudgetTemplate",
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
