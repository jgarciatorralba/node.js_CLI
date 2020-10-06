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
  console.log(chalk.white('Name: ') + chalk.blue.bold(data.name))
  console.log(chalk.white('Birthday: ' + data.birthday) + chalk.gray(' | ') + chalk.white(data.place_of_birth))
  if (data.known_for_department === "Acting") {
    console.log(
      `Department: ${chalk.magenta(data.known_for_department)}`
    );
  }
  console.log(chalk.white('Biography: ') + chalk.blue.bold(data.biography))
  if (data.also_known_as.length > 0) {
    console.log("\n");
    console.log(chalk.white('Also known as:\n'));
    data.also_known_as.forEach(element => {
      console.log(chalk.white(element));
    });
  } else {
    console.log("\n");
    console.log(chalk.yellow(data.name) + chalk.white(" doesn't have any alternative names" + "\n"));
  }
  // Ending spinner
  console.log("\n");
  spinner.succeed(chalk.bgGreen('Person data loaded!\n'))
}

function printGetMovies(spinner, data, message) {
  if (data.total_pages > data.page) {
    console.log(chalk.white('\n----------------------------------------'))
    console.log(chalk.white('Page: ' + data.page + " of: " + data.total_pages))
  }
  data.results.forEach(movie => {
    console.log(
      chalk.white("----------------------------------------\n")
    );
    console.log(chalk.white('Movie: \n'))
    console.log(chalk.white('ID: ' + movie.id))
    console.log(chalk.white('Title: ') + chalk.bold.blue(movie.title))
    console.log(chalk.white(`Release Date: ${movie.release_date}` + "\n"))

  })
  // Ending spinner
  console.log("\n");
  spinner.succeed(chalk.bgGreen.black(message) + "\n");
}

function printReviews(spinner, data) {
  const results = data.results;
  if (results.length > 0) {
    if (data.page < data.total_pages) {
      console.log(
        chalk.white(
          "\n----------------------------------------"
        )
      );
      console.log(
        chalk.white(
          "Page " + data.page + " of " + data.total_pages
        )
      );
    }
    console.log(
      chalk.white("----------------------------------------\n")
    );
    results.forEach((review) => {
      console.log(chalk.white('\nReview: \n'))
      console.log(
        chalk.white("Author: ") + chalk.blue.bold(review.author)
      );
      if (review.content.length > 400) {
        let slicedContent = review.content.slice(0, 400);
        console.log(chalk.white("Content: " + slicedContent + "...\n"));
      } else {
        console.log(chalk.white("Content: " + review.content));
      }
    });
  } else {
    console.log(
      chalk.yellow(`The movie ${data.id} doesn't have any reviews`)
    );
  }
  // Ending spinner
  console.log("\n\n");
  spinner.succeed("Movie reviews data loaded\n");
}

function printMovie(spinner, data) {
  console.log(
    chalk.white(
      "\n--------------------------------------------\n"
    )
  );
  console.log(chalk.white('Movie: \n'));
  console.log(chalk.white("ID: " + data.id));
  console.log(chalk.white("Title: ") + chalk.bold.blue(data.title));
  console.log(
    chalk.white("Release Date: " + data.release_date)
  );
  console.log(chalk.white("Runtime: " + data.runtime));
  console.log(chalk.white("Vote Count: " + data.vote_count));
  console.log(
    chalk.white("Overview: " + data.overview)
  );
  console.log("\n");
  console.log(chalk.white("Genres: \n"));
  if (data.genres.length == 0) {
    console.log(
      chalk.white("The movie ") +
      chalk.yellow(data.title) +
      chalk.white(" doesn't have a declared genre")
    );
  } else {
    data.genres.forEach((genre) => {
      console.log(chalk.white(genre.name));
    });
  }

  console.log("\n");
  console.log(chalk.white("Spoken languages: \n"));
  if (data.spoken_languages.length == 0) {
    console.log(
      chalk.yellow("The movie " + data.title + " doesn't have any declared languages")
    );
  } else {
    data.spoken_languages.forEach((language) => {
      console.log(chalk.white(language.name + "\n"));
    });
  }
  console.log(chalk.white("\n"));
  // Ending spinner
  spinner.succeed("Movie data loaded!\n");
}

exports.printGetPersons = printGetPersons;
exports.printGetMovies = printGetMovies;
exports.printGetPerson = printGetPerson;
exports.printReviews = printReviews;
exports.printMovie = printMovie;