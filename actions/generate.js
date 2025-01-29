const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const childProcess = require("child_process");
const { ENV_VARIABLES, GIT_REPO_URL } = require("../constants");
const CWD = process.cwd();

module.exports = async () => {
  const prompt = inquirer.createPromptModule();
  const answer = await prompt([
    {
      name: "projectName",
      message: "What is the project name?",
      type: "input",
    },
  ]);

  const projectPath = path.join(CWD, answer.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`${answer.projectName} already exists`);
    return;
  }

  try {
    const git = simpleGit();
    console.log(`generating files and directories...`);
    await git.clone(GIT_REPO_URL, projectPath);
    console.log(`successfully generated files and directories`);
    process.chdir(projectPath);
    console.log("installing dependencies...");
    childProcess.execSync("npm install", { stdio: "inherit" });
    console.log("");
    console.log("successfully installed dependencies");

    console.log("Generating .env file...");

    ENV_VARIABLES.DB_CONNECTION =
      ENV_VARIABLES.DB_CONNECTION += `${answer.projectName}`;

    const envFileContent = Object.entries(ENV_VARIABLES)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join("\n");

    fs.promises.writeFile(".env", envFileContent);

    console.log("successfully generated .env");

    console.log(
      `your project ${answer.projectName} has been setup successfully`
    );
  } catch (error) {
    console.log(error);
  }
};
