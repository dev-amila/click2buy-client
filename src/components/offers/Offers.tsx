// import { $, component$, useVisibleTask$, useStore, useTask$ } from '@builder.io/qwik';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';
// import { SearchResponse } from '~/generated/graphql';
// import { FacetWithValues } from '~/types';
// import { searchQueryWithCollectionSlug } from '~/providers/shop/products/products';
// import ProductCard from '../products/ProductCard';

// export default component$(() => {
//     useVisibleTask$(() => {
//         gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//         if (typeof window !== 'undefined') {
//             let fadeInAnimated = false;
//             let zoomInAnimated = false;

//             ScrollTrigger.create({
//                 trigger: '.fade-in',
//                 start: 'top 60%',
//                 toggleActions: 'play none none reverse',
//                 onEnter: () => {
//                     if (!fadeInAnimated) {
//                         gsap.from('.fade-in > div', {
//                             opacity: 0,
//                             y: 30,
//                             duration: 0.3,
//                             stagger: 0.2,
//                         });
//                         fadeInAnimated = true;
//                     }
//                 },
//             });
//             ScrollTrigger.create({
//                 trigger: '.zoom-in',
//                 start: 'top 60%',
//                 toggleActions: 'play none none reverse',
//                 onEnter: () => {
//                     if (!zoomInAnimated) {
//                         gsap.from('.zoom-in', {
//                             scale: 0.5,
//                             opacity: 0,
//                             duration: 0.3,
//                             ease: 'power2.out',
//                         });
//                         zoomInAnimated = true;
//                     }
//                 },
//             });
//         }
//     });

//     // product load logic goes here

//     // const searchSignal =
//     const state = useStore<{
//         showMenu: boolean;
//         search: SearchResponse | null;
//         facedValues: FacetWithValues[];
//         facetValueIds: string[];
//     }>({
//         showMenu: false,
//         search: null,
//         facedValues: [],
//         facetValueIds: [],
//     });

//     // Use an empty string or undefined to fetch all products
//     const fetchProducts = $(async (collectionSlug?: string) => {
//         const search = await searchQueryWithCollectionSlug(collectionSlug);
//         state.search = search;
//     });

//     useTask$(async () => {
//         // Pass undefined or '' to fetch all products
//         await fetchProducts();
//     });

//     const products = state.search?.items ?? [];

//     return (
//         <div class="flex mt-4">
//             <div class="w-full">
//                 <h2 class="text-2xl  font-bold mb-4">Recommended Products</h2>
//                 <div class="flex flex-col pt-4 md:flex-row md:gap-0 gap-4">
//                     <div class="flex-none  bg-gray-100  shadow-sm mr-6">
//                         <img
//                             src={`./assets/images/advertiesment/flashsale-min.png`}
//                             alt={`Product `}
//                             class="w-full rounded-lg h-full  zoom-in object-cover"
//                             width={200}
//                             height={200}
//                         />
//                     </div>
//                     <div class=" flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  fade-in">
//                         {products.slice(0, 8).map((item) => (
//                             <ProductCard
//                                 collection={
//                                     'Recommended'
//                                 }
//                                 key={item.productId}
//                                 productAsset={item.productAsset}
//                                 productName={item.productName}
//                                 slug={item.slug}
//                                 priceWithTax={item.priceWithTax}
//                                 currencyCode={item.currencyCode}
//                             ></ProductCard>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// });
