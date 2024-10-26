import type { FormatPrice, UseFormatPriceReturn } from './types';

export const currencyFormatter = (locale: string, currency: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

/**
 * @description
 * Returns a composable object with a `formatPrice` function that formats a given price object
 * using the appropriate currency formatter based on the currency code.
 *
 * @returns An object with a `formatPrice` function.
 *
 * @example
 * const { formatPrice } = useFormatPrice();
 * const formattedPrice = formatPrice({ amount: 100, currency: 'USD' });
 */
export const useFormatPrice: UseFormatPriceReturn = () => {
  const { locale } = useI18n();

  const registeredFormatters: Record<string, Intl.NumberFormat> = {};

  const getFormatter = (currency: string) => {
    if (!registeredFormatters[currency]) {
      registeredFormatters[currency] = currencyFormatter(locale.value, currency);
    }
    return registeredFormatters[currency];
  };

  const formatPrice: FormatPrice = (price) => getFormatter(price.currency).format(price.amount);

  return { formatPrice };
};
