# Changelog

Notable changes to AuraCheck. Dates are IST.

## 2026-09-09

- Card renderer rebuilt as a hand-drawn print: paper grain, halftone shading, a misregistered headline, a rubber stamp. No images; every mark is canvas code. The first design read as generic to early visitors, so it was replaced.
- Question rotation now draws five of 28 today-focused questions per check-in, with no repeats until the pool runs out.
- Three free cards a week, resetting Monday 00:00 IST.
- The owner can publish a reset code that refills the weekly limit for anyone holding it.
- A security review before launch produced fixes pinned by regression tests: truthful three-state code redemption, uniform corruption self-repair in quota storage, a storage layer that no longer falls into memory-only mode after one bad read, and a frame-breaker against clickjacking.
- Payments and Pro were dropped. The site is free-only.

## 2026-09-06

- First working version: five-question check-in, scoring engine, 12 card templates, canvas export at 1080x1920, Web Share with download fallback, PWA offline shell on GitHub Pages.
