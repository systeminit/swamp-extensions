// Auto-generated extension model for @swamp/aws/ecr/pull-time-update-exclusion
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECR PullTimeUpdateExclusion (AWS::ECR::PullTimeUpdateExclusion).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  PrincipalArn: z.string().max(200).regex(
    new RegExp(
      "^arn:aws(-[a-z]+)*:iam::[0-9]{12}:(role|user)/[\\w+=,.@-]+(/[\\w+=,.@-]+)*$",
    ),
  ).describe(
    "The ARN of the IAM principal to remove from the pull time update exclusion list.",
  ),
});

const StateSchema = z.object({
  PrincipalArn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  PrincipalArn: z.string().max(200).regex(
    new RegExp(
      "^arn:aws(-[a-z]+)*:iam::[0-9]{12}:(role|user)/[\\w+=,.@-]+(/[\\w+=,.@-]+)*$",
    ),
  ).describe(
    "The ARN of the IAM principal to remove from the pull time update exclusion list.",
  ).optional(),
});

/** Swamp extension model for ECR PullTimeUpdateExclusion. Registered at `@swamp/aws/ecr/pull-time-update-exclusion`. */
export const model = {
  type: "@swamp/aws/ecr/pull-time-update-exclusion",
  version: "2026.04.23.2",
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
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECR PullTimeUpdateExclusion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECR PullTimeUpdateExclusion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ECR::PullTimeUpdateExclusion",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.PrincipalArn ?? g.PrincipalArn)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ECR PullTimeUpdateExclusion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PullTimeUpdateExclusion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ECR::PullTimeUpdateExclusion",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.PrincipalArn ?? context.globalArgs.PrincipalArn)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a ECR PullTimeUpdateExclusion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PullTimeUpdateExclusion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ECR::PullTimeUpdateExclusion",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.PrincipalArn?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync ECR PullTimeUpdateExclusion state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.PrincipalArn?.toString() ?? "current").replace(
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
        const identifier = existing.PrincipalArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECR::PullTimeUpdateExclusion",
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
