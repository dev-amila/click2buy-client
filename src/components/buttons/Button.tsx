import { $, component$, QRL, Slot } from '@qwik.dev/core';

type Props = {
	extraClass?: string;
	onClick$?: QRL<() => void>;
	disabled?: boolean;
};

export const Button = component$<Props>(({ extraClass = '', onClick$, disabled = false }) => {
	return (
		<button
			type="button"
			class={`flex items-center justify-around bg-gray-100 border rounded-md py-2 px-4 text-base font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
				} ${extraClass}`}
			onClick$={$(async () => {
				if (!disabled) {
					onClick$ && onClick$();
				}
			})}
			disabled={disabled}
		>
			<Slot />
		</button>
	);
});
