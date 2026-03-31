# @swamp/hetzner-cloud

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models for
Hetzner Cloud resources.

Each model represents a single Hetzner Cloud resource (e.g., a server, a
floating IP, an SSH key). Models have **domain properties** that you configure
(the desired state) and **resource properties** that reflect the live state in
Hetzner Cloud. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Hetzner Cloud
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/hetzner-cloud/<model>` to see the full
list of configurable properties and available methods for a model.

## Authentication

Set the `HETZNER_API_TOKEN` environment variable to your Hetzner Cloud API
token. The token is validated against `/v1/locations` on first use.

```bash
export HETZNER_API_TOKEN=your-token-here
```

## Usage

```bash
# Create a new server model
swamp model create @swamp/hetzner-cloud/servers my-server

# Edit the model to configure its properties
swamp model edit my-server

# Create the resource in Hetzner Cloud
swamp model method run my-server create

# Sync current state from Hetzner Cloud
swamp model method run my-server sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
