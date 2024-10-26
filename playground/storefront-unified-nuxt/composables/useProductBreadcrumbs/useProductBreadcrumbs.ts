import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';
import type { Maybe, SfCategory } from '~/types';

/**
 * @description Composable for retrieving breadcrumbs.
 *
 * @param categoryHierarchy - An array of SfCategory objects representing the category hierarchy.
 * @param productName - An optional string representing the name of the product.
 *
 * @returns An object containing an array of breadcrumb objects.
 *
 * @example
 * const { breadcrumbs } = useProductBreadcrumbs(categoryHierarchy, productName);
 */
export function useProductBreadcrumbs(categoryHierarchy: SfCategory[], productName?: Maybe<string>) {
  const { t } = useI18n();

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    return [
      { name: t('home'), link: paths.home },
      ...getCategoryBreadcrumbs(categoryHierarchy),
      ...(productName ? [{ name: productName, link: `#` }] : []),
    ];
  });

  return {
    breadcrumbs,
  };
}
