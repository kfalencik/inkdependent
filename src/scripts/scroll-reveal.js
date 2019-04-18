import scrollReveal from './vendor/scrollreveal';

export default function() {
	scrollReveal().reveal('.about p', { cleanup: true, delay: 1000, duration: 1000, distance: '250px', origin: 'bottom', interval: 300 });
	scrollReveal().reveal('.artists .artists__item:nth-child(2n + 1)', { cleanup: true, delay: 1000, duration: 1000, distance: '50px', origin: 'bottom', interval: 300 });
	scrollReveal().reveal('.artists .artists__item:nth-child(2n + 2)', { cleanup: true, delay: 1000, duration: 1000, distance: '50px', origin: 'top', interval: 300 });
	scrollReveal().reveal('.contact .h2, .social .h2, .artists .h2, .about .h2', { cleanup: true, delay: 500, duration: 1000, distance: '250px', origin: 'top', interval: 300 });
	scrollReveal().reveal('.contact p', { cleanup: true, delay: 500, duration: 1000, distance: '250px', origin: 'left', interval: 300 });
	scrollReveal().reveal('.contact input, .contact textarea, .contact button', { cleanup: true, delay: 1000, duration: 1000, distance: '250px', origin: 'top', interval: 300 });
	scrollReveal().reveal('.contact p, .social p', { cleanup: true, delay: 500, duration: 1000, distance: '250px', origin: 'left', interval: 300 });
	scrollReveal().reveal('.social a', { cleanup: true, delay: 1000, duration: 1000, distance: '250px', origin: 'right', interval: 300 });
	scrollReveal().reveal('.tattoo .row', { cleanup: true, delay: 500, duration: 1000, distance: '50px', origin: 'bottom', interval: 300 });
	scrollReveal().reveal('.tattoo .tattoo__item:nth-child(2n + 2)', { cleanup: true, delay: 5000, duration: 1000, distance: '50px', origin: 'top', interval: 300 });
}


