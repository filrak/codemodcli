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

function isFile(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}

const directory = (path) => ({
  toObject: () => {
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
});


const file = (path) => ({
  toString: function () {
    try {
      return fs.readFileSync(path, 'utf-8');
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return null;
    }
  },
  save: function (content) {
    try {
        fs.writeFileSync(path, content);
    } catch (error) {
        console.error('Error saving file:', error);
    }
  }
});

module.exports = { 
  fileListToObject, 
  isFile,
  file,
  directory
};
