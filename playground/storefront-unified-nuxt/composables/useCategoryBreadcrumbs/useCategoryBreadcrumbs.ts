import { UseCategoryState } from '../useCategory/types';

/**
 * @description Composition function that returns the breadcrumb trail for the current category.
 *
 * @param category - The category object returned from the `useCategory` composable.
 *
 * @returns An object with a computed property `breadcrumbs` that represents the breadcrumb trail for the
 * current category.
 *
 * @example
 * const { data: categoryData } = useCategory('state-id');
 * const { breadcrumbs } = useCategoryBreadcrumbs(categoryData);
 */
export function useCategoryBreadcrumbs(category: Ref<UseCategoryState['data']>) {
  const { t } = useI18n();

  const breadcrumbs = computed(() => {
    const currentCategory = category?.value?.category;
    const categoryAncestors = category?.value?.ancestors || [];
    return [
      { name: t('home'), link: paths.home },
      { name: t('allProducts'), link: paths.category },
      ...getCategoryBreadcrumbs(categoryAncestors),
      ...(currentCategory ? [{ name: currentCategory.name, link: '#' }] : []),
    ];
  });

  return {
    breadcrumbs,
  };
}
