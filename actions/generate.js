const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const childProcess = require("child_process");
const {
  ENV_VARIABLES,
  GIT_REPO_URL,
  promptQuestions,
} = require("../config/config");
const CWD = process.cwd();
const { promptInput } = require("../utils/prompt");

module.exports = async () => {
  const answers = await promptInput(promptQuestions);

  const projectPath = path.join(CWD, answers.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`${answers.projectName} already exists`);
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
      ENV_VARIABLES.DB_CONNECTION += `${answers.projectName}`;

    const envFileContent = Object.entries(ENV_VARIABLES)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join("\n");

    fs.promises.writeFile(".env", envFileContent);

    console.log("successfully generated .env");

    console.log(
      `your project ${answers.projectName} has been setup successfully`
    );
  } catch (error) {
    console.log(error);
  }
};
