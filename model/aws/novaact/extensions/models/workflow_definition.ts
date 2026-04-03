// Auto-generated extension model for @swamp/aws/novaact/workflow-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().min(1).max(4000).describe(
    "An optional description of the workflow definition's purpose and functionality.",
  ).optional(),
  ExportConfig: z.object({
    S3BucketName: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][a-z0-9.-]*[a-z0-9]$"),
    ).describe("The name of the Amazon S3 bucket for exporting workflow data."),
    S3KeyPrefix: z.string().min(1).max(100).regex(
      new RegExp("^[a-zA-Z0-9!\\-_.*'()]+(?:/[a-zA-Z0-9!\\-_.*'()]+)*$"),
    ).describe(
      "An optional prefix for Amazon S3 object keys to organize exported data.",
    ).optional(),
  }).describe(
    "Configuration settings for exporting workflow execution data and logs to Amazon S3.",
  ).optional(),
  Name: z.string().min(1).max(40).regex(new RegExp("^[a-zA-Z0-9_-]{1,40}$"))
    .describe(
      "The name of the workflow definition. Must be unique within your account and region.",
    ),
});

const StateSchema = z.object({
  Arn: z.string(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  ExportConfig: z.object({
    S3BucketName: z.string(),
    S3KeyPrefix: z.string(),
  }).optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(1).max(4000).describe(
    "An optional description of the workflow definition's purpose and functionality.",
  ).optional(),
  ExportConfig: z.object({
    S3BucketName: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][a-z0-9.-]*[a-z0-9]$"),
    ).describe("The name of the Amazon S3 bucket for exporting workflow data.")
      .optional(),
    S3KeyPrefix: z.string().min(1).max(100).regex(
      new RegExp("^[a-zA-Z0-9!\\-_.*'()]+(?:/[a-zA-Z0-9!\\-_.*'()]+)*$"),
    ).describe(
      "An optional prefix for Amazon S3 object keys to organize exported data.",
    ).optional(),
  }).describe(
    "Configuration settings for exporting workflow execution data and logs to Amazon S3.",
  ).optional(),
  Name: z.string().min(1).max(40).regex(new RegExp("^[a-zA-Z0-9_-]{1,40}$"))
    .describe(
      "The name of the workflow definition. Must be unique within your account and region.",
    ).optional(),
});

export const model = {
  type: "@swamp/aws/novaact/workflow-definition",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "NovaAct WorkflowDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NovaAct WorkflowDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::NovaAct::WorkflowDefinition",
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
      description: "Get a NovaAct WorkflowDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NovaAct WorkflowDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::NovaAct::WorkflowDefinition",
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
    delete: {
      description: "Delete a NovaAct WorkflowDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NovaAct WorkflowDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::NovaAct::WorkflowDefinition",
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
      description: "Sync NovaAct WorkflowDefinition state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NovaAct::WorkflowDefinition",
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
