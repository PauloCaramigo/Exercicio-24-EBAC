const CACHE_NAME = "diario-cache-v6";
const URLS_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/app.js',
  '/script.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/Screenshot.png'
];

self.addEventListener("install", (event) => {
  console.log("Service Worker foi instalado");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker foi ativado");
  event.waitUntil(
    caches.keys().then((keys) => {
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});