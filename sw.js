self.addEventListener('install', event => {
    console.log('Install event!');
});

self.addEventListener('activate', event => {
    console.log('Activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
});

const cacheName = 'cache-v1';
const recourcesToPreache = [
    '/',
    'index.html',
    'styles/style.css',
];

self.addEventListener('install', event => {
    console.log('service worker install event!');
    event.waitUntil(
        caches.open(caheName)
          .then(cache => {
            return cache.addAll(resourcesToPreache);
          })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
      .then(cacheResponse => {
        return cacheResponse || fetch(event.request);
      })
    );
});