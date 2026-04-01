// Property splitting — ported from si/bin/clover/src/pipelines/aws/spec.ts
// and si/bin/clover/src/pipelines/generic/index.ts

import type { CfProperty, CfSchema, OnlyProperties } from "./types.ts";

/**
 * Normalizes property paths from JSON Pointer format to simple property names.
 * E.g., "/properties/foo" or "/foo" -> "foo"
 */
export function normalizeOnlyProperties(
  props: string[] | undefined,
): string[] {
  const newProps: string[] = [];
  for (const prop of props ?? []) {
    const newProp = prop.split("/").pop();
    if (newProp) {
      newProps.push(newProp);
    }
  }
  return newProps;
}

/**
 * Splits a CF schema's properties into domain (writable) and resource (all) sets.
 *
 * Domain properties: writable properties (not readOnly) — used for InputAttributesSchema.
 * Resource properties: ALL properties — used for ResourceAttributesSchema, because
 * AWS CloudControl GetResource returns all properties (both input and readOnly).
 */
export function splitAwsProperties(
  schema: CfSchema,
  onlyProperties: OnlyProperties,
): {
  domainProperties: Record<string, CfProperty>;
  resourceValueProperties: Record<string, CfProperty>;
} {
  const domainProperties = cleanProperties(
    pruneProperties(
      schema.properties as Record<string, CfProperty>,
      onlyProperties,
      false, // keep writable properties
    ),
  );

  // Resource schema includes ALL properties since AWS returns everything on GetResource
  const resourceValueProperties = cleanProperties(
    schema.properties as Record<string, CfProperty>,
  );

  return { domainProperties, resourceValueProperties };
}

/**
 * Filters properties by readOnly/writable status, recursing into nested objects.
 */
function pruneProperties(
  properties: Record<string, CfProperty>,
  onlyProperties: OnlyProperties,
  keepReadOnly: boolean,
  pathPrefix: string = "",
): Record<string, CfProperty> {
  const readOnlySet = new Set(onlyProperties.readOnly);
  const result: Record<string, CfProperty> = {};

  for (const [name, prop] of Object.entries(properties)) {
    if (!prop) continue;

    const cfProp = prop as CfProperty;
    const currentPath = pathPrefix ? `${pathPrefix}/${name}` : name;
    const isReadOnly = readOnlySet.has(name) || readOnlySet.has(currentPath);
    const shouldKeep = keepReadOnly ? isReadOnly : !isReadOnly;

    // Check if this is an object with nested properties
    if (
      typeof cfProp === "object" &&
      cfProp !== null &&
      "properties" in cfProp &&
      (cfProp as { properties?: unknown }).properties
    ) {
      const nestedProps =
        (cfProp as { properties: Record<string, CfProperty> }).properties;
      const prunedChildren = pruneProperties(
        nestedProps,
        onlyProperties,
        keepReadOnly,
        currentPath,
      );

      // Only include if this object has matching children
      if (Object.keys(prunedChildren).length > 0) {
        result[name] = { ...cfProp, properties: prunedChildren } as CfProperty;
      }
    } else if (shouldKeep) {
      result[name] = cfProp;
    }
  }

  return result;
}

/**
 * Removes properties that have no type, oneOf, or anyOf.
 */
function cleanProperties(
  properties: Record<string, CfProperty>,
): Record<string, CfProperty> {
  const cleaned: Record<string, CfProperty> = {};
  for (const [name, prop] of Object.entries(properties)) {
    const cfProp = prop as CfProperty & {
      type?: string;
      oneOf?: unknown[];
      anyOf?: unknown[];
    };
    if (cfProp.type || cfProp.oneOf || cfProp.anyOf) {
      cleaned[name] = prop;
    }
  }
  return cleaned;
}
