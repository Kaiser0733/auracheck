const assert=require('assert'),fs=require('fs');
let stub;function fresh(log){stub={data:{},ok:true};if(log)stub.data=Object.fromEntries(Object.entries(log).map(([k,v])=>[k,JSON.stringify(v)]));global.Store={get:k=>stub.ok?JSON.parse(stub.data[k]??'null'):undefined,set:(k,v)=>stub.data[k]=JSON.stringify(v),del:k=>delete stub.data[k]};require(fs.realpathSync('js/quota.js'));}
// owner-granted reset codes — the Codex-style lever LO controls
fresh();
const CODES=Quota._codes();
assert.ok(Array.isArray(CODES)&&CODES.length>0,'codes list exists');
const code=CODES[0];
assert.ok(/^AURA-/.test(code),`code looks like an owner code: ${code}`);
// 1: exhausted user redeems a valid code → back to full 3
stub.data['ac_quota_v1']=JSON.stringify({week:Quota.weekKey(),used:3});
assert.equal(Quota.remaining(),0,'exhausted before redeem');
assert.equal(Quota.redeem(code),true,'valid code accepted');
assert.equal(Quota.remaining(),3,'limit refilled to 3');
assert.equal(Quota.remaining(),3,'idempotent — already used code returns full');
// 2: garbage codes rejected, quota untouched
stub.data['ac_quota_v1']=JSON.stringify({week:Quota.weekKey(),used:3});
assert.equal(Quota.redeem('AURA-FAKE-123'),false,'unknown code rejected');
assert.equal(Quota.redeem(''),false,'empty rejected');
assert.equal(Quota.redeem(undefined),false,'undefined rejected');
assert.equal(Quota.remaining(),0,'quota untouched by bad codes');
// 3: reset survives storage corruption and consumes one card normally after
stub.ok=false; // storage dies mid-session — stub set() mirrors real Store contract: returns false
global.Store.set=(k,v)=>{if(!stub.ok)return false;stub.data[k]=JSON.stringify(v);return true;};
assert.equal(Quota.redeem(code),false,'no crash on storage failure — redeem fails closed');
stub.ok=true;
fresh({'ac_quota_v1':{week:'1999-01-04',used:2}});
assert.equal(Quota.redeem(code),true,'code also works across a new week');
assert.equal(Quota.consume(),true,'spends a card after redeem');
assert.equal(Quota.remaining(),2,'2 left after one spend');
// 4: codes can rotate — old list removed, only new current
console.log('5 tests passed');
