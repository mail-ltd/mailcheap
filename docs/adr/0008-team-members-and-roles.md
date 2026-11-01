# ADR-0008: Team members and roles

- Status: Proposed
- Date: 2026-11-01
- Deciders: Lee Bolding

## Context

In the baseline an account has exactly one user. `models/Account.js` declares `ownerId` as required and unique, with the comment "One user per account at launch". Tenant isolation works through `scoped(account, filter)` (`lib/account-scope.js`) plus a Mongoose plugin that refuses customer queries without an account. `requireAccount()` serves pages and server actions, and `authenticateRequest()` serves the REST API and MCP. Every customer action is one `defineAction` run through `runAction`, and `tests/parity.test.mjs` fails if an action is missing from the REST API, MCP, OpenAPI document or docs.

Teams and roles are needed for the agency niche (ADR-0007) and are a common reason Mailchimp-style customers ask for a higher plan.

## Options

- **A (recommended first step). Membership inside the account.** The account stays the tenant boundary. A new `Membership` records `{ accountId, userId, role }`. A user may belong to several accounts and picks an active one. Roles start as `owner`, `admin`, `editor`, `viewer`. Each `defineAction` declares the minimum role it needs.
- **B. Partner-to-client hierarchy.** An agency account manages many client accounts, each its own tenant with its own sending reputation and billing. Needed for white-label and reseller, and a later extension of A. A separate ADR will cover it.
- **C. Several unrelated accounts per login with a switcher, no roles.** Cheapest, but does not meet "teams".

## Proposed decision

Build A first. The permission model in PHP-style pseudocode, to show the shape rather than the implementation:

```php
function requireAccount(Request $req): AccountContext {
    $user = $req->session()->user();
    $membership = Membership::find($user->id, $req->activeAccountId());
    if (!$membership) {
        throw new Forbidden();               // not a member of this account
    }
    return new AccountContext($membership->account(), $membership->role());
}

function runAction(Action $action, AccountContext $ctx, array $input) {
    if (!$action->minRole()->isSatisfiedBy($ctx->role())) {
        throw new Forbidden();               // role too low for this action
    }
    return $action->handle(scoped($ctx->account(), $input));  // scoping unchanged
}
```

## Consequences

- The `ownerId`-is-unique assumption appears throughout the baseline (billing, onboarding, deletion, admin). A repository-wide search is the first task of the sprint, and results are recorded before any code changes.
- API keys and OAuth grants belong to an account and need a role of their own; the least-privilege default for an existing key is its current behaviour (full access).
- Billing stays per account. Whether seats are limited or charged for is a pricing decision, not part of this ADR.
- Every new action must satisfy the parity test.
- Isolation tests must prove a member of account X cannot read or write account Y's data by any route (page, server action, REST, MCP).
