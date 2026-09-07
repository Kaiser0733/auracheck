const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
test('storage survives write failures after startup and keeps latest in-memory value',()=>{
 let fail=false;const disk={};const ctx={localStorage:{getItem:k=>disk[k]??null,setItem:(k,v)=>{if(fail)throw Error('full');disk[k]=v},removeItem:k=>delete disk[k]}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/store.js','utf8'),ctx);
 ctx.Store.set('draft',{step:1});fail=true;
 assert.doesNotThrow(()=>ctx.Store.set('draft',{step:2}));assert.equal(ctx.Store.get('draft').step,2);
});
test('skipped questions contribute no invented personality points',()=>{
 const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/engine.js','utf8'),ctx);
 const quiz=[{options:[{weights:{aura:10}}]},{options:[{weights:{chill:10}}]}];
 assert.equal(ctx.Engine.score([null,0],quiz).aura,0);assert.equal(ctx.Engine.score([null,0],quiz).chill,10);
 assert.throws(()=>ctx.Engine.score([99],quiz));
});
