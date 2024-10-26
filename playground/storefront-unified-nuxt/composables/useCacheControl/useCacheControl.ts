export const useCacheControl = function () {
  const event = useRequestEvent();
  const config = useRuntimeConfig();

  function setCacheControl(value?: string) {
    // Client-side check
    if (!event) {
      return;
    }

    const cacheControl = value ?? config.defaultHtmlCacheControl;
    if (!cacheControl) return;

    event.node.res.setHeader('Cache-Control', cacheControl);
    event.node.res.setHeader('Vary', 'Accept-Encoding');
  }
  return {
    setCacheControl,
  };
};
