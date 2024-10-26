import { type H3Event, setCookie as setResponseCookie, parseCookies } from 'h3';
import type { SfLocale } from '~/types';

function setRequestCookie(event: H3Event, name: string, value: string) {
  const { headers } = event.node.req;
  const cookiesObject = {
    ...parseCookies(event),
    [name]: value,
  };

  try {
    headers.cookie = Object.entries(cookiesObject)
      .map((item) => `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`)
      .join('; ');
  } catch {
    throw new Error(`Failed to set cookie ${name}=${value}`);
  }
}
function setCookie(event: H3Event, name: string, value: string) {
  setRequestCookie(event, name, value);
  setResponseCookie(event, name, value, {
    sameSite: 'strict',
    secure: true,
  });
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    return;
  }
  nuxtApp.hook('vue:setup', () => {
    const { locale: i18nLocale, locales: i18nLocales } = useI18n();
    const { cookieNames } = useAppConfig();
    const event = useRequestEvent();
    const { locale, locales } = storeToRefs(useSfState());

    if (!event) {
      return;
    }

    setCookie(event, cookieNames.locale, i18nLocale.value as SfLocale);

    locale.value = i18nLocale.value as SfLocale;
    locales.value = i18nLocales.value.map((localeItem) =>
      typeof localeItem === 'string' ? localeItem : localeItem.code,
    ) as SfLocale[];
  });

  nuxtApp.hook('app:created', async () => {
    const { fetchCurrencies } = useCurrenciesData();
    await fetchCurrencies();
  });
});
