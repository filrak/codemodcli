<template>
  <SfListItem
    tag="label"
    size="sm"
    :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': active }]"
    :selected="active"
    data-testid="filter-color-item"
    :disabled="!facetValue.productCount"
  >
    <template #prefix>
      <input
        v-model="selectedProxy"
        :value="facetValue.value"
        :disabled="!facetValue.productCount"
        class="appearance-none peer"
        type="checkbox"
      />
      <span
        class="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline"
      >
        <SfThumbnail
          size="sm"
          class="sf-thumbnail"
          :style="{ '--color': getColorVariable(facetValue.value.toLowerCase()) }"
        />
      </span>
    </template>
    <p>
      <span class="mr-2 typography-text-sm" data-testid="color-list-item-menu-label">{{
        prettify(facetValue.label)
      }}</span>
      <SfCounter class="md:text-sm font-normal" data-testid="list-item-menu-counter">{{
        facetValue.productCount
      }}</SfCounter>
    </p>
  </SfListItem>
</template>

<script setup lang="ts">
import { SfCounter, SfListItem, SfThumbnail } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';
import { prettify } from '~/utils/facets';

const emits = defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();

const selectedProxy = computed({
  get: () => props.selected,
  set: (value: FilterItemProps['selected']) => emits('update:selected', value),
});

const getColorVariable = (color: string): string => `var(--${color}, ${color})`;
</script>
