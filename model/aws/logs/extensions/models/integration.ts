// Auto-generated extension model for @swamp/aws/logs/integration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const OpenSearchResourceConfigSchema = z.object({
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).optional(),
  DataSourceRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ),
  DashboardViewerPrincipals: z.array(
    z.string().min(20).max(2048).regex(new RegExp("[\\w#+=/:,.@-]*\\*?")),
  ),
  ApplicationARN: z.string().min(20).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).optional(),
  RetentionDays: z.number().int().min(1).max(3650).optional(),
});

const GlobalArgsSchema = z.object({
  IntegrationName: z.string().min(1).max(50).regex(
    new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
  ).describe(
    "User provided identifier for integration, unique to the user account.",
  ),
  IntegrationType: z.enum(["OPENSEARCH"]).describe(
    "The type of the Integration.",
  ),
  ResourceConfig: z.object({
    OpenSearchResourceConfig: OpenSearchResourceConfigSchema.optional(),
  }).describe("OpenSearchResourceConfig for the given Integration"),
});

const StateSchema = z.object({
  IntegrationName: z.string(),
  IntegrationType: z.string().optional(),
  ResourceConfig: z.object({
    OpenSearchResourceConfig: OpenSearchResourceConfigSchema,
  }).optional(),
  IntegrationStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  IntegrationName: z.string().min(1).max(50).regex(
    new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
  ).describe(
    "User provided identifier for integration, unique to the user account.",
  ).optional(),
  IntegrationType: z.enum(["OPENSEARCH"]).describe(
    "The type of the Integration.",
  ).optional(),
  ResourceConfig: z.object({
    OpenSearchResourceConfig: OpenSearchResourceConfigSchema.optional(),
  }).describe("OpenSearchResourceConfig for the given Integration").optional(),
});

export const model = {
  type: "@swamp/aws/logs/integration",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Logs Integration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs Integration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Logs::Integration",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.IntegrationName ?? g.IntegrationName)?.toString() ??
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
      description: "Get a Logs Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Logs::Integration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.IntegrationName ?? context.globalArgs.IntegrationName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Logs Integration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs Integration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Logs::Integration",
          args.identifier,
        );
        const instanceName = context.globalArgs.IntegrationName?.toString() ??
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
      description: "Sync Logs Integration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.IntegrationName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.IntegrationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::Integration",
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
