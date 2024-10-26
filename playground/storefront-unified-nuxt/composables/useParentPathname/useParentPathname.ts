/**
 * A custom composable that returns the parent pathname.
 * If the current pathname is the root, it returns an empty string.
 *
 * @returns Parent pathname
 *
 * @example
 * const parentPathname = useParentPathname();
 */
export function useParentPathname() {
  const route = useRoute();

  return computed(() => (route.path ? route.path.split('/').slice(0, -1).join('/') : ''));
}
