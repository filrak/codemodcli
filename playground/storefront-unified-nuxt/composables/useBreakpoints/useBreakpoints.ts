import { createSharedComposable, syncRefs, useBreakpoints as useBreakpointsVueUse } from '@vueuse/core';

/**
 * @description A composable function that returns reactive refs for checking if the current
 * viewport width is greater than or equal to the specified breakpoints.
 *
 * @returns An object containing reactive refs for `isTablet` and `isDesktop`.
 *
 * @example
 * const { isTablet, isDesktop } = useBreakpoints();
 */
export const useBreakpoints = createSharedComposable(() => {
  const breakpoints = useBreakpointsVueUse({
    tablet: '768px',
    desktop: '1024px',
  });

  const isTablet = ref(false);
  const isDesktop = ref(false);

  onMounted(() => {
    syncRefs(breakpoints.greaterOrEqual('tablet'), isTablet);
    syncRefs(breakpoints.greaterOrEqual('desktop'), isDesktop);
  });

  return {
    isTablet,
    isDesktop,
  };
});
