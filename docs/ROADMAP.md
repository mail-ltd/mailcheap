# Roadmap

Sprints are proposals until their ADRs are Accepted. The order after F0 depends on the niche chosen in ADR-0007.

## Next (recommended sprints)

| Sprint | Goal | Needs first |
|---|---|---|
| F0 close-out | Run the full verification on a machine with MongoDB and internet access and record it | Lee runs it |
| R1 | Rebrand: one brand constant, display text, emails, docs, domain | ADR-0006 Accepted (a name) |
| T1 | Team members and roles: `Membership`, invitations, role checks in `defineAction`, isolation tests | ADR-0008 Accepted; repository-wide search for `ownerId` assumptions |
| U1 | First upstream sync on a `sync/<date>` branch, then weekly (`docs/upstream/SYNC.md`), `DIVERGENCE.md` kept honest. Needs the real repository created from a full-history clone | ADR-0009 Accepted |
| A1 | Automations: welcome series first, built on the existing send path | ADR-0007, ADR-0010 |
| TPL1 | Template library: saved templates and a starter set for the chosen niche | ADR-0007 |
| W1 | Partner-to-client accounts and white-label | T1; its own ADR |
| L1 | Legal pages, data processing agreement, sub-processor list, abuse process | ADR-0011 |

## Launch blockers

Nothing is shown to anyone but Lee until all of these are done.

1. A product name and domain, cleared (ADR-0006).
2. A public repository for the deployed version, with `SOURCE_URL` in `lib/site.js` pointing to it. It currently points to upstream (ADR-0003).
3. AWS SES production access in a dedicated AWS account (ADR-0004).
4. Terms, privacy policy, acceptable use policy and a data processing agreement (ADR-0011).
5. Stripe products and prices created with the lookup keys upstream expects, and the webhook configured. Setup is in upstream's `README.md` at the repository root.
6. A full green run of the test suite and build on the version being deployed, recorded in its sprint archive.
7. A solicitor's opinion on the AGPL boundary, if any proprietary service is planned (ADR-0010).

## In progress

- F0: foundation, v0.1.1. Open until the full verification is recorded (see `docs/CURRENT_SPRINT.md`).

## Done

- None yet.
