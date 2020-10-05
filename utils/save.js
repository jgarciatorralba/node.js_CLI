// Bring in dependencies: 'fileSystem', 'path', and 'chalk'
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function saveFile(spinner, data, typeOfData, flagMovies = "popular") {
  let filesPath = path.resolve(process.cwd(), "files");
  let folder_path = "";
  let file_path = "";

  if (typeOfData == "persons") {
    folder_path = path.resolve(filesPath, "persons");
    file_path = path.resolve(folder_path, "popular-persons.json");
  } else if (typeOfData == "movies") {
    folder_path = path.resolve(filesPath, "movies");
    if (flagMovies == "popular") {
      file_path = path.resolve(folder_path, "popular-movies.json");
    } else if (flagMovies == "now-playing") {
      file_path = path.resolve(folder_path, "now-playing-movies.json");
    }
  }

  if (!fs.existsSync(folder_path)) {
    fs.mkdir(folder_path, {
      recursive: true
    }, () => {
      fs.writeFile(file_path, data, (error) => {
        if (error) {
          spinner.fail(
            chalk.bold.bgRed("Error: ") + chalk.bgRed(error.message + "\n")
          );
        }
        spinner.succeed(chalk.white("The file has been saved!\n"));
      });
    });
  } else {
    fs.writeFile(file_path, data, (error) => {
      if (error) {
        spinner.fail(
          chalk.bold.bgRed("Error: ") + chalk.bgRed(error.message + "\n")
        );
      }
      spinner.succeed(chalk.white("The file has been saved!\n"));
    });
  }
}

exports.saveFile = saveFile;