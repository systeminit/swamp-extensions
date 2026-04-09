// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "@std/assert";
import { Phase, PullRequestSchema, TRANSITIONS } from "./schemas.ts";

const validPhases = new Set<string>(Phase.options);

Deno.test("TRANSITIONS only references phases that exist in the Phase enum", () => {
  for (const [method, phases] of Object.entries(TRANSITIONS)) {
    for (const phase of phases) {
      assert(
        validPhases.has(phase),
        `Method "${method}" references unknown phase "${phase}"`,
      );
    }
  }
});

Deno.test("TRANSITIONS entries are non-empty", () => {
  for (const [method, phases] of Object.entries(TRANSITIONS)) {
    assert(
      phases.length > 0,
      `Method "${method}" has no allowed source phases — it would never be runnable`,
    );
  }
});

Deno.test("TRANSITIONS entries have no duplicate phases", () => {
  for (const [method, phases] of Object.entries(TRANSITIONS)) {
    assertEquals(
      new Set(phases).size,
      phases.length,
      `Method "${method}" has duplicate phases in its allowed list`,
    );
  }
});

Deno.test("start is allowed from every non-terminal phase (restart invariant)", () => {
  // The 'start' method must be re-runnable from any phase except 'done', so a
  // user can refresh issue context at any point during the lifecycle. If a new
  // phase is added to the Phase enum without also being added to start's
  // allowed list, that breaks the restart contract.
  const startAllowed = new Set(TRANSITIONS.start);
  for (const phase of Phase.options) {
    if (phase === "done") continue;
    assert(
      startAllowed.has(phase),
      `start should be allowed from "${phase}" but is not — restart invariant broken`,
    );
  }
});

Deno.test("happy path: created → triaging → classified → plan_generated → approved → implementing → pr_open → releasing → done", () => {
  // Walk the linear happy path one method at a time and verify each method's
  // required source phase is in its TRANSITIONS entry. This catches the case
  // where someone reorders the state machine and forgets to update an edge.
  const happyPath: ReadonlyArray<{ method: string; from: Phase }> = [
    { method: "start", from: "created" },
    { method: "triage", from: "triaging" },
    { method: "plan", from: "classified" },
    { method: "approve", from: "plan_generated" },
    { method: "implement", from: "approved" },
    { method: "link_pr", from: "implementing" },
    { method: "pr_merged", from: "pr_open" },
    { method: "ship", from: "releasing" },
  ];
  for (const { method, from } of happyPath) {
    const allowed = TRANSITIONS[method];
    assert(allowed !== undefined, `${method} missing from TRANSITIONS`);
    assert(
      allowed.includes(from),
      `${method} should be allowed from "${from}" but its allowed phases are: ${
        allowed.join(", ")
      }`,
    );
  }
});

Deno.test("legacy path: complete still accepts implementing for records that never linked a PR", () => {
  // Records created before link_pr existed (and records where the human
  // skips link_pr for docs-only or trivial changes) must still be able to
  // reach done directly from implementing. Removing the implementing entry
  // from complete's allowed list would orphan those records.
  assert(
    TRANSITIONS.complete.includes("implementing"),
    "complete must accept implementing as a source phase for backwards compatibility",
  );
});

Deno.test("plan iteration loop: iterate is allowed from plan_generated only", () => {
  // The iterate loop is the heart of the plan-revision feature. If iterate
  // accepted any other phase, a user could revise an already-approved plan,
  // bypassing the approval gate.
  assertEquals(TRANSITIONS.iterate, ["plan_generated"]);
});

Deno.test("approval gate: approve only allowed from plan_generated", () => {
  assertEquals(TRANSITIONS.approve, ["plan_generated"]);
});

Deno.test("implementation gate: implement allowed from approved and pr_failed", () => {
  assertEquals(TRANSITIONS.implement, ["approved", "pr_failed"]);
});

Deno.test("completion gate: complete allowed from implementing, pr_open, and releasing", () => {
  // complete is the exit path from the implementation span. It accepts
  // 'implementing' (legacy/no-PR path), 'pr_open' (the link_pr → pr_open
  // → complete path), and 'releasing' (backwards compat for new flow).
  assertEquals(TRANSITIONS.complete, ["implementing", "pr_open", "releasing"]);
});

// ---------------------------------------------------------------------------
// PR linkage additions (v2026.04.08.2)
// ---------------------------------------------------------------------------

Deno.test("Phase: pr_open, pr_failed, releasing sit between implementing and done", () => {
  const phases = Phase.options;
  const implementingIdx = phases.indexOf("implementing");
  const prOpenIdx = phases.indexOf("pr_open");
  const prFailedIdx = phases.indexOf("pr_failed");
  const releasingIdx = phases.indexOf("releasing");
  const doneIdx = phases.indexOf("done");

  assertEquals(prOpenIdx, implementingIdx + 1);
  assertEquals(prFailedIdx, prOpenIdx + 1);
  assertEquals(releasingIdx, prFailedIdx + 1);
  assertEquals(doneIdx, releasingIdx + 1);
});

Deno.test("TRANSITIONS: link_pr accepts implementing, pr_open, and pr_failed", () => {
  // Accepting all three source phases makes link_pr re-callable: the
  // first call moves implementing → pr_open, subsequent calls overwrite
  // the pullRequest resource while staying in pr_open. pr_failed allows
  // recovery by linking a replacement PR after failure.
  assertEquals(TRANSITIONS.link_pr, ["implementing", "pr_open", "pr_failed"]);
});

Deno.test("TRANSITIONS: link_pr is rejected from earlier lifecycle phases", () => {
  // link_pr must not be callable before implementation has begun — calling
  // it from any earlier phase is a sequencing bug in the agent and must be
  // blocked by the valid-transition pre-flight check.
  const earlierPhases: ReadonlyArray<typeof Phase.options[number]> = [
    "created",
    "triaging",
    "classified",
    "plan_generated",
    "approved",
  ];
  for (const phase of earlierPhases) {
    assertEquals(
      TRANSITIONS.link_pr.includes(phase),
      false,
      `link_pr must not be allowed from phase '${phase}'`,
    );
  }
});

Deno.test("PullRequestSchema: accepts any non-empty URL string", () => {
  // URLs are opaque to the model — GitHub, GitLab, Gitea, Forgejo, etc.
  const samples = [
    "https://github.com/systeminit/swamp/pull/1141",
    "https://gitlab.com/group/project/-/merge_requests/42",
    "https://codeberg.org/user/repo/pulls/7",
    "https://git.internal/project/+/123",
  ];
  for (const url of samples) {
    const parsed = PullRequestSchema.parse({
      url,
      linkedAt: "2026-04-08T15:00:00.000Z",
    });
    assertEquals(parsed.url, url);
  }
});

Deno.test("PullRequestSchema: rejects empty url string", () => {
  const result = PullRequestSchema.safeParse({
    url: "",
    linkedAt: "2026-04-08T15:00:00.000Z",
  });
  assertEquals(result.success, false);
});

Deno.test("PullRequestSchema: requires linkedAt", () => {
  const result = PullRequestSchema.safeParse({
    url: "https://github.com/systeminit/swamp/pull/1",
  });
  assertEquals(result.success, false);
});
