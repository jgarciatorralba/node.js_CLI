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

function printGetPerson(data) {

}

function printGetMovies(data) {

}

function printGetMovie(data) {

}

exports.printGetPersons = printGetPersons;