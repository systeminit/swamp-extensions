// Auto-generated extension model for @swamp/aws/connect/security-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

export const ApplicationSchema = z.object({
  ApplicationPermissions: z.array(z.string().min(1).max(128)).describe(
    "The permissions that the agent is granted on the application",
  ),
  Namespace: z.string().min(1).max(128).describe(
    "Namespace of the application that you want to give access to.",
  ),
  Type: z.enum(["MCP", "THIRD_PARTY_APPLICATION"]).describe(
    "The type of the application.",
  ).optional(),
});

export const FlowModuleSchema = z.object({
  Type: z.string().min(1).max(128).describe(
    "The type of the first-party application",
  ),
  FlowModuleId: z.string().min(1).max(128).describe(
    "The identifier of the application that you want to give access to.",
  ),
});

export const PrimaryAttributeValueSchema = z.object({
  AccessType: z.enum(["ALLOW"]).describe(
    'Specifies the type of access granted. Currently, only "ALLOW" is supported',
  ),
  AttributeName: z.string().min(1).max(127).regex(
    new RegExp("^(?!aws:|connect:)[\\p{L}\\p{Z}\\p{N}\\-_.:=@'|]+$", "u"),
  ).describe("The name of the primary attribute."),
  Values: z.array(
    z.string().min(1).max(1000).regex(
      new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+$"),
    ),
  ).describe(
    "An array of allowed primary values for the specified primary attribute.",
  ),
});

export const PrimaryAttributeAccessControlConfigurationItemSchema = z.object({
  PrimaryAttributeValues: z.array(PrimaryAttributeValueSchema).describe(
    "An array of PrimaryAttributeValue objects.",
  ),
});

export const DataTableAccessControlConfigurationSchema = z.object({
  PrimaryAttributeAccessControlConfiguration:
    PrimaryAttributeAccessControlConfigurationItemSchema.describe(
      "Contains the configuration for record-based access control.",
    ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AllowedAccessControlTags: z.array(TagSchema).describe(
    "The list of tags that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Description: z.string().min(0).max(250).describe(
    "The description of the security profile.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Permissions: z.array(z.string().min(1).max(128)).describe(
    "Permissions assigned to the security profile.",
  ).optional(),
  SecurityProfileName: z.string().min(1).max(127).regex(
    new RegExp("^[ a-zA-Z0-9_@-]+$"),
  ).describe("The name of the security profile."),
  TagRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies tag restrictions to in Amazon Connect.",
  ).optional(),
  HierarchyRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect.",
  ).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().min(0).max(127).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).describe(
    "The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "A list of third-party applications that the security profile will give access to.",
  ).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).describe(
    "The list of flow-module resources to be linked to a security profile in Amazon Connect.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema.describe(
        "Defines the access control configuration for data tables.",
      ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  AllowedAccessControlTags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  InstanceArn: z.string().optional(),
  Permissions: z.array(z.string()).optional(),
  SecurityProfileArn: z.string(),
  SecurityProfileName: z.string().optional(),
  TagRestrictedResources: z.array(z.string()).optional(),
  HierarchyRestrictedResources: z.array(z.string()).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().optional(),
  Applications: z.array(ApplicationSchema).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  LastModifiedRegion: z.string().optional(),
  LastModifiedTime: z.number().optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AllowedAccessControlTags: z.array(TagSchema).describe(
    "The list of tags that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Description: z.string().min(0).max(250).describe(
    "The description of the security profile.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Permissions: z.array(z.string().min(1).max(128)).describe(
    "Permissions assigned to the security profile.",
  ).optional(),
  SecurityProfileName: z.string().min(1).max(127).regex(
    new RegExp("^[ a-zA-Z0-9_@-]+$"),
  ).describe("The name of the security profile.").optional(),
  TagRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies tag restrictions to in Amazon Connect.",
  ).optional(),
  HierarchyRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect.",
  ).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().min(0).max(127).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).describe(
    "The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "A list of third-party applications that the security profile will give access to.",
  ).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).describe(
    "The list of flow-module resources to be linked to a security profile in Amazon Connect.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema.describe(
        "Defines the access control configuration for data tables.",
      ).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/connect/security-profile",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect SecurityProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect SecurityProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::SecurityProfile",
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
      description: "Get a Connect SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::SecurityProfile",
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
      description: "Update a Connect SecurityProfile",
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
        const identifier = existing.SecurityProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::SecurityProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::SecurityProfile",
          identifier,
          currentState,
          desiredState,
          ["SecurityProfileName", "InstanceArn"],
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
      description: "Delete a Connect SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::SecurityProfile",
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
      description: "Sync Connect SecurityProfile state from AWS",
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
        const identifier = existing.SecurityProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::SecurityProfile",
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
