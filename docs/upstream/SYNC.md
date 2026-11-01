# Syncing with upstream

The method is ADR-0009. Upstream is `marclou/mailcheap`. Do this weekly, and at once for security, authentication, suppression or deliverability fixes.

## One-time setup

Create the repository from a clone with full history, so upstream and this project share a merge base:

```bash
git clone https://github.com/marclou/mailcheap.git mailcompany
cd mailcompany
git remote rename origin upstream
git remote set-url --push upstream no_push        # a push to upstream now fails
git remote add origin https://github.com/mail-ltd/<repository>.git
git config rerere.enabled true                    # remember conflict resolutions
```

Then add this project's files on top of upstream's latest commit and commit them. Add only the files that are new in this project (`NOTICE.md`, `CHANGELOG.md`, `docs/` other than upstream's own `docs/logo*.svg` and `docs/screenshots/`, `.github/README.md`, `tests/project-governance.test.mjs`). Do not copy a whole tree over the clone: an older copy of upstream's files would undo upstream's newer ones.

Do not create the repository by importing a zip of the files. It would have no shared history with upstream, and the first merge would conflict on everything.

## Each sync

```bash
git fetch upstream
git switch main && git pull origin main
git switch -c sync/$(date +%F)
git merge upstream/main          # merge, never rebase
```

1. Resolve conflicts. Prefer upstream's version of a file unless this project's change is listed in `DIVERGENCE.md`.
2. Once it exists (sprint R1), run the rebrand script: `node scripts/rebrand.mjs`.
3. Run `npm ci`, `npm run lint`, `npm test` (needs `mongod` on the PATH) and `npm run build`. Record the results in `docs/CURRENT_SPRINT.md`. All must pass before the next step.
4. Update the pinned commit in `NOTICE.md`, `docs/upstream/BASELINE.md` and `docs/upstream/DIVERGENCE.md` to the new `upstream/main`, and re-check the capability audit in `BASELINE.md`.
5. Add a CHANGELOG entry. Merge `sync/<date>` into `main` and tag it `sync-<date>`.

## If something goes wrong

- Abort a merge in progress with `git merge --abort`.
- If a sync brings a regression, fix it on the sync branch, or leave that file as upstream's and list the problem in the sprint file. Do not revert upstream's change silently.
- If upstream changes its licence, stop and read `docs/adr/0003-agpl-compliance.md` before merging anything.
