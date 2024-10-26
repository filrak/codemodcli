<template>
  <div v-if="couponId" class="flex items-center justify-center">
    <p>{{ $t('promoCode') }}</p>
    <div class="flex items-center gap-2 ml-auto">
      <SfButton data-testid="removePromoCode" variant="tertiary" :disabled="loading" @click="handleRemovePromoCode">
        {{ $t('remove') }}
      </SfButton>
      <p data-testid="specialSavings">-{{ totalDiscount }}</p>
    </div>
  </div>
  <form
    v-else
    data-testid="applyPromoCode"
    class="flex gap-2 items-center"
    @submit.prevent="$emit('on-save', promoCode)"
  >
    <SfInput
      v-model="promoCode"
      wrapper-class="grow"
      required
      :placeholder="$t('promoCodePlaceholder')"
      :disabled="loading"
      data-testid="promo-code-input"
    />
    <SfButton type="submit" size="base" variant="secondary" :disabled="loading">
      {{ $t('apply') }}
    </SfButton>
  </form>
</template>

<script setup lang="ts">
import { SfButton, SfInput } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { OrderSummaryPromoCodeProps } from '~/components/OrderSummary/types';

const props = defineProps<OrderSummaryPromoCodeProps>();

const emit = defineEmits<{
  'on-save': [data: string];
  'on-remove': [data: string];
}>();

const { couponId } = toRefs(props);
const promoCode = ref('');

const handleRemovePromoCode = () => {
  if (!couponId?.value) return;

  emit('on-remove', couponId?.value);
  promoCode.value = '';
};
</script>
