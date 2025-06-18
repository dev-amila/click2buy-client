import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
// import { APP_STATE } from '~/constants';

import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Collection } from '~/generated/graphql';
import CollectionCardSlider from '../collection-card-slider/CollectionCardSlider';

interface IProps {
	collections: Collection[];
}

export default component$(({ collections }: IProps) => {
	const swiperRef = useSignal<HTMLDivElement>();

	useVisibleTask$(() => {
		if (swiperRef.value && !swiperRef.value.classList.contains('swiper-initialized')) {
			new Swiper(swiperRef.value, {
				modules: [Autoplay],
				loop: true,
				slidesPerView: 6,
				breakpoints: {
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 6 },
				},
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
			});
		}
	});
	return (
		<div class="w-full flex justify-center items-center">
			<div class="swiper" ref={swiperRef}>
				<div class="swiper-wrapper">
					{collections.map((collection: Collection) =>
						collection.featuredAsset ? (
							<div key={collection.id} class="swiper-slide">
								<CollectionCardSlider collection={collection} />
							</div>
						) : null
					)}
				</div>
			</div>
		</div>
	);
});
