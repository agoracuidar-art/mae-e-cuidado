self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Gerencia as requisições para permitir funcionamento offline básico
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
