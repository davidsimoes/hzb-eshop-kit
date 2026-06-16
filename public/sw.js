// Service worker disabled. Previously this was a cache-first SW that served a stale
// app shell pointing at deleted hashed bundles after each deploy, so returning
// visitors got broken/blank pages. This version self-unregisters and clears all
// caches so any client still controlled by the old SW recovers immediately.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) { /* noop */ }
    try { await self.registration.unregister(); } catch (e) { /* noop */ }
    const clients = await self.clients.matchAll();
    clients.forEach((client) => client.navigate(client.url));
  })());
});
// No fetch handler: requests go straight to the network.
