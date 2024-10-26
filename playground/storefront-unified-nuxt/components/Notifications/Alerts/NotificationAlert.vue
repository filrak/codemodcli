<template>
  <BaseAlert :variant="item.variant">
    <template #prefix>
      <SfIconCheckCircle v-if="item.variant === 'positive'" class="text-positive-700" />
      <SfIconError v-else-if="item.variant === 'error'" class="text-negative-700" />
      <SfIconWarning v-else-if="item.variant === 'warning'" class="text-warning-700" />
      <SfIconInfo v-else /> </template
    >{{ $t(item.text)
    }}<template #suffix>
      <SfButton :class="buttonClasses" variant="tertiary" data-testid="alert-close-button" square @click="item.dismiss">
        <template #prefix>
          <SfIconClose />
        </template>
      </SfButton>
    </template>
  </BaseAlert>
</template>

<script setup lang="ts">
import { SfButton, SfIconCheckCircle, SfIconClose, SfIconError, SfIconInfo, SfIconWarning } from '@storefront-ui/vue';
import { NotificationAlertProps } from '../types';
import BaseAlert from './BaseAlert.vue';

const props = defineProps<NotificationAlertProps>();

const buttonClasses = computed(() => [
  'self-start',
  {
    '!text-negative-700 hover:!text-negative-800 hover:!bg-negative-200 active:!text-negative-900 active:!bg-negative-300':
      props.item.variant === 'error',
    '!text-positive-700 hover:!text-positive-800 hover:!bg-positive-200 active:!text-positive-900 active:!bg-positive-300':
      props.item.variant === 'positive',
    '!text-warning-700 hover:!text-warning-800 hover:!bg-warning-200 active:!text-warning-900 active:!bg-warning-300':
      props.item.variant === 'warning',
  },
]);
</script>
