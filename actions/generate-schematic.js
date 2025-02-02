const path = require("path");
const fs = require("fs");

const { promptInput } = require("../utils/prompt");
const {
  getSchematicDir,
  getSchematicContentGenerator,
} = require("../utils/schematic");
const { generateFile } = require("../utils/file");
const { generateExportStatement } = require("../utils/content");

async function generateSchematic() {
  const answers = await promptInput([
    {
      name: "entityName",
      message: `What is the entity name?`,
      type: "input",
    },
    {
      name: "projectName",
      message: `What is the project name?`,
      type: "input",
    },
    {
      name: "fields",
      message: `Enter the list of fields separated with comma (for model and validation)`,
      type: "input",
    },
    {
      name: "types",
      message: `Enter the list of field types separated with comma (for model and validation)`,
      type: "input",
    },
  ]);

  // controller
  await generateSchematicFile(
    answers.projectName,
    "controller",
    answers.entityName,
    { fileName: answers.entityName }
  );

  // route
  await generateSchematicFile(
    answers.projectName,
    "route",
    answers.entityName,
    { fileName: answers.entityName }
  );

  // service
  await generateSchematicFile(
    answers.projectName,
    "service",
    answers.entityName,
    { fileName: answers.entityName }
  );

  // model
  const fields = answers.fields.split(",");
  const types = answers.types.split(",");
  await generateSchematicFile(
    answers.projectName,
    "model",
    answers.entityName,
    {
      fields,
      types,
      modelName: answers.entityName,
    }
  );

  // validation
  await generateSchematicFile(
    answers.projectName,
    "validation",
    answers.entityName,
    {
      fields,
      types,
      validationName: answers.entityName,
    }
  );
}

async function generateSchematicFile(
  projectName,
  schematicName,
  fileName,
  contentGeneratorArg
) {
  const CWD = process.cwd();
  const schematicFilePath = path.join(
    CWD,
    projectName,
    getSchematicDir(schematicName),
    `${fileName}.${schematicName}.js`
  );

  if (fs.existsSync(schematicFilePath)) {
    console.log(`${answers.name} already exists`);
    return;
  }

  const contentGenerator = getSchematicContentGenerator(schematicName);

  await generateFile(schematicFilePath, contentGenerator(contentGeneratorArg));

  const indexPath = path.join(
    CWD,
    projectName,
    getSchematicDir(schematicName),
    "index.js"
  );

  await fs.promises.appendFile(
    indexPath,
    generateExportStatement(fileName, schematicName)
  );
}

module.exports = {
  generateSchematic,
};
