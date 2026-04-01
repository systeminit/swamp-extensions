// Auto-generated extension model for @swamp/aws/mwaaserverless/workflow
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
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*$"),
  ).optional(),
  Description: z.string().min(1).max(1024).regex(new RegExp("^.+$")).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(1),
    ObjectKey: z.string().min(1),
    VersionId: z.string().optional(),
  }),
  RoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(?:-(?:cn|us-gov|iso|iso-b|iso-e|iso-f))?:iam::[0-9]{12}:role(/[a-zA-Z0-9+=,.@_-]{1,512})*?/[a-zA-Z0-9+=,.@_-]{1,64}$",
    ),
  ),
  EncryptionConfiguration: z.object({
    Type: z.enum(["AWS_MANAGED_KEY", "CUSTOMER_MANAGED_KEY"]),
    KmsKeyId: z.string().optional(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().min(1),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of key-value pairs to be applied as tags",
  ).optional(),
  TriggerMode: z.string().min(1).max(255).optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  WorkflowArn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string(),
    ObjectKey: z.string(),
    VersionId: z.string(),
  }).optional(),
  RoleArn: z.string().optional(),
  EncryptionConfiguration: z.object({
    Type: z.string(),
    KmsKeyId: z.string(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string(),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
  WorkflowVersion: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TriggerMode: z.string().optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string(),
  }).optional(),
  WorkflowStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  ModifiedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*$"),
  ).optional(),
  Description: z.string().min(1).max(1024).regex(new RegExp("^.+$")).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().min(1).optional(),
    ObjectKey: z.string().min(1).optional(),
    VersionId: z.string().optional(),
  }).optional(),
  RoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(?:-(?:cn|us-gov|iso|iso-b|iso-e|iso-f))?:iam::[0-9]{12}:role(/[a-zA-Z0-9+=,.@_-]{1,512})*?/[a-zA-Z0-9+=,.@_-]{1,64}$",
    ),
  ).optional(),
  EncryptionConfiguration: z.object({
    Type: z.enum(["AWS_MANAGED_KEY", "CUSTOMER_MANAGED_KEY"]).optional(),
    KmsKeyId: z.string().optional(),
  }).optional(),
  LoggingConfiguration: z.object({
    LogGroupName: z.string().min(1).optional(),
  }).optional(),
  NetworkConfiguration: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A map of key-value pairs to be applied as tags",
  ).optional(),
  TriggerMode: z.string().min(1).max(255).optional(),
  ScheduleConfiguration: z.object({
    CronExpression: z.string().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/mwaaserverless/workflow",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MWAAServerless Workflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MWAAServerless Workflow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MWAAServerless::Workflow",
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
      description: "Get a MWAAServerless Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAAServerless Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MWAAServerless::Workflow",
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
      description: "Update a MWAAServerless Workflow",
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
        const identifier = existing.WorkflowArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MWAAServerless::Workflow",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MWAAServerless::Workflow",
          identifier,
          currentState,
          desiredState,
          ["Name", "EncryptionConfiguration"],
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
      description: "Delete a MWAAServerless Workflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MWAAServerless Workflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MWAAServerless::Workflow",
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
      description: "Sync MWAAServerless Workflow state from AWS",
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
        const identifier = existing.WorkflowArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MWAAServerless::Workflow",
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
