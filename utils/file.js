const fs = require("fs");

async function generateFile(filePath, fileContent) {
  fs.promises.writeFile(filePath, fileContent);
}

module.exports = {
  generateFile,
};
