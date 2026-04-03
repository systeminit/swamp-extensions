// Auto-generated extension model for @swamp/aws/glue/integration
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
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DataFilter: z.string().max(2048).optional(),
  IntegrationName: z.string().min(1).max(128).describe(
    "The name of the integration.",
  ),
  Description: z.string().max(1000).optional(),
  SourceArn: z.string().max(512).regex(new RegExp("arn:aws:.*:.*:[0-9]+:.*"))
    .describe(
      "The Amazon Resource Name (ARN) of the database to use as the source for replication",
    ),
  IntegrationConfig: z.object({
    ContinuousSync: z.boolean().describe(
      "Enables continuous synchronization for on-demand data extractions.",
    ).optional(),
    RefreshInterval: z.string().max(128).describe(
      "Specifies the frequency at which CDC (Change Data Capture) pulls or incremental loads should occur.",
    ).optional(),
    SourceProperties: z.record(z.string(), z.string()).describe(
      "A collection of key-value pairs that specify additional properties for the integration source.",
    ).optional(),
  }).describe("The configuration settings for the integration.").optional(),
  KmsKeyId: z.string().describe(
    "An KMS key identifier for the key to use to encrypt the integration. If you don't specify an encryption key, the default AWS owned KMS key is used.",
  ).optional(),
  TargetArn: z.string().max(512).regex(new RegExp("arn:aws:.*:.*:[0-9]+:.*"))
    .describe(
      "The Amazon Resource Name (ARN) of the Glue data warehouse to use as the target for replication",
    ),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072),
  ).describe(
    "An optional set of non-secret key value pairs that contains additional contextual information about the data.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DataFilter: z.string().optional(),
  Status: z.string().optional(),
  IntegrationArn: z.string(),
  IntegrationName: z.string(),
  Description: z.string().optional(),
  SourceArn: z.string().optional(),
  IntegrationConfig: z.object({
    ContinuousSync: z.boolean(),
    RefreshInterval: z.string(),
    SourceProperties: z.record(z.string(), z.unknown()),
  }).optional(),
  KmsKeyId: z.string().optional(),
  CreateTime: z.string().optional(),
  TargetArn: z.string().optional(),
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DataFilter: z.string().max(2048).optional(),
  IntegrationName: z.string().min(1).max(128).describe(
    "The name of the integration.",
  ).optional(),
  Description: z.string().max(1000).optional(),
  SourceArn: z.string().max(512).regex(new RegExp("arn:aws:.*:.*:[0-9]+:.*"))
    .describe(
      "The Amazon Resource Name (ARN) of the database to use as the source for replication",
    ).optional(),
  IntegrationConfig: z.object({
    ContinuousSync: z.boolean().describe(
      "Enables continuous synchronization for on-demand data extractions.",
    ).optional(),
    RefreshInterval: z.string().max(128).describe(
      "Specifies the frequency at which CDC (Change Data Capture) pulls or incremental loads should occur.",
    ).optional(),
    SourceProperties: z.record(z.string(), z.string()).describe(
      "A collection of key-value pairs that specify additional properties for the integration source.",
    ).optional(),
  }).describe("The configuration settings for the integration.").optional(),
  KmsKeyId: z.string().describe(
    "An KMS key identifier for the key to use to encrypt the integration. If you don't specify an encryption key, the default AWS owned KMS key is used.",
  ).optional(),
  TargetArn: z.string().max(512).regex(new RegExp("arn:aws:.*:.*:[0-9]+:.*"))
    .describe(
      "The Amazon Resource Name (ARN) of the Glue data warehouse to use as the target for replication",
    ).optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072),
  ).describe(
    "An optional set of non-secret key value pairs that contains additional contextual information about the data.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/glue/integration",
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
      description: "Glue Integration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Integration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::Integration",
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
      description: "Get a Glue Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Glue::Integration",
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
    update: {
      description: "Update a Glue Integration",
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
        const idParts = [
          existing.IntegrationArn?.toString(),
          existing.IntegrationName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Glue::Integration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Integration",
          identifier,
          currentState,
          desiredState,
          [
            "IntegrationName",
            "SourceArn",
            "TargetArn",
            "KmsKeyId",
            "AdditionalEncryptionContext",
            "IntegrationConfig",
            "RefreshInterval",
          ],
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
      description: "Delete a Glue Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Glue::Integration",
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
      description: "Sync Glue Integration state from AWS",
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
        const idParts = [
          existing.IntegrationArn?.toString(),
          existing.IntegrationName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Glue::Integration",
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
