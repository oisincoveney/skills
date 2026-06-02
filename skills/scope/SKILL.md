---
name: scope
description: Use BEFORE starting any non-trivial feature, change, or fix — when turning a request, spec, or bug into a plan and a set of tickets. Produces implementation-complete tickets that are each a single, parallel-spawnable unit of work with explicit acceptance criteria and declared dependencies, ready to fan out across agents. Trigger on "plan this", "break this down", "how should we build X", "turn this into tickets", "make an epic", "scope this out".
---

# Planning

A plan is finished when an agent fleet could drain it without you in the room: every ticket is a single unit of work, spawnable in parallel, with acceptance criteria that say exactly when it's done, and a dependency graph that makes the fan-out order computable rather than guessed. Planning *is* the work — the tickets are just its output. Coast on the planning and you pay for it N times over, once per agent that picks up an under-specified ticket.

## The discipline

Don't decompose first. Decomposition is step 5. Walk the work down to bedrock, *then* cut it into pieces.

### 1. Frame it: bug or change?

- **A bug, regression, "it's broken / slow / flaky"** → you cannot plan a fix you haven't diagnosed. Run [[diagnose]] first. Its output — the root cause, the feedback loop, the correct test seam — is the input to the rest of planning. Planning around a symptom plans the wrong work.
- **A feature or change** → go to step 2.

### 2. Understand before you cut

Read the spec *and the actual code* — not your memory of the code. Map the real dependency graph: what must exist before what. For any unfamiliar library, API, or version, run [[research]] — a plan built on a hallucinated API signature is N tickets of rework. Name the unknowns explicitly; a named unknown is a research ticket, a buried one is a mid-implementation stall.

### 3. Grill the plan

Before a single ticket exists, run [[grill]] — interrogate the plan one question at a time against codebase reality and the project's own glossary. Vague terms, fuzzy boundaries, unstated assumptions, and contradictions with existing code surface here, cheaply, instead of inside a half-built worktree. A plan that hasn't been grilled is a guess wearing a checklist.

### 4. Make the architecture fit

If the work introduces or strains module boundaries, run [[improve]] *before* decomposing. Decide where the depth and the seams live, then plan tickets that build that shape. Tickets that fight the architecture are the ones that collide when fanned out — two agents smearing shallow glue across the same files is a merge conflict you authored at planning time.

### 5. Cut into atomic, parallel-spawnable tickets

This is the constraint everything else serves. **Every ticket must be all five:**

- **One unit of work** — implementable, testable, and verifiable in a single focused agent session. An "and" in the title is two tickets. Two independent subsystems is two tickets.
- **Independently spawnable** — an agent can take it with nothing but the ticket and the repo. No "ask Sarah", no "coordinate with the other branch". A shared contract (types, an API shape, a schema) is its *own earlier ticket* that the others depend on — define it once, then the dependents fan out without colliding.
- **Acceptance-criteria-complete** — explicit, testable done-conditions. "Implement the feature" is not acceptance criteria; "`POST /tasks` returns 201 with the created task; empty title returns 422" is.
- **Dependency-declared** — it names what it depends on, so the batch order is *computed*, not eyeballed.
- **Implementation-complete** — it carries the slice of the design it owns: the interface it implements, the files it will touch, the test seam. The implementing agent should *execute* the plan, not re-derive it.

If you can't write a ticket's acceptance criteria in a few bullets, it's too big — cut it down until you can.

### 6. Record them where the fleet can drain them

Use the real tooling if it's here; degrade gracefully if it isn't.

**If [Backlog.md](https://backlog.md) is available** (`backlog` CLI resolves, or the Backlog MCP server is connected for this repo), make each ticket a task:

```bash
backlog task create "Add POST /tasks endpoint" \
  --parent TASK-12 --depends-on TASK-13 \
  --ac "Returns 201 with created task" --ac "Empty title → 422" \
  --plan "Implements TaskService.create; wires route in src/api/tasks.ts" \
  --ref src/api/tasks.ts --modified-file src/api/tasks.ts
```

Group the slice under an epic (a parent task, or `--labels epic`). Then **prove the decomposition is actually parallel**:

```bash
backlog sequence list --plain
```

This computes execution batches from your declared dependencies. Read it like a verdict:
- Everything in one long chain → your tickets aren't parallel; you over-declared dependencies or cut horizontally. Re-cut.
- Two tickets in the same batch that touch the same file → a latent merge conflict. Split the shared part into an earlier ticket they both depend on.

**If backlog isn't available**, write a plan document with the same structure — one section per ticket, each with description, acceptance criteria, dependencies, and files-likely-touched — and order it into explicit parallel batches yourself.

### 7. Dispatch

**If the local `oisin-pipeline` (`pipe`) is available** (`~/dev/oisin-pipeline`, or `pipe` / `oisin-pipeline` on PATH), hand the epic to it: `pipe epic <id>` reads the epic and its sub-tickets through the Backlog MCP, routes each into a track, fans them into isolated git worktrees running the implement→verify workflow, then drain-merges and reviews. Confirm the epic and its sub-tickets exist in backlog first — the router reads them, it doesn't invent them.

**Otherwise**, spawn the agents yourself, one parallel batch from `backlog sequence` at a time: everything in a batch concurrently, barrier, next batch.

### 8. Implement with discipline

Each ticket is built with [[test]] unless it's genuinely trivial (config, copy, a rename). Fixes land per [[fix]]; nothing is "done" without the evidence those skills demand.

## When NOT to do all this

A single-file change with obvious scope doesn't need an epic — just do it (with [[test]] if it's behavior). The machinery earns its keep when work is large, parallelizable, or unclear. Don't ceremony-wrap a one-liner.

## Red flags

- Decomposing before diagnosing / grilling / fixing the architecture — tickets built on a guess.
- A ticket with no acceptance criteria, or whose criteria are "it works".
- `backlog sequence` shows one sequential chain — you planned serial work and called it parallel.
- Two same-batch tickets editing the same file — a merge conflict scheduled in advance.
- Tickets that say "implement the X" with no interface, no files, no seam — the agent will re-plan, badly.
- Shared contracts discovered mid-fan-out instead of pulled into an earlier ticket.

## The short version

Diagnose (if it's a bug) → understand the *real* code → [[grill]] → fit the [[improve|architecture]] → cut into tickets that are each *one* parallel-spawnable, acceptance-complete, dependency-declared unit → record in backlog and prove parallelism with `backlog sequence list --plain` → dispatch with `pipe epic` → build each with [[test]]. The plan is done when the fleet could drain it without you.

---

*Original work. Orchestrates [[diagnose]], [[grill]], [[improve]], and [[test]] (adapted from [mattpocock/skills](https://github.com/mattpocock/skills), MIT) with [[research]] and [[fix]]. Wires to [Backlog.md](https://backlog.md) and the local `oisin-pipeline` (`pipe`) when present, and degrades to a plain plan document when not.*
