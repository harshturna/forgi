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
  await generateSchematicFile("controller", answers.entityName, {
    fileName: answers.entityName,
  });

  // route
  await generateSchematicFile("route", answers.entityName, {
    fileName: answers.entityName,
  });

  // service
  await generateSchematicFile("service", answers.entityName, {
    fileName: answers.entityName,
  });

  // model
  const fields = answers.fields.split(",");
  const types = answers.types.split(",");
  await generateSchematicFile("model", answers.entityName, {
    fields,
    types,
    modelName: answers.entityName,
  });

  // validation
  await generateSchematicFile("validation", answers.entityName, {
    fields,
    types,
    validationName: answers.entityName,
  });
}

async function generateSchematicFile(
  schematicName,
  fileName,
  contentGeneratorArg
) {
  const CWD = process.cwd();
  const schematicFilePath = path.join(
    CWD,
    getSchematicDir(schematicName),
    `${fileName}.${schematicName}.js`
  );

  if (fs.existsSync(schematicFilePath)) {
    console.log(`${answers.name} already exists`);
    return;
  }

  const contentGenerator = getSchematicContentGenerator(schematicName);

  await generateFile(schematicFilePath, contentGenerator(contentGeneratorArg));

  const indexPath = path.join(CWD, getSchematicDir(schematicName), "index.js");

  await fs.promises.appendFile(
    indexPath,
    generateExportStatement(fileName, schematicName)
  );
}

module.exports = {
  generateSchematic,
};
