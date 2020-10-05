// Bring in dependencies: 'fileSystem', 'path', and 'chalk'
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadFile(spinner, typeOfData, flagMovies = "popular") {
  let filesPath = path.resolve(process.cwd(), "files");
  let personsPath = path.resolve(filesPath, "persons");
  let moviesPath = path.resolve(filesPath, "movies");

  let file_path = "";
  if (typeOfData == "persons") {
    file_path = path.resolve(personsPath, "popular-persons.json");
  } else if (typeOfData == "movies") {
    if (flagMovies == "popular") {
      file_path = path.resolve(moviesPath, "popular-movies.json");
    } else if (flagMovies == "now-playing") {
      file_path = path.resolve(moviesPath, "now-playing-movies.json");
    }
  }

  fs.readFile(file_path, (error, data) => {
    if (error) {
      spinner.fail(
        chalk.bold.bgRed("Error: ") + chalk.bgRed(error.message + "\n")
      );
    } else {
      let parsedData = JSON.parse(data)
      const prints = require("../utils/prints");
      if (typeOfData == "persons") {
        prints.printGetPersons(spinner, parsedData);
      } else if (typeOfData == "movies") {
        prints.printGetMovies(spinner, parsedData);
      }
    }
  })
}

exports.loadFile = loadFile;