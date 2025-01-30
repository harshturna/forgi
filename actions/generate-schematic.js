const path = require("path");
const fs = require("fs");

const { promptInput } = require("../utils/prompt");
const {
  getSchematicDir,
  getSchematicContentGenerator,
} = require("../utils/schematic");
const { generateFile } = require("../utils/file");
const {
  generateExportStatement,
  generateModelContent,
} = require("../utils/content");

async function generateSchematic(schematicName) {
  const answers = await promptInput([
    {
      name: "fileName",
      message: `What is the ${schematicName} filename?`,
      type: "input",
    },
    {
      name: "projectName",
      message: `What is the project name?`,
      type: "input",
    },
  ]);

  const CWD = process.cwd();
  const schematicFilePath = path.join(
    CWD,
    answers.projectName,
    getSchematicDir(schematicName),
    `${answers.fileName}.${schematicName}.js`
  );

  if (fs.existsSync(schematicFilePath)) {
    console.log(`${answers.fileName} already exists`);
    return;
  }

  const contentGenerator = getSchematicContentGenerator(schematicName);

  await generateFile(
    schematicFilePath,
    contentGenerator({ fileName: answers.fileName })
  );

  const indexPath = path.join(
    CWD,
    answers.projectName,
    getSchematicDir(schematicName),
    "index.js"
  );

  await fs.promises.appendFile(
    indexPath,
    generateExportStatement(answers.fileName, schematicName)
  );
}

async function createSchematic(schematicName) {
  const answers = await promptInput([
    {
      name: "name",
      message: `What is the ${schematicName} name?`,
      type: "input",
    },
    {
      name: "projectName",
      message: `What is the project name?`,
      type: "input",
    },
    {
      name: "fields",
      message: `Enter the list of fields separated with comma`,
      type: "input",
    },
    {
      name: "types",
      message: `Enter the list of field types separated with comma`,
      type: "input",
    },
  ]);

  const fields = answers.fields.split(",");
  const types = answers.fields.split(",");
}

module.exports = {
  generateSchematic,
  createSchematic,
};
