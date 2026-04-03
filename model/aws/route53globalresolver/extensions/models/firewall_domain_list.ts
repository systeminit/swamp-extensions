// Auto-generated extension model for @swamp/aws/route53globalresolver/firewall-domain-list
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

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9-_' ']+)"),
  ),
  Description: z.string().min(1).max(256).optional(),
  GlobalResolverId: z.string().min(1).max(64),
  Domains: z.array(z.string().min(1).max(255)).describe(
    "An inline list of domains to use for this domain list.",
  ).optional(),
  DomainFileUrl: z.string().min(1).max(1024).describe(
    "S3 URL to import domains from.",
  ).optional(),
  ClientToken: z.string().min(1).max(256).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  FirewallDomainListId: z.string(),
  Arn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  GlobalResolverId: z.string().optional(),
  DomainCount: z.number().optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Domains: z.array(z.string()).optional(),
  DomainFileUrl: z.string().optional(),
  ClientToken: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9-_' ']+)"),
  ).optional(),
  Description: z.string().min(1).max(256).optional(),
  GlobalResolverId: z.string().min(1).max(64).optional(),
  Domains: z.array(z.string().min(1).max(255)).describe(
    "An inline list of domains to use for this domain list.",
  ).optional(),
  DomainFileUrl: z.string().min(1).max(1024).describe(
    "S3 URL to import domains from.",
  ).optional(),
  ClientToken: z.string().min(1).max(256).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/route53globalresolver/firewall-domain-list",
  version: "2026.04.03.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Route53GlobalResolver FirewallDomainList resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53GlobalResolver FirewallDomainList",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Route53GlobalResolver::FirewallDomainList",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Route53GlobalResolver FirewallDomainList",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53GlobalResolver FirewallDomainList",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Route53GlobalResolver::FirewallDomainList",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Route53GlobalResolver FirewallDomainList",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.FirewallDomainListId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Route53GlobalResolver::FirewallDomainList",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Route53GlobalResolver::FirewallDomainList",
          identifier,
          currentState,
          desiredState,
          ["GlobalResolverId", "Name", "Description", "ClientToken"],
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
      description: "Delete a Route53GlobalResolver FirewallDomainList",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53GlobalResolver FirewallDomainList",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Route53GlobalResolver::FirewallDomainList",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description:
        "Sync Route53GlobalResolver FirewallDomainList state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.FirewallDomainListId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Route53GlobalResolver::FirewallDomainList",
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
