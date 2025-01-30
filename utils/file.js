const fs = require("fs");
const path = require("path");

async function generateFile(filePath, fileContent) {
  const basename = path.basename(filePath);
  console.log(`\nGenerating ${basename} file...`);
  await fs.promises.writeFile(filePath, fileContent);
  console.log(`successfully generated ${basename}\n`);
}

module.exports = {
  generateFile,
};
