import { SfFacet, SfFacetItem } from '~/types';

export type CategoryFiltersProps = {
  facets: SfFacet[];
};

export type FilterProps = {
  facet: SfFacet;
  max?: number;
  selected: string[];
};

export type FilterItemProps = {
  facetValue: SfFacetItem;
  selected: string[];
  active: boolean;
};

export type FilterItemEmits = (event: 'update:selected', data: FilterItemProps['selected']) => void;
