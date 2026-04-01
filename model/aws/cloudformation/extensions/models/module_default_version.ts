// Auto-generated extension model for @swamp/aws/cloudformation/module-default-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:([0-9]{12})?:type/module/.+/[0-9]{8}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the module version to set as the default version.",
  ).optional(),
  ModuleName: z.string().regex(
    new RegExp(
      "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::MODULE",
    ),
  ).describe("The name of a module existing in the registry.").optional(),
  VersionId: z.string().regex(new RegExp("^[0-9]{8}$")).describe(
    "The ID of an existing version of the named module to set as the default.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ModuleName: z.string().optional(),
  VersionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:([0-9]{12})?:type/module/.+/[0-9]{8}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the module version to set as the default version.",
  ).optional(),
  ModuleName: z.string().regex(
    new RegExp(
      "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::MODULE",
    ),
  ).describe("The name of a module existing in the registry.").optional(),
  VersionId: z.string().regex(new RegExp("^[0-9]{8}$")).describe(
    "The ID of an existing version of the named module to set as the default.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/cloudformation/module-default-version",
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
      description: "CloudFormation ModuleDefaultVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation ModuleDefaultVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFormation::ModuleDefaultVersion",
          desiredState,
        ) as StateData;
        const instanceName = (result.Arn ?? g.Arn)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a CloudFormation ModuleDefaultVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation ModuleDefaultVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFormation::ModuleDefaultVersion",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Arn ?? context.globalArgs.Arn)?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a CloudFormation ModuleDefaultVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation ModuleDefaultVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFormation::ModuleDefaultVersion",
          args.identifier,
        );
        const instanceName = context.globalArgs.Arn?.toString() ??
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
      description: "Sync CloudFormation ModuleDefaultVersion state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Arn?.toString() ?? "current";
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
            "AWS::CloudFormation::ModuleDefaultVersion",
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
