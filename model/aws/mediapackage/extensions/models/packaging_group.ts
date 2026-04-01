// Auto-generated extension model for @swamp/aws/mediapackage/packaging-group
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
  Id: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_]+$")).describe(
    "The ID of the PackagingGroup.",
  ),
  Authorization: z.object({
    CdnIdentifierSecret: z.string().describe(
      "The Amazon Resource Name (ARN) for the secret in AWS Secrets Manager that is used for CDN authorization.",
    ),
    SecretsRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that allows MediaPackage to communicate with AWS Secrets Manager.",
    ),
  }).describe("CDN Authorization").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  EgressAccessLogs: z.object({
    LogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^\\/aws\\/MediaPackage\\/[0-9a-zA-Z-_\\/\\.#]+$"),
    ).describe(
      "Sets a custom AWS CloudWatch log group name for egress logs. If a log group name isn't specified, the default name is used: /aws/MediaPackage/VodEgressAccessLogs.",
    ).optional(),
  }).describe("The configuration parameters for egress access logging.")
    .optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  DomainName: z.string().optional(),
  Authorization: z.object({
    CdnIdentifierSecret: z.string(),
    SecretsRoleArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  EgressAccessLogs: z.object({
    LogGroupName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Id: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_]+$")).describe(
    "The ID of the PackagingGroup.",
  ).optional(),
  Authorization: z.object({
    CdnIdentifierSecret: z.string().describe(
      "The Amazon Resource Name (ARN) for the secret in AWS Secrets Manager that is used for CDN authorization.",
    ).optional(),
    SecretsRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that allows MediaPackage to communicate with AWS Secrets Manager.",
    ).optional(),
  }).describe("CDN Authorization").optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
  EgressAccessLogs: z.object({
    LogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^\\/aws\\/MediaPackage\\/[0-9a-zA-Z-_\\/\\.#]+$"),
    ).describe(
      "Sets a custom AWS CloudWatch log group name for egress logs. If a log group name isn't specified, the default name is used: /aws/MediaPackage/VodEgressAccessLogs.",
    ).optional(),
  }).describe("The configuration parameters for egress access logging.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/mediapackage/packaging-group",
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
      description: "MediaPackage PackagingGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaPackage PackagingGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaPackage::PackagingGroup",
          desiredState,
        ) as StateData;
        const instanceName = (result.Id ?? g.Id)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a MediaPackage PackagingGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage PackagingGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaPackage::PackagingGroup",
          args.identifier,
        ) as StateData;
        const instanceName = (result.Id ?? context.globalArgs.Id)?.toString() ??
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
      description: "Update a MediaPackage PackagingGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Id?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaPackage::PackagingGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaPackage::PackagingGroup",
          identifier,
          currentState,
          desiredState,
          ["Id", "Tags"],
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
      description: "Delete a MediaPackage PackagingGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage PackagingGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaPackage::PackagingGroup",
          args.identifier,
        );
        const instanceName = context.globalArgs.Id?.toString() ??
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
      description: "Sync MediaPackage PackagingGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Id?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaPackage::PackagingGroup",
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
