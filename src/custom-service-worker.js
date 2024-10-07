const CACHE_NAME = 'hathyre-cache'; // Donnez un nom à votre cache
const urlsToCache = [
    '/', // Cache la page d'accueil
    '/index.html', // Cache la page HTML principale
    '/favicon.ico', // Cache les ressources favicon
    '/logo192.png', // Cache l'image de logo
    '/manifest.json', // Cache le fichier manifest si vous en avez un
    // Ajoutez d'autres ressources que vous avez dans votre dossier public si nécessaire
];

// Lors de l'installation du service worker, met en cache les fichiers spécifiés
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Ouverture du cache et ajout des fichiers du dossier public');
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepter les requêtes et renvoyer les fichiers depuis le cache si disponibles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si le fichier est dans le cache, on le retourne. Sinon, on fait une requête réseau.
      return response || fetch(event.request);
    })
  );
});

// Activation du Service Worker et suppression des vieux caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Suppression de l’ancien cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Fichiers mis en cache :', urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

