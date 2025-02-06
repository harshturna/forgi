#!/usr/bin/env node

const { program } = require("commander");
const { generate } = require("./actions/generate");
const { generateSchematic } = require("./actions/generate-schematic");

program
  .version("1.0.0")
  .description("Forgi: A CLI tool to generate an MVC boilerplate");

program
  .command("scaffold")
  .description("Scaffold a new project")
  .action(generate);

program
  .command("generate")
  .description(
    "Generates schematics (controller, route, service, model and validation)"
  )
  .action(generateSchematic);

program.parse(process.argv);
