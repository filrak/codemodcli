<template>
  <div data-testid="hero" class="relative min-h-[576px] w-full shrink-0">
    <picture v-if="backgroundImage">
      <source :srcset="backgroundImage.desktop" media="(min-width: 768px)" />
      <img
        :src="backgroundImage.mobile"
        :alt="backgroundImage.alt"
        class="absolute w-full h-full z-[-1] object-cover"
      />
    </picture>
    <div class="md:flex md:flex-row-reverse max-w[1536px] mx-auto min-h-[576px]">
      <div v-if="image" class="flex flex-col md:basis-2/4 md:items-stretch md:overflow-hidden">
        <NuxtImg
          :src="image.desktop"
          :alt="image.alt"
          class="h-full w-full object-cover object-left"
          height="640"
          width="640"
          fit="limit"
          fetchpriority="high"
          preload
        />
      </div>
      <div class="p-4 md:p-10 md:max-w-[768px] md:flex md:flex-col md:justify-center md:items-start md:basis-2/4">
        <p
          data-testid="section-subtitle"
          class="typography-text-xs md:typography-text-sm font-medium tracking-widest text-neutral-900 uppercase"
        >
          {{ subtitle }}
        </p>
        <h1
          data-testid="section-title"
          class="typography-headline-2 md:typography-headline-1 md:tracking-[-.022em] md:leading-[67.5px] font-semibold mt-2 mb-4"
        >
          {{ title }}
        </h1>
        <p data-testid="section-description" class="typography-text-base md:typography-text-lg">
          {{ description }}
        </p>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <SfButton v-if="buttonA" data-testid="button-order-now" size="lg" :tag="NuxtLinkLocale" :to="buttonA.link">
            {{ buttonA.label }}
          </SfButton>
          <SfButton
            v-if="buttonB"
            data-testid="button-show-more"
            size="lg"
            variant="secondary"
            class="bg-white"
            :tag="NuxtLinkLocale"
            :to="buttonB.link"
          >
            {{ buttonB.label }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import type { AgnosticCmsHeroProps } from '@vsf-enterprise/cms-components-utils';

type HeroProps = AgnosticCmsHeroProps;

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');

defineProps<HeroProps>();
</script>
