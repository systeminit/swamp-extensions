// Auto-generated extension model for @swamp/aws/iot/authorizer
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
  AuthorizerFunctionArn: z.string(),
  AuthorizerName: z.string().min(1).max(128).regex(new RegExp("[\\w=,@-]+"))
    .optional(),
  SigningDisabled: z.boolean().optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  TokenKeyName: z.string().optional(),
  TokenSigningPublicKeys: z.record(z.string(), z.string().max(5120)).optional(),
  EnableCachingForHttp: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  AuthorizerFunctionArn: z.string().optional(),
  Arn: z.string().optional(),
  AuthorizerName: z.string(),
  SigningDisabled: z.boolean().optional(),
  Status: z.string().optional(),
  TokenKeyName: z.string().optional(),
  TokenSigningPublicKeys: z.record(z.string(), z.unknown()).optional(),
  EnableCachingForHttp: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AuthorizerFunctionArn: z.string().optional(),
  AuthorizerName: z.string().min(1).max(128).regex(new RegExp("[\\w=,@-]+"))
    .optional(),
  SigningDisabled: z.boolean().optional(),
  Status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  TokenKeyName: z.string().optional(),
  TokenSigningPublicKeys: z.record(z.string(), z.string().max(5120)).optional(),
  EnableCachingForHttp: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iot/authorizer",
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
      description: "IoT Authorizer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT Authorizer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::Authorizer",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.AuthorizerName ?? g.AuthorizerName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoT Authorizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Authorizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::Authorizer",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.AuthorizerName ?? context.globalArgs.AuthorizerName)
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
      description: "Update a IoT Authorizer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AuthorizerName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AuthorizerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::Authorizer",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::Authorizer",
          identifier,
          currentState,
          desiredState,
          ["SigningDisabled", "AuthorizerName"],
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
      description: "Delete a IoT Authorizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Authorizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::Authorizer",
          args.identifier,
        );
        const instanceName = context.globalArgs.AuthorizerName?.toString() ??
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
      description: "Sync IoT Authorizer state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AuthorizerName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AuthorizerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::Authorizer",
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
