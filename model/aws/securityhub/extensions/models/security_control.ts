// Auto-generated extension model for @swamp/aws/securityhub/security-control
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

export const ParameterValueSchema = z.object({
  Boolean: z.boolean().describe("A control parameter that is a boolean.")
    .optional(),
  Double: z.number().describe("A control parameter that is a double.")
    .optional(),
  Enum: z.string().regex(new RegExp(".*\\S.*")).describe(
    "A control parameter that is a enum.",
  ).optional(),
  EnumList: z.array(z.string().regex(new RegExp(".*\\S.*"))).describe(
    "A control parameter that is a list of enums.",
  ).optional(),
  Integer: z.number().int().describe("A control parameter that is a integer.")
    .optional(),
  IntegerList: z.array(z.number().int()).describe(
    "A control parameter that is a list of integers.",
  ).optional(),
  String: z.string().regex(new RegExp(".*\\S.*")).describe(
    "A control parameter that is a string.",
  ).optional(),
  StringList: z.array(z.string().regex(new RegExp(".*\\S.*"))).describe(
    "A control parameter that is a list of strings.",
  ).optional(),
});

export const ParameterConfigurationSchema = z.object({
  ValueType: z.enum(["DEFAULT", "CUSTOM"]),
  Value: ParameterValueSchema.optional(),
});

const GlobalArgsSchema = z.object({
  SecurityControlId: z.string().regex(new RegExp(".*\\S.*")).describe(
    "The unique identifier of a security control across standards. Values for this field typically consist of an AWS service name and a number, such as APIGateway.3.",
  ).optional(),
  SecurityControlArn: z.string().regex(new RegExp(".*\\S.*")).describe(
    "The Amazon Resource Name (ARN) for a security control across standards, such as `arn:aws:securityhub:eu-central-1:123456789012:security-control/S3.1`. This parameter doesn't mention a specific standard.",
  ).optional(),
  LastUpdateReason: z.string().regex(
    new RegExp("^([^\u0000-]|[-_ a-zA-Z0-9])+$"),
  ).describe(
    "The most recent reason for updating the customizable properties of a security control. This differs from the UpdateReason field of the BatchUpdateStandardsControlAssociations API, which tracks the reason for updating the enablement status of a control. This field accepts alphanumeric characters in addition to white spaces, dashes, and underscores.",
  ).optional(),
  Parameters: z.record(z.string(), ParameterConfigurationSchema).describe(
    "An object that identifies the name of a control parameter, its current value, and whether it has been customized.",
  ),
});

const StateSchema = z.object({
  SecurityControlId: z.string(),
  SecurityControlArn: z.string().optional(),
  LastUpdateReason: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  SecurityControlId: z.string().regex(new RegExp(".*\\S.*")).describe(
    "The unique identifier of a security control across standards. Values for this field typically consist of an AWS service name and a number, such as APIGateway.3.",
  ).optional(),
  SecurityControlArn: z.string().regex(new RegExp(".*\\S.*")).describe(
    "The Amazon Resource Name (ARN) for a security control across standards, such as `arn:aws:securityhub:eu-central-1:123456789012:security-control/S3.1`. This parameter doesn't mention a specific standard.",
  ).optional(),
  LastUpdateReason: z.string().regex(
    new RegExp("^([^\u0000-]|[-_ a-zA-Z0-9])+$"),
  ).describe(
    "The most recent reason for updating the customizable properties of a security control. This differs from the UpdateReason field of the BatchUpdateStandardsControlAssociations API, which tracks the reason for updating the enablement status of a control. This field accepts alphanumeric characters in addition to white spaces, dashes, and underscores.",
  ).optional(),
  Parameters: z.record(z.string(), ParameterConfigurationSchema).describe(
    "An object that identifies the name of a control parameter, its current value, and whether it has been customized.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/securityhub/security-control",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SecurityHub SecurityControl resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityHub SecurityControl",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SecurityHub::SecurityControl",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.SecurityControlId ?? g.SecurityControlId)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SecurityHub SecurityControl",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub SecurityControl",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SecurityHub::SecurityControl",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.SecurityControlId ?? context.globalArgs.SecurityControlId)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./,
              "_",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SecurityHub SecurityControl",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.SecurityControlId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SecurityControlId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SecurityHub::SecurityControl",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SecurityHub::SecurityControl",
          identifier,
          currentState,
          desiredState,
          ["SecurityControlId"],
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
      description: "Delete a SecurityHub SecurityControl",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub SecurityControl",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SecurityHub::SecurityControl",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.SecurityControlId?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync SecurityHub SecurityControl state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.SecurityControlId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SecurityControlId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SecurityHub::SecurityControl",
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
