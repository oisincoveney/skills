---
name: library-first-development
description: Use BEFORE hand-writing any non-trivial functionality — parsing, dates/timezones, auth, retries/backoff, HTTP, validation, state machines, queues, crypto, file formats, etc. Forces researching existing libraries first and preferring a popular, actively-maintained one over hand-rolling, then vetting it properly before adopting. Trigger on "let's write a", "I'll implement", "build a helper for", "we need to handle X", "roll our own", and any moment you're about to reinvent something a library already does.
---

# Library-First Development

Default position: **someone has probably already built this, better, and maintains it.** Hand-rolling means *you* now own the bugs, the edge cases, and the maintenance forever. So you research first and reach for a good library — and you only build it yourself when nothing genuinely fits, and you say why.

This is not "add dependencies carelessly." It's "don't reinvent the wheel, *and* don't bolt on a junk wheel." Library-first, then vet hard.

## The workflow

1. **Name the capability** in one sentence ("parse and diff ISO-8601 durations", "rate-limit outbound calls with backoff"). If a mature library category exists for it, you're in scope.
2. **Find real candidates** — use [[research]]. Get actual maintained options from primary sources (registries, GitHub, the ecosystem's "awesome" lists), not a half-remembered name.
3. **Vet before adopting** (below). A popular library that's abandoned or risky is not the answer.
4. **Adopt the best fit, or hand-roll with a written reason** (below).

## Vetting — judge the library, not its marketing

Stars and download counts are gameable; ignore them as primary signals. Use real adoption and health data. `ecosyste.ms` covers every major registry:

```bash
curl -s "https://packages.ecosyste.ms/api/v1/registries/<registry>/packages/<package>" | jq '{
  dependent_repos: .dependent_repos_count,
  dependent_packages: .dependent_packages_count,
  latest_release: .latest_release_published_at,
  first_release: .first_release_published_at,
  maintainers: (.maintainers | length),
  license: .normalized_licenses,
  advisories: (.advisories | length),
  archived: .repo_metadata.archived
}'
# registries: npmjs.org, pypi.org, rubygems.org, crates.io, proxy.golang.org, nuget.org, repo1.maven.org, ...
```

**Adopt-worthy signals:** high dependent-*repo/package* count (real projects rely on it), recent release, multiple maintainers, OSI-approved license, few open advisories, not archived.

**Red flags — slow down:** archived repo; last release >2 years ago; single maintainer / high bus factor; <90 days old; known advisories; non-OSI or missing license; vendors copies of common deps; runs code on install.

Bus factor — single-maintainer dominance is a real risk:
```bash
# .repo_metadata.metadata.development_distribution_score  (<0.15 = one person carries it)
```

Security posture (optional, for anything load-bearing):
```bash
curl -s "https://api.scorecard.dev/projects/github.com/<owner>/<repo>" | jq '{score, checks: [.checks[] | {(.name): .score}]}'
```

**Verify it actually exists before you install it.** AI assistants hallucinate plausible package names, and attackers register them (slopsquatting). Confirm on the registry (`npm view <pkg>`, `pip index versions <pkg>`), check it's not a typo of the real package, and copy the name from official docs rather than typing it from memory.

## When hand-rolling IS the right call

Build it yourself only when one of these is true — and write the reason in a comment or the PR:

- No maintained library actually fits (you evaluated real ones; document which and why they fell short).
- The capability is genuinely trivial (a few lines, no edge cases, no ongoing maintenance burden).
- A dependency would be reckless here (unmaintained, unacceptable license, security-critical surface you must control).

"I'd rather just write it" is not a reason. "I evaluated `x`, `y`, `z`; `x` is abandoned, `y` pulls 40 transitive deps for a 10-line need, `z`'s license is GPL and we ship proprietary — so a 12-line inline implementation is the right trade-off" *is* a reason.

## Note

This is about *choosing* to use a library well. For deep supply-chain hardening (lockfiles, provenance/attestation, dependency-confusion, CI auditing), hand off to [[supply-chain-risk-auditor]].

---

*Original skill for Oisín's skills repo. Vetting criteria (ecosyste.ms / OpenSSF Scorecard / risk thresholds / slopsquat checks) drawn from [andrew/managing-dependencies](https://github.com/andrew/managing-dependencies) by Andrew Nesbitt (CC0-1.0), with the default lean flipped from minimalist to library-first. Pairs with [[research]] and [[supply-chain-risk-auditor]].*
