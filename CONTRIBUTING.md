# Contributing to AuraCheck

Thanks for looking. A few things to know before you spend time on a change.

## Status

This is a live personal project, not an open-source product looking for co-maintainers. The repo is public so the site can be reviewed and so the work is visible, not because it's a community codebase.

## Before you write code

Open an issue first. Describe what you want to change and why. Unannounced PRs (especially large ones) will sit unreviewed or be closed — not out of rudeness, but because the owner reviews everything personally and surprise diffs don't fit that workflow.

## If you do submit something

- Vanilla JS only. No frameworks, no build steps, no new dependencies without a very good reason.
- Phone-first. The app targets 360px viewports; if your change only looks right on desktop, it's wrong.
- Tests with your change. The existing suites run with plain Node; a change to engine, quota, or store logic without a test will be sent back.
- The card renderer must stay image-free. Every mark is drawn in canvas code, deliberately.
- Keep the voice. The card copy and question bank have a specific register; "improvements" to the tone will be rejected unless the phrasing is genuinely better.

## Security

Found something exploitable? Open a private security advisory on this repo (Security tab, "Report a vulnerability") rather than a public issue. The site runs with no backend, but anything affecting users still counts.

## What won't be accepted

- Payment integrations, ad SDKs, or analytics of any kind.
- Accounts or login flows. The no-account design is a deliberate product decision, documented in DECISIONS.md.
- Redesigns of the card renderer. The current design is the result of a full anti-slop rework and is not up for grabs.
