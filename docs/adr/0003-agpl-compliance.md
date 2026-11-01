# ADR-0003: AGPL-3.0 compliance

- Status: Accepted
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

The baseline is licensed AGPL-3.0 (`LICENSE`, `package.json` `"license": "AGPL-3.0-only"`), copyright Marc Lou. If a modified version is run for other people, the AGPL requires offering those users the corresponding source of that version. The app already carries a "Source code" link, driven by `SOURCE_URL` in `lib/site.js`. Today it points at `https://github.com/marclou/mailcheap`.

This ADR records the engineering rules. It is not legal advice.

## Decision

1. This project is published under AGPL-3.0 and stays that way. All new code in this repository is AGPL-3.0.
2. `LICENSE` is never edited. Upstream copyright notices are never removed. `NOTICE.md` records the origin, the pinned baseline commit and the fact that this is a modified version.
3. **Before anyone other than Lee uses a hosted instance, `SOURCE_URL` must point to the public repository of the version that is deployed.** Each production deployment is a tagged commit in that repository, so the corresponding source is retrievable.
4. No proprietary module is linked into or loaded by the Node app process. Anything that must stay proprietary is a separate program that talks to the app only over its public REST API (see ADR-0010).
5. Secrets, customer data and personal data are never committed (upstream's own rule in `AGENTS.md`).
6. Branding: the AGPL grants no trademark rights. The product is rebranded (ADR-0006) and does not present itself as MailCheap.

## Consequences

- The public repository must exist before launch. This is a launch blocker on the roadmap. The project's GitHub fork (`mail-ltd/mailcheap`) is public, because a GitHub fork of a public repository cannot be made private. Work that must stay private before launch lives in a separate private repository that has the same `upstream` remote.
- Whether a separate Java service falls outside the AGPL's reach is a legal question, not an engineering one. A short solicitor's opinion is requested before any proprietary service is built (ADR-0010).
- Deployments are reproducible from tags, which is also good practice for rollback.
