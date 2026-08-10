export type Locale = 'en' | 'es';

export const defaultLocale: Locale = 'en';

export const locales: readonly Locale[] = ['en', 'es'] as const;

const LOCALE_PREFIX_RE = /^\/(en|es)(?=\/|$)/;

/** Strip a leading locale segment from a pathname. */
export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '');
  return stripped === '' ? '/' : stripped;
}

/** Build a localized path for the given locale. Default locale omits the prefix. */
export function localePath(locale: Locale, pathname = '/'): string {
  const base = stripLocalePrefix(pathname);
  if (locale === defaultLocale) return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}

/** Return the alternate locale for language switching. */
export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

/** Build the same page path in the alternate locale. */
export function switchLocalePath(currentLocale: Locale, pathname: string): string {
  return localePath(alternateLocale(currentLocale), pathname);
}

/** Parse locale from a URL pathname, falling back to defaultLocale. */
export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(LOCALE_PREFIX_RE);
  return (match?.[1] as Locale | undefined) ?? defaultLocale;
}
