// Auto-generated extension model for @swamp/aws/connect/contact-flow-module-alias
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
  ContactFlowModuleId: z.string().min(1).max(500).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]+:[0-9]{12}:instance/[-a-zA-Z0-9]+/flow-module/[-a-zA-Z0-9]+$",
    ),
  ).describe(
    "The identifier of the contact flow module (ARN) this alias is tied to.",
  ),
  ContactFlowModuleVersion: z.number().int().min(1).describe(
    "The version number of the contact flow module this alias points to.",
  ),
  Name: z.string().min(1).max(127).regex(new RegExp("^([$0-9a-zA-Z][_-]?)+$"))
    .describe("The name of the alias."),
  Description: z.string().min(0).max(500).describe(
    "The description of the alias.",
  ).optional(),
});

const StateSchema = z.object({
  ContactFlowModuleAliasARN: z.string(),
  AliasId: z.string().optional(),
  ContactFlowModuleId: z.string().optional(),
  ContactFlowModuleVersion: z.number().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ContactFlowModuleId: z.string().min(1).max(500).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]+:[0-9]{12}:instance/[-a-zA-Z0-9]+/flow-module/[-a-zA-Z0-9]+$",
    ),
  ).describe(
    "The identifier of the contact flow module (ARN) this alias is tied to.",
  ).optional(),
  ContactFlowModuleVersion: z.number().int().min(1).describe(
    "The version number of the contact flow module this alias points to.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(new RegExp("^([$0-9a-zA-Z][_-]?)+$"))
    .describe("The name of the alias.").optional(),
  Description: z.string().min(0).max(500).describe(
    "The description of the alias.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/connect/contact-flow-module-alias",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect ContactFlowModuleAlias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect ContactFlowModuleAlias",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::ContactFlowModuleAlias",
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
      description: "Get a Connect ContactFlowModuleAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect ContactFlowModuleAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::ContactFlowModuleAlias",
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
      description: "Update a Connect ContactFlowModuleAlias",
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
        const identifier = existing.ContactFlowModuleAliasARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::ContactFlowModuleAlias",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::ContactFlowModuleAlias",
          identifier,
          currentState,
          desiredState,
          ["ContactFlowModuleId"],
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
      description: "Delete a Connect ContactFlowModuleAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect ContactFlowModuleAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::ContactFlowModuleAlias",
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
      description: "Sync Connect ContactFlowModuleAlias state from AWS",
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
        const identifier = existing.ContactFlowModuleAliasARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::ContactFlowModuleAlias",
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
