import type { SfLocale } from '~/types';

function currencyFormatter(locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
}
function getCurrencyDisplayName(locale: string, currency: string) {
  return new Intl.DisplayNames([locale], { type: 'currency' }).of(currency);
}

function getCurrencySymbol(locale: string, currency: string) {
  return currencyFormatter(locale, currency)
    .formatToParts()
    .find((part) => part.type === 'currency')?.value;
}

function getCurrencyLabel(locale: string) {
  return (currency?: string | null, long = false) => {
    if (!currency) {
      return '';
    }
    const currencyName = long ? ` - ${getCurrencyDisplayName(locale, currency)}` : '';

    return `${currency} (${getCurrencySymbol(locale, currency)})${currencyName}`;
  };
}
export const useCurrency = () => {
  const { cookieNames } = useAppConfig();
  const { currency, locale } = storeToRefs(useSfState());

  const cookie = useCookie(cookieNames.currency, {
    default: () => currency.value,
    sameSite: 'strict',
    secure: true,
  });

  const setCurrency = (value: string) => {
    currency.value = value;
    cookie.value = value;
  };

  return {
    getCurrencyLabel: computed(() => getCurrencyLabel(locale.value as SfLocale)),
    setCurrency,
  };
};
