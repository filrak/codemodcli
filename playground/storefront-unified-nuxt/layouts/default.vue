<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs">
      <div class="p-4 md:px-0">
        <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </NarrowContainer>
    <main>
      <slot />
    </main>
    <NuxtLazyHydrate when-idle>
      <UiNavbarBottom />
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-idle>
      <ScrollToTopButton />
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-visible>
      <UiFooter />
    </NuxtLazyHydrate>
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';

defineProps<DefaultLayoutProps>();

usePageTitle();
</script>
