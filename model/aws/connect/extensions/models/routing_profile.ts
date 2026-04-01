// Auto-generated extension model for @swamp/aws/connect/routing-profile
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

export const CrossChannelBehaviorSchema = z.object({
  BehaviorType: z.enum(["ROUTE_CURRENT_CHANNEL_ONLY", "ROUTE_ANY_CHANNEL"])
    .describe(
      "Specifies the other channels that can be routed to an agent handling their current channel.",
    ),
});

export const MediaConcurrencySchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  Concurrency: z.number().int().min(1).max(10).describe(
    "The number of contacts an agent can have on a channel simultaneously.",
  ),
  CrossChannelBehavior: CrossChannelBehaviorSchema.describe(
    "Defines the cross-channel routing behavior that allows an agent working on a contact in one channel to be offered a contact from a different channel.",
  ).optional(),
});

export const RoutingProfileQueueReferenceSchema = z.object({
  Channel: z.enum(["VOICE", "CHAT", "TASK", "EMAIL"]).describe(
    "The channels that agents can handle in the Contact Control Panel (CCP).",
  ),
  QueueArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/queue/[-a-zA-Z0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) for the queue."),
});

export const RoutingProfileQueueConfigSchema = z.object({
  Delay: z.number().int().min(0).max(9999).describe(
    "The delay, in seconds, a contact should wait in the queue before they are routed to an available agent.",
  ),
  Priority: z.number().int().min(1).max(99).describe(
    "The order in which contacts are to be handled for the queue.",
  ),
  QueueReference: RoutingProfileQueueReferenceSchema.describe(
    "Contains the channel and queue identifier for a routing profile.",
  ),
});

export const RoutingProfileManualAssignmentQueueConfigSchema = z.object({
  QueueReference: RoutingProfileQueueReferenceSchema.describe(
    "Contains the channel and queue identifier for a routing profile.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Name: z.string().min(1).max(127).describe("The name of the routing profile."),
  Description: z.string().min(1).max(250).describe(
    "The description of the routing profile.",
  ),
  MediaConcurrencies: z.array(MediaConcurrencySchema).describe(
    "The channels agents can handle in the Contact Control Panel (CCP) for this routing profile.",
  ),
  DefaultOutboundQueueArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/queue/[-a-zA-Z0-9]*$",
    ),
  ).describe(
    "The identifier of the default outbound queue for this routing profile.",
  ),
  QueueConfigs: z.array(RoutingProfileQueueConfigSchema).describe(
    "The queues to associate with this routing profile.",
  ).optional(),
  ManualAssignmentQueueConfigs: z.array(
    RoutingProfileManualAssignmentQueueConfigSchema,
  ).describe(
    "The manual assignment queues to associate with this routing profile.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AgentAvailabilityTimer: z.enum([
    "TIME_SINCE_LAST_ACTIVITY",
    "TIME_SINCE_LAST_INBOUND",
  ]).describe(
    "Whether agents with this routing profile will have their routing order calculated based on longest idle time or time since their last inbound contact.",
  ).optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  MediaConcurrencies: z.array(MediaConcurrencySchema).optional(),
  DefaultOutboundQueueArn: z.string().optional(),
  RoutingProfileArn: z.string(),
  QueueConfigs: z.array(RoutingProfileQueueConfigSchema).optional(),
  ManualAssignmentQueueConfigs: z.array(
    RoutingProfileManualAssignmentQueueConfigSchema,
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  AgentAvailabilityTimer: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Name: z.string().min(1).max(127).describe("The name of the routing profile.")
    .optional(),
  Description: z.string().min(1).max(250).describe(
    "The description of the routing profile.",
  ).optional(),
  MediaConcurrencies: z.array(MediaConcurrencySchema).describe(
    "The channels agents can handle in the Contact Control Panel (CCP) for this routing profile.",
  ).optional(),
  DefaultOutboundQueueArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/queue/[-a-zA-Z0-9]*$",
    ),
  ).describe(
    "The identifier of the default outbound queue for this routing profile.",
  ).optional(),
  QueueConfigs: z.array(RoutingProfileQueueConfigSchema).describe(
    "The queues to associate with this routing profile.",
  ).optional(),
  ManualAssignmentQueueConfigs: z.array(
    RoutingProfileManualAssignmentQueueConfigSchema,
  ).describe(
    "The manual assignment queues to associate with this routing profile.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AgentAvailabilityTimer: z.enum([
    "TIME_SINCE_LAST_ACTIVITY",
    "TIME_SINCE_LAST_INBOUND",
  ]).describe(
    "Whether agents with this routing profile will have their routing order calculated based on longest idle time or time since their last inbound contact.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/connect/routing-profile",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect RoutingProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect RoutingProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::RoutingProfile",
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
      description: "Get a Connect RoutingProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect RoutingProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::RoutingProfile",
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
      description: "Update a Connect RoutingProfile",
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
        const identifier = existing.RoutingProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::RoutingProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::RoutingProfile",
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
      description: "Delete a Connect RoutingProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect RoutingProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::RoutingProfile",
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
      description: "Sync Connect RoutingProfile state from AWS",
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
        const identifier = existing.RoutingProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::RoutingProfile",
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
