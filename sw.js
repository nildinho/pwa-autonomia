const CACHE_NAME = 'calculadora-autonomia-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/autonomia.js',
  '/manifest.json',
  '/volante.png'
];

self.addEventListener('install', function(event) {
  // Instalação do Service Worker e armazenamento dos arquivos no cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  // Limpa caches antigos durante a ativação do Service Worker
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('Excluindo cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Não há cache, faz uma solicitação de rede
        return fetch(event.request)
          .then(function(response) {
            // Verifica se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para armazenar em cache
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
