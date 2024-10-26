<template>
  <div data-testid="address-list">
    <ul class="flex flex-col gap-4" role="radiogroup">
      <SfListItem
        v-for="address in addresses"
        :key="address.id"
        tag="label"
        data-testid="address-list-item"
        class="border rounded-md items-start"
      >
        <div class="flex gap-2">
          <SfRadio
            :checked="selected === address.id"
            :name="address.id"
            :disabled="loading"
            :value="address.id"
            @update:model-value="$emit('on-select', address)"
          />

          <UiAddress :address="address" class="not-italic" />
        </div>
      </SfListItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { SfListItem, SfRadio } from '@storefront-ui/vue';
import { SfCustomerAddress } from '~/types';
import { AddressListProps } from './types';

defineProps<AddressListProps>();

defineEmits<{
  'on-select': [data: SfCustomerAddress];
}>();
</script>
