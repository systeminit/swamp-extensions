// Auto-generated extension model for @swamp/gcp/blogger/bloguserinfos
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.blogUserInfos.get",
  "path": "v3/users/{userId}/blogs/{blogId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "maxPosts": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  blog: z.object({
    customMetaData: z.string(),
    description: z.string(),
    id: z.string(),
    kind: z.string(),
    locale: z.object({
      country: z.string(),
      language: z.string(),
      variant: z.string(),
    }),
    name: z.string(),
    pages: z.object({
      selfLink: z.string(),
      totalItems: z.number(),
    }),
    posts: z.object({
      items: z.array(z.object({
        author: z.object({
          displayName: z.string(),
          id: z.string(),
          image: z.object({
            url: z.string(),
          }),
          url: z.string(),
        }),
        blog: z.object({
          id: z.string(),
        }),
        content: z.string(),
        customMetaData: z.string(),
        etag: z.string(),
        id: z.string(),
        images: z.array(z.object({
          url: z.string(),
        })),
        kind: z.string(),
        labels: z.array(z.string()),
        location: z.object({
          lat: z.number(),
          lng: z.number(),
          name: z.string(),
          span: z.string(),
        }),
        published: z.string(),
        readerComments: z.string(),
        replies: z.object({
          items: z.array(z.object({
            author: z.object({
              displayName: z.string(),
              id: z.string(),
              image: z.object({
                url: z.string(),
              }),
              url: z.string(),
            }),
            blog: z.object({
              id: z.string(),
            }),
            content: z.string(),
            id: z.string(),
            inReplyTo: z.object({
              id: z.string(),
            }),
            kind: z.string(),
            post: z.object({
              id: z.string(),
            }),
            published: z.string(),
            selfLink: z.string(),
            status: z.string(),
            updated: z.string(),
          })),
          selfLink: z.string(),
          totalItems: z.string(),
        }),
        selfLink: z.string(),
        status: z.string(),
        title: z.string(),
        titleLink: z.string(),
        trashed: z.string(),
        updated: z.string(),
        url: z.string(),
      })),
      selfLink: z.string(),
      totalItems: z.number(),
    }),
    published: z.string(),
    selfLink: z.string(),
    status: z.string(),
    updated: z.string(),
    url: z.string(),
  }).optional(),
  blog_user_info: z.object({
    blogId: z.string(),
    hasAdminAccess: z.boolean(),
    kind: z.string(),
    photosAlbumKey: z.string(),
    role: z.string(),
    userId: z.string(),
  }).optional(),
  kind: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/blogger/bloguserinfos",
  version: "2026.04.03.3",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets one blog and user info pair by blog id and user id.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a blogUserInfos",
      arguments: z.object({
        identifier: z.string().describe("The name of the blogUserInfos"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["blogId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync blogUserInfos state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["blogId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
