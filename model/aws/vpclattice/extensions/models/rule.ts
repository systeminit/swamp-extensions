// Auto-generated extension model for @swamp/aws/vpclattice/rule
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

export const WeightedTargetGroupSchema = z.object({
  TargetGroupIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((tg-[0-9a-z]{17})|(arn:[a-z0-9\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:targetgroup/tg-[0-9a-z]{17}))$",
    ),
  ),
  Weight: z.number().int().min(1).max(999).optional(),
});

export const ForwardSchema = z.object({
  TargetGroups: z.array(WeightedTargetGroupSchema),
});

export const FixedResponseSchema = z.object({
  StatusCode: z.number().int().min(100).max(599),
});

export const PathMatchTypeSchema = z.object({
  Exact: z.string().min(1).max(128).regex(
    new RegExp("^\\/[a-zA-Z0-9@:%_+.~#?&\\/=-]*$"),
  ).optional(),
  Prefix: z.string().min(1).max(128).regex(
    new RegExp("^\\/[a-zA-Z0-9@:%_+.~#?&\\/=-]*$"),
  ).optional(),
});

export const PathMatchSchema = z.object({
  Match: PathMatchTypeSchema,
  CaseSensitive: z.boolean().optional(),
});

export const HeaderMatchTypeSchema = z.object({
  Exact: z.string().min(1).max(128).optional(),
  Prefix: z.string().min(1).max(128).optional(),
  Contains: z.string().min(1).max(128).optional(),
});

export const HeaderMatchSchema = z.object({
  Name: z.string().min(1).max(40),
  Match: HeaderMatchTypeSchema,
  CaseSensitive: z.boolean().optional(),
});

export const HttpMatchSchema = z.object({
  Method: z.enum([
    "CONNECT",
    "DELETE",
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "TRACE",
  ]).optional(),
  PathMatch: PathMatchSchema.optional(),
  HeaderMatches: z.array(HeaderMatchSchema).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Action: z.object({
    Forward: ForwardSchema.optional(),
    FixedResponse: FixedResponseSchema.optional(),
  }),
  ListenerIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((listener-[0-9a-z]{17})|(arn(:[a-z0-9]+([.-][a-z0-9]+)*){2}(:([a-z0-9]+([.-][a-z0-9]+)*)?){2}:service/svc-[0-9a-z]{17}/listener/listener-[0-9a-z]{17}))$",
    ),
  ).optional(),
  Match: z.object({
    HttpMatch: HttpMatchSchema,
  }),
  Name: z.string().min(3).max(63).regex(
    new RegExp("^(?!rule-)(?![-])(?!.*[-]$)(?!.*[-]{2})[a-z0-9-]+$"),
  ).optional(),
  Priority: z.number().int().min(1).max(100),
  ServiceIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((svc-[0-9a-z]{17})|(arn(:[a-z0-9]+([.-][a-z0-9]+)*){2}(:([a-z0-9]+([.-][a-z0-9]+)*)?){2}:service/svc-[0-9a-z]{17}))$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Action: ForwardSchema.optional(),
  Arn: z.string(),
  Id: z.string().optional(),
  ListenerIdentifier: z.string().optional(),
  Match: HttpMatchSchema.optional(),
  Name: z.string().optional(),
  Priority: z.number().optional(),
  ServiceIdentifier: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Action: z.object({
    Forward: ForwardSchema.optional(),
    FixedResponse: FixedResponseSchema.optional(),
  }).optional(),
  ListenerIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((listener-[0-9a-z]{17})|(arn(:[a-z0-9]+([.-][a-z0-9]+)*){2}(:([a-z0-9]+([.-][a-z0-9]+)*)?){2}:service/svc-[0-9a-z]{17}/listener/listener-[0-9a-z]{17}))$",
    ),
  ).optional(),
  Match: z.object({
    HttpMatch: HttpMatchSchema.optional(),
  }).optional(),
  Name: z.string().min(3).max(63).regex(
    new RegExp("^(?!rule-)(?![-])(?!.*[-]$)(?!.*[-]{2})[a-z0-9-]+$"),
  ).optional(),
  Priority: z.number().int().min(1).max(100).optional(),
  ServiceIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((svc-[0-9a-z]{17})|(arn(:[a-z0-9]+([.-][a-z0-9]+)*){2}(:([a-z0-9]+([.-][a-z0-9]+)*)?){2}:service/svc-[0-9a-z]{17}))$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/vpclattice/rule",
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
      description: "VpcLattice Rule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a VpcLattice Rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::VpcLattice::Rule",
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
      description: "Get a VpcLattice Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VpcLattice Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::VpcLattice::Rule",
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
      description: "Update a VpcLattice Rule",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::VpcLattice::Rule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::VpcLattice::Rule",
          identifier,
          currentState,
          desiredState,
          ["ListenerIdentifier", "ServiceIdentifier", "Name"],
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
      description: "Delete a VpcLattice Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VpcLattice Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::VpcLattice::Rule",
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
      description: "Sync VpcLattice Rule state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::VpcLattice::Rule",
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
