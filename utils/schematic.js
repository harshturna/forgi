const {
  generateControllerContent,
  generateRouteContent,
  generateServiceContent,
  generateModelContent,
  generateValidationContent,
} = require("./content");

function getSchematicDir(schematicName) {
  switch (schematicName) {
    case "controller":
      return "controllers";
    case "route":
      return "routes";
    case "middleware":
      return "middlewares";
    case "service":
      return "services";
    case "model":
      return "models";
    case "validation":
      return "validations";

    default:
      throw new Error(`${schematicName} is not supported`);
  }
}

function getSchematicContentGenerator(schematicName) {
  switch (schematicName) {
    case "controller":
      return generateControllerContent;
    case "route":
      return generateRouteContent;
    case "service":
      return generateServiceContent;
    case "model":
      return generateModelContent;
    case "validation":
      return generateValidationContent;

    default:
      throw new Error(`${schematicName} is not supported`);
  }
}

module.exports = {
  getSchematicDir,
  getSchematicContentGenerator,
};
