const { useChat } = require('./chat');
const { readFileList, readFiles } = require('./files');
const fs = require('fs');

const fromContent = (content) => ({
    extractFilesToEdit: async (additionalInstructions) => {
        const { content: filesToEdit } = await useChat(`Read the following file and extract the list of files that needs to be changed. Answer only with a list of files separated by commas${additionalInstructions}, ${fileContent}`);
        const filesToModify = filesToEdit.split(',').map(file => currentDirectory + options.workingDir + file.replace(/\s/g, ''));
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
    },
    edit: async function (instructions) {
        const { content: editedContent } = await useChat(`Edit the following file content by following the instructions: ${instructions}, ${this.toString()}`);
        this.save(editedContent);
    }
});


module.exports = {
    fromFile,
    directory,
    saveToFile,
    file,
    fromContent
}