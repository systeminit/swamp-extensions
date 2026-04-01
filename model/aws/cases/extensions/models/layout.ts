// Auto-generated extension model for @swamp/aws/cases/layout
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

export const FieldItemSchema = z.object({
  Id: z.string().min(1).max(500).describe("The unique identifier of a field."),
});

export const FieldGroupSchema = z.object({
  Name: z.string().max(100).describe(
    "A descriptive name for the field group. Helps organize related fields together in the layout interface.",
  ).optional(),
  Fields: z.array(FieldItemSchema).describe(
    "An ordered list of fields to display in this group. The order determines the sequence in which fields appear in the agent interface. Each field is referenced by its unique field ID.",
  ),
});

export const LayoutSectionsSchema = z.object({
  Sections: z.array(z.object({
    FieldGroup: FieldGroupSchema.describe(
      "Consists of a group of fields and associated properties.",
    ).optional(),
  })).describe(
    "Defines the sections within a panel or tab. Contains field groups that organize related fields together.",
  ).optional(),
});

export const BasicLayoutSchema = z.object({
  TopPanel: LayoutSectionsSchema.describe(
    "Sections within a panel or tab of the page layout.",
  ).optional(),
  MoreInfo: LayoutSectionsSchema.describe(
    "Sections within a panel or tab of the page layout.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Content: z.object({
    Basic: BasicLayoutSchema.describe(
      "Defines the field layout for the agent's case interface. Configures which fields appear in the top panel (immediately visible) and More Info tab (expandable section) of the case view, allowing customization of the agent experience.",
    ).optional(),
  }).describe(
    "Defines the layout structure and field organization for the case interface. Specifies which fields appear in the top panel and More Info tab, and their display order.",
  ),
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A descriptive name for the layout. Must be unique within the Cases domain and should clearly indicate the layout's purpose and field organization.",
  ),
  Tags: z.array(TagSchema).describe("The tags that you attach to this layout.")
    .optional(),
});

const StateSchema = z.object({
  Content: z.object({
    Basic: BasicLayoutSchema,
  }).optional(),
  CreatedTime: z.string().optional(),
  DomainId: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  LayoutArn: z.string(),
  LayoutId: z.string().optional(),
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Content: z.object({
    Basic: BasicLayoutSchema.describe(
      "Defines the field layout for the agent's case interface. Configures which fields appear in the top panel (immediately visible) and More Info tab (expandable section) of the case view, allowing customization of the agent experience.",
    ).optional(),
  }).describe(
    "Defines the layout structure and field organization for the case interface. Specifies which fields appear in the top panel and More Info tab, and their display order.",
  ).optional(),
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A descriptive name for the layout. Must be unique within the Cases domain and should clearly indicate the layout's purpose and field organization.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags that you attach to this layout.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/cases/layout",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Cases Layout resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cases Layout",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Cases::Layout",
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
      description: "Get a Cases Layout",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases Layout",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Cases::Layout",
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
      description: "Update a Cases Layout",
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
        const identifier = existing.LayoutArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Cases::Layout",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Cases::Layout",
          identifier,
          currentState,
          desiredState,
          ["DomainId"],
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
      description: "Delete a Cases Layout",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases Layout",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Cases::Layout",
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
      description: "Sync Cases Layout state from AWS",
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
        const identifier = existing.LayoutArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Cases::Layout",
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
