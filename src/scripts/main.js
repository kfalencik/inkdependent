/* This is the starting point of the code, everything gets kicked off here */

'use strict';

import './vendor/polyfills';
import mainVue from './main-vue';
import scrollReveal from './scroll-reveal';

mainVue();
scrollReveal();

mapboxgl.accessToken = 'pk.eyJ1Ijoia2ZhbGVuY2lrIiwiYSI6Im5KTlFLZjQifQ._3v1pa90DdSiutiwCiIccg';

let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/kfalencik/cjumgmouk05dg1fmx9xw1c6hp',
	center: [-3.2179, 55.9446],
	zoom: 16.7
});

map.on('load', function () {
	map.loadImage('./images/marker.png', function(error, image) {
		if (error) {
			throw error;
		}

		map.addImage('custom-marker', image);
		map.addLayer({
			id: 'markers',
			type: 'symbol',
			/* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
			source: {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'Point',
							coordinates: [-3.2179037, 55.9446]
						}
					}]
				}
			},
			layout: {
				'icon-image': 'custom-marker',
			}
		});
	});
});

map.scrollZoom.disable();

