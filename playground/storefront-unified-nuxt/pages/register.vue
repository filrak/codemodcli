<template>
  <div>
    <NuxtLayout name="auth" :heading="$t('auth.signup.heading')">
      <UiAlert class="w-full p-4 md:p-6 mb-6 !justify-start typography-text-base max-w-none" variant="neutral">
        <i18n-t keypath="auth.signup.bannerText" scope="global">
          <template #login>
            <SfLink
              data-testid="switch-to-login-link"
              :tag="NuxtLinkLocale"
              :to="paths.authLogin"
              class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            >
              {{ $t('auth.login.heading') }}
            </SfLink>
          </template>
        </i18n-t>
      </UiAlert>

      <form
        data-testid="register-page"
        class="flex flex-col md:border md:border-neutral-200 rounded-md gap-4 md:p-6"
        @submit.prevent="register"
      >
        <UiAlert v-if="isSpecificSdkHttpError(error, { statusCode: 400 })" class="mb-4" variant="error">
          {{ $t('auth.signup.registrationError') }}
          <template #prefix><SfIconError class="text-negative-700" /></template>
        </UiAlert>
        <label>
          <UiFormLabel>{{ $t('form.firstNameLabel') }} *</UiFormLabel>
          <SfInput
            v-model="firstNameModel"
            data-testid="first-name-input"
            name="firstName"
            autocomplete="given-name"
            required
          />
        </label>
        <label>
          <UiFormLabel>{{ $t('form.lastNameLabel') }} *</UiFormLabel>
          <SfInput
            v-model="lastNameModel"
            data-testid="last-name-input"
            name="lastName"
            autocomplete="family-name"
            required
          />
        </label>
        <label>
          <UiFormLabel>{{ $t('form.emailLabel') }} *</UiFormLabel>
          <SfInput
            v-model="emailModel"
            data-testid="email-input"
            name="email"
            type="email"
            autocomplete="username"
            required
          />
        </label>
        <div>
          <label>
            <UiFormLabel>{{ $t('form.passwordLabel') }} *</UiFormLabel>
            <UiFormPasswordInput
              v-model="passwordModel"
              data-testid="password-input"
              name="password"
              autocomplete="new-password"
              required
            />
            <UiFormHelperText class="mb-2">{{ $t('form.passwordHint') }}</UiFormHelperText>
          </label>
        </div>

        <div class="flex items-center">
          <SfCheckbox
            id="terms"
            v-model="termsAndConditionsModel"
            data-testid="terms-checkbox"
            value="value"
            class="peer"
            required
          />
          <label
            class="ml-3 text-base text-neutral-900 cursor-pointer font-body peer-disabled:text-disabled-900"
            for="terms"
          >
            *
            <i18n-t keypath="form.termsAndConditionsLabel" scope="global">
              <template #terms>
                <SfLink
                  href="#"
                  class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                >
                  {{ $t('termsAndConditions') }}
                </SfLink>
              </template>
            </i18n-t>
          </label>
        </div>

        <div class="flex mb-2">
          <SfCheckbox
            id="subscription"
            v-model="subscriptionsModel"
            data-testid="newsletter-checkbox"
            value="value"
            class="peer mt-0.5"
          />
          <label
            class="ml-3 text-base text-neutral-900 cursor-pointer font-body peer-disabled:text-disabled-900"
            for="subscription"
          >
            {{ $t('form.subscriptionLabel') }}
          </label>
        </div>

        <p class="text-sm text-neutral-500 mt-0.5 mb-2">{{ $t('form.asterixHint') }}</p>

        <SfButton data-testid="submit-button" type="submit" size="lg" class="w-full">
          {{ $t('auth.signup.createButton') }}
        </SfButton>
      </form>

      <UiModal
        v-model="isOpen"
        class="max-w-[480px] inset-x-4 md:inset-x-0"
        tag="section"
        role="alertdialog"
        disable-click-away
        aria-labelledby="signUpModalTitle"
        aria-describedby="signUpModalDesc"
      >
        <header class="flex items-center flex-col">
          <img
            src="/images/signup-success.svg"
            :alt="$t('auth.signup.modal.imageAlt')"
            width="192"
            height="192"
            class="my-6"
          />
          <h2 id="signUpModalTitle" class="mt-6 mb-4 font-semibold typography-headline-3">
            {{ $t('auth.signup.modal.heading') }}
          </h2>
        </header>
        <UiAlert class="w-full p-4 mb-6 !justify-start typography-text-base" variant="neutral">
          <i18n-t id="signUpModalDesc" keypath="auth.signup.modal.description" tag="p" scope="global">
            <template #information>
              <SfLink
                :tag="NuxtLinkLocale"
                :to="paths.account"
                class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
              >
                {{ $t('auth.signup.modal.information') }}
              </SfLink>
            </template>
          </i18n-t>
        </UiAlert>

        <footer class="flex justify-end">
          <SfButton :tag="NuxtLinkLocale" :to="paths.home" class="w-full">
            {{ $t('auth.signup.modal.button') }}
          </SfButton>
        </footer>
      </UiModal>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfInput, SfCheckbox, SfLink, useDisclosure, SfIconError } from '@storefront-ui/vue';
import { isSpecificSdkHttpError } from '@vue-storefront/sdk';

definePageMeta({
  layout: false,
});

const { isOpen, open } = useDisclosure();
const { mutate: registerCustomer, error } = useRegisterCustomer({
  onSuccess() {
    open();
  },
});

const firstNameModel = ref('');
const lastNameModel = ref('');
const emailModel = ref('');
const passwordModel = ref('');
const termsAndConditionsModel = ref<boolean>();
const subscriptionsModel = ref<boolean>();

const register = async () => {
  registerCustomer({
    firstName: firstNameModel.value,
    lastName: lastNameModel.value,
    email: emailModel.value,
    password: passwordModel.value,
  });
};
const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');

onUnmounted(() => {
  error.value = null;
});
</script>
