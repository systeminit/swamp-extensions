// Auto-generated extension model for @swamp/aws/connect/predefined-attribute
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
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Name: z.string().min(1).max(100).describe(
    "The name of the predefined attribute.",
  ),
  Values: z.object({
    StringList: z.array(z.string().min(1).max(100)).describe(
      "Predefined attribute values of type string list.",
    ).optional(),
  }).describe("The values of a predefined attribute.").optional(),
  Purposes: z.array(z.string().min(1).max(100)).describe(
    "The assigned purposes of the predefined attribute.",
  ).optional(),
  AttributeConfiguration: z.object({
    EnableValueValidationOnAssociation: z.boolean().describe(
      "Enables customers to enforce strict validation on the specific values that this predefined attribute can hold.",
    ).optional(),
    IsReadOnly: z.boolean().describe(
      "Allows the predefined attribute to show up and be managed in the Amazon Connect UI.",
    ).optional(),
  }).describe(
    "Custom metadata associated to a Predefined attribute that controls how the attribute behaves when used by upstream services.",
  ).optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string(),
  Name: z.string(),
  Values: z.object({
    StringList: z.array(z.string()),
  }).optional(),
  Purposes: z.array(z.string()).optional(),
  AttributeConfiguration: z.object({
    EnableValueValidationOnAssociation: z.boolean(),
    IsReadOnly: z.boolean(),
  }).optional(),
  LastModifiedRegion: z.string().optional(),
  LastModifiedTime: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Name: z.string().min(1).max(100).describe(
    "The name of the predefined attribute.",
  ).optional(),
  Values: z.object({
    StringList: z.array(z.string().min(1).max(100)).describe(
      "Predefined attribute values of type string list.",
    ).optional(),
  }).describe("The values of a predefined attribute.").optional(),
  Purposes: z.array(z.string().min(1).max(100)).describe(
    "The assigned purposes of the predefined attribute.",
  ).optional(),
  AttributeConfiguration: z.object({
    EnableValueValidationOnAssociation: z.boolean().describe(
      "Enables customers to enforce strict validation on the specific values that this predefined attribute can hold.",
    ).optional(),
    IsReadOnly: z.boolean().describe(
      "Allows the predefined attribute to show up and be managed in the Amazon Connect UI.",
    ).optional(),
  }).describe(
    "Custom metadata associated to a Predefined attribute that controls how the attribute behaves when used by upstream services.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/connect/predefined-attribute",
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
      description: "Connect PredefinedAttribute resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect PredefinedAttribute",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::PredefinedAttribute",
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
      description: "Get a Connect PredefinedAttribute",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect PredefinedAttribute",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::PredefinedAttribute",
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
      description: "Update a Connect PredefinedAttribute",
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
          existing.InstanceArn?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Connect::PredefinedAttribute",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::PredefinedAttribute",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn", "Name"],
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
      description: "Delete a Connect PredefinedAttribute",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect PredefinedAttribute",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::PredefinedAttribute",
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
      description: "Sync Connect PredefinedAttribute state from AWS",
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
          existing.InstanceArn?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Connect::PredefinedAttribute",
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
