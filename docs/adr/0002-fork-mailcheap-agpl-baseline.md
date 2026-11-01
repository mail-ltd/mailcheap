# ADR-0002: Fork the current AGPL-3.0 MailCheap, with marclou/mailcheap as upstream

- Status: Accepted
- Date: 2026-11-01
- Revised: 2026-11-01 (v0.1.1: corrected which repository is upstream and re-pinned the baseline)
- Deciders: Lee Bolding

## Context

The goal is a multi-tenant, self-service email marketing SaaS, similar to Mailchimp, as a side income. MailCheap is an open-source newsletter app by Marc Lou. Three starting points were considered:

| Option | What it gives | What it costs |
|---|---|---|
| A. Fork the MIT-licensed release (`marclou/mailcheap@67d13b0`) | Permissive licence; closed-source SaaS is possible | Third-party descriptions say it is single-admin with no tenancy, billing or per-customer isolation, so all of that, and the abuse protection around it, would be built from scratch. Upstream improvements could not be merged back without taking on AGPL |
| B. Rebuild in Java using MailCheap as a reference | Own stack and licence | The longest route; the hard parts (tenancy, SES tenant provisioning, deliverability guards) are re-done |
| C. **Fork the current AGPL-3.0 version** | Tenancy, billing, SES tenants, REST API, MCP, imports, segments, deliverability guards and a test suite already exist | Source of the modified version must be offered to its users (ADR-0003); the code cannot be kept secret |

Lee chose C, on the basis that a side hustle's edge is niche, service and distribution rather than secrecy of the code.

## Decision

Fork the current AGPL-3.0 version.

**Repositories**

| Role | Repository |
|---|---|
| `upstream` (the original, where the code is developed) | https://github.com/marclou/mailcheap |
| `origin` (this project's own GitHub fork, where our work is pushed) | https://github.com/mail-ltd/mailcheap |

Version 0.1.0 wrongly treated the fork as the upstream and pinned the fork's commit `42ca6fc` (2026-10-26). The fork had not yet caught up with the original. Version 0.1.1 corrects this.

**Baseline** (v0.1.1): `marclou/mailcheap` commit `c13cbb575ff75c1c32725935658265cf2c632a0b` (2026-11-01 09:24 UTC), whose message reads "Sync from mailcheap-cloud dd62df8". Upstream appears to publish snapshots synced from its private cloud repository, so its history can arrive in large steps. Between `42ca6fc` and `c13cbb5`, six days apart, 302 files changed (13,887 lines added, 1,874 removed).

The baseline is recorded in `docs/upstream/BASELINE.md`, including what it provides and what it does not.

## Consequences

- Stack: Next.js 16 (App Router, JavaScript), React 19, MongoDB through Mongoose, Better Auth, Stripe, Upstash QStash, Amazon SES. Node 22 or later. Upstream's `AGENTS.md` rules and code style still apply to the Node app.
- Capability audit against the features Lee wants (re-checked on `c13cbb5`): segments, custom fields and tags **exist**; teams and roles, automations, a template library, A/B tests and white-label or reseller tenancy **do not** (an account has exactly one owner user: `Account.ownerId` is unique). See ADR-0008 for teams and the roadmap for the rest.
- A competing hosted service, MailCheap Cloud, runs the same code. The product must therefore be differentiated by niche and service (ADR-0007), not by the code.
- How upstream is tracked is ADR-0009.
