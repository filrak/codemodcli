const { useChat } = require('./chat');

const fromFile = (path) => ({
    extractFilesToEdit: async (instructions) => {
        const { content: fileToEdit } = await useChat(`Read the following file at ${path} and extract the list of files that needs to be changed. Answer only with a list of files separated by commas${instructions}`);
        const filesToModify = fileToEdit.split(',').map(file => currentDirectory + options.workingDir + file.replace(/\s/g, ''));
        filesToModifyContent = readFileList(filesToModify);
        return filesToModifyContent;
    },
    extractSteps:
});

async function saveToFile(path, content) {
    try {
        const fs = require('fs');
        await fs.promises.writeFile(path, content);
    } catch (error) {
        console.error('Error saving file:', error);
    }
}