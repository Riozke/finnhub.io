// src/service-worker.js
const CACHE_NAME = "stock-cache-v1";
const ASSETS_TO_CACHE = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Stock Alert";
  event.waitUntil(
    self.registration.showNotification("Stock Alert", {
      body: data,
    })
  );
});
