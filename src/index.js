const fs = require('fs');
const { useChat } = require('./chat');
const { fetchRepository } = require('./repo');
const { EDITABLES_DIR, INSTRUCTIONS_DIR } = require('./consts');

async function run(options = { repositoryUrl, instructionsDir, filesDir: '/', framework }) {
    const frameworkInstructions = {
      nuxt: 'Ignore tsx file edits and dont put them on a list.',
      next: 'Ignore vue files edits and dont put them on a list.'
    }

    const filesDir = EDITABLES_DIR + options.filesDir

    const currentDirectory = process.cwd();
    const instructions = readFile(currentDirectory +  options.instructionsDir);
    const { content: fileToEdit } = await useChat('Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas' + frameworkInstructions[options.framework]+ instructions);
    const filesToModify = fileToEdit.split(',').map(file => currentDirectory + filesDir + file.replace(/\s/g, ''));
    const filesToModifyContent = await getFileContent(filesToModify);
    
    for (const [filePath, content] of Object.entries(filesToModifyContent)) {
        const changedFile = await useChat('Modify the following file ' + content + ' according to the instructions in ' + instructions + ', and return only the modified file. Do not include any other text than the modified file, even the formatting for code blocks.');
        writeFile(filePath, changedFile.content);
    }
}

run({ 
  repositoryUrl: '',
  instructionsDir: '/playground/instructions/01.md',
  filesDir: '/playground/storefront-unified-nuxt/', 
  framework: 'nuxt' 
})

// fetchRepository('https://github.com/vuestorefront/vue-storefront');