<template>
  <div class="flex gap-x-2 items-baseline">
    <span
      data-testid="special-price"
      :class="[
        'font-semibold',
        classNameVariants?.regular,
        {
          'text-neutral-900': !special,
          'text-secondary-700': special,
        },
      ]"
    >
      {{ regular }}
    </span>
    <span
      v-if="special"
      data-testid="regular-price"
      :class="['font-normal text-neutral-500 line-through', classNameVariants?.special]"
    >
      {{ special }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DecoratedPriceProps } from './types';

defineProps<DecoratedPriceProps>();
</script>
