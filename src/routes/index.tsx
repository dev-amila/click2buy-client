import { component$ } from '@qwik.dev/core';
import HeroSwiper from '~/components/hero-swiper/HeroSwiper';

import AdBanners from '~/components/ad-banners/AdBanners';
import CollectionSliderQui from '~/components/collection-slider-qui/CollectionSliderQui';
import RecommendedProducts from '~/components/recommended-products/RecommendedProducts';
import TopSellings from '~/components/top-sellings/TopSellings';

export default component$(() => {
	return (
		<div>
			<section class="xl:max-w-7xl xl:mx-auto xl:px-8">
				<HeroSwiper />
				<div class="mt-4 flow-root">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
								<h2 class="sub-title">{$localize`Shop by Category`}</h2>
							</div>
							{/* <div class="grid w-full justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8"> */}
							{/* <div class="swiper" ref={swiperRef}>
									<div class="swiper-wrapper ">
										{collections.map((collection) =>
											collection.featuredAsset ? (
												<div key={collection.id} class="swiper-slide">
													<CollectionCard collection={collection} />
												</div>
											) : null
										)}
									</div>
								</div> */}
							{/* <div class=""> */}
							{/* {collections.map((collection ) =>
									// <div  key={collection.id} class="w-full flex justify-center items-center">
									// 	<h1>{collection.message}</h1>
									// </div>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : // <div key={collection.id}>{collection.name}</div>
									null
								)} */}
							{/* </div>  */}

							<div class="w-full">
								<CollectionSliderQui />
								<TopSellings />
								<div class="flex flex-col-reverse md:flex-col ">
									<AdBanners />
									<RecommendedProducts />
								</div>
								{/* <BrandCarousel /> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
});
