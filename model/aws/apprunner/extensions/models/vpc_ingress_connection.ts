// Auto-generated extension model for @swamp/aws/apprunner/vpc-ingress-connection
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
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  VpcIngressConnectionName: z.string().min(4).max(40).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9\\-_]{3,39}"),
  ).describe("The customer-provided Vpc Ingress Connection name.").optional(),
  ServiceArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[0-9]{12}:(\\w|/|-){1,1011}",
    ),
  ).describe("The Amazon Resource Name (ARN) of the service."),
  IngressVpcConfiguration: z.object({
    VpcId: z.string().describe(
      "The ID of the VPC that the VPC endpoint is used in.",
    ),
    VpcEndpointId: z.string().describe(
      "The ID of the VPC endpoint that your App Runner service connects to.",
    ),
  }).describe("The configuration of customer’s VPC and related VPC endpoint"),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  VpcIngressConnectionArn: z.string(),
  VpcIngressConnectionName: z.string().optional(),
  ServiceArn: z.string().optional(),
  Status: z.string().optional(),
  DomainName: z.string().optional(),
  IngressVpcConfiguration: z.object({
    VpcId: z.string(),
    VpcEndpointId: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  VpcIngressConnectionName: z.string().min(4).max(40).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9\\-_]{3,39}"),
  ).describe("The customer-provided Vpc Ingress Connection name.").optional(),
  ServiceArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[0-9]{12}:(\\w|/|-){1,1011}",
    ),
  ).describe("The Amazon Resource Name (ARN) of the service.").optional(),
  IngressVpcConfiguration: z.object({
    VpcId: z.string().describe(
      "The ID of the VPC that the VPC endpoint is used in.",
    ).optional(),
    VpcEndpointId: z.string().describe(
      "The ID of the VPC endpoint that your App Runner service connects to.",
    ).optional(),
  }).describe("The configuration of customer’s VPC and related VPC endpoint")
    .optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/apprunner/vpc-ingress-connection",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppRunner VpcIngressConnection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppRunner VpcIngressConnection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppRunner::VpcIngressConnection",
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
      description: "Get a AppRunner VpcIngressConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner VpcIngressConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppRunner::VpcIngressConnection",
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
      description: "Update a AppRunner VpcIngressConnection",
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
        const identifier = existing.VpcIngressConnectionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppRunner::VpcIngressConnection",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppRunner::VpcIngressConnection",
          identifier,
          currentState,
          desiredState,
          ["VpcIngressConnectionName", "ServiceArn", "Tags"],
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
      description: "Delete a AppRunner VpcIngressConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner VpcIngressConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppRunner::VpcIngressConnection",
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
      description: "Sync AppRunner VpcIngressConnection state from AWS",
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
        const identifier = existing.VpcIngressConnectionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppRunner::VpcIngressConnection",
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
