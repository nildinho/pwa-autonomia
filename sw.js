const CACHE_NAME = 'calculadora-autonomia-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/autonomia.js',
  '/manifest.json',
  '/volante.png'
];

self.addEventListener('activate', function(event) {
  // Ativa o novo service worker e remove os antigos
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

