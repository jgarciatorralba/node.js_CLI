// Bring in dependencies: 'fileSystem', 'path', and 'chalk'
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadFile(spinner, typeOfData, flagMovies = "popular", message = "") {
  let filesPath = path.resolve(__dirname, '../files');
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
  } else if (typeOfData == "person") {
    file_path = path.resolve(personsPath, "person-by-id.json");
  } else if (typeOfData == "movie") {
    if (flagMovies == 'reviews') {
      file_path = path.resolve(moviesPath, "reviews-by-id.json");
    } else {
      file_path = path.resolve(moviesPath, "movie-by-id.json");
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
        prints.printGetMovies(spinner, parsedData, message);
      } else if (typeOfData == "person") {
        prints.printGetPerson(spinner, parsedData);
      } else if (typeOfData == "movie") {
        if (flagMovies == "reviews") {
          prints.printReviews(spinner, parsedData);
        } else {
          prints.printMovie(spinner, parsedData);
        }
      }
    }
  })
}

exports.loadFile = loadFile;