// Auto-generated extension model for @swamp/aws/groundstation/config
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
  Key: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,128}$"))
    .optional(),
  Value: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,256}$"))
    .optional(),
});

export const FrequencySchema = z.object({
  Value: z.number().optional(),
  Units: z.enum(["GHz", "MHz", "kHz"]).optional(),
});

export const FrequencyBandwidthSchema = z.object({
  Value: z.number().optional(),
  Units: z.enum(["GHz", "MHz", "kHz"]).optional(),
});

export const SpectrumConfigSchema = z.object({
  CenterFrequency: FrequencySchema.optional(),
  Bandwidth: FrequencyBandwidthSchema.optional(),
  Polarization: z.enum(["LEFT_HAND", "RIGHT_HAND", "NONE"]).optional(),
});

export const AntennaDownlinkConfigSchema = z.object({
  SpectrumConfig: SpectrumConfigSchema.optional(),
});

export const TrackingConfigSchema = z.object({
  Autotrack: z.enum(["REQUIRED", "PREFERRED", "REMOVED"]).optional(),
});

export const DataflowEndpointConfigSchema = z.object({
  DataflowEndpointName: z.string().optional(),
  DataflowEndpointRegion: z.string().optional(),
});

export const DemodulationConfigSchema = z.object({
  UnvalidatedJSON: z.string().regex(
    new RegExp('^[{}\\[\\]:.,"0-9A-z\\-_\\s]{1,8192}$'),
  ).optional(),
});

export const DecodeConfigSchema = z.object({
  UnvalidatedJSON: z.string().regex(
    new RegExp('^[{}\\[\\]:.,"0-9A-z\\-_\\s]{1,8192}$'),
  ).optional(),
});

export const AntennaDownlinkDemodDecodeConfigSchema = z.object({
  SpectrumConfig: SpectrumConfigSchema.optional(),
  DemodulationConfig: DemodulationConfigSchema.optional(),
  DecodeConfig: DecodeConfigSchema.optional(),
});

export const UplinkSpectrumConfigSchema = z.object({
  CenterFrequency: FrequencySchema.optional(),
  Polarization: z.enum(["LEFT_HAND", "RIGHT_HAND", "NONE"]).optional(),
});

export const EirpSchema = z.object({
  Value: z.number().optional(),
  Units: z.enum(["dBW"]).optional(),
});

export const AntennaUplinkConfigSchema = z.object({
  SpectrumConfig: UplinkSpectrumConfigSchema.optional(),
  TargetEirp: EirpSchema.optional(),
  TransmitDisabled: z.boolean().optional(),
});

export const UplinkEchoConfigSchema = z.object({
  Enabled: z.boolean().optional(),
  AntennaUplinkConfigArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).optional(),
});

export const S3RecordingConfigSchema = z.object({
  BucketArn: z.string().regex(
    new RegExp("^arn:aws[A-Za-z0-9-]{0,64}:s3:::[A-Za-z0-9-]{1,64}$"),
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("^arn:[^:\\n]+:iam::[^:\\n]+:role\\/.+$"),
  ).optional(),
  Prefix: z.string().regex(
    new RegExp(
      "^([a-zA-Z0-9_\\-=/]|\\{satellite_id\\}|\\{config\\-name}|\\{s3\\-config-id}|\\{year\\}|\\{month\\}|\\{day\\}){1,900}$",
    ),
  ).optional(),
});

export const KinesisDataStreamDataSchema = z.object({
  KinesisRoleArn: z.string().regex(
    new RegExp("^arn:[^:\\n]+:iam::[^:\\n]+:role\\/.+$"),
  ),
  KinesisDataStreamArn: z.string().regex(
    new RegExp(
      "^arn:[a-z0-9-.]{1,63}:kinesis:[-a-z0-9]{1,50}:[0-9]{12}:stream/[a-zA-Z0-9_.-]{1,128}$",
    ),
  ),
});

export const TelemetrySinkDataSchema = z.object({
  KinesisDataStreamData: KinesisDataStreamDataSchema.optional(),
});

export const TelemetrySinkConfigSchema = z.object({
  TelemetrySinkType: z.enum(["KINESIS_DATA_STREAM"]),
  TelemetrySinkData: TelemetrySinkDataSchema,
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")),
  Tags: z.array(TagSchema).optional(),
  ConfigData: z.object({
    AntennaDownlinkConfig: AntennaDownlinkConfigSchema.optional(),
    TrackingConfig: TrackingConfigSchema.optional(),
    DataflowEndpointConfig: DataflowEndpointConfigSchema.optional(),
    AntennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfigSchema
      .optional(),
    AntennaUplinkConfig: AntennaUplinkConfigSchema.optional(),
    UplinkEchoConfig: UplinkEchoConfigSchema.optional(),
    S3RecordingConfig: S3RecordingConfigSchema.optional(),
    TelemetrySinkConfig: TelemetrySinkConfigSchema.optional(),
  }),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  ConfigData: z.object({
    AntennaDownlinkConfig: AntennaDownlinkConfigSchema,
    TrackingConfig: TrackingConfigSchema,
    DataflowEndpointConfig: DataflowEndpointConfigSchema,
    AntennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfigSchema,
    AntennaUplinkConfig: AntennaUplinkConfigSchema,
    UplinkEchoConfig: UplinkEchoConfigSchema,
    S3RecordingConfig: S3RecordingConfigSchema,
    TelemetrySinkConfig: TelemetrySinkConfigSchema,
  }).optional(),
  Arn: z.string(),
  Id: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")).optional(),
  Tags: z.array(TagSchema).optional(),
  ConfigData: z.object({
    AntennaDownlinkConfig: AntennaDownlinkConfigSchema.optional(),
    TrackingConfig: TrackingConfigSchema.optional(),
    DataflowEndpointConfig: DataflowEndpointConfigSchema.optional(),
    AntennaDownlinkDemodDecodeConfig: AntennaDownlinkDemodDecodeConfigSchema
      .optional(),
    AntennaUplinkConfig: AntennaUplinkConfigSchema.optional(),
    UplinkEchoConfig: UplinkEchoConfigSchema.optional(),
    S3RecordingConfig: S3RecordingConfigSchema.optional(),
    TelemetrySinkConfig: TelemetrySinkConfigSchema.optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/groundstation/config",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GroundStation Config resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GroundStation Config",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GroundStation::Config",
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
      description: "Get a GroundStation Config",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation Config",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GroundStation::Config",
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
      description: "Update a GroundStation Config",
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
          "AWS::GroundStation::Config",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GroundStation::Config",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a GroundStation Config",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation Config",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GroundStation::Config",
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
      description: "Sync GroundStation Config state from AWS",
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
            "AWS::GroundStation::Config",
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
