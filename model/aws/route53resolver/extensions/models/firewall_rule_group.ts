// Auto-generated extension model for @swamp/aws/route53resolver/firewall-rule-group
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

export const FirewallRuleSchema = z.object({
  FirewallDomainListId: z.string().min(1).max(64).describe("ResourceId")
    .optional(),
  FirewallThreatProtectionId: z.string().min(1).max(64).describe("ResourceId")
    .optional(),
  Priority: z.number().int().describe("Rule Priority"),
  Action: z.enum(["ALLOW", "BLOCK", "ALERT"]).describe("Rule Action"),
  BlockResponse: z.enum(["NODATA", "NXDOMAIN", "OVERRIDE"]).describe(
    "BlockResponse",
  ).optional(),
  BlockOverrideDomain: z.string().min(1).max(255).describe(
    "BlockOverrideDomain",
  ).optional(),
  BlockOverrideDnsType: z.enum(["CNAME"]).describe("BlockOverrideDnsType")
    .optional(),
  BlockOverrideTtl: z.number().int().min(0).max(604800).describe(
    "BlockOverrideTtl",
  ).optional(),
  Qtype: z.string().min(1).max(16).describe("Qtype").optional(),
  ConfidenceThreshold: z.enum(["LOW", "MEDIUM", "HIGH"]).describe(
    "FirewallDomainRedirectionAction",
  ).optional(),
  DnsThreatProtection: z.enum(["DGA", "DNS_TUNNELING", "DICTIONARY_DGA"])
    .describe("FirewallDomainRedirectionAction").optional(),
  FirewallDomainRedirectionAction: z.enum([
    "INSPECT_REDIRECTION_DOMAIN",
    "TRUST_REDIRECTION_DOMAIN",
  ]).describe("FirewallDomainRedirectionAction").optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(255).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9\\-_' ']+)"),
  ).describe("FirewallRuleGroupName").optional(),
  FirewallRules: z.array(FirewallRuleSchema).describe("FirewallRules")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags").optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  Name: z.string().optional(),
  RuleCount: z.number().optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  OwnerId: z.string().optional(),
  ShareStatus: z.string().optional(),
  CreatorRequestId: z.string().optional(),
  CreationTime: z.string().optional(),
  ModificationTime: z.string().optional(),
  FirewallRules: z.array(FirewallRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9\\-_' ']+)"),
  ).describe("FirewallRuleGroupName").optional(),
  FirewallRules: z.array(FirewallRuleSchema).describe("FirewallRules")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags").optional(),
});

export const model = {
  type: "@swamp/aws/route53resolver/firewall-rule-group",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Route53Resolver FirewallRuleGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53Resolver FirewallRuleGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Route53Resolver FirewallRuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53Resolver FirewallRuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Route53Resolver FirewallRuleGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
        const currentState = await readResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Route53Resolver FirewallRuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53Resolver FirewallRuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync Route53Resolver FirewallRuleGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
            "AWS::Route53Resolver::FirewallRuleGroup",
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
