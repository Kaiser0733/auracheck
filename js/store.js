(function (global) {
  const memory = new Map();
  let persistent = true;   // "did the last attempted write actually reach localStorage"
  global.Store = {
    get(key) {
      if (!persistent && memory.has(key)) return JSON.parse(memory.get(key));
      let raw;
      try { raw = localStorage.getItem(key); }
      catch { return memory.has(key) ? JSON.parse(memory.get(key)) : null; }   // storage dead this call
      try { return JSON.parse(raw); }
      catch { return memory.has(key) ? JSON.parse(memory.get(key)) : null; }   // poisoned value: skip key, no latch
    },
    set(key, value) {
      const serialized = JSON.stringify(value);
      memory.set(key, serialized);
      try { localStorage.setItem(key, serialized); persistent = true; return true; }
      catch { persistent = false; return false; }
    },
    del(key) {
      memory.set(key, 'null');
      try { localStorage.removeItem(key); }
      catch { persistent = false; }
    },
    get persistent() { return persistent; }
  };
})(typeof module !== 'undefined' ? global : this);
