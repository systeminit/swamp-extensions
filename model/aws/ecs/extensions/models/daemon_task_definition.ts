// Auto-generated extension model for @swamp/aws/ecs/daemon-task-definition
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

export const HostVolumePropertiesSchema = z.object({
  SourcePath: z.string().optional(),
});

export const VolumeSchema = z.object({
  Host: HostVolumePropertiesSchema.optional(),
  Name: z.string().optional(),
});

export const SecretSchema = z.object({
  ValueFrom: z.string(),
  Name: z.string(),
});

export const HealthCheckSchema = z.object({
  Command: z.array(z.string()).optional(),
  Timeout: z.number().int().optional(),
  Retries: z.number().int().optional(),
  Interval: z.number().int().optional(),
  StartPeriod: z.number().int().optional(),
});

export const LogConfigurationSchema = z.object({
  SecretOptions: z.array(SecretSchema).optional(),
  Options: z.record(z.string(), z.string()).optional(),
  LogDriver: z.string(),
});

export const EnvironmentFileSchema = z.object({
  Type: z.string().optional(),
  Value: z.string().optional(),
});

export const FirelensConfigurationSchema = z.object({
  Options: z.record(z.string(), z.string()).optional(),
  Type: z.string().optional(),
});

export const SystemControlSchema = z.object({
  Value: z.string().optional(),
  Namespace: z.string().optional(),
});

export const UlimitSchema = z.object({
  SoftLimit: z.number().int(),
  HardLimit: z.number().int(),
  Name: z.string(),
});

export const RepositoryCredentialsSchema = z.object({
  CredentialsParameter: z.string().optional(),
});

export const KernelCapabilitiesSchema = z.object({
  Add: z.array(z.string()).optional(),
  Drop: z.array(z.string()).optional(),
});

export const TmpfsSchema = z.object({
  Size: z.number().int(),
  ContainerPath: z.string().optional(),
  MountOptions: z.array(z.string()).optional(),
});

export const DeviceSchema = z.object({
  HostPath: z.string().optional(),
  Permissions: z.array(z.string()).optional(),
  ContainerPath: z.string().optional(),
});

export const LinuxParametersSchema = z.object({
  Capabilities: KernelCapabilitiesSchema.optional(),
  Tmpfs: z.array(TmpfsSchema).optional(),
  Devices: z.array(DeviceSchema).optional(),
  InitProcessEnabled: z.boolean().optional(),
});

export const RestartPolicySchema = z.object({
  IgnoredExitCodes: z.array(z.number().int()).optional(),
  RestartAttemptPeriod: z.number().int().optional(),
  Enabled: z.boolean().optional(),
});

export const MountPointSchema = z.object({
  ReadOnly: z.boolean().optional(),
  SourceVolume: z.string().optional(),
  ContainerPath: z.string().optional(),
});

export const ContainerDependencySchema = z.object({
  Condition: z.string().optional(),
  ContainerName: z.string().optional(),
});

export const KeyValuePairSchema = z.object({
  Value: z.string().optional(),
  Name: z.string().optional(),
});

export const DaemonContainerDefinitionSchema = z.object({
  User: z.string().optional(),
  Secrets: z.array(SecretSchema).optional(),
  Memory: z.number().int().optional(),
  Privileged: z.boolean().optional(),
  StartTimeout: z.number().int().optional(),
  HealthCheck: HealthCheckSchema.optional(),
  Cpu: z.number().int().optional(),
  EntryPoint: z.array(z.string()).optional(),
  ReadonlyRootFilesystem: z.boolean().optional(),
  Image: z.string(),
  Essential: z.boolean().optional(),
  LogConfiguration: LogConfigurationSchema.optional(),
  EnvironmentFiles: z.array(EnvironmentFileSchema).optional(),
  Name: z.string(),
  FirelensConfiguration: FirelensConfigurationSchema.optional(),
  SystemControls: z.array(SystemControlSchema).optional(),
  Interactive: z.boolean().optional(),
  Ulimits: z.array(UlimitSchema).optional(),
  StopTimeout: z.number().int().optional(),
  WorkingDirectory: z.string().optional(),
  MemoryReservation: z.number().int().optional(),
  RepositoryCredentials: RepositoryCredentialsSchema.optional(),
  LinuxParameters: LinuxParametersSchema.optional(),
  RestartPolicy: RestartPolicySchema.optional(),
  PseudoTerminal: z.boolean().optional(),
  MountPoints: z.array(MountPointSchema).optional(),
  DependsOn: z.array(ContainerDependencySchema).optional(),
  Command: z.array(z.string()).optional(),
  Environment: z.array(KeyValuePairSchema).optional(),
});

export const TagSchema = z.object({
  Value: z.string().optional(),
  Key: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ExecutionRoleArn: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  Memory: z.string().optional(),
  ContainerDefinitions: z.array(DaemonContainerDefinitionSchema).optional(),
  Family: z.string().optional(),
  Cpu: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ExecutionRoleArn: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  DaemonTaskDefinitionArn: z.string(),
  Volumes: z.array(VolumeSchema).optional(),
  Memory: z.string().optional(),
  ContainerDefinitions: z.array(DaemonContainerDefinitionSchema).optional(),
  Family: z.string().optional(),
  Cpu: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  Memory: z.string().optional(),
  ContainerDefinitions: z.array(DaemonContainerDefinitionSchema).optional(),
  Family: z.string().optional(),
  Cpu: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/ecs/daemon-task-definition",
  version: "2026.04.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECS DaemonTaskDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECS DaemonTaskDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ECS::DaemonTaskDefinition",
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
      description: "Get a ECS DaemonTaskDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS DaemonTaskDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ECS::DaemonTaskDefinition",
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
      description: "Update a ECS DaemonTaskDefinition",
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
        const identifier = existing.DaemonTaskDefinitionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECS::DaemonTaskDefinition",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECS::DaemonTaskDefinition",
          identifier,
          currentState,
          desiredState,
          [
            "Family",
            "ContainerDefinitions",
            "Cpu",
            "Memory",
            "ExecutionRoleArn",
            "TaskRoleArn",
            "Volumes",
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
      description: "Delete a ECS DaemonTaskDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS DaemonTaskDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ECS::DaemonTaskDefinition",
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
      description: "Sync ECS DaemonTaskDefinition state from AWS",
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
        const identifier = existing.DaemonTaskDefinitionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECS::DaemonTaskDefinition",
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
