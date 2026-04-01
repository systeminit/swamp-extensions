// Auto-generated extension model for @swamp/aws/networkfirewall/firewall-policy
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

export const DimensionSchema = z.object({
  Value: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_ ]+$")),
});

export const PublishMetricActionSchema = z.object({
  Dimensions: z.array(DimensionSchema),
});

export const ActionDefinitionSchema = z.object({
  PublishMetricAction: PublishMetricActionSchema.optional(),
});

export const CustomActionSchema = z.object({
  ActionName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9]+$")),
  ActionDefinition: ActionDefinitionSchema,
});

export const StatelessRuleGroupReferenceSchema = z.object({
  ResourceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN."),
  Priority: z.number().int().min(1).max(65535),
});

export const StatefulRuleGroupOverrideSchema = z.object({
  Action: z.enum(["DROP_TO_ALERT"]).optional(),
});

export const StatefulRuleGroupReferenceSchema = z.object({
  ResourceArn: z.string().min(1).max(256).regex(new RegExp("^(arn:aws.*)$"))
    .describe("A resource ARN."),
  Priority: z.number().int().min(1).max(65535).optional(),
  Override: StatefulRuleGroupOverrideSchema.optional(),
  DeepThreatInspection: z.boolean().optional(),
});

export const StatefulEngineOptionsSchema = z.object({
  RuleOrder: z.enum(["DEFAULT_ACTION_ORDER", "STRICT_ORDER"]).optional(),
  StreamExceptionPolicy: z.enum(["DROP", "CONTINUE", "REJECT"]).optional(),
  FlowTimeouts: z.object({
    TcpIdleTimeoutSeconds: z.number().int().min(60).max(6000).optional(),
  }).optional(),
});

export const IPSetSchema = z.object({
  Definition: z.array(z.string().min(1).regex(new RegExp("^.*$"))).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^.*$")),
  Value: z.string().min(0).max(255).regex(new RegExp("^.*$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FirewallPolicyName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()),
    StatelessFragmentDefaultActions: z.array(z.string()),
    StatelessCustomActions: z.array(CustomActionSchema).optional(),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema)
      .optional(),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema)
      .optional(),
    StatefulDefaultActions: z.array(z.string()).optional(),
    StatefulEngineOptions: StatefulEngineOptionsSchema.optional(),
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), IPSetSchema).optional(),
    }).optional(),
    TLSInspectionConfigurationArn: z.string().min(1).max(256).regex(
      new RegExp("^(arn:aws.*)$"),
    ).describe("A resource ARN.").optional(),
    EnableTLSSessionHolding: z.boolean().optional(),
  }),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  FirewallPolicyName: z.string().optional(),
  FirewallPolicyArn: z.string(),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()),
    StatelessFragmentDefaultActions: z.array(z.string()),
    StatelessCustomActions: z.array(CustomActionSchema),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema),
    StatefulDefaultActions: z.array(z.string()),
    StatefulEngineOptions: StatefulEngineOptionsSchema,
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), z.unknown()),
    }),
    TLSInspectionConfigurationArn: z.string(),
    EnableTLSSessionHolding: z.boolean(),
  }).optional(),
  FirewallPolicyId: z.string().optional(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FirewallPolicyName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).optional(),
  FirewallPolicy: z.object({
    StatelessDefaultActions: z.array(z.string()).optional(),
    StatelessFragmentDefaultActions: z.array(z.string()).optional(),
    StatelessCustomActions: z.array(CustomActionSchema).optional(),
    StatelessRuleGroupReferences: z.array(StatelessRuleGroupReferenceSchema)
      .optional(),
    StatefulRuleGroupReferences: z.array(StatefulRuleGroupReferenceSchema)
      .optional(),
    StatefulDefaultActions: z.array(z.string()).optional(),
    StatefulEngineOptions: StatefulEngineOptionsSchema.optional(),
    PolicyVariables: z.object({
      RuleVariables: z.record(z.string(), IPSetSchema).optional(),
    }).optional(),
    TLSInspectionConfigurationArn: z.string().min(1).max(256).regex(
      new RegExp("^(arn:aws.*)$"),
    ).describe("A resource ARN.").optional(),
    EnableTLSSessionHolding: z.boolean().optional(),
  }).optional(),
  Description: z.string().min(1).max(512).regex(new RegExp("^.*$")).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/networkfirewall/firewall-policy",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "NetworkFirewall FirewallPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkFirewall FirewallPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Get a NetworkFirewall FirewallPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall FirewallPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Update a NetworkFirewall FirewallPolicy",
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
        const identifier = existing.FirewallPolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkFirewall::FirewallPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::NetworkFirewall::FirewallPolicy",
          identifier,
          currentState,
          desiredState,
          ["FirewallPolicyName"],
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
      description: "Delete a NetworkFirewall FirewallPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall FirewallPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::NetworkFirewall::FirewallPolicy",
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
      description: "Sync NetworkFirewall FirewallPolicy state from AWS",
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
        const identifier = existing.FirewallPolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkFirewall::FirewallPolicy",
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
