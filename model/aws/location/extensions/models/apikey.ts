// Auto-generated extension model for @swamp/aws/location/apikey
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

export const AndroidAppSchema = z.object({
  Package: z.string().min(1).max(255).regex(
    new RegExp("^([A-Za-z][A-Za-z\\d_]*\\.)+[A-Za-z][A-Za-z\\d_]*$"),
  ),
  CertificateFingerprint: z.string().min(59).max(59).regex(
    new RegExp("^([A-Fa-f0-9]{2}:){19}[A-Fa-f0-9]{2}$"),
  ),
});

export const AppleAppSchema = z.object({
  BundleId: z.string().min(1).max(155).regex(
    new RegExp("^[A-Za-z0-9\\-]+(\\.[A-Za-z0-9\\-]+)+$"),
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z+-=._:/]+$"))
    .describe(
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[A-Za-z0-9 _=@:.+-/]*$"))
    .describe(
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
    ),
});

const GlobalArgsSchema = z.object({
  Description: z.string().min(0).max(1000).optional(),
  ExpireTime: z.string().regex(
    new RegExp(
      "^([0-2]\\d{3})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    ),
  ).describe(
    "The datetime value in ISO 8601 format. The timezone is always UTC. (YYYY-MM-DDThh:mm:ss.sssZ)",
  ).optional(),
  ForceUpdate: z.boolean().optional(),
  KeyName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$")),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(
      z.string().min(5).max(200).regex(
        new RegExp("^(geo|geo-routes|geo-places|geo-maps):\\w*\\*?$"),
      ),
    ),
    AllowResources: z.array(
      z.string().max(1600).regex(
        new RegExp(
          "(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):geo(:([a-z0-9]+([.-][a-z0-9]+)*))(:[0-9]+):((\\*)|([-a-z]+[/][*-._\\w]+))$)|(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):(geo-routes|geo-places|geo-maps)(:((\\*)|([a-z0-9]+([.-][a-z0-9]+)*)))::((provider[\\/][*-._\\w]+))$)",
        ),
      ),
    ),
    AllowReferers: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^([\\w!$&()*+,./:;=?@\\x{60}-]|%([\\dA-Fa-f]{2}|[\\dA-Fa-f]?\\*))+$",
        ),
      ),
    ).optional(),
    AllowAndroidApps: z.array(AndroidAppSchema).optional(),
    AllowAppleApps: z.array(AppleAppSchema).optional(),
  }),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ForceDelete: z.boolean().optional(),
});

const StateSchema = z.object({
  CreateTime: z.string().optional(),
  Description: z.string().optional(),
  ExpireTime: z.string().optional(),
  ForceUpdate: z.boolean().optional(),
  KeyArn: z.string().optional(),
  KeyName: z.string(),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(z.string()),
    AllowResources: z.array(z.string()),
    AllowReferers: z.array(z.string()),
    AllowAndroidApps: z.array(AndroidAppSchema),
    AllowAppleApps: z.array(AppleAppSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  UpdateTime: z.string().optional(),
  ForceDelete: z.boolean().optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().min(0).max(1000).optional(),
  ExpireTime: z.string().regex(
    new RegExp(
      "^([0-2]\\d{3})-(0[0-9]|1[0-2])-([0-2]\\d|3[01])T([01]\\d|2[0-4]):([0-5]\\d):([0-6]\\d)((\\.\\d{3})?)Z$",
    ),
  ).describe(
    "The datetime value in ISO 8601 format. The timezone is always UTC. (YYYY-MM-DDThh:mm:ss.sssZ)",
  ).optional(),
  ForceUpdate: z.boolean().optional(),
  KeyName: z.string().min(1).max(100).regex(new RegExp("^[-._\\w]+$"))
    .optional(),
  NoExpiry: z.boolean().optional(),
  Restrictions: z.object({
    AllowActions: z.array(
      z.string().min(5).max(200).regex(
        new RegExp("^(geo|geo-routes|geo-places|geo-maps):\\w*\\*?$"),
      ),
    ).optional(),
    AllowResources: z.array(
      z.string().max(1600).regex(
        new RegExp(
          "(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):geo(:([a-z0-9]+([.-][a-z0-9]+)*))(:[0-9]+):((\\*)|([-a-z]+[/][*-._\\w]+))$)|(^arn(:[a-z0-9]+([.-][a-z0-9]+)*):(geo-routes|geo-places|geo-maps)(:((\\*)|([a-z0-9]+([.-][a-z0-9]+)*)))::((provider[\\/][*-._\\w]+))$)",
        ),
      ),
    ).optional(),
    AllowReferers: z.array(
      z.string().max(253).regex(
        new RegExp(
          "^([\\w!$&()*+,./:;=?@\\x{60}-]|%([\\dA-Fa-f]{2}|[\\dA-Fa-f]?\\*))+$",
        ),
      ),
    ).optional(),
    AllowAndroidApps: z.array(AndroidAppSchema).optional(),
    AllowAppleApps: z.array(AppleAppSchema).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ForceDelete: z.boolean().optional(),
});

export const model = {
  type: "@swamp/aws/location/apikey",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Location APIKey resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Location APIKey",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Location::APIKey",
          desiredState,
        ) as StateData;
        const instanceName = (result.KeyName ?? g.KeyName)?.toString() ??
          "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Location APIKey",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location APIKey",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Location::APIKey",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.KeyName ?? context.globalArgs.KeyName)?.toString() ??
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
      description: "Update a Location APIKey",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.KeyName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.KeyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Location::APIKey",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Location::APIKey",
          identifier,
          currentState,
          desiredState,
          ["KeyName"],
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
      description: "Delete a Location APIKey",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Location APIKey",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Location::APIKey",
          args.identifier,
        );
        const instanceName = context.globalArgs.KeyName?.toString() ??
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
      description: "Sync Location APIKey state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.KeyName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.KeyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Location::APIKey",
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
