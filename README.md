# skills

Engineering-discipline skills for AI coding agents — the kind that stop an agent
from shipping bandaids, coasting on training data, or hand-rolling what a library
already does. Authored in the standard [Agent Skills](https://skills.sh) format,
installable across ~55 agent harnesses (Claude Code, Codex, Cursor, Copilot,
Windsurf, Gemini, Cline, Goose, OpenCode, Zed, …) via `npx skills`.

## The skills

| Skill | What it forces |
| ----- | -------------- |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | Find the real root cause before touching a fix — read the error, reproduce, trace the bad value back to its origin. No guessing. |
| [`root-cause-fixes`](skills/root-cause-fixes/SKILL.md) | Proper root-cause fix, or stop and escalate. **No acceptable bandaid.** "Fixed" means reproduced-then-gone with green tests, not "should work". |
| [`high-signal-research`](skills/high-signal-research/SKILL.md) | Multiple real searches over primary sources (docs, source code, high-vote SO, maintainer blogs). No one-search-then-training-data; no SEO slop. |
| [`library-first-development`](skills/library-first-development/SKILL.md) | Prefer a popular, actively-maintained library over hand-rolling — then vet it properly (adoption, maintenance, bus factor, license, security). |
| [`planning`](skills/planning/SKILL.md) | Turn a request, spec, or bug into implementation-complete tickets — each a single, **parallel-spawnable** unit with acceptance criteria and declared dependencies, ready to fan out across agents. Orchestrates the four below. |
| [`tdd`](skills/tdd/SKILL.md) | Red→green→refactor in vertical tracer-bullet slices — test behaviour through public interfaces, watch every test fail first, reproduce bugs before fixing. Never refactor on red. |
| [`diagnose`](skills/diagnose/SKILL.md) | Hard bugs and perf regressions: build a fast deterministic feedback loop first, then 3–5 falsifiable hypotheses, instrument one variable at a time, regression-test at a correct seam. |
| [`grill-plans`](skills/grill-plans/SKILL.md) | Interrogate a plan one question at a time against the actual code and the project glossary — kill vague terms, fuzzy boundaries, and code-contradicting assumptions before they become tickets. |
| [`improve-architecture`](skills/improve-architecture/SKILL.md) | Find shallow modules and missing seams via the deletion test; propose deepening refactors (simple interface, deep implementation) so work lands local and testable. |

They cross-reference each other: debugging hands off to root-cause-fixes;
library-first-development uses high-signal-research to find and vet candidates;
`planning` is the spine that runs `diagnose` → `grill-plans` →
`improve-architecture` → atomic tickets → `tdd` implementation, wiring to
[Backlog.md](https://backlog.md) and the local `oisin-pipeline` (`pipe`) when
they're available and degrading gracefully when they're not.

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

MIT (see [`LICENSE`](LICENSE)). `systematic-debugging` and `root-cause-fixes`
are adapted from [obra/superpowers](https://github.com/obra/superpowers) (MIT)
and [gridaco/grida](https://github.com/gridaco/grida) (Apache-2.0);
`library-first-development` draws vetting criteria from
[andrew/managing-dependencies](https://github.com/andrew/managing-dependencies)
(CC0); `tdd`, `diagnose`, `grill-plans`, and `improve-architecture` are adapted
from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Full
attribution in [`NOTICE`](NOTICE).
