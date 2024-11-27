const { bold, green } = require('kleur');

const { useChat } = require('./chat');
const { cloneRepository } = require('./repo');
const { fileListToObject, writeFile, isFile, directory, file } = require('./files');
const { useScrapper } = require('./scrapping');

const frameworkInstructions = {
  nuxt: 'Ignore tsx file edits and dont put them on a list.',
  next: 'Ignore vue files edits and dont put them on a list.'
}

async function runCodemod(options = { workingDir: '/' }) {
  const currentDirectory = process.cwd();
  let instructions;
  let filesToModifyContent;

  if (options.repository) {
    console.log(bold('Cloning repository...'));
    await cloneRepository(options.repository);
    console.log(bold().green('Done!'));
  }
  
  if (options.instructions.fromUrl) {
    console.log(bold('Fetching instructions from URL...'));
    instructions = await useScrapper(
      options.instructions.fromUrl.url, 
      options.instructions.fromUrl.querySelector
    );
    console.log(bold().green('Done!'));
  } else {
    instructions = isFile(currentDirectory + options.instructions.path)
      ? file(currentDirectory + options.instructions.path).toString()
      : directory(currentDirectory + options.instructions.path).toObject();
  }

  if (options.instructions.extractFilesToEdit) {
    console.log(bold('Extracing list of files to edit from the instructions...'));
    const { content: filesToEdit } = await useChat(`Read the following instructions and extract the list of files that needs to be changed. Answer only with a list of files separated by commas${frameworkInstructions[options.framework]}${instructions}`);
    const filesToModify = filesToEdit.split(',').map(file => currentDirectory + options.workingDir + file.replace(/\s/g, ''));
    filesToModifyContent = fileListToObject(filesToModify);
    console.log(bold().green('Done!'));
  } else {
    filesToModifyContent = directory(currentDirectory + options.workingDir).toObject();
  }
  
  console.log(bold('Modifying the files...'));
  for (const [filePath, content] of Object.entries(filesToModifyContent)) {
      const changedFile = await useChat(`You are a developer with a task of modifying a list of files following specific instructions. Modify the following file ${content} according to the instructions in ${instructions}, and return only the modified file. Do not include any other text than the modified file, even the formatting for code blocks.`);
      writeFile(filePath, changedFile.content);
      console.log(green().bold('Modified file: ') + filePath);
  }
  console.log(bold().bgGreen('Everything done!'));
}

module.exports = {
  runCodemod
}