<template>
  <SfListItem
    :key="facetValue.value"
    tag="label"
    size="sm"
    :disabled="!facetValue.productCount"
    :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': active }]"
    data-testid="filter-checkbox"
  >
    <template #prefix>
      <SfCheckbox
        v-model="selectedProxy"
        class="flex items-center"
        :disabled="!facetValue.productCount"
        :value="facetValue.value"
      />
    </template>
    <p>
      <span class="mr-2 text-sm">{{ prettify(facetValue.label) }}</span>
      <SfCounter size="sm">{{ facetValue.productCount }}</SfCounter>
    </p>
  </SfListItem>
</template>
<script setup lang="ts">
import { SfCheckbox, SfCounter, SfListItem } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';
import { prettify } from '~/utils/facets';

const emits = defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();

const selectedProxy = computed({
  get: () => props.selected,
  set: (value: FilterItemProps['selected']) => emits('update:selected', value),
});
</script>
