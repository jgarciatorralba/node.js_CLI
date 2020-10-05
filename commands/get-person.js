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
      https
        .get(url, (resp) => {
          let data = ""
          resp.on('data', (d) => {
            data += d
          })
          resp.on('end', () => {
            const dataObj = JSON.parse(data)
            if (dataObj.success == false) {
              spinner.warn(chalk.bgYellow(chalk.black(dataObj.status_message)))
            } else {
              console.log(chalk.white('\n----------------------------------------'))
              console.log(chalk.white('Person: \n'))
              console.log(chalk.white('ID: ' + dataObj.id))
              console.log(chalk.white('Name: ') + chalk.green(dataObj.name))
              console.log(chalk.white('Birthday: ' + dataObj.birthday + ' | ' + dataObj.place_of_birth))
              console.log(chalk.white('Department: ') + chalk.redBright(dataObj.known_for_department))
              console.log(chalk.green('Biography: ' + dataObj.biography))
              console.log(chalk.white('Also known as: \n'))
              console.log(chalk.white(dataObj.also_known_as[0]))
              spinner.succeed(chalk.bgGreen('Person data loaded !'))
            }
          })
        })
        .on("error", (e) => {
          spinner.fail(chalk.bgRed(chalk.black('oh no somethings wrong, that is going on here ?')))
          console.log(chalk)
        })
    })
}