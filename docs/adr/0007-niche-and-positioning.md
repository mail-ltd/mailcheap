# ADR-0007: Niche and positioning

- Status: Proposed
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

The goal is a good side income, not a venture-scale business. The same code runs as MailCheap Cloud from $19 a month, run by its author with an existing audience. A generic cheaper clone is not a sensible way to compete. The edge has to be a group of customers who are not well served, reached cheaply, and a feature set and service shaped to them.

The four capabilities Lee asked for are teams and roles, automations, segments and templates, and white-label or reseller. Segments already exist in the baseline; the rest do not.

## Candidate niches

| Niche | Why it could work | Features it pulls in first | Main risk |
|---|---|---|---|
| UK and EU small businesses wanting privacy-first, compliant email | UK GDPR and PECR defaults, GBP billing and VAT, UK/EU data location | Compliance defaults, templates, support | Crowded; compliance claims carry legal weight |
| Agencies and freelancers running newsletters for clients | Fits the chosen features: client workspaces, roles, white-label | Teams and roles, partner-to-client accounts, white-label | More complex to build; reseller customers also receive the AGPL source |
| Mailchimp refugees (price rises, list-size billing) | Imports already exist; "pay for emails sent" message | Templates, automations (welcome series) | Competes head-on with the upstream's own positioning |
| A vertical (clubs, charities, local venues, a specific profession) | Easy to reach, specific templates and automations | Templates, segments, simple automations | Needs a real route to those customers |

## Decision needed

Pick one niche to build and sell to first, and name the first channel for reaching its customers (for example a community Lee already belongs to, or a search term worth ranking for). The roadmap order of features follows from this choice.

## Consequences

- Until this is decided, sprints after the foundation are proposals only.
- Feature order is not fixed by this ADR, only informed by it.
