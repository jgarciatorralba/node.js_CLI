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
    // Get required page
    let page = command.page;
    // Bring in the API Key from '.env' file
    require("dotenv/config");
    let apiKey = process.env.API_KEY;
    // Base URL
    let url = "https://api.themoviedb.org/3/person/";
    // let url = "https://api.themovied"; // Wrong url to force error
    if (command.popular) url += "popular?";
    url += "page=" + page + "&" + "api_key=" + apiKey;

    // Require dependency 'ora'
    const ora = require("ora");
    // Require dependency 'chalk'
    const chalk = require("chalk");
    // Start spinner
    const spinner = ora(
      chalk.yellowBright("Fetching the popular person's data...\n")
    ).start();
    // Bring in the 'http' module
    const https = require("https");
    https
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          let parsedData = JSON.parse(data);
          if (parsedData.success !== undefined && !parsedData.success) {
            spinner.warn(parsedData.status_message);
          } else {
            let currentPg = parsedData.page;
            let totalPgs = parsedData.total_pages;
            let persons = parsedData.results;
            // Page number
            if (totalPgs > currentPg) {
              console.info(
                chalk.white("\n----------------------------------------")
              );
              console.info(
                chalk.white("Page " + currentPg + " of " + totalPgs)
              );
            }
            // Persons data
            persons.forEach((person) => {
              console.info(
                chalk.white("----------------------------------------\n")
              );
              console.info(chalk.white("Person:\n"));
              console.info(chalk.white("ID: " + person.id));
              console.info(`Name: ${chalk.blue.bold(person.name)}`);
              if (person.known_for_department === "Acting") {
                console.info(
                  `Department: ${chalk.magenta(person.known_for_department)}`
                );
              }
              // Movies data
              let movies = person.known_for;
              let noMoviesWithTitle = true;
              movies.forEach((movie) => {
                if (movie.title !== undefined) {
                  noMoviesWithTitle = false;
                }
              });
              if (noMoviesWithTitle) {
                console.info(
                  "\n" +
                    chalk.redBright(
                      `${person.name} doesn't appear in any movie`
                    ) +
                    "\n"
                );
              } else {
                console.info(chalk.white("\nAppearing in movies:"));
                movies.forEach((movie) => {
                  if (movie.title !== undefined) {
                    console.info(chalk.white("\n\tMovie:"));
                    console.info(chalk.white("\tID: " + movie.id));
                    console.info(
                      chalk.white("\tRelease date: " + movie.release_date)
                    );
                    console.info(chalk.white("\tTitle: " + movie.title + "\n"));
                  }
                });
              }
            });
            // Ending spinner
            console.info(chalk.white("\n"));
            spinner.succeed(chalk.white("Popular Persons data loaded\n"));
          }
        });
      })
      .on("error", (e) => {
        // Handle http error with 'ora.fail()'
        spinner.fail(chalk.bgRed("Error: " + e.message));
      });
  });

// Catch all arguments passed by the command line
program.parse(process.argv);
