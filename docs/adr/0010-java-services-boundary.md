# ADR-0010: Where Java services fit

- Status: Proposed
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

Lee's primary language is Java. The baseline is JavaScript on Node 22. Upstream's `AGENTS.md` says JavaScript, no TypeScript, and its rules and tests assume the sending path lives inside the Node app.

The sending path carries safeguards that must not be bypassed: consent and suppression, pacing, bounce and complaint limits, and one-click unsubscribe (see the "Security review" section of `AGENTS.md`). An automation engine that sends email must go through the same safeguards.

## Options

- **A. Everything in Node.** Features that touch sending or contacts (automations, templates, teams) are built in the existing app, with the same actions, scoping and tests. Least risk and least divergence.
- **B. Java services next to the app, talking only to its REST API.** Suitable for components that do not need to be inside the send path, such as reseller billing and invoicing, analytics and reporting, or scheduled maintenance. Keeps proprietary code possible (ADR-0003 point 4).
- **C. Java services that send or read the database directly.** Rejected: it would bypass the safeguards above and the account scoping, and would sit awkwardly with the AGPL.

## Proposed decision

Use A for anything that touches the send path, including automations. Consider B for components that can sit behind the public API, and decide per component in its own ADR. No Java is introduced in v0.1.0.

## Consequences

- Automations are built in Node, even though Java is Lee's stronger language. This is a deliberate trade for safety and for staying mergeable with upstream.
- Any Java service must call the Node app only through `/api/v1` with its own scoped API key.
- Before a proprietary Java service is built, a solicitor's opinion on the AGPL boundary is obtained (ADR-0003).
