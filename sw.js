var CACHE_VERSION = 'v41'

self.addEventListener('install', function(e) {
  self.skipWaiting(); // Ativa imediatamente sem esperar abas fecharem
});

self.addEventListener('activate', function(e) {
  // Apaga TODOS os caches antigos ao ativar nova versão
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        return caches.delete(k);
      }));
    }).then(function() {
      return self.clients.claim(); // Assume controle de todas as abas abertas
    })
  );
});

// Sem interceptação de fetch — deixa tudo passar direto para a rede
// Isso garante que o index.html sempre vem fresco do GitHub Pages
