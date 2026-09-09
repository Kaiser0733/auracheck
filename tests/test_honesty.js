const assert=require('assert'),fs=require('fs');
let stub;function fresh(log){stub={data:{},ok:true};if(log)stub.data=Object.fromEntries(Object.entries(log).map(([k,v])=>[k,JSON.stringify(v)]));global.Store={get:k=>stub.ok?JSON.parse(stub.data[k]??'null'):undefined,set:(k,v)=>{if(!stub.ok)return false;stub.data[k]=JSON.stringify(v);return true},del:k=>delete stub.data[k]};delete require.cache[require.resolve('../js/quota.js')];require('../js/quota.js');}
// Post-audit contract: redeem is three-state, corruption policy is uniform.
fresh();
const code=Quota._codes()[0];
// 1: three-state redeem — 'ok' refills, 'already' tells the truth, 'bad' rejects
stub.data['ac_quota_v1']=JSON.stringify({week:Quota.weekKey(),used:2});
assert.equal(Quota.redeem(code),'ok','first redeem = ok');
assert.equal(Quota.remaining(),3,'ok refilled to 3');
assert.equal(Quota.consume(),true,'spend one');
assert.equal(Quota.redeem(code),'already','same code again = already (no refill, no lie)');
assert.equal(Quota.remaining(),2,'already does not refill — state kept truthfully');
assert.equal(Quota.redeem('AURA-FAKE-123'),'bad','unknown = bad');
assert.equal(Quota.redeem(''),'bad','empty = bad');
// 2: uniform corruption policy — ANY invalid shape = fresh start + self-repair
fresh({'ac_quota_v1':{week:Quota.weekKey(),used:'banana'}});
assert.equal(Quota.remaining(),3,'non-integer used: fresh 3, not the old silent lockout');
assert.deepEqual(JSON.parse(stub.data['ac_quota_v1']),{week:Quota.weekKey(),used:0},'storage self-repaired on read');
fresh({'ac_quota_v1':{week:Quota.weekKey(),used:-99}});
assert.equal(Quota.remaining(),3,'negative used: fresh 3');
fresh({'ac_quota_v1':{week:Quota.weekKey(),used:999}});
assert.equal(Quota.remaining(),3,'oversized used: fresh 3');
fresh({'ac_quota_v1':{week:12345,used:1}});
assert.equal(Quota.remaining(),3,'non-string week: fresh 3');
fresh({'ac_quota_v1':{used:1}});
assert.equal(Quota.remaining(),3,'missing week: fresh 3');
// 3: repaired storage then behaves normally
fresh({'ac_quota_v1':{week:Quota.weekKey(),used:'banana'}});
Quota.remaining();
assert.equal(Quota.consume(),true,'consume works right after repair');
assert.equal(Quota.remaining(),2,'one card spent, two left');
console.log('6 tests passed');
