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
 * Thin wrapper around AWS S3 SDK for datastore operations.
 */

// NOTE: The version pin here is load-bearing. Swamp's bundler pulls extension
// sources without the repo's deno.json, so bare specifiers like
// "@aws-sdk/client-s3" don't resolve at bundle time (rule 7 in CLAUDE.md).
// Keep this pin in sync with the version declared in this extension's
// deno.json for consistent type-checking during local dev.
import {
  DeleteObjectCommand,
  type DeleteObjectCommandOutput,
  GetObjectCommand,
  type GetObjectCommandOutput,
  HeadBucketCommand,
  type HeadBucketCommandOutput,
  HeadObjectCommand,
  type HeadObjectCommandOutput,
  ListObjectsV2Command,
  type ListObjectsV2CommandOutput,
  PutObjectCommand,
  type PutObjectCommandOutput,
  S3Client as AwsS3Client,
} from "npm:@aws-sdk/client-s3@3.1024.0";
import { Readable } from "node:stream";

export interface S3ClientConfig {
  bucket: string;
  prefix?: string;
  region?: string;
  /** Custom S3-compatible endpoint URL (e.g., https://nyc3.digitaloceanspaces.com) */
  endpoint?: string;
  /** Use path-style addressing (bucket in path, not subdomain). Default: false. */
  forcePathStyle?: boolean;
}

export interface S3ListResult {
  keys: string[];
  truncated: boolean;
  continuationToken?: string;
}

/** Max bytes of response body displayed in the error preview string. */
const ERROR_BODY_PREVIEW_BYTES = 256;

/**
 * Hard cap on how many bytes we read from an error response body before
 * abandoning the stream. Real S3-compatible error bodies are <10KB; this
 * protects against a buggy/adversarial server returning a huge body on 4xx.
 * If the cap is hit, the SDK deserializer will see a truncated body and
 * fail — we still surface status/requestId/preview, which is enough.
 */
const MAX_ERROR_BODY_BYTES = 64 * 1024;

/**
 * Error thrown by `S3Client` operations. Preserves the original SDK error's
 * `name` (so existing checks like `error.name === "NotFound"` keep working),
 * sets `cause` to the original, and exposes HTTP-level detail that the SDK's
 * XML deserializer normally hides behind a generic "UnknownError".
 */
export class S3OperationError extends Error {
  override readonly name: string;
  readonly httpStatusCode: number | undefined;
  readonly code: string | undefined;
  readonly requestId: string | undefined;
  readonly bodyPreview: string | undefined;

  constructor(
    message: string,
    opts: {
      name: string;
      cause: unknown;
      httpStatusCode: number | undefined;
      code: string | undefined;
      requestId: string | undefined;
      bodyPreview: string | undefined;
    },
  ) {
    super(message, { cause: opts.cause });
    this.name = opts.name;
    this.httpStatusCode = opts.httpStatusCode;
    this.code = opts.code;
    this.requestId = opts.requestId;
    this.bodyPreview = opts.bodyPreview;
  }
}

/**
 * Drain a Node Readable into a Uint8Array, capped at `maxBytes`. The AWS
 * SDK's default Node request handler (used under Deno-npm) returns an
 * IncomingMessage, which is an async-iterable Readable. Returns the
 * collected bytes and whether the stream exceeded the cap.
 */
async function collectBodyBytes(
  body: AsyncIterable<Uint8Array>,
  maxBytes: number,
): Promise<{ bytes: Uint8Array; truncated: boolean }> {
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;
  for await (const chunk of body) {
    const bytes = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
    const remaining = maxBytes - total;
    if (bytes.length > remaining) {
      chunks.push(bytes.subarray(0, remaining));
      total = maxBytes;
      truncated = true;
      break;
    }
    chunks.push(bytes);
    total += bytes.length;
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return { bytes: out, truncated };
}

/** First N bytes of a buffer, decoded as UTF-8 with a truncation suffix. */
function decodePreview(
  bytes: Uint8Array,
  max: number,
  streamTruncated: boolean,
): string {
  const overflow = bytes.length > max;
  const slice = overflow ? bytes.subarray(0, max) : bytes;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  if (overflow) return `${text}…(${bytes.length - max}+ more bytes)`;
  if (streamTruncated) return `${text}…(stream exceeded cap)`;
  return text;
}

/**
 * Install a deserialize-step middleware that captures a preview of the
 * response body on error statuses (>= 400) before the SDK's XML
 * deserializer consumes it. The preview is stashed as a non-enumerable
 * `__errorBodyPreview` property on the HttpResponse, which later becomes
 * `error.$response.__errorBodyPreview` on SDK-thrown errors.
 *
 * Uses the SDK's `middlewareStack.add` — `next` and `args` are typed via
 * contextual inference from that signature, so no explicit middleware-type
 * imports are needed.
 */
function installErrorBodyCapture(client: AwsS3Client): void {
  client.middlewareStack.add(
    (next) => async (args) => {
      const result = await next(args);
      const resp = (result as { response?: unknown }).response as {
        statusCode?: number;
        body?: AsyncIterable<Uint8Array> | Uint8Array | null;
      } | undefined;
      if (
        resp && typeof resp.statusCode === "number" &&
        resp.statusCode >= 400 && resp.body != null &&
        typeof (resp.body as { [Symbol.asyncIterator]?: unknown })[
            Symbol.asyncIterator
          ] === "function"
      ) {
        try {
          const { bytes, truncated } = await collectBodyBytes(
            resp.body as AsyncIterable<Uint8Array>,
            MAX_ERROR_BODY_BYTES,
          );
          Object.defineProperty(resp, "__errorBodyPreview", {
            value: decodePreview(bytes, ERROR_BODY_PREVIEW_BYTES, truncated),
            enumerable: false,
            configurable: true,
          });
          // Replay the bytes so the SDK deserializer still runs. If we hit
          // the cap, the replay is truncated — acceptable because we only
          // read a valid-XML error body fully when it's under 64KB.
          resp.body = Readable.from([bytes]);
        } catch {
          // Body capture is best-effort. If we can't buffer, fall through
          // and let the SDK deserializer see whatever it sees.
        }
      }
      return result;
    },
    {
      step: "deserialize",
      priority: "low",
      name: "swampS3ErrorBodyCapture",
    },
  );
}

/**
 * Thin S3 client wrapper for datastore operations.
 */
export class S3Client {
  private readonly client: AwsS3Client;
  private readonly bucket: string;
  private readonly prefix: string;

  constructor(config: S3ClientConfig) {
    this.client = new AwsS3Client({
      region: config.region,
      ...(config.endpoint ? { endpoint: config.endpoint } : {}),
      ...(config.forcePathStyle != null
        ? { forcePathStyle: config.forcePathStyle }
        : {}),
    });
    installErrorBodyCapture(this.client);
    this.bucket = config.bucket;
    this.prefix = config.prefix ?? "";
  }

  private fullKey(key: string): string {
    return this.prefix ? `${this.prefix}/${key}` : key;
  }

  /**
   * Send an SDK command and rethrow failures as `S3OperationError` with
   * status, code, requestId, body preview, and an auth hint on 401/403.
   * The original error's `name` is preserved so callers that match on
   * `error.name === "NotFound"` / `"PreconditionFailed"` keep working.
   *
   * Overloaded per-command so each call site gets a precisely-typed
   * response without casts.
   */
  private run(
    op: string,
    cmd: HeadBucketCommand,
  ): Promise<HeadBucketCommandOutput>;
  private run(
    op: string,
    cmd: HeadObjectCommand,
  ): Promise<HeadObjectCommandOutput>;
  private run(
    op: string,
    cmd: GetObjectCommand,
  ): Promise<GetObjectCommandOutput>;
  private run(
    op: string,
    cmd: PutObjectCommand,
  ): Promise<PutObjectCommandOutput>;
  private run(
    op: string,
    cmd: DeleteObjectCommand,
  ): Promise<DeleteObjectCommandOutput>;
  private run(
    op: string,
    cmd: ListObjectsV2Command,
  ): Promise<ListObjectsV2CommandOutput>;
  private async run(
    op: string,
    cmd:
      | HeadBucketCommand
      | HeadObjectCommand
      | GetObjectCommand
      | PutObjectCommand
      | DeleteObjectCommand
      | ListObjectsV2Command,
  ): Promise<
    | HeadBucketCommandOutput
    | HeadObjectCommandOutput
    | GetObjectCommandOutput
    | PutObjectCommandOutput
    | DeleteObjectCommandOutput
    | ListObjectsV2CommandOutput
  > {
    try {
      // `send` is overloaded per-command; dispatch by constructor so TS
      // picks the right overload and we avoid a cast.
      if (cmd instanceof HeadBucketCommand) return await this.client.send(cmd);
      if (cmd instanceof HeadObjectCommand) return await this.client.send(cmd);
      if (cmd instanceof GetObjectCommand) return await this.client.send(cmd);
      if (cmd instanceof PutObjectCommand) return await this.client.send(cmd);
      if (cmd instanceof DeleteObjectCommand) {
        return await this.client.send(cmd);
      }
      return await this.client.send(cmd);
    } catch (err) {
      throw this.wrapError(op, err);
    }
  }

  private wrapError(op: string, err: unknown): Error {
    if (!(err instanceof Error)) return new Error(String(err));
    const e = err as Error & {
      $metadata?: { httpStatusCode?: number; requestId?: string };
      $response?: { __errorBodyPreview?: string };
      Code?: string;
    };
    const status = e.$metadata?.httpStatusCode;
    const requestId = e.$metadata?.requestId;
    const code = e.Code ?? (e.name !== "Error" ? e.name : undefined);
    const preview = e.$response?.__errorBodyPreview;

    const parts: string[] = [`S3 ${op} failed`];
    if (status != null) parts.push(`HTTP ${status}`);
    if (code && code !== "Unknown") parts.push(code);
    const rawMsg = e.message && e.message !== "UnknownError" ? e.message : "";
    if (rawMsg) parts.push(`— ${rawMsg}`);
    if (status === 401 || status === 403) {
      parts.push(
        "(check AWS credentials — profile, env vars, or credential provider — and endpoint configuration)",
      );
    }
    if (requestId) parts.push(`[requestId=${requestId}]`);
    if (preview) parts.push(`bodyPreview=${JSON.stringify(preview)}`);

    return new S3OperationError(parts.join(" "), {
      name: e.name,
      cause: e,
      httpStatusCode: status,
      code,
      requestId,
      bodyPreview: preview,
    });
  }

  /** Checks if the bucket exists and is accessible. */
  async headBucket(): Promise<void> {
    await this.run(
      "headBucket",
      new HeadBucketCommand({ Bucket: this.bucket }),
    );
  }

  /** Uploads an object to S3. */
  async putObject(key: string, body: Uint8Array): Promise<void> {
    await this.run(
      "putObject",
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.fullKey(key),
        Body: body,
      }),
    );
  }

  /** Downloads an object from S3. */
  async getObject(key: string): Promise<Uint8Array> {
    const response = await this.run(
      "getObject",
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: this.fullKey(key),
      }),
    );
    if (!response.Body) {
      throw new Error(`S3 GetObject returned empty body for key: ${key}`);
    }
    return new Uint8Array(await response.Body.transformToByteArray());
  }

  /** Deletes an object from S3. */
  async deleteObject(key: string): Promise<void> {
    await this.run(
      "deleteObject",
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: this.fullKey(key),
      }),
    );
  }

  /** Checks if an object exists in S3. */
  async headObject(
    key: string,
  ): Promise<{ exists: boolean; size?: number; lastModified?: Date }> {
    try {
      const response = await this.run(
        "headObject",
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: this.fullKey(key),
        }),
      );
      return {
        exists: true,
        size: response.ContentLength,
        lastModified: response.LastModified,
      };
    } catch (error) {
      if (
        error instanceof Error && "name" in error &&
        (error.name === "NotFound" || error.name === "NoSuchKey")
      ) {
        return { exists: false };
      }
      throw error;
    }
  }

  /**
   * Uploads an object only if it does not already exist (conditional write).
   * Uses S3 conditional writes (If-None-Match: *) to atomically check-and-create.
   * Returns true if the write succeeded, false if the object already exists.
   */
  async putObjectConditional(
    key: string,
    body: Uint8Array,
  ): Promise<boolean> {
    try {
      await this.run(
        "putObjectConditional",
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: this.fullKey(key),
          Body: body,
          IfNoneMatch: "*",
        }),
      );
      return true;
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "PreconditionFailed" ||
          error.name === "ConditionalCheckFailed")
      ) {
        return false;
      }
      throw error;
    }
  }

  /** Lists objects in S3 with the configured prefix. */
  async listObjects(
    subPrefix?: string,
    continuationToken?: string,
  ): Promise<S3ListResult> {
    const prefix = subPrefix
      ? this.fullKey(subPrefix)
      : this.prefix
      ? this.prefix + "/"
      : undefined;

    const response = await this.run(
      "listObjects",
      new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    const prefixLen = this.prefix ? this.prefix.length + 1 : 0;
    const keys = (response.Contents ?? [])
      .map((obj) => obj.Key!)
      .map((key) => key.slice(prefixLen));

    return {
      keys,
      truncated: response.IsTruncated ?? false,
      continuationToken: response.NextContinuationToken,
    };
  }

  /** Lists all objects (handling pagination). */
  async listAllObjects(subPrefix?: string): Promise<string[]> {
    const allKeys: string[] = [];
    let continuationToken: string | undefined;

    do {
      const result = await this.listObjects(subPrefix, continuationToken);
      allKeys.push(...result.keys);
      continuationToken = result.truncated
        ? result.continuationToken
        : undefined;
    } while (continuationToken);

    return allKeys;
  }
}
