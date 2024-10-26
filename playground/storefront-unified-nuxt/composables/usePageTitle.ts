/**
 * @description
 * A composable function that sets the page title using the `useHead` function from `@nuxtjs/composition-api`.
 * The page title is generated using the `titleSuffix` value from the `useAppConfig` composable.
 *
 * @example
 * usePageTitle();
 */
export const usePageTitle = () => {
  const { titleSuffix } = useAppConfig();

  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ${titleSuffix}` : titleSuffix;
    },
  });
};
