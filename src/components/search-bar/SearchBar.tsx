import { component$ } from '@qwik.dev/core';
import SearchIcon from '../icons/SearchIcon';

export default component$(() => {
	return (
		<form action="/search" class="relative">
			<input
				type="search"
				name="q"
				default-value={''}
				placeholder={$localize`Search`}
				autoComplete="off"
				class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pr-10"
			/>
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
				<SearchIcon extraClass="text-gray-400" />
			</div>
		</form>
	);
});
