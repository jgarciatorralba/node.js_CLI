#!/usr/bin/env node

// Bring in 'commander' dependency
const {
  program
} = require("commander");

// Add some basic info such as version and short description
program
  .version("1.0.0")
  .description("Command Line Interface for TMDb API");

// Import commands
require("./commands/get-persons")(program);
require("./commands/get-person")(program);
require("./commands/get-movies")(program);

// Catch all arguments passed through the command line
program.parse(process.argv);