// Auto-generated extension model for @swamp/aws/apprunner/observability-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ObservabilityConfigurationName: z.string().min(4).max(32).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9\\-_]{3,31}"),
  ).describe(
    "A name for the observability configuration. When you use it for the first time in an AWS Region, App Runner creates revision number 1 of this name. When you use the same name in subsequent calls, App Runner creates incremental revisions of the configuration.",
  ).optional(),
  TraceConfiguration: z.object({
    Vendor: z.enum(["AWSXRAY"]).describe(
      "The implementation provider chosen for tracing App Runner services.",
    ),
  }).describe(
    "The configuration of the tracing feature within this observability configuration. If you don't specify it, App Runner doesn't enable tracing.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of metadata items that you can associate with your observability configuration resource. A tag is a key-value pair.",
  ).optional(),
});

const StateSchema = z.object({
  ObservabilityConfigurationArn: z.string(),
  ObservabilityConfigurationName: z.string().optional(),
  ObservabilityConfigurationRevision: z.number().optional(),
  Latest: z.boolean().optional(),
  TraceConfiguration: z.object({
    Vendor: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ObservabilityConfigurationName: z.string().min(4).max(32).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9\\-_]{3,31}"),
  ).describe(
    "A name for the observability configuration. When you use it for the first time in an AWS Region, App Runner creates revision number 1 of this name. When you use the same name in subsequent calls, App Runner creates incremental revisions of the configuration.",
  ).optional(),
  TraceConfiguration: z.object({
    Vendor: z.enum(["AWSXRAY"]).describe(
      "The implementation provider chosen for tracing App Runner services.",
    ).optional(),
  }).describe(
    "The configuration of the tracing feature within this observability configuration. If you don't specify it, App Runner doesn't enable tracing.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of metadata items that you can associate with your observability configuration resource. A tag is a key-value pair.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/apprunner/observability-configuration",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppRunner ObservabilityConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppRunner ObservabilityConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppRunner::ObservabilityConfiguration",
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
      description: "Get a AppRunner ObservabilityConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner ObservabilityConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppRunner::ObservabilityConfiguration",
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
    delete: {
      description: "Delete a AppRunner ObservabilityConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner ObservabilityConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppRunner::ObservabilityConfiguration",
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
      description: "Sync AppRunner ObservabilityConfiguration state from AWS",
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
        const identifier = existing.ObservabilityConfigurationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppRunner::ObservabilityConfiguration",
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
