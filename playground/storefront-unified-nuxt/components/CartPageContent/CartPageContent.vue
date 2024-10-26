<template>
  <div v-if="cart?.lineItems.length" class="md:grid md:grid-cols-12 md:gap-x-6" data-testid="cart-page-content">
    <ul class="col-span-7 mb-10 md:mb-0">
      <template
        v-for="{
          id,
          productId,
          attributes,
          image,
          name,
          unitPrice,
          totalPrice,
          quantity,
          slug,
          quantityLimit,
          sku,
        } in cart.lineItems"
        :key="id"
      >
        <UiCartProductCard
          :id="id"
          data-testid="cart-product-card"
          :data-test-itemid="id"
          :attributes="attributes"
          :product-id="productId"
          :sku="sku ?? productId"
          :image-url="image?.url"
          :image-alt="image?.alt"
          :name="name ?? ''"
          :price="formatPrice(unitPrice?.value!)"
          :total-price="formatPrice(totalPrice as SfMoney)"
          :special-price="unitPrice?.isDiscounted ? formatPrice(unitPrice?.regularPrice) : undefined"
          :max-value="quantityLimit ?? Infinity"
          :min-value="1"
          :value="quantity"
          :disabled="loading || isLoading?.value"
          :slug="slug"
          @on-update="onUpdateCart(id, $event)"
          @on-remove="onRemoveProductCart(id)"
        />
      </template>
    </ul>
    <OrderSummary :cart="cart" class="col-span-5 md:sticky md:top-20 h-fit">
      <SfButton
        data-testid="go-to-checkout"
        :tag="NuxtLinkLocale"
        :to="paths.checkout"
        size="lg"
        class="w-full mb-4 md:mb-0"
      >
        {{ $t('goToCheckout') }}
      </SfButton>
    </OrderSummary>
  </div>
  <div v-else data-testid="empty-cart-logo" class="flex items-center justify-center flex-col pt-24 pb-32">
    <img src="/images/empty-cart.svg" :alt="$t('emptyCartImgAlt')" width="192" height="192" />
    <h2 class="mt-8">{{ $t('emptyCart') }}</h2>
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { type SfMoney } from '~/types';

const { loading } = useCart();
const { cart } = storeToRefs(useSfState());
const { formatPrice } = useFormatPrice();
const isLoading = ref<Ref<boolean>>();

const onUpdateCart = (id: string, quantity: number) => {
  const { mutate: updateCartLineItem, loading } = useUpdateCartLineItem({ lineItemId: id });
  isLoading.value = loading;
  updateCartLineItem({ quantity });
};

const onRemoveProductCart = (id: string) => {
  const { mutate: removeCartLineItem, loading } = useRemoveCartLineItem({ lineItemId: id });
  isLoading.value = loading;
  removeCartLineItem({});
};

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
