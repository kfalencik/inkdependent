import Vue from './vendor/vue';
import {emailSend, emailAjaxPost, emailAjax, emailCreateCORSRequest} from './vendor/smtp';

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

			// Facebook API

			window.fbAsyncInit = function() {
				FB.init({
					appId: '1700806313540957',
					xfbml: true,
					version: 'v3.2'
				});

				FB.api(
					'/inkdependenttattoos?fields=albums.limit(50){name,count,cover_photo{source}, photos{source}}&access_token=1700806313540957|zFZcPCz9esyC1su57MnuDsLtRwg',
					function(response) {
						let albums = response.albums.data;
						albums.forEach(function(album) {
							if (album.id === '10161284757175582') {
								// Marcin 2019
								album.name = 'Marcin';
								album.order = 0;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10160033361505582') {
								// Marek 2018
								album.name = 'Marek';
								album.order = 1;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10153556071625582') {
								// Daniel

								album.order = 2;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10156539880325582') {
								// Wojtek

								album.order = 3;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10159146265255582') {
								// Gzy

								album.name = 'Gzy Ex Silesia';
								album.order = 4;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10160843000760582') {
								// Karol

								album.name = 'Karol';
								album.order = 5;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10160543615490582') {
								// Sofia

								album.name = 'Sofia';
								album.order = 6;
								app.tattooAlbums.push(album);
							}

							if (album.id === '10158468256865582') {
								// Ash

								album.name = 'Ash';
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
			};
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
					emailSend({
						Host : 'smtp.elasticemail.com',
						Username : 'kfalencik@gmail.com',
						Password : 'e6b6b50b-415b-4cdf-8dd6-72f774eef952',
						To : 'kfalencik@gmail.com',
						From : 'kfalencik@gmail.com',
						Subject : this.contactSubject,
						Body : `Message from: ${this.contactName}, ${this.contactEmail} - ${this.contactMessage}`
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
