<template>
  <form ref="referenceRef" role="search" class="relative" @submit.prevent="handleSubmit">
    <SfInput
      ref="inputReference"
      v-model="inputModel"
      aria-label="Search"
      placeholder="Search"
      required
      class="md:placeholder-neutral-900"
      @focus="open"
    >
      <template #suffix>
        <div class="flex">
          <UiOrderButton
            data-testid="search-reset"
            type="reset"
            aria-label="Reset search"
            :class="[
              'inline mr-2 md:mr-0 rounded-md focus-visible:outline focus-visible:outline-offset',
              { hidden: !inputModel },
            ]"
            @click="handleReset"
          >
            <SfIconCancel />
          </UiOrderButton>
          <SfButton
            type="submit"
            data-testid="search-submit"
            square
            aria-label="Search for a specific phrase on the page"
            class="rounded-l-none -mr-4 -my-2"
            :variant="!isMounted || isTablet ? 'tertiary' : 'primary'"
          >
            <SfIconSearch class="md:text-neutral-500" />
          </SfButton>
        </div>
      </template>
    </SfInput>
  </form>
</template>

<script setup lang="ts">
import { SfIconCancel, SfIconSearch, SfInput, useDisclosure, SfButton } from '@storefront-ui/vue';
import { unrefElement, whenever, useMounted } from '@vueuse/core';

const props = defineProps<{
  close?: () => boolean;
}>();

const { isTablet } = useBreakpoints();
const isMounted = useMounted();
const router = useRouter();
const localePath = useLocalePath();
const { open } = useDisclosure();

const inputModel = ref('');
const inputReference = ref<HTMLSpanElement>();
const handleInputFocus = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};
const handleReset = () => {
  inputModel.value = '';
  handleInputFocus();
};
const handleSubmit = () => {
  props.close?.();
  router.push({ path: localePath(paths.search), query: { search: inputModel.value } });
  handleReset();
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    handleReset();
  }
});

whenever(isTablet, () => props.close?.());
</script>
