<template>
  <div class="relative flex flex-col w-full max-h-[600px] aspect-[4/3]">
    <SfScrollable
      class="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      :active-index="activeIndex"
      wrapper-class="h-full min-h-0"
      buttons-placement="none"
      :drag="{ containerWidth: true }"
      is-active-index-centered
      @on-drag-end="onDragged"
    >
      <div
        v-for="(image, index) in images"
        :key="`${image.alt}-${index}`"
        class="flex justify-center h-full basis-full shrink-0 grow snap-center"
      >
        <img
          :aria-label="image.alt"
          :aria-hidden="activeIndex !== index"
          class="w-auto h-full"
          :alt="image.alt"
          :src="image.desktop"
        />
      </div>
    </SfScrollable>
    <SfScrollable
      class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      :active-index="activeIndex"
      buttons-placement="floating"
    >
      <template #previousButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          class="absolute disabled:hidden !rounded-full z-10 left-4 bg-white"
          variant="secondary"
          size="sm"
          square
        >
          <SfIconChevronLeft size="sm" />
        </SfButton>
      </template>
      <button
        v-for="(image, index) in images"
        :key="`${image.alt}-${index}-thumbnail`"
        type="button"
        :aria-label="image.alt"
        :aria-current="activeIndex === index"
        :class="[
          'md:w-14 md:h-auto relative shrink-0 pb-1 my-4 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
          activeIndex === index ? 'border-primary-700' : 'border-transparent',
        ]"
        @click="activeIndex = index"
      >
        <img
          :alt="image.alt"
          class="object-contain border border-neutral-200"
          width="78"
          height="78"
          :src="image.thumbnail"
        />
      </button>
      <template #nextButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          class="absolute disabled:hidden !rounded-full z-10 right-4 bg-white"
          variant="secondary"
          size="sm"
          square
        >
          <SfIconChevronRight size="sm" />
        </SfButton>
      </template>
    </SfScrollable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  type SfScrollableOnDragEndData,
} from '@storefront-ui/vue';
import type { AgnosticCmsGalleryProps } from '@vsf-enterprise/cms-components-utils';

type GalleryProps = AgnosticCmsGalleryProps;

const props = withDefaults(defineProps<GalleryProps>(), {
  images: () => [],
});

const activeIndex = ref(0);

const onDragged = (event: SfScrollableOnDragEndData) => {
  if (event.swipeRight && activeIndex.value > 0) {
    activeIndex.value -= 1;
  } else if (event.swipeLeft && activeIndex.value < props.images.length - 1) {
    activeIndex.value += 1;
  }
};
</script>
