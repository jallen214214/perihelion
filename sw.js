// Offline support for Perihelion.
// Bump VERSION whenever you change any file, so installed copies pick up the update.
const VERSION = 'perihelion-v1';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fonts: cache on first use, then serve from cache forever.
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(VERSION).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => { cache.put(req, res.clone()); return res; }))
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // The game itself: try the network so updates arrive, fall back to the cached copy offline.
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(cache => cache.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});
