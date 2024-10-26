<template>
  <UiDivider v-if="sizes.length > 1 || colors.length > 1" class="mb-6" />
  <div class="px-4" data-testid="product-properties">
    <fieldset v-if="sizes.length > 1" class="pb-4 flex gap-2 flex-wrap">
      <legend class="block mb-2 text-base font-medium leading-6 text-neutral-900" data-testid="size-heading">
        {{ $t('size') }}
      </legend>
      <span
        v-for="{ valueLabel, value, sku, slug } in sizes"
        :key="value"
        data-testid="size-chip-pdp"
        class="uppercase"
      >
        <SfChip
          class="min-w-[48px]"
          size="sm"
          :input-props="{
            onClick: (e) => value == selectedSize && e.preventDefault(),
          }"
          :model-value="value === selectedSize"
          @update:model-value="value !== selectedSize && setAttribute(slug, sku)"
        >
          {{ valueLabel }}
        </SfChip>
      </span>
    </fieldset>
    <fieldset v-if="colors?.length > 1" class="pb-2 flex gap-2 flex-wrap">
      <legend class="block mb-2 text-base font-medium leading-6 text-neutral-900" data-testid="color-heading">
        {{ $t('colour') }}
      </legend>
      <span v-for="attribute in colors" :key="attribute.value" data-testid="color-chip-pdp">
        <SfChip
          class="min-w-[48px]"
          size="sm"
          :input-props="{
            onClick: (e) => attribute.value == selectedColor && e.preventDefault(),
          }"
          :model-value="attribute.value === selectedColor"
          @update:model-value="setAttribute(attribute.slug, attribute.sku)"
        >
          <template #prefix><SfThumbnail size="sm" :style="{ background: guessAttributeColor(attribute) }" /></template>
          {{ attribute.valueLabel }}
        </SfChip>
      </span>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { SfChip, SfThumbnail } from '@storefront-ui/vue';
import type { ProductAttributesProps } from '~/components/ProductAttributes/types';
import { Maybe } from '~/types';
import { colorFacetNames, sizeFacetNames } from '~/utils/facets';

const props = defineProps<ProductAttributesProps>();

const { getAttributeList, getAttribute } = useProductAttribute(props.product, [...colorFacetNames, ...sizeFacetNames]);
const router = useRouter();
const localePath = useLocalePath();
const setAttribute = (slug: string, sku: Maybe<string>) => {
  router.push(localePath(`${paths.product}${slug}/${props.product.id}${sku ? `?sku=${sku}` : ''}`));
};

const sizes = sizeFacetNames.flatMap((facetName) => getAttributeList(facetName));
const colors = colorFacetNames.flatMap((facetName) => getAttributeList(facetName));
const selectedSize = computed(() => (sizes[0] ? getAttribute(sizes[0].name as (typeof sizeFacetNames)[number]) : null));
const selectedColor = computed(() =>
  colors[0] ? getAttribute(colors[0].name as (typeof colorFacetNames)[number]) : null,
);
</script>
