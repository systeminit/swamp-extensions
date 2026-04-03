import { assertEquals } from "@std/assert";
import { sanitizeInstanceName, wrapWithSanitize } from "./instanceName.ts";

Deno.test("sanitizeInstanceName - replaces forward slashes", () => {
  assertEquals(
    sanitizeInstanceName("/environments/foo/bar"),
    "_environments_foo_bar",
  );
});

Deno.test("sanitizeInstanceName - replaces backslashes", () => {
  assertEquals(sanitizeInstanceName("foo\\bar\\baz"), "foo_bar_baz");
});

Deno.test("sanitizeInstanceName - replaces double dots", () => {
  assertEquals(sanitizeInstanceName("foo..bar"), "foo_bar");
});

Deno.test("sanitizeInstanceName - removes null bytes", () => {
  assertEquals(sanitizeInstanceName("foo\0bar"), "foobar");
});

Deno.test("sanitizeInstanceName - handles ARN format", () => {
  assertEquals(
    sanitizeInstanceName(
      "arn:aws:ssm:us-east-1:123456789012:parameter/path/name",
    ),
    "arn:aws:ssm:us-east-1:123456789012:parameter_path_name",
  );
});

Deno.test("sanitizeInstanceName - preserves clean names", () => {
  assertEquals(sanitizeInstanceName("my-parameter"), "my-parameter");
});

Deno.test("sanitizeInstanceName - preserves fallback 'current'", () => {
  assertEquals(sanitizeInstanceName("current"), "current");
});

Deno.test("sanitizeInstanceName - handles multiple consecutive slashes", () => {
  assertEquals(sanitizeInstanceName("a//b///c"), "a__b___c");
});

Deno.test("sanitizeInstanceName - handles mixed unsafe characters", () => {
  assertEquals(sanitizeInstanceName("/foo\\bar..baz\0qux"), "_foo_bar_bazqux");
});

Deno.test("wrapWithSanitize - wraps expression with replace chain", () => {
  const result = wrapWithSanitize(`g.Name?.toString() ?? "current"`);
  assertEquals(
    result,
    `(g.Name?.toString() ?? "current").replace(/[\\/\\\\]/g, "_").replace(/\\.\\./g, "_").replace(/\\0/g, "")`,
  );
});

Deno.test("wrapWithSanitize - generated code matches runtime behavior", () => {
  // Verify the code emitted by wrapWithSanitize produces the same result
  // as the runtime sanitizeInstanceName function
  const testCases = [
    "/environments/foo/bar",
    "foo\\bar\\baz",
    "foo..bar",
    "foo....bar",
    "a..b..c",
    "foo\0bar",
    "/foo\\bar..baz\0qux",
    "arn:aws:ssm:us-east-1:123:parameter/path/name",
    "my-parameter",
    "current",
  ];

  for (const input of testCases) {
    // Evaluate the generated code
    const code = wrapWithSanitize(`name`);
    const fn = new Function("name", `return ${code};`);
    const codegenResult = fn(input) as string;

    assertEquals(
      codegenResult,
      sanitizeInstanceName(input),
      `Mismatch for input "${input}"`,
    );
  }
});
