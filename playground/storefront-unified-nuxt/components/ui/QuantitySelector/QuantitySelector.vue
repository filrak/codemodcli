<template>
  <div class="inline-flex flex-col items-center" data-testid="quantity-selector">
    <div class="flex border border-neutral-300 rounded-md h-full w-full">
      <SfButton
        variant="tertiary"
        :disabled="disabled || count <= minValue"
        square
        class="rounded-r-none"
        :class="{ '!p-3': size === 'lg' }"
        :aria-controls="inputId"
        :aria-label="$t('quantitySelectorDecrease')"
        data-testid="quantity-selector-decrease-button"
        :size="size"
        @click="dec()"
      >
        <SfIconRemove />
      </SfButton>
      <input
        :id="inputId"
        v-model="inputModel"
        type="number"
        role="spinbutton"
        class="appearance-none flex-1 mx-2 !w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        :class="{ 'text-disabled-700': disabled }"
        :min="minValue"
        :max="maxValue"
        data-testid="quantity-selector-input"
        :aria-label="$t('quantitySelector')"
        :disabled="disabled"
        placeholder="-"
        @blur="onBlur"
      />
      <SfButton
        variant="tertiary"
        :disabled="disabled || count >= maxValue"
        square
        class="rounded-l-none"
        :class="{ '!p-3': size === 'lg' }"
        :aria-controls="inputId"
        :aria-label="$t('quantitySelectorIncrease')"
        data-testid="quantity-selector-increase-button"
        :size="size"
        @click="inc()"
      >
        <SfIconAdd />
      </SfButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clamp } from '@storefront-ui/shared';
import { SfButton, SfIconAdd, SfIconRemove, useId } from '@storefront-ui/vue';
import { useCounter, toRefs } from '@vueuse/core';
import type { QuantitySelectorProps, QuantitySelectorEmits } from '~/components/ui/QuantitySelector/types';

const props = withDefaults(defineProps<QuantitySelectorProps>(), {
  modelValue: 1,
  minValue: 1,
  maxValue: Number.POSITIVE_INFINITY,
});
const emit = defineEmits<QuantitySelectorEmits>();

const { modelValue, minValue, maxValue, showPlaceholder } = toRefs(props);

const inputId = useId();
const positiveNumber = (value: number) => (value >= 0 ? value : 1);
const inputModel = ref<number | undefined>(showPlaceholder.value ? undefined : positiveNumber(modelValue.value));
const { count, inc, dec, set } = useCounter(positiveNumber(modelValue.value));

watch([count, showPlaceholder], ([count, showPlaceholder]) => {
  if (showPlaceholder) {
    inputModel.value = undefined;
    return;
  }

  inputModel.value = count;
  emit('update:modelValue', count);
});

const passOnlyNumber = (incommingNumber: number | string) => {
  return Number.isNaN(incommingNumber) ? modelValue.value : (incommingNumber as number);
};

const rangeOnlyNumber = (incommingNumber: string) => {
  return clamp(Number.parseInt(incommingNumber, 10), minValue.value, positiveNumber(maxValue.value));
};

const onBlur = (event: FocusEvent) => {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.value) {
    inputModel.value = modelValue.value;
    return;
  }

  const changeValue = rangeOnlyNumber(inputElement.value);
  const finalValue = passOnlyNumber(changeValue);
  inputModel.value = finalValue;
  set(finalValue);
};
</script>
