<template>
  <form
    class="grid grid-cols-1 md:grid-cols-[50%_1fr_120px] gap-4"
    data-testid="address-form"
    @submit.prevent="$emit('on-save', defaultValues)"
  >
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.titleLabel') }}</UiFormLabel>
      <SfSelect
        v-model="defaultValues.titleCode"
        data-testid="title-select"
        name="titleCode"
        :placeholder="$t('form.selectPlaceholder')"
        autocomplete="honorific-prefix"
        required
        :value="defaultValues.titleCode"
      >
        <option v-for="{ label, value } in titleCodes" :key="value" :value="value">{{ label }}</option>
      </SfSelect>
    </label>
    <label>
      <UiFormLabel>{{ $t('form.firstNameLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.firstName"
        data-testid="first-name-input"
        name="firstName"
        autocomplete="given-name"
        required
      />
    </label>
    <label class="md:col-span-2">
      <UiFormLabel>{{ $t('form.lastNameLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.lastName"
        data-testid="last-name-input"
        name="lastName"
        autocomplete="family-name"
        required
      />
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.phoneLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.phoneNumber"
        data-testid="phone-input"
        name="phoneNumber"
        type="tel"
        autocomplete="tel"
        required
      />
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.countryLabel') }}</UiFormLabel>
      <SfSelect
        v-model="defaultValues.country"
        data-testid="country-select"
        name="country"
        :placeholder="$t('form.selectPlaceholder')"
        autocomplete="country-name"
        required
        :value="defaultValues.country"
      >
        <option v-for="country in countries" :key="country">{{ country }}</option>
      </SfSelect>
    </label>
    <label class="md:col-span-2">
      <UiFormLabel>{{ $t('form.streetNameLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.address1"
        data-testid="street-name-input"
        name="address1"
        autocomplete="address-line1"
        required
      />
      <UiFormHelperText>{{ $t('form.streetNameHelp') }}</UiFormHelperText>
    </label>
    <label>
      <UiFormLabel>{{ $t('form.streetNumberLabel') }}</UiFormLabel>
      <SfInput v-model="defaultValues.address2" data-testid="street-number-input" name="address2" />
      <UiFormHelperText>{{ $t('form.streetNumberHelp') }}</UiFormHelperText>
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.cityLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.city"
        data-testid="city-input"
        name="city"
        autocomplete="address-level2"
        required
      />
    </label>
    <label class="md:col-span-2">
      <UiFormLabel>{{ $t('form.stateLabel') }}</UiFormLabel>
      <SfSelect
        v-model="defaultValues.state"
        data-testid="state-select"
        name="state"
        autocomplete="address-level1"
        :placeholder="$t('form.selectPlaceholder')"
        :value="defaultValues.state"
        required
      >
        <option v-for="state in states" :key="state">{{ state }}</option>
      </SfSelect>
    </label>
    <label>
      <UiFormLabel>{{ $t('form.postalCodeLabel') }}</UiFormLabel>
      <SfInput
        v-model="defaultValues.postalCode"
        data-testid="postal-code-input"
        name="postalCode"
        autocomplete="postal-code"
        required
      />
    </label>
  </form>
</template>
<script setup lang="ts">
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { toRefs } from '@vueuse/core';
import type { AddressModalFormProps } from './types';
import { titleCodes } from './utils';

const props = defineProps<AddressModalFormProps>();

defineEmits(['on-save']);

const { savedAddress } = toRefs(props);
const defaultValues = ref({
  id: savedAddress?.value?.id,
  titleCode: savedAddress?.value?.titleCode ?? '',
  firstName: savedAddress?.value?.firstName ?? '',
  lastName: savedAddress?.value?.lastName ?? '',
  phoneNumber: savedAddress?.value?.phoneNumber ?? '',
  country: savedAddress?.value?.country ?? '',
  address1: savedAddress?.value?.address1 ?? '',
  address2: savedAddress?.value?.address2 ?? '',
  city: savedAddress?.value?.city ?? '',
  state: savedAddress?.value?.state ?? '',
  postalCode: savedAddress?.value?.postalCode ?? '',
});
const countries = ['US'];
const states = ['California'];
</script>
