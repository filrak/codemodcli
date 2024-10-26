<template>
  <SfButton data-testid="modal-submit" class="min-w-[120px]" :disabled="loading">
    <SfLoaderCircular v-if="loading" class="absolute flex justify-center items-center" size="sm" />
    <span :class="{ invisible: loading }">
      <slot />
    </span>
  </SfButton>
</template>

<script setup lang="ts">
import { SfButton, SfLoaderCircular } from '@storefront-ui/vue';

defineProps<{
  loading?: boolean;
}>();
</script>
