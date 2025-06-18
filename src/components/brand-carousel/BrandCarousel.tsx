import { component$, useVisibleTask$, useSignal, $ } from '@builder.io/qwik';
import { gsap } from 'gsap';

export default component$(() => {
	const carouselRef = useSignal<HTMLDivElement>();
	const itemCount = 8;
	const itemWidth = 220;
	const currentIndex = useSignal(0);

	// Autoplay and loop
	useVisibleTask$(({ cleanup }) => {
		const interval = setInterval(() => {
			currentIndex.value = (currentIndex.value + 1) % itemCount;
			if (carouselRef.value) {
				gsap.to(carouselRef.value, {
					x: -currentIndex.value * itemWidth,
					duration: 0.5,
					ease: 'power2.out',
				});
			}
		}, 3000); // Change slide every 3 seconds
		// If at the last slide, instantly reset to the first slide for seamless looping
		if (currentIndex.value === itemCount - 1) {
			setTimeout(() => {
				if (carouselRef.value) {
					gsap.set(carouselRef.value, { x: 0 });
				}
				currentIndex.value = 0;
			}, 500); // Wait for the slide animation to finish
		}
		cleanup(() => clearInterval(interval));
	});

	const scrollToIndex = $((index: number) => {
		currentIndex.value = (index + itemCount) % itemCount; // Loop
		if (carouselRef.value) {
			gsap.to(carouselRef.value, {
				x: -currentIndex.value * itemWidth,
				duration: 0.5,
				ease: 'power2.out',
			});
		}
	});

	return (
		<div class="relative w-full overflow-hidden">
			<button
				class="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow rounded"
				onClick$={() => scrollToIndex(currentIndex.value - 1)}
			>
				Prev
			</button>
			<div class="overflow-hidden w-full">
				<div
					ref={carouselRef}
					class="flex transition-transform"
					style={{ width: `${itemCount * itemWidth}px` }}
				>
					{[...Array(itemCount)].map((_, index) => (
						<div
							key={index}
							class="border rounded-lg shadow-lg mx-2"
							style={{ width: `${itemWidth - 16}px`, minWidth: `${itemWidth - 16}px` }}
						>
							<img
								src={`/eniko-kis.jpg`}
								alt={`Product ${index + 1}`}
								class="w-full rounded-t-lg object-cover"
								width={200}
								height={120}
							/>
							<div class="flex flex-col p-2 items-start">
								<h3 class="text-lg font-medium">Product {index + 1}</h3>
								<p class="text-gray-600">$19.99</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<button
				class="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow rounded"
				onClick$={() => scrollToIndex(currentIndex.value + 1)}
			>
				Next
			</button>
		</div>
	);
});
