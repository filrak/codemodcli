import { SfFacet } from '~/types';

/**
 * @description
 * A composable function that handles search query functionality for product facets.
 *
 * @param {SfFacet} facet The facet object.
 * @param {boolean} multiSelect A boolean indicating whether the facet is multi-selectable.
 *
 * @returns An object containing the following properties and methods:
 * - `selectedValues`: The selected facet values from URL query.
 * - `onSelect`: A function that updates the URL query with the selected facet values.
 *
 * @example
 * const { onSelect } = useFacet(facet, false);
 * onSelect('value');
 */
export function useFacet({ name }: SfFacet) {
  const { setFiltersInQuery, query } = useSearchProducts();
  const selectedValues = computed(() => query.value.facets?.[name] ?? []);

  const onSelect = (value: string[]) => {
    setFiltersInQuery({
      facets: {
        [name]: value,
      },
    });
  };

  return {
    onSelect,
    selectedValues,
  };
}
