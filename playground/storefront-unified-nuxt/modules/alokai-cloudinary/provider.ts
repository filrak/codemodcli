import { getImage as cloudinaryGetImage } from '#image/providers/cloudinary';
import { ProviderGetImage } from '@nuxt/image';
import { CloudinaryProviderOptions } from './types';

export const getImage: ProviderGetImage = (src, options, ctx) => {
  const runtimeConfig = useRuntimeConfig();

  const { fetchUrl, uploadUrl } = runtimeConfig.public.imageLoader as CloudinaryProviderOptions;

  if (!fetchUrl) {
    console.warn(`NUXT_PUBLIC_IMAGE_LOADER_FETCH_URL is not defined!`);
    return {
      url: src,
    };
  }

  let baseURL = fetchUrl;
  if (!src.startsWith('http') && uploadUrl) {
    baseURL = uploadUrl;
  }

  return cloudinaryGetImage(src, { ...options, baseURL }, ctx);
};
