<template>
  <SfButton variant="secondary" data-testid="modal-cancel">
    <slot />
  </SfButton>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
</script>
