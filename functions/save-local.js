const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function saveFile(data, spinner, typeOfData, flagMovies = "popular") {
  let filesPath = path.resolve(process.cwd(), "files");
  let personsPath = path.resolve(filesPath, "persons");
  let moviesPath = filesPath + "movies";

  if (typeOfData == "persons") {
    if (!fs.existsSync(personsPath)) {
      fs.mkdirSync(personsPath, {
        recursive: true
      });
    }
    const FILE_PATH = path.resolve(personsPath, "popular-persons.json");
    fs.writeFile(FILE_PATH, data, (error) => {
      if (error) throw error;
      spinner.succeed(chalk.white("The file has been saved!\n"));
    });
  } else if (typeOfData == "movies") {
    if (!fs.existsSync(moviesPath)) {
      fs.mkdirSync(moviesPath, {
        recursive: true
      });
    }
    if (flagMovies == "popular") {
      const FILE_PATH = path.resolve(moviesPath, "popular-movies.json");
    } else if (flagMovies == "now-playing") {
      const FILE_PATH = path.resolve(moviesPath, "now-playing-movies.json");
    }
    fs.writeFile(FILE_PATH, data, (error) => {
      // if (error) throw error;
      if (error) {
        spinner.fail(
          chalk.bold.bgRed("Error: ") + chalk.bgRed(error + "\n")
        );
      }
      spinner.succeed(chalk.white("The file has been saved!\n"));
    });
  }
}

exports.saveFile = saveFile;