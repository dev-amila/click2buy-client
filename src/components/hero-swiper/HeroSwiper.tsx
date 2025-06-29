import { component$, useVisibleTask$ } from '@qwik.dev/core';
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

	const bannerData = [
		{
			id: 1,
			image: '/banner1.png',
			imageMobile: '/banner-mobile1.png',
			alt: 'Banner 1',
			link: '',
		},
		{
			id: 2,
			image: '/banner2.png',
			imageMobile: '/banner-mobile2.png',
			alt: 'Banner 2',
			link: '',
		},
		{
			id: 3,
			image: '/banner3.png',
			imageMobile: '/banner-mobile3.png',
			alt: 'Banner 3',
			link: '',
		},
	];

	return (
		<div class="swiper">
			<div class="swiper-wrapper ">
				{bannerData.map((banner) => (
					<div key={banner.id} class="swiper-slide">
						<div class="md:m-4">
							<picture>
								<source media="(max-width: 767px)" srcset={banner.imageMobile} />
								<img
									src={banner.image}
									alt={banner.alt}
									class="w-full md:rounded-2xl"
									style={{ width: '100%' }}
									width={1920}
									height={1080}
								/>
								{/* <img
									src={banner.image}
									alt={banner.alt}
									srcset={`${banner.image.replace('.png', '-400.webp')} 400w,
											${banner.image.replace('.png', '-800.webp')} 800w,
											${banner.image.replace('.png', '-1200.webp')} 1200w`}
									sizes="(max-width: 640px) 400px,
									(max-width: 1024px) 800px,
									1200px"
									class="w-full md:rounded-2xl"
									style="width: 100%;"
								/> */}
							</picture>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
