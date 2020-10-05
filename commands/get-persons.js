// Bring in dependencies: 'dotenv', 'ora' and 'chalk'
require("dotenv/config");
const ora = require("ora");
const chalk = require("chalk");

// Export command as a function
module.exports = function addGetPersonsCommand(program) {
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
      let apiKey = process.env.API_KEY;
      // Get '--save' and '--local' flag values
      let saveFlag = program.save;
      let localFlag = program.local;
      // Start spinner
      console.info(chalk.white("\n"));
      const spinner = ora(
        chalk.yellowBright("Fetching the popular person's data...\n")
      );
      spinner.color = "yellowBright";
      spinner.spinner = "triangle";
      spinner.start();
      if (localFlag == true) {
        // Try to load file from local folder (ignoring other command options)
        const local = require("../utils/local");
        local.loadFile(spinner, "persons");
      } else {
        // Create 'options' object before using 'https.request'
        const options = {
          protocol: 'https:',
          hostname: 'api.themoviedb.org',
          port: 443,
          path: '/3/person/popular?page=' + page + '&api_key=' + apiKey,
          method: 'GET'
        };
        // Make http request
        const https = require("https");
        const req = https
          .request(options, (resp) => {
            let data = "";
            // A chunk of data has been recieved
            resp.on("data", (chunk) => {
              data += chunk;
            });
            // The whole response has been received. Print out the result
            resp.on("end", () => {
              let parsedData = JSON.parse(data);
              if (parsedData.errors !== undefined) {
                parsedData.errors.forEach(error => {
                  spinner.warn(error + "\n");
                })
              } else {
                if (saveFlag == true) {
                  // Save request to local folder
                  const save = require("../utils/save");
                  save.saveFile(spinner, data, "persons");
                } else {
                  // Print request data
                  const prints = require("../utils/prints");
                  prints.printGetPersons(spinner, parsedData);
                }
              }
            });
          })
          .on("error", (e) => {
            // Handle http error with 'ora.fail()'
            spinner.fail(
              chalk.bold.bgRed("Error: ") + chalk.bgRed(e.message + "\n")
            );
          });
        req.end();
      }
    });
};