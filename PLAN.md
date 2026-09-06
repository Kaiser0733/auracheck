# AuraCheck PWA Implementation Plan

> **Goal:** Build "AuraCheck" (working name) — an offline-first PWA that generates viral, shareable Gen Z identity cards (Wrapped-style personality reports), with a free tier (3 cards/week, watermarked) and Pro unlock (₹99/month) — hosted free on GitHub Pages, zero API, zero server, zero runtime cost.

**Architecture:** Single-page vanilla HTML/CSS/JS app (no framework — phone CPU friendly, no build step). Cards are quiz → deterministic engine → canvas-rendered 1080×1920 PNG. State (quota, Pro flag, history) lives in localStorage with IndexedDB fallback. Payments in MVP = manual UPI + unlock code (₹0 fees, offline); Razorpay integration is a post-validation task.

**Constraint law (from LO):** No external APIs. No AI calls. Everything works fully offline after first load (PWA installable). Phone-first: target 360×740 viewport, touch targets ≥48px. Every card render must complete in <500ms on a low-end Android.

**Hosting:** GitHub repo + GitHub Pages (free). CNAME later if/when a domain is bought. Deploy = push to `main`, Pages serves `/docs` or `gh-pages` branch.

---

## File layout

```
auracheck/
  index.html          — single page shell, all screens inline (SPA-lite)
  css/main.css        — design system: colors, type, card canvas styles
  js/questions.js     — QUIZ_BANK: questions, options, theme mappings
  js/cards.js         — CARD_TYPES: templates, verdict lines, stamp assets
  js/engine.js        — scoring: answers → archetype → card payload
  js/render.js        — canvas renderer (1080×1920), fonts, watermark
  js/quota.js         — weekly quota counter (Mon 00:00 IST reset), Pro state
  js/share.js         — Web Share API + canvas.toBlob + fallback download
  js/store.js         — localStorage wrapper (try/catch, IndexedDB later)
  sw.js               — service worker: cache-first static, offline shell
  manifest.json       — PWA manifest
  icons/              — 192, 512, maskable
tests/
  test_engine.js      — node-based unit tests (engine is pure logic)
  test_quota.js       — quota reset math (mockable clock)
docs/ROADMAP.md       — post-MVP: payments, couple mode, seasons
```

**Test runner:** plain `node tests/test_engine.js` with `assert` — no npm install needed. (Node v24 present on device.)

---

## Task 1 — Repo + shell page

1. `mkdir -p auracheck/{css,js,icons} auracheck/../tests && cd auracheck && git init`
2. Create `index.html`: minimal shell — header "AuraCheck", three section skeletons (`#screen-home`, `#screen-quiz`, `#screen-card`), `<script src>` tags. Dark theme, system fonts for now.
3. Create `css/main.css`: CSS vars (`--bg:#0f0d14; --ink:#f5f1ea; --accent:#ffb347; --accent2:#7c5cff`), base reset, `.screen` show/hide rules (`.screen{display:none} .screen.active{display:flex}`).
4. Verify: `python3 -m http.server 8377 &` then `curl -s http://localhost:8377/ | grep -c "screen-quiz"` → expect `1`.
5. Commit: `git add -A && git commit -m "shell: index + css skeleton"`.

## Task 2 — Question bank (content, pure data)

Create `js/questions.js`. Six questions, four options each, each option tagged with trait weights. Write real copy — the voice is the product:

```js
// qs: id, text, opts:[{t:display, w:{drama, delulu, grind, soft}}]
const QUIZ = [
 {id:1, text:"3 AM ho. tum kya kar rahe ho?", opts:[
  {t:"kisi ke msg ka reply sochna", w:{drama:2}},
  {t:"'kal se pakka serious' plan banana", w:{delulu:2}},
  {t:"actually padhna/kam karna", w:{grind:2}},
  {t:"so gaye, phone face pe gira", w:{soft:2}}]},
 {id:2, text:"Friend ne 'happy birthday' bhaav nahi diya. Reaction?", opts:[
  {t:"story dekha, like nahi kiya — noted forever", w:{drama:2}},
  {t:"'busy honge' — 4 mahine bhi busy ho sakte hain", w:{delulu:2}},
  {t:"seedha call karke bol diya", w:{grind:2}},
  {t:"mujhe khud yaad nahi aata kisi ka", w:{soft:2}}]},
 // ...6 questions total
];
```

Test: `test_engine.js` asserts `QUIZ.length===6` and every option's weights sum to 2. Run red → write → green → commit `content: quiz bank`.

## Task 3 — Scoring engine (TDD core)

`js/engine.js`, pure functions, no DOM:

```js
function score(answers){ /* sum weights → {drama,delulu,grind,soft} */ }
function archetype(totals){ /* max trait → 'drama'|'delulu'|'grind'|'soft' */ }
function percentages(totals){ /* normalize to %, sum exactly 100 (largest remainder) */ }
```

TDD: test `percentages({drama:1,delulu:1,grind:1,soft:1})` → each 25, sum 100; test `archetype` tie-break order; test empty answers → throws. Run: `node tests/test_engine.js`. Commit `feat: scoring engine`.

## Task 4 — Card templates + verdict copy

`js/cards.js`: 4 archetypes × full card spec:

```js
const CARDS = {
 drama:{ title:"Certified Drama Engineer", stamp:"FILED UNDER: RED FLAG",
   lines:["feelings ko spreadsheet me track karti ho", ...], colors:{bg:'#2a0e1c', fg:'#ffd1dc'}},
 delulu:{...}, grind:{...}, soft:{...}
};
```

12 cards total v1 (3 per archetype, picked by pseudorandom from date-seeded RNG — same user same day = same card, important for sibling fights). Test: every archetype has ≥3 cards, no empty line arrays. Commit.

## Task 5 — Canvas renderer

`js/render.js` → `renderCard(payload)` returns `Promise<HTMLCanvasElement>` at 1080×1920: dark bg, big serif title, percentage bars, stamp box rotated -4°, bottom watermark text `auracheck · make yours` (free tier only). Fonts: use bundled/system only (no Google Fonts network dep) — or self-host one woff2 in `fonts/` (check license; use a free font like "Space Grotesk" OFL).

Test: headless is hard in Node; manual verify — serve, generate, `curl` the page, and screenshot via the browser. Visual check at 360px width. Commit.

## Task 6 — Quota + Pro state

`js/quota.js`:

```js
function weekKey(d=new Date()){ /* IST Monday 00:00 bucket: 'YYYY-Www' */ }
function remaining(){ /* localStorage quota:{week:'2026-W37',used:0,pro:false} → 3-used (∞ if pro) */ }
function consume(){ ... } function grantPro(code){ /* code = 'AURACHECK-DIWALI-26' style unlock codes */ }
```

TDD with injected clock (`quota.js` exports `_setNow(fn)` test hook): advance past Monday → assert reset; `used=3` → remaining 0; `pro:true` → ∞. Commit `feat: quota + pro state`.

## Task 7 — Wiring: quiz flow → card → share

`index.html` glue: home (card count, "make your card" big button) → quiz (one question per screen, swipe/tap) → render → preview → two buttons: **Share** (Web Share API `navigator.share({files:[blob]})` — canvas.toBlob) and **Download** fallback. Watermark free, clean for Pro. Verify manually on LO's phone via LAN URL. Commit `feat: end-to-end flow`.

## Task 8 — PWA + GitHub Pages

`manifest.json` (name AuraCheck, bg #0f0d14, icons), `sw.js` cache-first for static assets + network-falling for `/`. `manifest` + SW registration in index. Then:

```bash
gh repo create auracheck --public --source=. --push   # or manual: create repo, add remote
# In repo settings: Pages → deploy from branch: main, /root
```

Verify (wait ~60s): `curl -s -o /dev/null -w "%{http_code}" https://<user>.github.io/auracheck/` → `200`. Lighthouse PWA check: Playwright or manual on phone (Install banner appears). Commit `chore: pwa + pages deploy`.

## Task 9 — Payments stub (post-MVP, do NOT build before validation)

`docs/ROADMAP.md` only: Pro unlock = UPI QR screen + unlock codes we generate per sale; Razorpay payment-link → code mapping; later `Razorpay checkout.js` (₹0 monthly, 2% fee — allows live payment without backend after passwordless webhook... document as decision-needed). No code this phase.

## Task 10 — Validation script (the kill/pass gate, plain doc)

`docs/VALIDATION.md`: 7-day plan — we generate 10 sample cards via the app itself, post to 3 spots LO chooses (confession pages/comments, WhatsApp groups), track via stripped Bitly-style link or manual count. PASS = 30+ "link?" / install requests in 7 days. FAIL = archive the persona, keep the engine for reuse. Gate happens BEFORE Task 9 is ever built.

---

## Risks / open questions

- **UPI consent in a PWA with no backend:** unlock codes are honor-system; abuse accepted at MVP scale.
- **Web Share file support**: iOS Safari spotty — fallback download always present (Android-first anyway).
- **Card copy must be genuinely funny.** This is the single biggest risk; mediocre copy = dead app. LO reviews every card line before Task 4 is "done."
- **Trademark check** for the final name before public launch (`AuraCheck` generic-enough; search Play + .in domain).
- **No analytics in MVP** — privacy is the sell; validation counted manually.

## Definition of done (for the MVP phase)

Repo live on GitHub Pages, installable on LO's phone, 6-question quiz → distinct card → share to WhatsApp in under 90 seconds cold, quota resets Monday IST, Pro unlocks via code, all unit tests green, LO has installed it and made a card himself.
