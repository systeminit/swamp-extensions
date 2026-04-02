// Auto-generated extension model for @swamp/gcp/cloudkms/keyrings-importjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/importJobs/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.keyRings.importJobs.get",
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
  "id": "cloudkms.projects.locations.keyRings.importJobs.create",
  "path": "v1/{+parent}/importJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "importJobId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()).describe(
        "Cavium certificate chain corresponding to the attestation.",
      ).optional(),
      googleCardCerts: z.array(z.string()).describe(
        "Google card certificate chain corresponding to the attestation.",
      ).optional(),
      googlePartitionCerts: z.array(z.string()).describe(
        "Google partition certificate chain corresponding to the attestation.",
      ).optional(),
    }).describe(
      "Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.",
    ).optional(),
    content: z.string().describe(
      "Output only. The attestation data provided by the HSM when the key operation was performed.",
    ).optional(),
    format: z.enum([
      "ATTESTATION_FORMAT_UNSPECIFIED",
      "CAVIUM_V1_COMPRESSED",
      "CAVIUM_V2_COMPRESSED",
    ]).describe("Output only. The format of the attestation data.").optional(),
  }).describe(
    "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
  ).optional(),
  cryptoKeyBackend: z.string().describe(
    'Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: * `"projects/*/locations/*/singleTenantHsmInstances/*"`',
  ).optional(),
  importMethod: z.enum([
    "IMPORT_METHOD_UNSPECIFIED",
    "RSA_OAEP_3072_SHA1_AES_256",
    "RSA_OAEP_4096_SHA1_AES_256",
    "RSA_OAEP_3072_SHA256_AES_256",
    "RSA_OAEP_4096_SHA256_AES_256",
    "RSA_OAEP_3072_SHA256",
    "RSA_OAEP_4096_SHA256",
  ]).describe(
    "Required. Immutable. The wrapping method to be used for incoming key material.",
  ).optional(),
  protectionLevel: z.enum([
    "PROTECTION_LEVEL_UNSPECIFIED",
    "SOFTWARE",
    "HSM",
    "EXTERNAL",
    "EXTERNAL_VPC",
    "HSM_SINGLE_TENANT",
  ]).describe(
    "Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into.",
  ).optional(),
  publicKey: z.object({
    pem: z.string().describe(
      "The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13).",
    ).optional(),
  }).describe(
    "The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.",
  ).optional(),
  importJobId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()),
      googleCardCerts: z.array(z.string()),
      googlePartitionCerts: z.array(z.string()),
    }),
    content: z.string(),
    format: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  cryptoKeyBackend: z.string().optional(),
  expireEventTime: z.string().optional(),
  expireTime: z.string().optional(),
  generateTime: z.string().optional(),
  importMethod: z.string().optional(),
  name: z.string(),
  protectionLevel: z.string().optional(),
  publicKey: z.object({
    pem: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  attestation: z.object({
    certChains: z.object({
      caviumCerts: z.array(z.string()).describe(
        "Cavium certificate chain corresponding to the attestation.",
      ).optional(),
      googleCardCerts: z.array(z.string()).describe(
        "Google card certificate chain corresponding to the attestation.",
      ).optional(),
      googlePartitionCerts: z.array(z.string()).describe(
        "Google partition certificate chain corresponding to the attestation.",
      ).optional(),
    }).describe(
      "Certificate chains needed to verify the attestation. Certificates in chains are PEM-encoded and are ordered based on https://tools.ietf.org/html/rfc5246#section-7.4.2.",
    ).optional(),
    content: z.string().describe(
      "Output only. The attestation data provided by the HSM when the key operation was performed.",
    ).optional(),
    format: z.enum([
      "ATTESTATION_FORMAT_UNSPECIFIED",
      "CAVIUM_V1_COMPRESSED",
      "CAVIUM_V2_COMPRESSED",
    ]).describe("Output only. The format of the attestation data.").optional(),
  }).describe(
    "Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).",
  ).optional(),
  cryptoKeyBackend: z.string().describe(
    'Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: * `"projects/*/locations/*/singleTenantHsmInstances/*"`',
  ).optional(),
  importMethod: z.enum([
    "IMPORT_METHOD_UNSPECIFIED",
    "RSA_OAEP_3072_SHA1_AES_256",
    "RSA_OAEP_4096_SHA1_AES_256",
    "RSA_OAEP_3072_SHA256_AES_256",
    "RSA_OAEP_4096_SHA256_AES_256",
    "RSA_OAEP_3072_SHA256",
    "RSA_OAEP_4096_SHA256",
  ]).describe(
    "Required. Immutable. The wrapping method to be used for incoming key material.",
  ).optional(),
  protectionLevel: z.enum([
    "PROTECTION_LEVEL_UNSPECIFIED",
    "SOFTWARE",
    "HSM",
    "EXTERNAL",
    "EXTERNAL_VPC",
    "HSM_SINGLE_TENANT",
  ]).describe(
    "Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into.",
  ).optional(),
  publicKey: z.object({
    pem: z.string().describe(
      "The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13).",
    ).optional(),
  }).describe(
    "The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.",
  ).optional(),
  importJobId: z.string().describe(
    "Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/cloudkms/keyrings-importjobs",
  version: "2026.04.02.2",
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
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a importJobs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["cryptoKeyBackend"] !== undefined) {
          body["cryptoKeyBackend"] = g["cryptoKeyBackend"];
        }
        if (g["importMethod"] !== undefined) {
          body["importMethod"] = g["importMethod"];
        }
        if (g["protectionLevel"] !== undefined) {
          body["protectionLevel"] = g["protectionLevel"];
        }
        if (g["publicKey"] !== undefined) body["publicKey"] = g["publicKey"];
        if (g["importJobId"] !== undefined) {
          body["importJobId"] = g["importJobId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a importJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the importJobs"),
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
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync importJobs state from GCP",
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
  },
};
