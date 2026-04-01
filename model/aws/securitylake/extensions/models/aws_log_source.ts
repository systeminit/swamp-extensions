// Auto-generated extension model for @swamp/aws/securitylake/aws-log-source
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
  Accounts: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))).describe(
    "AWS account where you want to collect logs from.",
  ).optional(),
  DataLakeArn: z.string().min(1).max(256).describe(
    "The ARN for the data lake.",
  ),
  SourceName: z.string().describe(
    "The name for a AWS source. This must be a Regionally unique value.",
  ),
  SourceVersion: z.string().regex(new RegExp("^(latest|[0-9]\\.[0-9])$"))
    .describe(
      "The version for a AWS source. This must be a Regionally unique value.",
    ),
});

const StateSchema = z.object({
  Accounts: z.array(z.string()).optional(),
  DataLakeArn: z.string().optional(),
  SourceName: z.string(),
  SourceVersion: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Accounts: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))).describe(
    "AWS account where you want to collect logs from.",
  ).optional(),
  DataLakeArn: z.string().min(1).max(256).describe("The ARN for the data lake.")
    .optional(),
  SourceName: z.string().describe(
    "The name for a AWS source. This must be a Regionally unique value.",
  ).optional(),
  SourceVersion: z.string().regex(new RegExp("^(latest|[0-9]\\.[0-9])$"))
    .describe(
      "The version for a AWS source. This must be a Regionally unique value.",
    ).optional(),
});

export const model = {
  type: "@swamp/aws/securitylake/aws-log-source",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SecurityLake AwsLogSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityLake AwsLogSource",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SecurityLake::AwsLogSource",
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
      description: "Get a SecurityLake AwsLogSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake AwsLogSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SecurityLake::AwsLogSource",
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
      description: "Update a SecurityLake AwsLogSource",
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
          existing.SourceName?.toString(),
          existing.SourceVersion?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SecurityLake::AwsLogSource",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SecurityLake::AwsLogSource",
          identifier,
          currentState,
          desiredState,
          ["DataLakeArn", "SourceName", "SourceVersion"],
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
      description: "Delete a SecurityLake AwsLogSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake AwsLogSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SecurityLake::AwsLogSource",
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
      description: "Sync SecurityLake AwsLogSource state from AWS",
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
          existing.SourceName?.toString(),
          existing.SourceVersion?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SecurityLake::AwsLogSource",
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
