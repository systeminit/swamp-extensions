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
 * Verifies a GCS datastore is accessible.
 *
 * Issues a bucket GET request to verify the bucket exists,
 * credentials are valid, and IAM permissions are sufficient.
 */

import type { DatastoreHealthResult, DatastoreVerifier } from "./interfaces.ts";
import { GcsClient, type GcsClientConfig } from "./gcs_client.ts";

export class GcsDatastoreVerifier implements DatastoreVerifier {
  private readonly gcs: GcsClient;
  private readonly bucket: string;

  constructor(config: GcsClientConfig) {
    this.bucket = config.bucket;
    this.gcs = new GcsClient(config);
  }

  async verify(): Promise<DatastoreHealthResult> {
    const start = performance.now();

    try {
      await this.gcs.bucketExists();

      return {
        healthy: true,
        message: `GCS bucket '${this.bucket}' is accessible`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/gcs-datastore",
        details: { bucket: this.bucket },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      let hint = "";

      if (message.includes("403") || message.includes("Forbidden")) {
        hint =
          " Check your GCP credentials and bucket IAM permissions (storage.buckets.get required).";
      } else if (message.includes("404") || message.includes("Not Found")) {
        hint = ` The bucket '${this.bucket}' does not exist.`;
      } else if (
        message.includes("credentials") || message.includes("token") ||
        message.includes("Could not obtain")
      ) {
        hint =
          " Configure GCP credentials: set GOOGLE_APPLICATION_CREDENTIALS, " +
          "run 'gcloud auth application-default login', or attach a service account.";
      }

      return {
        healthy: false,
        message:
          `Cannot access GCS bucket '${this.bucket}': ${message}.${hint}`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/gcs-datastore",
        details: { bucket: this.bucket },
      };
    }
  }
}
