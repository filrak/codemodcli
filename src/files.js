const fs = require('fs');

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

  module.exports = { 
    getFileContent, 
    readFile, 
    writeFile 
};