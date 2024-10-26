<template>
  <div
    class="absolute text-neutral-900 md:max-w-lg w-auto top-14 mt-2 md:top-20 md:right-6 lg:right-10 inset-x-2 md:left-auto font-normal z-10"
    data-testid="notifications"
  >
    <div class="flex flex-col gap-2 items-end">
      <NotificationFactory v-for="notification in notifications" :key="notification.id" :item="notification" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationFactory from './NotificationFactory.vue';

const { notifications } = useNotification();
</script>
