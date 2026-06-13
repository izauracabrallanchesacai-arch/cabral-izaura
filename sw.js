// Service Worker estável — sem auto-reload para evitar piscadas
const CACHE_NAME = 'cabral-izaura-v3';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    // Network First: tenta a rede primeiro, cai no cache se offline
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
