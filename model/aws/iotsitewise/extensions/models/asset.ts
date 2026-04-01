// Auto-generated extension model for @swamp/aws/iotsitewise/asset
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

export const AssetPropertySchema = z.object({
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("Customer provided actual UUID for property").optional(),
  ExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("String-friendly customer provided external ID").optional(),
  LogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).describe("Customer provided ID for property.").optional(),
  Alias: z.string().describe("The property alias that identifies the property.")
    .optional(),
  NotificationState: z.enum(["ENABLED", "DISABLED"]).describe(
    "The MQTT notification state (ENABLED or DISABLED) for this asset property.",
  ).optional(),
  Unit: z.string().describe(
    "The unit of measure (such as Newtons or RPM) of the asset property. If you don't specify a value for this parameter, the service uses the value of the assetModelProperty in the asset model.",
  ).optional(),
});

export const AssetHierarchySchema = z.object({
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("Customer provided actual UUID for property").optional(),
  ExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("String-friendly customer provided external ID").optional(),
  LogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).describe("The LogicalID of a hierarchy in the parent asset's model.")
    .optional(),
  ChildAssetId: z.string().describe(
    "The ID of the child asset to be associated.",
  ),
});

export const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AssetExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the asset").optional(),
  AssetModelId: z.string().describe(
    "The ID of the asset model from which to create the asset.",
  ),
  AssetName: z.string().describe("A unique, friendly name for the asset."),
  AssetDescription: z.string().describe("A description for the asset")
    .optional(),
  AssetProperties: z.array(AssetPropertySchema).optional(),
  AssetHierarchies: z.array(AssetHierarchySchema).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset.",
  ).optional(),
});

const StateSchema = z.object({
  AssetId: z.string(),
  AssetExternalId: z.string().optional(),
  AssetModelId: z.string().optional(),
  AssetArn: z.string().optional(),
  AssetName: z.string().optional(),
  AssetDescription: z.string().optional(),
  AssetProperties: z.array(AssetPropertySchema).optional(),
  AssetHierarchies: z.array(AssetHierarchySchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AssetExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the asset").optional(),
  AssetModelId: z.string().describe(
    "The ID of the asset model from which to create the asset.",
  ).optional(),
  AssetName: z.string().describe("A unique, friendly name for the asset.")
    .optional(),
  AssetDescription: z.string().describe("A description for the asset")
    .optional(),
  AssetProperties: z.array(AssetPropertySchema).optional(),
  AssetHierarchies: z.array(AssetHierarchySchema).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotsitewise/asset",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTSiteWise Asset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTSiteWise Asset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTSiteWise::Asset",
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
      description: "Get a IoTSiteWise Asset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Asset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTSiteWise::Asset",
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
      description: "Update a IoTSiteWise Asset",
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
        const identifier = existing.AssetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTSiteWise::Asset",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTSiteWise::Asset",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a IoTSiteWise Asset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Asset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTSiteWise::Asset",
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
      description: "Sync IoTSiteWise Asset state from AWS",
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
        const identifier = existing.AssetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTSiteWise::Asset",
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
