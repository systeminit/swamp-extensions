// Auto-generated extension model for @swamp/gcp/discoveryengine/identitymappingstores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/identityMappingStores/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.identityMappingStores.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "discoveryengine.projects.locations.identityMappingStores.create",
  "path": "v1/{+parent}/identityMappingStores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cmekConfigName": {
      "location": "query",
    },
    "disableCmek": {
      "location": "query",
    },
    "identityMappingStoreId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "discoveryengine.projects.locations.identityMappingStores.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this Identity Mapping Store at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the Identity Mapping Store will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the identity mapping store. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this Identity Mapping Store.",
  ).optional(),
  disableCmek: z.string().describe(
    "Identity Mapping Store without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  identityMappingStoreId: z.string().describe(
    "Required. The ID of the Identity Mapping Store to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cmekConfig: z.object({
    isDefault: z.boolean(),
    kmsKey: z.string(),
    kmsKeyVersion: z.string(),
    lastRotationTimestampMicros: z.string(),
    name: z.string(),
    notebooklmState: z.string(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string(),
    })),
    state: z.string(),
  }).optional(),
  kmsKeyName: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this Identity Mapping Store at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the Identity Mapping Store will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the identity mapping store. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this Identity Mapping Store.",
  ).optional(),
  disableCmek: z.string().describe(
    "Identity Mapping Store without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  identityMappingStoreId: z.string().describe(
    "Required. The ID of the Identity Mapping Store to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/discoveryengine/identitymappingstores",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Identity Mapping Store which contains Identity Mapping Entries.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a identityMappingStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["cmekConfigName"] !== undefined) {
          body["cmekConfigName"] = g["cmekConfigName"];
        }
        if (g["disableCmek"] !== undefined) {
          body["disableCmek"] = g["disableCmek"];
        }
        if (g["identityMappingStoreId"] !== undefined) {
          body["identityMappingStoreId"] = g["identityMappingStoreId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a identityMappingStores",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the identityMappingStores",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ??
          args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the identityMappingStores",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the identityMappingStores",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = g.name?.toString() ?? args.identifier;
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
      description: "Sync identityMappingStores state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
    import_identity_mappings: {
      description: "import identity mappings",
      arguments: z.object({
        inlineSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.importIdentityMappings",
            "path": "v1/{+identityMappingStore}:importIdentityMappings",
            "httpMethod": "POST",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_identity_mappings: {
      description: "list identity mappings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.listIdentityMappings",
            "path": "v1/{+identityMappingStore}:listIdentityMappings",
            "httpMethod": "GET",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    purge_identity_mappings: {
      description: "purge identity mappings",
      arguments: z.object({
        filter: z.any().optional(),
        force: z.any().optional(),
        inlineSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.purgeIdentityMappings",
            "path": "v1/{+identityMappingStore}:purgeIdentityMappings",
            "httpMethod": "POST",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
