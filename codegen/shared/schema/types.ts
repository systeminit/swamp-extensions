// CloudFormation property type definitions
// Ported from si/bin/clover/src/pipelines/types.ts and aws/schema.ts

export const CF_PROPERTY_TYPES = [
  "boolean",
  "string",
  "number",
  "integer",
  "object",
  "array",
  "json",
] as const;
export type CfPropertyType = (typeof CF_PROPERTY_TYPES)[number];

const CF_PROPERTY_TYPE_SET = new Set<string>(CF_PROPERTY_TYPES);
export function isCfPropertyType(type: unknown): type is CfPropertyType {
  return typeof type === "string" && CF_PROPERTY_TYPE_SET.has(type);
}

export interface CfBooleanProperty {
  type: "boolean";
  title?: string;
  description?: string;
  default?: boolean;
  defName?: string;
}

export interface CfStringProperty {
  type: "string";
  title?: string;
  description?: string;
  default?: string;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  defName?: string;
}

export interface CfNumberProperty {
  type: "number";
  title?: string;
  description?: string;
  default?: number;
  minimum?: number;
  maximum?: number;
  enum?: number[];
  format?: string;
  defName?: string;
}

export interface CfIntegerProperty {
  type: "integer";
  title?: string;
  description?: string;
  default?: number;
  minimum?: number;
  maximum?: number;
  enum?: number[];
  format?: string;
  defName?: string;
}

export interface CfArrayProperty {
  type: "array";
  title?: string;
  description?: string;
  items: CfProperty;
  insertionOrder?: boolean;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  defName?: string;
}

export interface CfObjectProperty {
  type?: "object";
  title?: string;
  description?: string;
  properties?: Record<string, CfProperty>;
  patternProperties?: Record<string, CfProperty>;
  additionalProperties?: boolean | CfProperty;
  required?: string[];
  dependencies?: Record<string, string[]>;
  oneOf?: CfProperty[];
  anyOf?: CfProperty[];
  allOf?: CfProperty[];
  defName?: string;
}

export interface CfMultiTypeProperty {
  type?: undefined;
  title?: string;
  description?: string;
  $ref?: string;
  $comment?: string;
  oneOf?: CfProperty[];
  allOf?: CfProperty[];
  anyOf?: CfProperty[];
  defName?: string;
}

export type CfProperty =
  | CfBooleanProperty
  | CfStringProperty
  | CfNumberProperty
  | CfIntegerProperty
  | CfArrayProperty
  | (CfObjectProperty & { type: "object" })
  | (CfObjectProperty & { type?: undefined })
  | (CfStringProperty & { type: "json" })
  | CfMultiTypeProperty
  // Multi-type array properties (e.g. ["string", "object"])
  | {
    type: [string, ...string[]];
    title?: string;
    description?: string;
    properties?: Record<string, CfProperty>;
    items?: CfProperty;
    defName?: string;
    [key: string]: unknown;
  };

export type CfHandlerKind = "create" | "read" | "update" | "delete" | "list";
export interface CfHandler {
  permissions: string[];
  timeoutInMinutes: number;
}

export type JSONPointer = string;

export interface SuperSchema {
  typeName: string;
  description: string;
  sourceUrl?: string;
  documentationUrl?: string;
  handlers?: { [key in CfHandlerKind]?: CfHandler };
}

export interface CfSchema extends SuperSchema {
  replacementStrategy?: "create_then_delete" | "delete_then_create";
  taggable?: boolean;
  tagging?: {
    taggable: boolean;
    tagOnCreate?: boolean;
    tagUpdatable?: boolean;
    cloudFormationSystemTags?: boolean;
    tagProperty?: string;
  };
  handlers?: { [key in CfHandlerKind]?: CfHandler };
  remote?: unknown;
  definitions?: Record<string, CfProperty>;
  properties: Record<string, CfProperty>;
  readOnlyProperties?: JSONPointer[];
  writeOnlyProperties?: JSONPointer[];
  primaryIdentifier: JSONPointer[];
  conditionalCreateOnlyProperties?: JSONPointer[];
  nonPublicProperties?: JSONPointer[];
  nonPublicDefinitions?: JSONPointer[];
  createOnlyProperties?: JSONPointer[];
  deprecatedProperties?: JSONPointer[];
  additionalIdentifiers?: JSONPointer[];
  required?: string[];
  resourceLink?: {
    $comment?: string;
    templateUri: string;
    mappings: Record<string, JSONPointer>;
  };
  propertyTransform?: Record<string, string>;
}

export type CfDb = Record<string, CfSchema>;

/**
 * Raw CloudFormation property before normalization.
 * This is the shape of data as it appears in the CF schema JSON — it may have
 * arbitrary fields and the `type` field may be a string, array, or absent.
 * After normalization via `normalizeProperty()`, this becomes a `CfProperty`.
 */
export interface RawCfProperty {
  type?: string | string[];
  title?: string;
  description?: string;
  properties?: Record<string, RawCfProperty>;
  patternProperties?: Record<string, RawCfProperty>;
  additionalProperties?: boolean | RawCfProperty;
  items?: RawCfProperty;
  oneOf?: RawCfProperty[];
  anyOf?: RawCfProperty[];
  allOf?: RawCfProperty[];
  $ref?: string;
  $comment?: string;
  defName?: string;
  required?: string[];
  enum?: (string | number)[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  default?: unknown;
  [key: string]: unknown;
}

export interface OnlyProperties {
  createOnly: string[];
  readOnly: string[];
  writeOnly: string[];
  primaryIdentifier: string[];
}
