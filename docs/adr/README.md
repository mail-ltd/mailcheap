# Architecture decision records

An ADR is written and Accepted before the code it covers (ADR-0001). Statuses: `Proposed`, `Accepted`, `Rejected`, `Superseded by ADR-NNNN`.

| ADR | Title | Status |
|---|---|---|
| [0001](0001-process-and-delivery-conventions.md) | Process and delivery conventions | Accepted |
| [0002](0002-fork-mailcheap-agpl-baseline.md) | Fork the current AGPL-3.0 MailCheap, with marclou/mailcheap as upstream | Accepted |
| [0003](0003-agpl-compliance.md) | AGPL-3.0 compliance | Accepted |
| [0004](0004-amazon-ses-sending-provider.md) | Amazon SES is the sending provider | Accepted |
| [0005](0005-repository-layout.md) | Repository layout | Proposed |
| [0006](0006-brand-and-name.md) | Product name and rebranding | Proposed |
| [0007](0007-niche-and-positioning.md) | Niche and positioning | Proposed |
| [0008](0008-team-members-and-roles.md) | Team members and roles | Proposed |
| [0009](0009-upstream-tracking.md) | Tracking upstream | Proposed |
| [0010](0010-java-services-boundary.md) | Where Java services fit | Proposed |
| [0011](0011-uk-gdpr-pecr-and-data-processing.md) | UK GDPR, PECR and data-processing posture | Proposed |

`tests/project-governance.test.mjs` fails if an ADR file is missing from this table or its status here differs from the status in the file.
