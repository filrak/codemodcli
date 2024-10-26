import { ModuleOptions } from '@nuxt/image';
import { defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';
import type { CloudinaryProviderOptions } from './types';

export default defineNuxtModule({
  async setup(_, nuxt) {
    nuxt.options.runtimeConfig.public.imageLoader = defu(
      nuxt.options.runtimeConfig.public?.imageLoader as CloudinaryProviderOptions,
      {
        fetchUrl: undefined,
        uploadUrl: undefined,
      },
    );

    nuxt.options.image = {
      ...nuxt.options.image,
      provider: 'alokai',
      providers: {
        alokai: {
          provider: '~/modules/alokai-cloudinary/provider',
        },
      },
    } as ModuleOptions;
  },
});
