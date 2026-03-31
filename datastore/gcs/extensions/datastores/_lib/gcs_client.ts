// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Thin GCS client using the JSON REST API with fetch().
 *
 * Authentication uses Application Default Credentials (ADC):
 * 1. GOOGLE_APPLICATION_CREDENTIALS env var → service account key JSON
 * 2. gcloud CLI default credentials (~/.config/gcloud/application_default_credentials.json)
 * 3. GCE/Cloud Run/GKE metadata server
 */

export interface GcsClientConfig {
  bucket: string;
  prefix?: string;
  projectId?: string;
  /** Custom API endpoint (for emulators like fake-gcs-server). */
  apiEndpoint?: string;
}

/** Result of a GCS object write, including the generation number. */
export interface GcsWriteResult {
  generation: string;
}

/** Result of a GCS object metadata query. */
export interface GcsObjectMetadata {
  exists: boolean;
  size?: number;
  updated?: Date;
  generation?: string;
}

export interface GcsListResult {
  keys: string[];
  truncated: boolean;
  pageToken?: string;
}

/** Error thrown when a GCS precondition fails (HTTP 412). */
export class PreconditionFailedError extends Error {
  override readonly name = "PreconditionFailedError";
}

/** Error thrown when a GCS object is not found (HTTP 404). */
export class NotFoundError extends Error {
  override readonly name = "NotFoundError";
}

// ---------------------------------------------------------------------------
// ADC token acquisition
// ---------------------------------------------------------------------------

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface ServiceAccountKey {
  type: string;
  client_email: string;
  private_key: string;
  token_uri: string;
}

interface UserCredentials {
  type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

/** Cached access token. */
let cachedToken: { token: string; expiresAt: number } | null = null;

/** Base64url-encode a Uint8Array (chunked to avoid call-stack overflow). */
function base64url(data: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < data.length; i += CHUNK) {
    const slice = data.subarray(i, i + CHUNK);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(
    /=+$/,
    "",
  );
}

/** Create a signed JWT for service account authentication. */
async function createSignedJwt(
  sa: ServiceAccountKey,
): Promise<string> {
  const header = base64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })),
  );

  const now = Math.floor(Date.now() / 1000);
  const claims = base64url(
    new TextEncoder().encode(JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/devstorage.full_control",
      aud: sa.token_uri,
      iat: now,
      exp: now + 3600,
    })),
  );

  const signingInput = `${header}.${claims}`;

  // Import the PEM private key
  const pemBody = sa.private_key
    .replace(
      /-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|\n/g,
      "",
    )
    .replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, "");
  const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    ),
  );

  return `${signingInput}.${base64url(signature)}`;
}

/** Exchange a signed JWT for an access token. */
async function tokenFromServiceAccount(
  sa: ServiceAccountKey,
): Promise<TokenResponse> {
  const jwt = await createSignedJwt(sa);
  const resp = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!resp.ok) {
    throw new Error(
      `Service account token exchange failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

/** Refresh an access token using user credentials (gcloud ADC). */
async function tokenFromUserCredentials(
  creds: UserCredentials,
): Promise<TokenResponse> {
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
    }),
  });
  if (!resp.ok) {
    throw new Error(
      `User credential token refresh failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

/** Fetch an access token from the GCE metadata server. */
async function tokenFromMetadataServer(): Promise<TokenResponse> {
  const resp = await fetch(
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
    { headers: { "Metadata-Flavor": "Google" } },
  );
  if (!resp.ok) {
    throw new Error(
      `Metadata server token request failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

/**
 * Obtain an access token using Application Default Credentials.
 *
 * Tries in order:
 * 1. GOOGLE_APPLICATION_CREDENTIALS → service account key file
 * 2. Well-known gcloud ADC file → user or service account credentials
 * 3. GCE metadata server → attached service account
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  let tokenResp: TokenResponse | null = null;

  // 1. GOOGLE_APPLICATION_CREDENTIALS
  const credsPath = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
  if (credsPath) {
    const raw = await Deno.readTextFile(credsPath);
    const parsed = JSON.parse(raw);
    if (parsed.type === "service_account") {
      tokenResp = await tokenFromServiceAccount(parsed as ServiceAccountKey);
    } else if (parsed.type === "authorized_user") {
      tokenResp = await tokenFromUserCredentials(parsed as UserCredentials);
    } else {
      throw new Error(
        `Unsupported credential type in GOOGLE_APPLICATION_CREDENTIALS: ${parsed.type}`,
      );
    }
  }

  // 2. Well-known gcloud ADC location
  if (!tokenResp) {
    const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE") ?? ".";
    const adcPath =
      `${home}/.config/gcloud/application_default_credentials.json`;
    try {
      const raw = await Deno.readTextFile(adcPath);
      const parsed = JSON.parse(raw);
      if (parsed.type === "service_account") {
        tokenResp = await tokenFromServiceAccount(parsed as ServiceAccountKey);
      } else if (parsed.type === "authorized_user") {
        tokenResp = await tokenFromUserCredentials(parsed as UserCredentials);
      }
    } catch {
      // ADC file not found — try metadata server
    }
  }

  // 3. GCE metadata server
  if (!tokenResp) {
    try {
      tokenResp = await tokenFromMetadataServer();
    } catch {
      throw new Error(
        "Could not obtain GCP credentials. Set GOOGLE_APPLICATION_CREDENTIALS, " +
          "run 'gcloud auth application-default login', or run on a GCE instance " +
          "with an attached service account.",
      );
    }
  }

  cachedToken = {
    token: tokenResp.access_token,
    expiresAt: Date.now() + tokenResp.expires_in * 1000,
  };

  return cachedToken.token;
}

/** Clear the cached token (useful for testing). */
export function clearTokenCache(): void {
  cachedToken = null;
}

// ---------------------------------------------------------------------------
// GCS Client
// ---------------------------------------------------------------------------

const DEFAULT_API_BASE = "https://storage.googleapis.com";

/**
 * Thin GCS client using the JSON API with fetch().
 *
 * When a custom `apiEndpoint` is configured (e.g. for fake-gcs-server or
 * other emulators), authentication is skipped — matching the behavior of
 * Google's official client libraries with `STORAGE_EMULATOR_HOST`.
 */
export class GcsClient {
  private readonly bucket: string;
  private readonly prefix: string;
  private readonly apiBase: string;
  private readonly getToken: (() => Promise<string>) | null;

  constructor(
    config: GcsClientConfig,
    tokenFn?: () => Promise<string>,
  ) {
    this.bucket = config.bucket;
    this.prefix = config.prefix ?? "";
    this.apiBase = (config.apiEndpoint ?? DEFAULT_API_BASE).replace(/\/+$/, "");

    if (tokenFn) {
      // Explicit token function always wins
      this.getToken = tokenFn;
    } else if (config.apiEndpoint) {
      // Custom endpoint (emulator) — skip auth
      this.getToken = null;
    } else {
      // Production — use ADC
      this.getToken = getAccessToken;
    }
  }

  private fullKey(key: string): string {
    return this.prefix ? `${this.prefix}/${key}` : key;
  }

  private storageUrl(path: string): string {
    return `${this.apiBase}/storage/v1${path}`;
  }

  private uploadUrl(path: string): string {
    return `${this.apiBase}/upload/storage/v1${path}`;
  }

  private async headers(): Promise<Record<string, string>> {
    if (!this.getToken) return {};
    const token = await this.getToken();
    return { "Authorization": `Bearer ${token}` };
  }

  /** Checks if the bucket exists and is accessible. */
  async bucketExists(): Promise<void> {
    const url = this.storageUrl(`/b/${encodeURIComponent(this.bucket)}`);
    const resp = await fetch(url, { headers: await this.headers() });
    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(`Bucket check failed (${resp.status}): ${body}`);
    }
    // Consume body
    await resp.text();
  }

  /** Uploads an object to GCS. Returns the generation number. */
  async putObject(key: string, body: Uint8Array): Promise<GcsWriteResult> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    const resp = await fetch(url, {
      method: "POST",
      headers: hdrs,
      body,
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `GCS putObject failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    const meta = await resp.json();
    return { generation: meta.generation };
  }

  /** Downloads an object from GCS. */
  async getObject(key: string): Promise<Uint8Array> {
    const objectName = this.fullKey(key);
    const url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }?alt=media`,
    );
    const resp = await fetch(url, { headers: await this.headers() });
    if (!resp.ok) {
      if (resp.status === 404) {
        await resp.text();
        throw new NotFoundError(`Object not found: ${objectName}`);
      }
      const text = await resp.text();
      throw new Error(
        `GCS getObject failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    return new Uint8Array(await resp.arrayBuffer());
  }

  /** Deletes an object from GCS. Optionally conditional on generation. */
  async deleteObject(
    key: string,
    options?: { ifGenerationMatch?: string },
  ): Promise<void> {
    const objectName = this.fullKey(key);
    let url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }`,
    );
    if (options?.ifGenerationMatch) {
      url += `?ifGenerationMatch=${options.ifGenerationMatch}`;
    }
    const resp = await fetch(url, {
      method: "DELETE",
      headers: await this.headers(),
    });
    if (resp.status === 412) {
      await resp.text();
      throw new PreconditionFailedError(
        `Generation mismatch deleting '${objectName}'`,
      );
    }
    if (!resp.ok && resp.status !== 404) {
      const text = await resp.text();
      throw new Error(
        `GCS deleteObject failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    if (resp.body) await resp.text();
  }

  /** Gets object metadata from GCS. */
  async getMetadata(key: string): Promise<GcsObjectMetadata> {
    const objectName = this.fullKey(key);
    const url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }`,
    );
    const resp = await fetch(url, { headers: await this.headers() });
    if (resp.status === 404) {
      await resp.text();
      return { exists: false };
    }
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `GCS getMetadata failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    const meta = await resp.json();
    return {
      exists: true,
      size: parseInt(meta.size, 10),
      updated: meta.updated ? new Date(meta.updated) : undefined,
      generation: meta.generation,
    };
  }

  /**
   * Uploads an object only if it does not already exist.
   *
   * Uses GCS ifGenerationMatch=0 precondition — generation 0 means
   * "only succeed if no live version of this object exists."
   *
   * Returns the generation on success, or null if the object already exists.
   */
  async putObjectConditional(
    key: string,
    body: Uint8Array,
  ): Promise<GcsWriteResult | null> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }&ifGenerationMatch=0`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    const resp = await fetch(url, {
      method: "POST",
      headers: hdrs,
      body,
    });

    if (resp.status === 412) {
      // Object already exists
      await resp.text();
      return null;
    }
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `GCS conditional putObject failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    const meta = await resp.json();
    return { generation: meta.generation };
  }

  /**
   * Uploads an object only if its current generation matches.
   *
   * This is a compare-and-swap (CAS) write — it ensures no other writer
   * has modified the object since we last read it.
   *
   * Returns the new generation on success, or null on generation mismatch.
   */
  async putObjectCas(
    key: string,
    body: Uint8Array,
    expectedGeneration: string,
  ): Promise<GcsWriteResult | null> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }&ifGenerationMatch=${expectedGeneration}`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    const resp = await fetch(url, {
      method: "POST",
      headers: hdrs,
      body,
    });

    if (resp.status === 412) {
      await resp.text();
      return null;
    }
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `GCS CAS putObject failed for '${objectName}' (${resp.status}): ${text}`,
      );
    }
    const meta = await resp.json();
    return { generation: meta.generation };
  }

  /** Lists objects in GCS with the configured prefix. */
  async listObjects(
    subPrefix?: string,
    pageToken?: string,
  ): Promise<GcsListResult> {
    const prefix = subPrefix
      ? this.fullKey(subPrefix)
      : this.prefix
      ? this.prefix + "/"
      : undefined;

    let url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?`,
    );
    const params = new URLSearchParams();
    if (prefix) params.set("prefix", prefix);
    if (pageToken) params.set("pageToken", pageToken);
    url += params.toString();

    const resp = await fetch(url, { headers: await this.headers() });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`GCS listObjects failed (${resp.status}): ${text}`);
    }
    const data = await resp.json();

    const prefixLen = this.prefix ? this.prefix.length + 1 : 0;
    const keys = (data.items ?? [])
      .map((obj: { name: string }) => obj.name)
      .map((name: string) => name.slice(prefixLen));

    return {
      keys,
      truncated: !!data.nextPageToken,
      pageToken: data.nextPageToken,
    };
  }

  /** Lists all objects (handling pagination). */
  async listAllObjects(subPrefix?: string): Promise<string[]> {
    const allKeys: string[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.listObjects(subPrefix, pageToken);
      allKeys.push(...result.keys);
      pageToken = result.truncated ? result.pageToken : undefined;
    } while (pageToken);

    return allKeys;
  }
}
