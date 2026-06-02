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

They cross-reference each other: debugging hands off to root-cause-fixes;
library-first-development uses high-signal-research to find and vet candidates.

## Install

```bash
# Install all four into every agent on this machine
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
(CC0). Full attribution in [`NOTICE`](NOTICE).
