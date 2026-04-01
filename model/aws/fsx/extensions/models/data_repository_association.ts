// Auto-generated extension model for @swamp/aws/fsx/data-repository-association
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

export const AutoImportPolicySchema = z.object({
  Events: z.array(z.enum(["NEW", "CHANGED", "DELETED"])),
});

export const AutoExportPolicySchema = z.object({
  Events: z.array(z.enum(["NEW", "CHANGED", "DELETED"])),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FileSystemId: z.string().describe(
    "The globally unique ID of the file system, assigned by Amazon FSx.",
  ),
  FileSystemPath: z.string().describe(
    "This path specifies where in your file system files will be exported from or imported to. This file system directory can be linked to only one Amazon S3 bucket, and no other S3 bucket can be linked to the directory.",
  ),
  DataRepositoryPath: z.string().describe(
    "The path to the Amazon S3 data repository that will be linked to the file system. The path can be an S3 bucket or prefix in the format s3://myBucket/myPrefix/. This path specifies where in the S3 data repository files will be imported from or exported to.",
  ),
  BatchImportMetaDataOnCreate: z.boolean().describe(
    "A boolean flag indicating whether an import data repository task to import metadata should run after the data repository association is created. The task runs if this flag is set to true.",
  ).optional(),
  ImportedFileChunkSize: z.number().int().describe(
    "For files imported from a data repository, this value determines the stripe count and maximum amount of data per file (in MiB) stored on a single physical disk. The maximum number of disks that a single file can be striped across is limited by the total number of disks that make up the file system.",
  ).optional(),
  S3: z.object({
    AutoImportPolicy: AutoImportPolicySchema.describe(
      "Specifies the type of updated objects (new, changed, deleted) that will be automatically imported from the linked S3 bucket to your file system.",
    ).optional(),
    AutoExportPolicy: AutoExportPolicySchema.describe(
      "Specifies the type of updated objects (new, changed, deleted) that will be automatically exported from your file system to the linked S3 bucket.",
    ).optional(),
  }).describe(
    "The configuration for an Amazon S3 data repository linked to an Amazon FSx Lustre file system with a data repository association. The configuration defines which file events (new, changed, or deleted files or directories) are automatically imported from the linked data repository to the file system or automatically exported from the file system to the data repository.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of Tag values, with a maximum of 50 elements.",
  ).optional(),
});

const StateSchema = z.object({
  AssociationId: z.string(),
  ResourceARN: z.string().optional(),
  FileSystemId: z.string().optional(),
  FileSystemPath: z.string().optional(),
  DataRepositoryPath: z.string().optional(),
  BatchImportMetaDataOnCreate: z.boolean().optional(),
  ImportedFileChunkSize: z.number().optional(),
  S3: z.object({
    AutoImportPolicy: AutoImportPolicySchema,
    AutoExportPolicy: AutoExportPolicySchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FileSystemId: z.string().describe(
    "The globally unique ID of the file system, assigned by Amazon FSx.",
  ).optional(),
  FileSystemPath: z.string().describe(
    "This path specifies where in your file system files will be exported from or imported to. This file system directory can be linked to only one Amazon S3 bucket, and no other S3 bucket can be linked to the directory.",
  ).optional(),
  DataRepositoryPath: z.string().describe(
    "The path to the Amazon S3 data repository that will be linked to the file system. The path can be an S3 bucket or prefix in the format s3://myBucket/myPrefix/. This path specifies where in the S3 data repository files will be imported from or exported to.",
  ).optional(),
  BatchImportMetaDataOnCreate: z.boolean().describe(
    "A boolean flag indicating whether an import data repository task to import metadata should run after the data repository association is created. The task runs if this flag is set to true.",
  ).optional(),
  ImportedFileChunkSize: z.number().int().describe(
    "For files imported from a data repository, this value determines the stripe count and maximum amount of data per file (in MiB) stored on a single physical disk. The maximum number of disks that a single file can be striped across is limited by the total number of disks that make up the file system.",
  ).optional(),
  S3: z.object({
    AutoImportPolicy: AutoImportPolicySchema.describe(
      "Specifies the type of updated objects (new, changed, deleted) that will be automatically imported from the linked S3 bucket to your file system.",
    ).optional(),
    AutoExportPolicy: AutoExportPolicySchema.describe(
      "Specifies the type of updated objects (new, changed, deleted) that will be automatically exported from your file system to the linked S3 bucket.",
    ).optional(),
  }).describe(
    "The configuration for an Amazon S3 data repository linked to an Amazon FSx Lustre file system with a data repository association. The configuration defines which file events (new, changed, or deleted files or directories) are automatically imported from the linked data repository to the file system or automatically exported from the file system to the data repository.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of Tag values, with a maximum of 50 elements.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/fsx/data-repository-association",
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
      description: "FSx DataRepositoryAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FSx DataRepositoryAssociation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::FSx::DataRepositoryAssociation",
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
      description: "Get a FSx DataRepositoryAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx DataRepositoryAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::FSx::DataRepositoryAssociation",
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
      description: "Update a FSx DataRepositoryAssociation",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::FSx::DataRepositoryAssociation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::FSx::DataRepositoryAssociation",
          identifier,
          currentState,
          desiredState,
          [
            "FileSystemId",
            "FileSystemPath",
            "DataRepositoryPath",
            "BatchImportMetaDataOnCreate",
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
      description: "Delete a FSx DataRepositoryAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx DataRepositoryAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::FSx::DataRepositoryAssociation",
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
      description: "Sync FSx DataRepositoryAssociation state from AWS",
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
        const identifier = existing.AssociationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::FSx::DataRepositoryAssociation",
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
