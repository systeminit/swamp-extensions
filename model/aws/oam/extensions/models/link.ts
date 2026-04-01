// Auto-generated extension model for @swamp/aws/oam/link
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

export const LinkFilterSchema = z.object({
  Filter: z.string().min(1).max(2000),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  LabelTemplate: z.string().min(1).max(64).optional(),
  ResourceTypes: z.array(
    z.enum([
      "AWS::CloudWatch::Metric",
      "AWS::Logs::LogGroup",
      "AWS::XRay::Trace",
      "AWS::ApplicationInsights::Application",
      "AWS::InternetMonitor::Monitor",
      "AWS::ApplicationSignals::Service",
      "AWS::ApplicationSignals::ServiceLevelObjective",
    ]),
  ),
  SinkIdentifier: z.string().min(1).max(2048),
  LinkConfiguration: z.object({
    MetricConfiguration: LinkFilterSchema.optional(),
    LogGroupConfiguration: LinkFilterSchema.optional(),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^(?!aws:.*).{0,256}$")),
  ).describe("Tags to apply to the link").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Label: z.string().optional(),
  LabelTemplate: z.string().optional(),
  ResourceTypes: z.array(z.string()).optional(),
  SinkIdentifier: z.string().optional(),
  LinkConfiguration: z.object({
    MetricConfiguration: LinkFilterSchema,
    LogGroupConfiguration: LinkFilterSchema,
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  LabelTemplate: z.string().min(1).max(64).optional(),
  ResourceTypes: z.array(
    z.enum([
      "AWS::CloudWatch::Metric",
      "AWS::Logs::LogGroup",
      "AWS::XRay::Trace",
      "AWS::ApplicationInsights::Application",
      "AWS::InternetMonitor::Monitor",
      "AWS::ApplicationSignals::Service",
      "AWS::ApplicationSignals::ServiceLevelObjective",
    ]),
  ).optional(),
  SinkIdentifier: z.string().min(1).max(2048).optional(),
  LinkConfiguration: z.object({
    MetricConfiguration: LinkFilterSchema.optional(),
    LogGroupConfiguration: LinkFilterSchema.optional(),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^(?!aws:.*).{0,256}$")),
  ).describe("Tags to apply to the link").optional(),
});

export const model = {
  type: "@swamp/aws/oam/link",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Oam Link resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Oam Link",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Oam::Link",
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
      description: "Get a Oam Link",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Oam Link",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Oam::Link",
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
      description: "Update a Oam Link",
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
          "AWS::Oam::Link",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Oam::Link",
          identifier,
          currentState,
          desiredState,
          ["SinkIdentifier", "LabelTemplate"],
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
      description: "Delete a Oam Link",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Oam Link",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Oam::Link",
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
      description: "Sync Oam Link state from AWS",
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
            "AWS::Oam::Link",
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
