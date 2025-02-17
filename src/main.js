import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
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
		
		observeElements({ selector: '.js-hero-counter', threshold: 1, delay: 800}, startCounter);
		observeElements({ selector: '.js-counter', threshold: 1}, startCounter);
		observeElements({ selector: '.js-values-cards', threshold: .95 }, animatedValuesCards);
		observeElements({ selector: '.js-hero-cards', threshold: .2, delay: 200 }, animatedHeroCards);
		observeElements({ selector: '.js-targeting-socials', threshold: .3, delay: 600 }, animatedTargetingSocials);
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
			speed: 2000,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
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
			slidesPerView: 'auto',
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
			collapse.addEventListener('show.bs.collapse', () => {
				items[index].classList.add('active');

				if (texts[index].classList.contains('active')) {
					return;
				}

				texts.forEach(text => text.classList.remove('active'));
				texts[index].classList.add('active');
			});

			collapse.addEventListener('hide.bs.collapse', () => {
				items[index].classList.remove('active');
			});
		});

		texts.forEach((text, index) => {
			text.addEventListener('click', () => {
				const collapseEl = accordionCollapses[index];
		
				let bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
				if (bsCollapse) {
					bsCollapse.toggle();
				} else {
					bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: true });
				}

				if (window.innerWidth < 992) {
					setTimeout(() => {
						const header = document.querySelector('header');
						const headerHeight = header ? header.offsetHeight : 0;
						const parentItem = collapseEl.closest('.accordion-item');

						if (parentItem) {
							const elementPosition = parentItem.getBoundingClientRect().top + window.scrollY;
							const offsetPosition = elementPosition - headerHeight - 20;
	
							window.scrollTo({
								top: offsetPosition,
								behavior: 'smooth'
							});
						}
					}, 500);
				}
			});
		});
	}

	const roadmap = document.querySelector('.js-roadmap');

	if (roadmap) {
		function initCycle() {
			const isMobile = window.innerWidth < 992;
			let intervals, totalSteps;

			if (isMobile) {
				totalSteps = 6;
				intervals = [3000, 2000, 2000, 2000, 4000, 2000];
			} else {
				totalSteps = 10;
				intervals = [3000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 4000, 2000];
			}

			return cycleClass(roadmap, intervals, totalSteps);
		}

		function cycleClass(element, intervals, totalSteps) {
			let step = 1;
			let timerId = null;

			function updateStep() {
				for (let i = 1; i <= totalSteps; i++) {
					element.classList.remove(`step_${i}`);
				}

				element.classList.add(`step_${step}`);
				const currentInterval = intervals[step - 1] !== undefined ? intervals[step - 1] : 1000;
				step = (step % totalSteps) + 1;
				timerId = setTimeout(updateStep, currentInterval);
			}

			updateStep();

			return {
				stop: function () {
					clearTimeout(timerId);
				}
			};
		}

		let roadmapCycle = initCycle();

		window.addEventListener('resize', () => {
			roadmapCycle.stop();
			roadmapCycle = initCycle();
		});
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
			speed: 2000,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
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
	
	const sidebarNav = document.querySelector('.js-sidebar-nav');

	if (sidebarNav) {
		const items = sidebarNav.querySelectorAll('.sidebar__menu-item_submenu');

		items.forEach((item) => {
			item.addEventListener('click', () => {
				item.classList.toggle('active');
			});
		});
	}

	function observeElements(
		{
		  selector,
		  threshold = 0.5,
		  delay = 0,
		  root = null,
		  rootMargin = '0px'
		},
		callback
	  ) {
		const elements = document.querySelectorAll(selector);
		const observerOptions = { threshold, root, rootMargin };
	  
		const observer = new IntersectionObserver((entries, observerInstance) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					if (delay > 0) {
						setTimeout(() => {
							callback(entry, observerInstance);
						}, delay);
					} else {
						callback(entry, observerInstance);
					}
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
		const duration = 5000;
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
			}, index * 500);
		});
	}
	
	function animatedHeroCards(entry, observer) {
		observer.unobserve(entry.target);
		
		const cards = document.querySelectorAll('.js-hero-card');
		const width = window.innerWidth;
		let sortedCards = [];
	  
		const customOrderMobileSmall = [0, 1, 5, 2, 4, 6, 3, 7];
		const customOrderMobileLarge = [0, 4, 2, 5, 3, 6, 1, 7];
	  
		if (width < 992) {
		  	sortedCards = customOrderMobileSmall.map(i => cards[i]);
		} else if (width < 1320) {
		  	sortedCards = customOrderMobileLarge.map(i => cards[i]);
		} else {
		  	sortedCards = Array.from(cards);
		}
	  
		sortedCards.forEach((card, index) => {
			setTimeout(() => {
				card.classList.add('animated');
			}, index * 500);
		});
	}	  
	
	function animatedTargetingSocials(entry, observer) {
		observer.unobserve(entry.target);
		
		const cards = document.querySelectorAll('.js-targeting-social');
		
		cards.forEach((card, index) => {
			setTimeout(() => {
				card.classList.add('animated');
			}, index * 1000);
		});
	}

	function initScrollTo() {
		const scrollLinks = document.querySelectorAll('.js-scrollTo');
		
		scrollLinks.forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
			
				const targetSelector = this.getAttribute('href');
				const targetElement = document.querySelector(targetSelector);
				if (!targetElement) return;
			
				const header = document.querySelector('header');
				const headerHeight = header ? header.offsetHeight : 0;
			
				const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - headerHeight;
			
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			});
		});
	}

	initScrollTo();

	function scrollToAnchor() {
		const hash = window.location.hash;

		if (hash) {
			const targetElement = document.querySelector(hash);
			if (!targetElement) return;
		
			const header = document.querySelector('header');
			const headerHeight = header ? header.offsetHeight : 0;
		
			const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - headerHeight;
		
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
	
	setTimeout(scrollToAnchor, 400);
});