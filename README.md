# Swamp Extensions

Official extensions for [swamp](https://github.com/systeminit/swamp).

## Vault Extensions

| Extension | Description | Dependencies |
|-----------|-------------|--------------|
| [`@swamp/1password`](vault/1password/) | 1Password vault provider via the `op` CLI | None (shells out to `op`) |
| [`@swamp/aws-sm`](vault/aws-sm/) | AWS Secrets Manager vault provider | `@aws-sdk/client-secrets-manager` |
| [`@swamp/azure-kv`](vault/azure-kv/) | Azure Key Vault vault provider | `@azure/identity`, `@azure/keyvault-secrets` |

## Datastore Extensions

| Extension | Description | Dependencies |
|-----------|-------------|--------------|
| [`@swamp/s3-datastore`](datastore/s3/) | Amazon S3 datastore with local cache sync and distributed locking | `@aws-sdk/client-s3` |

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
datastore:
  type: "@swamp/s3-datastore"
  config:
    bucket: my-bucket
    prefix: swamp-data
    region: us-east-1
```

Or set up interactively:

```bash
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket":"my-bucket","prefix":"swamp-data","region":"us-east-1"}'
```

## Issues and Contributing

Issues and pull requests for these extensions are managed in the main
[swamp repository](https://github.com/systeminit/swamp/issues). Issues and PRs
are disabled on this repo.

## Development

Each extension is a standalone package with its own `deno.json`. All npm
dependencies are pinned to exact versions for reproducible builds.

```bash
# Vault extension example
cd vault/aws-sm
deno check extensions/vaults/aws_sm.ts
deno lint extensions/vaults/
deno fmt extensions/vaults/
deno test --allow-env extensions/vaults/

# Datastore extension example
cd datastore/s3
deno check extensions/datastores/s3.ts
deno lint extensions/datastores/
deno fmt extensions/datastores/
deno test --allow-read --allow-write --allow-env --allow-net --allow-sys extensions/datastores/

# Generate / update lockfile
deno install
```

## Publishing

```bash
cd vault/aws-sm     # or datastore/s3
swamp extension push manifest.yaml
```

## License

Copyright (C) 2026 System Initiative, Inc.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3 as published by
the Free Software Foundation, with the Swamp Extension and Definition Exception
(found in [COPYING-EXCEPTION](COPYING-EXCEPTION)).

See [COPYING](COPYING) for the full license text.
