<template>
  <div class="border border-neutral-200 rounded-md divide-y text-neutral-900">
    <SfAccordionItem
      v-for="(item, index) in items"
      :key="`accordion-item-${index}`"
      :model-value="isOpen(index)"
      @update:model-value="toggle(index, $event)"
    >
      <template #summary>
        <div class="flex justify-between p-4 font-medium hover:bg-neutral-100 active:neutral-100">
          <p>{{ item.summary }}</p>
          <SfIconChevronLeft
            :class="['text-neutral-500', { 'rotate-90': isOpen(index), '-rotate-90': !isOpen(index) }]"
          />
        </div>
      </template>
      <div class="p-4">
        <slot name="details">
          {{ item.details }}
        </slot>
      </div>
    </SfAccordionItem>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/vue';
import type { AgnosticCmsAccordionProps } from '@vsf-enterprise/cms-components-utils';

type AccordionProps = AgnosticCmsAccordionProps;

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultipleOpen: false,
  items: () => [],
});

const opened = ref<Set<number>>(new Set());

function isOpen(id: number) {
  return opened.value.has(id);
}

function toggle(id: number, open: boolean) {
  if (open) {
    if (!props.allowMultipleOpen) {
      opened.value.clear();
    }
    opened.value.add(id);
  } else if (isOpen(id)) {
    opened.value.delete(id);
  }
}
</script>
