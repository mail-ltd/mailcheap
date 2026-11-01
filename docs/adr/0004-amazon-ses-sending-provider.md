# ADR-0004: Amazon SES is the sending provider

- Status: Accepted
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

The baseline supports two email providers behind `lib/email-provider`: Amazon SES (`ses.js`) and PostShiba (`postshiba.js`). Both give each customer account its own tenant with its own domains, suppression list and pause switch. PostShiba is invite-only with manual production approval. A self-run mail server was also considered and rejected for a side project because deliverability work would dominate.

## Decision

Amazon SES is the only supported provider for this product.

- The PostShiba code stays in the tree and is neither extended nor tested by this project. Leaving it alone keeps upstream merges clean (ADR-0009).
- SES is set up in a dedicated AWS account, as upstream's setup guide advises, because SES reputation and limits are per AWS account.
- Per-customer isolation uses SES tenants, as implemented upstream in `lib/email-provider/ses.js`.

## Consequences

- One shared AWS account carries the reputation of every customer. One abusive customer can put the whole service at risk, so upstream's automatic pause and block thresholds are kept and not weakened. At the baseline (`lib/config.js`) a send pauses past 2.5% hard bounces (at least 5 bounces) or 0.08% complaints (at least 2), and the account is blocked past 5% (at least 10) or 0.3% (at least 3). Upstream has changed these numbers before (the earlier baseline said 2%), so the values are read from the code at each sync, not copied here.
- Production access must be granted by AWS before real sending. This is a launch blocker on the roadmap.
- The region choice affects where customer email data is processed and is decided in ADR-0011.
