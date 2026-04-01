// Auto-generated extension model for @swamp/aws/arczonalshift/zonal-autoshift-configuration
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

export const ControlConditionSchema = z.object({
  Type: z.string().min(8).max(10).regex(new RegExp("^[a-zA-Z]*$")),
  AlarmIdentifier: z.string().min(8).max(1024).regex(new RegExp("^.*$")),
});

const GlobalArgsSchema = z.object({
  ZonalAutoshiftStatus: z.enum(["ENABLED"]).optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema).optional(),
    OutcomeAlarms: z.array(ControlConditionSchema),
    BlockedDates: z.array(
      z.string().min(10).max(10).regex(
        new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$"),
      ),
    ).optional(),
    BlockedWindows: z.array(
      z.string().min(19).max(19).regex(
        new RegExp(
          "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}$",
        ),
      ),
    ).optional(),
  }).optional(),
  ResourceIdentifier: z.string().min(8).max(1024).optional(),
});

const StateSchema = z.object({
  ZonalAutoshiftStatus: z.string().optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema),
    OutcomeAlarms: z.array(ControlConditionSchema),
    BlockedDates: z.array(z.string()),
    BlockedWindows: z.array(z.string()),
  }).optional(),
  ResourceIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ZonalAutoshiftStatus: z.enum(["ENABLED"]).optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema).optional(),
    OutcomeAlarms: z.array(ControlConditionSchema).optional(),
    BlockedDates: z.array(
      z.string().min(10).max(10).regex(
        new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$"),
      ),
    ).optional(),
    BlockedWindows: z.array(
      z.string().min(19).max(19).regex(
        new RegExp(
          "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}$",
        ),
      ),
    ).optional(),
  }).optional(),
  ResourceIdentifier: z.string().min(8).max(1024).optional(),
});

export const model = {
  type: "@swamp/aws/arczonalshift/zonal-autoshift-configuration",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ARCZonalShift ZonalAutoshiftConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ResourceIdentifier ?? g.ResourceIdentifier)?.toString() ??
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
      description: "Get a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCZonalShift ZonalAutoshiftConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ResourceIdentifier ?? context.globalArgs.ResourceIdentifier)
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
      description: "Update a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ResourceIdentifier?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ResourceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          identifier,
          currentState,
          desiredState,
          ["ResourceIdentifier"],
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
      description: "Delete a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCZonalShift ZonalAutoshiftConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.ResourceIdentifier?.toString() ?? args.identifier;
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
      description:
        "Sync ARCZonalShift ZonalAutoshiftConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ResourceIdentifier?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ResourceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
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
