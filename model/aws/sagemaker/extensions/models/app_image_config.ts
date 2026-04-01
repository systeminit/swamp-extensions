// Auto-generated extension model for @swamp/aws/sagemaker/app-image-config
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

export const FileSystemConfigSchema = z.object({
  DefaultGid: z.number().int().min(0).max(65535).describe(
    "The default POSIX group ID (GID). If not specified, defaults to 100.",
  ).optional(),
  DefaultUid: z.number().int().min(0).max(65535).describe(
    "The default POSIX user ID (UID). If not specified, defaults to 1000.",
  ).optional(),
  MountPath: z.string().min(1).max(1024).regex(new RegExp("^/.*")).describe(
    "The path within the image to mount the user's EFS home directory. The directory should be empty. If not specified, defaults to /home/sagemaker-user.",
  ).optional(),
});

export const KernelSpecSchema = z.object({
  DisplayName: z.string().min(1).max(1024).describe(
    "The display name of the kernel.",
  ).optional(),
  Name: z.string().min(1).max(1024).describe("The name of the kernel."),
});

export const CustomImageContainerEnvironmentVariableSchema = z.object({
  Value: z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
  Key: z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
});

export const ContainerConfigSchema = z.object({
  ContainerArguments: z.array(
    z.string().min(1).max(64).regex(new RegExp("^(?!\\s*$).+")),
  ).describe("A list of arguments to apply to the container.").optional(),
  ContainerEntrypoint: z.array(
    z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
  ).describe("The custom entry point to use on container.").optional(),
  ContainerEnvironmentVariables: z.array(
    CustomImageContainerEnvironmentVariableSchema,
  ).describe("A list of variables to apply to the custom container.")
    .optional(),
});

export const TagSchema = z.object({
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
});

const GlobalArgsSchema = z.object({
  AppImageConfigName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig."),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema.describe(
      "The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.",
    ).optional(),
    KernelSpecs: z.array(KernelSpecSchema).describe(
      "The specification of the Jupyter kernels in the image.",
    ),
  }).describe("The KernelGatewayImageConfig.").optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The JupyterLabAppImageConfig.").optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The CodeEditorAppImageConfig.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the AppImageConfig.",
  ).optional(),
});

const StateSchema = z.object({
  AppImageConfigArn: z.string().optional(),
  AppImageConfigName: z.string(),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema,
    KernelSpecs: z.array(KernelSpecSchema),
  }).optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema,
  }).optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AppImageConfigName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig.").optional(),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema.describe(
      "The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.",
    ).optional(),
    KernelSpecs: z.array(KernelSpecSchema).describe(
      "The specification of the Jupyter kernels in the image.",
    ).optional(),
  }).describe("The KernelGatewayImageConfig.").optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The JupyterLabAppImageConfig.").optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The CodeEditorAppImageConfig.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the AppImageConfig.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/sagemaker/app-image-config",
  version: "2026.04.01.3",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker AppImageConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker AppImageConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SageMaker::AppImageConfig",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.AppImageConfigName ?? g.AppImageConfigName)?.toString() ??
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
      description: "Get a SageMaker AppImageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker AppImageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SageMaker::AppImageConfig",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.AppImageConfigName ?? context.globalArgs.AppImageConfigName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SageMaker AppImageConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AppImageConfigName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AppImageConfigName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::AppImageConfig",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::AppImageConfig",
          identifier,
          currentState,
          desiredState,
          ["AppImageConfigName"],
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
      description: "Delete a SageMaker AppImageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker AppImageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SageMaker::AppImageConfig",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.AppImageConfigName?.toString() ?? args.identifier;
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
      description: "Sync SageMaker AppImageConfig state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.AppImageConfigName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AppImageConfigName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::AppImageConfig",
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
