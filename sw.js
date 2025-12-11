const CACHE_NAME = 'tet2026-v2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './images/a1.png',
  './images/hoamai.png',
  './images/hoadao.png',
  './images/banhchung.png',
  './images/baolixi.png',
  './images/cung.png',
  './images/phao.png',
  './images/chotet.png',
  './images/donnha.png',
  './images/xongdat.png',
  './images/binhngo.png',
  './images/duxuanlechua.png',
  './images/banhtet.png',
  './images/muttet.png',
  './audio/nhacxuan.mp3',
  './video/Video1.mp4'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
