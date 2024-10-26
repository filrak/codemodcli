<template>
  <UiNavbarTop filled>
    <SfButton
      class="hidden md:flex -mx-2 text-white bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
      variant="tertiary"
      :tag="NuxtLinkLocale"
      :to="paths.category"
      data-testid="category-index-link"
    >
      <template #prefix>
        <SfIconMenu class="hidden lg:block" />
      </template>
      {{ $t('allProductsLinkText') }}
    </SfButton>
    <NuxtLazyHydrate when-visible>
      <UiSearch class="hidden md:block flex-1" />
    </NuxtLazyHydrate>
    <nav class="ml-auto flex gap-3">
      <NuxtLazyHydrate when-visible>
        <SfButton
          class="text-white bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
          variant="tertiary"
          :aria-label="$t('selectLocation')"
          data-testid="user-settings-action"
          square
          @click="userSettingsModalOpen"
        >
          <template #prefix>
            <img
              class="border border-neutral-200 rounded-full"
              :src="`/images/${locale}-flag.svg`"
              width="24"
              height="24"
              loading="lazy"
              :alt="`${locale} flag`"
            />
          </template>
          <span class="uppercase whitespace-nowrap hidden lg:inline-block">
            {{ locale }} / {{ getCurrencyLabel(currency) }}
          </span>
        </SfButton>
        <SfButton
          class="max-md:hidden group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md"
          :tag="NuxtLinkLocale"
          :to="paths.cart"
          :aria-label="$t('numberInCart', cartLineItemsCount)"
          variant="tertiary"
          square
        >
          <template #prefix>
            <SfIconShoppingCart />
            <SfBadge
              v-if="cartLineItemsCount"
              :content="cartLineItemsCount"
              class="outline outline-primary-700 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-900 flex justify-center"
              data-testid="cart-badge"
            />
          </template>
        </SfButton>
      </NuxtLazyHydrate>
      <NuxtLazyHydrate when-visible>
        <UiNavbarTopAuthDropdown v-if="isCustomerLoggedIn" />
        <SfButton
          v-else
          :tag="NuxtLinkLocale"
          :to="paths.authLogin"
          square
          variant="tertiary"
          class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md"
          data-testid="account-action"
        >
          <template #prefix><SfIconPerson /></template>
          <span class="whitespace-nowrap hidden lg:inline-block">
            {{ $t('auth.login.heading') }}
          </span>
        </SfButton>
      </NuxtLazyHydrate>
      <SfButton
        variant="tertiary"
        class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md md:hidden"
        square
        :aria-label="$t('openSearchModalButtonLabel')"
        @click="searchModalOpen"
      >
        <SfIconSearch />
      </SfButton>
    </nav>
  </UiNavbarTop>
  <NuxtLazyHydrate when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <SfButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose">
          <SfIconClose class="text-neutral-500" />
        </SfButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-semibold typography-headline-4 mb-4">
          {{ $t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
  <LazyUserSettingsModal v-if="isUserSettingsModalOpen" @on-close="userSettingsModalClose" />
</template>

<script lang="ts" setup>
import {
  SfBadge,
  SfIconMenu,
  SfIconShoppingCart,
  SfIconSearch,
  SfIconPerson,
  useDisclosure,
  SfButton,
  SfIconClose,
  SfModal,
} from '@storefront-ui/vue';

const { isOpen: isSearchModalOpen, open: searchModalOpen, close: searchModalClose } = useDisclosure();
const { isOpen: isUserSettingsModalOpen, close: userSettingsModalClose, open: userSettingsModalOpen } = useDisclosure();

const { getCurrencyLabel } = useCurrency();
const { cart, currency, customer, locale } = storeToRefs(useSfState());
const isCustomerLoggedIn = computed(() => Boolean(customer.value));

const cartLineItemsCount = computed(
  () => cart.value?.lineItems.reduce((total: number, { quantity }: { quantity: number }) => total + quantity, 0) ?? 0,
);

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
