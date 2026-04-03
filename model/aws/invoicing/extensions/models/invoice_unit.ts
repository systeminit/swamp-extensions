// Auto-generated extension model for @swamp/aws/invoicing/invoice-unit
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

export const ResourceTagSchema = z.object({
  Key: z.string().min(1).max(256),
  Value: z.string().min(0).max(200),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  InvoiceReceiver: z.string().min(12).max(12).regex(new RegExp("^\\d{12}$")),
  Name: z.string().min(1).max(50).regex(
    new RegExp("^(?! )[\\p{L}\\p{N}\\p{Z}\\-_]*(?<! )$"),
  ),
  Description: z.string().min(0).max(500).regex(new RegExp("^[\\S\\s]*$"))
    .optional(),
  TaxInheritanceDisabled: z.boolean().optional(),
  Rule: z.object({
    LinkedAccounts: z.array(
      z.string().min(12).max(12).regex(new RegExp("^\\d{12}$")),
    ),
  }),
  ResourceTags: z.array(ResourceTagSchema).optional(),
});

const StateSchema = z.object({
  InvoiceUnitArn: z.string(),
  InvoiceReceiver: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  TaxInheritanceDisabled: z.boolean().optional(),
  Rule: z.object({
    LinkedAccounts: z.array(z.string()),
  }).optional(),
  LastModified: z.number().optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InvoiceReceiver: z.string().min(12).max(12).regex(new RegExp("^\\d{12}$"))
    .optional(),
  Name: z.string().min(1).max(50).regex(
    new RegExp("^(?! )[\\p{L}\\p{N}\\p{Z}\\-_]*(?<! )$"),
  ).optional(),
  Description: z.string().min(0).max(500).regex(new RegExp("^[\\S\\s]*$"))
    .optional(),
  TaxInheritanceDisabled: z.boolean().optional(),
  Rule: z.object({
    LinkedAccounts: z.array(
      z.string().min(12).max(12).regex(new RegExp("^\\d{12}$")),
    ).optional(),
  }).optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/invoicing/invoice-unit",
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
      description: "Invoicing InvoiceUnit resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Invoicing InvoiceUnit",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Invoicing::InvoiceUnit",
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
      description: "Get a Invoicing InvoiceUnit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Invoicing InvoiceUnit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Invoicing::InvoiceUnit",
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
      description: "Update a Invoicing InvoiceUnit",
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
        const identifier = existing.InvoiceUnitArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Invoicing::InvoiceUnit",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Invoicing::InvoiceUnit",
          identifier,
          currentState,
          desiredState,
          ["InvoiceReceiver", "Name"],
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
      description: "Delete a Invoicing InvoiceUnit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Invoicing InvoiceUnit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Invoicing::InvoiceUnit",
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
      description: "Sync Invoicing InvoiceUnit state from AWS",
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
        const identifier = existing.InvoiceUnitArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Invoicing::InvoiceUnit",
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
