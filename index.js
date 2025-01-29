const { program } = require("commander");
const generate = require("./actions/generate");

program
  .version("1.0.0")
  .description("A CLI tool to generate an MVC boilerplate");

program
  .command("generate")
  .description("Creates an MVC boilerplate")
  .action(generate);

program.parse(process.argv);
