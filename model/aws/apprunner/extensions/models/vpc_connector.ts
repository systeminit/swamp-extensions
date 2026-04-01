// Auto-generated extension model for @swamp/aws/apprunner/vpc-connector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const TagSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  VpcConnectorName: z.string().min(4).max(40).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9-\\\\_]{3,39}$"),
  ).describe(
    "A name for the VPC connector. If you don't specify a name, AWS CloudFormation generates a name for your VPC connector.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "A list of IDs of subnets that App Runner should use when it associates your service with a custom Amazon VPC. Specify IDs of subnets of a single Amazon VPC. App Runner determines the Amazon VPC from the subnets you specify.",
  ),
  SecurityGroups: z.array(z.string()).describe(
    "A list of IDs of security groups that App Runner should use for access to AWS resources under the specified subnets. If not specified, App Runner uses the default security group of the Amazon VPC. The default security group allows all outbound traffic.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of metadata items that you can associate with your VPC connector resource. A tag is a key-value pair.",
  ).optional(),
});

const StateSchema = z.object({
  VpcConnectorName: z.string().optional(),
  VpcConnectorArn: z.string(),
  VpcConnectorRevision: z.number().optional(),
  Subnets: z.array(z.string()).optional(),
  SecurityGroups: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  VpcConnectorName: z.string().min(4).max(40).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9-\\\\_]{3,39}$"),
  ).describe(
    "A name for the VPC connector. If you don't specify a name, AWS CloudFormation generates a name for your VPC connector.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "A list of IDs of subnets that App Runner should use when it associates your service with a custom Amazon VPC. Specify IDs of subnets of a single Amazon VPC. App Runner determines the Amazon VPC from the subnets you specify.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "A list of IDs of security groups that App Runner should use for access to AWS resources under the specified subnets. If not specified, App Runner uses the default security group of the Amazon VPC. The default security group allows all outbound traffic.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of metadata items that you can associate with your VPC connector resource. A tag is a key-value pair.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/apprunner/vpc-connector",
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
      description: "AppRunner VpcConnector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppRunner VpcConnector",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppRunner::VpcConnector",
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
      description: "Get a AppRunner VpcConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner VpcConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppRunner::VpcConnector",
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
      description: "Delete a AppRunner VpcConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner VpcConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppRunner::VpcConnector",
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
      description: "Sync AppRunner VpcConnector state from AWS",
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
        const identifier = existing.VpcConnectorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppRunner::VpcConnector",
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
