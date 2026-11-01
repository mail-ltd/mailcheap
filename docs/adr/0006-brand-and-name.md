# ADR-0006: Product name and rebranding

- Status: Proposed
- Date: 2026-11-01
- Deciders: Lee Bolding (needs a name)

## Context

The AGPL covers the code, not the name. Running this under "MailCheap" would trade on someone else's brand next to their own hosted service, and `AGENTS.md` requires "MailCheap" in all display text. A count of the baseline found "MailCheap" (any case) 1,332 times across 280 files, in display text, tests, docs, email copy and identifiers such as `MAILCHEAP_CLOUD` and `LogoMailcheap`. Six days earlier it was 1,207 times across 254 files, so the number keeps growing as upstream writes new copy, and the rebrand is the largest single source of future merge conflicts.

"The Mail Company" is the working title of this project and is used only as a placeholder (zip names, docs).

## Decision needed

1. The product name, and the domain for the app and for each customer's shared sending subdomain.
2. Trademark clearance: a search of the UK IPO register and a domain check before the name is committed to code.

## Options for the code change (once a name is chosen)

- **A (recommended, combined with B). One brand constant** for display name, support addresses and URLs, used by all new code and by the few central places that print them. Internal identifiers (`MAILCHEAP_CLOUD`, file names) are left alone.
- **B (recommended, combined with A). A re-runnable rebrand script** (`scripts/rebrand.mjs`) that rewrites display copy and is run as the last step of every upstream sync (`docs/upstream/SYNC.md`), instead of a one-off replace whose conflicts come back at every merge. It must be idempotent, must skip identifiers, and its result is committed, so the deployed source is the source that is published.
- **C. One-off global search-and-replace including identifiers.** Complete, but every later upstream merge conflicts on every line upstream touches. Not recommended.

## Consequences

- Rebranding is its own sprint (R1) and is blocked on the name.
- Tests that assert on display text (`/MailCheap can't start/` in `tests/config.test.mjs` is one) must change together with it, and the brand constant should be covered by a guard test that forbids hard-coded display names.
- Upstream's marketing site is not part of the open source, so landing, pricing and legal pages are written fresh.
