// Auto-generated extension model for @swamp/aws/backup/backup-selection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const ConditionResourceTypeSchema = z.object({
  ConditionKey: z.string(),
  ConditionValue: z.string(),
  ConditionType: z.string(),
});

export const ConditionParameterSchema = z.object({
  ConditionKey: z.string().optional(),
  ConditionValue: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BackupPlanId: z.string(),
  BackupSelection: z.object({
    IamRoleArn: z.string(),
    ListOfTags: z.array(ConditionResourceTypeSchema).optional(),
    Resources: z.array(z.string()).optional(),
    SelectionName: z.string(),
    NotResources: z.array(z.string()).optional(),
    Conditions: z.object({
      StringEquals: z.array(ConditionParameterSchema).optional(),
      StringNotEquals: z.array(ConditionParameterSchema).optional(),
      StringLike: z.array(ConditionParameterSchema).optional(),
      StringNotLike: z.array(ConditionParameterSchema).optional(),
    }).optional(),
  }),
});

const StateSchema = z.object({
  Id: z.string(),
  BackupPlanId: z.string().optional(),
  BackupSelection: z.object({
    IamRoleArn: z.string(),
    ListOfTags: z.array(ConditionResourceTypeSchema),
    Resources: z.array(z.string()),
    SelectionName: z.string(),
    NotResources: z.array(z.string()),
    Conditions: z.object({
      StringEquals: z.array(ConditionParameterSchema),
      StringNotEquals: z.array(ConditionParameterSchema),
      StringLike: z.array(ConditionParameterSchema),
      StringNotLike: z.array(ConditionParameterSchema),
    }),
  }).optional(),
  SelectionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BackupPlanId: z.string().optional(),
  BackupSelection: z.object({
    IamRoleArn: z.string().optional(),
    ListOfTags: z.array(ConditionResourceTypeSchema).optional(),
    Resources: z.array(z.string()).optional(),
    SelectionName: z.string().optional(),
    NotResources: z.array(z.string()).optional(),
    Conditions: z.object({
      StringEquals: z.array(ConditionParameterSchema).optional(),
      StringNotEquals: z.array(ConditionParameterSchema).optional(),
      StringLike: z.array(ConditionParameterSchema).optional(),
      StringNotLike: z.array(ConditionParameterSchema).optional(),
    }).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/backup/backup-selection",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Backup BackupSelection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Backup BackupSelection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Backup::BackupSelection",
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
      description: "Get a Backup BackupSelection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup BackupSelection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Backup::BackupSelection",
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
      description: "Delete a Backup BackupSelection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup BackupSelection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Backup::BackupSelection",
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
      description: "Sync Backup BackupSelection state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Backup::BackupSelection",
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
