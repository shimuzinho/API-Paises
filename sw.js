import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const pageCache = new CacheFirst({
    cacheName: 'PWA-PAISES',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200]
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
        })
    ]
});

warmStrategyCache({
    urls: ['/', '/index.html'],
    strategy: pageCache
});

registerRoute(({ request }) => request.mode == 'navigate', pageCache);

registerRoute(({ request }) => ['script', 'style', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
        cacheName: 'ASSETS-PAISES',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

const imageCache = new CacheFirst({
    cacheName: 'IMAGE-PAISES',
    plugins: [
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
        })
    ]
});

registerRoute(({ request }) => request.destination == 'image', imageCache);

offlineFallback({
    pageFallback: '/offline.html'
});