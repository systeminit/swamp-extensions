// Auto-generated extension model for @swamp/aws/ssm/resource-data-sync
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

export const AwsOrganizationsSourceSchema = z.object({
  OrganizationalUnits: z.array(z.string()).optional(),
  OrganizationSourceType: z.string().min(1).max(64),
});

const GlobalArgsSchema = z.object({
  S3Destination: z.object({
    KMSKeyArn: z.string().min(1).max(512).optional(),
    BucketPrefix: z.string().min(1).max(256).optional(),
    BucketName: z.string().min(1).max(2048),
    BucketRegion: z.string().min(1).max(64),
    SyncFormat: z.string().min(1).max(1024),
  }).optional(),
  KMSKeyArn: z.string().min(0).max(512).optional(),
  SyncSource: z.object({
    IncludeFutureRegions: z.boolean().optional(),
    SourceRegions: z.array(z.string()),
    SourceType: z.string().min(1).max(64),
    AwsOrganizationsSource: AwsOrganizationsSourceSchema.optional(),
  }).optional(),
  BucketName: z.string().min(1).max(2048).optional(),
  BucketRegion: z.string().min(1).max(64).optional(),
  SyncFormat: z.string().min(0).max(1024).optional(),
  SyncName: z.string().min(1).max(64),
  SyncType: z.string().min(1).max(64).optional(),
  BucketPrefix: z.string().min(0).max(64).optional(),
});

const StateSchema = z.object({
  S3Destination: z.object({
    KMSKeyArn: z.string(),
    BucketPrefix: z.string(),
    BucketName: z.string(),
    BucketRegion: z.string(),
    SyncFormat: z.string(),
  }).optional(),
  KMSKeyArn: z.string().optional(),
  SyncSource: z.object({
    IncludeFutureRegions: z.boolean(),
    SourceRegions: z.array(z.string()),
    SourceType: z.string(),
    AwsOrganizationsSource: AwsOrganizationsSourceSchema,
  }).optional(),
  BucketName: z.string().optional(),
  BucketRegion: z.string().optional(),
  SyncFormat: z.string().optional(),
  SyncName: z.string(),
  SyncType: z.string().optional(),
  BucketPrefix: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  S3Destination: z.object({
    KMSKeyArn: z.string().min(1).max(512).optional(),
    BucketPrefix: z.string().min(1).max(256).optional(),
    BucketName: z.string().min(1).max(2048).optional(),
    BucketRegion: z.string().min(1).max(64).optional(),
    SyncFormat: z.string().min(1).max(1024).optional(),
  }).optional(),
  KMSKeyArn: z.string().min(0).max(512).optional(),
  SyncSource: z.object({
    IncludeFutureRegions: z.boolean().optional(),
    SourceRegions: z.array(z.string()).optional(),
    SourceType: z.string().min(1).max(64).optional(),
    AwsOrganizationsSource: AwsOrganizationsSourceSchema.optional(),
  }).optional(),
  BucketName: z.string().min(1).max(2048).optional(),
  BucketRegion: z.string().min(1).max(64).optional(),
  SyncFormat: z.string().min(0).max(1024).optional(),
  SyncName: z.string().min(1).max(64).optional(),
  SyncType: z.string().min(1).max(64).optional(),
  BucketPrefix: z.string().min(0).max(64).optional(),
});

export const model = {
  type: "@swamp/aws/ssm/resource-data-sync",
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
      description: "SSM ResourceDataSync resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM ResourceDataSync",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSM::ResourceDataSync",
          desiredState,
        ) as StateData;
        const instanceName = (result.SyncName ?? g.SyncName)?.toString() ??
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
      description: "Get a SSM ResourceDataSync",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM ResourceDataSync",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSM::ResourceDataSync",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.SyncName ?? context.globalArgs.SyncName)?.toString() ??
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
      description: "Update a SSM ResourceDataSync",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.SyncName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SyncName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSM::ResourceDataSync",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSM::ResourceDataSync",
          identifier,
          currentState,
          desiredState,
          [
            "KMSKeyArn",
            "SyncFormat",
            "BucketPrefix",
            "SyncName",
            "BucketRegion",
            "BucketName",
            "S3Destination",
            "SyncType",
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
      description: "Delete a SSM ResourceDataSync",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM ResourceDataSync",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSM::ResourceDataSync",
          args.identifier,
        );
        const instanceName = context.globalArgs.SyncName?.toString() ??
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
      description: "Sync SSM ResourceDataSync state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.SyncName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SyncName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSM::ResourceDataSync",
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
