// Auto-generated extension model for @swamp/aws/location/map
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
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z+-=._:/]+$"))
    .describe(
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[A-Za-z0-9 _=@:.+-/]*$"))
    .describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
});

const GlobalArgsSchema = z.object({
  Configuration: z.object({
    Style: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
    PoliticalView: z.string().min(3).max(3).regex(new RegExp("^[A-Z]{3}$"))
      .optional(),
    CustomLayers: z.array(
      z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
    ).optional(),
  }),
  Description: z.string().min(0).max(1000).optional(),
  MapName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
  PricingPlan: z.enum(["RequestBasedUsage"]).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Configuration: z.object({
    Style: z.string(),
    PoliticalView: z.string(),
    CustomLayers: z.array(z.string()),
  }).optional(),
  CreateTime: z.string().optional(),
  Description: z.string().optional(),
  MapArn: z.string().optional(),
  MapName: z.string(),
  PricingPlan: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UpdateTime: z.string().optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Configuration: z.object({
    Style: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$"))
      .optional(),
    PoliticalView: z.string().min(3).max(3).regex(new RegExp("^[A-Z]{3}$"))
      .optional(),
    CustomLayers: z.array(
      z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
    ).optional(),
  }).optional(),
  Description: z.string().min(0).max(1000).optional(),
  MapName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$"))
    .optional(),
  PricingPlan: z.enum(["RequestBasedUsage"]).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/location/map",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Location Map resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Location Map",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Location::Map",
          desiredState,
        ) as StateData;
        const instanceName = (result.MapName ?? g.MapName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Location Map",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location Map",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Location::Map",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.MapName ?? context.globalArgs.MapName)?.toString() ??
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
      description: "Update a Location Map",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.MapName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.MapName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Location::Map",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Location::Map",
          identifier,
          currentState,
          desiredState,
          ["Configuration", "MapName"],
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
      description: "Delete a Location Map",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location Map",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Location::Map",
          args.identifier,
        );
        const instanceName = context.globalArgs.MapName?.toString() ??
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
      description: "Sync Location Map state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.MapName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.MapName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Location::Map",
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
