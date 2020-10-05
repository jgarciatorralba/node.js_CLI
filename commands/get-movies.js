// Bring in dependencies: 'dotenv', 'ora', 'chalk' and 'http'
require("dotenv/config");
const ora = require("ora");
const chalk = require("chalk");
const https = require("https");

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
      const spinner = ora('Fetching the movies data...\n').start()
      let message = 'Popular movies data loaded'
      let url = 'https://api.themoviedb.org/3/movie/popular?page=' + cli.page + '&api_key=' + process.env.API_KEY
      if (cli.nowPlaying) {
        url = 'https://api.themoviedb.org/3/movie/now_playing?page=' + cli.page + '&api_key=' + process.env.API_KEY
        message = 'Movies playing now data loaded'
      }
      let data = ""
      let options = new URL(url);
      https.request(options, req => {
        req.on('data', (res) => {
          data += res
        })
        req.on('end', () => {
          const dataObj = JSON.parse(data)
          dataObj.results.forEach(movie => {
            console.log(chalk.white('Movie: \n'))
            console.log(chalk.white('ID: ' + movie.id))
            console.log(chalk.white('Title: ') + chalk.blue(movie.title))
            console.log(chalk.white(`Relese Date: ${movie.release_date}
          `))
          })
          if (dataObj.total_pages > dataObj.page) {
            console.log(chalk.white('----------------------------------------'))
            console.log(chalk.white('Page: ' + dataObj.page + " of: " + dataObj.total_pages + '\n'))
          }
          spinner.succeed(chalk.bgGreen.black(message))
        })
      }).end()
    })
}