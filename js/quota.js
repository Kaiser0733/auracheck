// quota.js — weekly quota + Pro state, Monday 00:00 IST reset
(function (global) {
  const KEY = 'ac_quota_v1';
  const FREE_PER_WEEK = 3;

  let _now = () => new Date(); // injectable clock for tests
  const _setNow = (fn) => { _now = fn; };

  /** Week bucket key: IST-based, Monday 00:00 start → 'YYYY-Www' */
  function weekKey(d = _now()) {
    const IST = 330 * 60000;
    const ist = new Date(d.getTime() + IST - d.getTimezoneOffset() * 60000);
    const day = ist.getDay(); // Mon=1 ... Sun=0
    const monday = new Date(ist);
    monday.setDate(ist.getDate() - ((day + 6) % 7));
    const y = monday.getFullYear();
    // ISO week number
    const firstMon = new Date(y, 0, 1);
    firstMon.setDate(firstMon.getDate() + ((8 - firstMon.getDay()) % 7));
    const week = Math.ceil(((monday - firstMon) / 86400000 + 1) / 7);
    return `${y}-W${String(week).padStart(2,'0')}`;
  }

  function _load() {
    const s = Store.get(KEY);
    const wk = weekKey();
    const base = { week: wk, used: 0, pro: false, proCode: null };
    if (!s) return base;
    if (s.week !== wk) return { ...base, pro: s.pro, proCode: s.proCode }; // week rolled
    return { ...base, ...s, week: wk };
  }

  function remaining() {
    const q = _load();
    if (q.pro) return Infinity;
    return Math.max(0, FREE_PER_WEEK - q.used);
  }

  function consume() {
    const q = _load();
    if (q.pro) return true;
    if (q.used >= FREE_PER_WEEK) return false;
    q.used += 1;
    Store.set(KEY, q);
    return true;
  }

  function isPro() { return _load().pro; }

  /** Unlock codes: hashed client-side. Not bulletproof (client-side secret by
   *  definition) — rotated monthly + roadmap serverless validation. */
  const VALID_HASHES = ['76f0b03','a65b4d8c','3746f3f2']; // hashed unlock codes
  function _h(s){let h=0;for(let i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0}return h.toString(16).slice(0,8)}
  function unlock(code) {
    if (!code) return false;
    const ok = VALID_HASHES.includes(_h(String(code).trim().toUpperCase() + '·aurasalt'));
    if (ok) {
      const q = _load();
      q.pro = true; q.proCode = '***';
      Store.set(KEY, q);
    }
    return ok;
  }

  global.Quota = { weekKey, remaining, consume, isPro, unlock, _setNow, _reset: () => Store.del(KEY) };
})(typeof module !== 'undefined' ? global : this);
