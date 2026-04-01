// Auto-generated extension model for @swamp/aws/simspaceweaver/simulation
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
  Name: z.string().min(1).max(2048).regex(
    new RegExp("[a-zA-Z0-9_\\-]{1,2048}$"),
  ).describe("The name of the simulation."),
  RoleArn: z.string().describe("Role ARN."),
  SchemaS3Location: z.object({
    BucketName: z.string().min(3).max(63).regex(
      new RegExp("[a-zA-Z0-9_\\-]{3,63}$"),
    ).describe("The Schema S3 bucket name."),
    ObjectKey: z.string().min(3).max(255).describe(
      'This is the schema S3 object key, which includes the full path of "folders" from the bucket root to the schema.',
    ),
  }).optional(),
  MaximumDuration: z.string().min(2).max(6).describe(
    "The maximum running time of the simulation.",
  ).optional(),
  SnapshotS3Location: z.object({
    BucketName: z.string().min(3).max(63).regex(
      new RegExp("[a-zA-Z0-9_\\-]{3,63}$"),
    ).describe("The Schema S3 bucket name."),
    ObjectKey: z.string().min(3).max(255).describe(
      'This is the schema S3 object key, which includes the full path of "folders" from the bucket root to the schema.',
    ),
  }).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  RoleArn: z.string().optional(),
  SchemaS3Location: z.object({
    BucketName: z.string(),
    ObjectKey: z.string(),
  }).optional(),
  DescribePayload: z.string().optional(),
  MaximumDuration: z.string().optional(),
  SnapshotS3Location: z.object({
    BucketName: z.string(),
    ObjectKey: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(1).max(2048).regex(
    new RegExp("[a-zA-Z0-9_\\-]{1,2048}$"),
  ).describe("The name of the simulation.").optional(),
  RoleArn: z.string().describe("Role ARN.").optional(),
  SchemaS3Location: z.object({
    BucketName: z.string().min(3).max(63).regex(
      new RegExp("[a-zA-Z0-9_\\-]{3,63}$"),
    ).describe("The Schema S3 bucket name.").optional(),
    ObjectKey: z.string().min(3).max(255).describe(
      'This is the schema S3 object key, which includes the full path of "folders" from the bucket root to the schema.',
    ).optional(),
  }).optional(),
  MaximumDuration: z.string().min(2).max(6).describe(
    "The maximum running time of the simulation.",
  ).optional(),
  SnapshotS3Location: z.object({
    BucketName: z.string().min(3).max(63).regex(
      new RegExp("[a-zA-Z0-9_\\-]{3,63}$"),
    ).describe("The Schema S3 bucket name.").optional(),
    ObjectKey: z.string().min(3).max(255).describe(
      'This is the schema S3 object key, which includes the full path of "folders" from the bucket root to the schema.',
    ).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/simspaceweaver/simulation",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SimSpaceWeaver Simulation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SimSpaceWeaver Simulation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SimSpaceWeaver::Simulation",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SimSpaceWeaver Simulation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SimSpaceWeaver Simulation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SimSpaceWeaver::Simulation",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a SimSpaceWeaver Simulation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SimSpaceWeaver::Simulation",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SimSpaceWeaver::Simulation",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "RoleArn",
            "SchemaS3Location",
            "SnapshotS3Location",
            "MaximumDuration",
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
      description: "Delete a SimSpaceWeaver Simulation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SimSpaceWeaver Simulation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SimSpaceWeaver::Simulation",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description: "Sync SimSpaceWeaver Simulation state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SimSpaceWeaver::Simulation",
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
