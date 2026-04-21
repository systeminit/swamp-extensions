# @swamp/gcs-datastore-bootstrap

One-shot provisioner that creates a GCS bucket and a project-scoped custom
IAM role for [`@swamp/gcs-datastore`](../../datastore/gcs/), then flips the
current repository's datastore over to GCS.

Ships:

- a provisioner model (`@swamp/gcs-datastore-bootstrap/provisioner`) that
  wraps the GCS + IAM REST calls behind a single `provision` method, and
- a workflow (`bootstrap-gcs-datastore`) that runs the provisioner and then
  invokes `swamp datastore setup extension @swamp/gcs-datastore --config ...`
  via the built-in `command/shell` model.

## Why

A fresh `swamp repo init` starts on the filesystem datastore. Moving to GCS
is a three-part problem:

1. Create the bucket with safe defaults (uniform bucket-level access,
   public access prevention enforced, versioning on).
2. Author an IAM role with exactly the permissions `@swamp/gcs-datastore`
   uses.
3. Point swamp at the new bucket.

Each step is obvious in isolation and easy to botch in aggregate
(over-broad roles, public buckets, forgotten versioning). This extension
collapses all three into one workflow run.

## Prerequisites

- GCP Application Default Credentials available through one of:
  - `GOOGLE_APPLICATION_CREDENTIALS` pointing at a service account key JSON,
  - `gcloud auth application-default login` (user creds at
    `~/.config/gcloud/application_default_credentials.json`), or
  - an attached service account on GCE / Cloud Run / GKE.
- The authenticated principal needs permission to:
  - `storage.buckets.create`, `storage.buckets.get`, `storage.buckets.update`
    on the project, and
  - `iam.roles.create`, `iam.roles.get` on the project.
  `roles/storage.admin` + `roles/iam.roleAdmin` covers these; `roles/owner`
  covers them trivially.
- The project must have the **Cloud Storage API**
  (`storage.googleapis.com`) and the **IAM API** (`iam.googleapis.com`)
  enabled. If either is disabled, the API returns HTTP 403 with an
  activation URL — enable the service and re-run.
- The caller that will run `swamp` after setup must already hold — or be
  able to attach — the custom role the provisioner produces.

## What the provisioner creates

**GCS bucket:**

- Uniform bucket-level access enabled (ACLs disabled).
- Public access prevention set to `enforced`.
- Object versioning enabled.
- Encryption: Google-managed keys (GCS always encrypts at rest; no CMEK is
  configured).

**Custom IAM role** at project scope (default ID:
`swampGcsDatastore_<bucket_name>` with hyphens replaced by underscores).
Included permissions:

```
storage.buckets.get
storage.objects.create
storage.objects.get
storage.objects.delete
storage.objects.list
```

Five permissions covering the runtime operations
`@swamp/gcs-datastore` performs — nothing more.

## Usage (workflow)

```bash
swamp extension pull @swamp/gcs-datastore-bootstrap

swamp model create @swamp/gcs-datastore-bootstrap/provisioner \
  swamp-gcs-datastore-provisioner

# Edit the instance so globalArguments are wired to workflow inputs:
#   bucket_name: ${{ inputs.bucket_name }}
#   project_id:  ${{ inputs.project_id }}
#   location:    ${{ inputs.location }}
#   prefix:      ${{ inputs.prefix }}
#   role_id:     ${{ inputs.role_id }}
swamp model edit swamp-gcs-datastore-provisioner

# The command/shell instance used by the final workflow step
swamp model create command/shell swamp-gcs-datastore-setup

swamp workflow run @swamp/bootstrap-gcs-datastore \
  --input bucket_name=my-swamp-state \
  --input project_id=my-gcp-project \
  --input location=US

# Ensure the datastore is looking good
swamp datastore status
```

Optional inputs (defaults shown in comments):

```bash
swamp workflow run @swamp/bootstrap-gcs-datastore \
  --input bucket_name=my-swamp-state \
  --input project_id=my-gcp-project \
  --input location=US \
  --input prefix=swamp                  `# default: ""` \
  --input role_id=mySwampRole           `# default: swampGcsDatastore_<sanitized_bucket_name>`
```

## Usage (CLI, provisioner only)

If you want to create the bucket + role but handle the datastore switch
yourself:

```bash
swamp model create @swamp/gcs-datastore-bootstrap/provisioner my-store \
  --global-arg bucket_name=my-swamp-state \
  --global-arg project_id=my-gcp-project \
  --global-arg location=US --json

swamp model method run my-store provision --json

# Inspect outputs, then bind the role to your principal, e.g.:
gcloud projects add-iam-policy-binding my-gcp-project \
  --member="serviceAccount:swamp@my-gcp-project.iam.gserviceaccount.com" \
  --role="projects/my-gcp-project/roles/swampGcsDatastore_my_swamp_state"

# Then point swamp at the bucket:
swamp datastore setup extension @swamp/gcs-datastore \
  --config '{"bucket":"my-swamp-state","projectId":"my-gcp-project"}' --json
```

## Idempotency

- **Bucket:** `GET /storage/v1/b/<name>` probes first; if the bucket
  exists, creation is skipped. The `POST /storage/v1/b` insert sets the
  hardening knobs (uniform bucket-level access, public access prevention,
  versioning) inline in the create body. If the insert returns HTTP 409
  (someone created the bucket between our probe and our insert), the
  provisioner re-probes: a 200 means we own it (reuse), a 403 means a
  different project owns the global bucket name (error). The subsequent
  PATCH re-applies the hardening posture on every run, so re-running after
  a partial failure restores the intended state.

  > Note: pointing the bootstrap at an existing bucket will overwrite its
  > uniform-bucket-level-access, public-access-prevention, and versioning
  > configuration with swamp's defaults. If the target bucket uses a
  > different posture you want to preserve, don't run the bootstrap
  > against it — provision a role separately instead.

- **Role:** `GET /v1/projects/<pid>/roles/<roleId>` probes the full role
  name; if the role exists and is live, its name is reused as-is and the
  `includedPermissions` set is **not** updated. Delete the role and re-run
  if you need to pick up a changed permission set.

  > **Soft-delete trap:** if the role was deleted within the last 7 days,
  > its ID is tombstoned — `GET` returns 200 with `deleted: true`. The
  > bootstrap refuses to proceed in that state and tells you to run
  > `gcloud iam roles undelete <roleId> --project=<pid>` first. If the
  > 7-day window has passed but the ID is still blocked (GCP holds the ID
  > for up to ~30 additional days after permanent deletion), pass a
  > different `role_id`.

## Inputs

| input         | required | default                                             | description                                              |
| ------------- | -------- | --------------------------------------------------- | -------------------------------------------------------- |
| `bucket_name` | yes      | —                                                   | GCS bucket name (GCS naming rules apply).                |
| `project_id`  | yes      | —                                                   | GCP project ID that will own the bucket and role.        |
| `location`    | yes      | —                                                   | GCS location (`US`, `us-central1`, `NAM4`, etc).         |
| `prefix`      | no       | `""`                                                | Object-name prefix within the bucket.                    |
| `role_id`     | no       | `swampGcsDatastore_<bucket with hyphens as underscores>` | Custom IAM role ID (letters/digits/`_`/`.`, 3-64 chars). |

## Caveats

- **Role binding is your job.** This extension creates the role; it does
  not bind it to a principal. After the workflow completes, bind
  `role_name` to whichever service account, user, or group will run swamp
  going forward. See the CLI example above.
- **No project creation or API enablement.** If the project doesn't exist
  or the Storage / IAM APIs aren't enabled, the workflow fails with the
  raw GCP error. Set those up with `gcloud projects create` and
  `gcloud services enable storage.googleapis.com iam.googleapis.com` first.
- **Custom role, not a predefined role.** If you'd rather use
  `roles/storage.objectUser` + `roles/storage.legacyBucketReader` than a
  custom role, skip the bootstrap and do the setup manually — see the
  `@swamp/gcs-datastore` README for that path.
