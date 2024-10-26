import path from 'node:path';

export default defineNuxtConfig({
  alias: {
    '@sf-modules': path.resolve(__dirname, '.', 'sf-modules'),
    '@sf-modules-middleware': path.resolve(__dirname, '..', 'storefront-middleware', 'sf-modules'),
  },
  runtimeConfig: {
    defaultHtmlCacheControl: 'public, max-age=0, s-maxage=15, must-revalidate',
  },
  devtools: { enabled: true },
  devServer: {
    port: 3333,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      meta: [
        { name: 'description', content: 'Alokai - the best storefront for composable commerce.' },
        { name: 'theme-color', content: '#018937' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' },
      ],
    },
  },
  appConfig: {
    titleSuffix: 'Alokai Storefront',
    cookieNames: {
      currency: 'vsf-currency',
      locale: 'vsf-locale',
    },
  },
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
  css: ['~/assets/style.scss'],
  image: {
    screens: {
      '4xl': 1920,
      '3xl': 1536,
      '2xl': 1366,
      xl: 1280,
      lg: 1024,
      md: 768,
      sm: 640,
      xs: 376,
      '2xs': 360,
    },
  },
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: [300, 400, 500, 600, 700],
        },
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en/index.ts',
          },
          {
            code: 'de',
            file: 'de/index.ts',
          },
        ],
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'en',
      },
    ],
    '@nuxt/image',
    '@vite-pwa/nuxt',
    'nuxt-lazy-hydrate',
    '@vue-storefront/nuxt',
    '@storefront-ui/nuxt',
    'nuxt-jsonld',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/icons/**': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/favicon.ico': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/my-account/**': { ssr: false },
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,json,css,html,ico,svg,png,webp,ico,woff,woff2,ttf,eit,otf}', 'icons/*'],
      globIgnores: ['manifest**.webmanifest'],
      additionalManifestEntries: [
        {
          url: '/offline',
          revision: Math.random().toString(32),
        },
      ],
      navigationPreload: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkOnly',
          options: {
            precacheFallback: {
              fallbackURL: '/offline',
            },
          },
        },
      ],
      cleanupOutdatedCaches: true,
    },
    manifest: {
      name: 'Alokai x Nuxt3 (Unified)',
      short_name: 'AlokaiNuxt3Unified',
      theme_color: '#018937',
      icons: [
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    registerWebManifestInRouteRules: true,
  },
});
