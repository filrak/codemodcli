<template>
  <div
    class="flex overflow-hidden w-full h-full flex-grow flex-col md:flex-row flex-wrap"
    :style="{ 'background-color': backgroundColor }"
    data-testid="banners"
  >
    <NuxtImg
      v-if="image"
      :src="image.desktop"
      :alt="title"
      class="w-full object-contain min-w-0 h-fit flex-grow flex-shrink basis-1/2"
      width="350"
      height="350"
      fit="limit"
    />
    <div class="block m-auto p-6 lg:p-10 flex-grow flex-shrink basis-auto min-w-[50%] text-center md:text-start">
      <p
        class="uppercase typography-text-xs block font-semibold tracking-widest md:typography-headline-6"
        data-testid="section-subtitle"
      >
        {{ subtitle }}
      </p>
      <h2 class="mb-4 mt-2 font-semibold typography-headline-3 md:typography-headline-2" data-testid="section-title">
        {{ title }}
      </h2>
      <p class="typography-text-base block mb-4 md:typography-text-lg" data-testid="section-description">
        {{ description }}
      </p>
      <SfButton v-if="button" :tag="NuxtLinkLocale" class="!bg-black" :to="button.link">
        {{ button.label }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import type { AgnosticCmsBannerProps } from '@vsf-enterprise/cms-components-utils';

type BannerProps = AgnosticCmsBannerProps;

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');

defineProps<BannerProps>();
</script>
