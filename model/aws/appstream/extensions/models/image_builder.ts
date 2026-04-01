// Auto-generated extension model for @swamp/aws/appstream/image-builder
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

export const AccessEndpointSchema = z.object({
  EndpointType: z.string(),
  VpceId: z.string(),
});

const GlobalArgsSchema = z.object({
  Description: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  EnableDefaultInternetAccess: z.boolean().optional(),
  DomainJoinInfo: z.object({
    OrganizationalUnitDistinguishedName: z.string().optional(),
    DirectoryName: z.string().optional(),
  }).optional(),
  AppstreamAgentVersion: z.string().optional(),
  Name: z.string(),
  ImageName: z.string().optional(),
  DisplayName: z.string().optional(),
  IamRoleArn: z.string().optional(),
  InstanceType: z.string(),
  Tags: z.array(TagSchema).optional(),
  ImageArn: z.string().optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).optional(),
  SoftwaresToInstall: z.array(z.string()).optional(),
  SoftwaresToUninstall: z.array(z.string()).optional(),
  RootVolumeConfig: z.object({
    VolumeSizeInGb: z.number().int().optional(),
  }).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
  EnableDefaultInternetAccess: z.boolean().optional(),
  DomainJoinInfo: z.object({
    OrganizationalUnitDistinguishedName: z.string(),
    DirectoryName: z.string(),
  }).optional(),
  AppstreamAgentVersion: z.string().optional(),
  Name: z.string(),
  ImageName: z.string().optional(),
  DisplayName: z.string().optional(),
  IamRoleArn: z.string().optional(),
  InstanceType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  StreamingUrl: z.string().optional(),
  ImageArn: z.string().optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).optional(),
  SoftwaresToInstall: z.array(z.string()).optional(),
  SoftwaresToUninstall: z.array(z.string()).optional(),
  RootVolumeConfig: z.object({
    VolumeSizeInGb: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
  }).optional(),
  EnableDefaultInternetAccess: z.boolean().optional(),
  DomainJoinInfo: z.object({
    OrganizationalUnitDistinguishedName: z.string().optional(),
    DirectoryName: z.string().optional(),
  }).optional(),
  AppstreamAgentVersion: z.string().optional(),
  Name: z.string().optional(),
  ImageName: z.string().optional(),
  DisplayName: z.string().optional(),
  IamRoleArn: z.string().optional(),
  InstanceType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ImageArn: z.string().optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).optional(),
  SoftwaresToInstall: z.array(z.string()).optional(),
  SoftwaresToUninstall: z.array(z.string()).optional(),
  RootVolumeConfig: z.object({
    VolumeSizeInGb: z.number().int().optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/appstream/image-builder",
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
      description: "AppStream ImageBuilder resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppStream ImageBuilder",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppStream::ImageBuilder",
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
      description: "Get a AppStream ImageBuilder",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream ImageBuilder",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppStream::ImageBuilder",
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
    delete: {
      description: "Delete a AppStream ImageBuilder",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream ImageBuilder",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppStream::ImageBuilder",
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
      description: "Sync AppStream ImageBuilder state from AWS",
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
            "AWS::AppStream::ImageBuilder",
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
