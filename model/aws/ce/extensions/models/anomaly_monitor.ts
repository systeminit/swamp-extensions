// Auto-generated extension model for @swamp/aws/ce/anomaly-monitor
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

export const ResourceTagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^(?!aws:).*$")).describe(
    "The key name for the tag.",
  ),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  MonitorType: z.enum(["DIMENSIONAL", "CUSTOM"]),
  MonitorName: z.string().min(0).max(1024).regex(new RegExp("[\\S\\s]*"))
    .describe("The name of the monitor."),
  MonitorDimension: z.enum([
    "SERVICE",
    "LINKED_ACCOUNT",
    "TAG",
    "COST_CATEGORY",
  ]).describe("The dimensions to evaluate").optional(),
  MonitorSpecification: z.string().optional(),
  ResourceTags: z.array(ResourceTagSchema).describe(
    "Tags to assign to monitor.",
  ).optional(),
});

const StateSchema = z.object({
  MonitorArn: z.string(),
  MonitorType: z.string().optional(),
  MonitorName: z.string().optional(),
  CreationDate: z.string().optional(),
  LastEvaluatedDate: z.string().optional(),
  LastUpdatedDate: z.string().optional(),
  MonitorDimension: z.string().optional(),
  MonitorSpecification: z.string().optional(),
  DimensionalValueCount: z.number().optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  MonitorType: z.enum(["DIMENSIONAL", "CUSTOM"]).optional(),
  MonitorName: z.string().min(0).max(1024).regex(new RegExp("[\\S\\s]*"))
    .describe("The name of the monitor.").optional(),
  MonitorDimension: z.enum([
    "SERVICE",
    "LINKED_ACCOUNT",
    "TAG",
    "COST_CATEGORY",
  ]).describe("The dimensions to evaluate").optional(),
  MonitorSpecification: z.string().optional(),
  ResourceTags: z.array(ResourceTagSchema).describe(
    "Tags to assign to monitor.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ce/anomaly-monitor",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CE AnomalyMonitor resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CE AnomalyMonitor",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CE::AnomalyMonitor",
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
      description: "Get a CE AnomalyMonitor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CE AnomalyMonitor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CE::AnomalyMonitor",
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
      description: "Update a CE AnomalyMonitor",
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
        const identifier = existing.MonitorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CE::AnomalyMonitor",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CE::AnomalyMonitor",
          identifier,
          currentState,
          desiredState,
          [
            "MonitorType",
            "MonitorDimension",
            "MonitorSpecification",
            "ResourceTags",
          ],
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
      description: "Delete a CE AnomalyMonitor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CE AnomalyMonitor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CE::AnomalyMonitor",
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
      description: "Sync CE AnomalyMonitor state from AWS",
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
        const identifier = existing.MonitorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CE::AnomalyMonitor",
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
