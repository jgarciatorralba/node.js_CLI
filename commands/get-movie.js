// Bring in dependencies: 'dotenv', 'ora' and 'chalk'
require("dotenv/config");
const ora = require("ora");
const chalk = require("chalk");

// Export command as a function
module.exports = function addGetMovieCommand(program) {
  // Implement command 'get-movie'
  program
    .command("get-movie")
    .description("Make a network request to fetch data of a single movie")
    .requiredOption("-i, --id <id>", "The id of the movie")
    .option("-r, --reviews", "Fetch the reviews of the movie")
    .action((cli) => {
      require("dotenv/config");
      if (cli.reviews) {
        showReviews(cli);
      } else {
        showMovie(cli);
      }
      function showReviews(cli) {
        const url =
          "https://api.themoviedb.org/3/movie/" +
          cli.id +
          "/reviews?api_key=" +
          process.env.API_KEY;
        const ora = require("ora");
        const spinner = ora("Fetching the movie data...\n");
        spinner.spinner = "unicorn";
        spinner.color = "yellow";
        spinner.start();
        const options = new URL(url);
        const https = require("https");

        https
          .request(options, (req) => {
            let data = "";
            req.on("data", (d) => {
              data += d;
            });
            req.on("end", () => {
              const dataObj = JSON.parse(data);
              const results = dataObj.results;
              if (results.length > 0) {
                console.log("\n");
                if (dataObj.page > dataObj.total_pages) {
                  console.log(
                    chalk.white(
                      "\n--------------------------------------------"
                    )
                  );
                  console.log(
                    chalk.white(
                      "Page: " + dataObj.page + " from: " + dataObj.total_pages
                    )
                  );
                }
                results.forEach((review) => {
                  console.log(
                    chalk.white("Author: ") + chalk.blueBright(review.author)
                  );
                  console.log(chalk.white("Content: " + review.content));
                });
              }
              console.log("\n");
              spinner.succeed("Reviews");
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
        const ora = require("ora");
        const spinner = ora("Fetching the movie data...\n");
        spinner.spinner = "unicorn";
        spinner.color = "yellow";
        spinner.start();
        const options = new URL(url);
        const https = require("https");

        https
          .request(options, (req) => {
            let data = "";
            const chalk = require("chalk");
            req.on("data", (d) => {
              data += d;
            });
            req.on("error", (err) => {
              spinner.fail(err);
            });
            req.on("end", () => {
              const dataObj = JSON.parse(data);
              if (dataObj.success == false) {
                spinner.warn(dataObj.status_message);
              } else {
                console.log(
                  "------------------------------------------------------------\n\n"
                );
                console.log(chalk.white("ID: " + dataObj.id));
                console.log(chalk.white("Title :") + chalk.blue(dataObj.title));
                console.log(
                  chalk.white("Release Date :" + dataObj.release_date)
                );
                console.log(chalk.white("Runtime :" + dataObj.runtime));
                console.log(chalk.white("Vote Count :" + dataObj.vote_count));
                console.log(
                  chalk.white("Overview :" + dataObj.overview + "\n\n")
                );
                console.log(chalk.white("Genres :\n"));
                if (dataObj.genres.length < 0) {
                  console.log(
                    chalk.yellow("The movie does not have a declared genre")
                  );
                } else {
                  dataObj.genres.forEach((genre) => {
                    console.log(chalk.white(genre.name));
                  });
                }
                console.log(chalk.white("\n"));
                if (dataObj.spoken_languages.length < 0) {
                  console.log(
                    chalk.yellow(
                      "The movie " +
                        dataObj.title +
                        " does not have a declared genre"
                    )
                  );
                } else {
                  dataObj.spoken_languages.forEach((language) => {
                    console.log(chalk.white(language.name));
                  });
                }
                console.log(chalk.white("\n"));
                // console.log(dataObj)
                spinner.succeed("Movie data loaded !");
              }
            });
          })
          .end();
      }
    });
};
