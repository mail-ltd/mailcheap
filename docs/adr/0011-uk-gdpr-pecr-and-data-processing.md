# ADR-0011: UK GDPR, PECR and data-processing posture

- Status: Proposed
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

The service will hold other people's subscriber lists. Customers are the controllers of their subscribers' data and the platform is their processor. The platform is also a controller of its own customers' account and billing data. Marketing email to individuals in the UK is also governed by PECR (consent, and the soft opt-in for existing customers). This ADR lists what has to be decided and checked. It is not legal advice, and each item is confirmed with a solicitor before launch.

## Items to decide

1. **Legal entity.** Which company operates the service, and who signs the contracts.
2. **Documents.** Terms of service, privacy policy, acceptable use policy (spam and purchased lists forbidden, enforced by the existing abuse controls), and a data processing agreement with sub-processors listed.
3. **Sub-processors.** At least: AWS (SES, and S3/CloudFront if images are used), MongoDB Atlas, Upstash (QStash, and Redis if used), the host (Vercel or other), Stripe, and Resend if used for system email.
4. **Data location.** Region for MongoDB and SES (a UK or EU region is an advantage for the UK/EU niche, if chosen in ADR-0007).
5. **Regulator registration.** Whether the data protection fee and ICO registration apply to the operating entity.
6. **Subscriber rights and retention.** Upstream already implements account and contact deletion, a never-email list that keeps only a keyed hash, and consent-led sends; the retention periods and the process for subject-access requests need writing down.
7. **Abuse handling.** A named contact and a response time for abuse and complaint reports.

## Consequences

- Marketing claims about compliance are not made until the items above are done.
- The legal pages are part of the launch checklist on the roadmap and are written fresh, because upstream's legal pages are not part of the open source.
