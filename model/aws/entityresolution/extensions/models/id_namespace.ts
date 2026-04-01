// Auto-generated extension model for @swamp/aws/entityresolution/id-namespace
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

export const IdNamespaceInputSourceSchema = z.object({
  InputSourceARN: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):entityresolution:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(matchingworkflow/[a-zA-Z_0-9-]{1,255})$|^arn:(aws|aws-us-gov|aws-cn):glue:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(table/[a-zA-Z_0-9-]{1,255}/[a-zA-Z_0-9-]{1,255})$",
    ),
  ),
  SchemaName: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z_0-9-]*$"))
    .optional(),
});

export const RuleSchema = z.object({
  RuleName: z.string().min(0).max(255).regex(
    new RegExp("^[a-zA-Z_0-9- \\t]*$"),
  ),
  MatchingKeys: z.array(
    z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9- \\t]*$")),
  ),
});

export const NamespaceRuleBasedPropertiesSchema = z.object({
  Rules: z.array(RuleSchema).optional(),
  RuleDefinitionTypes: z.array(z.enum(["SOURCE", "TARGET"])).optional(),
  AttributeMatchingModel: z.enum(["ONE_TO_ONE", "MANY_TO_MANY"]).optional(),
  RecordMatchingModels: z.array(
    z.enum(["ONE_SOURCE_TO_ONE_TARGET", "MANY_SOURCE_TO_ONE_TARGET"]),
  ).optional(),
});

export const NamespaceProviderPropertiesSchema = z.object({
  ProviderServiceArn: z.string().min(20).max(255).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):(entityresolution):([a-z]{2}-[a-z]{1,10}-[0-9])::providerservice/([a-zA-Z0-9_-]{1,255})/([a-zA-Z0-9_-]{1,255})$",
    ),
  ),
  ProviderConfiguration: z.record(z.string(), z.string()).describe(
    "Additional Provider configuration that would be required for the provider service. The Configuration must be in JSON string format.",
  ).optional(),
});

export const IdNamespaceIdMappingWorkflowPropertiesSchema = z.object({
  IdMappingType: z.enum(["PROVIDER", "RULE_BASED"]),
  RuleBasedProperties: NamespaceRuleBasedPropertiesSchema.optional(),
  ProviderProperties: NamespaceProviderPropertiesSchema.optional(),
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
  IdNamespaceName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_0-9-]*$"),
  ),
  Description: z.string().min(0).max(255).optional(),
  InputSourceConfig: z.array(IdNamespaceInputSourceSchema).optional(),
  IdMappingWorkflowProperties: z.array(
    IdNamespaceIdMappingWorkflowPropertiesSchema,
  ).optional(),
  Type: z.enum(["SOURCE", "TARGET"]),
  RoleArn: z.string().min(32).max(512).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  IdNamespaceName: z.string(),
  Description: z.string().optional(),
  InputSourceConfig: z.array(IdNamespaceInputSourceSchema).optional(),
  IdMappingWorkflowProperties: z.array(
    IdNamespaceIdMappingWorkflowPropertiesSchema,
  ).optional(),
  Type: z.string().optional(),
  RoleArn: z.string().optional(),
  IdNamespaceArn: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  IdNamespaceName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_0-9-]*$"),
  ).optional(),
  Description: z.string().min(0).max(255).optional(),
  InputSourceConfig: z.array(IdNamespaceInputSourceSchema).optional(),
  IdMappingWorkflowProperties: z.array(
    IdNamespaceIdMappingWorkflowPropertiesSchema,
  ).optional(),
  Type: z.enum(["SOURCE", "TARGET"]).optional(),
  RoleArn: z.string().min(32).max(512).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/entityresolution/id-namespace",
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
      description: "EntityResolution IdNamespace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EntityResolution IdNamespace",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EntityResolution::IdNamespace",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.IdNamespaceName ?? g.IdNamespaceName)?.toString() ??
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
      description: "Get a EntityResolution IdNamespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution IdNamespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EntityResolution::IdNamespace",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.IdNamespaceName ?? context.globalArgs.IdNamespaceName)
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
      description: "Update a EntityResolution IdNamespace",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.IdNamespaceName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.IdNamespaceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EntityResolution::IdNamespace",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EntityResolution::IdNamespace",
          identifier,
          currentState,
          desiredState,
          ["IdNamespaceName"],
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
      description: "Delete a EntityResolution IdNamespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution IdNamespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EntityResolution::IdNamespace",
          args.identifier,
        );
        const instanceName = context.globalArgs.IdNamespaceName?.toString() ??
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
      description: "Sync EntityResolution IdNamespace state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.IdNamespaceName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.IdNamespaceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EntityResolution::IdNamespace",
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
