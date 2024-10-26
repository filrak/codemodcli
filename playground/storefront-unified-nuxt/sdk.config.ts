import type { CommerceEndpoints, UnifiedCmsEndpoints, UnifiedEndpoints } from '../storefront-middleware/types';

export default defineSdkConfig(({ buildModule, middlewareModule, getRequestHeaders, config }) => ({
  commerce: buildModule(middlewareModule<CommerceEndpoints>, {
    apiUrl: `${config.middlewareUrl}/commerce`,
    defaultRequestConfig: {
      headers: getRequestHeaders(),
    },
    cdnCacheBustingId: config.cdnCacheBustingId,
  }),
  unified: buildModule(middlewareModule<UnifiedEndpoints>, {
    apiUrl: `${config.middlewareUrl}/commerce/unified`,
    defaultRequestConfig: {
      headers: getRequestHeaders(),
    },
    cdnCacheBustingId: config.cdnCacheBustingId,
    methodsRequestConfig: config.defaultMethodsRequestConfig.unifiedCommerce.middlewareModule,
  }),
  unifiedCms: buildModule(middlewareModule<UnifiedCmsEndpoints>, {
    apiUrl: `${config.middlewareUrl}/cms/unified`,
    defaultRequestConfig: {
      headers: getRequestHeaders(),
    },
  }),
}));
