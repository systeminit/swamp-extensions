# Swamp Extensions

Official vault provider extensions for [swamp](https://github.com/systeminit/swamp).

## Vault Extensions

| Extension | Description | Dependencies |
|-----------|-------------|--------------|
| [`@swamp/1password`](vault/1password/) | 1Password vault provider via the `op` CLI | None (shells out to `op`) |
| [`@swamp/aws-sm`](vault/aws-sm/) | AWS Secrets Manager vault provider | `@aws-sdk/client-secrets-manager` |
| [`@swamp/azure-kv`](vault/azure-kv/) | Azure Key Vault vault provider | `@azure/identity`, `@azure/keyvault-secrets` |

## Installation

Extensions are installed automatically when referenced in a swamp repository
(via [auto-resolution](https://github.com/systeminit/swamp/pull/725)), or
manually with:

```bash
swamp extension pull @swamp/1password
swamp extension pull @swamp/aws-sm
swamp extension pull @swamp/azure-kv
```

## Usage

Create a vault using an extension type:

```bash
# 1Password
swamp vault create @swamp/1password my-vault --config '{"op_vault":"Private"}'

# AWS Secrets Manager
swamp vault create @swamp/aws-sm my-vault --config '{"region":"us-east-1"}'

# Azure Key Vault
swamp vault create @swamp/azure-kv my-vault --config '{"vault_url":"https://myvault.vault.azure.net/"}'
```

## Issues and Contributing

Issues and pull requests for these extensions are managed in the main
[swamp repository](https://github.com/systeminit/swamp/issues). Issues and PRs
are disabled on this repo.

## Development

Each vault extension is a standalone package with its own `deno.json`. All npm
dependencies are pinned to exact versions for reproducible builds.

```bash
cd vault/1password

# Type check
deno check extensions/vaults/onepassword.ts

# Lint
deno lint extensions/vaults/

# Format
deno fmt extensions/vaults/

# Generate / update lockfile
deno install
```

## Publishing

```bash
cd vault/1password
swamp extension push manifest.yaml
```

## License

Copyright (C) 2026 System Initiative, Inc.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3 as published by
the Free Software Foundation, with the Swamp Extension and Definition Exception
(found in [COPYING-EXCEPTION](COPYING-EXCEPTION)).

See [COPYING](COPYING) for the full license text.
