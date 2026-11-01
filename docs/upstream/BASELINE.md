# Upstream baseline

## Pin

| | |
|---|---|
| Upstream repository | https://github.com/marclou/mailcheap |
| Commit | `c13cbb575ff75c1c32725935658265cf2c632a0b` |
| Commit date | 2026-11-01 09:24 UTC |
| Commit message | "Sync from mailcheap-cloud dd62df8" |
| This project's fork | https://github.com/mail-ltd/mailcheap (same commit when checked on 2026-11-01) |
| Licence | GNU AGPL-3.0 (`LICENSE`, `package.json`), copyright Marc Lou |
| Taken | 2026-11-01, as a depth-1 fetch, so upstream history before this commit is not in this archive. See `docs/upstream/SYNC.md` for how to keep full history in the real repository |
| Stack | Next.js 16 (App Router, JavaScript, no TypeScript), React 19, MongoDB via Mongoose, Better Auth, Stripe, Upstash QStash and Redis, Amazon SES (and PostShiba), Tiptap editor, Node 22 or later |
| Size | 157 test files under `tests/` (plus `helpers/`, `setup/` and `stubs/`); 26 model files in `models/` |

v0.1.0 was pinned to `42ca6fc4fa90f04fd44e7b619bb7b48781e36f52` (2026-10-26), taken from the fork before it had caught up. Between that commit and this one, 302 files changed (13,887 lines added, 1,874 removed). It is superseded by this pin.

## Capability audit

What the baseline has and has not got, from reading its code on 2026-11-01 at the commit above. "Not found" means a search of `models/`, `lib/` and `app/` found nothing, not that it was proved absent by a test.

| Capability | Baseline |
|---|---|
| Open sign-up and per-account isolation | Present (`MAILCHEAP_CLOUD=true`; `scoped()` in `lib/account-scope.js` plus a Mongoose plugin that refuses unscoped customer queries) |
| Billing and limits | Present: six Stripe plans, usage limits, admin-granted free plans (`lib/plans.js`, `lib/billing.js`) |
| Sending isolation per customer | Present for SES (tenant and configuration set per account) and for PostShiba |
| Custom sending domains, DKIM and DMARC checks | Present |
| Campaigns, scheduling, staged sending, open and click tracking | Present |
| Contacts: tags, custom fields, imports from other platforms | Present |
| **Segments** | **Present** (`models/Segment.js`, `lib/segments.js`: match all or any of up to 10 conditions on built-in or custom fields) |
| Public website and archive per newsletter | Present |
| REST API, MCP server with OAuth | Present |
| Deliverability guards, never-email list, bounce and complaint limits | Present. At this commit (`lib/config.js`): a send pauses past 2.5% hard bounces (at least 5) or 0.08% complaints (at least 2); the account is blocked past 5% (at least 10) or 0.3% (at least 3) |
| Admin console and alerts | Present |
| **Team members and roles** | Not found. `Account.ownerId` is required and unique, with the comment "One user per account at launch" |
| **Automations (welcome series, drips, triggers)** | Not found. A one-off welcome email exists |
| **Template library** | Not found. There is a block editor, but no saved-template model |
| **A/B tests** | Not found |
| **White-label or reseller** | Not found. There is no partner-to-client account relationship |

## Verification record (2026-11-01, this project's sandbox)

| Check | Result |
|---|---|
| `npm ci` | Passed: 853 packages |
| `npm run lint` | Passed, no findings |
| Tests, run one file at a time, 8 in parallel | 83 of 157 upstream test files passed, with 617 tests passing and none failing. The other 74 files did not run: each needs a local `mongod`, which cannot be installed in the sandbox (no package; the MongoDB download host is blocked by the network allowlist). They fail with "Integration tests need mongod on the PATH or in MONGOD_PATH". They are **not run, not failed**. No file failed for any other reason |
| `npm run build` | **Not verified.** It stopped because `next/font` could not fetch Geist, Geist Mono and Newsreader from `fonts.googleapis.com`; the sandbox cannot reach that host. This is a network restriction, not a defect found in the code |

### To complete the verification (on a machine with MongoDB and internet access)

```bash
npm ci
npm test       # every test file, including this project's; needs mongod on the PATH
npm run lint
npm run build
```

Record the result in `docs/CURRENT_SPRINT.md` before sprint F0 is closed.

## Notes

- Upstream says issues are off, self-hosters get no support, and pull requests may not be reviewed. Treat upstream as a source of changes, not as a partner.
- Upstream's own README is the unmodified `README.md` at the root and holds the self-hosting guide.
