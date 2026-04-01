// Auto-generated extension model for @swamp/aws/sso/instance-access-control-attribute-configuration
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

export const AccessControlAttributeValueSchema = z.object({
  Source: z.array(
    z.string().min(0).max(256).regex(
      new RegExp('[\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@\\[\\]\\{\\}\\$\\\\"]*', "u"),
    ),
  ),
});

export const AccessControlAttributeSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("[\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@]+", "u"),
  ),
  Value: AccessControlAttributeValueSchema,
});

const GlobalArgsSchema = z.object({
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}",
    ),
  ).describe(
    "The ARN of the AWS SSO instance under which the operation will be executed.",
  ),
  InstanceAccessControlAttributeConfiguration: z.object({
    AccessControlAttributes: z.array(AccessControlAttributeSchema),
  }).describe(
    "The InstanceAccessControlAttributeConfiguration property has been deprecated but is still supported for backwards compatibility purposes. We recomend that you use AccessControlAttributes property instead.",
  ).optional(),
  AccessControlAttributes: z.array(AccessControlAttributeSchema).optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string(),
  InstanceAccessControlAttributeConfiguration: z.object({
    AccessControlAttributes: z.array(AccessControlAttributeSchema),
  }).optional(),
  AccessControlAttributes: z.array(AccessControlAttributeSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}",
    ),
  ).describe(
    "The ARN of the AWS SSO instance under which the operation will be executed.",
  ).optional(),
  InstanceAccessControlAttributeConfiguration: z.object({
    AccessControlAttributes: z.array(AccessControlAttributeSchema).optional(),
  }).describe(
    "The InstanceAccessControlAttributeConfiguration property has been deprecated but is still supported for backwards compatibility purposes. We recomend that you use AccessControlAttributes property instead.",
  ).optional(),
  AccessControlAttributes: z.array(AccessControlAttributeSchema).optional(),
});

export const model = {
  type: "@swamp/aws/sso/instance-access-control-attribute-configuration",
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
      description:
        "SSO InstanceAccessControlAttributeConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSO InstanceAccessControlAttributeConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSO::InstanceAccessControlAttributeConfiguration",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.InstanceArn ?? g.InstanceArn)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SSO InstanceAccessControlAttributeConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO InstanceAccessControlAttributeConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSO::InstanceAccessControlAttributeConfiguration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.InstanceArn ?? context.globalArgs.InstanceArn)?.toString() ??
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
      description: "Update a SSO InstanceAccessControlAttributeConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.InstanceArn?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.InstanceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSO::InstanceAccessControlAttributeConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSO::InstanceAccessControlAttributeConfiguration",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn"],
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
      description: "Delete a SSO InstanceAccessControlAttributeConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO InstanceAccessControlAttributeConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSO::InstanceAccessControlAttributeConfiguration",
          args.identifier,
        );
        const instanceName = context.globalArgs.InstanceArn?.toString() ??
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
      description:
        "Sync SSO InstanceAccessControlAttributeConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.InstanceArn?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.InstanceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSO::InstanceAccessControlAttributeConfiguration",
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
