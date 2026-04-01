// Auto-generated extension model for @swamp/aws/iotfleetwise/state-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

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
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$")),
  SignalCatalogArn: z.string(),
  StateTemplateProperties: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ),
  DataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  MetadataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  LastModificationTime: z.string().optional(),
  Name: z.string(),
  Id: z.string().optional(),
  SignalCatalogArn: z.string().optional(),
  StateTemplateProperties: z.array(z.string()).optional(),
  DataExtraDimensions: z.array(z.string()).optional(),
  MetadataExtraDimensions: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$"))
    .optional(),
  SignalCatalogArn: z.string().optional(),
  StateTemplateProperties: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  DataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  MetadataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iotfleetwise/state-template",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTFleetWise StateTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTFleetWise StateTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTFleetWise::StateTemplate",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTFleetWise StateTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise StateTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTFleetWise::StateTemplate",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a IoTFleetWise StateTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTFleetWise::StateTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTFleetWise::StateTemplate",
          identifier,
          currentState,
          desiredState,
          ["Name", "SignalCatalogArn"],
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
      description: "Delete a IoTFleetWise StateTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise StateTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTFleetWise::StateTemplate",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description: "Sync IoTFleetWise StateTemplate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTFleetWise::StateTemplate",
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
