const chalk = require("chalk");

function printGetPersons(spinner, data) {
  let currentPg = data.page;
  let totalPgs = data.total_pages;
  let persons = data.results;
  // Page number
  if (totalPgs > currentPg) {
    console.info(
      chalk.white("\n----------------------------------------")
    );
    console.info(
      chalk.white("Page " + currentPg + " of " + totalPgs)
    );
  }
  // Persons data
  persons.forEach((person) => {
    console.info(
      chalk.white("----------------------------------------\n")
    );
    console.info(chalk.white("Person:\n"));
    console.info(chalk.white("ID: " + person.id));
    console.info(`Name: ${chalk.blue.bold(person.name)}`);
    if (person.known_for_department === "Acting") {
      console.info(
        `Department: ${chalk.magenta(person.known_for_department)}`
      );
    }
    // Movies data
    let movies = person.known_for;
    let noMoviesWithTitle = true;
    movies.forEach((movie) => {
      if (movie.title !== undefined) {
        noMoviesWithTitle = false;
      }
    });
    if (noMoviesWithTitle) {
      console.info(
        "\n" +
        chalk.redBright(
          `${person.name} doesn't appear in any movie`
        ) +
        "\n"
      );
    } else {
      console.info(chalk.white("\nAppearing in movies:"));
      movies.forEach((movie) => {
        if (movie.title !== undefined) {
          console.info(chalk.white("\n\tMovie:"));
          console.info(chalk.white("\tID: " + movie.id));
          console.info(
            chalk.white("\tRelease date: " + movie.release_date)
          );
          console.info(
            chalk.white("\tTitle: " + movie.title + "\n")
          );
        }
      });
    }
  });
  // Ending spinner
  console.info(chalk.white("\n"));
  spinner.succeed(chalk.white("Popular Persons data loaded\n"));
}

function printGetPerson(spinner, data) {
  console.log(chalk.white('\n----------------------------------------'))
  console.log(chalk.white('Person: \n'))
  console.log(chalk.white('ID: ' + data.id))
  console.log(chalk.white('Name: ') + chalk.green(data.name))
  console.log(chalk.white('Birthday: ' + data.birthday + ' | ' + data.place_of_birth))
  console.log(chalk.white('Department: ') + chalk.redBright(data.known_for_department))
  console.log(chalk.green('Biography: ' + data.biography))
  console.log(chalk.white('Also known as: \n'))
  console.log(chalk.white(data.also_known_as[0]))
  spinner.succeed(chalk.bgGreen('Person data loaded!'))
}

function printGetMovies(spinner, data, message) {
  data.results.forEach(movie => {
    console.log(chalk.white('Movie: \n'))
    console.log(chalk.white('ID: ' + movie.id))
    console.log(chalk.white('Title: ') + chalk.blue(movie.title))
    console.log(chalk.white(`Release Date: ${movie.release_date}
  `))
  })
  if (data.total_pages > data.page) {
    console.log(chalk.white('----------------------------------------'))
    console.log(chalk.white('Page: ' + data.page + " of: " + data.total_pages + '\n'))
  }
  spinner.succeed(chalk.bgGreen.black(message))
}

function printGetMovie(spinner, data) {

}

exports.printGetPersons = printGetPersons;
exports.printGetMovies = printGetMovies;
exports.printGetPerson = printGetPerson;