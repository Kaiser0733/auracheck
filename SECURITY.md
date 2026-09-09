# Reporting a security issue

If you found something exploitable in AuraCheck, thank you for looking before acting on it.

## How to report

Use GitHub's private reporting: the **Security** tab on this repo, then **Report a vulnerability**. That reaches the maintainer directly and keeps the details private while they're being fixed.

If private reporting isn't available for some reason, open a regular issue that says only "security contact needed" and nothing else; the maintainer will follow up.

## What to include

- The page or file involved (URL, or file and line if you've read the code)
- Steps to reproduce, or a small script if you have one
- What you observed vs what you expected

## What counts

The app runs entirely client-side with no backend, no accounts, and no stored personal data beyond a visitor's own card history in their own browser. That limits the blast radius of most things, but input handling, storage corruption, service-worker behavior, and anything that could mislead a user still matter.

## What doesn't

- Bypassing the free weekly card limit by editing localStorage. This is known and accepted: the limit is a speed bump, not a vault, and it's documented as such in the README.
- Extracting reset codes from the shipped JavaScript. They're published publicly by design.

## Response time

This is a solo-maintained project. Expect a reply within a few days. If you don't hear back in two weeks, a polite bump on the issue is fine.

Please don't test anything destructive against the live site. Everything in this repo runs locally with `python3 -m http.server`, which is where findings should be reproduced.
