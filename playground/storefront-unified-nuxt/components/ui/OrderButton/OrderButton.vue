<template>
  <SfListItem
    class="border border-neutral-200 rounded-md"
    :class="{ 'text-primary-700 hover:bg-primary-100': !disabled }"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <template v-if="icon" #prefix><component :is="icon" :class="{ 'text-primary-700': !disabled }" /></template>
    <span class="break-words font-medium"><slot /></span>
    <span v-if="$slots.subtitle" :class="{ 'text-xs break-words text-neutral-500': !disabled }">
      <slot name="subtitle" />
    </span>
  </SfListItem>
</template>

<script setup lang="ts">
import { SfListItem } from '@storefront-ui/vue';
import type { OrderButtonProps } from './types';

defineProps<OrderButtonProps>();
</script>
