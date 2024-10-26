<template>
  <div data-testid="checkout-address" class="md:px-4 py-6">
    <div class="flex justify-between items-center">
      <h2 class="text-neutral-900 font-semibold typography-headline-4 mb-4">{{ heading }}</h2>
      <SfButton v-if="isSavedAddress" data-testid="edit-button" size="sm" variant="tertiary" @click="$emit('on-open')">
        {{ $t('contactInfo.change') }}
      </SfButton>
    </div>
    <template v-if="isSavedAddress">
      <slot name="address" />
    </template>
    <div v-else class="w-full md:max-w-[520px]">
      <p class="text-neutral-900">{{ description }}</p>
      <SfButton
        :disabled="disabled"
        data-testid="add-button"
        class="mt-4 w-full md:w-auto"
        variant="secondary"
        @click="$emit('on-open')"
      >
        {{ buttonText }}
      </SfButton>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import type { CheckoutAddressProps } from '~/components/CheckoutAddress/types';

defineProps<CheckoutAddressProps>();
defineEmits<{
  'on-open': [];
}>();
</script>
