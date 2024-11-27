const fs = require('fs');

function fileListToObject(fileList) {
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

function isFile(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}

function readFiles(dirPath) {
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

// utilities

const directory = (path) => ({
  toObject: () => {
      return readFiles(path);
  }
});


const file = (path) => ({
  toString: async function () {
      try {
          const content = await fs.promises.readFile(path, 'utf8');
          return content;
      } catch (error) {
          console.error('Error reading file:', error);
          return '';
      }
  },
  save: async function (content) {
      try {
          await fs.promises.writeFile(path, content);
      } catch (error) {
          console.error('Error saving file:', error);
      }
  }
});

module.exports = { 
  fileListToObject, 
  readFiles, 
  readFile,
  writeFile,
  isFile,
  file,
  directory
};
