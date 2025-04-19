const CACHE_NAME = 'visiting-card-cache-v1';
const urlsToCache = [
  '/offline.html',
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/images/photo.jpg',
  '/images/phone-qr.png',
  '/images/telegram-qr.png',
  '/images/vk-qr.png',
  '/images/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match('/pwa-test/offline.html')) // Fallback
    );
  });

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});