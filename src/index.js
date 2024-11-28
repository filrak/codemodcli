const { runCodemod } = require('./codemod');

runCodemod({ 
    repository: { 
      url:'https://github.com/vuestorefront/unified-storefronts', 
      copyTo: 'playground' 
    },
    instructions: {
      path: '/playground/instructions/01.md',
      extractFilesToEdit: true,
      // fromUrl: {
      //   url: 'https://docs.alokai.com/storefront/modules/product-list',
      //   querySelector: '.document-driven-page'
      // }
    },
    workingDir: '/playground/unified-storefronts/apps/storefront-unified-nuxt/',
    framework: 'nuxt' 
})

// todo- id adds weird import to searchparams in the category[[...slugs]]/page.tsx