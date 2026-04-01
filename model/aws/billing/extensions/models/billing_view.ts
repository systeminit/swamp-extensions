// Auto-generated extension model for @swamp/aws/billing/billing-view
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
  Key: z.string().min(1).max(128).describe(
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
  DataFilterExpression: z.object({
    Dimensions: z.object({
      Key: z.enum(["LINKED_ACCOUNT"]).optional(),
      Values: z.array(z.string().max(1024).regex(new RegExp("[\\S\\s]*")))
        .optional(),
    }).optional(),
    Tags: z.object({
      Key: z.string().max(1024).regex(new RegExp("[\\S\\s]*")).optional(),
      Values: z.array(z.string().max(1024).regex(new RegExp("[\\S\\s]*")))
        .optional(),
    }).optional(),
    TimeRange: z.object({
      BeginDateInclusive: z.string().describe(
        "The time in ISO 8601 format, UTC time (YYYY-MM-DDTHH:MM:SSZ).",
      ).optional(),
      EndDateInclusive: z.string().describe(
        "The time in ISO 8601 format, UTC time (YYYY-MM-DDTHH:MM:SSZ).",
      ).optional(),
    }).optional(),
  }).optional(),
  Description: z.string().max(1024).optional(),
  Name: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9_\\+=\\.\\-@]+"),
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs associated to the billing view being created.",
  ).optional(),
  SourceViews: z.array(
    z.string().regex(
      new RegExp(
        "arn:aws[a-z-]*:(billing)::[0-9]{12}:billingview/[a-zA-Z0-9_+=.@-]{1,75}",
      ),
    ),
  ).describe("An array of strings that define the billing view's source."),
});

const StateSchema = z.object({
  Arn: z.string(),
  BillingViewType: z.string().optional(),
  DataFilterExpression: z.object({
    Dimensions: z.object({
      Key: z.string(),
      Values: z.array(z.string()),
    }),
    Tags: z.object({
      Key: z.string(),
      Values: z.array(z.string()),
    }),
    TimeRange: z.object({
      BeginDateInclusive: z.string(),
      EndDateInclusive: z.string(),
    }),
  }).optional(),
  CreatedAt: z.number().optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  OwnerAccountId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SourceViews: z.array(z.string()).optional(),
  UpdatedAt: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DataFilterExpression: z.object({
    Dimensions: z.object({
      Key: z.enum(["LINKED_ACCOUNT"]).optional(),
      Values: z.array(z.string().max(1024).regex(new RegExp("[\\S\\s]*")))
        .optional(),
    }).optional(),
    Tags: z.object({
      Key: z.string().max(1024).regex(new RegExp("[\\S\\s]*")).optional(),
      Values: z.array(z.string().max(1024).regex(new RegExp("[\\S\\s]*")))
        .optional(),
    }).optional(),
    TimeRange: z.object({
      BeginDateInclusive: z.string().describe(
        "The time in ISO 8601 format, UTC time (YYYY-MM-DDTHH:MM:SSZ).",
      ).optional(),
      EndDateInclusive: z.string().describe(
        "The time in ISO 8601 format, UTC time (YYYY-MM-DDTHH:MM:SSZ).",
      ).optional(),
    }).optional(),
  }).optional(),
  Description: z.string().max(1024).optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_\\+=\\.\\-@]+"))
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs associated to the billing view being created.",
  ).optional(),
  SourceViews: z.array(
    z.string().regex(
      new RegExp(
        "arn:aws[a-z-]*:(billing)::[0-9]{12}:billingview/[a-zA-Z0-9_+=.@-]{1,75}",
      ),
    ),
  ).describe("An array of strings that define the billing view's source.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/billing/billing-view",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Billing BillingView resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Billing BillingView",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Billing::BillingView",
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
      description: "Get a Billing BillingView",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Billing BillingView",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Billing::BillingView",
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
      description: "Update a Billing BillingView",
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
          "AWS::Billing::BillingView",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Billing::BillingView",
          identifier,
          currentState,
          desiredState,
          ["Description", "Name"],
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
      description: "Delete a Billing BillingView",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Billing BillingView",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Billing::BillingView",
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
      description: "Sync Billing BillingView state from AWS",
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
            "AWS::Billing::BillingView",
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
