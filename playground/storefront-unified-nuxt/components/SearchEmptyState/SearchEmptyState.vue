<template>
  <section class="font-medium text-lg">
    {{ $t('searchResults.noMatches') }}
  </section>
  <section
    data-testid="category-empty-state"
    class="flex flex-col gap-4 items-center mt-6 text-center w-fit m-auto max-w-[300px] md:max-w-[500px]"
  >
    <img src="/images/empty-search.svg" :alt="$t('emptyStateAltText')" width="192" height="192" />
    <p class="font-medium text-lg" data-testid="empty-state-text-1">{{ $t('searchResults.noResults') }}</p>
    <p class="text-base pt-4" data-testid="empty-state-text-2">{{ $t('searchResults.helpText') }}</p>
    <SfButton :tag="NuxtLinkLocale" :to="paths.category" class="w-full md:max-w-[250px]" variant="secondary">
      {{ $t('searchResults.browseProducts') }}
    </SfButton>
  </section>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
