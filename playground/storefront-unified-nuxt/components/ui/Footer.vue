<template>
  <footer class="pt-10 bg-neutral-100 mb-[58px] md:mb-0" data-testid="footer">
    <div
      class="grid gap-5 justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 mx-auto max-w-screen-3xl"
      data-testid="section-top"
    >
      <div
        v-for="{ key, subcategories } in categories"
        :key="key"
        data-testid="footer-category"
        class="min-w-[25%] extra-small:min-w-[50%] flex flex-col"
      >
        <div data-testid="footer-headers" class="font-medium leading-7 text-neutral-900 text-lg pb-2">
          {{ $t(`categories.${key}.label`) }}
        </div>
        <NuxtLinkLocale
          v-for="{ key: subcategoryKey, link } in subcategories"
          :key="subcategoryKey"
          data-testid="footer-item"
          class="text-sm leading-5 py-2 text-neutral-600 hover:underline"
          :to="link"
        >
          {{ $t(`categories.${key}.subcategories.${subcategoryKey}`) }}
        </NuxtLinkLocale>
      </div>
    </div>
    <hr />
    <div class="py-10 lg:flex mx-auto max-w-screen-3xl" data-testid="section-middle">
      <div
        v-for="{ key, icon, link, details } in contactOptions"
        :key="key"
        data-testid="footer-section"
        class="mx-auto my-4 text-center flex flex-col items-center"
      >
        <component :is="icon" size="lg" />
        <p class="py-1 my-2 font-medium typography-text-lg font-body">
          <NuxtLinkLocale
            data-testid="footer-headline"
            class="font-medium leading-7 text-neutral-900 text-lg py-1 my-2"
            :to="link"
          >
            {{ $t(`contactOptions.${key}.label`) }}
          </NuxtLinkLocale>
        </p>
        <p v-for="option in details" :key="option" data-testid="footer-description-line" class="text-sm leading-5">
          {{ $t(`contactOptions.${key}.details.${option}`) }}
        </p>
      </div>
    </div>
    <div class="bg-neutral-900" data-testid="section-bottom">
      <div class="mx-auto max-w-screen-3xl text-sm leading-5 text-white justify-end px-4 py-10 lg:flex lg:py-6">
        <div class="flex justify-center gap-6 lg:self-start">
          <NuxtLinkLocale
            v-for="{ label, link, icon } in socialMedia"
            :key="label"
            :to="link"
            :title="$t('socialLabel', { label })"
            class="hover:bg-neutral-500 hover:shadow-[0_0_0_8px] hover:shadow-neutral-500 rounded-full"
            :data-testid="label"
          >
            <component :is="icon" />
          </NuxtLinkLocale>
        </div>
        <div class="flex justify-center gap-6 my-6 lg:ml-auto lg:my-0">
          <NuxtLinkLocale v-for="{ key, link } in bottomLinks" :key="key" data-testid="bottom-link" :to="link">
            {{ $t(`bottomLinks.${key}`) }}
          </NuxtLinkLocale>
        </div>
        <p class="text-center text-white/50 lg:ml-6">
          {{ companyName }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { bottomLinks, categories, companyName, contactOptions, socialMedia } from '~/mocks';
</script>
