<template>
  <UiAccordionItem v-if="facet" :id="facet.name" v-model="open" class="border-b border-neutral-200">
    <template #summary>
      <span
        class="font-medium text-base capitalize"
        :data-testid="`filter-${$t(facet.label.replace(/\s+/g, '-')).toLowerCase()}-heading`"
      >
        {{ $t(facet.label.toLowerCase()) }}
      </span>
    </template>
    <div class="pb-6">
      <div
        v-if="facet.type === 'SIZE'"
        class="grid md:grid-cols-[repeat(auto-fill,_minmax(47px,_1fr))] grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] gap-2 justify-center px-4 py-2"
      >
        <CategoryFiltersFilterSize
          v-for="facetValue in itemsToDisplay"
          :key="facetValue.value"
          v-model:selected="selectedProxy"
          :facet-value="facetValue"
          :active="isItemActive(facetValue.value)"
        />
      </div>
      <template v-else-if="facet.type === 'COLOR'">
        <CategoryFiltersFilterColor
          v-for="facetValue in itemsToDisplay"
          :key="facetValue.value"
          v-model:selected="selectedProxy"
          :facet-value="facetValue"
          :active="isItemActive(facetValue.value)"
        />
      </template>
      <template v-else-if="facet.type === 'SINGLE_SELECT'">
        <CategoryFiltersFilterRadio
          v-for="facetValue in itemsToDisplay"
          :key="facetValue.value"
          v-model:selected="selectedProxy"
          :facet-value="facetValue"
          :active="isItemActive(facetValue.value)"
        />
      </template>
      <template v-else>
        <CategoryFiltersFilterCheckbox
          v-for="facetValue in itemsToDisplay"
          :key="facetValue.value"
          v-model:selected="selectedProxy"
          :facet-value="facetValue"
          :active="isItemActive(facetValue.value)"
        />
      </template>
      <SfButton
        v-if="canShowMore"
        class="mt-2 md:h-8 md:text-sm md:px-3 grayscale"
        variant="tertiary"
        :data-testid="
          showMore ? `show-less-${facet.type?.toLowerCase()}-button` : `show-more-${facet.type?.toLowerCase()}-button`
        "
        @click="toggleShowMore"
      >
        {{ showMore ? $t('showLess') : $t('showMore') }}
      </SfButton>
    </div>
  </UiAccordionItem>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import type { FilterProps, FilterItemEmits } from './types';

const props = withDefaults(defineProps<FilterProps>(), {
  max: 5,
  selected: () => [],
});

const emit = defineEmits<FilterItemEmits>();
const open = ref(true);
const showMore = ref(false);
const toggleShowMore = () => (showMore.value = !showMore.value);
const itemsToDisplay = computed(() => (showMore.value ? props.facet?.values : props.facet?.values.slice(0, props.max)));
const canShowMore = computed(() => (props.facet?.values ? props.facet?.values.length > props.max : false));

const selectedProxy = computed({
  get: () => props.selected,
  set: (value: FilterProps['selected']) => {
    emit('update:selected', value);
  },
});

const isItemActive = (selectedValue: string) => props.selected.includes(selectedValue);
</script>
