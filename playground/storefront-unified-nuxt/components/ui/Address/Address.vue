<template>
  <address data-testid="saved-address">
    <div class="font-medium" data-testid="saved-name">
      {{ [titleCode, address.firstName, address.lastName].join(' ') }}
    </div>
    <div data-testid="saved-phone">{{ address.phoneNumber }}</div>
    <div data-testid="saved-street">
      {{ [address.address1, address.address2].filter(Boolean).join(' ') }}
    </div>
    <div data-testid="saved-city">
      {{ [address.city && `${address.city},`, address.state, address.postalCode].filter(Boolean).join(' ') }}
    </div>
  </address>
</template>

<script setup lang="ts">
import { titleCodes } from '~/components/AddressModal/utils';
import { SfAddress } from '~/types';

const props = defineProps<{
  address: SfAddress;
}>();

const titleCode = computed(() => titleCodes.find((code) => code.value === props.address.titleCode)?.label);
</script>
