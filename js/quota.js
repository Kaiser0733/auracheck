(function(global){
  const KEY='ac_quota_v1',LIMIT=3;
  // Owner reset codes. Append-only in shipped releases; rotating the list
  // only retires unposted codes. Current cycle: 2026-09-09.
  const CODES=['AURA-DIWALI-RESET','AURA-KAISER-BLESSING'];
  let now=()=>new Date();
  // One instant worldwide. UI displays it in the visitor's timezone.
  function weekKey(date=now()){
    const monday=new Date(date.getTime()+330*60000);
    monday.setUTCDate(monday.getUTCDate()-(monday.getUTCDay()+6)%7);
    return monday.toISOString().slice(0,10);
  }
  function load(){
    const stored=Store.get(KEY),week=weekKey();
    if(!stored || stored.week!==week)return {week,used:0};
    const used=Number.isInteger(stored.used)?Math.min(LIMIT,Math.max(0,stored.used)):LIMIT;
    return {week,used};
  }
  function remaining(){return LIMIT-load().used;}
  function consume(){
    const quota=load();if(quota.used>=LIMIT)return false;
    Store.set(KEY,{...quota,used:quota.used+1});return true;
  }
  // Codex-style owner reset: a code in this release refills the limit once.
  // The stored "codes" list is the visitor's personal redeemed-history — it
  // only ever grows, so older releases keep accepting codes they already saw.
  function redeem(code){
    const claimed=(Store.get('ac_codes_v1')||[]);
    if(claimed.includes(code))return true;           // idempotent
    if(!CODES.includes(code))return false;           // not one of ours
    // fail closed: storage down → no reset happens (better than silent loss)
    if(!Store.set('ac_codes_v1',[...claimed,code]))return false;
    Store.set(KEY,{week:weekKey(),used:0});
    return true;
  }
  // Beta has no checkout. Client storage is NOT a paid entitlement authority.
  global.Quota={weekKey,remaining,consume,redeem,isPro:()=>false,unlock:()=>false,
    _setNow:fn=>{now=fn;},_reset:()=>{Store.del(KEY);Store.del('ac_codes_v1');},_codes:()=>[...CODES]};
})(typeof module!=='undefined'?global:this);
