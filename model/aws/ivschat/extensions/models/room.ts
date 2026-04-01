// Auto-generated extension model for @swamp/aws/ivschat/room
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("The name of the room. The value does not need to be unique.")
    .optional(),
  LoggingConfigurationIdentifiers: z.array(
    z.string().min(1).max(128).regex(
      new RegExp(
        "^arn:aws:ivschat:[a-z0-9-]+:[0-9]+:logging-configuration/[a-zA-Z0-9-]+$",
      ),
    ),
  ).describe("Array of logging configuration identifiers attached to the room.")
    .optional(),
  MaximumMessageLength: z.number().int().min(1).max(500).describe(
    "The maximum number of characters in a single message.",
  ).optional(),
  MaximumMessageRatePerSecond: z.number().int().min(1).max(10).describe(
    "The maximum number of messages per second that can be sent to the room.",
  ).optional(),
  MessageReviewHandler: z.object({
    FallbackResult: z.enum(["ALLOW", "DENY"]).describe(
      "Specifies the fallback behavior if the handler does not return a valid response, encounters an error, or times out.",
    ).optional(),
    Uri: z.string().min(0).max(170).regex(
      new RegExp("^$|^arn:aws:lambda:[a-z0-9-]+:[0-9]{12}:function:.+"),
    ).describe("Identifier of the message review handler.").optional(),
  }).describe("Configuration information for optional review of messages.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  LoggingConfigurationIdentifiers: z.array(z.string()).optional(),
  MaximumMessageLength: z.number().optional(),
  MaximumMessageRatePerSecond: z.number().optional(),
  MessageReviewHandler: z.object({
    FallbackResult: z.string(),
    Uri: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("The name of the room. The value does not need to be unique.")
    .optional(),
  LoggingConfigurationIdentifiers: z.array(
    z.string().min(1).max(128).regex(
      new RegExp(
        "^arn:aws:ivschat:[a-z0-9-]+:[0-9]+:logging-configuration/[a-zA-Z0-9-]+$",
      ),
    ),
  ).describe("Array of logging configuration identifiers attached to the room.")
    .optional(),
  MaximumMessageLength: z.number().int().min(1).max(500).describe(
    "The maximum number of characters in a single message.",
  ).optional(),
  MaximumMessageRatePerSecond: z.number().int().min(1).max(10).describe(
    "The maximum number of messages per second that can be sent to the room.",
  ).optional(),
  MessageReviewHandler: z.object({
    FallbackResult: z.enum(["ALLOW", "DENY"]).describe(
      "Specifies the fallback behavior if the handler does not return a valid response, encounters an error, or times out.",
    ).optional(),
    Uri: z.string().min(0).max(170).regex(
      new RegExp("^$|^arn:aws:lambda:[a-z0-9-]+:[0-9]{12}:function:.+"),
    ).describe("Identifier of the message review handler.").optional(),
  }).describe("Configuration information for optional review of messages.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ivschat/room",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IVSChat Room resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IVSChat Room",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IVSChat::Room",
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
      description: "Get a IVSChat Room",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVSChat Room",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IVSChat::Room",
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
      description: "Update a IVSChat Room",
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
          "AWS::IVSChat::Room",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IVSChat::Room",
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
      description: "Delete a IVSChat Room",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVSChat Room",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IVSChat::Room",
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
      description: "Sync IVSChat Room state from AWS",
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
            "AWS::IVSChat::Room",
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
