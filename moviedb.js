#!/usr/bin/env node

// Bring in 'commander' dependency
const {
  program
} = require("commander");

// Add some basic info such as version and short description
program
  .version("1.0.0")
  .description("Command Line Interface for TMDb API")
  .option("--save", "Store the contents in a json file inside a files folder")
  .option("--local", "Read the data of the persons or the movies from the local file system instead of making a network request");

// Import commands
require("./commands/get-persons")(program);
require("./commands/get-person")(program);
require("./commands/get-movies")(program);
require("./commands/get-movie")(program);

// Catch all arguments passed through the command line
program.parse(process.argv);