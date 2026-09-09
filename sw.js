// Bump this release whenever a shipped asset changes.
const CACHE='auracheck-v10-riso-press';
const ROOT=new URL('./',self.location.href);
const ASSETS=['./','index.html','css/main.css','js/store.js','js/questions.js','js/cards.js','js/engine.js','js/quota.js','js/render.js','js/share.js','js/app.js','manifest.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new URL(path,ROOT).href))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('auracheck-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
 event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try {
     const response=await fetch(event.request);
     return response;
   } catch {
     const cached=await cache.match(event.request,{ignoreSearch:true});
     if(cached)return cached;
     if(event.request.mode==='navigate')return (await cache.match(new URL('index.html',ROOT).href))||Response.error();
     return Response.error();
   }
 })());
});
