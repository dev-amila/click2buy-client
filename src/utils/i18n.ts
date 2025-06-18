/**
 * From https://github.com/mhevery/qwik-i18n/blob/main/src/i18n.ts
 */
import { loadTranslations } from '@angular/localize';
import '@angular/localize/init';
import { getLocale, withLocale } from '@qwik.dev/core';
import type { RenderOptions } from '@qwik.dev/core/server';
import { DEFAULT_LOCALE } from '~/constants';
import EN from '../locales/message.en.json';

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
	TRANSLATIONS: Record<string, any>;
	TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
};

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale which is store in the `usEnvDate('local')`.
 */
if (!$localizeFn.TRANSLATION_BY_LOCALE) {
	$localizeFn.TRANSLATION_BY_LOCALE = new Map([['', {}]]);
	Object.defineProperty($localize, 'TRANSLATIONS', {
		get: function () {
			const locale = getLocale(DEFAULT_LOCALE);
			let translations = $localizeFn.TRANSLATION_BY_LOCALE.get(locale);
			if (!translations) {
				$localizeFn.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
			}
			return translations;
		},
	});
}

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
	console.log('Loading translations...');
	[EN].forEach(({ translations, locale }) => {
		withLocale(locale, () => loadTranslations(translations));
	});
}

/**
 * Function used to examine the request and determine the locale to use.
 *
 * This function is meant to be used with `RenderOptions.locale` property
 *
 * @returns The locale to use which will be stored in the `useEnvData('locale')`.
 */
export function extractLang(): string {
	return 'en'; // Force English as the base language
}

/**
 * Function used to determine the base URL to use for loading the chunks in the browser.
 *
 * The function returns `/build` in dev mode or `/build/<locale>` in prod mode.
 *
 * This function is meant to be used with `RenderOptions.base` property
 *
 * @returns The base URL to use for loading the chunks in the browser.
 */
export function extractBase({ serverData }: RenderOptions): string {
	if (import.meta.env.DEV) {
		return '/build';
	} else {
		return '/build/' + serverData!.locale;
	}
}

export function useI18n() {
	// Runtime translation is used during development only.
	if (import.meta.env.DEV) {
		return initTranslations;
	}
	// Otherwise, will return a noop
	return () => {};
}

// initTranslations();
