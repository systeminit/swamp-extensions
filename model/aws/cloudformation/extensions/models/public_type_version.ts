// Auto-generated extension model for @swamp/aws/cloudformation/public-type-version
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
  Arn: z.string().regex(
    new RegExp(
      "arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:[0-9]{12}:type/.+",
    ),
  ).describe("The Amazon Resource Number (ARN) of the extension.").optional(),
  PublicVersionNumber: z.string().min(5).max(64).describe(
    "The version number of a public third-party extension",
  ).optional(),
  TypeName: z.string().regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "The name of the type being registered. We recommend that type names adhere to the following pattern: company_or_organization::service::type.",
  ).optional(),
  LogDeliveryBucket: z.string().describe(
    "A url to the S3 bucket where logs for the testType run will be available",
  ).optional(),
  Type: z.enum(["RESOURCE", "MODULE", "HOOK"]).describe("The kind of extension")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  TypeVersionArn: z.string().optional(),
  PublicVersionNumber: z.string().optional(),
  PublisherId: z.string().optional(),
  PublicTypeArn: z.string(),
  TypeName: z.string().optional(),
  LogDeliveryBucket: z.string().optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Arn: z.string().regex(
    new RegExp(
      "arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:[0-9]{12}:type/.+",
    ),
  ).describe("The Amazon Resource Number (ARN) of the extension.").optional(),
  PublicVersionNumber: z.string().min(5).max(64).describe(
    "The version number of a public third-party extension",
  ).optional(),
  TypeName: z.string().regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "The name of the type being registered. We recommend that type names adhere to the following pattern: company_or_organization::service::type.",
  ).optional(),
  LogDeliveryBucket: z.string().describe(
    "A url to the S3 bucket where logs for the testType run will be available",
  ).optional(),
  Type: z.enum(["RESOURCE", "MODULE", "HOOK"]).describe("The kind of extension")
    .optional(),
});

export const model = {
  type: "@swamp/aws/cloudformation/public-type-version",
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
      description: "CloudFormation PublicTypeVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation PublicTypeVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFormation::PublicTypeVersion",
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
      description: "Get a CloudFormation PublicTypeVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation PublicTypeVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFormation::PublicTypeVersion",
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
    delete: {
      description: "Delete a CloudFormation PublicTypeVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation PublicTypeVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFormation::PublicTypeVersion",
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
      description: "Sync CloudFormation PublicTypeVersion state from AWS",
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
        const identifier = existing.PublicTypeArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFormation::PublicTypeVersion",
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
