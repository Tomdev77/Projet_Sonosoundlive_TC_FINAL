const CACHE_NAME = 'Sonosound';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.log('Cache installation failed:', error))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('https://corsproxy.io/?https%3A%2F%2Fsonosound.online%2Fwp-json%2Fwp%2Fv2%2Fposts%3Fper_page%3D100')) {
    return; // Ne pas traiter les requêtes vers l'URL de l'API
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
      .catch(error => console.log('Cache fetch failed:', error))
  );
});

