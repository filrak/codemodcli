<template>
  <form
    data-testid="account-forms-password"
    @submit.prevent="$emit('on-save', userPasswords)"
  >
    <input
      hidden
      name="email"
      autocomplete="username"
      :value="email"
    />
    <label class="block">
      <UiFormLabel>{{ $t('account.accountSettings.personalData.currentPassword') }}</UiFormLabel>
      <UiFormPasswordInput
        v-model="userPasswords.currentPassword"
        name="currentPassword"
        autocomplete="current-password"
        data-testid="current-password-input"
        :pattern="undefined"
        required
      />
    </label>
    <label class="block my-4">
      <UiFormLabel>{{ $t('account.accountSettings.personalData.newPassword') }}</UiFormLabel>
      <UiFormPasswordInput
        v-model="userPasswords.newPassword"
        name="newPassword"
        autocomplete="new-password"
        data-testid="new-password-input"
        required
      />
      <UiFormHelperText class="block"> {{ $t('account.accountSettings.personalData.passwordHelp') }}</UiFormHelperText>
    </label>
    <label class="block">
      <UiFormLabel>{{ $t('account.accountSettings.personalData.newPasswordAgain') }}</UiFormLabel>
      <UiFormPasswordInput
        v-model="userPasswords.confirmPassword"
        name="confirmPassword"
        autocomplete="new-password"
        data-testid="confirm-password-input"
        required
      />
    </label>
    <div class="mt-6 flex flex-col-reverse md:flex-row md:justify-end gap-4">
      <SfButton
        type="reset"
        variant="secondary"
        data-testid="form-cancel"
        @click="$emit('on-cancel')"
      >
        {{ $t('contactInfo.cancel') }}
      </SfButton>
      <SfButton
        type="submit"
        class="min-w-[120px]"
        data-testid="save"
      >
        {{ $t('account.accountSettings.personalData.changePassword') }}
      </SfButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { ChangeCustomerPasswordArgs } from '~/types';

defineProps<{
  email?: string;
}>();
defineEmits<{
  'on-save': [data: ChangeCustomerPasswordArgs];
  'on-cancel': [];
}>();

const userPasswords = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});
</script>
