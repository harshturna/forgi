const GIT_REPO_URL = "https://github.com/kal-kidan/nodejs-mvc-boilerplate";
const ENV_VARIABLES = {
  DB_CONNECTION: "mongodb://localhost:27017/",
  PORT: 3000,
  NODE_ENV: "development",
};

// prompt inputs
const projectNameInputQuestion = {
  name: "projectName",
  message: "What is the project name?",
  type: "input",
};

module.exports = {
  GIT_REPO_URL,
  ENV_VARIABLES,
  promptQuestions: [projectNameInputQuestion],
};
