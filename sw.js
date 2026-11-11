/* FRIGO: deja la app abrible sin internet. No se actualiza solo: espera el toque del usuario. */
const V = "frigo-v2.5";
const CASA = ["./", "index.html", "config.js", "pedir.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
const FUERA = ["fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => Promise.allSettled(CASA.map(u => c.add(u)))));
});
self.addEventListener("message", e => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  if (u.origin !== location.origin && !FUERA.includes(u.host)) return;
  if (u.pathname.endsWith("/sw.js")) return;
  e.respondWith(caches.open(V).then(c => c.match(r).then(hit => {
    const red = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
    return hit || red;
  })));
});
