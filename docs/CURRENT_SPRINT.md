# Current sprint: F0, foundation

- Status: **OPEN** (not closed: full build verification is not yet recorded)
- Opened: 2026-11-01
- Delivery version: v0.1.1

## Scope

1. Pin the upstream baseline and record what it does and does not provide (`docs/upstream/BASELINE.md`).
2. Write the ADRs that the first product sprints depend on (ADR-0001 to ADR-0011).
3. Put the governance in place: README, CHANGELOG, NOTICE, sprint and roadmap documents, the sync runbook, and a test that checks the mechanical parts.
4. **No upstream code is changed.** Nothing in upstream's source has been edited. This project only adds files.

## Intended versus actual

| Intended | Actual |
|---|---|
| Baseline pinned and audited | Done, twice. v0.1.0 pinned the fork's older commit and wrongly treated the fork as upstream; v0.1.1 pins `marclou/mailcheap@c13cbb5` and re-did the audit. Segments exist in the baseline, which corrects an earlier statement in the planning conversation that they did not |
| ADRs 0001 to 0004 Accepted, from decisions Lee made | Done. ADR-0002 revised in v0.1.1 for the correct upstream |
| ADRs 0005 to 0011 written as Proposed, with options | Done. ADR-0005, 0006, 0009 revised in v0.1.1. They need Lee's decisions, listed below |
| Governance test | Done: `tests/project-governance.test.mjs` |
| Baseline fully verified (install, lint, tests, build) | **Partly.** See the record below. This is the reason the sprint stays open |
| BDD feature files | Deferred by process: BDD follows Accepted ADRs, and the ADRs that describe features are still Proposed |

## Verification record

Run on 2026-11-01 in this project's sandbox, on `marclou/mailcheap@c13cbb5`. Full detail in `docs/upstream/BASELINE.md`.

- `npm ci`: passed.
- `npm run lint`: passed.
- Upstream tests: 83 of 157 files passed (617 tests, none failing). **74 files not run** because they need a local `mongod`, which the sandbox cannot install. No file failed for another reason.
- `npm run build`: **not verified**: Google Fonts could not be fetched from the sandbox.
- `tests/project-governance.test.mjs` (this project's): 11 of 11 passed, and `npm run lint` passed with it in place. Each check was shown to fail on a deliberate violation (v0.1.0's six, and for v0.1.1: a pin that disagrees between records, upstream's README moved aside again, `.github/README.md` missing, a sprint file naming an older version, and `SYNC.md` missing) and the files were restored afterwards.
- The tree differs from upstream's `c13cbb5` only by added files; no upstream file is edited (`git diff upstream/main --stat` on `README.md`, `package.json`, `.env.example`, `AGENTS.md` and `LICENSE` is empty).

### To close this sprint

On a machine with MongoDB and internet access, run `npm ci && npm test && npm run lint && npm run build` on this version and record the results here, then archive this file to `docs/sprints/F0-foundation.md` and empty it.

## Decisions needed from Lee

| ADR | Question |
|---|---|
| 0005 | Approve option A as revised: upstream's tree and README untouched, ours added beside, README in `.github/`? |
| 0006 | What is the product name and domain? Approve a brand constant plus a re-runnable rebrand script? |
| 0007 | Which niche first, and by what channel will you reach its customers? |
| 0008 | Approve membership inside the account (option A) as the first teams step? |
| 0009 | Approve the sync method as revised (upstream `marclou/mailcheap`, `sync/<date>` branches, merge not rebase, weekly)? |
| 0010 | Approve Node for anything on the send path, with Java services only behind the public API? |
| 0011 | Who is the operating legal entity? The other items are for a solicitor |
