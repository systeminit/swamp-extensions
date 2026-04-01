// Auto-generated extension model for @swamp/aws/pcs/queue
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

export const ComputeNodeGroupConfigurationSchema = z.object({
  ComputeNodeGroupId: z.string().describe(
    "The compute node group ID for the compute node group configuration.",
  ).optional(),
});

export const SlurmCustomSettingSchema = z.object({
  ParameterName: z.string().describe(
    "AWS PCS supports configuration of the Slurm parameters for queues:.",
  ),
  ParameterValue: z.string().describe(
    "The value for the configured Slurm setting.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ClusterId: z.string().describe("The ID of the cluster of the queue."),
  ComputeNodeGroupConfigurations: z.array(ComputeNodeGroupConfigurationSchema)
    .describe(
      "The list of compute node group configurations associated with the queue. Queues assign jobs to associated compute node groups.",
    ).optional(),
  Name: z.string().describe("The name that identifies the queue.").optional(),
  SlurmConfiguration: z.object({
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema).describe(
      "Custom Slurm parameters that directly map to Slurm configuration settings.",
    ).optional(),
  }).describe("The Slurm configuration for the queue.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "1 or more tags added to the resource. Each tag consists of a tag key and tag value. The tag value is optional and can be an empty string.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ClusterId: z.string().optional(),
  ComputeNodeGroupConfigurations: z.array(ComputeNodeGroupConfigurationSchema)
    .optional(),
  ErrorInfo: z.array(z.object({
    Code: z.string(),
    Message: z.string(),
  })).optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  SlurmConfiguration: z.object({
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema),
  }).optional(),
  Status: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ClusterId: z.string().describe("The ID of the cluster of the queue.")
    .optional(),
  ComputeNodeGroupConfigurations: z.array(ComputeNodeGroupConfigurationSchema)
    .describe(
      "The list of compute node group configurations associated with the queue. Queues assign jobs to associated compute node groups.",
    ).optional(),
  Name: z.string().describe("The name that identifies the queue.").optional(),
  SlurmConfiguration: z.object({
    SlurmCustomSettings: z.array(SlurmCustomSettingSchema).describe(
      "Custom Slurm parameters that directly map to Slurm configuration settings.",
    ).optional(),
  }).describe("The Slurm configuration for the queue.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "1 or more tags added to the resource. Each tag consists of a tag key and tag value. The tag value is optional and can be an empty string.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/pcs/queue",
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
      description: "PCS Queue resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a PCS Queue",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::PCS::Queue",
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
      description: "Get a PCS Queue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCS Queue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::PCS::Queue",
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
      description: "Update a PCS Queue",
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
          "AWS::PCS::Queue",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::PCS::Queue",
          identifier,
          currentState,
          desiredState,
          ["Name", "ClusterId"],
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
      description: "Delete a PCS Queue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the PCS Queue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::PCS::Queue",
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
      description: "Sync PCS Queue state from AWS",
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
            "AWS::PCS::Queue",
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
