const fs = require("fs");
const path = require("path");

const { ENV_VARIABLES, GIT_REPO_URL } = require("../config/config");
const { promptInput } = require("../utils/prompt");
const { clone } = require("../utils/git");
const { generateFile } = require("../utils/file");
const { runCommand } = require("../utils/runner");

module.exports = async () => {
  const answers = await promptInput([
    {
      name: "projectName",
      message: "What is the project name?",
      type: "input",
    },
  ]);

  const CWD = process.cwd();
  const projectPath = path.join(CWD, answers.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`${answers.projectName} already exists`);
    return;
  }

  try {
    // cloning git repo
    await clone(GIT_REPO_URL, answers.projectName);

    // installing dependencies
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    await runCommand(npmCommand, ["install"], { cwd: projectPath });

    // generating .env file
    const envFilePath = path.join(projectPath, ".env");
    ENV_VARIABLES.DB_CONNECTION =
      ENV_VARIABLES.DB_CONNECTION += `${answers.projectName}`;
    const envFileContent = Object.entries(ENV_VARIABLES)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join("\n");
    await generateFile(envFilePath, envFileContent);

    console.log(
      `your project ${answers.projectName} has been setup successfully\n`
    );
  } catch (error) {
    console.log(error);
  }
};
