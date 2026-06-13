// Service Worker Cabral & Izaura - V2 (Performance & Splash Support)
const CACHE_NAME = 'cabral-izaura-v2';
const ASSETS = [
    './',
    './index.html',
    './splash.html',
    './manifest.json',
    './splash_sound_fixed.mp3',
    './images/logo.png',
    './images/banner.png',
    './images/sobre-nos.png'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
        ))
    );
});

self.addEventListener('fetch', (e) => {
    // Network First para JSON e HTML para garantir preços novos
    if (e.request.url.includes('.json') || e.request.url.includes('.html')) {
        e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request))
        );
    } else {
        // Cache First para imagens e sons
        e.respondWith(
            caches.match(e.request).then(res => res || fetch(e.request))
        );
    }
});
