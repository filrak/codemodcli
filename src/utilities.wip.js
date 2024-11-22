const { useChat } = require('./chat');
const { readFileList, readFiles } = require('./files');
const fs = require('fs');

const fromFile = (file) => ({
    extractFilesToEdit: async (file) => {
        const { content: fileToEdit } = await useChat(`Read the following file at ${file} and extract the list of files that needs to be changed. Answer only with a list of files separated by commas${instructions}`);
        const filesToModify = fileToEdit.split(',').map(file => currentDirectory + options.workingDir + file.replace(/\s/g, ''));
        filesToModifyContent = readFileList(filesToModify);
        return filesToModifyContent;
    }
});

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
    fromFile,
    directory,
    saveToFile,
}