/* Service Worker - HUB MonChauffeurVIP PWA */
const CACHE_NAME = 'hub-mcv-v1';
const STATIC_URLS = [
  'index.html',
  'vtc.html',
  'taxi.html',
  'longue-distance.html',
  'app-mobile.html',
  'contact.html',
  'cgu.html',
  'mentions-legales.html',
  'politique-confidentialite.html',
  'style.css',
  'manifest.json',
  'gradient.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_URLS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone());
          }
          return response;
        });
        return cached || fetchPromise;
      });
    })
  );
});
