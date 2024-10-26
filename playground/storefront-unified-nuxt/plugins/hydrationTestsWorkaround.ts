export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    // Cypress issue https://github.com/robipop22/dnb-stack/issues/3#issuecomment-1463031001
    document.querySelector('html')?.setAttribute('data-hydrated', 'true');
  });
});
