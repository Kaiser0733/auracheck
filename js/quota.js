(function(global){
  const KEY='ac_quota_v1',LIMIT=3;
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
  // Beta has no checkout. Client storage is NOT a paid entitlement authority.
  global.Quota={weekKey,remaining,consume,isPro:()=>false,unlock:()=>false,
    _setNow:fn=>{now=fn;},_reset:()=>Store.del(KEY)};
})(typeof module!=='undefined'?global:this);
