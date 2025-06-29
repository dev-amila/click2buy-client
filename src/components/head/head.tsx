import { component$ } from '@qwik.dev/core';
import { useDocumentHead, useLocation } from '@qwik.dev/router';
import { DEFAULT_METADATA_TITLE } from '~/constants';
import { generateDocumentHead } from '~/utils';

export const Head = component$(() => {
	const documentHead = useDocumentHead();
	const head =
		documentHead.meta.length > 0 ? documentHead : { ...documentHead, ...generateDocumentHead() };
	const loc = useLocation();

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#1D4ED8" />
			<title>{head.title || DEFAULT_METADATA_TITLE}</title>

			<link rel="manifest" href="/manifest.json" />
			<link rel="icon" type="image/svg+xml" href="/Favicon.ico" />
			<link rel="apple-touch-icon" href="/logo-192-192.png" />
			<link rel="preconnect" href="https://demo.vendure.io" />
			<link rel="canonical" href={loc.url.toString()} />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"
			/>

			{head.meta.map((m, key) => (
				<meta key={key} {...m} />
			))}

			{head.links.map((l, key) => (
				<link key={key} {...l} />
			))}

			{head.styles.map(({ key, style, ...props }) => (
				<style key={key} {...props} dangerouslySetInnerHTML={style} />
			))}

			<meta name="description" content="Vendure Qwik Storefront" />
			<script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
		</head>
	);
});
