<template>
  <div
    role="alert"
    :class="[
      'flex items-start w-full max-w-[600px] shadow-md pr-2 pl-4 ring-1 typography-text-base py-1 rounded-md',
      classes,
    ]"
  >
    <div v-if="$slots.prefix" class="flex my-2">
      <slot name="prefix" />
    </div>
    <div class="my-2 min-w-0 flex-1" data-testid="alert-body">
      <div class="font-medium text-lg" data-testid="alert-header">
        <slot name="header" />
      </div>
      <span data-testid="alert-text"><slot /></span>
    </div>
    <slot name="suffix" />
  </div>
</template>

<script lang="ts">
const sizeClasses = {
  sm: 'p-1 gap-1',
  base: 'p-1.5 gap-1.5',
};
</script>

<script setup lang="ts">
import type { AlertProps } from '~/components/ui/Alert/types';

const props = withDefaults(defineProps<AlertProps>(), {
  size: 'base',
  strong: false,
  variant: 'positive',
});

const classes = computed(() => [
  sizeClasses[props.size],
  props.strong ? 'text-white font-medium rounded-none' : 'rounded-md font-normal',
  {
    [`ring-positive-200 ${props.strong ? 'bg-positive-600' : 'bg-positive-100'}`]: props.variant === 'positive',
    [`ring-secondary-200 ${props.strong ? 'bg-secondary-800' : 'bg-secondary-100'}`]: props.variant === 'secondary',
    [`ring-negative-300 ${props.strong ? 'bg-negative-600' : 'bg-negative-100'}`]: props.variant === 'error',
    [`ring-warning-200 ${props.strong ? 'bg-warning-600' : 'bg-warning-100'}`]: props.variant === 'warning',
    [`ring-neutral-200 border border-neutral-200 ${props.strong ? 'bg-neutral-600' : 'bg-neutral-100'}`]:
      props.variant === 'neutral',
  },
]);
</script>
