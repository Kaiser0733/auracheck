// tests/test_quota.js — quota reset math with mocked clock
const assert = require('assert');

global.Store = (()=>{ const m={}; return {get:k=>m[k]??null, set:(k,v)=>m[k]=v, del:k=>delete m[k]}; })();
require('../js/quota.js');
const Q = global.Quota;

let pass = 0;
function t(name, fn){ try { fn(); pass++; console.log('✓', name); } catch(e){ console.error('✗', name, e.message); process.exitCode = 1; } }

const D = (y,mo,d,h=0,mi=0) => new Date(Date.UTC(y,mo-1,d,h-5,mi-30)); // IST → UTC

t('weekKey same Mon and Fri', () => {
  Q._setNow(()=>D(2026,9,7)); // Mon
  const a = Q.weekKey();
  Q._setNow(()=>D(2026,9,11)); // Fri same week
  assert.strictEqual(a, Q.weekKey());
});

t('weekKey rolls at Monday IST', () => {
  Q._setNow(()=>D(2026,9,7));   // Mon
  const w1 = Q.weekKey();
  Q._setNow(()=>D(2026,9,14));  // next Mon
  const w2 = Q.weekKey();
  assert.notStrictEqual(w1, w2);
});

t('free user gets 3 then blocked', () => {
  Q._reset(); Q._setNow(()=>D(2026,9,7));
  assert.strictEqual(Q.remaining(), 3);
  Q.consume(); Q.consume(); Q.consume();
  assert.strictEqual(Q.remaining(), 0);
  assert.strictEqual(Q.consume(), false);
});

t('quota resets next week', () => {
  Q._setNow(()=>D(2026,9,14)); // next Mon
  assert.strictEqual(Q.remaining(), 3);
});

t('legacy codes cannot bypass quota', () => {
  Q._reset();
  assert.strictEqual(Q.unlock('AC-PRO-2026'), false);
  Q.consume(); Q.consume(); Q.consume();
  assert.strictEqual(Q.remaining(), 0);
});

t('invalid code rejected', () => {
  Q._reset();
  assert.strictEqual(Q.unlock('WRONG'), false);
  assert.strictEqual(Q.isPro(), false);
});

t('membership stays inactive', () => {
  assert.strictEqual(Q.unlock('AC-FOUNDER'), false);
  assert.strictEqual(Q.isPro(), false);
});

console.log(`\n${pass} tests passed`);
