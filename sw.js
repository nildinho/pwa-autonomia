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
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('Excluindo cache:', cacheName); // Adiciona um log para registrar o nome do cache sendo excluído
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('Caches excluídos com sucesso!'); // Adiciona um log para indicar que todos os caches foram excluídos
    }).catch(function(error) {
      console.error('Erro ao excluir caches:', error); // Adiciona um log para registrar erros durante a exclusão de caches
    })
  );
});
