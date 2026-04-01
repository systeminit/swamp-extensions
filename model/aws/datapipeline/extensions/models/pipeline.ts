// Auto-generated extension model for @swamp/aws/datapipeline/pipeline
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

export const ParameterAttributeSchema = z.object({
  Key: z.string().describe("The field identifier."),
  StringValue: z.string().describe("The field value, expressed as a String."),
});

export const ParameterObjectSchema = z.object({
  Attributes: z.array(ParameterAttributeSchema).describe(
    "The attributes of the parameter object.",
  ),
  Id: z.string().describe("The ID of the parameter object."),
});

export const ParameterValueSchema = z.object({
  Id: z.string().describe("The ID of the parameter value."),
  StringValue: z.string().describe("The field value, expressed as a String."),
});

export const FieldSchema = z.object({
  Key: z.string().describe(
    "Specifies the name of a field for a particular object. To view valid values for a particular field, see Pipeline Object Reference in the AWS Data Pipeline Developer Guide.",
  ),
  RefValue: z.string().describe(
    "A field value that you specify as an identifier of another object in the same pipeline definition.",
  ).optional(),
  StringValue: z.string().describe(
    "A field value that you specify as a string. To view valid values for a particular field, see Pipeline Object Reference in the AWS Data Pipeline Developer Guide.",
  ).optional(),
});

export const PipelineObjectSchema = z.object({
  Fields: z.array(FieldSchema).describe(
    "Key-value pairs that define the properties of the object.",
  ),
  Id: z.string().describe("The ID of the object."),
  Name: z.string().describe("The name of the object."),
});

export const PipelineTagSchema = z.object({
  Key: z.string().describe("The key name of a tag."),
  Value: z.string().describe("The value to associate with the key name."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Activate: z.boolean().describe(
    "Indicates whether to validate and start the pipeline or stop an active pipeline. By default, the value is set to true.",
  ).optional(),
  Description: z.string().describe("A description of the pipeline.").optional(),
  Name: z.string().describe("The name of the pipeline."),
  ParameterObjects: z.array(ParameterObjectSchema).describe(
    "The parameter objects used with the pipeline.",
  ).optional(),
  ParameterValues: z.array(ParameterValueSchema).describe(
    "The parameter values used with the pipeline.",
  ).optional(),
  PipelineObjects: z.array(PipelineObjectSchema).describe(
    "The objects that define the pipeline. These objects overwrite the existing pipeline definition. Not all objects, fields, and values can be updated. For information about restrictions, see Editing Your Pipeline in the AWS Data Pipeline Developer Guide.",
  ).optional(),
  PipelineTags: z.array(PipelineTagSchema).describe(
    "A list of arbitrary tags (key-value pairs) to associate with the pipeline, which you can use to control permissions. For more information, see Controlling Access to Pipelines and Resources in the AWS Data Pipeline Developer Guide.",
  ).optional(),
});

const StateSchema = z.object({
  Activate: z.boolean().optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  ParameterObjects: z.array(ParameterObjectSchema).optional(),
  ParameterValues: z.array(ParameterValueSchema).optional(),
  PipelineObjects: z.array(PipelineObjectSchema).optional(),
  PipelineTags: z.array(PipelineTagSchema).optional(),
  PipelineId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Activate: z.boolean().describe(
    "Indicates whether to validate and start the pipeline or stop an active pipeline. By default, the value is set to true.",
  ).optional(),
  Description: z.string().describe("A description of the pipeline.").optional(),
  Name: z.string().describe("The name of the pipeline.").optional(),
  ParameterObjects: z.array(ParameterObjectSchema).describe(
    "The parameter objects used with the pipeline.",
  ).optional(),
  ParameterValues: z.array(ParameterValueSchema).describe(
    "The parameter values used with the pipeline.",
  ).optional(),
  PipelineObjects: z.array(PipelineObjectSchema).describe(
    "The objects that define the pipeline. These objects overwrite the existing pipeline definition. Not all objects, fields, and values can be updated. For information about restrictions, see Editing Your Pipeline in the AWS Data Pipeline Developer Guide.",
  ).optional(),
  PipelineTags: z.array(PipelineTagSchema).describe(
    "A list of arbitrary tags (key-value pairs) to associate with the pipeline, which you can use to control permissions. For more information, see Controlling Access to Pipelines and Resources in the AWS Data Pipeline Developer Guide.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/datapipeline/pipeline",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataPipeline Pipeline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataPipeline Pipeline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataPipeline::Pipeline",
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
      description: "Get a DataPipeline Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataPipeline Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataPipeline::Pipeline",
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
      description: "Update a DataPipeline Pipeline",
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
        const identifier = existing.PipelineId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataPipeline::Pipeline",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataPipeline::Pipeline",
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
      description: "Delete a DataPipeline Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataPipeline Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataPipeline::Pipeline",
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
      description: "Sync DataPipeline Pipeline state from AWS",
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
        const identifier = existing.PipelineId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataPipeline::Pipeline",
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
