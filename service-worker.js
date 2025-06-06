self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('fitness99-cache').then(function(cache) {
      const days = Array.from({ length: 500 }, (_, i) => `day.html?day=${i+1}`);
      return cache.addAll([
        'index.html',
        'goals.html',
        'day.html',
        'manifest.json',
        'service-worker.js',
        ...days
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
