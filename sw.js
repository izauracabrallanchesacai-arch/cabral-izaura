// Service Worker v8 - Limpeza Profunda
const CACHE_ID = 'cabral-v8-' + Date.now();

// Install: Limpar TODOS os caches antigos
self.addEventListener('install', (event) => {
  console.log('[SW] Installing v8...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('[SW] All old caches deleted');
      return self.skipWaiting();
    })
  );
});

// Activate: Assumir controle imediatamente
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating v8...');
  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('[SW] v8 is now active');
    })
  );
});

// Fetch: Network-first para tudo
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Não interceptar navegações
  if (request.mode === 'navigate') {
    return;
  }
  
  // Network-first: tenta rede primeiro
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tenta cache
        return caches.match(request).catch(() => {
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Notificar clientes sobre atualização
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
