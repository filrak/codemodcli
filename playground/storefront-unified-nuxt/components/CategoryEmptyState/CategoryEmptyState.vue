<template>
  <section
    data-testid="category-empty-state"
    class="flex flex-col gap-4 items-center mt-4 text-center w-fit m-auto max-w-[300px] md:max-w-[500px]"
  >
    <img src="/images/empty-category.svg" :alt="$t('emptyStateAltText')" width="192" height="192" />
    <p class="font-medium text-lg" data-testid="empty-state-text-1">{{ $t('emptyStateText') }}</p>
    <p class="text-base p-4" data-testid="empty-state-text-2">
      {{ $t('emptyStateText2') }}
      <SfButton
        :tag="NuxtLinkLocale"
        :to="paths.category"
        variant="tertiary"
        class="!px-0 underline hover:bg-transparent"
      >
        {{ $t('clearFilters') }}
      </SfButton>
    </p>
  </section>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
