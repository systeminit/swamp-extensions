// Auto-generated extension model for @swamp/aws/directconnect/lag
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
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ProviderName: z.string().describe(
    "The name of the service provider associated with the requested LAG.",
  ).optional(),
  RequestMACSec: z.boolean().describe(
    "Indicates whether you want the LAG to support MAC Security (MACsec).",
  ).optional(),
  ConnectionsBandwidth: z.string().regex(new RegExp("^[1-9][0-9]*(M|G)bps$"))
    .describe(
      "The bandwidth of the individual physical dedicated connections bundled by the LAG.",
    ),
  LagName: z.string().regex(new RegExp("^[\\w \\-_,\\/]{1,200}$")).describe(
    "The name of the LAG.",
  ),
  MinimumLinks: z.number().int().describe(
    "The minimum number of physical dedicated connections that must be operational for the LAG itself to be operational.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the LAG.")
    .optional(),
  Location: z.string().regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "The location for the LAG.",
  ),
});

const StateSchema = z.object({
  LagId: z.string().optional(),
  ProviderName: z.string().optional(),
  RequestMACSec: z.boolean().optional(),
  ConnectionsBandwidth: z.string().optional(),
  LagArn: z.string(),
  LagName: z.string().optional(),
  MinimumLinks: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  LagState: z.string().optional(),
  Location: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ProviderName: z.string().describe(
    "The name of the service provider associated with the requested LAG.",
  ).optional(),
  RequestMACSec: z.boolean().describe(
    "Indicates whether you want the LAG to support MAC Security (MACsec).",
  ).optional(),
  ConnectionsBandwidth: z.string().regex(new RegExp("^[1-9][0-9]*(M|G)bps$"))
    .describe(
      "The bandwidth of the individual physical dedicated connections bundled by the LAG.",
    ).optional(),
  LagName: z.string().regex(new RegExp("^[\\w \\-_,\\/]{1,200}$")).describe(
    "The name of the LAG.",
  ).optional(),
  MinimumLinks: z.number().int().describe(
    "The minimum number of physical dedicated connections that must be operational for the LAG itself to be operational.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the LAG.")
    .optional(),
  Location: z.string().regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "The location for the LAG.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/directconnect/lag",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DirectConnect Lag resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DirectConnect Lag",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DirectConnect::Lag",
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
      description: "Get a DirectConnect Lag",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DirectConnect Lag",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DirectConnect::Lag",
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
      description: "Update a DirectConnect Lag",
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
        const identifier = existing.LagArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DirectConnect::Lag",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DirectConnect::Lag",
          identifier,
          currentState,
          desiredState,
          ["ConnectionsBandwidth", "Location", "ProviderName", "RequestMACSec"],
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
      description: "Delete a DirectConnect Lag",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DirectConnect Lag",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DirectConnect::Lag",
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
      description: "Sync DirectConnect Lag state from AWS",
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
        const identifier = existing.LagArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DirectConnect::Lag",
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
