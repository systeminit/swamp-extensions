// Auto-generated extension model for @swamp/aws/athena/capacity-reservation
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

export const CapacityAssignmentSchema = z.object({
  WorkgroupNames: z.array(
    z.string().regex(new RegExp("[a-zA-Z0-9._-]{1,128}")),
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().regex(new RegExp("[a-zA-Z0-9._-]{1,128}")).describe(
    "The reservation name.",
  ),
  TargetDpus: z.number().int().min(1).describe(
    "The number of DPUs to request to be allocated to the reservation.",
  ),
  CapacityAssignmentConfiguration: z.object({
    CapacityAssignments: z.array(CapacityAssignmentSchema).describe(
      "List of capacity assignments",
    ),
  }).describe("Assignment configuration to assign workgroups to a reservation")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  TargetDpus: z.number().optional(),
  AllocatedDpus: z.number().optional(),
  CapacityAssignmentConfiguration: z.object({
    CapacityAssignments: z.array(CapacityAssignmentSchema),
  }).optional(),
  CreationTime: z.string().optional(),
  LastSuccessfulAllocationTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().regex(new RegExp("[a-zA-Z0-9._-]{1,128}")).describe(
    "The reservation name.",
  ).optional(),
  TargetDpus: z.number().int().min(1).describe(
    "The number of DPUs to request to be allocated to the reservation.",
  ).optional(),
  CapacityAssignmentConfiguration: z.object({
    CapacityAssignments: z.array(CapacityAssignmentSchema).describe(
      "List of capacity assignments",
    ).optional(),
  }).describe("Assignment configuration to assign workgroups to a reservation")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/athena/capacity-reservation",
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
      description: "Athena CapacityReservation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Athena CapacityReservation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Athena::CapacityReservation",
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
      description: "Get a Athena CapacityReservation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena CapacityReservation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Athena::CapacityReservation",
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
      description: "Update a Athena CapacityReservation",
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
          "AWS::Athena::CapacityReservation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Athena::CapacityReservation",
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
      description: "Delete a Athena CapacityReservation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena CapacityReservation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Athena::CapacityReservation",
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
      description: "Sync Athena CapacityReservation state from AWS",
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
            "AWS::Athena::CapacityReservation",
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
