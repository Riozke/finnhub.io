self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("stock-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
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
  const data = event.data ? event.data.text() : "Alerta de Stock!";
  event.waitUntil(
    self.registration.showNotification("Stock Alert", {
      body: data,
      icon: "/icons/icon-192x192.png",
    })
  );
});
