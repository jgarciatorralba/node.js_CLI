const chalk = require("chalk");

function printGetPersons(spinner, data) {
  let currentPg = data.page;
  let totalPgs = data.total_pages;
  let persons = data.results;
  // Page number
  if (totalPgs > currentPg) {
    console.log(
      chalk.white("\n----------------------------------------")
    );
    console.log(
      chalk.white("Page " + currentPg + " of " + totalPgs)
    );
  }
  // Persons data
  persons.forEach((person) => {
    console.log(
      chalk.white("----------------------------------------\n")
    );
    console.log(chalk.white("Person:\n"));
    console.log(chalk.white("ID: " + person.id));
    console.log(`Name: ${chalk.blue.bold(person.name)}`);
    if (person.known_for_department === "Acting") {
      console.log(
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
      console.log(
        "\n" +
        chalk.redBright(
          `${person.name} doesn't appear in any movie`
        ) +
        "\n"
      );
    } else {
      console.log(chalk.white("\nAppearing in movies:"));
      movies.forEach((movie) => {
        if (movie.title !== undefined) {
          console.log(chalk.white("\n\tMovie:"));
          console.log(chalk.white("\tID: " + movie.id));
          console.log(
            chalk.white("\tRelease date: " + movie.release_date)
          );
          console.log(
            chalk.white("\tTitle: " + movie.title + "\n")
          );
        }
      });
    }
  });
  // Ending spinner
  console.log(chalk.white("\n"));
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
  // Ending spinner
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
  // Ending spinner
  spinner.succeed(chalk.bgGreen.black(message))
}

function printReviews(spinner, data) {
  const results = data.results;
  if (results.length > 0) {
    console.log("\n");
    if (data.page > data.total_pages) {
      console.log(
        chalk.white(
          "\n--------------------------------------------"
        )
      );
      console.log(
        chalk.white(
          "Page: " + data.page + " from: " + data.total_pages
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
  // Ending spinner
  console.log("\n");
  spinner.succeed("Reviews");
}

function printMovie(spinner, data) {
  console.log(
    "------------------------------------------------------------\n\n"
  );
  console.log(chalk.white("ID: " + data.id));
  console.log(chalk.white("Title :") + chalk.blue(data.title));
  console.log(
    chalk.white("Release Date :" + data.release_date)
  );
  console.log(chalk.white("Runtime :" + data.runtime));
  console.log(chalk.white("Vote Count :" + data.vote_count));
  console.log(
    chalk.white("Overview :" + data.overview + "\n\n")
  );
  console.log(chalk.white("Genres :\n"));
  if (data.genres.length < 0) {
    console.log(
      chalk.yellow("The movie does not have a declared genre")
    );
  } else {
    data.genres.forEach((genre) => {
      console.log(chalk.white(genre.name));
    });
  }
  console.log(chalk.white("\n"));
  if (data.spoken_languages.length < 0) {
    console.log(
      chalk.yellow(
        "The movie " +
        data.title +
        " does not have a declared genre"
      )
    );
  } else {
    data.spoken_languages.forEach((language) => {
      console.log(chalk.white(language.name));
    });
  }
  console.log(chalk.white("\n"));
  // Ending spinner
  spinner.succeed("Movie data loaded !");
}

exports.printGetPersons = printGetPersons;
exports.printGetMovies = printGetMovies;
exports.printGetPerson = printGetPerson;
exports.printReviews = printReviews;
exports.printMovie = printMovie;