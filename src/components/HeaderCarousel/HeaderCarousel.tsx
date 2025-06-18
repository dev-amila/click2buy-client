import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
	// useStyles$(styles);

	const isAutoplaySig = useSignal(false);

	useVisibleTask$(() => {
		isAutoplaySig.value = true;
	});

	// const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];
	const promoMessages = [
		{ id: 1, message: 'Free Shipping On Orders Over 5000 LKR' },
		{ id: 2, message: 'Shop More, Save More: Free Shipping Over $100!' },
		{ id: 3, message: 'Buy One, Get One 50% Off!' },
		{ id: 4, message: 'Limited Edition Release – Shop Now!' },
		{ id: 5, message: 'Holiday Sale – Up to 60% Off!' },
	];

	return (
		<>
			<Carousel.Root
				class="carousel-root bg-orange-500 text-white text-center text-sm  p-1"
				gap={0}
				autoPlayIntervalMs={3000}
				bind:autoplay={isAutoplaySig}
				rewind={true}
			>
				<Carousel.Scroller class="carousel-scroller mx-auto">
					{promoMessages.map((promo) => (
						<Carousel.Slide key={promo.id} class="carousel-slide secondary">
							{promo.message}
						</Carousel.Slide>
					))}
				</Carousel.Scroller>
			</Carousel.Root>
		</>
	);
});
// internal
// import styles from './carousel.css?inline';
