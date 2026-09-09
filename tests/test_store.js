const assert=require('assert');
// Post-audit store contract: one poisoned read must never latch memory-only mode.
// A poisoned value (invalid JSON) is skipped to memory — but the NEXT successful
// write must write through and the next good read must come from localStorage.
function mk(){const saved={item:{},get throws(){return false}};
 const backing={
  getItem:k=>{if(Object.prototype.hasOwnProperty.call(saved.item,k))return saved.item[k];throw Error('poisoned read')},
  setItem:(k,v)=>{saved.item[k]=String(v)},
  removeItem:k=>{delete saved.item[k]}
 };
 saved.setItem=backing.setItem;saved.item=saved.item;return saved;}
// scenario 1: healthy storage
(function(){
 const ls={store:{},getItem(k){return this.store[k]??null},setItem(k,v){this.store[k]=String(v)},removeItem(k){delete this.store[k]}};
 global.localStorage=ls;
 delete require.cache[require.resolve('../js/store.js')];require('../js/store.js');
 assert.equal(Store.set('k',{a:1}),true,'set ok');
 assert.deepEqual(Store.get('k'),{a:1},'roundtrip via localStorage');
 assert.ok(Store.persistent,'persistent on healthy storage');
})();
// scenario 2: poisoned key, others healthy — the E2b regression
(function(){
 const ls={store:{},getItem(k){if(k==='ac_quota_v1')return 'not-json';return this.store[k]??null},setItem(k,v){this.store[k]=String(v)},removeItem(k){delete this.store[k]}};
 global.localStorage=ls;
 delete require.cache[require.resolve('../js/store.js')];require('../js/store.js');
 assert.equal(Store.get('ac_quota_v1'),null,'poisoned key falls back to memory/null — no crash, no latching');
 assert.ok(Store.persistent,'one poisoned key must NOT flip the whole store to memory-only');
 assert.equal(Store.set('fresh',{b:2}),true,'writes still go through');
 assert.deepEqual(ls.store['fresh'],'{"b":2}','write-through reached localStorage');
 assert.deepEqual(Store.get('fresh'),{b:2},'roundtrip after poisoned read');
})();
// scenario 3: localStorage completely dead (quota exceeded / privacy mode)
(function(){
 const ls={getItem(){throw Error('dead')},setItem(){throw Error('dead')},removeItem(){throw Error('dead')}};
 global.localStorage=ls;
 delete require.cache[require.resolve('../js/store.js')];require('../js/store.js');
 assert.equal(Store.set('k',{a:1}),false,'set fails closed when storage dead');
 assert.deepEqual(Store.get('k'),{a:1},'memory fallback still works');
 assert.ok(!Store.persistent,'dead storage = memory-only session, honestly reported');
})();
// scenario 4: recovery — dead then healthy again in the same session
(function(){
 const ls={store:{},dead:true,getItem(k){if(this.dead)throw Error('dead');return this.store[k]??null},setItem(k,v){if(this.dead)throw Error('dead');this.store[k]=String(v)},removeItem(k){delete this.store[k]}};
 global.localStorage=ls;
 delete require.cache[require.resolve('../js/store.js')];require('../js/store.js');
 Store.set('k',{a:1});          // fails, memory only
 assert.ok(!Store.persistent,'dead: memory-only');
 ls.dead=false;                  // storage recovers (Android freed it)
 assert.equal(Store.set('k2',{b:2}),true,'recovered storage accepts writes');
 assert.ok(Store.persistent,'successful write re-enables persistence (no permanent latch)');
 assert.deepEqual(ls.store['k2'],'{"b":2}','recovered write-through works');
})();
console.log('4 tests passed');
