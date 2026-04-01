// Auto-generated extension model for @swamp/aws/groundstation/dataflow-endpoint-group-v2
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

export const SocketAddressSchema = z.object({
  Name: z.string().describe("IPv4 socket address."),
  Port: z.number().int().describe("Port of a socket address."),
});

export const ConnectionDetailsSchema = z.object({
  SocketAddress: SocketAddressSchema,
  Mtu: z.number().int().min(1400).max(1500).describe(
    "Maximum transmission unit (MTU) size in bytes of a dataflow endpoint.",
  ).optional(),
});

export const IntegerRangeSchema = z.object({
  Minimum: z.number().int().describe("A minimum value."),
  Maximum: z.number().int().describe("A maximum value."),
});

export const RangedSocketAddressSchema = z.object({
  Name: z.string().regex(
    new RegExp("^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$"),
  ).describe("IPv4 socket address."),
  PortRange: IntegerRangeSchema.describe("Port range of a socket address."),
});

export const RangedConnectionDetailsSchema = z.object({
  SocketAddress: RangedSocketAddressSchema.describe(
    "A socket address with a port range.",
  ),
  Mtu: z.number().int().min(1400).max(1500).describe(
    "Maximum transmission unit (MTU) size in bytes of a dataflow endpoint.",
  ).optional(),
});

export const UplinkConnectionDetailsSchema = z.object({
  IngressAddressAndPort: ConnectionDetailsSchema.describe(
    "Socket address of an uplink or downlink agent endpoint with an optional mtu.",
  ),
  AgentIpAndPortAddress: RangedConnectionDetailsSchema.describe(
    "Socket address of an uplink or downlink agent endpoint with a port range and an optional mtu.",
  ),
});

export const UplinkDataflowDetailsSchema = z.object({
  AgentConnectionDetails: UplinkConnectionDetailsSchema.describe(
    "Connection details for uplink, from ground station to agent, and customer to agent",
  ).optional(),
});

export const UplinkAwsGroundStationAgentEndpointSchema = z.object({
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")),
  DataflowDetails: UplinkDataflowDetailsSchema.describe(
    "Dataflow details for uplink",
  ),
});

export const DownlinkConnectionDetailsSchema = z.object({
  EgressAddressAndPort: ConnectionDetailsSchema.describe(
    "Socket address of an uplink or downlink agent endpoint with an optional mtu.",
  ),
  AgentIpAndPortAddress: RangedConnectionDetailsSchema.describe(
    "Socket address of an uplink or downlink agent endpoint with a port range and an optional mtu.",
  ),
});

export const DownlinkDataflowDetailsSchema = z.object({
  AgentConnectionDetails: DownlinkConnectionDetailsSchema.describe(
    "Connection details for downlink, from ground station to agent, and customer to agent",
  ).optional(),
});

export const DownlinkAwsGroundStationAgentEndpointSchema = z.object({
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")),
  DataflowDetails: DownlinkDataflowDetailsSchema.describe(
    "Dataflow details for downlink",
  ),
});

export const CreateEndpointDetailsSchema = z.object({
  UplinkAwsGroundStationAgentEndpoint: UplinkAwsGroundStationAgentEndpointSchema
    .describe(
      "Information about UplinkAwsGroundStationAgentEndpoint used for create",
    ).optional(),
  DownlinkAwsGroundStationAgentEndpoint:
    DownlinkAwsGroundStationAgentEndpointSchema.describe(
      "Information about DownlinkAwsGroundStationAgentEndpoint used for create",
    ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,128}$")),
  Value: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,256}$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Endpoints: z.array(CreateEndpointDetailsSchema).optional(),
  ContactPrePassDurationSeconds: z.number().int().min(30).max(480).describe(
    "Amount of time, in seconds, before a contact starts that the Ground Station Dataflow Endpoint Group will be in a PREPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the PREPASS state.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().min(30).max(480).describe(
    "Amount of time, in seconds, after a contact ends that the Ground Station Dataflow Endpoint Group will be in a POSTPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the POSTPASS state.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  EndpointDetails: z.array(z.object({
    UplinkAwsGroundStationAgentEndpoint: z.object({
      Name: z.string(),
      DataflowDetails: UplinkDataflowDetailsSchema,
      AgentStatus: z.string(),
      AuditResults: z.string(),
    }),
    DownlinkAwsGroundStationAgentEndpoint: z.object({
      Name: z.string(),
      DataflowDetails: DownlinkDataflowDetailsSchema,
      AgentStatus: z.string(),
      AuditResults: z.string(),
    }),
  })).optional(),
  Endpoints: z.array(CreateEndpointDetailsSchema).optional(),
  ContactPrePassDurationSeconds: z.number().optional(),
  ContactPostPassDurationSeconds: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Endpoints: z.array(CreateEndpointDetailsSchema).optional(),
  ContactPrePassDurationSeconds: z.number().int().min(30).max(480).describe(
    "Amount of time, in seconds, before a contact starts that the Ground Station Dataflow Endpoint Group will be in a PREPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the PREPASS state.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().min(30).max(480).describe(
    "Amount of time, in seconds, after a contact ends that the Ground Station Dataflow Endpoint Group will be in a POSTPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the POSTPASS state.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/groundstation/dataflow-endpoint-group-v2",
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
      description: "GroundStation DataflowEndpointGroupV2 resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GroundStation DataflowEndpointGroupV2",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::GroundStation::DataflowEndpointGroupV2",
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
      description: "Get a GroundStation DataflowEndpointGroupV2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation DataflowEndpointGroupV2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::GroundStation::DataflowEndpointGroupV2",
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
      description: "Update a GroundStation DataflowEndpointGroupV2",
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
          "AWS::GroundStation::DataflowEndpointGroupV2",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GroundStation::DataflowEndpointGroupV2",
          identifier,
          currentState,
          desiredState,
          [
            "Endpoints",
            "ContactPrePassDurationSeconds",
            "ContactPostPassDurationSeconds",
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
      description: "Delete a GroundStation DataflowEndpointGroupV2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation DataflowEndpointGroupV2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::GroundStation::DataflowEndpointGroupV2",
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
      description: "Sync GroundStation DataflowEndpointGroupV2 state from AWS",
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
            "AWS::GroundStation::DataflowEndpointGroupV2",
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
