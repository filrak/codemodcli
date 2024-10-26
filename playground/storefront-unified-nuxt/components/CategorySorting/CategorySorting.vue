<template>
  <FilterContainer :title="$t('sortBy')">
    <div class="mx-4 mt-6 block" data-testid="category-sorting">
      <SfSelect
        :model-value="query.sortBy"
        :value="query.sortBy"
        :aria-label="$t('sortBy')"
        @update:model-value="changeSort"
      >
        <option v-for="{ value, label } in options" :key="value" :value="value">
          {{ $t(`sortType.${label}`) }}
        </option>
      </SfSelect>
    </div>
  </FilterContainer>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';
import type { SearchProductsArgs } from '~/types';

const options = [
  {
    label: 'relevance',
    value: 'relevant',
  },
  {
    label: 'priceUp',
    value: 'price-low-to-high',
  },
  {
    label: 'priceDown',
    value: 'price-high-to-low',
  },
];

const { query, setSortInQuery } = useSearchProducts();

const changeSort = (value: SearchProductsArgs['sortBy']) => {
  setSortInQuery(value);
};
</script>
