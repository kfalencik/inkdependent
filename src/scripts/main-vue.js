import Vue from './vendor/vue';
import './vendor/swiped';

export default function() {
	new Vue({
		el: '#app',
		delimiters: ['${', '}'],
		data: {
			heroCurrentSlide: 1,
			heroTotalSlides: 0,
			heroInterval: null,
			heroSlideDirection: 'slide-up',
			contactName: '',
			contactEmail: '',
			contactSubject: '',
			contactMessage: '',
			contactConfirmation: '',
			contactError: '',
			scrollToTop: false,
			currentSection: 'hero',
			tattooAlbums: [],
			activeTattooAlbum: 0,
			tattooOverlay: false,
			activeTattooPicture: 0,
			staggerTattooAlbums: 0,
			menuStatus: false,
			year: 2020
		},
		mounted: function() {
			this.year = new Date().getFullYear();
			this.heroTotalSlides = document.querySelector('.hero').childElementCount - 2;
			this.initHeroSlider();

			let app = this;

			window.addEventListener('scroll', function() {
				app.getCurrentMenuLink();
			});

			document.querySelector('.hero').addEventListener('swiped-right', function(){
				app.changeSlide(app.heroCurrentSlide - 1);
			});

			document.querySelector('.hero').addEventListener('swiped-left', function(){
				app.changeSlide(app.heroCurrentSlide + 1);
			});

			// Facebook API
			setTimeout(function(){
				FB.init({
					appId: '1700806313540957',
					xfbml: true,
					version: 'v3.2'
				});
	
				FB.api(
					'/inkdependenttattoos?fields=albums.limit(50){name,count,cover_photo{source},photos{source}}&access_token=EAAe39aH7hokBAIZAaXIjr6yIvAZBZBvnZBi6vJvrRjsyh3knyfKH1E7zkmnYrWB45G3OaqK5MbqRHngfTKu25JKChaJP8uEwDXAC6SO7CjS6PZB9yRPh95lGqvXQy1ZCRsW5Aks7qF7l1WDaciQn8ZAXjZCvsdCumdWM6koVtKYMHgZDZD',
					function(response) {
						let albums = response.albums.data;
						albums.forEach(function(album) {
							if (album.id === '10161284757175582') {
								// Marcin 2019
								album.name = 'Marcin';
								album.order = 0;
								album.instagram = 'https://www.instagram.com/marcinptak_tattoo';
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10160033361505582') {
								// Marek 2018
								album.name = 'Marek';
								album.instagram = 'https://www.instagram.com/marekskalny_art';
								album.order = 1;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10153556071625582') {
								// Daniel
	
								album.instagram = 'https://www.instagram.com/danielbacz';
								album.order = 2;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10156539880325582') {
								// Wojtek
	
								album.instagram = 'https://www.instagram.com/alternative_bodyart_by_wojtek';
								album.order = 3;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10159146265255582') {
								// Gzy
	
								album.name = 'Gzy Ex Silesia';
								album.instagram = 'https://www.instagram.com/gzyexsilesia';
								album.order = 4;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10160843000760582') {
								// Karol
	
								album.name = 'Karol';
								album.instagram = 'https://www.instagram.com/charlie__lame';
								album.order = 5;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10160543615490582') {
								// Sofia
	
								album.name = 'Sofia';
								album.instagram = 'https://www.instagram.com/pochiehuntie';
								album.order = 6;
								app.tattooAlbums.push(album);
							}
	
							if (album.id === '10158468256865582') {
								// Ash
	
								album.name = 'Ash';
								album.instagram = 'https://www.instagram.com/achristieart';
								album.order = 7;
								app.tattooAlbums.push(album);
							}
	
	
						});
	
						app.tattooAlbums.sort((a, b) => (a.order > b.order) ? 1 : -1);
	
						setInterval(function() {
							if (app.staggerTattooAlbums < app.tattooAlbums.length) {
								app.staggerTattooAlbums++;
							}
						}, 500);
	
					}
				);
			}, 1000);

			
		},
		methods: {
			initHeroSlider: function() {
				let app = this;
				clearInterval(app.heroInterval);
				app.heroInterval = setInterval(function() {
					app.heroSlideDirection = 'slide-right';
					if (app.heroCurrentSlide === app.heroTotalSlides) {
						app.heroCurrentSlide = 1;
					} else {
						app.heroCurrentSlide++;
					}
				}, 8000);
			},
			toggleMenu: function(){
				this.menuStatus = !this.menuStatus;
			},
			changeSlide: function(slide) {
				if (slide < this.heroCurrentSlide) {
					this.heroSlideDirection = 'slide-left';
				} else {
					this.heroSlideDirection = 'slide-right';
				}

				if (slide > this.heroTotalSlides) {
					slide = 1;
				}

				if (slide === 0) {
					slide = this.heroTotalSlides;
				}

				this.heroCurrentSlide = slide;
				this.initHeroSlider();
			},
			getCurrentMenuLink: function() {
				if (window.pageYOffset > 0) {
					this.scrollToTop = true;
				} else {
					this.scrollToTop = false;
				}

				let app = this;

				const sections = document.querySelectorAll('section');
				let currentScroll = window.pageYOffset;

				sections.forEach(function(section) {
					let sectionPosition = section.offsetTop;
					if (currentScroll + 100 > sectionPosition) {
						app.currentSection = section.getAttribute('id');
					}
				});
			},
			openTattooAlbum: function(album) {
				this.activeTattooAlbum = album;
				this.tattooOverlay = true;
				this.activeTattooPicture = 0;
			},
			closeTattooAlbum: function() {
				this.tattooOverlay = false;
			},
			changeTattooPicture: function(picture) {
				this.tattooOverlay = true;
				this.activeTattooPicture = picture;
			},
			sendEmail: function(event) {
				event.preventDefault();

				if (this.contactEmail !== '' && this.contactSubject !== '' && this.contactMessage !== '' && this.contactName != '') {
					let myform = document.querySelector('#contact-form');
					let service_id = "default_service";
					let template_id = "template_0FUSa2lo";

					emailjs.sendForm(service_id,template_id,myform).then(function(){ 
						//alert("Sent!");
					}, function(err) {
						//alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
					});

					this.contactMessage = '';
					this.contactName = '';
					this.contactEmail = '';
					this.contactSubject = '';

					this.contactError = '';
					this.contactConfirmation = 'Thank you for your message! We will be in touch as soon as possible.';
				} else {
					this.contactError = 'Please fill in all fields and try again.';
					this.contactConfirmation = '';
				}

			}
		}
	});
}
