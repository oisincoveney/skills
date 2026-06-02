# Vendor oisin-pipeline Skills

## Goal

Vendor selected skills from `/Users/oisin/dev/oisin-pipeline/.agents/skills` into this repo while preserving the existing one-word everyday surface. New high-use skills become one-word handles; supporting skills remain installable sub-skills referenced from those handles.

## Scope

In scope:
- Add seven new handle skills: `secure`, `optimize`, `doubt`, `spec`, `migrate`, `critique`, `verify`.
- Add selected sub-skills under descriptive names.
- Fold only additive wording from duplicate/overlapping skills into the existing core skills.
- Adapt copied skills for this repo's cross-harness `npx skills` distribution model.
- Update `README.md`, `NOTICE`, and cross-skill `[[wiki-link]]` references.
- Verify frontmatter, dangling links, install discovery, and source disposition coverage.

Out of scope:
- Vendoring `vercel-react-best-practices` in this change.
- Vendoring pipeline-bound skills: `epic`, `inspect`, `pipe`.
- Vendoring harness bootstrap skill `using-superpowers`.
- Vendoring repo-specific `infra-coder-devspace-gitops-diagnostics`.
- Creating an ongoing sync script from `oisin-pipeline`.

## Source Disposition

There are currently 40 source skill directories under `/Users/oisin/dev/oisin-pipeline/.agents/skills`.

Vendor as handles:
- `security-and-hardening` -> `secure`
- `performance-optimization` -> `optimize`
- `doubt-driven-development` -> `doubt`
- `spec-driven-development` -> `spec`
- `deprecation-and-migration` -> `migrate`
- `code-review-and-quality` -> `critique`
- `verification-before-completion` -> `verify` (keep `verification-before-completion` as a compatibility alias)

Vendor as sub-skills:
- `source-driven-development`
- `incremental-implementation`
- `documentation-and-adrs`
- `verification-before-completion` (compatibility alias for `verify`)
- `web-design-guidelines`
- `thermo-nuclear-code-quality-review`
- `supply-chain-risk-auditor`
- `semgrep`
- `requesting-code-review`
- `receiving-code-review`
- `context-engineering`
- `dispatching-parallel-agents`

Fold, do not vendor:
- `test-driven-development` -> `skills/test/SKILL.md`
- `planning-and-task-breakdown` -> `skills/scope/SKILL.md`
- `writing-plans` -> `skills/scope/SKILL.md`
- `debugging-and-error-recovery` -> `skills/diagnose/SKILL.md`

Exclude:
- `debug`, `systematic-debugging`, `root-cause-fixes`, `high-signal-research`, `plan`, and same-name duplicates already represented by the core skills.
- `epic`, `inspect`, `pipe`, `using-superpowers`, `infra-coder-devspace-gitops-diagnostics`, `vercel-react-best-practices`.

## Link And Adaptation Rules

Remap copied `[[wiki-link]]` references:
- `[[systematic-debugging]]` and `[[debug]]` -> `[[trace]]`
- `[[root-cause-fixes]]` -> `[[fix]]`
- `[[high-signal-research]]` -> `[[research]]`
- `[[plan]]` -> `[[scope]]`
- `[[test-driven-development]]` -> `[[test]]`
- `[[debugging-and-error-recovery]]` -> `[[diagnose]]`
- `[[code-review-and-quality]]` -> `[[critique]]`
- `[[security-and-hardening]]` -> `[[secure]]`
- `[[performance-optimization]]` -> `[[optimize]]`
- `[[doubt-driven-development]]` -> `[[doubt]]`
- `[[spec-driven-development]]` -> `[[spec]]`
- `[[deprecation-and-migration]]` -> `[[migrate]]`

Adaptation pass required for every copied skill:
- Set frontmatter `name:` to the destination directory name.
- Remove or generalize harness-specific `allowed-tools` frontmatter unless it is valid for the target format.
- Replace hard-coded Claude-only tool names such as `Task`, `AskUserQuestion`, `Read`, `Write`, `Bash`, `Glob`, and `Grep` with harness-neutral wording or explicit caveats.
- Preserve required auxiliary files for skills that reference them, such as `semgrep/references`, `semgrep/scripts`, `semgrep/workflows`, and `requesting-code-review/code-reviewer.md`.
- Keep examples and descriptions accurate after renaming.

## Parallel Batches

### Batch 0: Source Audit

#### Task 0.1: Create source disposition and collision audit

Description: Verify all source skill directories are accounted for before copying anything, and confirm selected handle names do not collide with existing repo skills or reserved/built-in names.

Files likely touched:
- None, unless adding temporary notes to this plan.

Acceptance criteria:
- The audit lists all 40 source skill directories with one disposition each: handle, sub-skill, fold, or exclude.
- `secure`, `optimize`, `doubt`, `spec`, `migrate`, and `critique` do not collide with existing `skills/<name>/` directories.
- `infra-coder-devspace-gitops-diagnostics` and `vercel-react-best-practices` are explicitly excluded in the audit.
- Any uncertainty about CLI reserved names is recorded before implementation starts.

Dependencies: none.

### Batch 1: New Handle Skills

These tasks can run in parallel after Task 0.1 because they create disjoint directories.

#### Task 1.1: Vendor `secure`

Description: Copy and adapt `security-and-hardening` into `skills/secure/SKILL.md`.

Files likely touched:
- `skills/secure/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `secure`.
- Description clearly triggers on security-sensitive work.
- Any copied links are remapped according to the link rules.
- Harness-specific wording is either removed or made cross-harness.

Dependencies: Task 0.1.

#### Task 1.2: Vendor `optimize`

Description: Copy and adapt `performance-optimization` into `skills/optimize/SKILL.md`.

Files likely touched:
- `skills/optimize/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `optimize`.
- The skill keeps measurement-before-optimization as the central workflow.
- Web-vitals guidance remains current to the source wording being copied.
- Links and harness-specific wording pass the adaptation rules.

Dependencies: Task 0.1.

#### Task 1.3: Vendor `doubt`

Description: Copy and adapt `doubt-driven-development` into `skills/doubt/SKILL.md`.

Files likely touched:
- `skills/doubt/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `doubt`.
- Fresh-context review guidance is preserved.
- Claude-specific persona/subagent references are generalized or caveated.
- Shell-prompt safety guidance remains intact.

Dependencies: Task 0.1.

#### Task 1.4: Vendor `spec`

Description: Copy and adapt `spec-driven-development` into `skills/spec/SKILL.md`.

Files likely touched:
- `skills/spec/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `spec`.
- Workflow points to this repo's vocabulary, including `[[scope]]`, `[[test]]`, `[[incremental-implementation]]`, and `[[context-engineering]]` where appropriate.
- No references remain to non-vendored duplicate names.

Dependencies: Task 0.1.

#### Task 1.5: Vendor `migrate`

Description: Copy and adapt `deprecation-and-migration` into `skills/migrate/SKILL.md`.

Files likely touched:
- `skills/migrate/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `migrate`.
- Deprecation and migration decision workflow remains complete.
- Links and examples are valid after copying.

Dependencies: Task 0.1.

#### Task 1.6: Vendor `critique`

Description: Copy and adapt `code-review-and-quality` into `skills/critique/SKILL.md`.

Files likely touched:
- `skills/critique/SKILL.md`

Acceptance criteria:
- Frontmatter `name:` is `critique`.
- The skill remains a multi-axis review skill covering correctness, maintainability, architecture, security, and performance.
- It references relevant sub-skills only after those names are planned: `[[web-design-guidelines]]`, `[[thermo-nuclear-code-quality-review]]`, `[[requesting-code-review]]`, `[[receiving-code-review]]`, and `[[semgrep]]`.
- No `review` or `code-review` handle collision is introduced.

Dependencies: Task 0.1.

### Batch 2: Sub-Skill Vendoring

These tasks can run in parallel after Task 0.1 because they create disjoint directories. They do not update existing core skill back-references.

#### Task 2.1: Vendor implementation discipline sub-skills

Description: Copy and adapt `source-driven-development`, `incremental-implementation`, and the `verification-before-completion` compatibility alias.

Files likely touched:
- `skills/source-driven-development/SKILL.md`
- `skills/incremental-implementation/SKILL.md`
- `skills/verification-before-completion/SKILL.md`
- `skills/verify/SKILL.md`

Acceptance criteria:
- Each skill has frontmatter `name:` matching its directory.
- References to duplicate names are remapped to `[[research]]`, `[[scope]]`, `[[test]]`, and `[[fix]]` as appropriate.
- The verification skill's completion evidence standard is preserved without conflicting with existing `[[fix]]`.

Dependencies: Task 0.1.

#### Task 2.2: Vendor planning and context sub-skills

Description: Copy and adapt `documentation-and-adrs`, `context-engineering`, and `dispatching-parallel-agents`.

Files likely touched:
- `skills/documentation-and-adrs/SKILL.md`
- `skills/context-engineering/SKILL.md`
- `skills/dispatching-parallel-agents/SKILL.md`

Acceptance criteria:
- Each skill has frontmatter `name:` matching its directory.
- Rules-file guidance mentions cross-harness files accurately, including `AGENTS.md`.
- Parallel-agent guidance is generalized where it uses Claude-specific subagent examples.
- ADR guidance remains compatible with `[[grill]]` and `[[scope]]`.

Dependencies: Task 0.1.

#### Task 2.3: Vendor security sub-skills

Description: Copy and adapt `supply-chain-risk-auditor` and the full `semgrep` skill directory.

Files likely touched:
- `skills/supply-chain-risk-auditor/SKILL.md`
- `skills/semgrep/SKILL.md`
- `skills/semgrep/references/*`
- `skills/semgrep/scripts/*`
- `skills/semgrep/workflows/*`

Acceptance criteria:
- `supply-chain-risk-auditor` frontmatter name matches its directory.
- `semgrep` frontmatter name matches its directory.
- `semgrep` auxiliary files referenced by `SKILL.md` are copied.
- `semgrep` tool/subagent instructions are adapted or clearly marked as harness-specific.
- `semgrep` commands preserve `--metrics=off`.

Dependencies: Task 0.1.

#### Task 2.4: Vendor critique companion sub-skills

Description: Copy and adapt `web-design-guidelines`, `thermo-nuclear-code-quality-review`, `requesting-code-review`, and `receiving-code-review`.

Files likely touched:
- `skills/web-design-guidelines/SKILL.md`
- `skills/thermo-nuclear-code-quality-review/SKILL.md`
- `skills/requesting-code-review/SKILL.md`
- `skills/requesting-code-review/code-reviewer.md`
- `skills/receiving-code-review/SKILL.md`

Acceptance criteria:
- Each skill has frontmatter `name:` matching its directory.
- `requesting-code-review/code-reviewer.md` is copied because `SKILL.md` references it.
- Claude-only review dispatch instructions are generalized or caveated.
- `receiving-code-review` no longer depends on a `CLAUDE.md`-specific behavior unless framed as an example.

Dependencies: Task 0.1.

### Batch 3: Existing Core Skill Curation

Run after Batches 1 and 2 so back-references can point to existing directories.

#### Task 3.1: Fold additive wording into core skills and add back-references

Description: Update the existing core skills with curated language from overlapping source skills and add natural "pairs with" references to newly vendored skills.

Files likely touched:
- `skills/test/SKILL.md`
- `skills/scope/SKILL.md`
- `skills/diagnose/SKILL.md`
- `skills/fix/SKILL.md`
- `skills/library-first-development/SKILL.md`
- `skills/improve/SKILL.md`

Acceptance criteria:
- `skills/test/SKILL.md` includes only additive wording from `test-driven-development`: Prove-It bug-fix framing, DAMP-over-DRY note if useful, and concise anti-patterns.
- `skills/scope/SKILL.md` includes only additive wording from `planning-and-task-breakdown` and `writing-plans`: task sizing, no-placeholder red flags, and safe/unsafe parallelization guidance.
- `skills/diagnose/SKILL.md` includes only additive wording from `debugging-and-error-recovery`: untrusted error-output caution and safe fallback handling.
- `skills/fix/SKILL.md` references `[[secure]]` where CVE/security remediation naturally fits.
- `skills/library-first-development/SKILL.md` references `[[supply-chain-risk-auditor]]`.
- `skills/scope/SKILL.md` references `[[spec]]`, `[[dispatching-parallel-agents]]`, and `[[context-engineering]]`.
- `skills/improve/SKILL.md` references `[[critique]]` and/or `[[thermo-nuclear-code-quality-review]]`.
- Existing core skill style remains terse; beginner-oriented bulk is not copied.

Dependencies: all Batch 1 and Batch 2 tasks.

### Batch 4: Repository Documentation

These tasks can run in parallel after Batches 1-3 because they touch different top-level files.

#### Task 4.1: Update README skill catalog

Description: Update `README.md` to show the expanded skill set and explain handles versus sub-skills.

Files likely touched:
- `README.md`

Acceptance criteria:
- README has a "Core handles" section listing the original nine plus six new one-word handles.
- README has a "Sub-skills" section listing the vendored descriptive skills.
- The install instructions still work for `npx skills add ./ -g --all`.
- The wording makes clear that sub-skills are still installable; "sub-skill" means surface/linking tier.

Dependencies: Task 3.1.

#### Task 4.2: Update NOTICE attribution

Description: Add attribution and license notes for all newly vendored material.

Files likely touched:
- `NOTICE`

Acceptance criteria:
- Every newly vendored skill has an attribution entry or is explicitly marked as original/local material.
- `web-design-guidelines`, `semgrep`, and any copied Vercel/Semgrep/third-party-derived material have source/license notes.
- Third-party ruleset references inside the `semgrep` skill are not represented as vendored code unless they are actually copied.
- NOTICE does not claim attribution for excluded skills.

Dependencies: Task 3.1.

### Batch 5: Verification

Run after all implementation and docs tasks.

#### Task 5.1: Validate skills package integrity

Description: Run repository-level validation for frontmatter, links, install discovery, and source disposition.

Files likely touched:
- None, unless fixing issues found by validation.

Acceptance criteria:
- Every `skills/*/SKILL.md` exists and has `name:` matching its directory.
- Every `skills/*/SKILL.md` has a non-empty `description:`.
- Every `[[name]]` link resolves to an existing `skills/<name>/` directory.
- No vendored skill contains stale duplicate references such as `[[plan]]`, `[[debug]]`, `[[systematic-debugging]]`, `[[root-cause-fixes]]`, or `[[high-signal-research]]`.
- No copied skill contains unadapted `allowed-tools` frontmatter unless deliberately supported.
- `npx skills add ./ -l` discovers the expected total: 9 existing core skills + 7 new handles + 12 sub-skills = 28 skills.
- A dry install smoke test succeeds with `npx skills add ./ -g --all` or an equivalent non-mutating local install check if global install is not acceptable in the verification environment.
- `git status --short` shows only expected files changed or created.

Dependencies: Tasks 4.1 and 4.2.

## Suggested Validation Commands

```bash
# Count source skill directories.
find /Users/oisin/dev/oisin-pipeline/.agents/skills -maxdepth 1 -mindepth 1 -type d | wc -l

# Check frontmatter names match directories.
for d in skills/*; do
  [ -d "$d" ] || continue
  name=$(basename "$d")
  grep -q "^name: $name$" "$d/SKILL.md" || echo "bad name: $d"
  grep -q "^description:" "$d/SKILL.md" || echo "missing description: $d"
done

# Check dangling wiki links.
rg -o "\[\[[^]|]+(\|[^]]+)?\]\]" skills \
  | sed -E 's/.*\[\[([^]|]+).*/\1/' \
  | sort -u \
  | while read -r link; do
      [ -d "skills/$link" ] || echo "dangling link: $link"
    done

# Check stale duplicate names.
rg -n "\[\[(plan|debug|systematic-debugging|root-cause-fixes|high-signal-research|test-driven-development|debugging-and-error-recovery)\]\]" skills || true

# Check install discovery.
npx skills add ./ -l
```

## Execution Order Summary

1. Batch 0: source audit.
2. Batch 1 and Batch 2 in parallel: create new handle and sub-skill directories.
3. Batch 3: curate existing core skills and add back-references.
4. Batch 4 in parallel: README and NOTICE.
5. Batch 5: validation and fixes.
