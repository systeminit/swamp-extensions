// Auto-generated extension model for @swamp/aws/codeguruprofiler/profiling-group
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

export const ChannelSchema = z.object({
  channelId: z.string().regex(
    new RegExp("[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"),
  ).describe(
    "Unique identifier for each Channel in the notification configuration of a Profiling Group",
  ).optional(),
  channelUri: z.string().regex(
    new RegExp(
      "^arn:aws([-\\w]*):[a-z-]+:(([a-z]+-)+[0-9]+)?:([0-9]{12}):[^.]+$",
    ),
  ).describe(
    "Unique arn of the resource to be used for notifications. We support a valid SNS topic arn as a channel uri.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. The allowed characters across services are: letters, numbers, and spaces representable in UTF-8, and the following characters: + - =. _: / @.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length. The allowed characters across services are: letters, numbers, and spaces representable in UTF-8, and the following characters: + - =. _: / @.",
  ),
});

const GlobalArgsSchema = z.object({
  ProfilingGroupName: z.string().min(1).max(255).regex(new RegExp("^[\\w-]+$"))
    .describe("The name of the profiling group."),
  ComputePlatform: z.enum(["Default", "AWSLambda"]).describe(
    "The compute platform of the profiling group.",
  ).optional(),
  AgentPermissions: z.object({
    Principals: z.array(
      z.string().regex(
        new RegExp("^arn:aws([-\\w]*):iam::([0-9]{12}):[\\S]+$"),
      ),
    ).describe("The principals for the agent permissions."),
  }).describe("The agent permissions attached to this profiling group.")
    .optional(),
  AnomalyDetectionNotificationConfiguration: z.array(ChannelSchema).describe(
    "Configuration for Notification Channels for Anomaly Detection feature in CodeGuru Profiler which enables customers to detect anomalies in the application profile for those methods that represent the highest proportion of CPU time or latency",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with a profiling group.",
  ).optional(),
});

const StateSchema = z.object({
  ProfilingGroupName: z.string(),
  ComputePlatform: z.string().optional(),
  AgentPermissions: z.object({
    Principals: z.array(z.string()),
  }).optional(),
  AnomalyDetectionNotificationConfiguration: z.array(ChannelSchema).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ProfilingGroupName: z.string().min(1).max(255).regex(new RegExp("^[\\w-]+$"))
    .describe("The name of the profiling group.").optional(),
  ComputePlatform: z.enum(["Default", "AWSLambda"]).describe(
    "The compute platform of the profiling group.",
  ).optional(),
  AgentPermissions: z.object({
    Principals: z.array(
      z.string().regex(
        new RegExp("^arn:aws([-\\w]*):iam::([0-9]{12}):[\\S]+$"),
      ),
    ).describe("The principals for the agent permissions.").optional(),
  }).describe("The agent permissions attached to this profiling group.")
    .optional(),
  AnomalyDetectionNotificationConfiguration: z.array(ChannelSchema).describe(
    "Configuration for Notification Channels for Anomaly Detection feature in CodeGuru Profiler which enables customers to detect anomalies in the application profile for those methods that represent the highest proportion of CPU time or latency",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with a profiling group.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/codeguruprofiler/profiling-group",
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
      description: "CodeGuruProfiler ProfilingGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeGuruProfiler ProfilingGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodeGuruProfiler::ProfilingGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ProfilingGroupName ?? g.ProfilingGroupName)?.toString() ??
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
      description: "Get a CodeGuruProfiler ProfilingGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeGuruProfiler ProfilingGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CodeGuruProfiler::ProfilingGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ProfilingGroupName ?? context.globalArgs.ProfilingGroupName)
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
      description: "Update a CodeGuruProfiler ProfilingGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ProfilingGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ProfilingGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CodeGuruProfiler::ProfilingGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodeGuruProfiler::ProfilingGroup",
          identifier,
          currentState,
          desiredState,
          ["ProfilingGroupName", "ComputePlatform"],
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
      description: "Delete a CodeGuruProfiler ProfilingGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeGuruProfiler ProfilingGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CodeGuruProfiler::ProfilingGroup",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.ProfilingGroupName?.toString() ?? args.identifier;
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
      description: "Sync CodeGuruProfiler ProfilingGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ProfilingGroupName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ProfilingGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CodeGuruProfiler::ProfilingGroup",
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
