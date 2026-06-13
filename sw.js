self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('cabral-izaura-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './images/logo.png',
        './images/banner.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
