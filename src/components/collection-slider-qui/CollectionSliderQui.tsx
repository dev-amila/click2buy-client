import { component$, useContext, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { Carousel } from '@qwik-ui/headless';
import { APP_STATE } from '~/constants';
import { Collection } from '~/generated/graphql';
import CollectionCardSlider from '../collection-card-slider/CollectionCardSlider';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;

	const isAutoplaySig = useSignal(false);

	const slidesPerView = useSignal(6);

	useVisibleTask$(() => {
		isAutoplaySig.value = true;
	});

	useVisibleTask$(() => {
		const updateSlidesPerView = () => {
			const width = window.innerWidth;
			if (width >= 1024) slidesPerView.value = 6;
			else if (width >= 768) slidesPerView.value = 4;
			else slidesPerView.value = 2;
		};

		updateSlidesPerView(); // set on load
		window.addEventListener('resize', updateSlidesPerView);

		return () => window.removeEventListener('resize', updateSlidesPerView);
	});

	return (
		<>
			<Carousel.Root
				class="carousel-root"
				slidesPerView={slidesPerView.value}
				autoPlayIntervalMs={2500}
				bind:autoplay={isAutoplaySig}
				rewind={true}
			>
				<div class=" hidden sm:flex z-10 relative cursor-pointer w-full justify-between items-center mb-4">
					<Carousel.Previous>
						<span class="absolute  left-0 top-20 transform -translate-y-1/2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</span>
					</Carousel.Previous>
					<Carousel.Next>
						<span class="absolute  right-0 top-20 transform -translate-y-1/2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</span>
					</Carousel.Next>
				</div>
				<Carousel.Scroller class="carousel-scroller">
					{collections.map((data: Collection) => (
						<Carousel.Slide key={data.id} class="carousel-slide">
							<CollectionCardSlider collection={data} />
						</Carousel.Slide>
					))}
				</Carousel.Scroller>
			</Carousel.Root>
		</>
	);
});
