const CACHE_NAME = 'vanntech-cache-v14';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/styleResponsive.css',
    '/index.js',
    '/img/perfil1.webp',
    '/img/logo1.webp',
    '/img/logo1.ico',
    '/img/arrow.webp',
    '/img/banner.webp',
    '/img/banner2.webp',
    '/img/bannerPerfil.webp',
    '/img/logo.webp',
    '/img/sol.webp',
    '/img/x.webp',
    '/img/lua.webp',
    '/img/menu.webp',
    '/img/formato-html.webp',
    '/img/perfil.webp',
    '/img/github.svg',
    '/img/javascript.svg',
    '/img/typescript.svg',
    '/img/styled-components.svg',
    '/img/react.svg',
];
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                const responseToCache = fetchResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return fetchResponse;
            });
        })
    );
});
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});
