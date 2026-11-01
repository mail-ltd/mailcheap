# ADR-0001: Process and delivery conventions

- Status: Accepted
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

This project is built by one developer with Claude as co-developer. The same working method has been used on SocialPoints and AnyProperty. It is recorded here so this project does not drift from it and so any session can pick it up cold.

## Decision

1. **ADRs before code.** A change that makes a design decision gets an ADR. The ADR must be Accepted before the code is written. Statuses are `Proposed`, `Accepted`, `Rejected` and `Superseded by ADR-NNNN`.
2. **BDD after ADRs, before implementation.** Behaviour is written as Gherkin features under `docs/bdd/` once the ADRs they cover are Accepted.
3. **Sprints.**
   - Scope for the sprint in progress is recorded in `docs/CURRENT_SPRINT.md`.
   - At close, an intended-versus-actual audit is written, the sprint is archived to `docs/sprints/<name>.md`, and `docs/CURRENT_SPRINT.md` is emptied.
   - A sprint may not close until a full build and test verification is recorded in its archive, stating what was run and what was not.
   - After each close, `docs/ROADMAP.md` loses the finished sprint from "Next (recommended sprints)" and gains a new proposed one.
4. **Every change ships with tests, a CHANGELOG entry and README updates** where behaviour or setup changed. Where a defect has a stateable invariant, write the check rather than the patch, and confirm the check fails on a real violation before trusting it.
5. **Deliverables.**
   - Always the full monorepo as a zip, never a patch or a zip of changed files.
   - Suitable for importing into git: no `.git`, no `node_modules`, no build output.
   - The filename uses semantic versioning, `<project>-vX.Y.Z.zip`. Names such as "fixed", "updated" or "patched" are never used.
   - Every deliverable gets a new version, bumped before the archive is cut, so no two deliverables share a name.
   - The next deliverable is built on the previous monorepo version, and other code copies are deleted first.
6. **Build manifests are not bumped** (`package.json` here, `pom.xml` in any Java service) unless Lee asks. The delivery version lives in the zip name, `CHANGELOG.md` and the docs.
7. **No claim of background work.** Work happens inside a turn, and anything not run is reported as not run.

## Consequences

- Foundation sprint F0 contains no product code: it is the baseline, this ADR set, and the governance docs.
- `tests/project-governance.test.mjs` enforces the parts of this process that can be checked mechanically (ADR numbering and status, the index, the CHANGELOG and NOTICE).
