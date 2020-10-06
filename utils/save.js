// Bring in dependencies: 'fileSystem', 'path', 'chalk' and 'notifier'
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const notifier = require("node-notifier");

function saveFile(spinner, data, typeOfData, flagMovies = "popular") {
  let filesPath = path.resolve(process.cwd(), "files");
  let folder_path = "";
  let file_path = "";
  let message = "";

  if (typeOfData == "persons") {
    folder_path = path.resolve(filesPath, "persons");
    file_path = path.resolve(folder_path, "popular-persons.json");
    message = 'The file "popular-persons.json" was stored successfully';
  } else if (typeOfData == "movies") {
    folder_path = path.resolve(filesPath, "movies");
    if (flagMovies == "popular") {
      file_path = path.resolve(folder_path, "popular-movies.json");
      message = 'The file "popular-movies.json" was stored successfully';
    } else if (flagMovies == "now-playing") {
      file_path = path.resolve(folder_path, "now-playing-movies.json");
      message = 'The file "now-playing-movies.json" was stored successfully';
    }
  } else if (typeOfData == "person") {
    folder_path = path.resolve(filesPath, "persons");
    file_path = path.resolve(folder_path, "person-by-id.json");
    message = 'The file "person-by-id.json" was stored successfully';
  } else if (typeOfData == "movie") {
    folder_path = path.resolve(filesPath, "movies");
    file_path = path.resolve(folder_path, "movie-by-id.json");
    message = 'The file "movie-by-id.json" was stored successfully';
  } else if (typeOfData == "reviews") {
    folder_path = path.resolve(filesPath, "movies");
    file_path = path.resolve(folder_path, "reviews-by-id.json");
    message = 'The file "reviews-by-id.json" was stored successfully';
  }

  if (!fs.existsSync(folder_path)) {
    fs.mkdir(
      folder_path, {
        recursive: true,
      },
      () => {
        fs.writeFile(file_path, data, (error) => {
          if (error) {
            spinner.fail(
              chalk.bold.bgRed("Error: ") + chalk.bgRed(error.message + "\n")
            );
          }
          spinner.succeed(chalk.white("The file has been saved!\n"));
          // Added OS notification thanks to dependency 'node-notifier'
          notifier.notify({
            title: "Notification",
            message: message,
            sound: true,
            timeout: false,
          });
        });
      }
    );
  } else {
    fs.writeFile(file_path, data, (error) => {
      if (error) {
        spinner.fail(
          chalk.bold.bgRed("Error: ") + chalk.bgRed(error.message + "\n")
        );
      }
      spinner.succeed(chalk.white("The file has been saved!\n"));
      // Added OS notification thanks to dependency 'node-notifier'
      notifier.notify({
        title: "Notification",
        message: message,
        sound: true,
        timeout: false,
      });
    });
  }
}

exports.saveFile = saveFile;