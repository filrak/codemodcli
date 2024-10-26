const fs = require('fs');
const path = require('path');

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

}

function writeFile(filePath, content) {

}

function modifyFile(filePath, prompt) {

}

function main() {
  const currentDirectory = process.cwd();
  const files = getFiles(currentDirectory + '/playground/storefront-unified-nuxt/components/AccountData');
  console.log(files);
}

main()
