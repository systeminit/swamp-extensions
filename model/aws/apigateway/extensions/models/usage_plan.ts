// Auto-generated extension model for @swamp/aws/apigateway/usage-plan
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

export const ThrottleSettingsSchema = z.object({
  BurstLimit: z.number().int().min(0).optional(),
  RateLimit: z.number().min(0).optional(),
});

export const ApiStageSchema = z.object({
  ApiId: z.string().optional(),
  Stage: z.string().optional(),
  Throttle: z.record(z.string(), ThrottleSettingsSchema).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the specified tag key.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ApiStages: z.array(ApiStageSchema).optional(),
  Description: z.string().optional(),
  Quota: z.object({
    Limit: z.number().int().min(0).optional(),
    Offset: z.number().int().min(0).optional(),
    Period: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Throttle: z.object({
    BurstLimit: z.number().int().min(0).optional(),
    RateLimit: z.number().min(0).optional(),
  }).optional(),
  UsagePlanName: z.string().optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  ApiStages: z.array(ApiStageSchema).optional(),
  Description: z.string().optional(),
  Quota: z.object({
    Limit: z.number(),
    Offset: z.number(),
    Period: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Throttle: ThrottleSettingsSchema.optional(),
  UsagePlanName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ApiStages: z.array(ApiStageSchema).optional(),
  Description: z.string().optional(),
  Quota: z.object({
    Limit: z.number().int().min(0).optional(),
    Offset: z.number().int().min(0).optional(),
    Period: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Throttle: z.object({
    BurstLimit: z.number().int().min(0).optional(),
    RateLimit: z.number().min(0).optional(),
  }).optional(),
  UsagePlanName: z.string().optional(),
});

export const model = {
  type: "@swamp/aws/apigateway/usage-plan",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApiGateway UsagePlan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway UsagePlan",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGateway::UsagePlan",
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
      description: "Get a ApiGateway UsagePlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway UsagePlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ApiGateway::UsagePlan",
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
      description: "Update a ApiGateway UsagePlan",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApiGateway::UsagePlan",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGateway::UsagePlan",
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
      description: "Delete a ApiGateway UsagePlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway UsagePlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ApiGateway::UsagePlan",
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
      description: "Sync ApiGateway UsagePlan state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApiGateway::UsagePlan",
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
