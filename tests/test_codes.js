// Redeem edge cases live in test_honesty.js now; this file pins the core claim path.
const assert=require('assert'),fs=require('fs');
let stub;function fresh(log){stub={data:{},ok:true};if(log)stub.data=Object.fromEntries(Object.entries(log).map(([k,v])=>[k,JSON.stringify(v)]));global.Store={get:k=>stub.ok?JSON.parse(stub.data[k]??'null'):undefined,set:(k,v)=>{if(!stub.ok)return false;stub.data[k]=JSON.stringify(v);return true},del:k=>delete stub.data[k]};delete require.cache[require.resolve('../js/quota.js')];require('../js/quota.js');}
fresh();
const code=Quota._codes()[0];
// claim path: exhausted → redeem 'ok' → spend works
stub.data['ac_quota_v1']=JSON.stringify({week:Quota.weekKey(),used:3});
assert.equal(Quota.remaining(),0,'exhausted before redeem');
assert.equal(Quota.redeem(code),'ok','valid code accepted');
assert.equal(Quota.remaining(),3,'limit refilled to 3');
assert.equal(Quota.consume(),true,'spends a card after redeem');
// storage outage: redeem fails closed, no crash
stub.ok=false;
assert.equal(Quota.redeem(Quota._codes()[1]),'bad','storage down → redeem fails closed');
// cross-week code still valid
stub.ok=true;fresh({'ac_quota_v1':{week:'1999-01-04',used:2}});
assert.equal(Quota.redeem(Quota._codes()[1]),'ok','code works across a new week');
console.log('4 tests passed');
