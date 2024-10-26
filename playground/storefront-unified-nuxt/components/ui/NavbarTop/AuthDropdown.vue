<template>
  <SfDropdown v-model="isOpen" placement="bottom-end" class="max-md:hidden">
    <template #trigger>
      <SfButton
        square
        variant="tertiary"
        class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md"
        :class="{ 'bg-primary-900': isOpen }"
        data-testid="account-action"
        @click="toggle"
      >
        <template #prefix><SfIconPerson /></template>
        <span class="whitespace-nowrap hidden lg:inline-block">
          {{ customer?.firstName }}
        </span>
      </SfButton>
    </template>
    <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
      <li v-for="{ label, link } in accountDropdown" :key="label">
        <template v-if="label === 'account.logout'">
          <UiDivider class="my-2" />
          <SfListItem tag="button" class="text-left" data-testid="account-dropdown-list-item" @click="logout()">
            {{ $t(label) }}
          </SfListItem>
        </template>
        <SfListItem
          v-else
          :tag="NuxtLinkLocale"
          :to="link"
          :class="{ 'bg-neutral-200': $route.path === link }"
          data-testid="account-dropdown-list-item"
        >
          {{ $t(label) }}
        </SfListItem>
      </li>
    </ul>
  </SfDropdown>
</template>

<script setup lang="ts">
import { SfButton, SfDropdown, SfIconPerson, SfListItem, useDisclosure } from '@storefront-ui/vue';

const router = useRouter();
const localePath = useLocalePath();
const { isOpen, toggle } = useDisclosure();
const { customer } = storeToRefs(useSfState());
const { mutate: logout } = useLogoutCustomer({
  onSuccess() {
    toggle();
    if (router.currentRoute.value.fullPath.includes(paths.account)) {
      router.push(localePath(paths.home));
    }
  },
});

const accountDropdown = [
  {
    label: 'account.heading',
    link: paths.accountPersonalData,
  },
  {
    label: 'account.ordersAndReturns.section.myOrders',
    link: paths.accountMyOrders,
  },
  {
    label: 'account.ordersAndReturns.section.returns',
    link: paths.accountReturns,
  },
  {
    label: 'account.logout',
    link: paths.home,
  },
];

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');
</script>
