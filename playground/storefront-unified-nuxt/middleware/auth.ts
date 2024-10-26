import { callWithNuxt } from '#app';

/*
 * navigateTo() may not work in a try / catch block
 * https://github.com/nuxt/nuxt/issues/14269#issuecomment-1397352832
 */
export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();

  if (import.meta.client && !nuxtApp.isHydrating) {
    const { customer } = storeToRefs(useSfState());
    const { getCustomer } = useCustomer();

    if (customer.value === undefined || customer.value) {
      // check if customer is still logged in
      getCustomer();
    }

    if (customer.value === null) {
      return callWithNuxt(nuxtApp, navigateTo, [paths.authLogin]);
    }
  }
});
