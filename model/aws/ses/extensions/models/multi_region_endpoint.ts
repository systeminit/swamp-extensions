// Auto-generated extension model for @swamp/aws/ses/multi-region-endpoint
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
  Key: z.string().min(1).max(128).describe(
    "One part of a key-value pair that defines a tag.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The optional part of a key-value pair that defines a tag.",
  ),
});

const GlobalArgsSchema = z.object({
  EndpointName: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-_]+$"))
    .describe("The name of the multi-region endpoint (global-endpoint)."),
  Tags: z.array(TagSchema).describe(
    "An Array of objects that define the tags (keys and values) to associate with the multi-region endpoint (global-endpoint).",
  ).optional(),
  Details: z.object({
    RouteDetails: z.array(z.object({
      Region: z.string().describe(
        "The name of an AWS-Region to be a secondary region for the multi-region endpoint (global-endpoint)",
      ),
    })).describe(
      "A list of route configuration details. Must contain exactly one route configuration",
    ),
  }).describe(
    "Contains details of a multi-region endpoint (global-endpoint) being created.",
  ),
});

const StateSchema = z.object({
  EndpointName: z.string(),
  Tags: z.array(TagSchema).optional(),
  Details: z.object({
    RouteDetails: z.array(z.object({
      Region: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  EndpointName: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-_]+$"))
    .describe("The name of the multi-region endpoint (global-endpoint).")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An Array of objects that define the tags (keys and values) to associate with the multi-region endpoint (global-endpoint).",
  ).optional(),
  Details: z.object({
    RouteDetails: z.array(z.object({
      Region: z.string().describe(
        "The name of an AWS-Region to be a secondary region for the multi-region endpoint (global-endpoint)",
      ).optional(),
    })).describe(
      "A list of route configuration details. Must contain exactly one route configuration",
    ).optional(),
  }).describe(
    "Contains details of a multi-region endpoint (global-endpoint) being created.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/ses/multi-region-endpoint",
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
      description: "SES MultiRegionEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES MultiRegionEndpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::MultiRegionEndpoint",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.EndpointName ?? g.EndpointName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SES MultiRegionEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MultiRegionEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SES::MultiRegionEndpoint",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.EndpointName ?? context.globalArgs.EndpointName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./,
              "_",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SES MultiRegionEndpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.EndpointName?.toString() ?? "current").replace(
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
        const identifier = existing.EndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::MultiRegionEndpoint",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::MultiRegionEndpoint",
          identifier,
          currentState,
          desiredState,
          ["EndpointName", "Details"],
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
      description: "Delete a SES MultiRegionEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES MultiRegionEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SES::MultiRegionEndpoint",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.EndpointName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync SES MultiRegionEndpoint state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.EndpointName?.toString() ?? "current").replace(
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
        const identifier = existing.EndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::MultiRegionEndpoint",
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
