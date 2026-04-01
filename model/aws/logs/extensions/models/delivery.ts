// Auto-generated extension model for @swamp/aws/logs/delivery
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DeliverySourceName: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$"))
    .describe(
      "The name of the delivery source that is associated with this delivery.",
    ),
  DeliveryDestinationArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The ARN of the delivery destination that is associated with this delivery.",
  ),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery.",
  ).optional(),
  RecordFields: z.array(z.string().min(1).max(50)).describe(
    "The list of record fields to be delivered to the destination, in order. If the delivery's log source has mandatory fields, they must be included in this list.",
  ).optional(),
  FieldDelimiter: z.string().min(1).max(5).describe(
    "The field delimiter to use between record fields when the final output format of a delivery is in Plain, W3C, or Raw format.",
  ).optional(),
  S3SuffixPath: z.string().min(0).max(256).describe(
    "This string allows re-configuring the S3 object prefix to contain either static or variable sections. The valid variables to use in the suffix path will vary by each log source. See ConfigurationTemplate$allowedSuffixPathFields for more info on what values are supported in the suffix path for each log source.",
  ).optional(),
  S3EnableHiveCompatiblePath: z.boolean().describe(
    "This parameter causes the S3 objects that contain delivered logs to use a prefix structure that allows for integration with Apache Hive.",
  ).optional(),
});

const StateSchema = z.object({
  DeliveryId: z.string(),
  Arn: z.string().optional(),
  DeliverySourceName: z.string().optional(),
  DeliveryDestinationArn: z.string().optional(),
  DeliveryDestinationType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  RecordFields: z.array(z.string()).optional(),
  FieldDelimiter: z.string().optional(),
  S3SuffixPath: z.string().optional(),
  S3EnableHiveCompatiblePath: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DeliverySourceName: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$"))
    .describe(
      "The name of the delivery source that is associated with this delivery.",
    ).optional(),
  DeliveryDestinationArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The ARN of the delivery destination that is associated with this delivery.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery.",
  ).optional(),
  RecordFields: z.array(z.string().min(1).max(50)).describe(
    "The list of record fields to be delivered to the destination, in order. If the delivery's log source has mandatory fields, they must be included in this list.",
  ).optional(),
  FieldDelimiter: z.string().min(1).max(5).describe(
    "The field delimiter to use between record fields when the final output format of a delivery is in Plain, W3C, or Raw format.",
  ).optional(),
  S3SuffixPath: z.string().min(0).max(256).describe(
    "This string allows re-configuring the S3 object prefix to contain either static or variable sections. The valid variables to use in the suffix path will vary by each log source. See ConfigurationTemplate$allowedSuffixPathFields for more info on what values are supported in the suffix path for each log source.",
  ).optional(),
  S3EnableHiveCompatiblePath: z.boolean().describe(
    "This parameter causes the S3 objects that contain delivered logs to use a prefix structure that allows for integration with Apache Hive.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/logs/delivery",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Logs Delivery resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs Delivery",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::Delivery",
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
      description: "Get a Logs Delivery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Delivery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::Delivery",
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
      description: "Update a Logs Delivery",
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
        const identifier = existing.DeliveryId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::Delivery",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::Delivery",
          identifier,
          currentState,
          desiredState,
          ["DeliverySourceName", "DeliveryDestinationArn"],
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
      description: "Delete a Logs Delivery",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Delivery",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::Delivery",
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
      description: "Sync Logs Delivery state from AWS",
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
        const identifier = existing.DeliveryId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::Delivery",
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
