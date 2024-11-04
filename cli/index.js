const yargs = require('yargs-parser');
const { runCodemod } = require('../src/codemod');

async function cli() {
    const argv = yargs(process.argv.slice(2));

    await runCodemod({ 
        repository: { 
          url: argv['repo-url'] || 'https://github.com/vuestorefront/unified-storefronts', 
          copyTo: argv['repo-copyto'] || 'playground' 
        },
        instructions: {
          path: argv['instructions-path'] || '/playground/instructions/01.md',
          extractFilesToEdit: argv['instructions-extractfiles'] || false,
        },
        workingDir: argv['workingdir'] || '/playground/unified-storefronts/apps/storefront-unified-nuxt/',
        framework: argv['framework'] || 'nuxt' 
      })
}

cli();