const { program } = require("commander");
const generate = require("./actions/generate");
const {
  generateSchematic,
  createSchematic,
} = require("./actions/generate-schematic");

program
  .version("1.0.0")
  .description("A CLI tool to generate an MVC boilerplate");

program
  .command("scaffold")
  .description("Creates an MVC boilerplate")
  .action(generate);

program
  .command("generate <schematicName>")
  .description(
    "Generates different schematic (controller, route, middleware, service)"
  )
  .action(generateSchematic);

program
  .command("create <schematicName>")
  .description("Generates different schematic (module)")
  .action(createSchematic);

program.parse(process.argv);
