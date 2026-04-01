// Auto-generated extension model for @swamp/aws/elasticloadbalancingv2/trust-store-revocation
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const RevocationContentSchema = z.object({
  S3Bucket: z.string().optional(),
  S3Key: z.string().optional(),
  S3ObjectVersion: z.string().optional(),
  RevocationType: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  RevocationContents: z.array(RevocationContentSchema).describe(
    "The attributes required to create a trust store revocation.",
  ).optional(),
  TrustStoreArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the trust store.",
  ).optional(),
});

const StateSchema = z.object({
  RevocationContents: z.array(RevocationContentSchema).optional(),
  TrustStoreArn: z.string(),
  RevocationId: z.number(),
  TrustStoreRevocations: z.array(z.object({
    TrustStoreArn: z.string(),
    RevocationId: z.string(),
    RevocationType: z.string(),
    NumberOfRevokedEntries: z.number(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  RevocationContents: z.array(RevocationContentSchema).describe(
    "The attributes required to create a trust store revocation.",
  ).optional(),
  TrustStoreArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the trust store.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/elasticloadbalancingv2/trust-store-revocation",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElasticLoadBalancingV2 TrustStoreRevocation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancingV2 TrustStoreRevocation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElasticLoadBalancingV2::TrustStoreRevocation",
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
      description: "Get a ElasticLoadBalancingV2 TrustStoreRevocation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 TrustStoreRevocation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ElasticLoadBalancingV2::TrustStoreRevocation",
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
    delete: {
      description: "Delete a ElasticLoadBalancingV2 TrustStoreRevocation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 TrustStoreRevocation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancingV2::TrustStoreRevocation",
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
      description:
        "Sync ElasticLoadBalancingV2 TrustStoreRevocation state from AWS",
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
          existing.RevocationId?.toString(),
          existing.TrustStoreArn?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancingV2::TrustStoreRevocation",
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
