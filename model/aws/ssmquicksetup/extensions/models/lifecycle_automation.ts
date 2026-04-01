// Auto-generated extension model for @swamp/aws/ssmquicksetup/lifecycle-automation
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
  AutomationDocument: z.string().min(1).max(500).regex(new RegExp("^\\S+$"))
    .describe("The name of the Automation document to execute"),
  AutomationParameters: z.record(z.string(), z.array(z.string())).describe(
    "Parameters to be passed to the Automation Document",
  ),
  ResourceKey: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "A unique identifier used for generating a unique logical ID for the custom resource",
    ),
  Tags: z.record(
    z.string(),
    z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9 +=@_\\/:.-]+$")),
  ).optional(),
});

const StateSchema = z.object({
  AutomationDocument: z.string().optional(),
  AutomationParameters: z.record(z.string(), z.unknown()).optional(),
  ResourceKey: z.string().optional(),
  AssociationId: z.string(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AutomationDocument: z.string().min(1).max(500).regex(new RegExp("^\\S+$"))
    .describe("The name of the Automation document to execute").optional(),
  AutomationParameters: z.record(z.string(), z.array(z.string())).describe(
    "Parameters to be passed to the Automation Document",
  ).optional(),
  ResourceKey: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "A unique identifier used for generating a unique logical ID for the custom resource",
    ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9 +=@_\\/:.-]+$")),
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ssmquicksetup/lifecycle-automation",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSMQuickSetup LifecycleAutomation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSMQuickSetup LifecycleAutomation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSMQuickSetup::LifecycleAutomation",
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
      description: "Get a SSMQuickSetup LifecycleAutomation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMQuickSetup LifecycleAutomation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSMQuickSetup::LifecycleAutomation",
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
      description: "Update a SSMQuickSetup LifecycleAutomation",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSMQuickSetup::LifecycleAutomation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSMQuickSetup::LifecycleAutomation",
          identifier,
          currentState,
          desiredState,
          ["ResourceKey"],
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
      description: "Delete a SSMQuickSetup LifecycleAutomation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSMQuickSetup LifecycleAutomation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSMQuickSetup::LifecycleAutomation",
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
      description: "Sync SSMQuickSetup LifecycleAutomation state from AWS",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSMQuickSetup::LifecycleAutomation",
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
