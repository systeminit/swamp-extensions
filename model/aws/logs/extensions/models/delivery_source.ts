// Auto-generated extension model for @swamp/aws/logs/delivery-source
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
  Name: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$")).describe(
    "The unique name of the Log source.",
  ),
  ResourceArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The Amazon Resource Name (ARN) that uniquely identifies this delivery source.",
  ).optional(),
  LogType: z.string().min(1).max(255).regex(new RegExp("[\\w-]*$")).describe(
    "The type of logs being delivered. Only mandatory when the resourceArn could match more than one. In such a case, the error message will contain all the possible options.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery source.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Arn: z.string().optional(),
  ResourceArns: z.array(z.string()).optional(),
  ResourceArn: z.string().optional(),
  Service: z.string().optional(),
  LogType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$")).describe(
    "The unique name of the Log source.",
  ).optional(),
  ResourceArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The Amazon Resource Name (ARN) that uniquely identifies this delivery source.",
  ).optional(),
  LogType: z.string().min(1).max(255).regex(new RegExp("[\\w-]*$")).describe(
    "The type of logs being delivered. Only mandatory when the resourceArn could match more than one. In such a case, the error message will contain all the possible options.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery source.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/logs/delivery-source",
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
      description: "Logs DeliverySource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs DeliverySource",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::DeliverySource",
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
      description: "Get a Logs DeliverySource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs DeliverySource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::DeliverySource",
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
      description: "Update a Logs DeliverySource",
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
          "AWS::Logs::DeliverySource",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::DeliverySource",
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
      description: "Delete a Logs DeliverySource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs DeliverySource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::DeliverySource",
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
      description: "Sync Logs DeliverySource state from AWS",
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
            "AWS::Logs::DeliverySource",
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
