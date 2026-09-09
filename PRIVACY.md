# AuraCheck privacy notice

Last updated: 2026-09-09

AuraCheck is a static website. It has no backend, no database, and no analytics. This notice explains what that means in practice.

## What the app stores

Everything the app remembers lives in your own browser's localStorage:

- Your answers to the current unfinished check-in (so you can resume it)
- Your last 20 card results (so you can reopen them)
- Your weekly card count
- Which reset codes you've redeemed

None of this is sent anywhere. There is no server to send it to. You can delete all of it at any time by clearing site data in your browser settings.

## What the app does not do

- No accounts, no email addresses, no passwords.
- No cookies beyond what the browser itself uses for normal site operation.
- No analytics, no trackers, no advertising, no third-party scripts of any kind. The site loads its own files and nothing else.
- No payment collection. The site is free; there is no checkout.

## Card exports

Cards you download or share are plain PNG images generated in your browser. They contain your name (if you entered one), your result, and two of your answers. Check a card before posting it publicly.

## Offline use

After your first visit, the site can work without a connection because a service worker caches its files inside your browser. The cache contains only the app's own files.

## Contact

Questions about this notice can be raised through the repository's issue tracker.
