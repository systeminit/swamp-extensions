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
import { Phase, TRANSITIONS } from "./schemas.ts";

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

Deno.test("happy path: created → triaging → classified → plan_generated → approved → implementing → done", () => {
  // Walk the linear happy path one method at a time and verify each method's
  // required source phase is in its TRANSITIONS entry. This catches the case
  // where someone reorders the state machine and forgets to update an edge.
  const happyPath: ReadonlyArray<{ method: string; from: Phase }> = [
    { method: "start", from: "created" },
    { method: "triage", from: "triaging" },
    { method: "plan", from: "classified" },
    { method: "approve", from: "plan_generated" },
    { method: "implement", from: "approved" },
    { method: "complete", from: "implementing" },
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

Deno.test("plan iteration loop: iterate is allowed from plan_generated only", () => {
  // The iterate loop is the heart of the plan-revision feature. If iterate
  // accepted any other phase, a user could revise an already-approved plan,
  // bypassing the approval gate.
  assertEquals(TRANSITIONS.iterate, ["plan_generated"]);
});

Deno.test("approval gate: approve only allowed from plan_generated", () => {
  assertEquals(TRANSITIONS.approve, ["plan_generated"]);
});

Deno.test("implementation gate: implement only allowed from approved", () => {
  assertEquals(TRANSITIONS.implement, ["approved"]);
});

Deno.test("completion gate: complete only allowed from implementing", () => {
  // complete is the single exit path out of implementing — there is no
  // ci_review phase or fix loop in the swamp-club workflow.
  assertEquals(TRANSITIONS.complete, ["implementing"]);
});
