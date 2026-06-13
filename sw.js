// Service Worker com Forçador de Atualização (Kill Switch)
const CACHE_NAME = 'cabral-izaura-v' + Date.now(); // Cache único por versão

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    return caches.delete(key); // Limpa todos os caches antigos
                })
            );
        }).then(() => self.clients.claim()) // Assume o controle das páginas abertas
    );
});

self.addEventListener('fetch', (e) => {
    // Estratégia: Network First (Rede primeiro, depois cache)
    // Isso garante que se houver internet, ele sempre pegue o arquivo novo.
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
