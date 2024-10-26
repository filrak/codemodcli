<template>
  <BaseAlert :variant="item.variant">
    <template #prefix>
      <SfIconAddShoppingCart v-if="item.variant === 'positive'" class="text-positive-700" />
      <SfIconRemoveShoppingCart v-if="item.variant === 'error'" class="text-negative-700" /> </template
    >{{ $t(item.text)
    }}<template v-if="item.variant === 'positive'" #suffix>
      <SfButton
        :tag="NuxtLinkLocale"
        :to="paths.cart"
        variant="tertiary"
        class="whitespace-nowrap !text-positive-700 hover:!text-positive-800 hover:!bg-positive-200 active:!text-positive-900 active:!bg-positive-300"
        @click="item.dismiss"
      >
        {{ $t('viewCart') }}
      </SfButton>
    </template>
  </BaseAlert>
</template>

<script setup lang="ts">
import { SfButton, SfIconAddShoppingCart, SfIconRemoveShoppingCart } from '@storefront-ui/vue';
import { NotificationAlertProps } from '../types';
import BaseAlert from './BaseAlert.vue';

const { item } = defineProps<NotificationAlertProps>();

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
