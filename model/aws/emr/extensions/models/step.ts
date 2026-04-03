// Auto-generated extension model for @swamp/aws/emr/step
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

export const KeyValueSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ActionOnFailure: z.string().describe(
    "This specifies what action to take when the cluster step fails. Possible values are CANCEL_AND_WAIT and CONTINUE.",
  ),
  HadoopJarStep: z.object({
    Args: z.array(z.string()).optional(),
    Jar: z.string(),
    MainClass: z.string().optional(),
    StepProperties: z.array(KeyValueSchema).optional(),
  }).describe(
    "The HadoopJarStepConfig property type specifies a job flow step consisting of a JAR file whose main function will be executed. The main function submits a job for the cluster to execute as a step on the master node, and then waits for the job to finish or fail before executing subsequent steps.",
  ),
  JobFlowId: z.string().describe(
    "A string that uniquely identifies the cluster (job flow).",
  ),
  Name: z.string().describe("The name of the cluster step."),
  LogUri: z.string().describe(
    "The Amazon S3 destination URI for log publishing. When omitted, EMR falls back to cluster-level logging behavior.",
  ).optional(),
  EncryptionKeyArn: z.string().describe(
    "The KMS key ARN to encrypt the logs published to the given Amazon S3 destination. When omitted, EMR falls back to cluster-level logging behavior.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  ActionOnFailure: z.string().optional(),
  HadoopJarStep: z.object({
    Args: z.array(z.string()),
    Jar: z.string(),
    MainClass: z.string(),
    StepProperties: z.array(KeyValueSchema),
  }).optional(),
  JobFlowId: z.string().optional(),
  Name: z.string().optional(),
  LogUri: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ActionOnFailure: z.string().describe(
    "This specifies what action to take when the cluster step fails. Possible values are CANCEL_AND_WAIT and CONTINUE.",
  ).optional(),
  HadoopJarStep: z.object({
    Args: z.array(z.string()).optional(),
    Jar: z.string().optional(),
    MainClass: z.string().optional(),
    StepProperties: z.array(KeyValueSchema).optional(),
  }).describe(
    "The HadoopJarStepConfig property type specifies a job flow step consisting of a JAR file whose main function will be executed. The main function submits a job for the cluster to execute as a step on the master node, and then waits for the job to finish or fail before executing subsequent steps.",
  ).optional(),
  JobFlowId: z.string().describe(
    "A string that uniquely identifies the cluster (job flow).",
  ).optional(),
  Name: z.string().describe("The name of the cluster step.").optional(),
  LogUri: z.string().describe(
    "The Amazon S3 destination URI for log publishing. When omitted, EMR falls back to cluster-level logging behavior.",
  ).optional(),
  EncryptionKeyArn: z.string().describe(
    "The KMS key ARN to encrypt the logs published to the given Amazon S3 destination. When omitted, EMR falls back to cluster-level logging behavior.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/emr/step",
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
      description: "EMR Step resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR Step",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EMR::Step",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a EMR Step",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Step",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EMR::Step",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a EMR Step",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Step",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EMR::Step",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync EMR Step state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMR::Step",
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
