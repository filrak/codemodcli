<template>
  <li class="flex flex-wrap">
    <SfChip
      v-model="selectedProxy"
      size="sm"
      class="uppercase w-full md:sf-chip-sm md:h-8 h-10"
      :input-props="{ value: facetValue.value }"
      :disabled="!facetValue.productCount"
    >
      <span class="leading-4 text-center" data-testid="size-chip">{{ prettify(facetValue.label) }}</span>
    </SfChip>
  </li>
</template>

<script setup lang="ts">
import { SfChip } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';
import { prettify } from '~/utils/facets';

const emits = defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();

const selectedProxy = computed({
  get: () => props.selected,
  set: (value: FilterItemProps['selected']) => emits('update:selected', value),
});
</script>
