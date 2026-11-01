# Changelog

All notable changes to this project. Versions are delivery versions (the zip name); `package.json` keeps upstream's version number untouched (ADR-0001). Format follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [0.1.1] - 2026-11-01

Corrections to v0.1.0 (sprint F0, still open). No upstream source file has been edited.

### Changed

- Upstream is `marclou/mailcheap`, not its fork `mail-ltd/mailcheap`, which is this project's own fork and `origin` (ADR-0002, ADR-0009).
- Baseline re-pinned from `42ca6fc` (2026-10-26, taken from the fork before it had caught up) to `marclou/mailcheap@c13cbb575ff75c1c32725935658265cf2c632a0b` (2026-11-01). 302 files changed between the two. The capability audit, the test and build verification, and the counts were re-done on the new commit (157 test files, 26 model files, 1,332 "MailCheap" strings in 280 files).
- Upstream's root `README.md` is no longer moved. It stays untouched, and this project's README is `.github/README.md`, which GitHub shows in preference. This avoids a merge conflict on every sync (ADR-0005).
- ADR-0004: the SES pause and block thresholds now follow the baseline (a send pauses past 2.5% hard bounces; v0.1.0 said 2%).
- ADR-0006: rebrand method is a brand constant plus a re-runnable rebrand script, not a one-off replace.
- ADR-0009: sync on a `sync/<date>` branch, merge not rebase, weekly cadence (v0.1.0 said monthly), full-history clone.
- `NOTICE.md`, `docs/upstream/BASELINE.md`, `docs/upstream/DIVERGENCE.md` follow the new pin.

### Added

- `docs/upstream/SYNC.md`: the one-time repository setup and the per-sync runbook.
- `.github/README.md`.
- Governance test checks: the three pin records agree; `.github/README.md` and `SYNC.md` exist; upstream's README is not moved aside; the CHANGELOG's newest version matches the sprint document.

### Removed

- `docs/upstream/README.md` (v0.1.0's moved copy of upstream's README).

## [0.1.0] - 2026-11-01

Foundation release (sprint F0). Superseded by 0.1.1. No upstream source file has been edited.

### Added

- Baseline: `mail-ltd/mailcheap` at commit `42ca6fc4fa90f04fd44e7b619bb7b48781e36f52` (2026-10-26), AGPL-3.0, with its test suite. Recorded in `docs/upstream/BASELINE.md`.
- ADR-0001 to ADR-0004 (Accepted): process and delivery conventions, the AGPL fork baseline, AGPL compliance, Amazon SES as the sending provider.
- ADR-0005 to ADR-0011 (Proposed): repository layout, product name, niche, team members and roles, upstream tracking, the Java boundary, and UK GDPR/PECR posture.
- `docs/CURRENT_SPRINT.md`, `docs/ROADMAP.md`, `docs/sprints/`, `docs/bdd/`, `docs/upstream/DIVERGENCE.md`.
- `NOTICE.md` with upstream attribution.
- `tests/project-governance.test.mjs`: checks the licence and notice, ADR numbering, statuses and index, the CHANGELOG, and the baseline record.

### Changed

- Upstream's `README.md` moved to `docs/upstream/README.md`, and a new `README.md` describes this project. Content of upstream's file is unchanged.
