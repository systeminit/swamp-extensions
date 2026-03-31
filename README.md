# Swamp Extensions

Official extensions for [swamp](https://github.com/systeminit/swamp).

## Vault Extensions

| Extension                              | Description                               | Dependencies                                 |
| -------------------------------------- | ----------------------------------------- | -------------------------------------------- |
| [`@swamp/1password`](vault/1password/) | 1Password vault provider via the `op` CLI | None (shells out to `op`)                    |
| [`@swamp/aws-sm`](vault/aws-sm/)       | AWS Secrets Manager vault provider        | `@aws-sdk/client-secrets-manager`            |
| [`@swamp/azure-kv`](vault/azure-kv/)   | Azure Key Vault vault provider            | `@azure/identity`, `@azure/keyvault-secrets` |

## Datastore Extensions

| Extension                                | Description                                                                  | Dependencies                         |
| ---------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| [`@swamp/s3-datastore`](datastore/s3/)   | Amazon S3 datastore with local cache sync and distributed locking            | `@aws-sdk/client-s3`                 |
| [`@swamp/gcs-datastore`](datastore/gcs/) | Google Cloud Storage datastore with local cache sync and distributed locking | None (GCS JSON REST API via `fetch`) |

## Model Extensions (Auto-Generated)

| Extension                                      | Description                         |
| ---------------------------------------------- | ----------------------------------- |
| [`@swamp/hetzner-cloud`](model/hetzner-cloud/) | Hetzner Cloud infrastructure models |
| [`@swamp/digitalocean`](model/digitalocean/)   | DigitalOcean infrastructure models  |

These are auto-generated from provider OpenAPI specs. See
[Code Generation](#code-generation) for how to regenerate them.

## Installation

Extensions are installed automatically when referenced in a swamp repository
(via [auto-resolution](https://github.com/systeminit/swamp/pull/725)), or
manually with:

```bash
# Vault extensions
swamp extension pull @swamp/1password
swamp extension pull @swamp/aws-sm
swamp extension pull @swamp/azure-kv

# Datastore extensions
swamp extension pull @swamp/s3-datastore
swamp extension pull @swamp/gcs-datastore

# Model extensions
swamp extension pull @swamp/hetzner-cloud
swamp extension pull @swamp/digitalocean
```

## Usage

### Vault extensions

Create a vault using an extension type:

```bash
# 1Password
swamp vault create @swamp/1password my-vault --config '{"op_vault":"Private"}'

# AWS Secrets Manager
swamp vault create @swamp/aws-sm my-vault --config '{"region":"us-east-1"}'

# Azure Key Vault
swamp vault create @swamp/azure-kv my-vault --config '{"vault_url":"https://myvault.vault.azure.net/"}'
```

### Datastore extensions

Configure a datastore in `.swamp.yaml`:

```yaml
# Amazon S3
datastore:
  type: "@swamp/s3-datastore"
  config:
    bucket: my-bucket
    prefix: swamp-data
    region: us-east-1

# Google Cloud Storage
datastore:
  type: "@swamp/gcs-datastore"
  config:
    bucket: my-bucket
    prefix: swamp-data
```

Or set up interactively:

```bash
# S3
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket":"my-bucket","prefix":"swamp-data","region":"us-east-1"}'

# GCS
swamp datastore setup @swamp/gcs-datastore \
  --config '{"bucket":"my-bucket","prefix":"swamp-data"}'
```

### Contributing

Swamp Extensions uses an **issue-driven contribution model**. We don't accept pull requests
from external contributors. This isn't about
gatekeeping; it's about supply chain security in the age of AI-generated code.
When AI agents can produce large, plausible-looking changes, the only way to
maintain quality and security is to tightly control the inputs to the
development process.

**Here's how it works:**

1. **You file an issue** —
   [bug reports and feature requests](https://github.com/systeminit/swamp-extensions/issues)
   are very welcome. Be as detailed as you like.
2. **We triage it** — A maintainer will start the triage workflow on the issue and Claude
   analyzes the report, confirms bugs by tracing through the codebase, and
   generates a detailed implementation plan right in the issue thread.
3. **We build it** — System Initiative engineers (with AI agents under our
   direct control) implement the plan, with full test coverage and code review.
4. **You get credit** — We're happy to include you as a co-author on any PR
   generated from your request.

This means you get the feature you asked for, maintained over time, without
having to worry about keeping a fork in sync. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the full details.

## Development

Each extension is a standalone Deno package with its own `deno.json`, `deno.lock`,
`manifest.yaml`, and source under `extensions/`. All npm dependencies are pinned
to exact versions.

### Extension Patterns

**Vault extensions** live in `vault/<name>/extensions/vaults/<name>.ts` and
export a `vault` object with `configSchema`, `createProvider(name, config)` that
returns `{ get, put, list, getName }`. See `vault/aws-sm/` for the canonical
example.

**Datastore extensions** live in `datastore/<name>/extensions/datastores/<name>.ts`
with shared library code in `_lib/`. They export a `datastore` object with
`configSchema`, `createProvider(config)` that returns lock, verifier, and sync
service factories. See `datastore/s3/` for the canonical example.

**Model extensions** under `model/` are auto-generated — never edit by hand.

### Running Checks

```bash
# From any extension directory:
cd vault/aws-sm  # or datastore/s3, model/hetzner-cloud, etc.
deno check extensions/<type>/*.ts
deno lint extensions/<type>/
deno fmt extensions/<type>/
deno test <flags> extensions/<type>/
deno install --frozen
```

### Code Generation

Model extensions are regenerated from provider OpenAPI specs:

```bash
cd codegen
deno task fetch-schema:hetzner
deno task fetch-schema:digitalocean
deno task generate:hetzner
deno task generate:digitalocean
```

Generation is idempotent — versions only bump when content changes. Design
documents for each provider are in `codegen/designs/`.

## Publishing

```bash
cd vault/aws-sm     # or datastore/s3
swamp extension push manifest.yaml
```

CI auto-publishes when `manifest.yaml` changes on main and the version is new.

## License

Copyright (C) 2026 System Initiative, Inc.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3 as published by
the Free Software Foundation, with the Swamp Extension and Definition Exception
(found in [COPYING-EXCEPTION](COPYING-EXCEPTION)).

See [COPYING](COPYING) for the full license text.
