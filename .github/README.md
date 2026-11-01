# The Mail Company

A multi-tenant, self-service email marketing platform in the style of Mailchimp, built as a modified fork of the open-source newsletter app [MailCheap](https://github.com/marclou/mailcheap). "The Mail Company" is a working title: the product name is still to be chosen (ADR-0006).

**Status: v0.1.1, foundation.** This release contains the pinned upstream baseline, the architecture decision records and the project governance. No upstream code has been changed yet, by design: ADRs come before code.

GitHub shows this file in place of the repository's root `README.md`. The root `README.md` is upstream's own README, unmodified, and holds the self-hosting guide and the environment variables.

## What the baseline already provides

Open sign-up, per-account tenant isolation, Stripe plans and limits, Amazon SES tenants per customer, custom sending domains, contact import from other platforms, segments, tags and custom fields, a web archive per newsletter, deliverability guards (pacing, list cleanup, bounce and complaint limits), a REST API and an MCP server, and an admin console. Details and the full gap list are in [`docs/upstream/BASELINE.md`](../docs/upstream/BASELINE.md).

## What this project adds (planned)

Team members and roles, automations, a template library, and white-label or reseller tenancy, in an order set by the chosen niche. See [`docs/ROADMAP.md`](../docs/ROADMAP.md).

## Documents

| Document | Purpose |
|---|---|
| [`docs/adr/`](../docs/adr/README.md) | Architecture decisions. Accepted before code is written |
| [`docs/CURRENT_SPRINT.md`](../docs/CURRENT_SPRINT.md) | Scope and verification record of the sprint in progress |
| [`docs/ROADMAP.md`](../docs/ROADMAP.md) | Recommended next sprints and launch blockers |
| [`docs/sprints/`](../docs/sprints) | Archive of closed sprints |
| [`docs/upstream/`](../docs/upstream) | The pinned baseline, the list of upstream files this project has changed, and the sync runbook ([`SYNC.md`](../docs/upstream/SYNC.md)) |
| [`CHANGELOG.md`](../CHANGELOG.md) | What changed in each delivered version |
| [`NOTICE.md`](../NOTICE.md) | Attribution and licence notice |
| [`AGENTS.md`](../AGENTS.md), [`SECURITY.md`](../SECURITY.md) | Upstream's code rules and security notes. They still apply to the Node app |

## Developing

Requirements: Node.js 22 or later, and MongoDB. The integration tests start a throwaway `mongod` per test file, so `mongod` must be on the `PATH` (or set `MONGOD_PATH`).

```bash
npm ci
cp .env.example .env.local   # set MONGODB_URI, BETTER_AUTH_SECRET, SUPPRESSION_HASH_KEY, ADMIN_EMAILS
npm run dev

npm test       # unit and integration tests, including tests/project-governance.test.mjs
npm run lint
npm run build
```

Sending stays off unless `SENDING_ENABLED=true`. Cloud mode (open sign-up, plans, Stripe) is `MAILCHEAP_CLOUD=true`; the variable keeps its upstream name for now (ADR-0006).

## Keeping up with upstream

Upstream is `marclou/mailcheap` and moves quickly. This project's work lives on `main`, and upstream is merged in on a short-lived `sync/<date>` branch, weekly. The runbook is [`docs/upstream/SYNC.md`](../docs/upstream/SYNC.md) and the method is [ADR-0009](../docs/adr/0009-upstream-tracking.md).

## Process

ADRs before code, BDD after ADRs, sprints with an intended-versus-actual audit, and full-monorepo versioned zips. See [ADR-0001](../docs/adr/0001-process-and-delivery-conventions.md).

## Licence

GNU Affero General Public License v3.0, the same as the original. See [`LICENSE`](../LICENSE) and [`NOTICE.md`](../NOTICE.md). If this software is run for other people, they must be offered its source: see [ADR-0003](../docs/adr/0003-agpl-compliance.md).
