(function (global) {
  const memory = new Map();
  let persistent = true;
  global.Store = {
    get(key) {
      if (!persistent && memory.has(key)) return JSON.parse(memory.get(key));
      try { return JSON.parse(localStorage.getItem(key)); }
      catch { persistent = false; return memory.has(key) ? JSON.parse(memory.get(key)) : null; }
    },
    set(key, value) {
      const serialized = JSON.stringify(value);
      memory.set(key, serialized);
      try { localStorage.setItem(key, serialized); return true; }
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
