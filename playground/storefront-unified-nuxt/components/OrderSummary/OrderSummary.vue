<template>
  <div class="shadow-lg md:rounded-md md:border md:border-neutral-100" data-testid="order-summary">
    <div class="flex justify-between items-end py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-semibold md:typography-headline-3">{{ $t('orderSummary') }}</p>
      <p class="typography-text-base font-medium" data-testid="total-in-cart">
        {{ $t('itemsInCart', cart.totalItems) }}
      </p>
    </div>
    <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
      <div class="flex justify-between">
        <p>{{ $t('itemsSubtotal') }}</p>
        <p data-testid="special-price">
          {{
            formatPrice({
              amount: cart.subtotalDiscountedPrice.amount - cart.totalCouponDiscounts.amount,
              currency: cart.subtotalDiscountedPrice.currency,
            })
          }}
        </p>
      </div>
      <template v-if="isDiscounted">
        <div class="flex justify-between">
          <p class="typography-text-xs text-neutral-500">{{ $t('originalPrice') }}</p>
          <p data-testid="regular-price" class="typography-text-xs text-neutral-500">
            {{ formatPrice(cart.subtotalRegularPrice) }}
          </p>
        </div>
        <div class="flex justify-between text-secondary-700">
          <p class="typography-text-xs">{{ $t('savings') }}</p>
          <p data-testid="regular-saving" class="typography-text-xs">
            -{{ formatPrice({ amount: discountAmount, currency: cart.subtotalRegularPrice.currency }) }}
          </p>
        </div>
      </template>
      <div class="flex justify-between my-2">
        <p>{{ $t('delivery') }}</p>
        <p data-testid="delivery-cost">
          {{ cart.totalShippingPrice?.amount ? formatPrice(cart.totalShippingPrice) : '--' }}
        </p>
      </div>
      <div class="flex justify-between my-2">
        <p>{{ $t('estimatedTax') }}</p>
        <p data-testid="tax">{{ formatPrice(cart.totalTax) }}</p>
      </div>
      <UiDivider class="my-4 w-auto" />
      <OrderSummaryPromoCode
        :total-discount="formatPrice(cart.totalCouponDiscounts)"
        :coupon-id="cart.appliedCoupons[0]?.id"
        :loading="loading"
        @on-save="handleAddPromoCode"
        @on-remove="removeCoupon.mutate({ couponId: $event })"
      />
      <UiDivider class="my-4 w-auto" />
      <UiTag v-if="isDiscounted" data-testid="savings-tag" class="w-full mb-4" variant="secondary">
        {{
          $t('savingsTag', {
            amount: formatPrice({
              amount: discountAmount,
              currency: cart.totalCouponDiscounts.currency,
            }),
          })
        }}
      </UiTag>
      <div class="flex justify-between typography-headline-4 md:typography-headline-3 font-semibold mb-4">
        <p>{{ $t('total') }}</p>
        <p data-testid="total">{{ formatPrice(cart.totalPrice) }}</p>
      </div>
      <UiDivider class="my-4 w-auto" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from '@vueuse/core';
import type { OrderSummaryPropsType } from './types';

const props = defineProps<OrderSummaryPropsType>();

const { cart } = toRefs(props);

const { applyCoupon, removeCoupon, loading } = useCartCoupon();
const { formatPrice } = useFormatPrice();

const discountAmount = computed(
  () =>
    cart.value.subtotalRegularPrice.amount -
    cart.value.subtotalDiscountedPrice.amount +
    cart.value.totalCouponDiscounts.amount,
);
const isDiscounted = computed(() => discountAmount.value > 0);
const handleAddPromoCode = async (couponCode: string) => {
  await applyCoupon.mutate({ couponCode });
};
</script>
