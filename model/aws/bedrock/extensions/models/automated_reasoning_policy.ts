// Auto-generated extension model for @swamp/aws/bedrock/automated-reasoning-policy
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

export const PolicyDefinitionTypeValueSchema = z.object({
  Value: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("The value of the type value."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of the type's value.",
  ).optional(),
});

export const PolicyDefinitionTypeSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A name for this type."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of this type.",
  ).optional(),
  Values: z.array(PolicyDefinitionTypeValueSchema).describe(
    "A list of valid values for this type.",
  ),
});

export const PolicyDefinitionRuleSchema = z.object({
  Id: z.string().min(12).max(12).regex(new RegExp("^[A-Z][0-9A-Z]{11}$"))
    .describe("A unique id within the PolicyDefinition"),
  Expression: z.string().max(2048).regex(new RegExp("^[\\s\\S]+$")).describe(
    "The SMT expression for this rule",
  ),
  AlternateExpression: z.string().max(2048).regex(new RegExp("^[\\s\\S]+$"))
    .describe("An alternate expression for this rule").optional(),
});

export const PolicyDefinitionVariableSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A name from this variable."),
  Type: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A type for this variable."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of this variable.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Tag Key"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Tag Value"),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_ ]+$")),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).optional(),
  PolicyDefinition: z.object({
    Types: z.array(PolicyDefinitionTypeSchema).describe(
      "The types definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Rules: z.array(PolicyDefinitionRuleSchema).describe(
      "The rules definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Variables: z.array(PolicyDefinitionVariableSchema).describe(
      "The variables definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
  }).optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)$",
    ),
  ).describe(
    "The KMS key with which the Policy's assets will be encrypted at rest.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().describe(
    "Specifies whether to force delete the automated reasoning policy even if it has active resources. When false, Amazon Bedrock validates if all artifacts have been deleted (e.g. policy version, test case, test result) for a policy before deletion. When true, Amazon Bedrock will delete the policy and all its artifacts without validation. Default is false",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  PolicyDefinition: z.object({
    Version: z.string(),
    Types: z.array(PolicyDefinitionTypeSchema),
    Rules: z.array(PolicyDefinitionRuleSchema),
    Variables: z.array(PolicyDefinitionVariableSchema),
  }).optional(),
  PolicyArn: z.string(),
  KmsKeyId: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Version: z.string().optional(),
  DefinitionHash: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  PolicyId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_ ]+$"))
    .optional(),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).optional(),
  PolicyDefinition: z.object({
    Types: z.array(PolicyDefinitionTypeSchema).describe(
      "The types definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Rules: z.array(PolicyDefinitionRuleSchema).describe(
      "The rules definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Variables: z.array(PolicyDefinitionVariableSchema).describe(
      "The variables definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
  }).optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)$",
    ),
  ).describe(
    "The KMS key with which the Policy's assets will be encrypted at rest.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().describe(
    "Specifies whether to force delete the automated reasoning policy even if it has active resources. When false, Amazon Bedrock validates if all artifacts have been deleted (e.g. policy version, test case, test result) for a policy before deletion. When true, Amazon Bedrock will delete the policy and all its artifacts without validation. Default is false",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/bedrock/automated-reasoning-policy",
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
      description: "Bedrock AutomatedReasoningPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock AutomatedReasoningPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Get a Bedrock AutomatedReasoningPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock AutomatedReasoningPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Update a Bedrock AutomatedReasoningPolicy",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyId", "ForceDelete"],
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
      description: "Delete a Bedrock AutomatedReasoningPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock AutomatedReasoningPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Sync Bedrock AutomatedReasoningPolicy state from AWS",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::AutomatedReasoningPolicy",
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
