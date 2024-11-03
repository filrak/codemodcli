const fs = require('fs');

async function readFileList(fileList) {
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

async function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

async function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}
async function isFile(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}
async function readFiles(dirPath) {
  const fileContent = {};
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      if (isFile(filePath)) {
        try {
          fileContent[filePath] = fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  return fileContent;
}

module.exports = { 
  readFileList, 
  readFiles, 
  readFile,
  writeFile,
  isFile
};
