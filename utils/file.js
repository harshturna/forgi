const fs = require("fs");
const path = require("path");

async function generateFile(filePath, fileContent) {
  const basename = path.basename(filePath);
  console.log(`\ngenerating ${basename} file...`);
  await fs.promises.writeFile(filePath, fileContent);
  console.log(`successfully generated ${basename}\n`);
}

async function deleteFile(filePath) {
  const basename = path.basename(filePath);
  console.log(`\ndeleting ${basename} file...`);
  await fs.promises.unlink(filePath);
  console.log(`successfully delete ${basename}\n`);
}

async function deleteDir(dirPath) {
  await fs.promises.rm(dirPath, { recursive: true, force: true });
}

module.exports = {
  generateFile,
  deleteFile,
  deleteDir,
};
