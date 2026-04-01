// Auto-generated extension model for @swamp/aws/ssm/maintenance-window-task
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

export const TargetSchema = z.object({
  Values: z.array(z.string()),
  Key: z.string(),
});

export const MaintenanceWindowStepFunctionsParametersSchema = z.object({
  Input: z.string().optional(),
  Name: z.string().optional(),
});

export const CloudWatchOutputConfigSchema = z.object({
  CloudWatchOutputEnabled: z.boolean().describe(
    "Enables Systems Manager to send command output to CloudWatch Logs.",
  ).optional(),
  CloudWatchLogGroupName: z.string().describe(
    "The name of the CloudWatch log group where you want to send command output.",
  ).optional(),
});

export const NotificationConfigSchema = z.object({
  NotificationEvents: z.array(z.string()).optional(),
  NotificationArn: z.string(),
  NotificationType: z.string().optional(),
});

export const MaintenanceWindowRunCommandParametersSchema = z.object({
  TimeoutSeconds: z.number().int().optional(),
  Comment: z.string().optional(),
  OutputS3KeyPrefix: z.string().optional(),
  Parameters: z.string().optional(),
  CloudWatchOutputConfig: CloudWatchOutputConfigSchema.optional(),
  DocumentHashType: z.string().optional(),
  ServiceRoleArn: z.string().optional(),
  NotificationConfig: NotificationConfigSchema.optional(),
  DocumentVersion: z.string().optional(),
  OutputS3BucketName: z.string().optional(),
  DocumentHash: z.string().optional(),
});

export const MaintenanceWindowLambdaParametersSchema = z.object({
  Qualifier: z.string().optional(),
  Payload: z.string().optional(),
  ClientContext: z.string().optional(),
});

export const MaintenanceWindowAutomationParametersSchema = z.object({
  Parameters: z.string().optional(),
  DocumentVersion: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  MaxErrors: z.string().describe(
    "The maximum number of errors allowed before this task stops being scheduled.",
  ).optional(),
  Description: z.string().describe("A description of the task.").optional(),
  ServiceRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM service role for AWS Systems Manager to assume when running a maintenance window task.",
  ).optional(),
  Priority: z.number().int().describe(
    "The priority of the task in the maintenance window. The lower the number, the higher the priority. Tasks that have the same priority are scheduled in parallel.",
  ),
  MaxConcurrency: z.string().describe(
    "The maximum number of targets this task can be run for, in parallel.",
  ).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets (either instances or window target ids).",
  ).optional(),
  Name: z.string().describe("The task name.").optional(),
  TaskArn: z.string().describe(
    "The resource that the task uses during execution.",
  ),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema.optional(),
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema.optional(),
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema
      .optional(),
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema.optional(),
  }).describe(
    "The parameters to pass to the task when it runs. Populate only the fields that match the task type. All other fields should be empty.",
  ).optional(),
  WindowId: z.string().describe(
    "The ID of the maintenance window where the task is registered.",
  ),
  TaskParameters: z.string().describe(
    "The parameters to pass to the task when it runs.",
  ).optional(),
  TaskType: z.string().describe("The type of task."),
  CutoffBehavior: z.string().describe(
    "The specification for whether tasks should continue to run after the cutoff time specified in the maintenance windows is reached.",
  ).optional(),
  LoggingInfo: z.object({
    Region: z.string(),
    S3Prefix: z.string().optional(),
    S3Bucket: z.string(),
  }).describe(
    "Information about an Amazon S3 bucket to write Run Command task-level logs to.",
  ).optional(),
});

const StateSchema = z.object({
  MaxErrors: z.string().optional(),
  Description: z.string().optional(),
  ServiceRoleArn: z.string().optional(),
  Priority: z.number().optional(),
  MaxConcurrency: z.string().optional(),
  Targets: z.array(TargetSchema).optional(),
  Name: z.string().optional(),
  TaskArn: z.string().optional(),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema,
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema,
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema,
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema,
  }).optional(),
  WindowId: z.string(),
  TaskParameters: z.string().optional(),
  TaskType: z.string().optional(),
  CutoffBehavior: z.string().optional(),
  WindowTaskId: z.string(),
  LoggingInfo: z.object({
    Region: z.string(),
    S3Prefix: z.string(),
    S3Bucket: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  MaxErrors: z.string().describe(
    "The maximum number of errors allowed before this task stops being scheduled.",
  ).optional(),
  Description: z.string().describe("A description of the task.").optional(),
  ServiceRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM service role for AWS Systems Manager to assume when running a maintenance window task.",
  ).optional(),
  Priority: z.number().int().describe(
    "The priority of the task in the maintenance window. The lower the number, the higher the priority. Tasks that have the same priority are scheduled in parallel.",
  ).optional(),
  MaxConcurrency: z.string().describe(
    "The maximum number of targets this task can be run for, in parallel.",
  ).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets (either instances or window target ids).",
  ).optional(),
  Name: z.string().describe("The task name.").optional(),
  TaskArn: z.string().describe(
    "The resource that the task uses during execution.",
  ).optional(),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema.optional(),
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema.optional(),
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema
      .optional(),
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema.optional(),
  }).describe(
    "The parameters to pass to the task when it runs. Populate only the fields that match the task type. All other fields should be empty.",
  ).optional(),
  WindowId: z.string().describe(
    "The ID of the maintenance window where the task is registered.",
  ).optional(),
  TaskParameters: z.string().describe(
    "The parameters to pass to the task when it runs.",
  ).optional(),
  TaskType: z.string().describe("The type of task.").optional(),
  CutoffBehavior: z.string().describe(
    "The specification for whether tasks should continue to run after the cutoff time specified in the maintenance windows is reached.",
  ).optional(),
  LoggingInfo: z.object({
    Region: z.string().optional(),
    S3Prefix: z.string().optional(),
    S3Bucket: z.string().optional(),
  }).describe(
    "Information about an Amazon S3 bucket to write Run Command task-level logs to.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ssm/maintenance-window-task",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSM MaintenanceWindowTask resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM MaintenanceWindowTask",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Get a SSM MaintenanceWindowTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM MaintenanceWindowTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Update a SSM MaintenanceWindowTask",
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
        const idParts = [
          existing.WindowId?.toString(),
          existing.WindowTaskId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SSM::MaintenanceWindowTask",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSM::MaintenanceWindowTask",
          identifier,
          currentState,
          desiredState,
          ["WindowId", "TaskType"],
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
      description: "Delete a SSM MaintenanceWindowTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM MaintenanceWindowTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Sync SSM MaintenanceWindowTask state from AWS",
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
        const idParts = [
          existing.WindowId?.toString(),
          existing.WindowTaskId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SSM::MaintenanceWindowTask",
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
