// Auto-generated extension model for @swamp/aws/workspacesweb/browser-settings
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
  BrowserPolicy: z.string().min(2).max(131072).regex(
    new RegExp("^\\{[\\S\\s]*\\}\\s*$"),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  WebContentFilteringPolicy: z.object({
    BlockedCategories: z.array(
      z.enum([
        "Cults",
        "Gambling",
        "Nudity",
        "Pornography",
        "SexEducation",
        "Tasteless",
        "Violence",
        "DownloadSites",
        "ImageSharing",
        "PeerToPeer",
        "StreamingMediaAndDownloads",
        "GenerativeAI",
        "CriminalActivity",
        "Hacking",
        "HateAndIntolerance",
        "IllegalDrug",
        "IllegalSoftware",
        "SchoolCheating",
        "SelfHarm",
        "Weapons",
        "Chat",
        "Games",
        "InstantMessaging",
        "ProfessionalNetwork",
        "SocialNetworking",
        "WebBasedEmail",
        "ParkedDomains",
      ]),
    ).optional(),
    AllowedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    BlockedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  AssociatedPortalArns: z.array(z.string()).optional(),
  BrowserPolicy: z.string().optional(),
  BrowserSettingsArn: z.string(),
  CustomerManagedKey: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  WebContentFilteringPolicy: z.object({
    BlockedCategories: z.array(z.string()),
    AllowedUrls: z.array(z.string()),
    BlockedUrls: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  BrowserPolicy: z.string().min(2).max(131072).regex(
    new RegExp("^\\{[\\S\\s]*\\}\\s*$"),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  WebContentFilteringPolicy: z.object({
    BlockedCategories: z.array(
      z.enum([
        "Cults",
        "Gambling",
        "Nudity",
        "Pornography",
        "SexEducation",
        "Tasteless",
        "Violence",
        "DownloadSites",
        "ImageSharing",
        "PeerToPeer",
        "StreamingMediaAndDownloads",
        "GenerativeAI",
        "CriminalActivity",
        "Hacking",
        "HateAndIntolerance",
        "IllegalDrug",
        "IllegalSoftware",
        "SchoolCheating",
        "SelfHarm",
        "Weapons",
        "Chat",
        "Games",
        "InstantMessaging",
        "ProfessionalNetwork",
        "SocialNetworking",
        "WebBasedEmail",
        "ParkedDomains",
      ]),
    ).optional(),
    AllowedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
    BlockedUrls: z.array(
      z.string().regex(
        new RegExp(
          "^((([a-zA-Z][a-zA-Z0-9+.-]*):\\/\\/(\\*|[\\w%._\\-\\+~#=@]+)?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?)|(\\*|[\\w%._\\-\\+~#=@]+\\.[\\w%._\\-\\+~#=@]+)(?::(\\d{1,5}))?(\\/[^@\\s]*)?(?:\\?([^*\\s]+(?:\\*?)))?|(([a-zA-Z][a-zA-Z0-9+.-]*):(\\/\\/)?\\*))$",
        ),
      ),
    ).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/workspacesweb/browser-settings",
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
      description: "WorkSpacesWeb BrowserSettings resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesWeb BrowserSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WorkSpacesWeb::BrowserSettings",
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
      description: "Get a WorkSpacesWeb BrowserSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb BrowserSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::WorkSpacesWeb::BrowserSettings",
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
      description: "Update a WorkSpacesWeb BrowserSettings",
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
        const identifier = existing.BrowserSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpacesWeb::BrowserSettings",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WorkSpacesWeb::BrowserSettings",
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
      description: "Delete a WorkSpacesWeb BrowserSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb BrowserSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::WorkSpacesWeb::BrowserSettings",
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
      description: "Sync WorkSpacesWeb BrowserSettings state from AWS",
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
        const identifier = existing.BrowserSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpacesWeb::BrowserSettings",
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
