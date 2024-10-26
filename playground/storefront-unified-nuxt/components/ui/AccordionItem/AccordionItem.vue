<template>
  <SfAccordionItem
    v-model="internalModelValue"
    :summary-class="`md:rounded-md w-full py-2 pl-4 pr-3 flex justify-between items-center ${summaryClass}`"
    data-testid="accordion-item"
  >
    <template #summary>
      <slot name="summary">
        <p>{{ summary }}</p>
      </slot>
      <SfIconChevronLeft :class="['text-neutral-500', modelValue ? 'rotate-90' : '-rotate-90']" />
    </template>

    <slot />
  </SfAccordionItem>
</template>

<script setup lang="ts">
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/vue';
import { useVModel } from '@vueuse/core';
import type { AccordionItemProps } from '~/components/ui/AccordionItem/types';

const props = withDefaults(defineProps<AccordionItemProps>(), { modelValue: false, summary: '', summaryClass: '' });
const emit = defineEmits(['update:modelValue']);

const internalModelValue = useVModel(props, 'modelValue', emit, { passive: true });
</script>
