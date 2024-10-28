const fs = require('fs');
const { useChat } = require('./chat');

async function getFileContent(fileList) {
  const fileContent = {};
  for (const filePath of fileList) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      fileContent[filePath] = content;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }
  return fileContent;
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}

async function main() {
    const frameworkInstructions = {
      nuxt: 'Ignore tsx file edits and dont put them on a list.',
      next: 'Ignore vue files edits and dont put them on a list.'
    }
    
    const currentDirectory = process.cwd();
    const instructions = readFile(currentDirectory + '/playground/instructions/01.md');
    const { content: fileToEdit } = await useChat('Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas' + frameworkInstructions[nuxt]+ instructions);
    const filesToModify = fileToEdit.split(',').map(file => currentDirectory + '/playground/storefront-unified-nuxt/' + file.replace(/\s/g, ''));
    const filesToModifyContent = await getFileContent(filesToModify);
    
    for (const [filePath, content] of Object.entries(filesToModifyContent)) {
        const changedFile = await useChat('Modify the following file ' + content + ' according to the instructions in ' + instructions + ', and return only the modified file. Do not include any other text than the modified file, even the formatting for code blocks.');
        writeFile(filePath, changedFile.content);
    }
}

main()
