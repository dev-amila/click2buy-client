import { component$ } from '@qwik.dev/core';

export default component$(() => (
	<div class="flex items-center justify-center h-screen">
		<h1 class="text-2xl font-bold">Cart</h1>

		<div class="container mx-auto px-4 py-8 md:py-12">
			<h1 class="text-3xl font-bold mb-8 text-center md:text-left">Shopping Cart</h1>

			{/* {isEmpty ? (
				// <EmptyCart />
				<div class="text-center">
					<h2 class="text-xl font-semibold mb-4">Your cart is empty</h2>
					<p class="text-gray-600 mb-6">Add items to your cart to proceed.</p>
					<button>
						<a href="/shop">Continue Shopping</a>
					</button>
				</div>
			) : (
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div class="lg:col-span-8">
						<CartItems items={cartItems} />
					</div>
					<div class="lg:col-span-4">
						<CartSummary items={cartItems} />
						<div class="mt-6">
							<Button asChild class="w-full" size="lg">
								<Link href="/checkout">Proceed to Checkout</Link>
							</Button>
						</div>
					</div>
				</div>
			)} */}
		</div>
	</div>
));
