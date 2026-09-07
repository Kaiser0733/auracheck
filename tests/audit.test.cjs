const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function quota(){const mem={};const ctx={Intl,Date,Store:{get:k=>mem[k],set:(k,v)=>mem[k]=v,del:k=>delete mem[k]}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/quota.js','utf8'),ctx);return ctx.Quota;}
test('week changes exactly Monday midnight IST in every host timezone',()=>{
 const old=process.env.TZ;
 try {for(const tz of ['UTC','Asia/Kolkata','America/Los_Angeles','Pacific/Auckland']){
 process.env.TZ=tz; const q=quota();
 assert.notEqual(q.weekKey(new Date('2026-09-06T18:29:59Z')),q.weekKey(new Date('2026-09-06T18:30:00Z')),tz);
 assert.equal(q.weekKey(new Date('2026-09-06T18:30:00Z')),q.weekKey(new Date('2026-09-13T18:29:59Z')),tz);
 assert.equal(q.weekKey(new Date('2026-12-31T12:00:00Z')),q.weekKey(new Date('2027-01-01T12:00:00Z')),tz);
 }} finally {if(old===undefined)delete process.env.TZ;else process.env.TZ=old;}
});
test('unverified payment address is never offered to customers',()=>{
 assert.doesNotMatch(fs.readFileSync('index.html','utf8'),/kaiser0733@okaxis|upi:\/\/pay/);
});
test('card variant advances with each completed card, not just each week',()=>{
 const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/engine.js','utf8'),ctx);
 const cards={aura:[{id:'a'},{id:'b'},{id:'c'}]};
 const ids=[0,1,2].map(i=>ctx.Engine.pickCard('aura',cards,false,i).id);
 assert.equal(new Set(ids).size,3);
});
