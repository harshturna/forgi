const {
  generateControllerContent,
  generateRouteContent,
  generateServiceContent,
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
    case "middleware":
      return "middlewares";

    default:
      throw new Error(`${schematicName} is not supported`);
  }
}

module.exports = {
  getSchematicDir,
  getSchematicContentGenerator,
};
