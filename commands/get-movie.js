// Bring in dependencies: 'dotenv', 'ora', and 'https'
require("dotenv/config");
const ora = require("ora");
const https = require("https");

// Export command as a function
module.exports = function addGetMovieCommand(program) {
  // Implement command 'get-movie'
  program
    .command("get-movie")
    .description("Make a network request to fetch the data of a single movie")
    .requiredOption("-i, --id <id>", "The id of the movie")
    .option("-r, --reviews", "Fetch the reviews of the movie")
    .action((cli) => {

      const spinner = ora("Fetching the movie data...\n");
      spinner.spinner = "moon";
      spinner.color = "yellow";
      spinner.start();

      if (cli.reviews) {
          if(program.local == true){
            require('../utils/local.js').loadFile(spinner, 'movie', 'reviews')
        }else{
          showReviews(cli, spinner);
        }
      } else {
          if(program.local == true){
            require('../utils/local.js').loadFile(spinner, 'movie') 
        }else{
          showMovie(cli, spinner);
        }
      }

      function showReviews(cli, spinner) {
        const url =
          "https://api.themoviedb.org/3/movie/" +
          cli.id +
          "/reviews?api_key=" +
          process.env.API_KEY;
        const options = new URL(url);

        https
          .request(options, (req) => {
            let data = "";
            req.on("data", (d) => {
              data += d;
            });
            req.on("error", (err) => {
              spinner.fail(err);
            });
            req.on("end", () => {
              if(program.save){
                require('../utils/save.js').saveFile(spinner, data, 'reviews')
              }
              const dataObj = JSON.parse(data);
              // Print request data
              const prints = require("../utils/prints");
              prints.printReviews(spinner, dataObj);
            });
          })
          .end();
      }

      function showMovie(cli) {
        const url =
          "https://api.themoviedb.org/3/movie/" +
          cli.id +
          "?api_key=" +
          process.env.API_KEY;
        const options = new URL(url);

        https
          .request(options, (req) => {
            let data = "";
            req.on("data", (d) => {
              data += d;
            });
            req.on("error", (err) => {
              spinner.fail(err);
            });
            req.on("end", () => {
              if(program.save){
                require('../utils/save.js').saveFile(spinner, data, 'movie')
              }
              const dataObj = JSON.parse(data);
              if (dataObj.success == false) {
                spinner.warn(dataObj.status_message);
              } else {
                // Print request data
                const prints = require("../utils/prints");
                prints.printMovie(spinner, dataObj);
              }
            });
          })
          .end();
      }
    });
};