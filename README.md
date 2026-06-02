# skills

Engineering-discipline skills for AI coding agents — the kind that stop an agent
from shipping bandaids, coasting on training data, or hand-rolling what a library
already does. Authored in the standard [Agent Skills](https://skills.sh) format,
installable across ~55 agent harnesses (Claude Code, Codex, Cursor, Copilot,
Windsurf, Gemini, Cline, Goose, OpenCode, Zed, …) via `npx skills`.

## The skills

| Skill | What it forces |
| ----- | -------------- |
| [`debug`](skills/debug/SKILL.md) | Find the real root cause before touching a fix — read the error, reproduce, trace the bad value back to its origin. No guessing. |
| [`fix`](skills/fix/SKILL.md) | Proper root-cause fix, or stop and escalate. **No acceptable bandaid.** "Fixed" means reproduced-then-gone with green tests, not "should work". |
| [`research`](skills/research/SKILL.md) | Multiple real searches over primary sources (docs, source code, high-vote SO, maintainer blogs). No one-search-then-training-data; no SEO slop. |
| [`library-first-development`](skills/library-first-development/SKILL.md) | Prefer a popular, actively-maintained library over hand-rolling — then vet it properly (adoption, maintenance, bus factor, license, security). |
| [`plan`](skills/plan/SKILL.md) | Turn a request, spec, or bug into implementation-complete tickets — each a single, **parallel-spawnable** unit with acceptance criteria and declared dependencies, ready to fan out across agents. Orchestrates the four below. |
| [`test`](skills/test/SKILL.md) | Red→green→refactor in vertical tracer-bullet slices — test behaviour through public interfaces, watch every test fail first, reproduce bugs before fixing. Never refactor on red. |
| [`diagnose`](skills/diagnose/SKILL.md) | Hard bugs and perf regressions: build a fast deterministic feedback loop first, then 3–5 falsifiable hypotheses, instrument one variable at a time, regression-test at a correct seam. |
| [`grill`](skills/grill/SKILL.md) | Interrogate a plan one question at a time against the actual code and the project glossary — kill vague terms, fuzzy boundaries, and code-contradicting assumptions before they become tickets. |
| [`improve`](skills/improve/SKILL.md) | Find shallow modules and missing seams via the deletion test; propose deepening refactors (simple interface, deep implementation) so work lands local and testable. |

They cross-reference each other: `debug` hands off to `fix`;
`library-first-development` uses `research` to find and vet candidates;
`plan` is the spine that runs `diagnose` → `grill` → `improve` → atomic
tickets → `test` implementation, wiring to [Backlog.md](https://backlog.md)
and the local `oisin-pipeline` (`pipe`) when they're available and degrading
gracefully when they're not.

## Install

```bash
# Install all nine into every agent on this machine
npx skills add oisincoveney/skills -g --all

# Or target specific agents
npx skills add oisincoveney/skills -g -a claude-code -a codex -a cursor

# Or from a local clone
npx skills add ./ -g --all
```

`npx skills list` / `update` / `remove` manage them afterwards. See
[skills.sh](https://skills.sh) for the full CLI.

## License & attribution

MIT (see [`LICENSE`](LICENSE)). `debug` and `fix`
are adapted from [obra/superpowers](https://github.com/obra/superpowers) (MIT)
and [gridaco/grida](https://github.com/gridaco/grida) (Apache-2.0);
`library-first-development` draws vetting criteria from
[andrew/managing-dependencies](https://github.com/andrew/managing-dependencies)
(CC0); `test`, `diagnose`, `grill`, and `improve` are adapted
from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Full
attribution in [`NOTICE`](NOTICE).
