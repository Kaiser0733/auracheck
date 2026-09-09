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
  // Audit fix: one corruption policy, everywhere. Any invalid stored shape is
  // treated as a fresh week AND repaired on read, so a single corrupted byte
  // can never lock a visitor out until Monday or silently refill forever.
  function valid(stored,week){
    return stored && stored.week===week && Number.isInteger(stored.used)
      && stored.used>=0 && stored.used<=LIMIT;
  }
  function load(){
    const week=weekKey(),stored=Store.get(KEY);
    if(!valid(stored,week)){
      const fresh={week,used:0};
      Store.set(KEY,fresh);          // self-repair on read
      return fresh;
    }
    return {week,used:stored.used};
  }
  function remaining(){return LIMIT-load().used;}
  function consume(){
    const quota=load();if(quota.used>=LIMIT)return false;
    Store.set(KEY,{...quota,used:quota.used+1});return true;
  }
  // Audit fix: three-state redeem. 'ok' = refilled now. 'already' = this
  // code was redeemed before — truthful, no refill. 'bad' = not one of ours.
  // The old boolean lied to the UI when a code was re-entered.
  function redeem(code){
    const claimed=(Store.get('ac_codes_v1')||[]);
    if(claimed.includes(code))return 'already';
    if(!CODES.includes(code))return 'bad';
    // fail closed: storage down → no reset happens (better than silent loss)
    if(!Store.set('ac_codes_v1',[...claimed,code]))return 'bad';
    Store.set(KEY,{week:weekKey(),used:0});
    return 'ok';
  }
  // Beta has no checkout. Client storage is NOT a paid entitlement authority.
  global.Quota={weekKey,remaining,consume,redeem,isPro:()=>false,unlock:()=>false,
    _setNow:fn=>{now=fn;},_reset:()=>{Store.del(KEY);Store.del('ac_codes_v1');},_codes:()=>[...CODES]};
})(typeof module!=='undefined'?global:this);
