# Changelog

Notable changes to AuraCheck. Dates are IST.

## 2026-09-09

- Card renderer rebuilt as a hand-drawn print (paper grain, halftone shading, misregistered headline, rubber stamp). No images; every mark is canvas code. This replaced a design that early visitors read as "AI slop."
- Question rotation: 28 today-focused questions, five drawn per check-in, no repeats until the pool is exhausted.
- Weekly quota: three free cards, reset Monday 00:00 IST.
- Reset codes: owner can publish a code that refills the weekly limit for anyone who has one.
- Security review (external + self-audit) before launch. Fixes shipped from it: truthful three-state code redemption, uniform corruption self-repair in quota storage, storage layer no longer latches into memory-only mode after one bad read, frame-breaker against clickjacking. Regression tests pin all of it.
- Payment and Pro plans removed. The site is free-only.

## 2026-09-06

- First working version: five-question check-in, scoring engine, 12 card templates, canvas export at 1080x1920, Web Share with download fallback, PWA offline shell on GitHub Pages.
