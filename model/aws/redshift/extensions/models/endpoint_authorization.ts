// Auto-generated extension model for @swamp/aws/redshift/endpoint-authorization
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
  Account: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The target AWS account ID to grant or revoke access for.",
  ),
  Force: z.boolean().describe(
    "Indicates whether to force the revoke action. If true, the Redshift-managed VPC endpoints associated with the endpoint authorization are also deleted.",
  ).optional(),
  VpcIds: z.array(z.string().regex(new RegExp("^vpc-[A-Za-z0-9]{1,17}$")))
    .describe(
      "The virtual private cloud (VPC) identifiers to grant or revoke access to.",
    ).optional(),
  ClusterIdentifier: z.string().regex(
    new RegExp("^(?=^[a-z][a-z0-9]*(-[a-z0-9]+)*$).{1,63}$"),
  ).describe("The cluster identifier."),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  Grantee: z.string().optional(),
  Account: z.string(),
  Grantor: z.string().optional(),
  EndpointCount: z.number().optional(),
  AuthorizeTime: z.string().optional(),
  AllowedVPCs: z.array(z.string()).optional(),
  Force: z.boolean().optional(),
  AllowedAllVPCs: z.boolean().optional(),
  VpcIds: z.array(z.string()).optional(),
  ClusterIdentifier: z.string(),
  ClusterStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Account: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The target AWS account ID to grant or revoke access for.",
  ).optional(),
  Force: z.boolean().describe(
    "Indicates whether to force the revoke action. If true, the Redshift-managed VPC endpoints associated with the endpoint authorization are also deleted.",
  ).optional(),
  VpcIds: z.array(z.string().regex(new RegExp("^vpc-[A-Za-z0-9]{1,17}$")))
    .describe(
      "The virtual private cloud (VPC) identifiers to grant or revoke access to.",
    ).optional(),
  ClusterIdentifier: z.string().regex(
    new RegExp("^(?=^[a-z][a-z0-9]*(-[a-z0-9]+)*$).{1,63}$"),
  ).describe("The cluster identifier.").optional(),
});

export const model = {
  type: "@swamp/aws/redshift/endpoint-authorization",
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
      description: "Redshift EndpointAuthorization resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift EndpointAuthorization",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Redshift::EndpointAuthorization",
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
      description: "Get a Redshift EndpointAuthorization",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EndpointAuthorization",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Redshift::EndpointAuthorization",
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
      description: "Update a Redshift EndpointAuthorization",
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
        const idParts = [
          existing.ClusterIdentifier?.toString(),
          existing.Account?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Redshift::EndpointAuthorization",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Redshift::EndpointAuthorization",
          identifier,
          currentState,
          desiredState,
          ["ClusterIdentifier", "Account"],
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
      description: "Delete a Redshift EndpointAuthorization",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EndpointAuthorization",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Redshift::EndpointAuthorization",
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
      description: "Sync Redshift EndpointAuthorization state from AWS",
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
        const idParts = [
          existing.ClusterIdentifier?.toString(),
          existing.Account?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Redshift::EndpointAuthorization",
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
