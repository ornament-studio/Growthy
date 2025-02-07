import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import svg4everybody from 'svg4everybody';
import './style.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

svg4everybody();

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function() {
		document.body.classList.add("loaded");
		// console.log("Ready!");

		observeElements({ selector: '.js-counter', threshold: 1 }, startCounter);
		observeElements({ selector: '.js-values-cards', threshold: .95 }, animatedValuesCards);
		observeElements({ selector: '.js-hero-cards', threshold: .95 }, animatedHeroCards);
	}, 1000);

	Swiper.use([Autoplay, Navigation, Pagination]);

	const blogSlider = document.querySelector('.js-blog-slider');

	if (blogSlider) {
		const slider = blogSlider.querySelector('.swiper');
		const pagination = blogSlider.querySelector('.swiper-pagination');

		const swiper = new Swiper(slider, {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			speed: 400,
			pagination: {
				el: pagination,
				clickable: true,
				dynamicBullets: true
			},
		});
	}

	const reviewsSlider = document.querySelector('.js-reviews-slider');

	if (reviewsSlider) {
		const slider = reviewsSlider.querySelector('.swiper');
		const pagination = reviewsSlider.querySelector('.swiper-pagination');

		const swiper = new Swiper(slider, {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			speed: 400,
			pagination: {
				el: pagination,
				clickable: true,
				dynamicBullets: true
			},
		});
	}

	const clientsSlider = document.querySelector('.js-clients-slider');

	if (clientsSlider) {
		const slider = clientsSlider.querySelector('.swiper');

		const swiper = new Swiper(slider, {
			slidesPerView: 'auto',
			spaceBetween: 50,
			allowTouchMove: false,
			loop: true,
			speed: 3000,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
				reverseDirection: true
			},
		});
	}

	const runlineSlider = document.querySelector('.js-runline-slider');

	if (runlineSlider) {
		const slider = runlineSlider.querySelector('.swiper');

		const swiper = new Swiper(slider, {
			slidesPerView: 'auto',
			spaceBetween: 60,
			allowTouchMove: false,
			loop: true,
			speed: 10000,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
			},
			breakpoints: {
				480: {
					spaceBetween: 80,
				},
				768: {
					spaceBetween: 100,
				},
				992: {
					spaceBetween: 120,
				},
				1320: {
					spaceBetween: 140,
				}
			}
		});
	}

	const sloganBlock = document.querySelector('.js-slogan');

	if (sloganBlock) {
		const slogans = sloganBlock.dataset.slogans.split('|').map(s => s.trim());

		let sloganIndex = 0;
		let charIndex = 0;
		let currentText = "";
		let isDeleting = false;

		const typingSpeed = 75;
		const deletingSpeed = 25;
		const pauseAfterTyping = 3500;
		const pauseAfterDeleting = 1000;

		function typeSlogan() {
			const fullText = slogans[sloganIndex];

			if (!isDeleting) {
				currentText = fullText.substring(0, charIndex + 1);
				charIndex++;
				sloganBlock.textContent = currentText;

				if (currentText === fullText) {
					isDeleting = true;
					setTimeout(typeSlogan, pauseAfterTyping);
					return;
				}

				setTimeout(typeSlogan, typingSpeed);
			} else {
				currentText = fullText.substring(0, charIndex - 1);
				charIndex--;
				sloganBlock.textContent = currentText;

				if (currentText === "") {
					isDeleting = false;
					sloganIndex = (sloganIndex + 1) % slogans.length;
					setTimeout(typeSlogan, pauseAfterDeleting);
					return;
				}

				setTimeout(typeSlogan, deletingSpeed);
			}
		}

		typeSlogan();
	}

	const results = document.querySelector('.js-results');

	if (results) {
		const items = document.querySelectorAll('.results__item');
		const texts = document.querySelectorAll('.results__detail');

		items.forEach((item, index) => {
			item.addEventListener('click', () => {
				if (item.classList.contains('active')) {
					return;
				}

				items.forEach(i => i.classList.remove('active'));
				item.classList.add('active');

				texts.forEach(text => text.classList.remove('active'));
				texts[index].classList.add('active');
			});
		});
	}

	const cooperation = document.querySelector('.js-cooperation');

	if (cooperation) {
		const accordionCollapses = cooperation.querySelectorAll('.accordion .accordion-collapse');
		const items = cooperation.querySelectorAll('.accordion-item');
		const texts = cooperation.querySelectorAll('.cooperation__item');

		accordionCollapses.forEach((collapse, index) => {
			collapse.addEventListener('shown.bs.collapse', () => {
				items[index].classList.add('active');

				if (texts[index].classList.contains('active')) {
					return;
				}

				texts.forEach(text => text.classList.remove('active'));
				texts[index].classList.add('active');
			});

			collapse.addEventListener('hidden.bs.collapse', () => {
				items[index].classList.remove('active');
			});
		});
	}

	const roadmap = document.querySelector('.js-roadmap');

	if (roadmap) {
		const intervals = [
			3000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 4000, 2000,
		];

		function cycleClass(element, intervals) {
			let step = 1;
			const totalSteps = 10;

			function updateStep() {
				for (let i = 1; i <= totalSteps; i++) {
					element.classList.remove(`step_${i}`);
				}

				element.classList.add(`step_${step}`);
				const currentInterval = intervals[step - 1] !== undefined ? intervals[step - 1] : 1000;
				step = (step % totalSteps) + 1;

				setTimeout(updateStep, currentInterval);
			}

			updateStep();
		}

		cycleClass(roadmap, intervals);
	}

	const casesSlider = document.querySelector('.js-cases-slider');

	if (casesSlider) {
		const slider = casesSlider.querySelector('.swiper');
		const navigationNext = casesSlider.querySelector('.swiper-button-next');
		const navigationPrev = casesSlider.querySelector('.swiper-button-prev');
		const pagination = casesSlider.querySelector('.swiper-pagination');

		const swiper = new Swiper(slider, {
			slidesPerView: "auto",
			spaceBetween: 20,
			loop: true,
			speed: 400,
			pagination: {
				el: pagination,
				clickable: true,
				dynamicBullets: true
			},
			navigation: {
				nextEl: navigationNext,
				prevEl: navigationPrev,
			},
		});
	}

	const service = document.querySelector('.js-service');

	if (service) {
		const accordionCollapses = service.querySelectorAll('.accordion .accordion-collapse');
		const items = service.querySelectorAll('.service__detail');

		accordionCollapses.forEach((collapse, index) => {
			collapse.addEventListener('shown.bs.collapse', () => {
				if (items[index].classList.contains('active')) {
					return;
				}

				items.forEach(text => text.classList.remove('active'));
				items[index].classList.add('active');
			});
		});
	}

	function observeElements({ selector, threshold = 0.5, root = null, rootMargin = '0px' }, callback) {
		const elements = document.querySelectorAll(selector);
		const observerOptions = { threshold, root, rootMargin };
	
		const observer = new IntersectionObserver((entries, observerInstance) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					callback(entry, observerInstance);
				}
			});
		}, observerOptions);
	
		elements.forEach(element => observer.observe(element));
		return observer;
	}
	
	function startCounter(entry, observer) {
		const counter = entry.target;
		const displaySpan = counter.querySelector('span') || counter;
		const targetValue = parseInt(counter.dataset.target, 10);
		const duration = 3000;
		let startTime = null;
	
		function animateValue(currentTime) {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / duration, 1);
			const currentValue = Math.floor(progress * targetValue);
			
			displaySpan.textContent = (targetValue >= 1000)
				? currentValue.toLocaleString('uk-UA')
				: currentValue;
		
			if (progress < 1) {
				window.requestAnimationFrame(animateValue);
			}
		}
		
		window.requestAnimationFrame(animateValue);
		observer.unobserve(counter);
	}

	function animatedValuesCards(entry, observer) {
		observer.unobserve(entry.target);
		
		const cards = document.querySelectorAll('.js-values-card');
		
		cards.forEach((card, index) => {
			setTimeout(() => {
				card.classList.add('animated');
			}, index * 200);
		});
	}
	
	function animatedHeroCards(entry, observer) {
		observer.unobserve(entry.target);
		
		const cards = document.querySelectorAll('.js-hero-card');
		
		cards.forEach((card, index) => {
			setTimeout(() => {
				card.classList.add('animated');
			}, index * 200);
		});
	}
});