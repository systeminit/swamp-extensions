// Auto-generated extension model for @swamp/aws/amplifyuibuilder/form
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

export const FormButtonSchema = z.object({
  Excluded: z.boolean().optional(),
  Children: z.string().optional(),
  Position: z.object({
    Fixed: z.enum(["first"]).optional(),
    RightOf: z.string().optional(),
    Below: z.string().optional(),
  }).optional(),
});

export const SectionalElementSchema = z.object({
  Type: z.string(),
  Position: z.object({
    Fixed: z.enum(["first"]).optional(),
    RightOf: z.string().optional(),
    Below: z.string().optional(),
  }).optional(),
  Text: z.string().optional(),
  Level: z.number().optional(),
  Orientation: z.string().optional(),
  Excluded: z.boolean().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AppId: z.string().optional(),
  Cta: z.object({
    Position: z.enum(["top", "bottom", "top_and_bottom"]).optional(),
    Clear: FormButtonSchema.optional(),
    Cancel: FormButtonSchema.optional(),
    Submit: FormButtonSchema.optional(),
  }).optional(),
  DataType: z.object({
    DataSourceType: z.enum(["DataStore", "Custom"]),
    DataTypeName: z.string(),
  }).optional(),
  EnvironmentName: z.string().optional(),
  FormActionType: z.enum(["create", "update"]).optional(),
  LabelDecorator: z.enum(["required", "optional", "none"]).optional(),
  Name: z.string().min(1).max(255).optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), SectionalElementSchema).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    VerticalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    OuterPadding: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

const StateSchema = z.object({
  AppId: z.string(),
  Cta: z.object({
    Position: z.string(),
    Clear: FormButtonSchema,
    Cancel: FormButtonSchema,
    Submit: FormButtonSchema,
  }).optional(),
  DataType: z.object({
    DataSourceType: z.string(),
    DataTypeName: z.string(),
  }).optional(),
  EnvironmentName: z.string(),
  FormActionType: z.string().optional(),
  Id: z.string(),
  LabelDecorator: z.string().optional(),
  Name: z.string().optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), z.unknown()).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
    VerticalGap: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
    OuterPadding: z.object({
      TokenReference: z.string(),
      Value: z.string(),
    }),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AppId: z.string().optional(),
  Cta: z.object({
    Position: z.enum(["top", "bottom", "top_and_bottom"]).optional(),
    Clear: FormButtonSchema.optional(),
    Cancel: FormButtonSchema.optional(),
    Submit: FormButtonSchema.optional(),
  }).optional(),
  DataType: z.object({
    DataSourceType: z.enum(["DataStore", "Custom"]).optional(),
    DataTypeName: z.string().optional(),
  }).optional(),
  EnvironmentName: z.string().optional(),
  FormActionType: z.enum(["create", "update"]).optional(),
  LabelDecorator: z.enum(["required", "optional", "none"]).optional(),
  Name: z.string().min(1).max(255).optional(),
  SchemaVersion: z.string().optional(),
  SectionalElements: z.record(z.string(), SectionalElementSchema).optional(),
  Style: z.object({
    HorizontalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    VerticalGap: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
    OuterPadding: z.object({
      TokenReference: z.string().optional(),
      Value: z.string().optional(),
    }).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

export const model = {
  type: "@swamp/aws/amplifyuibuilder/form",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AmplifyUIBuilder Form resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AmplifyUIBuilder Form",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Get a AmplifyUIBuilder Form",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Form",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Update a AmplifyUIBuilder Form",
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
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::AmplifyUIBuilder::Form",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AmplifyUIBuilder::Form",
          identifier,
          currentState,
          desiredState,
          ["AppId", "EnvironmentName"],
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
      description: "Delete a AmplifyUIBuilder Form",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AmplifyUIBuilder Form",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AmplifyUIBuilder::Form",
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
      description: "Sync AmplifyUIBuilder Form state from AWS",
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
          existing.AppId?.toString(),
          existing.EnvironmentName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AmplifyUIBuilder::Form",
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
