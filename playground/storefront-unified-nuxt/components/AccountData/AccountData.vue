<template>
  <div class="md:mx-4" data-testid="account-data">
    <div class="flex justify-between my-2">
      <h2 class="typography-headline-4 font-semibold" data-testid="description-term">{{ header }}</h2>
      <SfButton variant="tertiary" size="sm" class="self-start" @click="$emit('on-click')">{{ buttonText }}</SfButton>
    </div>
    <div class="my-2" data-testid="description-body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import type { AccountDataProps } from '~/components/AccountData/types';

defineProps<AccountDataProps>();
defineEmits(['on-click']);
</script>
