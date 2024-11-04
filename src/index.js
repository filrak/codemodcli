const { runCodemod } = require('./codemod');

runCodemod({ 
    repository: { 
      url:'https://github.com/vuestorefront/unified-storefronts', 
      copyTo: 'playground' 
    },
    instructions: {
      path: '/playground/instructions/01.md',
      extractFilesToEdit: true,
    },
    workingDir: '/playground/unified-storefronts/apps/storefront-unified-nuxt/',
    framework: 'nuxt' 
  })