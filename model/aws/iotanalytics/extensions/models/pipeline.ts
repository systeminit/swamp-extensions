// Auto-generated extension model for @swamp/aws/iotanalytics/pipeline
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

export const SelectAttributesSchema = z.object({
  Next: z.string().min(1).max(128).optional(),
  Attributes: z.array(z.string().min(1).max(256)),
  Name: z.string().min(1).max(128),
});

export const DatastoreSchema = z.object({
  DatastoreName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+")),
  Name: z.string().min(1).max(128),
});

export const FilterSchema = z.object({
  Filter: z.string().min(1).max(256),
  Next: z.string().min(1).max(128).optional(),
  Name: z.string().min(1).max(128),
});

export const AddAttributesSchema = z.object({
  Next: z.string().min(1).max(128).optional(),
  Attributes: z.record(z.string(), z.string().min(1).max(256)),
  Name: z.string().min(1).max(128),
});

export const ChannelSchema = z.object({
  ChannelName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+")),
  Next: z.string().min(1).max(128).optional(),
  Name: z.string().min(1).max(128),
});

export const DeviceShadowEnrichSchema = z.object({
  Attribute: z.string().min(1).max(256),
  Next: z.string().min(1).max(128).optional(),
  ThingName: z.string().min(1).max(256),
  RoleArn: z.string().min(20).max(2048),
  Name: z.string().min(1).max(128),
});

export const MathSchema = z.object({
  Attribute: z.string().min(1).max(256),
  Next: z.string().min(1).max(128).optional(),
  Math: z.string().min(1).max(256),
  Name: z.string().min(1).max(128),
});

export const LambdaSchema = z.object({
  BatchSize: z.number().int().min(1).max(1000),
  Next: z.string().min(1).max(128).optional(),
  LambdaName: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9_-]+")),
  Name: z.string().min(1).max(128),
});

export const DeviceRegistryEnrichSchema = z.object({
  Attribute: z.string().min(1).max(256),
  Next: z.string().min(1).max(128).optional(),
  ThingName: z.string().min(1).max(256),
  RoleArn: z.string().min(20).max(2048),
  Name: z.string().min(1).max(128),
});

export const RemoveAttributesSchema = z.object({
  Next: z.string().min(1).max(128).optional(),
  Attributes: z.array(z.string().min(1).max(256)),
  Name: z.string().min(1).max(128),
});

export const ActivitySchema = z.object({
  SelectAttributes: SelectAttributesSchema.optional(),
  Datastore: DatastoreSchema.optional(),
  Filter: FilterSchema.optional(),
  AddAttributes: AddAttributesSchema.optional(),
  Channel: ChannelSchema.optional(),
  DeviceShadowEnrich: DeviceShadowEnrichSchema.optional(),
  Math: MathSchema.optional(),
  Lambda: LambdaSchema.optional(),
  DeviceRegistryEnrich: DeviceRegistryEnrichSchema.optional(),
  RemoveAttributes: RemoveAttributesSchema.optional(),
});

const GlobalArgsSchema = z.object({
  PipelineName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  PipelineActivities: z.array(ActivitySchema),
});

const StateSchema = z.object({
  Id: z.string().optional(),
  PipelineName: z.string(),
  Tags: z.array(TagSchema).optional(),
  PipelineActivities: z.array(ActivitySchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  PipelineName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  PipelineActivities: z.array(ActivitySchema).optional(),
});

export const model = {
  type: "@swamp/aws/iotanalytics/pipeline",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTAnalytics Pipeline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTAnalytics Pipeline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTAnalytics::Pipeline",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.PipelineName ?? g.PipelineName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTAnalytics Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTAnalytics::Pipeline",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.PipelineName ?? context.globalArgs.PipelineName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoTAnalytics Pipeline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.PipelineName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PipelineName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTAnalytics::Pipeline",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTAnalytics::Pipeline",
          identifier,
          currentState,
          desiredState,
          ["PipelineName"],
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
      description: "Delete a IoTAnalytics Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTAnalytics::Pipeline",
          args.identifier,
        );
        const instanceName = context.globalArgs.PipelineName?.toString() ??
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
      description: "Sync IoTAnalytics Pipeline state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.PipelineName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PipelineName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTAnalytics::Pipeline",
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
