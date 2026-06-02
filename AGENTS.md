# AGENTS.md

This repository is a collection of **agent skills** — procedural-knowledge
documents that improve how an AI coding agent works. Each lives at
`skills/<name>/SKILL.md` with `name` + `description` frontmatter and is
installable via `npx skills` (https://skills.sh).

If you are an agent working in a project that has installed these skills, load
and follow the relevant one:

- **systematic-debugging** — before fixing any bug/test failure/weird behaviour.
  Find the root cause first; don't guess or patch the symptom.
- **root-cause-fixes** — when writing/reviewing any fix. Proper fix or escalate;
  no bandaids; "fixed" requires proof.
- **high-signal-research** — when researching anything technical. Read primary
  sources, run multiple searches, don't coast on training data or trust SEO slop.
- **library-first-development** — before hand-rolling functionality. Prefer a
  maintained library, vetted properly, over reinventing it.

These encode a consistent stance: do the work properly the first time — root
causes over symptoms, primary sources over memory, maintained libraries over
hand-rolled code.
