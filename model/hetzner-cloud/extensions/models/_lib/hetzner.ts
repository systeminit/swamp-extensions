// Auto-generated shared helper for Hetzner Cloud extension models.
// Do not edit manually. Re-generate with: deno task generate:hetzner

const API_BASE = "https://api.hetzner.cloud/v1";

let validatedToken: string | undefined;

async function getToken(): Promise<string> {
  if (validatedToken) return validatedToken;

  const token = Deno.env.get("HETZNER_API_TOKEN");
  if (!token) {
    throw new Error(
      "HETZNER_API_TOKEN environment variable is not set. " +
        "Set it with: swamp vault set HETZNER_API_TOKEN <your-token>",
    );
  }

  // Validate the token by hitting a lightweight endpoint
  const resp = await fetch(`${API_BASE}/locations`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      `HETZNER_API_TOKEN is invalid (GET /locations returned ${resp.status}): ${text}`,
    );
  }
  // Drain the response body
  await resp.text();

  validatedToken = token;
  return token;
}

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<Response> {
  const token = await getToken();
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const resp = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!resp.ok) {
    // 404 is handled by callers — not an exception
    if (resp.status === 404) {
      return resp;
    }
    const text = await resp.text();
    throw new Error(
      `Hetzner API error: ${method} ${path} returned ${resp.status}: ${text}`,
    );
  }

  return resp;
}

function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(data).filter((k) =>
    k !== "meta" && k !== "links" && k !== "actions" && k !== "action"
  );
  if (keys.length === 0) return data;
  const value = data[keys[0]];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return data;
}

export async function create(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const resp = await request("POST", endpoint, body);
  const data = await resp.json();
  return unwrap(data);
}

export async function read(
  endpoint: string,
  id: number | string,
): Promise<Record<string, unknown>> {
  const resp = await request("GET", `${endpoint}/${id}`);
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: GET ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function tryRead(
  endpoint: string,
  id: number | string,
): Promise<Record<string, unknown> | null> {
  const resp = await request("GET", `${endpoint}/${id}`);
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function update(
  endpoint: string,
  id: number | string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const resp = await request("PUT", `${endpoint}/${id}`, body);
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: PUT ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function remove(
  endpoint: string,
  id: number | string,
): Promise<{ existed: boolean }> {
  const resp = await request("DELETE", `${endpoint}/${id}`);
  return { existed: resp.status !== 404 };
}
