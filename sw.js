/**
 * Service Worker: ARA BOT de Mate PWA
 * Strategy: Network-First for Navigation (Auto-Updates daily) + Cache Fallback for 100% Offline
 */
const CACHE_NAME = 'ara-bot-pwa-v4.1.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './version.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Outfit:wght@600;800;900&display=swap'
];

// Force immediate installation and skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Cache addAll warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Clean up old caches immediately and take control of all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('[ServiceWorker] Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Listen for direct messages from the application
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data && event.data.action === 'purgeAndReload') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((c) => c.navigate(c.url));
      });
    });
  }
});

// Fetch Strategy:
// 1. Navigation requests (HTML): Network-First (always fresh, fallback to cache if offline)
// 2. Static Assets: Stale-While-Revalidate / Cache-First with update
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Navigation requests (HTML pages) -> NETWORK FIRST
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          console.log('[ServiceWorker] Offline mode: serving cached HTML page');
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // version.json -> Always NETWORK ONLY (no-store)
  if (request.url.includes('version.json')) {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() => caches.match(request))
    );
    return;
  }

  // Static Assets -> Cache-First with Background Update
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});
