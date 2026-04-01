// Auto-generated extension model for @swamp/aws/codestarconnections/repository-link
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace,,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace,,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ConnectionArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):.+:.+:[0-9]{12}:.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of the CodeStarConnection. The ARN is used as the connection reference when the connection is shared between AWS services.",
  ),
  OwnerId: z.string().regex(new RegExp("[a-za-z0-9_\\.-]+")).describe(
    "the ID of the entity that owns the repository.",
  ),
  RepositoryName: z.string().regex(new RegExp("[a-za-z0-9_\\.-]+")).describe(
    "The repository for which the link is being created.",
  ),
  EncryptionKeyArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):.+:.+:[0-9]{12}:.+"),
  ).describe(
    "The ARN of the KMS key that the customer can optionally specify to use to encrypt RepositoryLink properties. If not specified, a default key will be used.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to a RepositoryLink.",
  ).optional(),
});

const StateSchema = z.object({
  ConnectionArn: z.string().optional(),
  ProviderType: z.string().optional(),
  OwnerId: z.string().optional(),
  RepositoryName: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
  RepositoryLinkId: z.string().optional(),
  RepositoryLinkArn: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ConnectionArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):.+:.+:[0-9]{12}:.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of the CodeStarConnection. The ARN is used as the connection reference when the connection is shared between AWS services.",
  ).optional(),
  OwnerId: z.string().regex(new RegExp("[a-za-z0-9_\\.-]+")).describe(
    "the ID of the entity that owns the repository.",
  ).optional(),
  RepositoryName: z.string().regex(new RegExp("[a-za-z0-9_\\.-]+")).describe(
    "The repository for which the link is being created.",
  ).optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):.+:.+:[0-9]{12}:.+"),
  ).describe(
    "The ARN of the KMS key that the customer can optionally specify to use to encrypt RepositoryLink properties. If not specified, a default key will be used.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to a RepositoryLink.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/codestarconnections/repository-link",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodeStarConnections RepositoryLink resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeStarConnections RepositoryLink",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodeStarConnections::RepositoryLink",
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
      description: "Get a CodeStarConnections RepositoryLink",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeStarConnections RepositoryLink",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CodeStarConnections::RepositoryLink",
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
    update: {
      description: "Update a CodeStarConnections RepositoryLink",
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
        const identifier = existing.RepositoryLinkArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CodeStarConnections::RepositoryLink",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodeStarConnections::RepositoryLink",
          identifier,
          currentState,
          desiredState,
          ["RepositoryName", "OwnerId"],
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
      description: "Delete a CodeStarConnections RepositoryLink",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeStarConnections RepositoryLink",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CodeStarConnections::RepositoryLink",
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
      description: "Sync CodeStarConnections RepositoryLink state from AWS",
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
        const identifier = existing.RepositoryLinkArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CodeStarConnections::RepositoryLink",
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
