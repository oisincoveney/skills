# AGENTS.md

This repository is a collection of **agent skills** — procedural-knowledge
documents that improve how an AI coding agent works. Each lives at
`skills/<name>/SKILL.md` with `name` + `description` frontmatter and is
installable via `npx skills` (https://skills.sh).

If you are an agent working in a project that has installed these skills, load
and follow the relevant one:

- **debug** — before fixing any bug/test failure/weird behaviour.
  Find the root cause first; don't guess or patch the symptom.
- **fix** — when writing/reviewing any fix. Proper fix or escalate;
  no bandaids; "fixed" requires proof.
- **research** — when researching anything technical. Read primary
  sources, run multiple searches, don't coast on training data or trust SEO slop.
- **library-first-development** — before hand-rolling functionality. Prefer a
  maintained library, vetted properly, over reinventing it.
- **plan** — before starting any non-trivial feature, change, or fix. Turn
  it into implementation-complete tickets, each a single parallel-spawnable unit
  with acceptance criteria and declared dependencies. Orchestrates the four
  below and dispatches via Backlog.md + `pipe` when available.
- **test** — when implementing any behaviour or fixing any bug. Failing test
  first, vertical tracer-bullet slices, behaviour through public interfaces,
  never refactor on red.
- **diagnose** — for hard/intermittent bugs and perf regressions. Build a fast
  deterministic feedback loop first; hypothesise, instrument, regression-test.
- **grill** — before committing to a plan or design. Interrogate it one
  question at a time against the actual code and the project glossary.
- **improve** — when code is hard to change or test. Find shallow
  modules and missing seams; propose deepening refactors.

These encode a consistent stance: do the work properly the first time — root
causes over symptoms, primary sources over memory, maintained libraries over
hand-rolled code, and a plan whose tickets a fleet of agents could drain without
the author in the room.
