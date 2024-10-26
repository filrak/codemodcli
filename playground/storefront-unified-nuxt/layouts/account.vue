<template>
  <div>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <NarrowContainer>
        <div :class="['mb-20 md:px-0', { 'px-4': !isRoot }]" data-testid="account-layout">
          <h1
            class="mt-4 mb-10 md:my-10 mx-4 md:mx-0 font-semibold typography-headline-3 md:typography-headline-2"
            :class="{
              'hidden md:block': !isRoot,
            }"
          >
            {{ $t('account.heading') }}
          </h1>
          <div
            class="flex justify-start items-center mb-10 mt-4"
            :class="{
              'md:hidden': !isRoot,
            }"
          >
            <div v-for="({ subsections }, i) in sections" :key="i">
              <div v-for="{ label, link } in subsections" :key="label" class="font-semibold typography-headline-3">
                <h1 v-if="currentPath?.path === link">{{ label }}</h1>
              </div>
            </div>
            <SfButton
              :tag="NuxtLinkLocale"
              :to="paths.account"
              class="flex md:hidden whitespace-nowrap justify-self-end ml-auto"
              size="sm"
              variant="tertiary"
            >
              <template #prefix>
                <SfIconArrowBack />
              </template>
              {{ $t('account.back') }}
            </SfButton>
          </div>
          <div class="md:flex gap-10" data-testid="account-page-sidebar">
            <div>
              <div
                :class="[
                  'border-t md:border border-neutral-200 pt-4 pb-4 md:p-4 md:rounded-md min-w-[300px] md:block',
                  { hidden: !isRoot },
                ]"
              >
                <ul v-for="{ title, icon, subsections } in sections" :key="title" class="[&:not(:first-child)]:mt-4">
                  <SfListItem class="py-4 md:py-2 hover:!bg-transparent font-medium !cursor-auto">
                    <template #prefix><component :is="icon" /></template>
                    {{ title }}
                  </SfListItem>
                  <li v-for="{ label, link, testId } in subsections" :key="label">
                    <SfListItem
                      :tag="NuxtLinkLocale"
                      :to="link"
                      :class="[
                        'first-of-type:py-4 md:first-of-type:px-4 md:first-of-type:py-2 rounded-md active:bg-primary-100 !text-neutral-900',
                        {
                          'font-medium bg-primary-100': router.currentRoute.value.path === link,
                        },
                      ]"
                    >
                      <template #prefix><SfIconBase :data-testid="testId" /></template>
                      {{ label }}
                      <template #suffix><SfIconChevronRight class="md:hidden" /></template>
                    </SfListItem>
                  </li>
                </ul>
                <UiDivider class="mt-4 md:hidden" />
                <ul>
                  <SfListItem
                    class="py-4 md:py-2 mt-4 rounded-md active:bg-primary-100 !text-neutral-900"
                    data-testid="navigation-item-logout"
                    @click="logout()"
                  >
                    <template #prefix><SfIconBase /></template>
                    {{ $t('account.logout') }}
                  </SfListItem>
                </ul>
              </div>
            </div>
            <div class="flex-1">
              <client-only>
                <section data-testid="category-grid">
                  <slot v-if="customer" />
                </section>
                <template #fallback>
                  <div class="flex justify-center items-center h-full">
                    <SfLoaderCircular size="3xl" :aria-label="$t('loading')" />
                  </div>
                </template>
              </client-only>
            </div>
          </div>
        </div>
      </NarrowContainer>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  SfIconBase,
  SfIconPerson,
  SfIconShoppingCart,
  SfListItem,
  SfButton,
  SfIconArrowBack,
  SfIconChevronRight,
  SfLoaderCircular,
} from '@storefront-ui/vue';

const getRouteBaseName = useRouteBaseName();
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const { customer } = storeToRefs(useSfState());
const { loading } = useCustomer();
const { mutate: logout } = useLogoutCustomer({
  onSuccess() {
    router.push(localePath(paths.home));
  },
});

const sections = [
  {
    title: t('account.accountSettings.heading'),
    icon: SfIconPerson,
    subsections: [
      {
        label: t('account.accountSettings.section.personalData'),
        link: paths.accountPersonalData,
        testId: 'navigation-item-personaldata',
      },
      {
        label: t('account.accountSettings.section.shippingDetails'),
        link: paths.accountShippingDetails,
        testId: 'navigation-item-shippingdetails',
      },
    ],
  },
  {
    title: t('account.ordersAndReturns.heading'),
    icon: SfIconShoppingCart,
    subsections: [
      {
        label: t('account.ordersAndReturns.section.myOrders'),
        link: paths.accountMyOrders,
        testId: 'navigation-item-myorders',
      },
      {
        label: t('account.ordersAndReturns.section.returns'),
        link: paths.accountReturns,
        testId: 'navigation-item-returns',
      },
    ],
  },
];

const currentPath = computed(() => router.currentRoute.value);
const isRoot = computed(() => getRouteBaseName(currentPath.value) === 'my-account');
const findCurrentPage = computed(() =>
  sections.flatMap(({ subsections }) => subsections).find(({ link }) => currentPath.value?.path.includes(link)),
);
const breadcrumbs = computed(() => [
  { name: t('home'), link: paths.home },
  { name: t('account.heading'), link: paths.account },
  ...(isRoot.value ? [] : [{ name: findCurrentPage.value?.label, link: currentPath.value }]),
]);

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale');

watchEffect(() => {
  if (!customer.value && !loading.value) {
    router.push(paths.authLogin);
  }
});
</script>
