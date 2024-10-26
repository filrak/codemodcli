<template>
  <li
    class="w-full first:border-t border-b-[1px] border-neutral-200 min-w-[320px] p-4 last:mb-0"
    data-testid="cart-product-card"
  >
    <Tag
      v-if="isSmallerQuantity || outOfStock"
      size="sm"
      :variant="isSmallerQuantity ? 'warning' : 'negative'"
      class="w-full mb-4"
      data-testid="cart-product-card-tag"
    >
      <template v-if="isSmallerQuantity">
        {{ $t('cartProductCard.tag.smallerQuantity', { desiredQuantity, maxValue }) }}
      </template>
      <template v-else>{{ $t('cartProductCard.tag.outOfStock') }}</template>
    </Tag>

    <div class="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
      <div class="relative overflow-hidden rounded-md col-[1] row-span-2" :class="{ 'opacity-50': outOfStock }">
        <SfLink
          :tag="NuxtLinkLocale"
          :to="productLink"
          class="relative block w-[92px] overflow-hidden border border-neutral-200 rounded-md"
          data-testid="cart-product-card-image-link"
        >
          <NuxtImg
            class="w-full h-auto aspect-square object-contain"
            :src="imageUrl ?? '/images/product.webp'"
            :alt="imageAlt ?? ''"
            width="92"
            loading="lazy"
            format="webp"
            data-testid="cart-product-card-image"
            placeholder="/images/placeholder-300.webp"
          />
        </SfLink>
        <div
          v-if="!!specialPrice"
          data-testid="cart-product-card-sale"
          class="absolute top-0 left-0 text-white bg-secondary-600 py-1 px-2 text-xs font-medium"
        >
          <SfIconSell size="xs" class="mr-1" />
          {{ $t('sale') }}
        </div>
      </div>

      <div class="pl-4 min-w-[180px] row-[1] col-[2] grid grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr]">
        <SfLink
          :tag="NuxtLinkLocale"
          :to="productLink"
          variant="secondary"
          class="no-underline typography-text-sm text-neutral-900 mb-1"
          :class="{ 'font-medium': skuFirst }"
          data-testid="cart-product-card-title"
        >
          {{ skuFirst ? productId : name }}
        </SfLink>
        <DecoratedPrice
          class="mb-0 lg:text-right row-[3] sm:row-auto"
          :class-name-variants="{
            regular: `typography-text-sm font-normal`,
            special: 'typography-text-xs',
          }"
          :regular="price"
          :special="specialPrice"
          data-testid="cart-product-card-price"
        />
        <div class="text-xs font-normal leading-5 sm:typography-text-sm col-span-2 mb-1">
          <p v-if="skuFirst" class="text-neutral-900" data-testid="cart-product-card-subtitle-skuFirst">{{ name }}</p>
          <ul v-else class="text-neutral-700" data-testid="cart-product-card-attributes-list">
            <li
              v-for="attribute in selectedAttributes"
              :key="attribute?.name"
              data-testid="cart-product-card-attribute-item"
            >
              <span class="mr-1" data-testid="cart-product-card-attribute-label">{{ attribute?.label }}:</span>
              <span class="font-medium" data-testid="cart-product-card-attribute-value">{{
                attribute?.valueLabel
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-4 lg:pt-0 lg:pl-4 items-center sm:mt-auto flex flex-wrap col-span-2 row-[3] lg:col-[2] lg:row-[2]">
        <UiQuantitySelector
          v-model="quantity"
          :min-value="minValue"
          :max-value="maxValue"
          class="lg:mr-4 sm:mt-0 mr-auto lg:mr-0"
          :disabled="disabled || outOfStock"
          :show-placeholder="outOfStock"
          data-testid="cart-product-card-selector"
        />
        <SfButton
          square
          variant="tertiary"
          class="text-sm lg:ml-auto ml-4 mr-1 lg:order-none order-1"
          :disabled="disabled"
          data-testid="cart-product-card-remove-btn"
          @click="$emit('onRemove')"
        >
          <template #prefix>
            <SfIconDelete size="sm" />
          </template>
        </SfButton>
        <div class="min-w-[100px] font-medium text-right" data-testid="cart-product-card-total">
          {{ totalPrice }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { SfLink, SfIconSell, SfButton, SfIconDelete } from '@storefront-ui/vue';
import Tag from '~/components/ui/Tag/Tag.vue';
import type { SfAttribute } from '~/types';
import type { CartProductCardProps } from './types';

const props = defineProps<CartProductCardProps>();
const emit = defineEmits(['onRemove', 'onUpdate']);

const quantitySelectorValue = ref(props.value);
const isSmallerQuantity = computed(() => {
  if (!props?.desiredQuantity || !props.maxValue) return false;
  return props?.desiredQuantity > props.maxValue;
});

const quantity = computed({
  get: () => {
    if (props.outOfStock) return;
    if (isSmallerQuantity.value) return props.maxValue;

    return props.value;
  },
  set: (value) => {
    quantitySelectorValue.value = value || 0;
    emit('onUpdate', value || 0);
  },
});

const productLink = computed(
  () => `${paths.product}${props.slug}/${props.productId}?sku=${props.sku ?? props.productId}`,
);

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
const colorFacetNames = new Set(['color', 'swatchColors', 'Color']);
const sizeFacetNames = new Set(['size', 'Size']);
const sizeAttribute = props.attributes.find((attribute: SfAttribute) => sizeFacetNames.has(attribute.name));
const colorAttribute = props.attributes.find((attribute: SfAttribute) => colorFacetNames.has(attribute.name));
const selectedAttributes = [sizeAttribute, colorAttribute].filter((value) => value != null);
</script>
