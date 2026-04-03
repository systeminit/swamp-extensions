// Auto-generated extension model for @swamp/aws/bedrock/flow
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DefinitionString: z.string().max(512000).describe(
    "A JSON string containing a Definition with the same schema as the Definition property of this resource",
  ).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ).describe("A bucket in S3"),
    Key: z.string().min(1).max(1024).describe("A object key in S3"),
  }).describe(
    "A bucket, key and optional version pointing to an S3 object containing a UTF-8 encoded JSON string Definition with the same schema as the Definition property of this resource",
  ).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.string()).describe(
    "When supplied with DefinitionString or DefinitionS3Location, substrings in the definition matching ${keyname} will be replaced with the associated value from this map",
  ).optional(),
  Description: z.string().min(1).max(200).describe("Description of the flow")
    .optional(),
  ExecutionRoleArn: z.string().max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/(service-role/)?.+$"),
  ).describe("ARN of a IAM role"),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for the flow",
  ),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  TestAliasTags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  CreatedAt: z.string().optional(),
  DefinitionString: z.string().optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string(),
    Key: z.string(),
    Version: z.string(),
  }).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.unknown()).optional(),
  Description: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  UpdatedAt: z.string().optional(),
  CustomerEncryptionKeyArn: z.string().optional(),
  Validations: z.array(z.object({
    Message: z.string(),
  })).optional(),
  Version: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TestAliasTags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DefinitionString: z.string().max(512000).describe(
    "A JSON string containing a Definition with the same schema as the Definition property of this resource",
  ).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ).describe("A bucket in S3").optional(),
    Key: z.string().min(1).max(1024).describe("A object key in S3").optional(),
  }).describe(
    "A bucket, key and optional version pointing to an S3 object containing a UTF-8 encoded JSON string Definition with the same schema as the Definition property of this resource",
  ).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.string()).describe(
    "When supplied with DefinitionString or DefinitionS3Location, substrings in the definition matching ${keyname} will be replaced with the associated value from this map",
  ).optional(),
  Description: z.string().min(1).max(200).describe("Description of the flow")
    .optional(),
  ExecutionRoleArn: z.string().max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/(service-role/)?.+$"),
  ).describe("ARN of a IAM role").optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for the flow",
  ).optional(),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  TestAliasTags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

export const model = {
  type: "@swamp/aws/bedrock/flow",
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
      description: "Bedrock Flow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock Flow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::Flow",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Bedrock Flow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Flow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::Flow",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Bedrock Flow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
        const currentState = await readResource(
          "AWS::Bedrock::Flow",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::Flow",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a Bedrock Flow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Flow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::Flow",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync Bedrock Flow state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
            "AWS::Bedrock::Flow",
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
