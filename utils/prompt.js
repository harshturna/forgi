const inquirer = require("inquirer");

async function promptInput(questions) {
  const prompt = inquirer.createPromptModule();
  return prompt(questions);
}

module.exports = { promptInput };
