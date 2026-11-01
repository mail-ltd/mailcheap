# ADR-0005: Repository layout

- Status: Proposed
- Date: 2026-11-01
- Revised: 2026-11-01 (v0.1.1: upstream's root README stays untouched; ours moves to `.github/`)
- Deciders: Lee Bolding (to confirm)

## Context

The monorepo is the default structure for deliverables. The baseline is a single Next.js app with its files at the repository root, and it receives upstream changes often (302 files changed in six days, ADR-0002). Moving it into `apps/web/` would turn every upstream change into a rename plus an edit and make merges noisy. Any file this project edits that upstream also edits is a future conflict. The project may later gain separate services, for example in Java (ADR-0010).

## Options

- **A (recommended). Leave the upstream tree exactly where and as it is, and add beside it.** New material goes in places upstream does not use:
  - `docs/adr/`, `docs/sprints/`, `docs/bdd/`, `docs/upstream/`, `docs/CURRENT_SPRINT.md`, `docs/ROADMAP.md`
  - `CHANGELOG.md`, `NOTICE.md`
  - `.github/README.md`, this project's README. GitHub shows `.github/README.md` in preference to the root `README.md`, so upstream's own README stays untouched at the root and upstream's frequent edits to it never conflict
  - `.env.mailcompany.example` for this project's own settings, instead of editing upstream's `.env.example`
  - `services/<name>/` for any future separate service
- **B. Move the Node app to `apps/web/`.** Cleaner for a many-service monorepo, but upstream merges become costly.

## Decision

Option A is used in v0.1.1. Switching to B later is a mechanical move and can be done in its own sprint if several services appear.

## Consequences

- Upstream's `README.md`, `AGENTS.md`, `SECURITY.md`, `LICENSE`, `package.json`, `package-lock.json` and `.env.example` are not edited without an entry in `docs/upstream/DIVERGENCE.md` and a reason.
- `tests/project-governance.test.mjs` fails if `.github/README.md` is missing or if upstream's README has been moved aside again (`docs/upstream/README.md` must not exist).
- Files this project adds should avoid names upstream could add. If a name collides, upstream's file is kept and ours is renamed.
- Version 0.1.0 had moved upstream's README to `docs/upstream/README.md`. That would have conflicted on every sync, and is reversed.
