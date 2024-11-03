const { useChat } = require('./chat');
const { fetchRepository } = require('./repo');
const { readFileList, readFile, writeFile, isFile,  readFiles } = require('./files');

const frameworkInstructions = {
  nuxt: 'Ignore tsx file edits and dont put them on a list.',
  next: 'Ignore vue files edits and dont put them on a list.'
}

async function run(options = { repository, instructionsDir, filesDir: '/', framework }) {

    if(options.repository) {
      await fetchRepository(options.repository);
    }

    const currentDirectory = process.cwd();
    const instructions = await isFile(currentDirectory + options.instructionsDir) 
      ? await readFile(currentDirectory + options.instructionsDir)
      : await readFiles(currentDirectory + options.instructionsDir);
      
    let filesToModifyContent;

    if (options.extractFilesToEdit) {
      const { content: fileToEdit } = await useChat('Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas' + frameworkInstructions[options.framework]+ instructions);
      const filesToModify = fileToEdit.split(',').map(file => currentDirectory + options.filesDir + file.replace(/\s/g, ''));
       filesToModifyContent =  await readFileList(filesToModify);
    } else {
       filesToModifyContent =  await readFiles(currentDirectory + options.filesDir);
    }
    
    for (const [filePath, content] of Object.entries(filesToModifyContent)) {
        const changedFile = await useChat('Modify the following file ' + content + ' according to the instructions in ' + instructions + ', and return only the modified file. Do not include any other text than the modified file, even the formatting for code blocks.');
        writeFile(filePath, changedFile.content);
    }
}

run({ 
  repository: { 
    url:'https://github.com/vuestorefront/unified-storefronts', 
    dir: 'playground' 
  },
  instructionsDir: '/playground/instructions/01.md',
  extractFilesToEdit: true,
  filesDir: '/playground/unified-storefronts/apps/storefront-unified-nuxt/',
  framework: 'nuxt' 
})
