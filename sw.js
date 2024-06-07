const CACHE_NAME = 'calculadora-autonomia-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/autonomia.js',
  '/manifest.json',
  '/volante.png'
];

self.addEventListener('install', function (event) {
  // Instalação do Service Worker e armazenamento dos arquivos no cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function (cacheName) {
          console.log('Excluindo cache:', cacheName); // Adiciona um log para registrar o nome do cache sendo excluído
          return caches.delete(cacheName);
        })
      );
    })
  );
});
