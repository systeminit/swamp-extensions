// Auto-generated extension model for @swamp/gcp/binaryauthorization/platforms-policies
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
  return `${parent}/policies/${shortName}`;
}

const BASE_URL = "https://binaryauthorization.googleapis.com/";

const GET_CONFIG = {
  "id": "binaryauthorization.projects.platforms.policies.get",
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
  "id": "binaryauthorization.projects.platforms.policies.create",
  "path": "v1/{+parent}/policies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "policyId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "binaryauthorization.projects.platforms.policies.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe(
    "Optional. A description comment about the policy.",
  ).optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.boolean().describe(
          'Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn\'t exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny".',
        ).optional(),
        displayName: z.string().describe(
          "Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
        ).optional(),
        imageAllowlist: z.object({
          allowPattern: z.array(z.string()).describe(
            "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
          ).optional(),
        }).describe(
          "Images that are exempted from normal checks based on name pattern only.",
        ).optional(),
        imageFreshnessCheck: z.object({
          maxUploadAgeDays: z.number().int().describe(
            "Required. The max number of days that is allowed since the image was uploaded. Must be greater than zero.",
          ).optional(),
        }).describe(
          "An image freshness check, which rejects images that were uploaded before the set number of days ago to the supported repositories.",
        ).optional(),
        sigstoreSignatureCheck: z.object({
          sigstoreAuthorities: z.array(z.object({
            displayName: z.string().describe(
              "Optional. A user-provided name for this `SigstoreAuthority`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
            ).optional(),
            publicKeySet: z.object({
              publicKeys: z.array(z.object({
                publicKeyPem: z.string().describe(
                  "The public key material in PEM format.",
                ).optional(),
              })).describe(
                "Required. `public_keys` must have at least one entry.",
              ).optional(),
            }).describe(
              "A bundle of Sigstore public keys, used to verify Sigstore signatures. A signature is authenticated by a `SigstorePublicKeySet` if any of the keys verify it.",
            ).optional(),
          })).describe(
            "Required. The authorities required by this check to verify the signature. A signature only needs to be verified by one authority to pass the check.",
          ).optional(),
        }).describe(
          "A Sigstore signature check, which verifies the Sigstore signature associated with an image.",
        ).optional(),
        simpleSigningAttestationCheck: z.object({
          attestationAuthenticators: z.array(z.object({
            displayName: z.string().describe(
              "Optional. A user-provided name for this `AttestationAuthenticator`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
            ).optional(),
            pkixPublicKeySet: z.object({
              pkixPublicKeys: z.array(z.object({
                keyId: z.string().describe(
                  "Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value.",
                ).optional(),
                publicKeyPem: z.string().describe(
                  "A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13",
                ).optional(),
                signatureAlgorithm: z.enum([
                  "SIGNATURE_ALGORITHM_UNSPECIFIED",
                  "RSA_PSS_2048_SHA256",
                  "RSA_SIGN_PSS_2048_SHA256",
                  "RSA_PSS_3072_SHA256",
                  "RSA_SIGN_PSS_3072_SHA256",
                  "RSA_PSS_4096_SHA256",
                  "RSA_SIGN_PSS_4096_SHA256",
                  "RSA_PSS_4096_SHA512",
                  "RSA_SIGN_PSS_4096_SHA512",
                  "RSA_SIGN_PKCS1_2048_SHA256",
                  "RSA_SIGN_PKCS1_3072_SHA256",
                  "RSA_SIGN_PKCS1_4096_SHA256",
                  "RSA_SIGN_PKCS1_4096_SHA512",
                  "ECDSA_P256_SHA256",
                  "EC_SIGN_P256_SHA256",
                  "ECDSA_P384_SHA384",
                  "EC_SIGN_P384_SHA384",
                  "ECDSA_P521_SHA512",
                  "EC_SIGN_P521_SHA512",
                ]).describe(
                  "The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key).",
                ).optional(),
              })).describe(
                "Required. `pkix_public_keys` must have at least one entry.",
              ).optional(),
            }).describe(
              'A bundle of PKIX public keys, used to authenticate attestation signatures. Generally, a signature is considered to be authenticated by a `PkixPublicKeySet` if any of the public keys verify it (i.e. it is an "OR" of the keys).',
            ).optional(),
          })).describe(
            'Required. The authenticators required by this check to verify an attestation. Typically this is one or more PKIX public keys for signature verification. Only one authenticator needs to consider an attestation verified in order for an attestation to be considered fully authenticated. In otherwords, this list of authenticators is an "OR" of the authenticator results. At least one authenticator is required.',
          ).optional(),
          containerAnalysisAttestationProjects: z.array(z.string()).describe(
            "Optional. The projects where attestations are stored as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Only one attestation needs to successfully verify an image for this check to pass, so a single verified attestation found in any of `container_analysis_attestation_projects` is sufficient for the check to pass. A project ID must be used, not a project number. When fetching Occurrences from Container Analysis, only `AttestationOccurrence` kinds are considered. In the future, additional Occurrence kinds may be added to the query. Maximum number of `container_analysis_attestation_projects` allowed in each `SimpleSigningAttestationCheck` is 10.",
          ).optional(),
        }).describe(
          "Require a signed [DSSE](https://github.com/secure-systems-lab/dsse) attestation with type SimpleSigning.",
        ).optional(),
        slsaCheck: z.object({
          rules: z.array(z.object({
            attestationSource: z.object({
              containerAnalysisAttestationProjects: z.array(z.string())
                .describe(
                  "The IDs of the Google Cloud projects that store the SLSA attestations as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Maximum number of `container_analysis_attestation_projects` allowed in each `AttestationSource` is 10.",
                ).optional(),
            }).describe(
              "Specifies the locations for fetching the provenance attestations.",
            ).optional(),
            configBasedBuildRequired: z.boolean().describe(
              "If true, require the image to be built from a top-level configuration. `trusted_source_repo_patterns` specifies the repositories containing this configuration.",
            ).optional(),
            customConstraints: z.string().describe(
              "Optional. A CEL expression for specifying custom constraints on the provenance payload. This can be used when users want to specify expectations on provenance fields that are not covered by the general check. For example, users can use this field to require that certain parameters should never be used during the build process.",
            ).optional(),
            trustedBuilder: z.enum([
              "BUILDER_UNSPECIFIED",
              "GOOGLE_CLOUD_BUILD",
            ]).describe(
              "Each verification rule is used for evaluation against provenances generated by a specific builder (group). For some of the builders, such as the Google Cloud Build, users don't need to explicitly specify their roots of trust in the policy since the evaluation service can automatically fetch them based on the builder (group).",
            ).optional(),
            trustedSourceRepoPatterns: z.array(z.string()).describe(
              "List of trusted source code repository URL patterns. These patterns match the full repository URL without its scheme (e.g. `https://`). The patterns must not include schemes. For example, the pattern `source.cloud.google.com/my-project/my-repo-name` matches the following URLs: - `source.cloud.google.com/my-project/my-repo-name` - `git+ssh://source.cloud.google.com/my-project/my-repo-name` - `https://source.cloud.google.com/my-project/my-repo-name` A pattern matches a URL either exactly or with `*` wildcards. `*` can be used in only two ways: 1. trailing `*` after hosturi/ to match varying endings; 2. trailing `**` after hosturi/ to match `/` as well. `*` and `**` can only be used as wildcards and can only occur at the end of the pattern after a `/`. (So it's not possible to match a URL that contains literal `*`.) For example: - `github.com/my-project/my-repo` is valid to match a single repo - `github.com/my-project/*` will match all direct repos in `my-project` - `github.com/**` matches all repos in GitHub",
            ).optional(),
          })).describe(
            "Specifies a list of verification rules for the SLSA attestations. An image is considered compliant with the SlsaCheck if any of the rules are satisfied.",
          ).optional(),
        }).describe(
          "A SLSA provenance attestation check, which ensures that images are built by a trusted builder using source code from its trusted repositories only.",
        ).optional(),
        trustedDirectoryCheck: z.object({
          trustedDirPatterns: z.array(z.string()).describe(
            'Required. List of trusted directory patterns. A pattern is in the form "registry/path/to/directory". The registry domain part is defined as two or more dot-separated words, e.g., `us.pkg.dev`, or `gcr.io`. Additionally, `*` can be used in three ways as wildcards: 1. leading `*` to match varying prefixes in registry subdomain (useful for location prefixes); 2. trailing `*` after registry/ to match varying endings; 3. trailing `**` after registry/ to match "/" as well. For example: -- `gcr.io/my-project/my-repo` is valid to match a single directory -- `*-docker.pkg.dev/my-project/my-repo` or `*.gcr.io/my-project` are valid to match varying prefixes -- `gcr.io/my-project/*` will match all direct directories in `my-project` -- `gcr.io/my-project/**` would match all directories in `my-project` -- `gcr.i*` is not allowed since the registry is not completely specified -- `sub*domain.gcr.io/nginx` is not valid because only leading `*` or trailing `*` are allowed. -- `*pkg.dev/my-project/my-repo` is not valid because leading `*` can only match subdomain -- `**-docker.pkg.dev` is not valid because one leading `*` is allowed, and that it cannot match `/`',
          ).optional(),
        }).describe(
          "A trusted directory check, which rejects images that do not come from the set of user-configured trusted directories.",
        ).optional(),
        vulnerabilityCheck: z.object({
          allowedCves: z.array(z.string()).describe(
            "Optional. A list of specific CVEs to ignore even if the vulnerability level violates `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will allow vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`.",
          ).optional(),
          blockedCves: z.array(z.string()).describe(
            "Optional. A list of specific CVEs to always raise warnings about even if the vulnerability level meets `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will block vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`.",
          ).optional(),
          containerAnalysisVulnerabilityProjects: z.array(z.string()).describe(
            "Optional. The projects where vulnerabilities are stored as Container Analysis Occurrences. Each project is expressed in the resource format of `projects/[PROJECT_ID]`, e.g., `projects/my-gcp-project`. An attempt will be made for each project to fetch vulnerabilities, and all valid vulnerabilities will be used to check against the vulnerability policy. If no valid scan is found in all projects configured here, an error will be returned for the check. Maximum number of `container_analysis_vulnerability_projects` allowed in each `VulnerabilityCheck` is 10.",
          ).optional(),
          maximumFixableSeverity: z.enum([
            "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED",
            "BLOCK_ALL",
            "MINIMAL",
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL",
            "ALLOW_ALL",
          ]).describe(
            "Required. The threshold for severity for which a fix is currently available. This field is required and must be set.",
          ).optional(),
          maximumUnfixableSeverity: z.enum([
            "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED",
            "BLOCK_ALL",
            "MINIMAL",
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL",
            "ALLOW_ALL",
          ]).describe(
            "Required. The threshold for severity for which a fix isn't currently available. This field is required and must be set.",
          ).optional(),
        }).describe(
          "An image vulnerability check, which rejects images that violate the configured vulnerability rules.",
        ).optional(),
      })).describe(
        'Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow".',
      ).optional(),
      displayName: z.string().describe(
        "Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
      ).optional(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.string()).describe(
          "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
        ).optional(),
      }).describe(
        "Images that are exempted from normal checks based on name pattern only.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe("A scope specifier for `CheckSet` objects.").optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Images that are exempted from normal checks based on name pattern only.",
    ).optional(),
  }).describe(
    "A Binary Authorization policy for a GKE cluster. This is one type of policy that can occur as a `PlatformPolicy`.",
  ).optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  etag: z.string().optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.boolean(),
        displayName: z.string(),
        imageAllowlist: z.object({
          allowPattern: z.array(z.string()),
        }),
        imageFreshnessCheck: z.object({
          maxUploadAgeDays: z.number(),
        }),
        sigstoreSignatureCheck: z.object({
          sigstoreAuthorities: z.array(z.object({
            displayName: z.string(),
            publicKeySet: z.object({
              publicKeys: z.array(z.object({
                publicKeyPem: z.string(),
              })),
            }),
          })),
        }),
        simpleSigningAttestationCheck: z.object({
          attestationAuthenticators: z.array(z.object({
            displayName: z.string(),
            pkixPublicKeySet: z.object({
              pkixPublicKeys: z.array(z.object({
                keyId: z.string(),
                publicKeyPem: z.string(),
                signatureAlgorithm: z.string(),
              })),
            }),
          })),
          containerAnalysisAttestationProjects: z.array(z.string()),
        }),
        slsaCheck: z.object({
          rules: z.array(z.object({
            attestationSource: z.object({
              containerAnalysisAttestationProjects: z.array(z.string()),
            }),
            configBasedBuildRequired: z.boolean(),
            customConstraints: z.string(),
            trustedBuilder: z.string(),
            trustedSourceRepoPatterns: z.array(z.string()),
          })),
        }),
        trustedDirectoryCheck: z.object({
          trustedDirPatterns: z.array(z.string()),
        }),
        vulnerabilityCheck: z.object({
          allowedCves: z.array(z.string()),
          blockedCves: z.array(z.string()),
          containerAnalysisVulnerabilityProjects: z.array(z.string()),
          maximumFixableSeverity: z.string(),
          maximumUnfixableSeverity: z.string(),
        }),
      })),
      displayName: z.string(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.string()),
      }),
      scope: z.object({
        kubernetesNamespace: z.string(),
        kubernetesServiceAccount: z.string(),
      }),
    })),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()),
    }),
  }).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe(
    "Optional. A description comment about the policy.",
  ).optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.boolean().describe(
          'Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn\'t exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny".',
        ).optional(),
        displayName: z.string().describe(
          "Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
        ).optional(),
        imageAllowlist: z.object({
          allowPattern: z.array(z.string()).describe(
            "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
          ).optional(),
        }).describe(
          "Images that are exempted from normal checks based on name pattern only.",
        ).optional(),
        imageFreshnessCheck: z.object({
          maxUploadAgeDays: z.number().int().describe(
            "Required. The max number of days that is allowed since the image was uploaded. Must be greater than zero.",
          ).optional(),
        }).describe(
          "An image freshness check, which rejects images that were uploaded before the set number of days ago to the supported repositories.",
        ).optional(),
        sigstoreSignatureCheck: z.object({
          sigstoreAuthorities: z.array(z.object({
            displayName: z.string().describe(
              "Optional. A user-provided name for this `SigstoreAuthority`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
            ).optional(),
            publicKeySet: z.object({
              publicKeys: z.array(z.object({
                publicKeyPem: z.string().describe(
                  "The public key material in PEM format.",
                ).optional(),
              })).describe(
                "Required. `public_keys` must have at least one entry.",
              ).optional(),
            }).describe(
              "A bundle of Sigstore public keys, used to verify Sigstore signatures. A signature is authenticated by a `SigstorePublicKeySet` if any of the keys verify it.",
            ).optional(),
          })).describe(
            "Required. The authorities required by this check to verify the signature. A signature only needs to be verified by one authority to pass the check.",
          ).optional(),
        }).describe(
          "A Sigstore signature check, which verifies the Sigstore signature associated with an image.",
        ).optional(),
        simpleSigningAttestationCheck: z.object({
          attestationAuthenticators: z.array(z.object({
            displayName: z.string().describe(
              "Optional. A user-provided name for this `AttestationAuthenticator`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
            ).optional(),
            pkixPublicKeySet: z.object({
              pkixPublicKeys: z.array(z.object({
                keyId: z.string().describe(
                  "Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value.",
                ).optional(),
                publicKeyPem: z.string().describe(
                  "A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13",
                ).optional(),
                signatureAlgorithm: z.enum([
                  "SIGNATURE_ALGORITHM_UNSPECIFIED",
                  "RSA_PSS_2048_SHA256",
                  "RSA_SIGN_PSS_2048_SHA256",
                  "RSA_PSS_3072_SHA256",
                  "RSA_SIGN_PSS_3072_SHA256",
                  "RSA_PSS_4096_SHA256",
                  "RSA_SIGN_PSS_4096_SHA256",
                  "RSA_PSS_4096_SHA512",
                  "RSA_SIGN_PSS_4096_SHA512",
                  "RSA_SIGN_PKCS1_2048_SHA256",
                  "RSA_SIGN_PKCS1_3072_SHA256",
                  "RSA_SIGN_PKCS1_4096_SHA256",
                  "RSA_SIGN_PKCS1_4096_SHA512",
                  "ECDSA_P256_SHA256",
                  "EC_SIGN_P256_SHA256",
                  "ECDSA_P384_SHA384",
                  "EC_SIGN_P384_SHA384",
                  "ECDSA_P521_SHA512",
                  "EC_SIGN_P521_SHA512",
                ]).describe(
                  "The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key).",
                ).optional(),
              })).describe(
                "Required. `pkix_public_keys` must have at least one entry.",
              ).optional(),
            }).describe(
              'A bundle of PKIX public keys, used to authenticate attestation signatures. Generally, a signature is considered to be authenticated by a `PkixPublicKeySet` if any of the public keys verify it (i.e. it is an "OR" of the keys).',
            ).optional(),
          })).describe(
            'Required. The authenticators required by this check to verify an attestation. Typically this is one or more PKIX public keys for signature verification. Only one authenticator needs to consider an attestation verified in order for an attestation to be considered fully authenticated. In otherwords, this list of authenticators is an "OR" of the authenticator results. At least one authenticator is required.',
          ).optional(),
          containerAnalysisAttestationProjects: z.array(z.string()).describe(
            "Optional. The projects where attestations are stored as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Only one attestation needs to successfully verify an image for this check to pass, so a single verified attestation found in any of `container_analysis_attestation_projects` is sufficient for the check to pass. A project ID must be used, not a project number. When fetching Occurrences from Container Analysis, only `AttestationOccurrence` kinds are considered. In the future, additional Occurrence kinds may be added to the query. Maximum number of `container_analysis_attestation_projects` allowed in each `SimpleSigningAttestationCheck` is 10.",
          ).optional(),
        }).describe(
          "Require a signed [DSSE](https://github.com/secure-systems-lab/dsse) attestation with type SimpleSigning.",
        ).optional(),
        slsaCheck: z.object({
          rules: z.array(z.object({
            attestationSource: z.object({
              containerAnalysisAttestationProjects: z.array(z.string())
                .describe(
                  "The IDs of the Google Cloud projects that store the SLSA attestations as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Maximum number of `container_analysis_attestation_projects` allowed in each `AttestationSource` is 10.",
                ).optional(),
            }).describe(
              "Specifies the locations for fetching the provenance attestations.",
            ).optional(),
            configBasedBuildRequired: z.boolean().describe(
              "If true, require the image to be built from a top-level configuration. `trusted_source_repo_patterns` specifies the repositories containing this configuration.",
            ).optional(),
            customConstraints: z.string().describe(
              "Optional. A CEL expression for specifying custom constraints on the provenance payload. This can be used when users want to specify expectations on provenance fields that are not covered by the general check. For example, users can use this field to require that certain parameters should never be used during the build process.",
            ).optional(),
            trustedBuilder: z.enum([
              "BUILDER_UNSPECIFIED",
              "GOOGLE_CLOUD_BUILD",
            ]).describe(
              "Each verification rule is used for evaluation against provenances generated by a specific builder (group). For some of the builders, such as the Google Cloud Build, users don't need to explicitly specify their roots of trust in the policy since the evaluation service can automatically fetch them based on the builder (group).",
            ).optional(),
            trustedSourceRepoPatterns: z.array(z.string()).describe(
              "List of trusted source code repository URL patterns. These patterns match the full repository URL without its scheme (e.g. `https://`). The patterns must not include schemes. For example, the pattern `source.cloud.google.com/my-project/my-repo-name` matches the following URLs: - `source.cloud.google.com/my-project/my-repo-name` - `git+ssh://source.cloud.google.com/my-project/my-repo-name` - `https://source.cloud.google.com/my-project/my-repo-name` A pattern matches a URL either exactly or with `*` wildcards. `*` can be used in only two ways: 1. trailing `*` after hosturi/ to match varying endings; 2. trailing `**` after hosturi/ to match `/` as well. `*` and `**` can only be used as wildcards and can only occur at the end of the pattern after a `/`. (So it's not possible to match a URL that contains literal `*`.) For example: - `github.com/my-project/my-repo` is valid to match a single repo - `github.com/my-project/*` will match all direct repos in `my-project` - `github.com/**` matches all repos in GitHub",
            ).optional(),
          })).describe(
            "Specifies a list of verification rules for the SLSA attestations. An image is considered compliant with the SlsaCheck if any of the rules are satisfied.",
          ).optional(),
        }).describe(
          "A SLSA provenance attestation check, which ensures that images are built by a trusted builder using source code from its trusted repositories only.",
        ).optional(),
        trustedDirectoryCheck: z.object({
          trustedDirPatterns: z.array(z.string()).describe(
            'Required. List of trusted directory patterns. A pattern is in the form "registry/path/to/directory". The registry domain part is defined as two or more dot-separated words, e.g., `us.pkg.dev`, or `gcr.io`. Additionally, `*` can be used in three ways as wildcards: 1. leading `*` to match varying prefixes in registry subdomain (useful for location prefixes); 2. trailing `*` after registry/ to match varying endings; 3. trailing `**` after registry/ to match "/" as well. For example: -- `gcr.io/my-project/my-repo` is valid to match a single directory -- `*-docker.pkg.dev/my-project/my-repo` or `*.gcr.io/my-project` are valid to match varying prefixes -- `gcr.io/my-project/*` will match all direct directories in `my-project` -- `gcr.io/my-project/**` would match all directories in `my-project` -- `gcr.i*` is not allowed since the registry is not completely specified -- `sub*domain.gcr.io/nginx` is not valid because only leading `*` or trailing `*` are allowed. -- `*pkg.dev/my-project/my-repo` is not valid because leading `*` can only match subdomain -- `**-docker.pkg.dev` is not valid because one leading `*` is allowed, and that it cannot match `/`',
          ).optional(),
        }).describe(
          "A trusted directory check, which rejects images that do not come from the set of user-configured trusted directories.",
        ).optional(),
        vulnerabilityCheck: z.object({
          allowedCves: z.array(z.string()).describe(
            "Optional. A list of specific CVEs to ignore even if the vulnerability level violates `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will allow vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`.",
          ).optional(),
          blockedCves: z.array(z.string()).describe(
            "Optional. A list of specific CVEs to always raise warnings about even if the vulnerability level meets `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will block vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`.",
          ).optional(),
          containerAnalysisVulnerabilityProjects: z.array(z.string()).describe(
            "Optional. The projects where vulnerabilities are stored as Container Analysis Occurrences. Each project is expressed in the resource format of `projects/[PROJECT_ID]`, e.g., `projects/my-gcp-project`. An attempt will be made for each project to fetch vulnerabilities, and all valid vulnerabilities will be used to check against the vulnerability policy. If no valid scan is found in all projects configured here, an error will be returned for the check. Maximum number of `container_analysis_vulnerability_projects` allowed in each `VulnerabilityCheck` is 10.",
          ).optional(),
          maximumFixableSeverity: z.enum([
            "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED",
            "BLOCK_ALL",
            "MINIMAL",
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL",
            "ALLOW_ALL",
          ]).describe(
            "Required. The threshold for severity for which a fix is currently available. This field is required and must be set.",
          ).optional(),
          maximumUnfixableSeverity: z.enum([
            "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED",
            "BLOCK_ALL",
            "MINIMAL",
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL",
            "ALLOW_ALL",
          ]).describe(
            "Required. The threshold for severity for which a fix isn't currently available. This field is required and must be set.",
          ).optional(),
        }).describe(
          "An image vulnerability check, which rejects images that violate the configured vulnerability rules.",
        ).optional(),
      })).describe(
        'Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow".',
      ).optional(),
      displayName: z.string().describe(
        "Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
      ).optional(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.string()).describe(
          "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
        ).optional(),
      }).describe(
        "Images that are exempted from normal checks based on name pattern only.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe("A scope specifier for `CheckSet` objects.").optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Images that are exempted from normal checks based on name pattern only.",
    ).optional(),
  }).describe(
    "A Binary Authorization policy for a GKE cluster. This is one type of policy that can occur as a `PlatformPolicy`.",
  ).optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/binaryauthorization/platforms-policies",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Binary Authorization platform policy for deployments on various platforms.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gkePolicy"] !== undefined) body["gkePolicy"] = g["gkePolicy"];
        if (g["policyId"] !== undefined) body["policyId"] = g["policyId"];
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
      description: "Get a policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
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
    delete: {
      description: "Delete the policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
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
      description: "Sync policies state from GCP",
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
    replace_platform_policy: {
      description: "replace platform policy",
      arguments: z.object({
        description: z.any().optional(),
        etag: z.any().optional(),
        gkePolicy: z.any().optional(),
        name: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["gkePolicy"] !== undefined) {
          body["gkePolicy"] = args["gkePolicy"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "binaryauthorization.projects.platforms.policies.replacePlatformPolicy",
            "path": "v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
