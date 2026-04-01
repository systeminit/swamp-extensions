// Auto-generated extension model for @swamp/aws/logs/destination
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,.,:, /, =, +, - and @.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,.,:, /, =, +, - and @.",
  ),
});

const GlobalArgsSchema = z.object({
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  DestinationName: z.string().min(1).max(512).regex(
    new RegExp("^[^:*]{1,512}$"),
  ).describe("The name of the destination resource"),
  DestinationPolicy: z.string().min(1).describe(
    "An IAM policy document that governs which AWS accounts can create subscription filters against this destination.",
  ).optional(),
  RoleArn: z.string().min(1).describe(
    "The ARN of an IAM role that permits CloudWatch Logs to send data to the specified AWS resource",
  ),
  TargetArn: z.string().min(1).describe(
    "The ARN of the physical target where the log events are delivered (for example, a Kinesis stream)",
  ),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  DestinationName: z.string(),
  DestinationPolicy: z.string().optional(),
  RoleArn: z.string().optional(),
  TargetArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  DestinationName: z.string().min(1).max(512).regex(
    new RegExp("^[^:*]{1,512}$"),
  ).describe("The name of the destination resource").optional(),
  DestinationPolicy: z.string().min(1).describe(
    "An IAM policy document that governs which AWS accounts can create subscription filters against this destination.",
  ).optional(),
  RoleArn: z.string().min(1).describe(
    "The ARN of an IAM role that permits CloudWatch Logs to send data to the specified AWS resource",
  ).optional(),
  TargetArn: z.string().min(1).describe(
    "The ARN of the physical target where the log events are delivered (for example, a Kinesis stream)",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/logs/destination",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Logs Destination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs Destination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::Destination",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DestinationName ?? g.DestinationName)?.toString() ??
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
      description: "Get a Logs Destination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Destination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::Destination",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DestinationName ?? context.globalArgs.DestinationName)
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
      description: "Update a Logs Destination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DestinationName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DestinationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::Destination",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::Destination",
          identifier,
          currentState,
          desiredState,
          ["DestinationName"],
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
      description: "Delete a Logs Destination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Destination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::Destination",
          args.identifier,
        );
        const instanceName = context.globalArgs.DestinationName?.toString() ??
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
      description: "Sync Logs Destination state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DestinationName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DestinationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::Destination",
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
