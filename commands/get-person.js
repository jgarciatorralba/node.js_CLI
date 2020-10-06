// Bring in dependencies: 'dotenv', 'ora', 'chalk' and 'http'
require("dotenv/config");
const ora = require("ora");
const chalk = require("chalk");
const https = require("https");

// Export command as a function
module.exports = function addGetPersonCommand(program) {
  // Implement command 'get-person'
  program.command('get-person')
    .description('Make a network request to fetch the data of a single person')
    .requiredOption('i, --id <num>', 'The id of the person', )
    .action((cli) => {
      const spinner = ora(chalk.yellowBright('Fetching the person data...')).start()
      const url = 'https://api.themoviedb.org/3/person/' + cli.id + '?api_key=' + process.env.API_KEY
      // Get '--save' and '--local' flag values
      let saveFlag = program.save;
      let localFlag = program.local;
      if (localFlag == true) {
        // Try to load file from local folder (ignoring other command options)
        const local = require("../utils/local");
        local.loadFile(spinner, "person");
      } else {
        // Make http request
        https
          .request(url, (resp) => {
            let data = ""
            resp.on('data', (d) => {
              data += d
            })
            resp.on('end', () => {
              const dataObj = JSON.parse(data)
              if (dataObj.errors !== undefined) {
                dataObj.errors.forEach(error => {
                  spinner.warn(chalk.bgYellow(chalk.black(error)) + "\n");
                })
              } else {
                if (saveFlag == true) {
                  // Save request to local folder
                  const save = require("../utils/save");
                  save.saveFile(spinner, data, "person");
                } else {
                  // Print request data
                  const prints = require("../utils/prints");
                  prints.printGetPerson(spinner, dataObj);
                }
              }
            })
          })
          .on("error", (e) => {
            spinner.fail(chalk.bgRed(chalk.black('oh no something\'s wrong, what is going on here?')))
            console.log(chalk)
          }).end()
      }
    })
}