// Auto-generated extension model for @swamp/aws/workspacesweb/data-protection-settings
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

export const CustomPatternSchema = z.object({
  PatternName: z.string().min(1).max(20).regex(new RegExp("^[_\\-\\d\\w]+$")),
  PatternRegex: z.string().min(0).max(300).regex(
    new RegExp("^\\/((?:[^\\n])+)\\/([gimsuyvd]{0,8})$"),
  ),
  PatternDescription: z.string().min(1).max(256).regex(
    new RegExp("^[ _\\-\\d\\w]+$"),
  ).optional(),
  KeywordRegex: z.string().min(0).max(300).regex(
    new RegExp("^\\/((?:[^\\n])+)\\/([gimsuyvd]{0,8})$"),
  ).optional(),
});

export const RedactionPlaceHolderSchema = z.object({
  RedactionPlaceHolderType: z.enum(["CustomText"]),
  RedactionPlaceHolderText: z.string().min(1).max(20).regex(
    new RegExp("^[*_\\-\\d\\w]+$"),
  ).optional(),
});

export const InlineRedactionPatternSchema = z.object({
  BuiltInPatternId: z.string().min(1).max(50).regex(
    new RegExp("^[_\\-\\d\\w]+$"),
  ).optional(),
  CustomPattern: CustomPatternSchema.optional(),
  RedactionPlaceHolder: RedactionPlaceHolderSchema,
  EnforcedUrls: z.array(
    z.string().regex(
      new RegExp(
        "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
      ),
    ),
  ).optional(),
  ExemptUrls: z.array(
    z.string().regex(
      new RegExp(
        "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
      ),
    ),
  ).optional(),
  ConfidenceLevel: z.number().min(1).max(3).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp("^[ _\\-\\d\\w]+$"))
    .optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^[ _\\-\\d\\w]+$"))
    .optional(),
  InlineRedactionConfiguration: z.object({
    InlineRedactionPatterns: z.array(InlineRedactionPatternSchema),
    GlobalEnforcedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    GlobalExemptUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    GlobalConfidenceLevel: z.number().min(1).max(3).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  AssociatedPortalArns: z.array(z.string()).optional(),
  CreationDate: z.string().optional(),
  CustomerManagedKey: z.string().optional(),
  DataProtectionSettingsArn: z.string(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  InlineRedactionConfiguration: z.object({
    InlineRedactionPatterns: z.array(InlineRedactionPatternSchema),
    GlobalEnforcedUrls: z.array(z.string()),
    GlobalExemptUrls: z.array(z.string()),
    GlobalConfidenceLevel: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp("^[ _\\-\\d\\w]+$"))
    .optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^[ _\\-\\d\\w]+$"))
    .optional(),
  InlineRedactionConfiguration: z.object({
    InlineRedactionPatterns: z.array(InlineRedactionPatternSchema).optional(),
    GlobalEnforcedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    GlobalExemptUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    GlobalConfidenceLevel: z.number().min(1).max(3).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/workspacesweb/data-protection-settings",
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
      description: "WorkSpacesWeb DataProtectionSettings resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesWeb DataProtectionSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WorkSpacesWeb::DataProtectionSettings",
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
      description: "Get a WorkSpacesWeb DataProtectionSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb DataProtectionSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::WorkSpacesWeb::DataProtectionSettings",
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
      description: "Update a WorkSpacesWeb DataProtectionSettings",
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
        const identifier = existing.DataProtectionSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpacesWeb::DataProtectionSettings",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WorkSpacesWeb::DataProtectionSettings",
          identifier,
          currentState,
          desiredState,
          ["AdditionalEncryptionContext", "CustomerManagedKey"],
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
      description: "Delete a WorkSpacesWeb DataProtectionSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb DataProtectionSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::WorkSpacesWeb::DataProtectionSettings",
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
      description: "Sync WorkSpacesWeb DataProtectionSettings state from AWS",
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
        const identifier = existing.DataProtectionSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpacesWeb::DataProtectionSettings",
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
