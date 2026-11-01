# ADR-0009: Tracking upstream

- Status: Proposed
- Date: 2026-11-01
- Revised: 2026-11-01 (v0.1.1: upstream is `marclou/mailcheap`; sync branch workflow; weekly cadence)
- Deciders: Lee Bolding

## Context

Upstream is `marclou/mailcheap` (ADR-0002). It ships often: between `42ca6fc` (2026-10-26) and `c13cbb5` (2026-11-01), 302 files changed. Its changes include security and deliverability fixes that a SaaS handling other people's email needs. Diverging completely would mean owning all of that alone, which is the reason ADR-0002 chose the current version over the MIT release. Upstream's commits are snapshot syncs from a private cloud repository ("Sync from mailcheap-cloud ..."), so changes arrive in lumps.

Lee proposed the working method: keep our changes on their own branch, periodically sync the original into the repository, and merge those changes in. This ADR records that method with refinements.

## Proposed decision

1. **Remotes.** `upstream` is `https://github.com/marclou/mailcheap` with its push URL disabled. `origin` is this project's repository (currently the fork `mail-ltd/mailcheap`). The repository is created from a clone with full history, so upstream and our history share a merge base. A repository imported from a zip of the files has no shared history, and the first merge would conflict on everything.
2. **Our work lives on `main`.** There is no modified copy of upstream's `main`; `upstream/main` is the mirror.
3. **Each sync is a branch.** Create `sync/YYYY-MM-DD` from `main`, run `git merge upstream/main` into it, resolve conflicts, run the project's rebrand script (ADR-0006), then lint, the full test suite and the build. Only when those pass, merge the branch into `main` and tag `sync-YYYY-MM-DD`. The runbook is `docs/upstream/SYNC.md`.
4. **Merge, never rebase.** Rebasing rewrites history that has been published as the AGPL source and deployed from tags. `git config rerere.enabled true` makes git remember conflict resolutions.
5. **Cadence: weekly, or fortnightly at most, and at once for anything touching `SECURITY.md`, authentication, suppression or deliverability.** Small merges are far easier than one large one, and upstream moves fast. The sync is a sprint-sized task with its own entry in `docs/CURRENT_SPRINT.md`, and the suite is recorded green before and after.
6. **Prefer additive changes.** New features go in new files, models and actions. Edit an upstream file only when there is no other way, and keep the edit small. Use upstream's own extension points (`lib/site-extensions.js` and `components/SiteExtensions.jsx`).
7. **Record divergence.** Every upstream file this project changes is listed in `docs/upstream/DIVERGENCE.md`, with the reason and the ADR that required it.
8. Whether to contribute changes upstream is Lee's decision. Upstream says issues are off and pull requests may not be reviewed.

## Consequences

- The rebrand (ADR-0006) and teams and roles (ADR-0008) touch many upstream files. They are the main divergence, and the reason to keep each as a single mechanical, well-tested sprint.
- At v0.1.1 no upstream file has been edited, and `DIVERGENCE.md` is empty. `tests/project-governance.test.mjs` requires that `docs/upstream/SYNC.md` and `DIVERGENCE.md` exist, and that both name the pinned commit.
- Each sync updates the pinned commit in `NOTICE.md`, `docs/upstream/BASELINE.md` and `docs/upstream/DIVERGENCE.md` together. The governance test fails if they disagree.
