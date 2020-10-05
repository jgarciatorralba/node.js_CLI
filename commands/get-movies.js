// Bring in dependencies: 'dotenv', 'ora' and 'chalk'
require("dotenv/config");
const ora = require("ora");
const chalk = require("chalk");

// Export command as a function
module.exports = function addGetMoviesCommand(program) {
  // Implement command 'get-movies'
  program
    .command('get-movies')
    .description('Make a network request to fetch movies')
    .requiredOption('--page <number>', 'The page of movies data results to fetch')
    .option('-p, --popular', 'Fetch the popular movies')
    .option('-n, --now-playing', 'Fetch the movies that are playing now')
    .action((cli) => {
      // Get '--save' and '--local' flag values
      let saveFlag = program.save;
      let localFlag = program.local;
      let nowPlayingFlag = cli.nowPlaying;
      // Start spinner
      const spinner = ora('Fetching the movies data...\n').start()
      if (localFlag == true) {
        // Try to load file from local folder (ignoring other command options)
        const local = require("../utils/local");
        if (nowPlayingFlag) {
          local.loadFile(spinner, "movies", "now-playing");
        } else {
          local.loadFile(spinner, "movies");
        }
      } else {
        let message = 'Popular movies data loaded'
        let url = 'https://api.themoviedb.org/3/movie/popular?page=' + cli.page + '&api_key=' + process.env.API_KEY
        if (nowPlayingFlag) {
          url = 'https://api.themoviedb.org/3/movie/now_playing?page=' + cli.page + '&api_key=' + process.env.API_KEY
          message = 'Movies playing now data loaded'
        }
        let data = ""
        let options = new URL(url);
        const https = require("https");
        https.request(options, req => {
            req.on('data', (res) => {
              data += res
            })
            req.on('end', () => {
              const dataObj = JSON.parse(data)
              if (dataObj.errors !== undefined) {
                dataObj.errors.forEach(error => {
                  spinner.warn(error + "\n");
                })
              } else if (dataObj.success !== undefined) {
                spinner.warn(dataObj.status_message);
              } else {
                if (saveFlag == true) {
                  // Save request to local folder
                  const save = require("../utils/save");
                  if (nowPlayingFlag) {
                    save.saveFile(spinner, data, "movies", "now-playing");
                  } else {
                    save.saveFile(spinner, data, "movies");
                  }
                } else {
                  // Print request data
                  const prints = require("../utils/prints");
                  prints.printGetMovies(spinner, dataObj, message);
                }
              }
            })
          }).on("error", (e) => {
            // Handle http error with 'ora.fail()'
            spinner.fail(
              chalk.bold.bgRed("Error: ") + chalk.bgRed(e.message + "\n")
            );
          })
          .end()
      }
    })
}