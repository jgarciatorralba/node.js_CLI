#!/usr/bin/env node

// Bring in 'commander' dependency
const { program } = require("commander");

// Add some basic info such as version and short description
program.version("1.0.0").description("Command Line Interface for TMDb API");

// Implement command 'get-persons'
program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <page>",
    "The page of persons data results to fetch",
    1 // Default value set to page 1
  )
  .action((command) => {
    console.info(`Page ${command.page} selected!`);
  });

// Catch all arguments passed by the command line
program.parse(process.argv);
