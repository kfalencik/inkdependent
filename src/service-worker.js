self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('inkdependent').then(function(cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./images/logo.png',
				'./images/logo-small.png',
				'./images/marker.png',
				'./styles/main.min.css',
				'./scripts/main.min.js',
				'./images/slideshow/slide-1.jpg',
				'./images/slideshow/slide-2.jpg',
				'./images/slideshow/slide-3.jpg',
				'./images/slideshow/slide-4.jpg',
				'./images/graphics/about-us.jpg',
				'./images/graphics/social.jpg',
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
