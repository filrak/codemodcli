import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';
import type { SfCategory } from '~/types';

export function getCategoryBreadcrumbs(categoryAncestors: SfCategory[]): Breadcrumb[] {
  return categoryAncestors.map(({ name, id }, i, array) => {
    const basePath = array.slice(0, i).map((ancestor) => ancestor.id);
    return {
      name,
      link: `${paths.category}/${[...basePath, id].join('/')}`,
    };
  });
}
