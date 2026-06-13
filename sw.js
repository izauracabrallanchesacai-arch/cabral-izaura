// Service Worker v4 — Estável, sem piscadas, com cache inteligente
const CACHE_NAME = 'cabral-izaura-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './audio-boas-vindas.mp3',
    './images/logo.png',
    './images/banner.png'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE).catch(() => {
                console.log('Alguns assets não puderam ser cacheados');
            });
        })
    );
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
    const url = new URL(e.request.url);
    
    // JSON sempre vem do servidor (Network First, sem cache)
    if (url.pathname.endsWith('.json')) {
        e.respondWith(
            fetch(e.request, { cache: 'no-store' })
                .catch(() => caches.match(e.request))
        );
        return;
    }
    
    // HTML sempre tenta rede primeiro (Network First)
    if (url.pathname.endsWith('.html') || url.pathname === url.origin + '/cabral-izaura/') {
        e.respondWith(
            fetch(e.request, { cache: 'no-store' })
                .catch(() => caches.match(e.request))
        );
        return;
    }
    
    // Áudio: Cache First (rápido, mas com fallback para rede)
    if (url.pathname.endsWith('.mp3')) {
        e.respondWith(
            caches.match(e.request)
                .then(res => res || fetch(e.request))
        );
        return;
    }
    
    // Imagens e outros assets: Cache First
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request))
    );
});
