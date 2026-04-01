# @swamp/gcp/walletobjects

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models for
Google Cloud walletobjects resources.

Each model represents a single GCP resource. Models have **domain properties**
that you configure (the desired state) and **resource properties** that reflect
the live state in GCP. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by identifier
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from GCP
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/gcp/walletobjects/eventticketclass` to see
the full list of configurable properties and available methods for this model.

## Authentication

Credentials are resolved in the following order. The `gcloud` CLI must be
installed.

1. **Inline JSON** — `GOOGLE_APPLICATION_CREDENTIALS_JSON` env var containing
   service account key JSON
2. **JSON file path** — `GOOGLE_APPLICATION_CREDENTIALS` env var pointing to a
   service account key file (standard Google SDK variable)
3. **Application Default Credentials** — `gcloud auth application-default login`
   or GCE/Cloud Run metadata server

### Project

The project ID is read from the service account JSON. Override it with
`GCP_PROJECT` or `GOOGLE_CLOUD_PROJECT`, or `gcloud config set project`.

### Setup examples

```bash
# Option 1: inline JSON (good for swamp vaults)
export GOOGLE_APPLICATION_CREDENTIALS_JSON='$(cat service-account.json)'

# Option 2: file path (standard SDK variable)
export GOOGLE_APPLICATION_CREDENTIALS=~/keys/service-account.json

# Option 3: user credentials (developer workflow)
gcloud auth application-default login
gcloud config set project my-project
```

## Usage

```bash
# Create a new eventticketclass model
swamp model create @swamp/gcp/walletobjects/eventticketclass my-eventticketclass

# Edit the model to configure its properties
swamp model edit my-eventticketclass

# Create the resource in GCP
swamp model method run my-eventticketclass create

# Sync current state from GCP
swamp model method run my-eventticketclass sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
