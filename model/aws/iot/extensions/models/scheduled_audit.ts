// Auto-generated extension model for @swamp/aws/iot/scheduled-audit
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
  Key: z.string().min(1).max(128).describe("The tag's key."),
  Value: z.string().min(1).max(256).describe("The tag's value."),
});

const GlobalArgsSchema = z.object({
  ScheduledAuditName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9:_-]+"),
  ).describe("The name you want to give to the scheduled audit.").optional(),
  Frequency: z.enum(["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"]).describe(
    "How often the scheduled audit takes place. Can be one of DAILY, WEEKLY, BIWEEKLY, or MONTHLY.",
  ),
  DayOfMonth: z.string().regex(
    new RegExp("^([1-9]|[12][0-9]|3[01])$|^LAST$|^UNSET_VALUE$"),
  ).describe(
    "The day of the month on which the scheduled audit takes place. Can be 1 through 31 or LAST. This field is required if the frequency parameter is set to MONTHLY.",
  ).optional(),
  DayOfWeek: z.enum([
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "UNSET_VALUE",
  ]).describe(
    "The day of the week on which the scheduled audit takes place. Can be one of SUN, MON, TUE,WED, THU, FRI, or SAT. This field is required if the frequency parameter is set to WEEKLY or BIWEEKLY.",
  ).optional(),
  TargetCheckNames: z.array(z.string()).describe(
    "Which checks are performed during the scheduled audit. Checks must be enabled for your account.",
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ScheduledAuditName: z.string(),
  Frequency: z.string().optional(),
  DayOfMonth: z.string().optional(),
  DayOfWeek: z.string().optional(),
  TargetCheckNames: z.array(z.string()).optional(),
  ScheduledAuditArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ScheduledAuditName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9:_-]+"),
  ).describe("The name you want to give to the scheduled audit.").optional(),
  Frequency: z.enum(["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"]).describe(
    "How often the scheduled audit takes place. Can be one of DAILY, WEEKLY, BIWEEKLY, or MONTHLY.",
  ).optional(),
  DayOfMonth: z.string().regex(
    new RegExp("^([1-9]|[12][0-9]|3[01])$|^LAST$|^UNSET_VALUE$"),
  ).describe(
    "The day of the month on which the scheduled audit takes place. Can be 1 through 31 or LAST. This field is required if the frequency parameter is set to MONTHLY.",
  ).optional(),
  DayOfWeek: z.enum([
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "UNSET_VALUE",
  ]).describe(
    "The day of the week on which the scheduled audit takes place. Can be one of SUN, MON, TUE,WED, THU, FRI, or SAT. This field is required if the frequency parameter is set to WEEKLY or BIWEEKLY.",
  ).optional(),
  TargetCheckNames: z.array(z.string()).describe(
    "Which checks are performed during the scheduled audit. Checks must be enabled for your account.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iot/scheduled-audit",
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
      description: "IoT ScheduledAudit resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT ScheduledAudit",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::ScheduledAudit",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ScheduledAuditName ?? g.ScheduledAuditName)?.toString() ??
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
      description: "Get a IoT ScheduledAudit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT ScheduledAudit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::ScheduledAudit",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ScheduledAuditName ?? context.globalArgs.ScheduledAuditName)
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
      description: "Update a IoT ScheduledAudit",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ScheduledAuditName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ScheduledAuditName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::ScheduledAudit",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::ScheduledAudit",
          identifier,
          currentState,
          desiredState,
          ["ScheduledAuditName"],
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
      description: "Delete a IoT ScheduledAudit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT ScheduledAudit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::ScheduledAudit",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.ScheduledAuditName?.toString() ?? args.identifier;
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
      description: "Sync IoT ScheduledAudit state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ScheduledAuditName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ScheduledAuditName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::ScheduledAudit",
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
