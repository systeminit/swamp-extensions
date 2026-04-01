// Auto-generated extension model for @swamp/aws/emr/cluster
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

export const ApplicationSchema = z.object({
  AdditionalInfo: z.record(z.string(), z.string()).describe(
    "This option is for advanced users only. This is meta information about third-party applications that third-party vendors use for testing purposes.",
  ).optional(),
  Args: z.array(z.string()).describe(
    "Arguments for Amazon EMR to pass to the application",
  ).optional(),
  Name: z.string().describe("The name of the application.").optional(),
  Version: z.string().describe("The version of the application.").optional(),
});

export const ScriptBootstrapActionConfigSchema = z.object({
  Args: z.array(z.string()).describe(
    "A list of command line arguments to pass to the bootstrap action script.",
  ).optional(),
  Path: z.string().describe(
    "Location in Amazon S3 of the script to run during a bootstrap action.",
  ),
});

export const BootstrapActionConfigSchema = z.object({
  Name: z.string().describe("The name of the bootstrap action."),
  ScriptBootstrapAction: ScriptBootstrapActionConfigSchema,
});

export const ComputeLimitsSchema = z.object({
  MaximumCapacityUnits: z.number().int().describe(
    "The upper boundary of EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed beyond this boundary. The limit only applies to the core and task nodes. The master node cannot be scaled after initial configuration.",
  ),
  MaximumCoreCapacityUnits: z.number().int().describe(
    "The upper boundary of EC2 units for core node type in a cluster. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The core units are not allowed to scale beyond this boundary. The parameter is used to split capacity allocation between core and task nodes.",
  ).optional(),
  MaximumOnDemandCapacityUnits: z.number().int().describe(
    "The upper boundary of On-Demand EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The On-Demand units are not allowed to scale beyond this boundary. The parameter is used to split capacity allocation between On-Demand and Spot Instances.",
  ).optional(),
  MinimumCapacityUnits: z.number().int().describe(
    "The lower boundary of EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed beyond this boundary. The limit only applies to the core and task nodes. The master node cannot be scaled after initial configuration.",
  ),
  UnitType: z.enum(["InstanceFleetUnits", "Instances", "VCPU"]).describe(
    "The unit type used for specifying a managed scaling policy.",
  ),
});

export const KeyValueSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

export const HadoopJarStepConfigSchema = z.object({
  Args: z.array(z.string()).optional(),
  Jar: z.string().describe("A path to a JAR file run during the step."),
  MainClass: z.string().describe(
    "The name of the main class in the specified Java file. If not specified, the JAR file should specify a Main-Class in its manifest file.",
  ).optional(),
  StepProperties: z.array(KeyValueSchema).describe(
    "A list of Java properties that are set when the step runs. You can use these properties to pass key-value pairs to your main function.",
  ).optional(),
});

export const StepConfigSchema = z.object({
  ActionOnFailure: z.enum([
    "CANCEL_AND_WAIT",
    "CONTINUE",
    "TERMINATE_CLUSTER",
    "TERMINATE_JOB_FLOW",
  ]).describe(
    "The action to take when the step fails. Use one of the following values: TERMINATE_CLUSTER - Shuts down the cluster. CANCEL_AND_WAIT - Cancels any pending steps and returns the cluster to the WAITING state. CONTINUE - Continues to the next step in the queue. TERMINATE_JOB_FLOW - Shuts down the cluster. TERMINATE_JOB_FLOW is provided for backward compatibility. We recommend using TERMINATE_CLUSTER instead. If a cluster's StepConcurrencyLevel is greater than 1, do not use AddJobFlowSteps to submit a step with this parameter set to CANCEL_AND_WAIT or TERMINATE_CLUSTER. The step is not submitted and the action fails with a message that the ActionOnFailure setting is not valid. If you change a cluster's StepConcurrencyLevel to be greater than 1 while a step is running, the ActionOnFailure parameter may not behave as you expect. In this case, for a step that fails with this parameter set to CANCEL_AND_WAIT, pending steps and the running step are not canceled; for a step that fails with this parameter set to TERMINATE_CLUSTER, the cluster does not terminate.",
  ).optional(),
  HadoopJarStep: HadoopJarStepConfigSchema.describe(
    "The JAR file used for the step.",
  ),
  Name: z.string().describe("The name of the step."),
});

export const PlacementGroupConfigSchema = z.object({
  InstanceRole: z.enum(["MASTER", "CORE", "TASK"]).describe(
    "Role of the instance in the cluster.",
  ),
  PlacementStrategy: z.enum(["SPREAD", "PARTITION", "CLUSTER", "NONE"])
    .describe(
      "Amazon EC2 Placement Group strategy associated with instance role.",
    ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().describe(
    "A user-defined key, which is the minimum required information for a valid tag. For more information.",
  ),
  Value: z.string().describe(
    "A user-defined value, which is optional in a tag. For more information",
  ),
});

export const CloudWatchLogConfigurationSchema = z.object({
  Enabled: z.boolean().describe("Specifies if CloudWatch logging is enabled."),
  LogGroupName: z.string().describe(
    "The name of the CloudWatch log group where logs are published.",
  ).optional(),
  LogStreamNamePrefix: z.string().describe("The prefix of the log stream name.")
    .optional(),
  EncryptionKeyArn: z.string().describe(
    "The ARN of the encryption key used to encrypt the logs.",
  ).optional(),
  LogTypes: z.record(z.string(), z.array(z.string())).describe(
    "A map of log types to file names for publishing logs to the standard output or standard error streams for CloudWatch. Valid log types include STEP_LOGS, SPARK_DRIVER, and SPARK_EXECUTOR. Valid file names for each type include STDOUT and STDERR.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AdditionalInfo: z.string().describe(
    "A JSON string for selecting additional features.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "The applications installed on this cluster.",
  ).optional(),
  AutoScalingRole: z.string().describe(
    "An IAM role for automatic scaling policies. The default role is EMR_AutoScaling_DefaultRole. The IAM role provides permissions that the automatic scaling feature requires to launch and terminate EC2 instances in an instance group.",
  ).optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number().int().describe(
      "Specifies the amount of idle time in seconds after which the cluster automatically terminates. You can specify a minimum of 60 seconds and a maximum of 604800 seconds (seven days)",
    ).optional(),
  }).describe(
    "An auto-termination policy for an Amazon EMR cluster. An auto-termination policy defines the amount of idle time in seconds after which a cluster automatically terminates.",
  ).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).describe(
    "A list of bootstrap actions to run before Hadoop starts on the cluster nodes.",
  ).optional(),
  Configurations: z.array(z.string()).describe(
    "Applies only to Amazon EMR releases 4.x and later. The list of Configurations supplied to the EMR cluster.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "Available only in Amazon EMR version 5.7.0 and later. The ID of a custom Amazon EBS-backed Linux AMI if the cluster uses a custom AMI.",
  ).optional(),
  EbsRootVolumeSize: z.number().int().describe(
    "The size, in GiB, of the Amazon EBS root device volume of the Linux AMI that is used for each EC2 instance. Available in Amazon EMR version 4.x and later.",
  ).optional(),
  JobFlowRole: z.string().describe(
    "Also called instance profile and EC2 role. An IAM role for an EMR cluster. The EC2 instances of the cluster assume this role. The default role is EMR_EC2_DefaultRole. In order to use the default role, you must have already created it using the CLI or console",
  ),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string().describe(
      "The Active Directory password for ADDomainJoinUser.",
    ).optional(),
    ADDomainJoinUser: z.string().describe(
      "Required only when establishing a cross-realm trust with an Active Directory domain. A user with sufficient privileges to join resources to the domain.",
    ).optional(),
    CrossRealmTrustPrincipalPassword: z.string().describe(
      "Required only when establishing a cross-realm trust with a KDC in a different realm. The cross-realm principal password, which must be identical across realms.",
    ).optional(),
    KdcAdminPassword: z.string().describe(
      "The password used within the cluster for the kadmin service on the cluster-dedicated KDC, which maintains Kerberos principals, password policies, and keytabs for the cluster.",
    ),
    Realm: z.string().describe(
      "The name of the Kerberos realm to which all nodes in a cluster belong. For example, EC2.INTERNAL.",
    ),
  }).describe(
    "Attributes for Kerberos configuration when Kerberos authentication is enabled using a security configuration. For more information see Use Kerberos Authentication in the Amazon EMR Management Guide.",
  ).optional(),
  LogEncryptionKmsKeyId: z.string().describe(
    "The AWS KMS key used for encrypting log files. If a value is not provided, the logs remain encrypted by AES-256. This attribute is only available with Amazon EMR version 5.30.0 and later, excluding Amazon EMR 6.0.0.",
  ).optional(),
  LogUri: z.string().describe(
    "The location in Amazon S3 to write the log files of the job flow. If a value is not provided, logs are not created.",
  ).optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number().int().optional(),
    ScalingStrategy: z.string().optional(),
    ComputeLimits: ComputeLimitsSchema.optional(),
  }).describe("The specified managed scaling policy for an Amazon EMR cluster.")
    .optional(),
  Name: z.string().describe("The name of the job flow."),
  ReleaseLabel: z.string().describe(
    "The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster. Release labels are in the form emr-x.x.x, where x.x.x is an Amazon EMR release version such as emr-5.14.0.",
  ).optional(),
  OSReleaseLabel: z.string().describe(
    "Specifies a particular Amazon Linux release for all nodes in a cluster launch RunJobFlow request. If a release is not specified, Amazon EMR uses the latest validated Amazon Linux release for cluster launch.",
  ).optional(),
  ScaleDownBehavior: z.enum([
    "TERMINATE_AT_INSTANCE_HOUR",
    "TERMINATE_AT_TASK_COMPLETION",
  ]).describe(
    "The way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the security configuration applied to the cluster.",
  ).optional(),
  ServiceRole: z.string().describe(
    "The IAM role that Amazon EMR assumes in order to access AWS resources on your behalf.",
  ),
  StepConcurrencyLevel: z.number().int().describe(
    "Specifies the number of steps that can be executed concurrently.",
  ).optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().describe(
    "Indicates whether the cluster is visible to IAM principals in the AWS account associated with the cluster. When true, IAM principals in the AWS account can perform EMR cluster actions on the cluster that their IAM policies allow. When false, only the IAM principal that created the cluster and the AWS account root user can perform EMR actions, regardless of IAM permissions policies attached to other IAM principals.",
  ).optional(),
  EbsRootVolumeIops: z.number().int().describe(
    "The IOPS, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  EbsRootVolumeThroughput: z.number().int().describe(
    "The throughput, in MiB/s, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).describe(
    "The configuration specifies the placement strategy that can be applied to instance roles during cluster creation.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema.describe(
      "Holds CloudWatch log configuration settings and metadata that specify settings like log files to monitor and where to send them.",
    ).optional(),
  }).describe("Specifies the configuration for cluster logging.").optional(),
});

const StateSchema = z.object({
  MasterPublicDNS: z.string().optional(),
  AdditionalInfo: z.string().optional(),
  Applications: z.array(ApplicationSchema).optional(),
  AutoScalingRole: z.string().optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number(),
  }).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).optional(),
  Configurations: z.array(z.string()).optional(),
  CustomAmiId: z.string().optional(),
  EbsRootVolumeSize: z.number().optional(),
  Id: z.string(),
  JobFlowRole: z.string().optional(),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string(),
    ADDomainJoinUser: z.string(),
    CrossRealmTrustPrincipalPassword: z.string(),
    KdcAdminPassword: z.string(),
    Realm: z.string(),
  }).optional(),
  LogEncryptionKmsKeyId: z.string().optional(),
  LogUri: z.string().optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number(),
    ScalingStrategy: z.string(),
    ComputeLimits: ComputeLimitsSchema,
  }).optional(),
  Name: z.string().optional(),
  ReleaseLabel: z.string().optional(),
  OSReleaseLabel: z.string().optional(),
  ScaleDownBehavior: z.string().optional(),
  SecurityConfiguration: z.string().optional(),
  ServiceRole: z.string().optional(),
  StepConcurrencyLevel: z.number().optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().optional(),
  EbsRootVolumeIops: z.number().optional(),
  EbsRootVolumeThroughput: z.number().optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AdditionalInfo: z.string().describe(
    "A JSON string for selecting additional features.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "The applications installed on this cluster.",
  ).optional(),
  AutoScalingRole: z.string().describe(
    "An IAM role for automatic scaling policies. The default role is EMR_AutoScaling_DefaultRole. The IAM role provides permissions that the automatic scaling feature requires to launch and terminate EC2 instances in an instance group.",
  ).optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number().int().describe(
      "Specifies the amount of idle time in seconds after which the cluster automatically terminates. You can specify a minimum of 60 seconds and a maximum of 604800 seconds (seven days)",
    ).optional(),
  }).describe(
    "An auto-termination policy for an Amazon EMR cluster. An auto-termination policy defines the amount of idle time in seconds after which a cluster automatically terminates.",
  ).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).describe(
    "A list of bootstrap actions to run before Hadoop starts on the cluster nodes.",
  ).optional(),
  Configurations: z.array(z.string()).describe(
    "Applies only to Amazon EMR releases 4.x and later. The list of Configurations supplied to the EMR cluster.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "Available only in Amazon EMR version 5.7.0 and later. The ID of a custom Amazon EBS-backed Linux AMI if the cluster uses a custom AMI.",
  ).optional(),
  EbsRootVolumeSize: z.number().int().describe(
    "The size, in GiB, of the Amazon EBS root device volume of the Linux AMI that is used for each EC2 instance. Available in Amazon EMR version 4.x and later.",
  ).optional(),
  JobFlowRole: z.string().describe(
    "Also called instance profile and EC2 role. An IAM role for an EMR cluster. The EC2 instances of the cluster assume this role. The default role is EMR_EC2_DefaultRole. In order to use the default role, you must have already created it using the CLI or console",
  ).optional(),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string().describe(
      "The Active Directory password for ADDomainJoinUser.",
    ).optional(),
    ADDomainJoinUser: z.string().describe(
      "Required only when establishing a cross-realm trust with an Active Directory domain. A user with sufficient privileges to join resources to the domain.",
    ).optional(),
    CrossRealmTrustPrincipalPassword: z.string().describe(
      "Required only when establishing a cross-realm trust with a KDC in a different realm. The cross-realm principal password, which must be identical across realms.",
    ).optional(),
    KdcAdminPassword: z.string().describe(
      "The password used within the cluster for the kadmin service on the cluster-dedicated KDC, which maintains Kerberos principals, password policies, and keytabs for the cluster.",
    ).optional(),
    Realm: z.string().describe(
      "The name of the Kerberos realm to which all nodes in a cluster belong. For example, EC2.INTERNAL.",
    ).optional(),
  }).describe(
    "Attributes for Kerberos configuration when Kerberos authentication is enabled using a security configuration. For more information see Use Kerberos Authentication in the Amazon EMR Management Guide.",
  ).optional(),
  LogEncryptionKmsKeyId: z.string().describe(
    "The AWS KMS key used for encrypting log files. If a value is not provided, the logs remain encrypted by AES-256. This attribute is only available with Amazon EMR version 5.30.0 and later, excluding Amazon EMR 6.0.0.",
  ).optional(),
  LogUri: z.string().describe(
    "The location in Amazon S3 to write the log files of the job flow. If a value is not provided, logs are not created.",
  ).optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number().int().optional(),
    ScalingStrategy: z.string().optional(),
    ComputeLimits: ComputeLimitsSchema.optional(),
  }).describe("The specified managed scaling policy for an Amazon EMR cluster.")
    .optional(),
  Name: z.string().describe("The name of the job flow.").optional(),
  ReleaseLabel: z.string().describe(
    "The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster. Release labels are in the form emr-x.x.x, where x.x.x is an Amazon EMR release version such as emr-5.14.0.",
  ).optional(),
  OSReleaseLabel: z.string().describe(
    "Specifies a particular Amazon Linux release for all nodes in a cluster launch RunJobFlow request. If a release is not specified, Amazon EMR uses the latest validated Amazon Linux release for cluster launch.",
  ).optional(),
  ScaleDownBehavior: z.enum([
    "TERMINATE_AT_INSTANCE_HOUR",
    "TERMINATE_AT_TASK_COMPLETION",
  ]).describe(
    "The way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the security configuration applied to the cluster.",
  ).optional(),
  ServiceRole: z.string().describe(
    "The IAM role that Amazon EMR assumes in order to access AWS resources on your behalf.",
  ).optional(),
  StepConcurrencyLevel: z.number().int().describe(
    "Specifies the number of steps that can be executed concurrently.",
  ).optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().describe(
    "Indicates whether the cluster is visible to IAM principals in the AWS account associated with the cluster. When true, IAM principals in the AWS account can perform EMR cluster actions on the cluster that their IAM policies allow. When false, only the IAM principal that created the cluster and the AWS account root user can perform EMR actions, regardless of IAM permissions policies attached to other IAM principals.",
  ).optional(),
  EbsRootVolumeIops: z.number().int().describe(
    "The IOPS, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  EbsRootVolumeThroughput: z.number().int().describe(
    "The throughput, in MiB/s, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).describe(
    "The configuration specifies the placement strategy that can be applied to instance roles during cluster creation.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema.describe(
      "Holds CloudWatch log configuration settings and metadata that specify settings like log files to monitor and where to send them.",
    ).optional(),
  }).describe("Specifies the configuration for cluster logging.").optional(),
});

export const model = {
  type: "@swamp/aws/emr/cluster",
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
      description: "EMR Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EMR::Cluster",
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
      description: "Get a EMR Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EMR::Cluster",
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
      description: "Update a EMR Cluster",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EMR::Cluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EMR::Cluster",
          identifier,
          currentState,
          desiredState,
          [
            "Steps",
            "EbsRootVolumeSize",
            "SecurityConfiguration",
            "ScaleDownBehavior",
            "ReleaseLabel",
            "KerberosAttributes",
            "ServiceRole",
            "LogEncryptionKmsKeyId",
            "Name",
            "JobFlowRole",
            "LogUri",
            "AdditionalInfo",
            "Applications",
            "AutoScalingRole",
            "BootstrapActions",
            "Configurations",
            "CustomAmiId",
            "OSReleaseLabel",
            "EbsRootVolumeIops",
            "EbsRootVolumeThroughput",
            "PlacementGroupConfigs",
            "MonitoringConfiguration",
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
      description: "Delete a EMR Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EMR::Cluster",
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
      description: "Sync EMR Cluster state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMR::Cluster",
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
