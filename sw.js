
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
});self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // Clone the request (to use it once for fetching and once for caching)
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest)
            .then(function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // Clone the response (to use it once for returning and once for caching)
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            });
        })
    );
  });
  