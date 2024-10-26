<template>
  <div data-testid="category-filters">
    <CategoryFiltersFilter
      v-for="facet in facets"
      :key="facet.name"
      v-model:selected="selectedFilters[facet.name]"
      :facet="facet"
      :max="facet.type === 'SIZE' ? 15 : 5"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from '@vueuse/core';
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

const props = defineProps<CategoryFiltersProps>();
const { query, setFiltersInQuery } = useSearchProducts();
const { facets } = toRefs(props);

const selectedFilters = ref({ ...query.value.facets });

watch(facets, () => {
  selectedFilters.value = { ...query.value.facets };
});

watch(
  selectedFilters,
  () => {
    setFiltersInQuery({
      facets: selectedFilters.value,
    });
  },
  { deep: true },
);
</script>
