import type { Ref } from 'vue';

/**
 * Generic interface for a CMS page.
 */
type CmsPage = Record<string, any>;

export function useCmsPage<Page = CmsPage>() {
  const sdk = useSdk();
  const { path } = useRoute();
  const { stripLocalePath } = useLocation();
  const { locale } = storeToRefs(useSfState());
  const page: Ref<Page | null> = useState(() => null);

  async function getPage() {
    const cmsPage = await sdk.unifiedCms.getPage({ path: stripLocalePath(path), locale: locale.value });
    page.value = cmsPage;
    return cmsPage;
  }

  return { page, getPage, initLivePreview: () => {} };
}
