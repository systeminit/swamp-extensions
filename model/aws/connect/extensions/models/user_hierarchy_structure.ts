// Auto-generated extension model for @swamp/aws/connect/user-hierarchy-structure
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

export const LevelOneSchema = z.object({
  HierarchyLevelArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group-level/[-0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the hierarchy level.")
    .optional(),
  HierarchyLevelId: z.string().describe(
    "The identifier of the hierarchy level.",
  ).optional(),
  Name: z.string().describe("The name of the hierarchy level."),
});

export const LevelTwoSchema = z.object({
  HierarchyLevelArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group-level/[-0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the hierarchy level.")
    .optional(),
  HierarchyLevelId: z.string().describe(
    "The identifier of the hierarchy level.",
  ).optional(),
  Name: z.string().describe("The name of the hierarchy level."),
});

export const LevelThreeSchema = z.object({
  HierarchyLevelArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group-level/[-0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the hierarchy level.")
    .optional(),
  HierarchyLevelId: z.string().describe(
    "The identifier of the hierarchy level.",
  ).optional(),
  Name: z.string().describe("The name of the hierarchy level."),
});

export const LevelFourSchema = z.object({
  HierarchyLevelArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group-level/[-0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the hierarchy level.")
    .optional(),
  HierarchyLevelId: z.string().describe(
    "The identifier of the hierarchy level.",
  ).optional(),
  Name: z.string().describe("The name of the hierarchy level."),
});

export const LevelFiveSchema = z.object({
  HierarchyLevelArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent-group-level/[-0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the hierarchy level.")
    .optional(),
  HierarchyLevelId: z.string().describe(
    "The identifier of the hierarchy level.",
  ).optional(),
  Name: z.string().describe("The name of the hierarchy level."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  UserHierarchyStructure: z.object({
    LevelOne: LevelOneSchema.describe("Information about level one.")
      .optional(),
    LevelTwo: LevelTwoSchema.describe("Information about level two.")
      .optional(),
    LevelThree: LevelThreeSchema.describe("Information about level three.")
      .optional(),
    LevelFour: LevelFourSchema.describe("Information about level four.")
      .optional(),
    LevelFive: LevelFiveSchema.describe("Information about level five.")
      .optional(),
  }).describe("Information about the hierarchy structure.").optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string().optional(),
  UserHierarchyStructureArn: z.string(),
  UserHierarchyStructure: z.object({
    LevelOne: LevelOneSchema,
    LevelTwo: LevelTwoSchema,
    LevelThree: LevelThreeSchema,
    LevelFour: LevelFourSchema,
    LevelFive: LevelFiveSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  UserHierarchyStructure: z.object({
    LevelOne: LevelOneSchema.describe("Information about level one.")
      .optional(),
    LevelTwo: LevelTwoSchema.describe("Information about level two.")
      .optional(),
    LevelThree: LevelThreeSchema.describe("Information about level three.")
      .optional(),
    LevelFour: LevelFourSchema.describe("Information about level four.")
      .optional(),
    LevelFive: LevelFiveSchema.describe("Information about level five.")
      .optional(),
  }).describe("Information about the hierarchy structure.").optional(),
});

export const model = {
  type: "@swamp/aws/connect/user-hierarchy-structure",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect UserHierarchyStructure resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect UserHierarchyStructure",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::UserHierarchyStructure",
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
      description: "Get a Connect UserHierarchyStructure",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect UserHierarchyStructure",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::UserHierarchyStructure",
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
      description: "Update a Connect UserHierarchyStructure",
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
        const identifier = existing.UserHierarchyStructureArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::UserHierarchyStructure",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::UserHierarchyStructure",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn"],
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
      description: "Delete a Connect UserHierarchyStructure",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect UserHierarchyStructure",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::UserHierarchyStructure",
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
      description: "Sync Connect UserHierarchyStructure state from AWS",
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
        const identifier = existing.UserHierarchyStructureArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::UserHierarchyStructure",
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
