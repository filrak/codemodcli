<template>
  <Transition enter-from-class="opacity-0" enter-active-class="transition duration-300" appear>
    <Alert class="pointer-events-auto shadow-md transition" :variant="variant">
      <template v-for="(_, slot) of $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </Alert>
  </Transition>
</template>

<script setup lang="ts">
import Alert from '~/components/ui/Alert/Alert.vue';
import { AlertProps } from '~/components/ui/Alert/types';

const { variant } = defineProps<AlertProps>();
</script>
