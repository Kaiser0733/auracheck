// sw.js — service worker: cache-first static assets, offline shell
const CACHE = 'auracheck-v1';
const ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './js/store.js',
  './js/questions.js',
  './js/cards.js',
  './js/engine.js',
  './js/quota.js',
  './js/render.js',
  './js/share.js',
  './js/app.js',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true })
      .then(hit => hit || fetch(e.request).then(res => {
        // cache runtime assets too
        if (res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html')))
  );
});
