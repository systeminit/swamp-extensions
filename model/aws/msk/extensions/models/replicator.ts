// Auto-generated extension model for @swamp/aws/msk/replicator
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

export const AmazonMskClusterSchema = z.object({
  MskClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("The ARN of an Amazon MSK cluster."),
});

export const KafkaClusterClientVpcConfigSchema = z.object({
  SecurityGroupIds: z.array(z.string()).describe(
    "The AWS security groups to associate with the elastic network interfaces in order to specify what the replicator has access to. If a security group is not specified, the default security group associated with the VPC is used.",
  ).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The list of subnets to connect to in the virtual private cloud (VPC). AWS creates elastic network interfaces inside these subnets.",
  ),
});

export const KafkaClusterSchema = z.object({
  AmazonMskCluster: AmazonMskClusterSchema.describe(
    "Details of an Amazon MSK cluster. Exactly one of AmazonMskCluster is required.",
  ),
  VpcConfig: KafkaClusterClientVpcConfigSchema.describe(
    "Details of an Amazon VPC which has network connectivity to the Apache Kafka cluster.",
  ),
});

export const ReplicationStartingPositionSchema = z.object({
  Type: z.enum(["LATEST", "EARLIEST"]).describe(
    "The type of replication starting position.",
  ).optional(),
});

export const ReplicationTopicNameConfigurationSchema = z.object({
  Type: z.enum(["PREFIXED_WITH_SOURCE_CLUSTER_ALIAS", "IDENTICAL"]).describe(
    "The type of replicated topic name.",
  ).optional(),
});

export const TopicReplicationSchema = z.object({
  TopicsToReplicate: z.array(z.string().max(249)).describe(
    "List of regular expression patterns indicating the topics to copy.",
  ),
  TopicsToExclude: z.array(z.string().max(249)).describe(
    "List of regular expression patterns indicating the topics that should not be replicated.",
  ).optional(),
  CopyTopicConfigurations: z.boolean().describe(
    "Whether to periodically configure remote topics to match their corresponding upstream topics.",
  ).optional(),
  CopyAccessControlListsForTopics: z.boolean().describe(
    "Whether to periodically configure remote topic ACLs to match their corresponding upstream topics.",
  ).optional(),
  DetectAndCopyNewTopics: z.boolean().describe(
    "Whether to periodically check for new topics and partitions.",
  ).optional(),
  StartingPosition: ReplicationStartingPositionSchema.describe(
    "Configuration for specifying the position in the topics to start replicating from.",
  ).optional(),
  TopicNameConfiguration: ReplicationTopicNameConfigurationSchema.describe(
    "Configuration for specifying replicated topic names should be the same as their corresponding upstream topics or prefixed with source cluster alias.",
  ).optional(),
});

export const ConsumerGroupReplicationSchema = z.object({
  ConsumerGroupsToReplicate: z.array(z.string().max(256)).describe(
    "List of regular expression patterns indicating the consumer groups to copy.",
  ),
  ConsumerGroupsToExclude: z.array(z.string().max(256)).describe(
    "List of regular expression patterns indicating the consumer groups that should not be replicated.",
  ).optional(),
  SynchroniseConsumerGroupOffsets: z.boolean().describe(
    "Whether to periodically write the translated offsets to __consumer_offsets topic in target cluster.",
  ).optional(),
  DetectAndCopyNewConsumerGroups: z.boolean().describe(
    "Whether to periodically check for new consumer groups.",
  ).optional(),
});

export const ReplicationInfoSchema = z.object({
  SourceKafkaClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("Amazon Resource Name of the source Kafka cluster."),
  TargetKafkaClusterArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):kafka:.*"),
  ).describe("Amazon Resource Name of the target Kafka cluster."),
  TargetCompressionType: z.enum(["NONE", "GZIP", "SNAPPY", "LZ4", "ZSTD"])
    .describe(
      "The type of compression to use writing records to target Kafka cluster.",
    ),
  TopicReplication: TopicReplicationSchema.describe(
    "Configuration relating to topic replication.",
  ),
  ConsumerGroupReplication: ConsumerGroupReplicationSchema.describe(
    "Configuration relating to consumer group replication.",
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ReplicatorName: z.string().min(1).max(128).regex(
    new RegExp("^[0-9A-Za-z][0-9A-Za-z-]{0,}$"),
  ).describe("The name of the replicator."),
  Description: z.string().max(1024).describe(
    "A summary description of the replicator.",
  ).optional(),
  KafkaClusters: z.array(KafkaClusterSchema).describe(
    "Specifies a list of Kafka clusters which are targets of the replicator.",
  ),
  ReplicationInfoList: z.array(ReplicationInfoSchema).describe(
    "A list of replication configurations, where each configuration targets a given source cluster to target cluster replication flow.",
  ),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the replicator to access external resources.",
  ),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

const StateSchema = z.object({
  ReplicatorArn: z.string(),
  ReplicatorName: z.string().optional(),
  CurrentVersion: z.string().optional(),
  Description: z.string().optional(),
  KafkaClusters: z.array(KafkaClusterSchema).optional(),
  ReplicationInfoList: z.array(ReplicationInfoSchema).optional(),
  ServiceExecutionRoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ReplicatorName: z.string().min(1).max(128).regex(
    new RegExp("^[0-9A-Za-z][0-9A-Za-z-]{0,}$"),
  ).describe("The name of the replicator.").optional(),
  Description: z.string().max(1024).describe(
    "A summary description of the replicator.",
  ).optional(),
  KafkaClusters: z.array(KafkaClusterSchema).describe(
    "Specifies a list of Kafka clusters which are targets of the replicator.",
  ).optional(),
  ReplicationInfoList: z.array(ReplicationInfoSchema).describe(
    "A list of replication configurations, where each configuration targets a given source cluster to target cluster replication flow.",
  ).optional(),
  ServiceExecutionRoleArn: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):iam:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used by the replicator to access external resources.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/msk/replicator",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MSK Replicator resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MSK Replicator",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MSK::Replicator",
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
      description: "Get a MSK Replicator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Replicator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MSK::Replicator",
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
      description: "Update a MSK Replicator",
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
        const identifier = existing.ReplicatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MSK::Replicator",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MSK::Replicator",
          identifier,
          currentState,
          desiredState,
          [
            "ReplicatorName",
            "Description",
            "KafkaClusters",
            "ServiceExecutionRoleArn",
            "SourceKafkaClusterArn",
            "TargetKafkaClusterArn",
            "TargetCompressionType",
            "StartingPosition",
            "TopicNameConfiguration",
          ],
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
      description: "Delete a MSK Replicator",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Replicator",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MSK::Replicator",
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
      description: "Sync MSK Replicator state from AWS",
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
        const identifier = existing.ReplicatorArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MSK::Replicator",
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
