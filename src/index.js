const fs = require('fs');
const path = require('path');
const { useChat } = require('./chat');

function getFiles(directory) {
  const result = {};

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        const relativePath = path.relative(directory, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        result[relativePath] = content;
      }
    }
  }

  traverseDirectory(directory);
  return result;
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
  const currentDirectory = process.cwd();
    const instructions = getFiles(currentDirectory + '/playground/instructions');
    const { content: fileToEdit } = await useChat('Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas' + instructions['01.md']);
    // const fileDirsToModify = files.split(',').map(file => currentDirectory + '/playground/storefront-unified-nuxt/' + file);
    // const filesToMofify = getFiles(fileDirsToModify)
    const changedFiles = await useChat('Modify the following file ' + readFile(currentDirectory + '/playground/storefront-unified-nuxt/' + fileToEdit) + ' according to the instructions in ' + instructions['01.md'] + ' and return only the modified file');
    writeFile(currentDirectory + '/playground/storefront-unified-nuxt/' + fileToEdit, changedFiles.content);
}

main()
