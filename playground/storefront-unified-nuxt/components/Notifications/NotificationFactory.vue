<template>
  <AddToCartAlert v-if="item.key === 'cart.addToCart'" :item="item" />
  <NotificationAlert v-else :item="item" />
</template>

<script setup lang="ts">
import { Notification } from '../../composables/useNotification/types';
import AddToCartAlert from './Alerts/AddToCartAlert.vue';
import NotificationAlert from './Alerts/NotificationAlert.vue';

const { item } = defineProps<{ item: Notification }>();
</script>
