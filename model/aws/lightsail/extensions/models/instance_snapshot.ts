// Auto-generated extension model for @swamp/aws/lightsail/instance-snapshot
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
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  InstanceSnapshotName: z.string().describe("The name of the snapshot."),
  InstanceName: z.string().describe(
    "The instance from which the snapshot was created.",
  ),
  Location: z.object({
    AvailabilityZone: z.string().describe(
      "The Availability Zone. Follows the format us-east-2a (case-sensitive).",
    ).optional(),
    RegionName: z.string().describe("The AWS Region name.").optional(),
  }).describe(
    "The region name and Availability Zone where you created the snapshot.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  InstanceSnapshotName: z.string(),
  Arn: z.string().optional(),
  InstanceName: z.string().optional(),
  ResourceType: z.string().optional(),
  State: z.string().optional(),
  FromInstanceName: z.string().optional(),
  FromInstanceArn: z.string().optional(),
  SizeInGb: z.number().optional(),
  IsFromAutoSnapshot: z.boolean().optional(),
  SupportCode: z.string().optional(),
  Location: z.object({
    AvailabilityZone: z.string(),
    RegionName: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  InstanceSnapshotName: z.string().describe("The name of the snapshot.")
    .optional(),
  InstanceName: z.string().describe(
    "The instance from which the snapshot was created.",
  ).optional(),
  Location: z.object({
    AvailabilityZone: z.string().describe(
      "The Availability Zone. Follows the format us-east-2a (case-sensitive).",
    ).optional(),
    RegionName: z.string().describe("The AWS Region name.").optional(),
  }).describe(
    "The region name and Availability Zone where you created the snapshot.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/lightsail/instance-snapshot",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lightsail InstanceSnapshot resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail InstanceSnapshot",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lightsail::InstanceSnapshot",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.InstanceSnapshotName ?? g.InstanceSnapshotName)?.toString() ??
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
      description: "Get a Lightsail InstanceSnapshot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail InstanceSnapshot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lightsail::InstanceSnapshot",
          args.identifier,
        ) as StateData;
        const instanceName = (result.InstanceSnapshotName ??
          context.globalArgs.InstanceSnapshotName)?.toString() ??
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
      description: "Update a Lightsail InstanceSnapshot",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.InstanceSnapshotName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.InstanceSnapshotName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::InstanceSnapshot",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::InstanceSnapshot",
          identifier,
          currentState,
          desiredState,
          ["InstanceSnapshotName", "InstanceName"],
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
      description: "Delete a Lightsail InstanceSnapshot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail InstanceSnapshot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lightsail::InstanceSnapshot",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.InstanceSnapshotName?.toString() ??
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
      description: "Sync Lightsail InstanceSnapshot state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.InstanceSnapshotName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.InstanceSnapshotName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::InstanceSnapshot",
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
