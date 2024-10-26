export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server || import.meta.env.NODE_ENV === 'test') {
    return;
  }

  nuxtApp.hook('vue:setup', () => {
    // Nuxt issue https://github.com/danielroe/nuxt-vitest/issues/181
    const { fetchCart } = useCart();
    fetchCart();
  });

  nuxtApp.hook('app:beforeMount', () => {
    const { getCustomer } = useCustomer();
    getCustomer();
  });
});
