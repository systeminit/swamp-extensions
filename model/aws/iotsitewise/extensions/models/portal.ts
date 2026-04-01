// Auto-generated extension model for @swamp/aws/iotsitewise/portal
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

export const PortalTypeEntrySchema = z.object({
  PortalTools: z.array(z.string()).describe(
    "List of enabled Tools for a certain portal.",
  ),
});

export const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  PortalAuthMode: z.string().describe(
    "The service to use to authenticate users to the portal. Choose from SSO or IAM. You can't change this value after you create a portal.",
  ).optional(),
  PortalContactEmail: z.string().describe(
    "The AWS administrator's contact email address.",
  ),
  PortalDescription: z.string().describe("A description for the portal.")
    .optional(),
  PortalName: z.string().describe("A friendly name for the portal."),
  PortalType: z.enum(["SITEWISE_PORTAL_V1", "SITEWISE_PORTAL_V2"]).describe(
    "The type of portal",
  ).optional(),
  PortalTypeConfiguration: z.record(z.string(), PortalTypeEntrySchema).describe(
    "Map to associate detail of configuration related with a PortalType.",
  ).optional(),
  RoleArn: z.string().describe(
    "The ARN of a service role that allows the portal's users to access your AWS IoT SiteWise resources on your behalf.",
  ),
  NotificationSenderEmail: z.string().describe(
    "The email address that sends alarm notifications.",
  ).optional(),
  Alarms: z.object({
    AlarmRoleArn: z.string().describe(
      "The ARN of the IAM role that allows the alarm to perform actions and access AWS resources and services, such as AWS IoT Events.",
    ).optional(),
    NotificationLambdaArn: z.string().describe(
      "The ARN of the AWS Lambda function that manages alarm notifications. For more information, see Managing alarm notifications in the AWS IoT Events Developer Guide.",
    ).optional(),
  }).describe(
    "Contains the configuration information of an alarm created in an AWS IoT SiteWise Monitor portal. You can use the alarm to monitor an asset property and get notified when the asset property value is outside a specified range.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the portal.",
  ).optional(),
});

const StateSchema = z.object({
  PortalAuthMode: z.string().optional(),
  PortalArn: z.string().optional(),
  PortalClientId: z.string().optional(),
  PortalContactEmail: z.string().optional(),
  PortalDescription: z.string().optional(),
  PortalId: z.string(),
  PortalName: z.string().optional(),
  PortalStartUrl: z.string().optional(),
  PortalType: z.string().optional(),
  PortalTypeConfiguration: z.record(z.string(), z.unknown()).optional(),
  RoleArn: z.string().optional(),
  NotificationSenderEmail: z.string().optional(),
  Alarms: z.object({
    AlarmRoleArn: z.string(),
    NotificationLambdaArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  PortalAuthMode: z.string().describe(
    "The service to use to authenticate users to the portal. Choose from SSO or IAM. You can't change this value after you create a portal.",
  ).optional(),
  PortalContactEmail: z.string().describe(
    "The AWS administrator's contact email address.",
  ).optional(),
  PortalDescription: z.string().describe("A description for the portal.")
    .optional(),
  PortalName: z.string().describe("A friendly name for the portal.").optional(),
  PortalType: z.enum(["SITEWISE_PORTAL_V1", "SITEWISE_PORTAL_V2"]).describe(
    "The type of portal",
  ).optional(),
  PortalTypeConfiguration: z.record(z.string(), PortalTypeEntrySchema).describe(
    "Map to associate detail of configuration related with a PortalType.",
  ).optional(),
  RoleArn: z.string().describe(
    "The ARN of a service role that allows the portal's users to access your AWS IoT SiteWise resources on your behalf.",
  ).optional(),
  NotificationSenderEmail: z.string().describe(
    "The email address that sends alarm notifications.",
  ).optional(),
  Alarms: z.object({
    AlarmRoleArn: z.string().describe(
      "The ARN of the IAM role that allows the alarm to perform actions and access AWS resources and services, such as AWS IoT Events.",
    ).optional(),
    NotificationLambdaArn: z.string().describe(
      "The ARN of the AWS Lambda function that manages alarm notifications. For more information, see Managing alarm notifications in the AWS IoT Events Developer Guide.",
    ).optional(),
  }).describe(
    "Contains the configuration information of an alarm created in an AWS IoT SiteWise Monitor portal. You can use the alarm to monitor an asset property and get notified when the asset property value is outside a specified range.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the portal.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotsitewise/portal",
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
      description: "IoTSiteWise Portal resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTSiteWise Portal",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTSiteWise::Portal",
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
      description: "Get a IoTSiteWise Portal",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Portal",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTSiteWise::Portal",
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
      description: "Update a IoTSiteWise Portal",
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
        const identifier = existing.PortalId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTSiteWise::Portal",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTSiteWise::Portal",
          identifier,
          currentState,
          desiredState,
          ["PortalAuthMode", "PortalType"],
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
      description: "Delete a IoTSiteWise Portal",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Portal",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTSiteWise::Portal",
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
      description: "Sync IoTSiteWise Portal state from AWS",
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
        const identifier = existing.PortalId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTSiteWise::Portal",
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
