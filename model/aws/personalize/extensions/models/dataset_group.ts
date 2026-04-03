// Auto-generated extension model for @swamp/aws/personalize/dataset-group
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the new dataset group."),
  KmsKeyArn: z.string().max(2048).regex(
    new RegExp("arn:aws.*:kms:.*:[0-9]{12}:key/.*"),
  ).describe(
    "The Amazon Resource Name(ARN) of a AWS Key Management Service (KMS) key used to encrypt the datasets.",
  ).optional(),
  RoleArn: z.string().min(0).max(256).regex(
    new RegExp("arn:([a-z\\d-]+):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The ARN of the AWS Identity and Access Management (IAM) role that has permissions to access the AWS Key Management Service (KMS) key. Supplying an IAM role is only valid when also specifying a KMS key.",
  ).optional(),
  Domain: z.enum(["ECOMMERCE", "VIDEO_ON_DEMAND"]).describe(
    "The domain of a Domain dataset group.",
  ).optional(),
});

const StateSchema = z.object({
  DatasetGroupArn: z.string(),
  Name: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  RoleArn: z.string().optional(),
  Domain: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the new dataset group.").optional(),
  KmsKeyArn: z.string().max(2048).regex(
    new RegExp("arn:aws.*:kms:.*:[0-9]{12}:key/.*"),
  ).describe(
    "The Amazon Resource Name(ARN) of a AWS Key Management Service (KMS) key used to encrypt the datasets.",
  ).optional(),
  RoleArn: z.string().min(0).max(256).regex(
    new RegExp("arn:([a-z\\d-]+):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The ARN of the AWS Identity and Access Management (IAM) role that has permissions to access the AWS Key Management Service (KMS) key. Supplying an IAM role is only valid when also specifying a KMS key.",
  ).optional(),
  Domain: z.enum(["ECOMMERCE", "VIDEO_ON_DEMAND"]).describe(
    "The domain of a Domain dataset group.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/personalize/dataset-group",
  version: "2026.04.03.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Personalize DatasetGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Personalize DatasetGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Personalize::DatasetGroup",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Personalize DatasetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize DatasetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Personalize::DatasetGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Personalize DatasetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize DatasetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Personalize::DatasetGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Personalize DatasetGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DatasetGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Personalize::DatasetGroup",
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
