/* FRIGO: abre sin internet y se actualiza sola.
   - Con internet: siempre trae la versión más nueva. Si la red tarda más de 3 s, abre la guardada
     y sigue bajando la nueva en segundo plano.
   - Sin internet: abre lo guardado.
   - Cuando hay un sw.js nuevo se activa solo; la página decide cuándo recargar (nunca a mitad de una venta).
   IMPORTANTE al publicar: cambiar V (acá) y VERSION (en index.html). Sin ese cambio los celulares
   ven la versión nueva recién en la apertura siguiente, en vez de actualizarse solos. */
const V = "frigo-v2.7";
const CASA = ["./", "index.html", "config.js", "pedir.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
const FUERA = ["fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com"];
// Mismo número de versión que usa index.html para cargar Firebase. Se guarda para que arranque sin internet.
const FIREBASE = ["app-compat", "auth-compat", "firestore-compat"].map(n => "https://www.gstatic.com/firebasejs/10.14.1/firebase-" + n + ".js");
const ESPERA_RED = 3000;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => Promise.allSettled([
    ...CASA.map(u => c.add(new Request(u, { cache: "reload" }))),
    ...FIREBASE.map(u => c.add(new Request(u, { mode: "cors" }))),
  ])).then(() => self.skipWaiting()));
});
self.addEventListener("message", e => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});

// Si la red ya demostró ser lenta, los pedidos siguientes no vuelven a esperar: si no, cada archivo sumaría su propia espera.
let lentaHasta = 0;

// Lo nuestro: red primero (con tope de espera), guardado como respaldo.
async function primeroRed(e, r) {
  const c = await caches.open(V);
  const hit = await c.match(r, { ignoreSearch: r.mode === "navigate" });
  const red = fetch(r, { cache: "no-cache" }).then(res => {
    if (res && res.ok) { c.put(r, res.clone()); return res; }
    return hit || res;                       // el servidor falló (5xx, 404): mejor lo guardado
  });
  e.waitUntil(red.catch(() => {}));
  try {
    if (!hit) return await red;
    const espera = Date.now() < lentaHasta ? 0 : ESPERA_RED;
    return await Promise.race([red, new Promise(ok => setTimeout(() => { lentaHasta = Date.now() + 30000; ok(hit); }, espera))]);
  } catch (_) {
    return hit || Response.error();
  }
}

// Fuentes y Firebase (versión fija): lo guardado primero, y se refresca en segundo plano.
async function primeroGuardado(e, r) {
  const c = await caches.open(V);
  const hit = await c.match(r);
  const red = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()); return res; });
  e.waitUntil(red.catch(() => {}));
  try { return hit || await red; } catch (_) { return hit || Response.error(); }
}

self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  const propio = u.origin === location.origin;
  if (!propio && !FUERA.includes(u.host)) return;
  if (u.pathname.endsWith("/sw.js")) return;
  e.respondWith(propio ? primeroRed(e, r) : primeroGuardado(e, r));
});
