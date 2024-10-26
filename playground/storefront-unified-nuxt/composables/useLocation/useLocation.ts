import { whenever } from '@vueuse/core';
import type { UseLocationReturn } from '~/composables/useLocation/types';
import type { SfLocale } from '~/types';

const getLanguageLabel = (locale: string) => {
  const languageNames = new Intl.DisplayNames([locale], { type: 'language' });

  return (language: string) => [language.toUpperCase(), languageNames.of(language)].join(' - ');
};

function stripLocalePath(path: string, locale: string): string {
  const regexp = new RegExp(`^/${locale}/?`);

  return path.replace(regexp, '/');
}

export const useLocation: UseLocationReturn = () => {
  const { cookieNames } = useAppConfig();
  const { locale } = storeToRefs(useSfState());
  const { locale: i18nLocale } = useI18n();
  const cookie = useCookie(cookieNames.locale, {
    default: () => i18nLocale.value,
    sameSite: 'strict',
    secure: true,
  });

  whenever(i18nLocale, () => {
    locale.value = i18nLocale.value as SfLocale;
    cookie.value = i18nLocale.value;
  });

  return {
    getLanguageLabel: computed(() => getLanguageLabel(i18nLocale.value)),
    stripLocalePath: (path: string, destinationLocale: string = unref(i18nLocale.value)) =>
      stripLocalePath(path, destinationLocale),
  };
};
