const CACHE_NAME = 'v1';
const urlsToCache = [
    'http://localhost:3000',
    '/index.html',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/favicon.ico',
    '/bg-review.jpg'
];

// Install Service Worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Ouverture du cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests and serve from cache if available
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne la ressource mise en cache ou effectue une nouvelle requête
      return response || fetch(event.request);
    })
  );
});

// Activate Service Worker and clean up old caches
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Supprimer les vieux caches
            return caches.delete(cacheName);
          }
          return null; // Ajout d'un retour explicite pour les caches non supprimés
        })
      );
    })
  );
});
