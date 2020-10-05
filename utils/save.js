// Bring in dependencies: 'fileSystem', 'path', and 'chalk'
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function saveFile(data, spinner, typeOfData, flagMovies = "popular") {
  let filesPath = path.resolve(process.cwd(), "files");
  let personsPath = path.resolve(filesPath, "persons");
  let moviesPath = filesPath + "movies";

  if (typeOfData == "persons") {
    const FILE_PATH = path.resolve(personsPath, "popular-persons.json");

    if (!fs.existsSync(personsPath)) {
      fs.mkdir(personsPath, {
        recursive: true
      }, () => {
        fs.writeFile(FILE_PATH, data, (error) => {
          if (error) {
            spinner.fail(
              chalk.bold.bgRed("Error: ") + chalk.bgRed(error + "\n")
            );
          }
          spinner.succeed(chalk.white("The file has been saved!\n"));
        });
      });
    } else {
      fs.writeFile(FILE_PATH, data, (error) => {
        if (error) {
          spinner.fail(
            chalk.bold.bgRed("Error: ") + chalk.bgRed(error + "\n")
          );
        }
        spinner.succeed(chalk.white("The file has been saved!\n"));
      });
    }

  } else if (typeOfData == "movies") {
    if (flagMovies == "popular") {
      const FILE_PATH = path.resolve(moviesPath, "popular-movies.json");
    } else if (flagMovies == "now-playing") {
      const FILE_PATH = path.resolve(moviesPath, "now-playing-movies.json");
    }

    if (!fs.existsSync(moviesPath)) {
      fs.mkdir(moviesPath, {
        recursive: true
      }, () => {
        fs.writeFile(FILE_PATH, data, (error) => {
          if (error) {
            spinner.fail(
              chalk.bold.bgRed("Error: ") + chalk.bgRed(error + "\n")
            );
          }
          spinner.succeed(chalk.white("The file has been saved!\n"));
        });
      });
    } else {
      fs.writeFile(FILE_PATH, data, (error) => {
        if (error) {
          spinner.fail(
            chalk.bold.bgRed("Error: ") + chalk.bgRed(error + "\n")
          );
        }
        spinner.succeed(chalk.white("The file has been saved!\n"));
      });
    }
  }
}

exports.saveFile = saveFile;