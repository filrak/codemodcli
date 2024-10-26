<template>
  <div>
    <NuxtLayout name="auth" :heading="$t('auth.login.heading')">
      <form class="border-neutral-200 md:border flex flex-col gap-4 md:p-6 rounded-md" @submit.prevent="login">
        <UiAlert v-if="error" variant="error" class="mb-4 w-full" data-testid="passwordResetErrorAlert">
          <template #prefix>
            <SfIconWarning class="mr-2 text-red-700 shrink-0" />
          </template>
          {{ $t('auth.login.error') }}
        </UiAlert>
        <label>
          <UiFormLabel>{{ $t('form.emailLabel') }}</UiFormLabel>
          <SfInput
            v-model="email"
            data-testid="email-input"
            name="email"
            type="email"
            autocomplete="username"
            required
          />
        </label>

        <label>
          <UiFormLabel>{{ $t('form.passwordLabel') }}</UiFormLabel>
          <UiFormPasswordInput
            v-model="password"
            data-testid="password-input"
            name="password"
            autocomplete="current-password"
            required
            :pattern="undefined"
          />
        </label>

        <label class="mt-2 flex items-center gap-2">
          <SfCheckbox v-model="rememberMe" name="rememberMe" />
          {{ $t('auth.login.rememberMeLabel') }}
        </label>

        <SfButton data-testid="submit-button" type="submit" class="mt-2" :disabled="loading">
          <SfLoaderCircular v-if="loading" class="flex justify-center items-center" size="base" />
          <span v-else>
            {{ $t('auth.login.submitLabel') }}
          </span>
        </SfButton>
      </form>

      <UiAlert class="mt-6 w-full p-4 md:p-6 !justify-start typography-text-base max-w-none" variant="neutral">
        <i18n-t tag="span" keypath="auth.login.createAccountBanner" scope="global">
          <template #createAccount>
            <SfLink data-testid="register-link" :tag="NuxtLinkLocale" :to="paths.authSignup" variant="primary">
              {{ $t('auth.login.createAccountLinkLabel') }}
            </SfLink>
          </template>
        </i18n-t>
      </UiAlert>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfLink, SfCheckbox, SfInput, SfLoaderCircular, SfIconWarning } from '@storefront-ui/vue';

definePageMeta({
  layout: false,
});

const router = useRouter();
const localePath = useLocalePath();
const { loading, error, mutate } = useLoginCustomer({
  onSuccess() {
    router.push(localePath(paths.accountPersonalData));
  },
});

const email = ref('');
const password = ref('');
const rememberMe = ref<boolean>();

const login = async () => {
  await mutate({
    email: email.value,
    password: password.value,
  });
};
onUnmounted(() => {
  error.value = null;
});
const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
