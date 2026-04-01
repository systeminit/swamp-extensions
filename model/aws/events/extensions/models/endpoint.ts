// Auto-generated extension model for @swamp/aws/events/endpoint
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

export const PrimarySchema = z.object({
  HealthCheck: z.string().min(1).max(1600).regex(
    new RegExp("^arn:aws([a-z]|\\-)*:route53:::healthcheck/[\\-a-z0-9]+$"),
  ),
});

export const SecondarySchema = z.object({
  Route: z.string().min(9).max(20).regex(new RegExp("^[\\-a-z0-9]+$")),
});

export const FailoverConfigSchema = z.object({
  Primary: PrimarySchema,
  Secondary: SecondarySchema,
});

export const EndpointEventBusSchema = z.object({
  EventBusArn: z.string().min(1).max(512).regex(
    new RegExp(
      "^arn:aws[a-z-]*:events:[a-z]+-[a-z-]+-\\d+:\\d{12}:event-bus/[\\w.-]+$",
    ),
  ),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_A-Za-z0-9]+$"))
    .optional(),
  RoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:aws[a-z-]*:iam::\\d{12}:role\\/[\\w+=,.@/-]+$"),
  ).optional(),
  Description: z.string().max(512).regex(new RegExp(".*")).optional(),
  RoutingConfig: z.object({
    FailoverConfig: FailoverConfigSchema,
  }),
  EventBuses: z.array(EndpointEventBusSchema),
});

const StateSchema = z.object({
  Name: z.string(),
  Arn: z.string().optional(),
  RoleArn: z.string().optional(),
  Description: z.string().optional(),
  RoutingConfig: z.object({
    FailoverConfig: FailoverConfigSchema,
  }).optional(),
  ReplicationConfig: z.object({
    State: z.string(),
  }).optional(),
  EventBuses: z.array(EndpointEventBusSchema).optional(),
  EndpointId: z.string().optional(),
  EndpointUrl: z.string().optional(),
  State: z.string().optional(),
  StateReason: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_A-Za-z0-9]+$"))
    .optional(),
  RoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:aws[a-z-]*:iam::\\d{12}:role\\/[\\w+=,.@/-]+$"),
  ).optional(),
  Description: z.string().max(512).regex(new RegExp(".*")).optional(),
  RoutingConfig: z.object({
    FailoverConfig: FailoverConfigSchema.optional(),
  }).optional(),
  EventBuses: z.array(EndpointEventBusSchema).optional(),
});

export const model = {
  type: "@swamp/aws/events/endpoint",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Events Endpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Events Endpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Events::Endpoint",
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
      description: "Get a Events Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Events::Endpoint",
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
      description: "Update a Events Endpoint",
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
          "AWS::Events::Endpoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Events::Endpoint",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Events Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Events::Endpoint",
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
      description: "Sync Events Endpoint state from AWS",
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
            "AWS::Events::Endpoint",
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
