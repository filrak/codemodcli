const { useChat } = require('./chat');
const { cloneRepository } = require('./repo');
const { readFileList, readFile, writeFile, isFile,  readFiles } = require('./files');
const { bold, green} = require('kleur');

const frameworkInstructions = {
  nuxt: 'Ignore tsx file edits and dont put them on a list.',
  next: 'Ignore vue files edits and dont put them on a list.'
}

async function runCodemod(options = { workingDir: '/' }) {

    if(options.repository) {
      console.log(bold('Cloning repository...'));
      await cloneRepository(options.repository);
      console.log(bold().green('Done!'));
    }

    const currentDirectory = process.cwd();
    const instructions = isFile(currentDirectory + options.instructions.path)
      ? readFile(currentDirectory + options.instructions.path)
      : readFiles(currentDirectory + options.instructions.path);
      
    let filesToModifyContent;

    if (options.instructions.extractFilesToEdit) {
      console.log(bold('Extracing list of files to edit from the instructions...'));
      const { content: fileToEdit } = await useChat('Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas' + frameworkInstructions[options.framework]+ instructions);
      const filesToModify = fileToEdit.split(',').map(file => currentDirectory + options.workingDir + file.replace(/\s/g, ''));
      filesToModifyContent = readFileList(filesToModify);
      console.log(bold().green('Done!'));
    } else {
      filesToModifyContent = readFiles(currentDirectory + options.workingDir);
    }
    console.log(bold('Modifying the files...'));

    for (const [filePath, content] of Object.entries(filesToModifyContent)) {
        const changedFile = await useChat('You are a developer with a task of modifying a list of files following specific instructions. Modify the following file ' + content + ' according to the instructions in ' + instructions + ', and return only the modified file. Do not include any other text than the modified file, even the formatting for code blocks.');
        writeFile(filePath, changedFile.content);
        console.log(green().bold('Modified file: ') + filePath);
    }
    console.log(bold().bgGreen('Everything done!'));

}

module.exports = {
  runCodemod
}