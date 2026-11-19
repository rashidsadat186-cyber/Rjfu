// Network-first service worker: always loads the newest version, falls back to cache when offline.
const CACHE='sultan-v-emerald-readable-2';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c)).catch(()=>{});return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
