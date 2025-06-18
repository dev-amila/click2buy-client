// import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
// import EmblaCarousel from 'embla-carousel';
// import Autoplay from 'embla-carousel-autoplay';
// // import 'embla-carousel/embla-carousel.css'; // Optional: Add your styles here or manually

// export default component$(() => {
// 	const emblaRef = useSignal<HTMLElement>();

// 	const promoMessages = [
// 		{ id: 1, message: 'Free Shipping On Orders Over 5000 LKR' },
// 		{ id: 2, message: 'Shop More, Save More: Free Shipping Over $100!' },
// 		{ id: 3, message: 'Buy One, Get One 50% Off!' },
// 		{ id: 4, message: 'Limited Edition Release – Shop Now!' },
// 		{ id: 5, message: 'Holiday Sale – Up to 60% Off!' },
// 	];

// 	useVisibleTask$(() => {
// 		if (emblaRef.value) {
// 			const options = { loop: true, speed: 500, autoplay: true, delay: 0 };
// 			const plugins = [Autoplay()];

// 			EmblaCarousel(emblaRef.value, options, plugins);
// 		}
// 	});

// 	return (
// 		<div class="embla" ref={emblaRef}>
// 			<div class="embla__container" style="display: flex;">
// 				{promoMessages.map((promo) => (
// 					<div key={promo.id} class="embla__slide header-banner">
// 						{promo.message}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// });

import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default component$(() => {
	useVisibleTask$(() => {
		Swiper.use([Autoplay]);
		new Swiper('.swiper', {
			loop: true,
			slidesPerView: 1,
			//   spaceBetween: 16,
			// breakpoints: {
			// 	768: {
			// 		slidesPerView: 2,
			// 	},
			// 	1024: {
			// 		slidesPerView: 4,
			// 	},
			// },
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
		});
	});

	const promoMessages = [
		{ id: 1, message: 'Free Shipping On Orders Over 5000 LKR' },
		{ id: 2, message: 'Shop More, Save More: Free Shipping Over $100!' },
		{ id: 3, message: 'Buy One, Get One 50% Off!' },
		{ id: 4, message: 'Limited Edition Release – Shop Now!' },
		{ id: 5, message: 'Holiday Sale – Up to 60% Off!' },
	];

	return (
		<div class="swiper">
			<div class="swiper-wrapper  bg-orange-500 ">
				{promoMessages.map((promo) => (
					<div
						key={promo.id}
						class="swiper-slide  header-banner flex  items-center justify-center "
					>
						<div class="w-full flex  items-center justify-center">
							<span class="font-roboto text-gray-800">{promo.message}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
