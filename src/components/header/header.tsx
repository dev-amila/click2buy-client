import { $, component$, useContext, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { Image } from 'qwik-image';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import MenuIcon from '../icons/MenuIcon';
import UserIcon from '../icons/UserIcon';
import SearchBar from '../search-bar/SearchBar';
import HeaderBanner from '../header-banner/HeaderBanner';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const isOpen = useSignal(false);
	const isAccountOpen = useSignal(false);
	const dropdownRef = useSignal<HTMLElement>();
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
			}
		}
	});

	useVisibleTask$(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
				isOpen.value = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const logout = $(async () => {
		await logoutMutation();
		// force hard refresh
		window.location.href = '/';
	});

	return (
		<div class={`bg-[#262261] shadow-xl sticky top-0 z-20`}>
			{/* <HeaderCarousel /> */}
			<HeaderBanner />
			<header>
				<div class="bg-zinc-100 text-gray-600 pt-4 pb-3 shadow-inner text-center text-sm   xl:px-0">
					<div class="max-w-6xl mx-auto h-5 min-h-full flex items-center justify-between my-1 px-4 sm:px-6">
						<div class="flex justify-between items-center w-full">
							<div class="flex w-full items-center gap-4">
								<div class="flex-1">
									<a href="/" class="text-gray-400 hover:text-gray-500">
										<Image
											alt="Logo"
											src="/logo.svg?w=300&h=100&format=webp"
											srcset="
												/logo.svg?w=150&h=100&format=webp 150w,
												/logo.svg?w=300&h=100&format=webp 300w
											"
											sizes="(min-width: 150px) 150px, 100vw"
											layout="constrained"
											style={{
												objectFit: 'cover',
												background: 'transparent',
												width: '100%',
												maxWidth: '150px',
											}}
											decoding="async"
											loading="lazy"
										/>
									</a>
								</div>
								<div class="flex-grow max-w-xl hidden md:block">
									<SearchBar />
								</div>
								<div class="flex-1 flex min-w-[220px] justify-end gap-2 sm:mr-[60px] 2xl:mr-0">
									<div class="ml-4 hidden md:flex">
										<button
											name="Cart"
											aria-label={`${totalQuantity} items in cart`}
											class="relative w-9 h-9 bg-gray-400 bg-opacity-20 rounded flex items-center justify-center text-white p-1"
											onClick$={() => (appState.showCart = !appState.showCart)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus text-orange-500 group-hover:text-white"
											>
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
												<path d="M12.5 17h-6.5v-14h-2" />
												<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
												<path d="M16 19h6" />
												<path d="M19 16v6" />
											</svg>
											{totalQuantity ? (
												<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
													{totalQuantity}
												</div>
											) : (
												''
											)}
										</button>
									</div>
									<div class="flex-none flex justify-end">
										<div
											onClick$={() => (isAccountOpen.value = !isAccountOpen.value)}
											class="inline-flex group gap-3 justify-center cursor-pointer py-2 text-sm text-black group-hover:text-orange-500"
										>
											<div class="flex items-center justify-end">
												<UserIcon />
												{appState.customer.firstName ? (
													<span class="text-base text-black font-normal mr-1">
														{appState.customer.firstName} {appState.customer.lastName}{' '}
													</span>
												) : (
													<span class="text-base text-black font-normal mr-1"></span>
												)}
											</div>
										</div>
										{isAccountOpen.value && (
											<>
												<div
													class="fixed inset-0 z-40 bg-transparent"
													onClick$={() => (isAccountOpen.value = false)}
												/>
												<div class="absolute right-0 z-50 top-[90%] mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
													<div class="py-1">
														<a
															href={
																appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
																	? '/account'
																	: '/sign-in'
															}
															class="block text-right px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
														>
															<div>
																{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
																	? $localize`My Account`
																	: $localize`Sign In`}
															</div>
														</a>
														{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
															<span
																onClick$={logout}
																class="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																<div class="flex items-center justify-end gap-1 text-sm cursor-pointer">
																	<div>{$localize`Logout`}</div>
																	<svg
																		fill="none"
																		height="24"
																		viewBox="0 0 24 24"
																		width="24"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
																			stroke="#374151"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																		/>
																	</svg>
																</div>
															</span>
														)}
													</div>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="max-w-6xl mx-auto py-4 flex items-center justify-between sm:gap-4 px-4 sm:px-6 lg:px-8">
					<button
						class="block sm:hidden text-white mr-4"
						onClick$={() => (appState.showMenu = !appState.showMenu)}
					>
						<span class="sr-only">Menu</span>
						<MenuIcon />
					</button>
					{/* <h1 class="text-white w-10">

						<a href="/">
							<img src={`/cube-logo-small.webp`} width={40} height={31} alt="Vendure logo" />
						</a>
					</h1> */}
					{/* <div class="hidden space-x-4 sm:block">
						{collections.map((collection) => (
							<a
								class="text-sm md:text-base text-gray-200 hover:text-white"
								href={`/collections/${collection.slug}`}
								key={collection.id}
							>
								{collection.name}
							</a>
						))}
					</div> */}
					<div class="relative   text-left hidden sm:block">
						<div class=" hidden sm:flex items-center justify-center " ref={dropdownRef}>
							<div class="relative inline-block">
								<button
									onClick$={() => (isOpen.value = !isOpen.value)}
									class="inline-flex group gap-3 justify-center w-full  shadow-sm pr-4 py-2 text-sm  text-white group-hover:text-orange-500"
								>
									All Categories
								</button>
							</div>
							<a href="/shop/electronics" class="text-white text-sm">
								Offers
							</a>

							{isOpen.value && (
								<div class="absolute left-0 top-[100%] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
									<div class="py-1">
										{collections.map((collection) => (
											<a
												class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												href={`/collections/${collection.slug}`}
												key={collection.id}
											>
												{collection.name}
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
					<div class="flex-1 flex md:hidden max-w-xs sm:max-w-none md:ml-auto">
						<SearchBar />
					</div>
					<div class="md:flex hidden ">
						<div class="flex justify-end items-center  text-white gap-5 ">
							<div class="flex items-center justify-center text-sm font-roboto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-location-edit h-6 w-6"
									aria-hidden="true"
								>
									<path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468"></path>
									<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
									<circle cx="10" cy="10" r="3"></circle>
								</svg>
								Track your order
							</div>
							<div class="flex items-center justify-center text-sm font-roboto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-phone h-6 w-6"
									aria-hidden="true"
								>
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
								</svg>
								+9471 2 46 46 46
							</div>
						</div>
					</div>
					<div class="ml-4 md:hidden">
						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative w-9 h-9 bg-white bg-opacity-20 rounded flex items-center justify-center text-white p-1"
							onClick$={() => (appState.showCart = !appState.showCart)}
						>
							{/* <ShoppingBagIcon /> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus text-white group-hover:text-white"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
								<path d="M12.5 17h-6.5v-14h-2" />
								<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
								<path d="M16 19h6" />
								<path d="M19 16v6" />
							</svg>
							{totalQuantity ? (
								<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
									{totalQuantity}
								</div>
							) : (
								''
							)}
						</button>
					</div>
				</div>
			</header>
		</div>
	);
});
