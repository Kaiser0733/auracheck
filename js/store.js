// store.js — localStorage wrapper with graceful in-memory fallback
(function (global) {
  const MEM = {};
  const hasLS = (() => { try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; } catch(e){ return false; } })();
  global.Store = {
    get(k){ try{ return JSON.parse(hasLS ? localStorage.getItem(k) : (MEM[k] ?? null)); }catch(e){ return null; } },
    set(k,v){ const s = JSON.stringify(v); if(hasLS){ localStorage.setItem(k, s); } else { MEM[k] = s; } },
    del(k){ if(hasLS) localStorage.removeItem(k); else delete MEM[k]; }
  };
})(this);
