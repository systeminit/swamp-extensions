// Auto-generated extension model for @swamp/aws/route53recoveryreadiness/readiness-check
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
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  ResourceSetName: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9_]+"))
    .describe("The name of the resource set to check.").optional(),
  ReadinessCheckName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9_]+"),
  ).describe("Name of the ReadinessCheck to create.").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  ResourceSetName: z.string().optional(),
  ReadinessCheckName: z.string(),
  ReadinessCheckArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ResourceSetName: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9_]+"))
    .describe("The name of the resource set to check.").optional(),
  ReadinessCheckName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9_]+"),
  ).describe("Name of the ReadinessCheck to create.").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/route53recoveryreadiness/readiness-check",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Route53RecoveryReadiness ReadinessCheck resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53RecoveryReadiness ReadinessCheck",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Route53RecoveryReadiness::ReadinessCheck",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ReadinessCheckName ?? g.ReadinessCheckName)?.toString() ??
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
      description: "Get a Route53RecoveryReadiness ReadinessCheck",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53RecoveryReadiness ReadinessCheck",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Route53RecoveryReadiness::ReadinessCheck",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.ReadinessCheckName ?? context.globalArgs.ReadinessCheckName)
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
      description: "Update a Route53RecoveryReadiness ReadinessCheck",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ReadinessCheckName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ReadinessCheckName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Route53RecoveryReadiness::ReadinessCheck",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Route53RecoveryReadiness::ReadinessCheck",
          identifier,
          currentState,
          desiredState,
          ["ReadinessCheckName"],
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
      description: "Delete a Route53RecoveryReadiness ReadinessCheck",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53RecoveryReadiness ReadinessCheck",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Route53RecoveryReadiness::ReadinessCheck",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.ReadinessCheckName?.toString() ?? args.identifier;
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
        "Sync Route53RecoveryReadiness ReadinessCheck state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ReadinessCheckName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ReadinessCheckName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Route53RecoveryReadiness::ReadinessCheck",
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
