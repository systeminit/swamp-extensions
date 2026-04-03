// Auto-generated extension model for @swamp/aws/route53globalresolver/firewall-rule
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9-_' ']+)"),
  ),
  Description: z.string().min(1).max(256).optional(),
  Action: z.enum(["ALLOW", "ALERT", "BLOCK"]),
  BlockResponse: z.enum(["NODATA", "NXDOMAIN", "OVERRIDE"]).optional(),
  BlockOverrideDnsType: z.enum(["CNAME"]).optional(),
  BlockOverrideDomain: z.string().min(1).max(256).regex(
    new RegExp("\\*?[-a-zA-Z0-9.]+"),
  ).optional(),
  BlockOverrideTtl: z.number().int().min(0).max(604800).optional(),
  ConfidenceThreshold: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  DnsAdvancedProtection: z.enum(["DGA", "DNS_TUNNELING", "DICTIONARY_DGA"])
    .optional(),
  FirewallDomainListId: z.string().min(1).max(64).optional(),
  Priority: z.number().int().min(1).max(10000).optional(),
  DnsViewId: z.string().min(1).max(64),
  QType: z.string().min(0).max(16).optional(),
  ClientToken: z.string().min(1).max(256).optional(),
});

const StateSchema = z.object({
  FirewallRuleId: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Action: z.string().optional(),
  BlockResponse: z.string().optional(),
  BlockOverrideDnsType: z.string().optional(),
  BlockOverrideDomain: z.string().optional(),
  BlockOverrideTtl: z.number().optional(),
  ConfidenceThreshold: z.string().optional(),
  DnsAdvancedProtection: z.string().optional(),
  FirewallDomainListId: z.string().optional(),
  Priority: z.number().optional(),
  DnsViewId: z.string().optional(),
  QType: z.string().optional(),
  QueryType: z.string().optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  ClientToken: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9-_' ']+)"),
  ).optional(),
  Description: z.string().min(1).max(256).optional(),
  Action: z.enum(["ALLOW", "ALERT", "BLOCK"]).optional(),
  BlockResponse: z.enum(["NODATA", "NXDOMAIN", "OVERRIDE"]).optional(),
  BlockOverrideDnsType: z.enum(["CNAME"]).optional(),
  BlockOverrideDomain: z.string().min(1).max(256).regex(
    new RegExp("\\*?[-a-zA-Z0-9.]+"),
  ).optional(),
  BlockOverrideTtl: z.number().int().min(0).max(604800).optional(),
  ConfidenceThreshold: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  DnsAdvancedProtection: z.enum(["DGA", "DNS_TUNNELING", "DICTIONARY_DGA"])
    .optional(),
  FirewallDomainListId: z.string().min(1).max(64).optional(),
  Priority: z.number().int().min(1).max(10000).optional(),
  DnsViewId: z.string().min(1).max(64).optional(),
  QType: z.string().min(0).max(16).optional(),
  ClientToken: z.string().min(1).max(256).optional(),
});

export const model = {
  type: "@swamp/aws/route53globalresolver/firewall-rule",
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
      description: "Route53GlobalResolver FirewallRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53GlobalResolver FirewallRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Route53GlobalResolver::FirewallRule",
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
      description: "Get a Route53GlobalResolver FirewallRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53GlobalResolver FirewallRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Route53GlobalResolver::FirewallRule",
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
      description: "Update a Route53GlobalResolver FirewallRule",
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
        const identifier = existing.FirewallRuleId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Route53GlobalResolver::FirewallRule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Route53GlobalResolver::FirewallRule",
          identifier,
          currentState,
          desiredState,
          ["DnsViewId", "ClientToken", "FirewallDomainListId", "QType"],
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
      description: "Delete a Route53GlobalResolver FirewallRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53GlobalResolver FirewallRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Route53GlobalResolver::FirewallRule",
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
      description: "Sync Route53GlobalResolver FirewallRule state from AWS",
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
        const identifier = existing.FirewallRuleId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Route53GlobalResolver::FirewallRule",
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
