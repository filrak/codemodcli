<template>
  <div data-testid="shipping-method" class="md:px-4 my-6">
    <div class="flex justify-between items-center">
      <h2 class="text-neutral-900 typography-headline-4 font-semibold">{{ $t('shippingMethod.heading') }}</h2>
    </div>
    <div class="mt-4">
      <ul v-if="filteredShippingMethods" class="grid gap-y-4 md:grid-cols-2 md:gap-x-4" role="radiogroup">
        <SfListItem
          v-for="{ id, name, estimatedDelivery, price } in filteredShippingMethods"
          :key="id"
          tag="label"
          class="border rounded-md items-start"
          data-testid="shippingMethod"
        >
          <div class="flex gap-2">
            <SfRadio
              :name="name"
              :checked="cart?.shippingMethod?.id === id"
              :value="id"
              :disabled="loading"
              @update:model-value="() => setShippingMethod.mutate({ shippingMethodId: id })"
            />
            <div>
              <p>{{ name }}</p>
              <p v-if="estimatedDelivery" class="text-xs text-neutral-500">{{ estimatedDelivery }}</p>
            </div>
            <p class="ml-auto">{{ formatPrice(price) }}</p>
          </div>
        </SfListItem>
      </ul>

      <div v-else class="flex mb-6">
        <SfIconBlock class="mr-2 text-neutral-500" />
        <p class="text-neutral-900">{{ $t('shippingMethod.description') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SfIconBlock, SfListItem, SfRadio } from '@storefront-ui/vue';

const { cart } = storeToRefs(useSfState());
const { setShippingMethod, data: shippingMethods, loading, getShippingMethods } = useCartShippingMethods();
const { formatPrice } = useFormatPrice();

onMounted(async () => {
  await getShippingMethods();
});

const filteredShippingMethods = computed(() => shippingMethods.value?.methods.filter(({ id }) => id !== 'collect'));
</script>
