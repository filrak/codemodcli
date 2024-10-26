<template>
  <CheckoutAddress
    :heading="$t('shipping.heading')"
    :description="$t('shipping.description')"
    :button-text="$t('shipping.addButton')"
    :is-saved-address="!!cart?.shippingAddress"
    :disabled="!cart?.customerEmail"
    @on-open="open"
  >
    <LazyCheckoutAddressList
      v-if="isOpen"
      :is-open="isOpen"
      :saved-address="cart?.shippingAddress ?? undefined"
      :heading="$t('selectAddressModalHeading')"
      :submitting="submitting"
      @on-close="close"
      @on-save="setShippingAddress.mutate({ shippingAddress: $event })"
    />
    <template #address>
      <LazyUiAddress
        v-if="cart?.shippingAddress"
        :address="cart?.shippingAddress"
        class="not-italic mt-2 md:w-[520px]"
      />
    </template>
  </CheckoutAddress>
</template>

<script setup lang="ts">
import { useDisclosure } from '@storefront-ui/vue';

const { isOpen, open, close } = useDisclosure();
const { cart } = storeToRefs(useSfState());
const { setShippingAddress, loading: submitting } = useSetCartAddress({ onSuccess: close });
</script>
