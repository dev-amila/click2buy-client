import { $, component$, useOnDocument, useStyles$ } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet, ServiceWorkerRegister } from '@qwik.dev/router';
import { Head } from './components/head/head';

import globalStyles from './global.css?inline';
import { useI18n } from './utils/i18n';

export default component$(() => {
	useStyles$(globalStyles);
	useOnDocument('qinit', $(useI18n));

	return (
		<QwikRouterProvider>
			<Head />
			<body lang="en">
				<RouterOutlet />
				<ServiceWorkerRegister />
			</body>
		</QwikRouterProvider>
	);
});
