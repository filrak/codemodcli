<template>
  <form data-testid="account-forms-name" @submit.prevent="$emit('on-save', userData)">
    <div class="md:flex justify-between gap-4">
      <label class="block flex-1">
        <UiFormLabel>{{ $t('account.accountSettings.personalData.firstName') }}</UiFormLabel>
        <SfInput v-model="userData.firstName" name="firstname" type="text" data-testid="first-name-input" required />
      </label>
      <label class="block flex-1 mt-4 md:mt-0">
        <UiFormLabel>{{ $t('account.accountSettings.personalData.lastName') }}</UiFormLabel>
        <SfInput v-model="userData.lastName" name="lastname" type="text" data-testid="last-name-input" required />
      </label>
    </div>
    <div class="mt-6 flex flex-col-reverse md:flex-row md:justify-end gap-4">
      <SfButton type="reset" variant="secondary" data-testid="form-cancel" @click="$emit('on-cancel')">
        {{ $t('contactInfo.cancel') }}
      </SfButton>
      <SfButton type="submit" class="min-w-[120px]" data-testid="save"> {{ $t('contactInfo.save') }} </SfButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { SfButton, SfInput } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { AccountFormsNameProps, AccountFormName } from './types';

const props = defineProps<AccountFormsNameProps>();
defineEmits<{
  'on-save': [data: AccountFormName];
  'on-cancel': [];
}>();

const { firstName, lastName } = toRefs(props);
const userData = ref({
  firstName: firstName?.value ?? '',
  lastName: lastName?.value ?? '',
});
</script>
