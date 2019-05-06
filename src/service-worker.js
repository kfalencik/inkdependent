self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('inkdependent').then(function(cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./images/logo.png'
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
