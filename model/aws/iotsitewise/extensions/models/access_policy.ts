// Auto-generated extension model for @swamp/aws/iotsitewise/access-policy
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

export const UserSchema = z.object({
  id: z.string().describe("The AWS SSO ID of the user.").optional(),
});

export const IamUserSchema = z.object({
  arn: z.string().describe("The ARN of the IAM user.").optional(),
});

export const IamRoleSchema = z.object({
  arn: z.string().describe("The ARN of the IAM role.").optional(),
});

export const PortalSchema = z.object({
  id: z.string().describe("The ID of the portal.").optional(),
});

export const ProjectSchema = z.object({
  id: z.string().describe("The ID of the project.").optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AccessPolicyIdentity: z.object({
    User: UserSchema.describe(
      "Contains information for a user identity in an access policy.",
    ).optional(),
    IamUser: IamUserSchema.describe(
      "Contains information for an IAM user identity in an access policy.",
    ).optional(),
    IamRole: IamRoleSchema.describe(
      "Contains information for an IAM role identity in an access policy.",
    ).optional(),
  }).describe(
    "The identity for this access policy. Choose either a user or a group but not both.",
  ),
  AccessPolicyPermission: z.string().describe(
    "The permission level for this access policy. Valid values are ADMINISTRATOR or VIEWER.",
  ),
  AccessPolicyResource: z.object({
    Portal: PortalSchema.describe("A portal resource.").optional(),
    Project: ProjectSchema.describe("A project resource.").optional(),
  }).describe(
    "The AWS IoT SiteWise Monitor resource for this access policy. Choose either portal or project but not both.",
  ),
});

const StateSchema = z.object({
  AccessPolicyId: z.string(),
  AccessPolicyArn: z.string().optional(),
  AccessPolicyIdentity: z.object({
    User: UserSchema,
    IamUser: IamUserSchema,
    IamRole: IamRoleSchema,
  }).optional(),
  AccessPolicyPermission: z.string().optional(),
  AccessPolicyResource: z.object({
    Portal: PortalSchema,
    Project: ProjectSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AccessPolicyIdentity: z.object({
    User: UserSchema.describe(
      "Contains information for a user identity in an access policy.",
    ).optional(),
    IamUser: IamUserSchema.describe(
      "Contains information for an IAM user identity in an access policy.",
    ).optional(),
    IamRole: IamRoleSchema.describe(
      "Contains information for an IAM role identity in an access policy.",
    ).optional(),
  }).describe(
    "The identity for this access policy. Choose either a user or a group but not both.",
  ).optional(),
  AccessPolicyPermission: z.string().describe(
    "The permission level for this access policy. Valid values are ADMINISTRATOR or VIEWER.",
  ).optional(),
  AccessPolicyResource: z.object({
    Portal: PortalSchema.describe("A portal resource.").optional(),
    Project: ProjectSchema.describe("A project resource.").optional(),
  }).describe(
    "The AWS IoT SiteWise Monitor resource for this access policy. Choose either portal or project but not both.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotsitewise/access-policy",
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
      description: "IoTSiteWise AccessPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTSiteWise AccessPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTSiteWise::AccessPolicy",
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
      description: "Get a IoTSiteWise AccessPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise AccessPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTSiteWise::AccessPolicy",
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
    update: {
      description: "Update a IoTSiteWise AccessPolicy",
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
        const identifier = existing.AccessPolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTSiteWise::AccessPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTSiteWise::AccessPolicy",
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
      description: "Delete a IoTSiteWise AccessPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise AccessPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTSiteWise::AccessPolicy",
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
      description: "Sync IoTSiteWise AccessPolicy state from AWS",
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
        const identifier = existing.AccessPolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTSiteWise::AccessPolicy",
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
