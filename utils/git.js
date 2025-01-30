const simpleGit = require("simple-git");

async function clone(repoUrl, projectName) {
  const git = simpleGit();
  console.log(`\ngenerating files and directories...`);
  await git.clone(repoUrl, projectName);
  console.log(`successfully generated files and directories\n`);
}

module.exports = {
  clone,
};
