const { program } = require("commander");
const generate = require("./actions/generate");
const generateSchematic = require("./actions/generate-schematic");

program
  .version("1.0.0")
  .description("A CLI tool to generate an MVC boilerplate");

program
  .command("generate")
  .description("Creates an MVC boilerplate")
  .action(generate);

program
  .command("generate <schematicName>")
  .description(
    "Generates different schematic (controller, route, middleware, service)"
  );

program.parse(process.argv);
