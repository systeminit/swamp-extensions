/**
 * Sanitize instance names for swamp's data layer.
 *
 * Swamp rejects data artifact instance names containing '/', '\', '..',
 * or null bytes (path traversal protection). This module provides both
 * a runtime function (for testing) and a codegen helper that emits the
 * same logic as inline code in generated extension models.
 */

/** Runtime sanitizer — replaces unsafe characters in an instance name. */
export function sanitizeInstanceName(name: string): string {
  return name
    .replace(/[/\\]/g, "_")
    .replace(/\.\./g, "_")
    .replace(/\0/g, "");
}

/**
 * Codegen helper — wraps a code expression with the sanitize `.replace()` chain.
 *
 * Example:
 *   wrapWithSanitize(`(result.Name ?? g.Name)?.toString() ?? "current"`)
 * produces:
 *   `((result.Name ?? g.Name)?.toString() ?? "current").replace(/[\\/\\\\]/g, "_").replace(/\\.\\./g, "_")`
 */
export function wrapWithSanitize(expr: string): string {
  return `(${expr}).replace(/[\\/\\\\]/g, "_").replace(/\\.\\./, "_")`;
}
