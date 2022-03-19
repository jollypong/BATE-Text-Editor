import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Import the expiration plugin
import { ExpirationPlugin } from 'workbox-expiration';

//pre-cache manifest
precacheAndRoute(self.__WB_MANIFEST);

//variables for registerRoute
const cacheName = 'static-resources';

// cache style/script files 
const matchCallback = ({ request }) => {
    console.log(request);
    return (
        // CSS
        request.destination === 'style' ||
        // JavaScript
        request.destination === 'script' ||
        // images (logo)
        request.destination === 'image'
    );
};

registerRoute(
    // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
    matchCallback,
    ({ request }) => ['style', 'script', 'image'].includes(request.destination),
    new CacheFirst({
        // Name of the cache storage.
        cacheName: 'asset-cache',
        plugins: [
            // This plugin will cache responses with these headers to a maximum-age of 30 days
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ],
    })
);
